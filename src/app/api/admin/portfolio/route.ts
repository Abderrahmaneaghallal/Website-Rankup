import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const items = await db.portfolio.findMany({
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        });
        return NextResponse.json(items);
    } catch (err) {
        console.error('[GET /api/admin/portfolio]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        if (!body.slug || !body.titleFr) {
            return NextResponse.json({ error: 'Slug and French title are required' }, { status: 400 });
        }
        const item = await db.portfolio.create({
            data: {
                slug: body.slug,
                titleFr: body.titleFr,
                titleEn: body.titleEn || '',
                titleAr: body.titleAr || '',
                excerptFr: body.excerptFr || '',
                excerptEn: body.excerptEn || '',
                excerptAr: body.excerptAr || '',
                clientName: body.clientName || '',
                industry: body.industry || '',
                tags: body.tags || '',
                results: body.results || '[]',
                galleryImages: body.galleryImages || '[]',
                featuredImage: body.featuredImage || null,
                imageAlt: body.imageAlt || '',
                metaTitleFr: body.metaTitleFr || '',
                metaTitleEn: body.metaTitleEn || '',
                metaTitleAr: body.metaTitleAr || '',
                metaDescFr: body.metaDescFr || '',
                metaDescEn: body.metaDescEn || '',
                metaDescAr: body.metaDescAr || '',
                isFeatured: body.isFeatured ?? false,
                isPublished: body.isPublished ?? true,
                sortOrder: body.sortOrder ?? 0,
            },
        });
        return NextResponse.json(item, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/portfolio]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
