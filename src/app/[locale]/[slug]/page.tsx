import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, getAllCitySlugs, getCityBySlug, t } from '@/data/cities';
import { breadcrumbSchema, faqSchema, cityLocalBusinessSchema } from '@/lib/schema';
import { locales, type Locale } from '@/i18n/config';
import FAQAccordion from '@/components/FAQAccordion';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/CTASection';
import SectionHeader from '@/components/SectionHeader';
import { SectionDivider } from '@/components/ScrollEffects';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const slugs = getAllCitySlugs();
    return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const city = getCityBySlug(slug);
    if (!city) return {};
    const url = `https://rankuplus.com/${locale}/${slug}`;
    const title = t(city.metaTitle, locale);
    const description = t(city.metaDescription, locale);
    return {
        title,
        description,
        keywords: [`agence marketing digital ${city.name.toLowerCase()}`, `agence communication ${city.name.toLowerCase()}`, `agence seo ${city.name.toLowerCase()}`, `marketing digital ${city.name.toLowerCase()}`, 'agence marketing digital maroc', 'RankUp', city.name],
        alternates: {
            canonical: url,
            languages: {
                fr: `https://rankuplus.com/fr/${slug}`,
                en: `https://rankuplus.com/en/${slug}`,
                ar: `https://rankuplus.com/ar/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: `https://rankuplus.com/images/cities/${slug.replace('agence-marketing-digital-', '')}.png`, width: 1200, height: 630, alt: `RankUp - ${city.name}` }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function CityDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    const l = locale as Locale;

    // Guard: only render for valid city slugs, otherwise 404
    const validSlugs = getAllCitySlugs();
    if (!validSlugs.includes(slug)) notFound();

    const city = getCityBySlug(slug);
    if (!city) notFound();

    const tCta = l === 'ar' ? 'تواصلوا معنا' : l === 'en' ? 'Contact us' : 'Contactez-nous';
    const tHome = l === 'ar' ? 'الرئيسية' : l === 'en' ? 'Home' : 'Accueil';
    const tBackHome = l === 'ar' ? 'العودة للرئيسية' : l === 'en' ? 'Back to Home' : 'Retour à l\'accueil';

    // Prepare FAQ items with locale-resolved strings for the FAQAccordion component
    const faqItems = city.faq.map(f => ({
        question: t(f.question, l),
        answer: t(f.answer, l),
    }));

    return (
        <>
            {/* Breadcrumb JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: tHome, url: `https://rankuplus.com/${l}` },
                    { name: city.name, url: `https://rankuplus.com/${l}/${slug}` },
                ]))
            }} />
            {/* City LocalBusiness Schema */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(cityLocalBusinessSchema(city.name, slug, city.lat, city.lng))
            }} />
            {/* FAQ Schema */}
            {faqItems.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema(faqItems))
                }} />
            )}

            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-navy-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-cyan/5" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 text-center">
                    <Link href={`/${l}`} className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-accent-purple transition-colors mb-8">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {tBackHome}
                    </Link>
                    <div className="text-5xl mb-6">{city.emoji}</div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6">
                        {t(city.heroTitle, l)}{' '}
                        <span className="gradient-text">{t(city.heroHighlight, l)}</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">{t(city.heroSubtitle, l)}</p>
                    <Link href={`/${l}/contact`} className="btn-primary">
                        {tCta}
                        <span className="btn-arrow">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </section>

            <SectionDivider />

            {/* Intro */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true}>
                        <div className="max-w-3xl mx-auto text-gray-300 text-base leading-relaxed">
                            {t(city.intro, l)}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <SectionDivider />

            {/* Key Stats */}
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={l === 'ar' ? '✦ الأرقام' : l === 'en' ? '✦ Key Stats' : '✦ Chiffres clés'}
                            title={l === 'ar' ? 'أرقام تتحدث عن نفسها' : l === 'en' ? 'Numbers that speak for themselves' : 'Des chiffres qui parlent'}
                            subtitle=""
                        />
                    </ScrollReveal>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {city.keyStats.map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 0.1} blur={true} scale={true}>
                                <div className="glass-card p-6 text-center">
                                    <div className="text-3xl sm:text-4xl font-bold gradient-text font-heading mb-2">
                                        {stat.value}{stat.suffix}
                                    </div>
                                    <p className="text-gray-400 text-sm">{t(stat.label, l)}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Industries We Serve */}
            {city.industries.length > 0 && (
                <section className="relative section-padding bg-navy-950 overflow-hidden">
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ القطاعات' : l === 'en' ? '✦ Industries' : '✦ Secteurs'}
                                title={l === 'ar' ? 'القطاعات التي نخدمها' : l === 'en' ? 'Industries we serve' : 'Secteurs que nous accompagnons'}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {city.industries.map((ind, i) => (
                                <ScrollReveal key={i} delay={i * 0.08} blur={true} scale={true}>
                                    <div className="glass-card p-6 h-full">
                                        <div className="text-3xl mb-4">{ind.icon}</div>
                                        <h3 className="text-white font-semibold font-heading mb-3">{t(ind.name, l)}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{t(ind.desc, l)}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SectionDivider />

            {/* Our Services */}
            {city.services.length > 0 && (
                <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ خدماتنا' : l === 'en' ? '✦ Our Services' : '✦ Nos services'}
                                title={l === 'ar' ? `خدماتنا في ${city.name}` : l === 'en' ? `Our services in ${city.name}` : `Nos services à ${city.name}`}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {city.services.map((svc, i) => (
                                <ScrollReveal key={i} delay={i * 0.08} blur={true} scale={true}>
                                    <div className="glass-card p-6 h-full">
                                        <div className="text-3xl mb-4">{svc.icon}</div>
                                        <h3 className="text-white font-semibold font-heading mb-3">{t(svc.title, l)}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{t(svc.description, l)}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SectionDivider />

            {/* SEO Content */}
            {city.seoContent.length > 0 && (
                <section className="relative section-padding bg-navy-950 overflow-hidden">
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ لماذا نحن' : l === 'en' ? '✦ Why us' : '✦ Pourquoi nous'}
                                title={l === 'ar' ? `لماذا تختار RankUp في ${city.name}؟` : l === 'en' ? `Why choose RankUp in ${city.name}?` : `Pourquoi choisir RankUp à ${city.name} ?`}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="max-w-3xl mx-auto space-y-6 mt-12">
                            {city.seoContent.map((paragraph, i) => (
                                <ScrollReveal key={i} delay={i * 0.08} blur={true}>
                                    <p className="text-gray-300 text-base leading-relaxed">{t(paragraph, l)}</p>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SectionDivider />

            {/* FAQ */}
            {city.faq.length > 0 && (
                <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ الأسئلة الشائعة' : l === 'en' ? '✦ FAQ' : '✦ FAQ'}
                                title={l === 'ar' ? 'الأسئلة المتكررة' : l === 'en' ? 'Frequently Asked Questions' : 'Questions fréquentes'}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="max-w-3xl mx-auto mt-12">
                            <FAQAccordion items={faqItems} locale={locale} />
                        </div>
                    </div>
                </section>
            )}

            <SectionDivider />

            {/* Testimonial */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} scale={true}>
                        <div className="max-w-3xl mx-auto text-center">
                            <svg className="w-10 h-10 text-accent-purple/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <blockquote className="text-lg sm:text-xl text-gray-300 leading-relaxed italic mb-6">
                                &ldquo;{t(city.testimonial.text, l)}&rdquo;
                            </blockquote>
                            <div className="text-white font-semibold font-heading">{city.testimonial.name}</div>
                            <div className="text-gray-500 text-sm">{city.testimonial.company}</div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <CTASection dict={{
                title: l === 'ar' ? `هل أنتم مستعدون للنمو في ${city.name}؟` : l === 'en' ? `Ready to grow in ${city.name}?` : `Prêt à grandir à ${city.name} ?`,
                subtitle: l === 'ar' ? 'تواصلوا معنا اليوم للحصول على تدقيق مجاني واستراتيجية مخصصة.' : l === 'en' ? 'Contact us today for a free audit and a personalized strategy.' : 'Contactez-nous dès aujourd\'hui pour un audit gratuit et une stratégie personnalisée.',
                cta: tCta,
                ctaSecondary: 'WhatsApp',
            }} locale={locale} />
        </>
    );
}
