import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/schema';
import { locales, type Locale } from '@/i18n/config';
import FAQAccordion from '@/components/FAQAccordion';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/CTASection';
import SectionHeader from '@/components/SectionHeader';
import { SectionDivider } from '@/components/ScrollEffects';
import ServiceTransition from '@/components/ServiceTransition';
import ServiceThemeEffects from '@/components/ServiceThemeEffects';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    return locales.flatMap(locale => services.map(s => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const service = services.find(s => s.slug === slug);
    if (!service) return {};
    const url = `https://rankuplus.com/${locale}/services/${slug}`;
    return {
        title: service.metaTitle,
        description: service.metaDescription,
        keywords: [service.title, service.shortTitle, 'agence marketing digital au maroc', `agence ${service.shortTitle.toLowerCase()} agadir`, `agence ${service.shortTitle.toLowerCase()} maroc`, 'RankUp', 'marketing digital', 'agadir', 'casablanca', 'marrakech', 'rabat'],
        alternates: {
            canonical: url,
            languages: {
                fr: `https://rankuplus.com/fr/services/${slug}`,
                en: `https://rankuplus.com/en/services/${slug}`,
                ar: `https://rankuplus.com/ar/services/${slug}`,
            },
        },
        openGraph: {
            title: service.metaTitle,
            description: service.metaDescription,
            url,
            type: 'website',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            images: [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: service.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: service.metaTitle,
            description: service.metaDescription,
        },
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    const l = locale as Locale;
    const service = services.find(s => s.slug === slug);
    if (!service) notFound();

    const tCta = l === 'ar' ? 'تواصلوا معنا' : l === 'en' ? 'Contact us' : 'Contactez-nous';

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: l === 'ar' ? 'الرئيسية' : l === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${l}` },
                    { name: l === 'ar' ? 'خدمات' : 'Services', url: `https://rankuplus.com/${l}/services` },
                    { name: service.shortTitle, url: `https://rankuplus.com/${l}/services/${slug}` },
                ]))
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(serviceSchema(service.title, service.metaDescription, `https://rankuplus.com/${l}/services/${slug}`, slug))
            }} />
            {service.faq.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema(service.faq))
                }} />
            )}

            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-navy-950 overflow-hidden">
                <ServiceThemeEffects slug={slug} count={16} repeatInterval={2500} />
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-cyan/5" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 text-center">
                    <Link href={`/${l}/services`} className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-accent-purple transition-colors mb-8">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {l === 'ar' ? 'جميع الخدمات' : l === 'en' ? 'All Services' : 'Tous les services'}
                    </Link>
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6">
                        {service.heroTitle}{' '}
                        <span className="gradient-text">{service.heroHighlight}</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">{service.heroSubtitle}</p>
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

            <ServiceTransition slug={slug} variant={0} />

            {/* Intro */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true}>
                        <div className="max-w-3xl mx-auto text-gray-300 text-base leading-relaxed">
                            {service.intro}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <ServiceTransition slug={slug} variant={1} />

            {/* Benefits */}
            {service.benefits.length > 0 && (
                <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                    <ServiceThemeEffects slug={slug} count={10} repeatInterval={3500} />
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ المزايا' : l === 'en' ? '✦ Benefits' : '✦ Avantages'}
                                title={l === 'ar' ? 'لماذا تختاروننا؟' : l === 'en' ? 'Why choose us?' : 'Pourquoi nous choisir ?'}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {service.benefits.map((b, i) => (
                                <ScrollReveal key={i} delay={i * 0.08} blur={true} scale={true}>
                                    <div className="glass-card p-6 h-full">
                                        <h3 className="text-white font-semibold font-heading mb-3">{b.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <ServiceTransition slug={slug} variant={2} />

            {/* Process */}
            {service.process.length > 0 && (
                <section className="relative section-padding bg-navy-950 overflow-hidden">
                    <ServiceThemeEffects slug={slug} count={8} repeatInterval={4000} />
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ المنهجية' : l === 'en' ? '✦ Process' : '✦ Processus'}
                                title={l === 'ar' ? 'كيف نعمل؟' : l === 'en' ? 'How we work' : 'Notre méthode de travail'}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            {service.process.map((p, i) => (
                                <ScrollReveal key={i} delay={i * 0.1} blur={true} scale={true}>
                                    <div className="glass-card p-6 h-full relative">
                                        <div className="text-4xl font-bold gradient-text font-heading mb-4 opacity-30">{p.step}</div>
                                        <h3 className="text-white font-semibold font-heading mb-2">{p.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <ServiceTransition slug={slug} variant={3} />

            {/* Features */}
            {service.features.length > 0 && (
                <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                    <ServiceThemeEffects slug={slug} count={10} repeatInterval={3000} />
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ ما يشمله' : l === 'en' ? '✦ What\'s included' : '✦ Ce qui est inclus'}
                                title={l === 'ar' ? 'الخدمة تشمل' : l === 'en' ? 'Service includes' : 'La prestation comprend'}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-3xl mx-auto">
                            {service.features.map((f, i) => (
                                <ScrollReveal key={i} delay={i * 0.05} blur={true}>
                                    <div className="flex items-start gap-3 p-4 glass rounded-xl">
                                        <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-300 text-sm">{f}</span>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <ServiceTransition slug={slug} variant={4} />

            {/* FAQ */}
            {service.faq.length > 0 && (
                <section className="relative section-padding bg-navy-950 overflow-hidden">
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                        <ScrollReveal blur={true} perspective={true}>
                            <SectionHeader
                                badge={l === 'ar' ? '✦ الأسئلة الشائعة' : l === 'en' ? '✦ FAQ' : '✦ FAQ'}
                                title={l === 'ar' ? 'الأسئلة المتكررة' : l === 'en' ? 'Frequently Asked Questions' : 'Questions fréquentes'}
                                subtitle=""
                            />
                        </ScrollReveal>
                        <div className="max-w-3xl mx-auto mt-12">
                            <FAQAccordion items={service.faq} locale={locale} />
                        </div>
                    </div>
                </section>
            )}
            {/* Related Services — Internal Linking for SEO */}
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={l === 'ar' ? '✦ خدمات أخرى' : l === 'en' ? '✦ Other Services' : '✦ Nos Autres Services'}
                            title={l === 'ar' ? 'اكتشفوا خدماتنا الأخرى' : l === 'en' ? 'Discover Our Other Services' : 'Découvrez Nos Autres Services'}
                            subtitle=""
                        />
                    </ScrollReveal>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
                        {services.filter(s => s.slug !== slug).map((s, i) => (
                            <ScrollReveal key={s.slug} delay={i * 0.08} blur={true} scale={true}>
                                <Link
                                    href={`/${l}/services/${s.slug}`}
                                    className="glass-card p-5 flex flex-col items-center text-center group hover:border-accent-purple/30 transition-all h-full"
                                >
                                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                                    <h3 className="text-sm font-semibold text-white font-heading mb-1 group-hover:text-accent-purple transition-colors">{s.shortTitle}</h3>
                                    <p className="text-gray-500 text-xs line-clamp-2">{s.heroHighlight}</p>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection dict={{
                title: l === 'ar' ? `هل أنتم مستعدون لتطوير ${service.shortTitle}؟` : l === 'en' ? `Ready to boost your ${service.shortTitle}?` : `Prêt à booster votre ${service.shortTitle} ?`,
                subtitle: '',
                cta: tCta,
                ctaSecondary: 'WhatsApp',
            }} locale={locale} />
        </>
    );
}
