import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import WellnessLog from '@/models/WellnessLog';
import { predictBurnout } from '@/lib/ai';

function requireMentor(session: ReturnType<typeof getServerSession> extends Promise<infer T> ? T : unknown) {
    // @ts-expect-error session type
    return session?.user?.role === 'mentor' || session?.user?.role === 'admin';
}

// GET /api/mentor/students — list assigned students with wellness summary
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    // @ts-expect-error session type
    if (!session || !requireMentor(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    try {
        await dbConnect();
        // @ts-expect-error session type
        const students = await User.find({ mentorId: session.user.id, role: 'student' }).lean();

        const enriched = await Promise.all(
            students.map(async (s) => {
                const logs = await WellnessLog.find({ userId: s._id }).sort({ date: -1 }).limit(7).lean();
                const avg = logs.reduce((a, l) => ({
                    stress: a.stress + l.stress / logs.length,
                    mood: a.mood + l.mood / logs.length,
                    sleep: a.sleep + l.sleepHours / logs.length,
                    study: a.study + l.studyHours / logs.length,
                }), { stress: 0, mood: 0, sleep: 0, study: 0 });

                const burnout = predictBurnout({ stress: avg.stress || 5, mood: avg.mood || 5, sleepHours: avg.sleep || 7, studyHours: avg.study || 5 });

                return { ...s, wellnessSummary: avg, burnout };
            }),
        );
        return NextResponse.json({ students: enriched });
    } catch (err) {
        console.error('[mentor/students]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
