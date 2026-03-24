import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const l = locale as Locale;
    const title = l === 'ar' ? 'تواصل معنا — وكالة تسويق رقمي في المغرب | RankUp' : l === 'en' ? 'Contact Us — Digital Marketing Agency in Morocco | RankUp' : 'Contact — Agence Marketing Digital au Maroc à Agadir | RankUp';
    const description = l === 'ar' ? 'تواصلوا مع رانك أب، وكالة التسويق الرقمي الأولى في المغرب. احصلوا على استشارة مجانية واكتشفوا كيف نسرّع نمو أعمالكم في أكادير، الدار البيضاء، مراكش والرباط.' : l === 'en' ? 'Contact RankUp, the #1 digital marketing agency in Morocco. Get a free consultation and discover how we accelerate business growth in Agadir, Casablanca, Marrakech and Rabat.' : 'Contactez RankUp, agence marketing digital N°1 au Maroc. Obtenez une consultation gratuite et découvrez comment nous accélérons la croissance de votre entreprise à Agadir, Casablanca, Marrakech et Rabat.';
    const url = `https://rankuplus.com/${locale}/contact`;
    return {
        title,
        description,
        keywords: ['contact agence marketing digital maroc', 'agence communication agadir contact', 'devis marketing digital', 'consultation gratuite seo maroc', 'RankUp contact'],
        alternates: {
            canonical: url,
            languages: {
                fr: 'https://rankuplus.com/fr/contact',
                en: 'https://rankuplus.com/en/contact',
                ar: 'https://rankuplus.com/ar/contact',
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'Contact RankUp - Agence Marketing Digital au Maroc' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
