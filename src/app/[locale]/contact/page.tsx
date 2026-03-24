'use client';

import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import FAQAccordion from "@/components/FAQAccordion";
import Floating3DShapes from "@/components/Floating3DShapes";
import Tilt3D from "@/components/Tilt3D";
import ReviewBadges from "@/components/ReviewBadges";
import MoneyHoverEffect from "@/components/MoneyHoverEffect";
import { ScrollTicker, SectionDivider, ScrollTextReveal } from "@/components/ScrollEffects";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { getContactPageData } from "@/i18n/pageTranslations";

export default function ContactPage() {
    const locale = useLocale();
    const d = getContactPageData(locale);

    const contactInfo = [
        {
            icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
            title: d.contactLabels.address,
            value: locale === 'ar' ? "شارع غرسيف، أكادير 80026، المغرب" : locale === 'en' ? "Rue Guercif, Agadir 80026, Morocco" : "Rue Guercif, Agadir 80026, Maroc",
            link: "https://maps.google.com/?q=Rue+Guercif+Agadir+80026+Maroc",
        },
        {
            icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
            title: d.contactLabels.email,
            value: "contact@rankuplus.com",
            link: "mailto:contact@rankuplus.com",
        },
        {
            icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
            title: d.contactLabels.phone,
            value: "+212 60 47 78 249",
            link: "tel:+212604778249",
        },
        {
            icon: (<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>),
            title: "WhatsApp",
            value: "+212 68 00 88 350",
            link: "https://api.whatsapp.com/send/?phone=212680088350",
        },
    ];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${locale}` },
                    { name: 'Contact', url: `https://rankuplus.com/${locale}/contact` },
                ]))
            }} />

            <Hero
                badge={d.hero.badge}
                title={d.hero.title}
                highlight={d.hero.highlight}
                subtitle={d.hero.subtitle}
                primaryCTA={{ text: d.hero.cta, href: "https://api.whatsapp.com/send/?phone=212604778249" }}
                locale={locale}
            />

            {/* Trust Points */}
            <section className="relative py-12 bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {d.trustPoints.map((point: { icon: string; text: string }, i: number) => (
                            <ScrollReveal key={point.text} delay={i * 0.06} blur={true} scale={true}>
                                <div className="glass-card p-4 text-center group interactive-card h-full">
                                    <div className="text-xl mb-2">{point.icon}</div>
                                    <p className="text-gray-400 text-xs leading-snug">{point.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <Floating3DShapes variant="services" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
                        <div className="lg:col-span-2">
                            <ScrollReveal blur={true} perspective={true}>
                                <h2 className="text-2xl font-bold text-white font-heading mb-3">{d.contactInfoTitle}</h2>
                                <ScrollTextReveal text={d.contactInfoDesc} className="text-gray-400 text-sm leading-relaxed mb-8" />
                            </ScrollReveal>
                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <ScrollReveal key={item.title} delay={i * 0.1} blur={true} direction="left" rotate={true}>
                                        <Tilt3D intensity={6} glare={true} scale={1.03}>
                                            <a href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined} className="glass-card p-4 flex gap-4 items-center group hover:border-accent-purple/30">
                                                <div className="w-11 h-11 shrink-0 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 transition-colors" style={{ transform: 'translateZ(15px)' }}>{item.icon}</div>
                                                <div style={{ transform: 'translateZ(8px)' }}>
                                                    <div className="text-gray-500 text-xs uppercase tracking-wider">{item.title}</div>
                                                    <div className="text-white text-sm font-medium mt-0.5">{item.value}</div>
                                                </div>
                                            </a>
                                        </Tilt3D>
                                    </ScrollReveal>
                                ))}
                            </div>

                            <ScrollReveal delay={0.4} blur={true} direction="left">
                                <Tilt3D intensity={6} glare={true}>
                                    <div className="mt-8 glass-card p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <svg className="w-5 h-5 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 className="text-white font-semibold text-sm">{d.hours.title}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm">{d.hours.schedule}</p>
                                        <p className="text-gray-500 text-xs mt-1">{d.hours.closed}</p>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-3">
                            <ScrollReveal blur={true} direction="right" perspective={true}>
                                <ContactForm />
                            </ScrollReveal>
                            <ReviewBadges />
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Office Locations */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="testimonials" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.offices.badge} title={d.offices.title} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.offices.subtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-12" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {d.officeLocations.map((office: { city: string; emoji: string; type: string; address: string }, i: number) => (
                            <ScrollReveal key={office.city} delay={i * 0.1} blur={true} scale={true}>
                                <Tilt3D intensity={8} glare={true} scale={1.04}>
                                    <div className="glass-card p-6 text-center group interactive-card h-full">
                                        <div className="text-3xl mb-3">{office.emoji}</div>
                                        <h4 className="text-lg font-bold text-white font-heading mb-1">{office.city}</h4>
                                        <p className="text-accent-purple text-xs font-medium mb-2">{office.type}</p>
                                        <p className="text-gray-500 text-xs">{office.address}</p>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* Engagement */}
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true}>
                        <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 lg:p-12 text-center">
                            <h3 className="text-2xl font-bold text-white font-heading mb-8" dangerouslySetInnerHTML={{ __html: d.engagement.title }} />
                            <MoneyHoverEffect>
                                <Link href="https://api.whatsapp.com/send/?phone=212604778249" className="btn-primary money-hover-btn" target="_blank">
                                    {d.engagement.whatsappText}
                                    <span className="btn-arrow">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </Link>
                            </MoneyHoverEffect>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <SectionDivider />

            {/* FAQ */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="faq" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.faq.badge} title={d.faq.title} subtitle="" />
                    </ScrollReveal>
                    <ScrollTextReveal text={d.faq.subtitle} className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-12" />
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={d.faqs} locale={locale} />
                    </div>
                </div>
            </section>
        </>
    );
}
