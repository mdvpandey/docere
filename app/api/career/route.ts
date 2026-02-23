import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import CareerProfile from '@/models/CareerProfile';
import { CareerProfileSchema } from '@/lib/validators';

// GET /api/career
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        await dbConnect();
        const profile = await CareerProfile.findOne({ userId: session.user.id }).lean();
        return NextResponse.json({ profile: profile || null });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST /api/career — update career profile
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = CareerProfileSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    try {
        await dbConnect();
        const profile = await CareerProfile.findOneAndUpdate(
            { userId: session.user.id },
            { ...parsed.data, userId: session.user.id },
            { upsert: true, new: true },
        );
        return NextResponse.json({ profile });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
