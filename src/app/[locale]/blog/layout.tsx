import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const l = locale as Locale;
    const title = l === 'ar' ? 'مدونة التسويق الرقمي في المغرب — مقالات وأدلة SEO | RankUp' : l === 'en' ? 'Digital Marketing Blog Morocco — SEO Guides & Articles | RankUp' : 'Blog Marketing Digital au Maroc — Guides SEO & Articles | RankUp';
    const description = l === 'ar' ? 'اقرأوا مقالاتنا وأدلتنا حول التسويق الرقمي وSEO والإعلانات الرقمية في المغرب. نصائح من خبراء رانك أب في أكادير.' : l === 'en' ? 'Read our articles and guides on digital marketing, SEO and online advertising in Morocco. Expert tips from RankUp in Agadir.' : 'Lisez nos articles et guides sur le marketing digital, le SEO et la publicité en ligne au Maroc. Conseils d\'experts RankUp à Agadir.';
    const url = `https://rankuplus.com/${locale}/blog`;
    return {
        title,
        description,
        keywords: ['blog marketing digital maroc', 'articles seo maroc', 'guides marketing digital', 'actualités seo', 'conseils marketing digital agadir', 'RankUp blog'],
        alternates: {
            canonical: url,
            languages: {
                fr: 'https://rankuplus.com/fr/blog',
                en: 'https://rankuplus.com/en/blog',
                ar: 'https://rankuplus.com/ar/blog',
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp Blog - Marketing Digital au Maroc' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
