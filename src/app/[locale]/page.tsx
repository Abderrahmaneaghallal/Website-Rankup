import type { Metadata } from 'next';
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { organizationSchema, webSiteSchema, professionalServiceSchema, localBusinessSchema } from "@/lib/schema";
import HomePageClient from "./HomePageClient";

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const url = `https://rankuplus.com/${locale}`;
    return {
        title: dict.metadata.title,
        description: dict.metadata.description,
        keywords: [...dict.metadata.keywords, 'agence marketing digital agadir', 'agence communication casablanca', 'agence seo rabat', 'marketing digital marrakech'],
        alternates: {
            canonical: url,
            languages: {
                fr: 'https://rankuplus.com/fr',
                en: 'https://rankuplus.com/en',
                ar: 'https://rankuplus.com/ar',
            },
        },
        openGraph: {
            title: dict.metadata.title,
            description: dict.metadata.description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp - Agence Marketing Digital au Maroc' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.metadata.title,
            description: dict.metadata.description,
        },
    };
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(webSiteSchema())
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema())
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(professionalServiceSchema())
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(localBusinessSchema())
            }} />
            <HomePageClient dict={dict} locale={locale} />
        </>
    );
}
