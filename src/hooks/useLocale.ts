'use client';

import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/config';

export function useLocale(): string {
    const pathname = usePathname();
    const segment = pathname.split('/')[1];
    if (locales.includes(segment as typeof locales[number])) {
        return segment;
    }
    return defaultLocale;
}
