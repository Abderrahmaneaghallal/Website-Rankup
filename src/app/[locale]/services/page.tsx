'use client';

import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import FAQAccordion from "@/components/FAQAccordion";
import Floating3DShapes from "@/components/Floating3DShapes";
import Tilt3D from "@/components/Tilt3D";
import AnimatedCounter from "@/components/AnimatedCounter";
import MoneyBoomEffect from "@/components/MoneyBoomEffect";
import { ScrollTicker, SectionDivider, ScrollTextReveal } from "@/components/ScrollEffects";
import { breadcrumbSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/useLocale";
import { getServicesPageData } from "@/i18n/pageTranslations";

export default function ServicesPage() {
    const locale = useLocale();
    const d = getServicesPageData(locale);
    const prefix = `/${locale}`;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${locale}` },
                    { name: locale === 'ar' ? 'خدمات' : 'Services', url: `https://rankuplus.com/${locale}/services` },
                ]))
            }} />

            <Hero badge={d.hero.badge} title={d.hero.title} highlight={d.hero.highlight} subtitle={d.hero.subtitle} locale={locale} />

            <ScrollTicker text="SEO • ADS • SOCIAL MEDIA • BRANDING • WEB • COPYWRITING •" speed={1.2} />

            {/* Results Metrics */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.resultsBadge} title={d.resultsTitle} subtitle="" />
                    </ScrollReveal>
                    <MoneyBoomEffect>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {d.metrics.map((metric: { value: number; suffix: string; label: string; icon: string }, i: number) => (
                                <ScrollReveal key={metric.label} delay={i * 0.1} blur={true} scale={true}>
                                    <Tilt3D intensity={10} glare={true} scale={1.06}>
                                        <div className="glass-card p-6 text-center">
                                            <div className="text-2xl mb-3">{metric.icon}</div>
                                            <AnimatedCounter value={metric.value} prefix="+" suffix={metric.suffix} className="text-2xl lg:text-3xl font-bold gradient-text font-heading block" duration={2200} />
                                            <div className="text-gray-500 text-xs mt-2">{metric.label}</div>
                                        </div>
                                    </Tilt3D>
                                </ScrollReveal>
                            ))}
                        </div>
                    </MoneyBoomEffect>
                </div>
            </section>

            <SectionDivider />

            {/* Services Image Showcase */}
            <section className="relative py-16 bg-navy-900/50 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { src: '/images/sections/seo-analytics.png', alt: 'SEO & Analytics', label: 'SEO & Analytics' },
                            { src: '/images/sections/social-media.png', alt: 'Social Media', label: 'Social Media' },
                            { src: '/images/sections/web-design.png', alt: 'Web Design', label: 'Web Design' },
                        ].map((img, i) => (
                            <ScrollReveal key={img.label} delay={i * 0.12} blur={true} scale={true}>
                                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                                    <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-purple/30 text-white backdrop-blur-md border border-white/10">{img.label}</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Services Grid */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="services" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.servicesBadge} title={d.servicesTitle} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.servicesSubtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {d.servicesData.map((service: { icon: string; title: string; description: string; href: string }, i: number) => (
                            <ServiceCard key={service.href} icon={service.icon} title={service.title} description={service.description} href={`${prefix}${service.href}`} index={i} locale={locale} />
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* FAQ */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="faq" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.faqBadge} title={d.faqTitle} subtitle="" />
                    </ScrollReveal>
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={d.faqs} locale={locale} />
                    </div>
                </div>
            </section>

            <CTASection dict={{ title: locale === 'ar' ? 'مستعدون لتسريع نموكم الرقمي؟' : locale === 'en' ? 'Ready to accelerate your digital growth?' : 'Prêt à accélérer votre croissance digitale ?', subtitle: '', cta: locale === 'ar' ? 'تواصلوا معنا' : locale === 'en' ? 'Contact us' : 'Contactez-nous', ctaSecondary: 'WhatsApp' }} locale={locale} />
        </>
    );
}
