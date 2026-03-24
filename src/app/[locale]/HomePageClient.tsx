'use client';

import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import PricingTable from "@/components/PricingTable";
import FAQAccordion from "@/components/FAQAccordion";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import TrustBanner from "@/components/TrustBanner";
import Floating3DShapes from "@/components/Floating3DShapes";
import Tilt3D from "@/components/Tilt3D";
import { ScrollTicker, SectionDivider, ScrollTextReveal, ParallaxImage } from "@/components/ScrollEffects";
import { organizationSchema, localBusinessSchema, faqSchema, professionalServiceSchema } from "@/lib/schema";
import ResultsGuarantee from "@/components/ResultsGuarantee";
import ProcessSteps from "@/components/ProcessSteps";
import CityPresence from "@/components/CityPresence";
import ExcellenceSection from "@/components/ExcellenceSection";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HomePageClientProps {
    dict: any;
    locale: string;
}

// FAQ data per locale (keeping original FR FAQs for schema, using dict for display)
const homeFaqsFr = [
    { question: "Qu'est-ce que Rankup, agence de marketing à Agadir ?", answer: "Rankup est une agence de communication à Agadir reconnue, spécialisée dans la conception de sites web, le marketing digital, la gestion des réseaux sociaux, la création graphique et la publicité en ligne." },
    { question: "Pourquoi choisir Rankup comme agence de communication à Agadir ?", answer: "Choisir Rankup c'est faire le choix d'un savoir-faire reconnu et d'une créativité qui se démarque dans le paysage digital marocain." },
    { question: "Comment Rankup peut-elle améliorer votre visibilité en ligne ?", answer: "Rankup œuvre à renforcer votre présence en ligne grâce à des stratégies digitales personnalisées et orientées performance." },
    { question: "Quel est le processus pour commencer avec RankUp ?", answer: "Le processus est simple : 1) Contactez-nous, 2) Appel de découverte gratuit, 3) Audit initial, 4) Proposition stratégique, 5) Lancement des travaux." },
];

const homeFaqsEn = [
    { question: "What is RankUp, a marketing agency in Agadir?", answer: "RankUp is a recognized communication agency in Agadir, specializing in web design, digital marketing, social media management, graphic design and online advertising." },
    { question: "Why choose RankUp as your communication agency in Agadir?", answer: "Choosing RankUp means choosing recognized expertise and creativity that stands out in the Moroccan digital landscape." },
    { question: "How can RankUp improve your online visibility?", answer: "RankUp works to strengthen your online presence through personalized and performance-oriented digital strategies." },
    { question: "What is the process to get started with RankUp?", answer: "The process is simple: 1) Contact us, 2) Free discovery call, 3) Initial audit, 4) Strategic proposal, 5) Project launch." },
];

const homeFaqsAr = [
    { question: "ما هي رانك أب، وكالة التسويق في أكادير؟", answer: "رانك أب هي وكالة تواصل معترف بها في أكادير، متخصصة في تصميم المواقع والتسويق الرقمي وإدارة وسائل التواصل الاجتماعي والتصميم الجرافيكي والإعلانات الرقمية." },
    { question: "لماذا تختار رانك أب كوكالة تواصل في أكادير؟", answer: "اختيار رانك أب يعني اختيار خبرة معترف بها وإبداع يتميز في المشهد الرقمي المغربي." },
    { question: "كيف يمكن لرانك أب تحسين ظهورك على الإنترنت؟", answer: "تعمل رانك أب على تعزيز حضورك عبر الإنترنت من خلال استراتيجيات رقمية مخصصة وموجهة نحو الأداء." },
    { question: "ما هي عملية البدء مع رانك أب؟", answer: "العملية بسيطة: 1) تواصل معنا، 2) مكالمة استكشافية مجانية، 3) تدقيق أولي، 4) اقتراح استراتيجي، 5) إطلاق العمل." },
];

export default function HomePageClient({ dict, locale }: HomePageClientProps) {
    const prefix = `/${locale}`;
    const homeFaqs = locale === 'ar' ? homeFaqsAr : locale === 'en' ? homeFaqsEn : homeFaqsFr;

    return (
        <>
            {/* Schema */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }} />

            {/* Hero */}
            <Hero
                badge={dict.hero.badge}
                title={dict.hero.title}
                highlight={dict.hero.highlight}
                subtitle={dict.hero.subtitle}
                showStats={true}
                primaryCTA={{ text: dict.hero.cta1, href: `${prefix}/contact` }}
                secondaryCTA={{ text: dict.hero.cta2, href: `${prefix}/services` }}
                locale={locale}
            />

            {/* TRUST BANNER */}
            <TrustBanner locale={locale} />

            {/* SCROLL TICKER 1 */}
            <ScrollTicker text={dict.scrollTickers.ticker1} speed={1.2} />

            {/* RESULTS GUARANTEE */}
            <ResultsGuarantee dict={dict.resultsGuarantee} locale={locale} />

            <SectionDivider />

            {/* WHY RANKUP */}
            <section id="why" className="relative py-24 lg:py-32 bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="why" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <ScrollReveal blur={true} direction="left" perspective={true}>
                            <div>
                                <SectionHeader
                                    badge={dict.whyRankup.badge}
                                    title={dict.whyRankup.title}
                                    subtitle=""
                                />
                                <ScrollTextReveal
                                    text={dict.whyRankup.description}
                                    className="text-gray-400 text-base lg:text-lg leading-relaxed"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal blur={true} direction="right" delay={0.2} perspective={true}>
                            <Tilt3D intensity={10} glare={true} borderGlow={true} scale={1.02}>
                                <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-purple-500/10">
                                    <ParallaxImage
                                        src="/images/marketing-dashboard.png"
                                        alt="Dashboard marketing digital RankUp"
                                        className="w-full aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                                </div>
                            </Tilt3D>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dict.whyRankup.cards.map((item: any, i: number) => (
                            <ScrollReveal key={item.title} delay={i * 0.1} blur={true} scale={true} rotate={true}>
                                <Tilt3D intensity={8} glare={true} scale={1.04}>
                                    <div className="glass-card p-7 lg:p-8 h-full text-center">
                                        <div className="text-3xl mb-5" style={{ transform: 'translateZ(25px)' }}>{item.icon}</div>
                                        <h3 className="text-base font-semibold text-white font-heading mb-3 leading-snug" style={{ transform: 'translateZ(15px)' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-[1.8]" style={{ transform: 'translateZ(5px)' }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* SERVICES */}
            <section id="services" className="relative py-24 lg:py-32 bg-navy-900/40 overflow-hidden">
                <Floating3DShapes variant="services" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={dict.services.badge}
                            title={dict.services.title}
                            subtitle=""
                        />
                    </ScrollReveal>
                    <ScrollTextReveal
                        text={dict.services.subtitle}
                        className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dict.services.items.map((service: any, i: number) => (
                            <ServiceCard key={service.href} icon={service.icon} title={service.title} description={service.description} href={`${prefix}${service.href}`} index={i} locale={locale} />
                        ))}
                    </div>
                </div>
            </section>

            <ScrollTicker text={dict.scrollTickers.ticker2} speed={0.8} />

            {/* METHODOLOGY */}
            <section id="methodology" className="relative py-24 lg:py-32 bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="methodology" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <ScrollReveal blur={true} direction="left" perspective={true}>
                            <Tilt3D intensity={8} glare={true} borderGlow={true}>
                                <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-cyan-500/10">
                                    <ParallaxImage
                                        src="/images/abstract-3d.png"
                                        alt="Méthodologie 3D RankUp"
                                        className="w-full aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                                </div>
                            </Tilt3D>
                        </ScrollReveal>
                        <ScrollReveal blur={true} direction="right" delay={0.2} perspective={true}>
                            <div>
                                <SectionHeader
                                    badge={dict.methodology.badge}
                                    title={dict.methodology.title}
                                    subtitle=""
                                />
                                <ScrollTextReveal
                                    text={dict.methodology.subtitle}
                                    className="text-gray-400 text-base lg:text-lg leading-relaxed"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dict.methodology.steps.map((step: any, i: number) => (
                            <ScrollReveal key={step.number} delay={i * 0.1} blur={true} direction={i % 2 === 0 ? 'left' : 'right'} rotate={true}>
                                <Tilt3D intensity={6} glare={true} scale={1.02}>
                                    <div className="glass-card p-7 lg:p-9 flex gap-6 h-full items-start methodology-card">
                                        <div
                                            className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold font-heading text-lg step-number"
                                            style={{ transform: 'translateZ(30px)' }}
                                        >
                                            {step.number}
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="text-base lg:text-lg font-semibold text-white font-heading mb-3 leading-snug" style={{ transform: 'translateZ(15px)' }}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-[1.8]" style={{ transform: 'translateZ(5px)' }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </Tilt3D>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS STEPS */}
            <ProcessSteps dict={dict.processSteps} locale={locale} />

            <SectionDivider />

            {/* TESTIMONIALS */}
            <section id="testimonials" className="relative py-24 lg:py-32 bg-navy-900/40 overflow-hidden">
                <Floating3DShapes variant="testimonials" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
                        <ScrollReveal blur={true} direction="left" perspective={true}>
                            <div>
                                <SectionHeader
                                    badge={dict.testimonials.badge}
                                    title={dict.testimonials.title}
                                    subtitle=""
                                />
                                <ScrollTextReveal
                                    text={dict.testimonials.subtitle}
                                    className="text-gray-400 text-base lg:text-lg leading-relaxed"
                                />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal blur={true} direction="right" delay={0.2} perspective={true}>
                            <Tilt3D intensity={8} glare={true} borderGlow={true}>
                                <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-purple-500/10">
                                    <ParallaxImage
                                        src="/images/team-collaboration.png"
                                        alt="Équipe RankUp"
                                        className="w-full aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                                </div>
                            </Tilt3D>
                        </ScrollReveal>
                    </div>
                    <TestimonialsSlider locale={locale} />
                </div>
            </section>

            {/* EXCELLENCE */}
            <ExcellenceSection dict={dict.excellence} locale={locale} />

            <ScrollTicker text={dict.scrollTickers.ticker3} speed={1} />

            {/* PRICING */}
            <section id="pricing" className="relative py-24 lg:py-32 bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="pricing" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={dict.pricing.badge}
                            title={dict.pricing.title}
                            subtitle=""
                        />
                    </ScrollReveal>
                    <ScrollTextReveal
                        text={dict.pricing.subtitle}
                        className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16"
                    />
                    <PricingTable locale={locale} />
                </div>
            </section>

            <SectionDivider />

            {/* CITY PRESENCE */}
            <CityPresence dict={dict.cityPresence} locale={locale} />

            <SectionDivider />

            {/* FAQ */}
            <section id="faq" className="relative py-24 lg:py-32 bg-navy-900/40 overflow-hidden">
                <Floating3DShapes variant="faq" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={dict.faq.badge}
                            title={dict.faq.title}
                            subtitle=""
                        />
                    </ScrollReveal>
                    <ScrollTextReveal
                        text={dict.faq.subtitle}
                        className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16"
                    />
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={homeFaqs} locale={locale} />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTASection dict={dict.cta} locale={locale} />
        </>
    );
}
