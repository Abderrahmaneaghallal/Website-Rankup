import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const sections = await prisma.section.findMany({ orderBy: { sortOrder: 'asc' } });
        return NextResponse.json(sections);
    } catch (err) {
        console.error('[GET /api/admin/sections]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        const section = await prisma.section.create({
            data: {
                pageId: body.pageId,
                type: body.type,
                titleFr: body.titleFr || '',
                titleEn: body.titleEn || '',
                titleAr: body.titleAr || '',
                contentFr: body.contentFr || '',
                contentEn: body.contentEn || '',
                contentAr: body.contentAr || '',
                settings: body.settings || '{}',
                sortOrder: body.sortOrder ?? 0,
                isEnabled: body.isEnabled ?? true,
            },
        });
        return NextResponse.json(section, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/sections]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        if (body.reorder && Array.isArray(body.reorder)) {
            for (const item of body.reorder) {
                await prisma.section.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } });
            }
            return NextResponse.json({ success: true });
        }
        const { id, page, ...data } = body;
        void page;
        const section = await prisma.section.update({ where: { id }, data });
        return NextResponse.json(section);
    } catch (err) {
        console.error('[PUT /api/admin/sections]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await req.json();
        await prisma.section.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/sections]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
