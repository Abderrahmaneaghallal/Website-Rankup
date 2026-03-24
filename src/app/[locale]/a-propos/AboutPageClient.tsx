'use client';

import Image from "next/image";
import SectionImage from "@/components/SectionImage";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Floating3DShapes from "@/components/Floating3DShapes";
import Tilt3D from "@/components/Tilt3D";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollTicker, SectionDivider, ScrollTextReveal } from "@/components/ScrollEffects";
import { useLocale } from "@/hooks/useLocale";
import { getAboutPageData } from "@/i18n/pageTranslations";

const certifications: Record<string, { name: string; badge: string; detail: string }[]> = {
    fr: [
        { name: "Google Ads", badge: "🏅", detail: "Search, Display, Vidéo, Shopping" },
        { name: "Google Analytics", badge: "📊", detail: "Certifié GA4" },
        { name: "Meta Blueprint", badge: "📘", detail: "Publicité Facebook & Instagram" },
        { name: "HubSpot", badge: "🟠", detail: "Inbound Marketing" },
        { name: "SEMrush", badge: "🔧", detail: "Certifié SEO Toolkit" },
        { name: "Shopify", badge: "🛒", detail: "Programme Partenaire" },
    ],
    en: [
        { name: "Google Ads", badge: "🏅", detail: "Search, Display, Video, Shopping" },
        { name: "Google Analytics", badge: "📊", detail: "GA4 Certified" },
        { name: "Meta Blueprint", badge: "📘", detail: "Facebook & Instagram Ads" },
        { name: "HubSpot", badge: "🟠", detail: "Inbound Marketing" },
        { name: "SEMrush", badge: "🔧", detail: "SEO Toolkit Certified" },
        { name: "Shopify", badge: "🛒", detail: "Partner Program" },
    ],
    ar: [
        { name: "Google Ads", badge: "🏅", detail: "بحث، عرض، فيديو، تسوق" },
        { name: "Google Analytics", badge: "📊", detail: "معتمد GA4" },
        { name: "Meta Blueprint", badge: "📘", detail: "إعلانات فيسبوك وإنستغرام" },
        { name: "HubSpot", badge: "🟠", detail: "التسويق الوارد" },
        { name: "SEMrush", badge: "🔧", detail: "معتمد أدوات SEO" },
        { name: "Shopify", badge: "🛒", detail: "برنامج الشراكة" },
    ],
};

export default function AboutPageClient() {
    const locale = useLocale();
    const d = getAboutPageData(locale);

    return (
        <>
            <Hero
                badge={d.hero.badge}
                title={d.hero.title}
                highlight={d.hero.highlight}
                subtitle={d.hero.subtitle}
                locale={locale}
            />

            <ScrollTicker text={d.ticker} speed={1} />

            {/* Mission */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="methodology" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal blur={true} perspective={true} direction="left">
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-8 group">
                                <SectionImage
                                    sectionKey="about.mission"
                                    fallback="/images/sections/team-collaboration.png"
                                    fallbackAlt="Équipe RankUp, agence marketing digital au Maroc à Agadir — collaboration et stratégie digitale"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                            </div>
                            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20 mb-5">
                                {d.mission.badge}
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading leading-tight mb-6">
                                {d.mission.title} <span className="gradient-text">{d.mission.highlight}</span>
                            </h2>
                            <ScrollTextReveal text={d.mission.p1} className="text-gray-400 text-base leading-relaxed mb-4" />
                            <ScrollTextReveal text={d.mission.p2} className="text-gray-400 text-base leading-relaxed" />
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} blur={true} direction="right" perspective={true}>
                            <div className="grid grid-cols-2 gap-4">
                                {d.mission.stats.map((stat: { value: number; suffix: string; label: string }, i: number) => (
                                    <ScrollReveal key={stat.label} delay={i * 0.1} scale={true} blur={true}>
                                        <Tilt3D intensity={10} glare={true} scale={1.05}>
                                            <div className="glass-card p-6 text-center">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-2xl lg:text-3xl font-bold gradient-text font-heading block" duration={2500} />
                                                <div className="text-gray-400 text-sm mt-2" style={{ transform: 'translateZ(5px)' }}>{stat.label}</div>
                                            </div>
                                        </Tilt3D>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Team Expertise */}
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <Floating3DShapes variant="services" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.team.badge} title={d.team.title} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.team.subtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {d.expertises.map((expert: { icon: string; title: string; description: string }, i: number) => (
                            <ScrollReveal key={expert.title} delay={i * 0.08} blur={true} scale={true}>
                                <Tilt3D intensity={8} glare={true} scale={1.04}>
                                    <div className="glass-card p-6 h-full text-center group interactive-card">
                                        <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{expert.icon}</div>
                                        <h3 className="text-base font-semibold text-white font-heading mb-2">{expert.title}</h3>
                                        <p className="text-gray-500 text-sm leading-[1.8]">{expert.description}</p>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Values */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="why" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.values.badge} title={d.values.title} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.values.subtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {d.values.items.map((value: { icon: string; title: string; description: string }, i: number) => (
                            <ScrollReveal key={value.title} delay={i * 0.1} blur={true} rotate={true} direction={i % 2 === 0 ? 'left' : 'right'}>
                                <Tilt3D intensity={8} glare={true} borderGlow={true} scale={1.02}>
                                    <div className="glass-card p-6 lg:p-8 h-full">
                                        <div className="text-3xl mb-4" style={{ transform: 'translateZ(25px)' }}>{value.icon}</div>
                                        <h3 className="text-lg font-semibold text-white font-heading mb-3" style={{ transform: 'translateZ(15px)' }}>{value.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed" style={{ transform: 'translateZ(5px)' }}>{value.description}</p>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <SectionDivider />
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <Floating3DShapes variant="pricing" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.certs.badge} title={d.certs.title} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.certs.subtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {(certifications[locale] || certifications.fr).map((cert, i) => (
                            <ScrollReveal key={cert.name} delay={i * 0.08} blur={true} scale={true}>
                                <div className="glass-card p-5 text-center group interactive-card h-full">
                                    <div className="text-3xl mb-3">{cert.badge}</div>
                                    <h4 className="text-sm font-semibold text-white font-heading mb-1">{cert.name}</h4>
                                    <p className="text-gray-600 text-xs">{cert.detail}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <ScrollTicker text="2020 • 2021 • 2022 • 2023 • 2024 • 2025 •" speed={0.6} />

            {/* Timeline */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="testimonials" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.journey.badge} title={d.journey.title} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.journey.subtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16" />
                    <div className="max-w-3xl mx-auto space-y-6">
                        {d.timeline.map((item: { year: string; title: string; description: string }, i: number) => (
                            <ScrollReveal key={item.year} delay={i * 0.08} blur={true} direction={i % 2 === 0 ? 'left' : 'right'} rotate={true}>
                                <Tilt3D intensity={5} glare={true} scale={1.02}>
                                    <div className="glass-card p-6 flex gap-5">
                                        <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold font-heading text-sm" style={{ transform: 'translateZ(20px)' }}>
                                            {item.year}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white font-heading mb-1" style={{ transform: 'translateZ(12px)' }}>{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed" style={{ transform: 'translateZ(4px)' }}>{item.description}</p>
                                        </div>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
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

            <CTASection dict={{ title: d.ctaTitle, subtitle: d.ctaSubtitle, cta: locale === 'ar' ? 'تواصلوا معنا' : locale === 'en' ? 'Contact us' : 'Contactez-nous', ctaSecondary: locale === 'ar' ? 'واتساب' : 'WhatsApp' }} locale={locale} />
        </>
    );
}
