import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { sortOrder: 'asc' },
            include: { _count: { select: { posts: true } } },
        });
        return NextResponse.json(categories);
    } catch (err) {
        console.error('[GET /api/admin/categories]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        if (!body.slug || !body.nameFr) {
            return NextResponse.json({ error: 'Slug and French name are required' }, { status: 400 });
        }
        const cat = await prisma.blogCategory.create({
            data: { slug: body.slug, nameFr: body.nameFr, nameEn: body.nameEn || '', nameAr: body.nameAr || '' },
        });
        return NextResponse.json(cat, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/categories]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await req.json();
        await prisma.blogCategory.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/categories]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
