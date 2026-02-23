import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import AdminConfig from '@/models/AdminConfig';
import User from '@/models/User';
import WellnessLog from '@/models/WellnessLog';
import { AdminConfigSchema } from '@/lib/validators';

function requireAdmin(session: any) {
    return session?.user?.role === 'admin';
}

// GET /api/admin/analytics
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !requireAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    try {
        await dbConnect();
        const [totalUsers, students, mentors, admins, totalLogs] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'mentor' }),
            User.countDocuments({ role: 'admin' }),
            WellnessLog.countDocuments(),
        ]);

        // Platform-wide stress avg (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const stressAgg = await WellnessLog.aggregate([
            { $match: { date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: null, avgStress: { $avg: '$stress' }, avgMood: { $avg: '$mood' }, avgSleep: { $avg: '$sleepHours' } } },
        ]);

        const highBurnoutStudents = await WellnessLog.aggregate([
            { $match: { burnoutRisk: 'high', date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: '$userId' } },
            { $count: 'total' },
        ]);

        return NextResponse.json({
            users: { total: totalUsers, students, mentors, admins },
            wellness: stressAgg[0] || { avgStress: 0, avgMood: 0, avgSleep: 0 },
            highBurnoutCount: highBurnoutStudents[0]?.total || 0,
            totalWellnessLogs: totalLogs,
        });
    } catch (err) {
        console.error('[admin/analytics]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
