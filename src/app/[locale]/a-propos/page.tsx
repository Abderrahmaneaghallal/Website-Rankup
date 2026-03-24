import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { breadcrumbSchema, organizationSchema, faqSchema } from '@/lib/schema';
import { getAboutPageData } from '@/i18n/pageTranslations';
import AboutPageClient from './AboutPageClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const l = locale as Locale;
    const title = l === 'ar' ? 'من نحن — وكالة تسويق رقمي في المغرب | RankUp' : l === 'en' ? 'About Us — Digital Marketing Agency in Morocco | RankUp' : 'À Propos — Agence Marketing Digital au Maroc à Agadir | RankUp';
    const description = l === 'ar' ? 'اكتشفوا رانك أب، وكالة التسويق الرقمي الأولى في المغرب. فريق خبراء معتمد Google و Meta بأكادير.' : l === 'en' ? 'Discover RankUp, the #1 digital marketing agency in Morocco. Google & Meta certified expert team based in Agadir, serving Casablanca, Marrakech, Rabat.' : 'Découvrez RankUp, agence marketing digital N°1 au Maroc. Équipe d\'experts certifiés Google & Meta basée à Agadir, au service de Casablanca, Marrakech, Rabat.';
    const url = `https://rankuplus.com/${locale}/a-propos`;
    return {
        title,
        description,
        keywords: ['agence marketing digital maroc', 'agence communication agadir', 'agence digitale maroc', 'RankUp', 'marketing digital casablanca', 'agence seo maroc'],
        alternates: {
            canonical: url,
            languages: {
                fr: 'https://rankuplus.com/fr/a-propos',
                en: 'https://rankuplus.com/en/a-propos',
                ar: 'https://rankuplus.com/ar/a-propos',
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp - Agence Marketing Digital au Maroc' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    const d = getAboutPageData(locale);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${locale}` },
                    { name: locale === 'ar' ? 'حول' : locale === 'en' ? 'About' : 'À Propos', url: `https://rankuplus.com/${locale}/a-propos` },
                ]))
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema())
            }} />
            {d.faqs && d.faqs.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema(d.faqs))
                }} />
            )}
            <AboutPageClient />
        </>
    );
}
