import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';
import { FeedbackSchema } from '@/lib/validators';
import { analyzeFeedback } from '@/lib/ai';

// GET /api/feedback
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        await dbConnect();
        const feedbacks = await Feedback.find({ userId: session.user.id }).sort({ weekOf: -1 }).limit(10).lean();
        return NextResponse.json({ feedbacks });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST /api/feedback
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = FeedbackSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    try {
        await dbConnect();
        const { difficultyRating, satisfactionScore, stressTriggers, comments, weekOf } = parsed.data;
        const aiAnalysis = analyzeFeedback(comments || '', satisfactionScore);

        const feedback = await Feedback.create({
            userId: session.user.id,
            weekOf: weekOf ? new Date(weekOf) : new Date(),
            difficultyRating, satisfactionScore,
            stressTriggers: stressTriggers || [],
            comments, aiAnalysis,
        });

        return NextResponse.json({ feedback }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
