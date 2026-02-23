import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import WellnessLog from '@/models/WellnessLog';
import { WellnessLogSchema } from '@/lib/validators';
import { predictBurnout } from '@/lib/ai';

// POST /api/wellness/log — submit daily wellness log
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = WellnessLogSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    try {
        await dbConnect();
        const { mood, stress, sleepHours, studyHours, notes, date } = parsed.data;
        const burnout = predictBurnout({ mood, stress, sleepHours, studyHours });

        const log = await WellnessLog.create({
            userId: session.user.id,
            date: date ? new Date(date) : new Date(),
            mood, stress, sleepHours, studyHours, notes,
            burnoutScore: burnout.score,
            burnoutRisk: burnout.risk,
        });

        return NextResponse.json({ log, burnout }, { status: 201 });
    } catch (err) {
        console.error('[wellness/log]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// GET /api/wellness/log — get recent logs
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await dbConnect();
        const logs = await WellnessLog.find({ userId: session.user.id })
            .sort({ date: -1 })
            .limit(30)
            .lean();

        // Compute weekly summary
        const last7 = logs.slice(0, 7);
        const avgStress = last7.reduce((a, l) => a + l.stress, 0) / Math.max(last7.length, 1);
        const avgMood = last7.reduce((a, l) => a + l.mood, 0) / Math.max(last7.length, 1);
        const avgSleep = last7.reduce((a, l) => a + l.sleepHours, 0) / Math.max(last7.length, 1);
        const avgStudy = last7.reduce((a, l) => a + l.studyHours, 0) / Math.max(last7.length, 1);

        const burnout = predictBurnout({ mood: avgMood, stress: avgStress, sleepHours: avgSleep, studyHours: avgStudy });

        return NextResponse.json({
            logs,
            summary: { avgStress, avgMood, avgSleep, avgStudy, burnout },
        });
    } catch (err) {
        console.error('[wellness GET]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
