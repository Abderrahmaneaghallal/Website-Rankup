import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Public endpoint — no auth required (used by layout to inject scripts)
export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany({
            where: {
                key: {
                    in: [
                        'google_analytics_id',
                        'google_tag_manager_id',
                        'facebook_pixel_id',
                        'tiktok_pixel_id',
                        'hotjar_id',
                        'google_verification',
                        'bing_verification',
                        'yandex_verification',
                        'google_site_kit_verified',
                        'google_ads_id',
                        'clarity_id',
                        'custom_head_scripts',
                        'custom_body_scripts',
                    ],
                },
            },
        });
        const obj: Record<string, string> = {};
        settings.forEach(s => { obj[s.key] = s.value; });
        return NextResponse.json(obj);
    } catch (err) {
        console.error('[GET /api/seo-settings]', err);
        return NextResponse.json({});
    }
}
