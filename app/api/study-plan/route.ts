import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import StudyPlan from '@/models/StudyPlan';

// GET /api/study-plan — get current week's plan
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await dbConnect();
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
        weekStart.setHours(0, 0, 0, 0);

        const plan = await StudyPlan.findOne({ userId: session.user.id, weekStart }).lean() as any;
        if (!plan) return NextResponse.json({ plan: null }, { status: 200 });

        const total = plan.tasks.length;
        const completed = plan.tasks.filter((t: any) => t.completed).length;
        return NextResponse.json({ plan, progress: { total, completed, pct: total ? Math.round((completed / total) * 100) : 0 } });
    } catch (err) {
        console.error('[study-plan GET]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// PATCH /api/study-plan — mark task complete/incomplete
export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { taskId, completed } = await req.json();
    try {
        await dbConnect();
        const plan = await StudyPlan.findOne({ userId: session.user.id }).sort({ weekStart: -1 });
        if (!plan) return NextResponse.json({ error: 'No plan found' }, { status: 404 });

        const task = plan.tasks.find((t: any) => t.id === taskId);
        if (task) { task.completed = completed; await plan.save(); }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[study-plan PATCH]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
