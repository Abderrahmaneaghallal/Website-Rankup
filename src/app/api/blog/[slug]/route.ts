import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: { category: true, author: { select: { name: true } } },
        });

        if (!post || post.status !== 'PUBLISHED') {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (err) {
        console.error('[GET /api/blog/[slug]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
