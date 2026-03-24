import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function GET() {
    try {
        const items = await db.portfolio.findMany({
            where: { isPublished: true },
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
            include: {
                websites: { where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }] },
                socialDesigns: { where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }] },
                videos: { where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }] },
            },
        });
        return NextResponse.json(items);
    } catch (err) {
        console.error('[GET /api/portfolio]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
