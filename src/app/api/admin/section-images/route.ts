import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import path from 'path';
import fs from 'fs/promises';

// GET all section images
export async function GET() {
    try {
        const images = await prisma.sectionImage.findMany({ orderBy: { sectionKey: 'asc' } });
        return NextResponse.json(images);
    } catch (err) {
        console.error('[GET /api/admin/section-images]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST — upsert a section image (create or update by sectionKey)
export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const formData = await req.formData();
        const sectionKey = formData.get('sectionKey') as string;
        if (!sectionKey) return NextResponse.json({ error: 'Missing sectionKey' }, { status: 400 });

        let imageUrl: string | undefined;
        const file = formData.get('file') as File | null;

        // If a file was uploaded, save it
        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'sections');
            await fs.mkdir(uploadsDir, { recursive: true });

            const timestamp = Date.now();
            const ext = file.name.split('.').pop() || 'jpg';
            const safeName = sectionKey.replace(/\./g, '-');
            const filename = `${safeName}-${timestamp}.${ext}`;
            const filepath = path.join(uploadsDir, filename);
            await fs.writeFile(filepath, buffer);
            imageUrl = `/uploads/sections/${filename}`;
        } else {
            // Use provided URL if no file
            imageUrl = (formData.get('imageUrl') as string) || undefined;
        }

        const data: any = {};
        if (imageUrl) data.imageUrl = imageUrl;
        if (formData.has('altText')) data.altText = formData.get('altText') as string;
        if (formData.has('titleFr')) data.titleFr = formData.get('titleFr') as string;
        if (formData.has('titleEn')) data.titleEn = formData.get('titleEn') as string;
        if (formData.has('titleAr')) data.titleAr = formData.get('titleAr') as string;
        if (formData.has('descFr')) data.descFr = formData.get('descFr') as string;
        if (formData.has('descEn')) data.descEn = formData.get('descEn') as string;
        if (formData.has('descAr')) data.descAr = formData.get('descAr') as string;
        if (formData.has('isEnabled')) data.isEnabled = formData.get('isEnabled') === 'true';

        // Check if section image already exists
        const existing = await prisma.sectionImage.findUnique({ where: { sectionKey } });

        let result;
        if (existing) {
            result = await prisma.sectionImage.update({ where: { sectionKey }, data });
        } else {
            if (!imageUrl) return NextResponse.json({ error: 'Image required for new section' }, { status: 400 });
            result = await prisma.sectionImage.create({
                data: { sectionKey, imageUrl, ...data },
            });
        }
        return NextResponse.json(result, { status: existing ? 200 : 201 });
    } catch (err) {
        console.error('[POST /api/admin/section-images]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE a section image
export async function DELETE(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { sectionKey } = await req.json();
        if (!sectionKey) return NextResponse.json({ error: 'Missing sectionKey' }, { status: 400 });

        const image = await prisma.sectionImage.findUnique({ where: { sectionKey } });
        if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Try to delete the file from disk
        if (image.imageUrl.startsWith('/uploads/')) {
            const filepath = path.join(process.cwd(), 'public', image.imageUrl);
            await fs.unlink(filepath).catch(() => { });
        }

        await prisma.sectionImage.delete({ where: { sectionKey } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/section-images]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
