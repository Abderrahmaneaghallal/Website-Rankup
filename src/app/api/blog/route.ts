import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const categorySlug = searchParams.get('category') || '';
        const limit = parseInt(searchParams.get('limit') || '50');
        const page = parseInt(searchParams.get('page') || '1');
        const skip = (page - 1) * limit;

        const where: Record<string, unknown> = { status: 'PUBLISHED' };

        if (categorySlug) {
            where.category = { slug: categorySlug };
        }

        if (search) {
            where.OR = [
                { titleFr: { contains: search } },
                { titleEn: { contains: search } },
                { titleAr: { contains: search } },
                { excerptFr: { contains: search } },
                { excerptEn: { contains: search } },
                { tags: { contains: search } },
            ];
        }

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                include: { category: true, author: { select: { name: true } } },
                skip,
                take: limit,
            }),
            prisma.blogPost.count({ where }),
        ]);

        return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        console.error('[GET /api/blog]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
