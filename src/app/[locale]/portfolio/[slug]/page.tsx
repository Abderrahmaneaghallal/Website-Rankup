import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { breadcrumbSchema } from '@/lib/schema';
import { locales, type Locale } from '@/i18n/config';
import PortfolioDetailClient from './PortfolioDetailClient';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const items = await prisma.portfolio.findMany({ where: { isPublished: true }, select: { slug: true } });
    return locales.flatMap(locale => items.map(item => ({ locale, slug: item.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const l = locale as Locale;
    const item = await prisma.portfolio.findUnique({ where: { slug } });
    if (!item) return {};

    const title = l === 'en' ? item.metaTitleEn || item.titleEn || item.titleFr
        : l === 'ar' ? item.metaTitleAr || item.titleAr || item.titleFr
            : item.metaTitleFr || item.titleFr;

    const description = l === 'en' ? item.metaDescEn || item.excerptEn || item.excerptFr
        : l === 'ar' ? item.metaDescAr || item.excerptAr || item.excerptFr
            : item.metaDescFr || item.excerptFr;

    const url = `https://rankuplus.com/${locale}/portfolio/${slug}`;
    return {
        title,
        description,
        keywords: ['portfolio marketing digital', 'réalisations agence digitale maroc', 'RankUp projet', item.industry || ''],
        alternates: {
            canonical: url,
            languages: {
                fr: `https://rankuplus.com/fr/portfolio/${slug}`,
                en: `https://rankuplus.com/en/portfolio/${slug}`,
                ar: `https://rankuplus.com/ar/portfolio/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: item.featuredImage ? [{ url: item.featuredImage, alt: item.imageAlt || title }] : [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp Portfolio' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function PortfolioDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    const l = locale as Locale;

    const item = await prisma.portfolio.findUnique({ where: { slug } });
    if (!item || !item.isPublished) notFound();

    const title = l === 'en' ? item.titleEn || item.titleFr : l === 'ar' ? item.titleAr || item.titleFr : item.titleFr;
    const excerpt = l === 'en' ? item.excerptEn || item.excerptFr : l === 'ar' ? item.excerptAr || item.excerptFr : item.excerptFr;

    const parseResults = (raw: string): string[] => {
        try { return JSON.parse(raw) as string[]; } catch { return []; }
    };
    const results = parseResults(item.results);
    const tags = item.tags ? item.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const schemaJson = JSON.stringify(breadcrumbSchema([
        { name: l === 'ar' ? 'الرئيسية' : l === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${l}` },
        { name: 'Portfolio', url: `https://rankuplus.com/${l}/portfolio` },
        { name: title, url: `https://rankuplus.com/${l}/portfolio/${slug}` },
    ]));

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
            <PortfolioDetailClient
                item={{
                    title, excerpt, clientName: item.clientName, industry: item.industry,
                    featuredImage: item.featuredImage, imageAlt: item.imageAlt,
                    results, tags, slug, galleryImages: item.galleryImages,
                }}
                locale={l}
            />
        </>
    );
}
