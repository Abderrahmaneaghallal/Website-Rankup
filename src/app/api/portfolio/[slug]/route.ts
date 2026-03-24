import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const item = await db.portfolio.findUnique({
            where: { slug },
            include: {
                websites: { where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }] },
                socialDesigns: { where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }] },
                videos: { where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }] },
            },
        });
        if (!item || !item.isPublished) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(item);
    } catch (err) {
        console.error('[GET /api/portfolio/[slug]]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
