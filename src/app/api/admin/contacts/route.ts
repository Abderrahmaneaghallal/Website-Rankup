import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const contacts = await db.contactSubmission.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(contacts);
    } catch (err) {
        console.error('[GET /api/admin/contacts]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { id, isRead } = await req.json();
        const contact = await db.contactSubmission.update({
            where: { id },
            data: { isRead },
        });
        return NextResponse.json(contact);
    } catch (err) {
        console.error('[PATCH /api/admin/contacts]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
