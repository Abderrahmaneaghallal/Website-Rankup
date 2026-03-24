import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db = prisma as any;
        const [pages, posts, media, settings, portfolio, contacts, unreadContacts] = await Promise.all([
            prisma.page.count(),
            prisma.blogPost.count(),
            prisma.media.count(),
            prisma.siteSetting.findMany(),
            db.portfolio.count() as Promise<number>,
            db.contactSubmission.count() as Promise<number>,
            db.contactSubmission.count({ where: { isRead: false } }) as Promise<number>,
        ]);
        const published = await prisma.blogPost.count({ where: { status: 'PUBLISHED' } });
        const siteName = (settings as { key: string; value: string }[]).find(s => s.key === 'site_name')?.value || 'RankUp';
        return NextResponse.json({
            pages, posts, publishedPosts: published, media, portfolio,
            contacts, unreadContacts, siteName,
        });
    } catch (err) {
        console.error('[GET /api/admin/stats]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
