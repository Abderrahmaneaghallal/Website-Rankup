import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const l = locale as Locale;
    const title = l === 'ar' ? 'خدمات التسويق الرقمي في المغرب — SEO، إعلانات، تصميم | RankUp' : l === 'en' ? 'Digital Marketing Services in Morocco — SEO, Ads, Design | RankUp' : 'Services Marketing Digital au Maroc — SEO, Publicité, Design | RankUp';
    const description = l === 'ar' ? 'اكتشفوا خدمات التسويق الرقمي الشاملة مع رانك أب في أكادير. SEO، إعلانات جوجل، تصميم مواقع، وسائل التواصل والتصميم الجرافيكي. خدمات متاحة في الدار البيضاء ومراكش والرباط.' : l === 'en' ? 'Discover comprehensive digital marketing services with RankUp in Agadir. SEO, Google Ads, web design, social media and graphic design. Available in Casablanca, Marrakech and Rabat.' : 'Découvrez les services complets de marketing digital avec RankUp à Agadir. SEO, Google Ads, création de sites web, réseaux sociaux et design graphique. Services disponibles à Casablanca, Marrakech et Rabat.';
    const url = `https://rankuplus.com/${locale}/services`;
    return {
        title,
        description,
        keywords: ['services marketing digital maroc', 'agence seo agadir', 'google ads maroc', 'création site web maroc', 'réseaux sociaux maroc', 'design graphique agadir', 'RankUp services'],
        alternates: {
            canonical: url,
            languages: {
                fr: 'https://rankuplus.com/fr/services',
                en: 'https://rankuplus.com/en/services',
                ar: 'https://rankuplus.com/ar/services',
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp - Services Marketing Digital au Maroc' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
