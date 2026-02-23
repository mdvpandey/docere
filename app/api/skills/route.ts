import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import SkillProfile from '@/models/SkillProfile';
import { SkillAnalysisSchema } from '@/lib/validators';
import { analyzeSkillGap } from '@/lib/ai';

// GET /api/skills
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        await dbConnect();
        const profile = await SkillProfile.findOne({ userId: session.user.id }).lean();
        return NextResponse.json({ profile: profile || null });
    } catch (err) {
        console.error('[skills GET]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST /api/skills — run gap analysis
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = SkillAnalysisSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    try {
        await dbConnect();
        const { niche, role, skills } = parsed.data;
        const analysis = analyzeSkillGap(role, skills);

        const profile = await SkillProfile.findOneAndUpdate(
            { userId: session.user.id },
            {
                niche, preferredRole: role, skills,
                gaps: analysis.missingSkills,
                roadmap: analysis.roadmap.map((r) => ({ ...r, completed: false })),
                lastAnalyzed: new Date(),
            },
            { upsert: true, new: true },
        );

        return NextResponse.json({ profile, analysis });
    } catch (err) {
        console.error('[skills POST]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
