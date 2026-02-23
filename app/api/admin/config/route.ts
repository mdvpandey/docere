import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import AdminConfig from '@/models/AdminConfig';
import { AdminConfigSchema } from '@/lib/validators';

function requireAdmin(session: unknown) {
    // @ts-expect-error session type
    return session?.user?.role === 'admin';
}

// GET /api/admin/config — get all config
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !requireAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    try {
        await dbConnect();
        const configs = await AdminConfig.find().sort({ module: 1, order: 1 }).lean();
        return NextResponse.json({ configs });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST /api/admin/config — create or update config entry
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !requireAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const body = await req.json();
    const parsed = AdminConfigSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    try {
        await dbConnect();
        const config = await AdminConfig.findOneAndUpdate(
            { key: parsed.data.key },
            parsed.data,
            { upsert: true, new: true },
        );
        return NextResponse.json({ config }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// DELETE /api/admin/config — delete config by key
export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !requireAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { key } = await req.json();
    try {
        await dbConnect();
        await AdminConfig.deleteOne({ key });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
