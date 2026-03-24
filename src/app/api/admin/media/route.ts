import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(media);
    } catch (err) {
        console.error('[GET /api/admin/media]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });

        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filename = `${timestamp}-${safeName}`;
        const filepath = path.join(uploadsDir, filename);
        await fs.writeFile(filepath, buffer);

        const media = await prisma.media.create({
            data: {
                filename: file.name,
                url: `/uploads/${filename}`,
                altText: (formData.get('altText') as string) || '',
                mimeType: file.type,
                size: file.size,
            },
        });
        return NextResponse.json(media, { status: 201 });
    } catch (err) {
        console.error('[POST /api/admin/media]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id } = await req.json();
        await prisma.media.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[DELETE /api/admin/media]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
