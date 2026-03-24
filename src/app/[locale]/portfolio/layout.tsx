import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const l = locale as Locale;
    const title = l === 'ar' ? 'أعمالنا ومشاريعنا — وكالة تسويق رقمي في المغرب | RankUp' : l === 'en' ? 'Our Work & Projects — Digital Marketing Agency Morocco | RankUp' : 'Portfolio & Réalisations — Agence Marketing Digital au Maroc | RankUp';
    const description = l === 'ar' ? 'اكتشفوا مشاريعنا ودراسات الحالة في التسويق الرقمي. نتائج ملموسة لشركات في أكادير والدار البيضاء ومراكش والرباط.' : l === 'en' ? 'Discover our digital marketing projects and case studies. Concrete results for businesses in Agadir, Casablanca, Marrakech and Rabat.' : 'Découvrez nos réalisations et études de cas en marketing digital. Résultats concrets pour des entreprises à Agadir, Casablanca, Marrakech et Rabat.';
    const url = `https://rankuplus.com/${locale}/portfolio`;
    return {
        title,
        description,
        keywords: ['portfolio marketing digital maroc', 'réalisations agence digitale', 'études de cas marketing', 'projets web maroc', 'RankUp portfolio'],
        alternates: {
            canonical: url,
            languages: {
                fr: 'https://rankuplus.com/fr/portfolio',
                en: 'https://rankuplus.com/en/portfolio',
                ar: 'https://rankuplus.com/ar/portfolio',
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp Portfolio - Marketing Digital au Maroc' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
