import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const post = await prisma.blogPost.findUnique({
            where: { id },
            include: { category: true, author: { select: { name: true } } },
        });
        if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(post);
    } catch (err) {
        console.error('[GET /api/admin/posts/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        const body = await req.json();
        if (body.status === 'PUBLISHED' && !body.publishedAt) body.publishedAt = new Date();
        // Remove relational fields that can't be directly updated
        const { category, author, ...data } = body;
        void category; void author;
        const post = await prisma.blogPost.update({ where: { id }, data });
        return NextResponse.json(post);
    } catch (err) {
        console.error('[PUT /api/admin/posts/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await params;
        await prisma.blogPost.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/posts/[id]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
