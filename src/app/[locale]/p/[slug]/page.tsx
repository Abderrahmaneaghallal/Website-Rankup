import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { type Locale } from '@/i18n/config';
import DynamicPageRenderer from './DynamicPageRenderer';

type Props = { params: Promise<{ locale: string; slug: string }> };

function getLangField(obj: any, field: string, locale: string): string {
    const suffix = locale === 'ar' ? 'Ar' : locale === 'en' ? 'En' : 'Fr';
    return obj[`${field}${suffix}`] || obj[`${field}Fr`] || '';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    try {
        const page = await prisma.page.findUnique({ where: { slug } });
        if (!page || !page.isPublished) return {};

        const title = getLangField(page, 'ogTitle', locale) || getLangField(page, 'title', locale);
        const description = getLangField(page, 'metaDesc', locale);

        const metadata: Metadata = {
            title: title || undefined,
            description: description || undefined,
            robots: page.robots || 'index, follow',
        };

        // OG tags
        if (title || page.ogImage) {
            metadata.openGraph = {
                title: title || undefined,
                description: description || undefined,
                url: page.canonicalUrl || `https://rankuplus.com/${locale}/p/${slug}`,
                siteName: 'RankUp',
                ...(page.ogImage && { images: [{ url: page.ogImage, width: 1200, height: 630 }] }),
            };
        }

        // Twitter card
        metadata.twitter = {
            card: 'summary_large_image',
            title: title || undefined,
            description: description || undefined,
            ...(page.ogImage && { images: [page.ogImage] }),
        };

        // Canonical
        if (page.canonicalUrl) {
            metadata.alternates = { canonical: page.canonicalUrl };
        }

        return metadata;
    } catch {
        return {};
    }
}

export default async function CmsPage({ params }: Props) {
    const { locale, slug } = await params;

    let page;
    try {
        page = await prisma.page.findUnique({
            where: { slug },
            include: { sections: { where: { isEnabled: true }, orderBy: { sortOrder: 'asc' } } },
        });
    } catch {
        notFound();
    }

    if (!page || !page.isPublished) notFound();

    // Pass serializable data to client component
    const pageData = {
        id: page.id,
        slug: page.slug,
        titleFr: page.titleFr,
        titleEn: page.titleEn,
        titleAr: page.titleAr,
        template: page.template,
        schemaType: page.schemaType,
        schemaData: page.schemaData,
        customHeadCode: page.customHeadCode,
        sections: page.sections.map(s => ({
            id: s.id,
            type: s.type,
            titleFr: s.titleFr,
            titleEn: s.titleEn,
            titleAr: s.titleAr,
            contentFr: s.contentFr,
            contentEn: s.contentEn,
            contentAr: s.contentAr,
            settings: s.settings,
            sortOrder: s.sortOrder,
        })),
    };

    return (
        <>
            {/* Schema.org JSON-LD */}
            {page.schemaType && page.schemaData && page.schemaData !== '{}' && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.schemaData }} />
            )}

            {/* Custom head code */}
            {page.customHeadCode && (
                <div dangerouslySetInnerHTML={{ __html: page.customHeadCode }} />
            )}

            <DynamicPageRenderer page={pageData} locale={locale as Locale} />
        </>
    );
}
