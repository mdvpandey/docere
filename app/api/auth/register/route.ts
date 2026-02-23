import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { RegisterSchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = RegisterSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
        }
        const { name, email, password, role } = parsed.data;
        await dbConnect();
        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, passwordHash, role });
        return NextResponse.json(
            { message: 'Account created successfully', userId: user._id, role: user.role },
            { status: 201 },
        );
    } catch (err) {
        console.error('[register]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
