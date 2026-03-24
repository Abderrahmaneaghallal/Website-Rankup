import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Public endpoint — no auth required (frontend uses this)
export async function GET() {
    try {
        const images = await prisma.sectionImage.findMany({
            where: { isEnabled: true },
            orderBy: { sectionKey: 'asc' },
        });
        // Return as a key-value map for easy lookup
        const map: Record<string, { imageUrl: string; altText: string; titleFr: string; titleEn: string; titleAr: string; descFr: string; descEn: string; descAr: string }> = {};
        for (const img of images) {
            map[img.sectionKey] = {
                imageUrl: img.imageUrl,
                altText: img.altText,
                titleFr: img.titleFr,
                titleEn: img.titleEn,
                titleAr: img.titleAr,
                descFr: img.descFr,
                descEn: img.descEn,
                descAr: img.descAr,
            };
        }
        return NextResponse.json(map);
    } catch (err) {
        console.error('[GET /api/section-images]', err);
        return NextResponse.json({});
    }
}
