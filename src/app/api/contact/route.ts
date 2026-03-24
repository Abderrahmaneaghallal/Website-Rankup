import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Honeypot: if 'website' field is filled, silently ignore (bot)
        if (body.website) {
            return NextResponse.json({ success: true });
        }

        // Validate required fields
        if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
            return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        await db.contactSubmission.create({
            data: {
                name: body.name.trim(),
                email: body.email.trim().toLowerCase(),
                phone: body.phone?.trim() || '',
                service: body.service || '',
                message: body.message.trim(),
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[POST /api/contact]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
