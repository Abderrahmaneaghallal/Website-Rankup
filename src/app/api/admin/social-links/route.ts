import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

const SOCIAL_KEYS = [
    'social_instagram',
    'social_facebook',
    'social_tiktok',
    'social_youtube',
    'social_linkedin',
    'social_twitter',
    'social_behance',
    'social_dribbble',
    'social_pinterest',
    'social_whatsapp',
    'social_telegram',
    'portfolio_behance_url',
    'portfolio_dribbble_url',
    'portfolio_github_url',
];

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const settings = await db.siteSetting.findMany({
            where: { key: { in: SOCIAL_KEYS } },
        });
        // Convert to key-value object
        const result: Record<string, string> = {};
        SOCIAL_KEYS.forEach(key => { result[key] = ''; });
        settings.forEach((s: { key: string; value: string }) => { result[s.key] = s.value; });
        return NextResponse.json(result);
    } catch (err) {
        console.error('[GET /api/admin/social-links]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        // Upsert each social link
        const promises = Object.entries(body)
            .filter(([key]) => SOCIAL_KEYS.includes(key))
            .map(([key, value]) =>
                db.siteSetting.upsert({
                    where: { key },
                    update: { value: String(value) },
                    create: { key, value: String(value) },
                })
            );
        await Promise.all(promises);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[PUT /api/admin/social-links]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
