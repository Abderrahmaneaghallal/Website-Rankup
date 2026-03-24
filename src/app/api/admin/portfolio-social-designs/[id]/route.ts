import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const item = await db.portfolioSocialDesign.findUnique({ where: { id } });
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(item);
    } catch (err) {
        console.error('[GET /api/admin/portfolio-social-designs/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const body = await req.json();
        const { id: _id, createdAt, updatedAt, ...data } = body;
        void _id; void createdAt; void updatedAt;
        const item = await db.portfolioSocialDesign.update({ where: { id }, data });
        return NextResponse.json(item);
    } catch (err) {
        console.error('[PUT /api/admin/portfolio-social-designs/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        await db.portfolioSocialDesign.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/portfolio-social-designs/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
