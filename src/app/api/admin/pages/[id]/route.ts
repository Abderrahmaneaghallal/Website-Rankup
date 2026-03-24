import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const page = await prisma.page.findUnique({ where: { id }, include: { sections: { orderBy: { sortOrder: 'asc' } } } });
        if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(page);
    } catch (err) {
        console.error('[GET /api/admin/pages/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const body = await req.json();
        const { sections, _count, ...data } = body;
        void sections; void _count;
        const page = await prisma.page.update({ where: { id }, data });
        return NextResponse.json(page);
    } catch (err) {
        console.error('[PUT /api/admin/pages/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const page = await prisma.page.findUnique({ where: { id } });
        if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        if (page.isSystem) return NextResponse.json({ error: 'Cannot delete system page' }, { status: 403 });
        await prisma.page.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/pages/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
