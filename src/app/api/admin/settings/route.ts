import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
        const obj: Record<string, string> = {};
        settings.forEach(s => { obj[s.key] = s.value; });
        return NextResponse.json(obj);
    } catch (err) {
        console.error('[GET /api/admin/settings]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json() as Record<string, string>;
        for (const [key, value] of Object.entries(body)) {
            await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[PUT /api/admin/settings]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
