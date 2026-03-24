import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function GET(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const portfolioId = req.nextUrl.searchParams.get('portfolioId');
        const where = portfolioId ? { portfolioId } : {};
        const items = await db.portfolioWebsite.findMany({
            where,
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        });
        return NextResponse.json(items);
    } catch (err) {
        console.error('[GET /api/admin/portfolio-websites]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        if (!body.title || !body.portfolioId) {
            return NextResponse.json({ error: 'Title and portfolioId are required' }, { status: 400 });
        }
        const item = await db.portfolioWebsite.create({
            data: {
                portfolioId: body.portfolioId,
                title: body.title,
                category: body.category || '',
                url: body.url || '',
                screenshotUrl: body.screenshotUrl || null,
                gradient: body.gradient || 'from-violet-900/80 via-purple-800/60 to-indigo-900/80',
                accentColor: body.accentColor || '#8b5cf6',
                descriptionFr: body.descriptionFr || '',
                descriptionEn: body.descriptionEn || '',
                descriptionAr: body.descriptionAr || '',
                statTraffic: body.statTraffic || '',
                statConversion: body.statConversion || '',
                statSpeed: body.statSpeed || '',
                mockupSections: body.mockupSections || '[]',
                isFeatured: body.isFeatured ?? false,
                isPublished: body.isPublished ?? true,
                sortOrder: body.sortOrder ?? 0,
            },
        });
        return NextResponse.json(item, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/portfolio-websites]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
