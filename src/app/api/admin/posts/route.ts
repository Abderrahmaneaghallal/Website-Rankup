import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: { category: true, author: { select: { name: true, email: true } } },
        });
        return NextResponse.json(posts);
    } catch (err) {
        console.error('[GET /api/admin/posts]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        if (!body.titleFr || !body.slug) {
            return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
        }
        const post = await prisma.blogPost.create({
            data: {
                slug: body.slug,
                titleFr: body.titleFr,
                titleEn: body.titleEn || '',
                titleAr: body.titleAr || '',
                excerptFr: body.excerptFr || '',
                excerptEn: body.excerptEn || '',
                excerptAr: body.excerptAr || '',
                contentFr: body.contentFr || '',
                contentEn: body.contentEn || '',
                contentAr: body.contentAr || '',
                featuredImage: body.featuredImage || null,
                imageAlt: body.imageAlt || '',
                metaTitleFr: body.metaTitleFr || '',
                metaTitleEn: body.metaTitleEn || '',
                metaTitleAr: body.metaTitleAr || '',
                metaDescFr: body.metaDescFr || '',
                metaDescEn: body.metaDescEn || '',
                metaDescAr: body.metaDescAr || '',
                tags: body.tags || '',
                status: body.status || 'DRAFT',
                readTime: body.readTime || 5,
                categoryId: body.categoryId || null,
                authorId: body.authorId,
                publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
            },
        });
        return NextResponse.json(post, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/posts]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
