import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import SectionDots from "@/components/SectionDots";
import MouseGlow from "@/components/MouseGlow";
import { locales, localeDirection, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { SectionImagesProvider } from "@/hooks/useSectionImages";

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);

    return {
        metadataBase: new URL("https://rankuplus.com"),
        title: {
            default: dict.metadata.title,
            template: "%s | RankUp",
        },
        description: dict.metadata.description,
        keywords: dict.metadata.keywords,
        openGraph: {
            type: "website",
            locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
            siteName: "RankUp",
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp - Agence Marketing Digital au Maroc' }],
        },
        twitter: {
            card: "summary_large_image",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        alternates: {
            languages: {
                fr: "/fr",
                en: "/en",
                ar: "/ar",
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dir = localeDirection[locale as Locale] || "ltr";
    const dict = await getDictionary(locale as Locale);

    return (
        <div lang={locale} dir={dir}>
            <SectionImagesProvider>
                <SmoothScroll>
                    <MouseGlow />
                    <div className="noise" aria-hidden="true" />
                    <Navbar locale={locale} dict={dict.nav} />
                    <SectionDots locale={locale} />
                    <main>{children}</main>
                    <PreFooter locale={locale} dict={dict.prefooter} />
                    <Footer locale={locale} dict={dict.footer} />
                    <WhatsAppButton locale={locale} />
                </SmoothScroll>
            </SectionImagesProvider>
        </div>
    );
}
