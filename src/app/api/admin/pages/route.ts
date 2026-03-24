import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const pages = await prisma.page.findMany({ orderBy: { sortOrder: 'asc' }, include: { _count: { select: { sections: true } } } });
        return NextResponse.json(pages);
    } catch (err) {
        console.error('[GET /api/admin/pages]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        if (!body.slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        const page = await prisma.page.create({ data: { slug: body.slug, titleFr: body.titleFr || '', titleEn: body.titleEn || '', titleAr: body.titleAr || '', metaDescFr: body.metaDescFr || '', metaDescEn: body.metaDescEn || '', metaDescAr: body.metaDescAr || '', ogTitleFr: body.ogTitleFr || '', ogTitleEn: body.ogTitleEn || '', ogTitleAr: body.ogTitleAr || '', ogImage: body.ogImage || null, canonicalUrl: body.canonicalUrl || '', robots: body.robots || 'index, follow', schemaType: body.schemaType || '', schemaData: body.schemaData || '{}', customHeadCode: body.customHeadCode || '', isPublished: body.isPublished ?? false, template: body.template || 'default', featuredImage: body.featuredImage || null, sortOrder: body.sortOrder ?? 0 } });
        return NextResponse.json(page, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/pages]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
