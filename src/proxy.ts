import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

function getLocale(request: NextRequest): string {
    // Check cookie first
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
        return cookieLocale;
    }

    // Check Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        const preferredLangs = acceptLanguage.split(',').map((lang) => {
            const [code] = lang.trim().split(';');
            return code.split('-')[0].toLowerCase();
        });

        for (const lang of preferredLangs) {
            if (locales.includes(lang as typeof locales[number])) {
                return lang;
            }
        }
    }

    return defaultLocale;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if path already contains a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Skip internal paths, API routes, admin, assets
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/images') ||
        pathname.includes('.') // static files
    ) {
        return;
    }

    // Redirect to locale-prefixed path
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
