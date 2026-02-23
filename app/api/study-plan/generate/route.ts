import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import StudyPlan from '@/models/StudyPlan';
import WellnessLog from '@/models/WellnessLog';
import { generateStudyPlan } from '@/lib/ai';
import { GenerateStudyPlanSchema } from '@/lib/validators';

// POST /api/study-plan/generate — generate AI study plan
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = GenerateStudyPlanSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    try {
        await dbConnect();

        // Get recent wellness data to adapt plan
        const recentLogs = await WellnessLog.find({ userId: session.user.id })
            .sort({ date: -1 })
            .limit(7)
            .lean();

        const avgStress = recentLogs.reduce((a, l) => a + l.stress, 0) / Math.max(recentLogs.length, 1);
        const avgBurnout = recentLogs.reduce((a, l) => a + (l.burnoutScore || 20), 0) / Math.max(recentLogs.length, 1);

        const plan = generateStudyPlan(parsed.data.niche, avgBurnout, 70 - avgStress * 3);
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);

        // Upsert current week plan
        const saved = await StudyPlan.findOneAndUpdate(
            { userId: session.user.id, weekStart },
            { ...plan, userId: session.user.id, weekStart, niche: parsed.data.niche, aiGenerated: true },
            { upsert: true, new: true },
        );

        return NextResponse.json({ plan: saved }, { status: 201 });
    } catch (err) {
        console.error('[study-plan/generate]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
