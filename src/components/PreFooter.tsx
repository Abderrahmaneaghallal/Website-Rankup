'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Tilt3D from './Tilt3D';
import Floating3DShapes from './Floating3DShapes';
import { SectionDivider, ScrollTextReveal } from './ScrollEffects';
import AnimatedCounter from './AnimatedCounter';
import MoneyBoomEffect from './MoneyBoomEffect';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PreFooterProps {
    locale: string;
    dict: any;
}

export default function PreFooter({ locale, dict }: PreFooterProps) {
    const prefix = `/${locale}`;

    const statsLabels = locale === 'ar'
        ? ['مشروع رقمي', 'شركة', 'دولة']
        : locale === 'en'
            ? ['DIGITAL PROJECTS', 'BUSINESSES', 'COUNTRIES']
            : ['PROJETS DIGITAUX', 'ENTREPRISES', 'PAYS'];

    const expertText = locale === 'ar'
        ? 'مستعد للتحدث مع خبير تسويق؟'
        : locale === 'en'
            ? 'Ready to talk to a marketing expert?'
            : 'Prêt à parler avec un expert en marketing ?';

    const contactText = locale === 'ar' ? 'تواصل معنا.' : locale === 'en' ? 'Contact us.' : 'Contactez-nous.';

    const rdvTitle = locale === 'ar'
        ? 'احجز'
        : locale === 'en'
            ? 'Book your'
            : 'Demander votre';

    const rdvHighlight = locale === 'ar' ? 'موعدكم' : locale === 'en' ? 'Appointment' : 'Rendez-vous';

    const rdvSubtitle = locale === 'ar'
        ? 'مدينة مختلفة؟ دولة مختلفة؟ قارة مختلفة؟ نبقى دائمًا قريبين منكم.'
        : locale === 'en'
            ? 'Different city? Different country? Different continent? We stay close to you.'
            : 'Ville différente ? Pays différent ? Continent différent ? Nous restons toujours près de vous.';

    const rdvCta = locale === 'ar' ? 'حجز موعد' : locale === 'en' ? 'Book an appointment' : 'Prendre un Rendez-vous';

    const revenueLabel = locale === 'ar' ? 'الإيرادات' : locale === 'en' ? 'REVENUE' : 'REVENUS';
    const revenueTitle = locale === 'ar'
        ? 'الإيرادات المحققة لعملائنا'
        : locale === 'en'
            ? 'REVENUE GENERATED FOR OUR CLIENTS'
            : 'REVENUS GÉNÉRÉS POUR NOS CLIENTS';
    const revenueGrowing = locale === 'ar'
        ? 'وهذا الرقم في ازدياد مستمر كل شهر'
        : locale === 'en'
            ? 'And this number keeps growing every month'
            : 'Et ce chiffre ne cesse de croître chaque mois';

    return (
        <>
            {/* SECTION 1: Expert Contact Bar + Stats */}
            <section className="relative overflow-hidden border-t border-white/[0.04] bg-navy-950">
                <Floating3DShapes variant="testimonials" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 py-14 lg:py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <ScrollReveal blur={true} direction="left">
                            <Tilt3D intensity={6} glare={true} scale={1.03}>
                                <div className="flex items-center gap-5">
                                    <div className="relative shrink-0">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan p-[2px]">
                                            <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center overflow-hidden">
                                                <Image
                                                    src="/images/expert-photo.jpg"
                                                    alt="Expert marketing RankUp"
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            </div>
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-accent-green border-2 border-navy-950" />
                                    </div>
                                    <div>
                                        <p className="text-white font-heading font-semibold text-sm" style={{ transform: 'translateZ(10px)' }}>
                                            {expertText}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-0.5" style={{ transform: 'translateZ(5px)' }}>
                                            {contactText}
                                        </p>
                                        <a
                                            href="tel:+212604778249"
                                            className="text-accent-cyan font-semibold text-sm mt-1 inline-block hover:text-accent-purple transition-colors"
                                            style={{ transform: 'translateZ(8px)' }}
                                        >
                                            +212 60 47 78 249
                                        </a>
                                    </div>
                                </div>
                            </Tilt3D>
                        </ScrollReveal>

                        <ScrollReveal blur={true} direction="right">
                            <div className="flex items-center gap-8 lg:gap-12">
                                {[
                                    { value: 1600, suffix: '+', label: statsLabels[0] },
                                    { value: 1215, suffix: '+', label: statsLabels[1] },
                                    { value: 20, suffix: '+', label: statsLabels[2] },
                                ].map((stat, i) => (
                                    <ScrollReveal key={stat.label} delay={i * 0.15} scale={true} blur={true}>
                                        <Tilt3D intensity={8} glare={true} scale={1.05}>
                                            <div className="text-center">
                                                <AnimatedCounter
                                                    value={stat.value}
                                                    suffix={stat.suffix}
                                                    className="text-3xl lg:text-4xl font-black text-white font-heading block"
                                                />
                                                <span className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-[0.15em] font-semibold mt-1 block">
                                                    {stat.label}
                                                </span>
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

            {/* SECTION 2: RDV CTA + Revenue Counter */}
            <section className="relative overflow-hidden bg-navy-900/50">
                <Floating3DShapes variant="pricing" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal blur={true} direction="left" perspective={true}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight mb-4">
                                {rdvTitle}{' '}
                                <span className="gradient-text">{rdvHighlight}</span>
                            </h2>
                            <ScrollTextReveal
                                text={rdvSubtitle}
                                className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8"
                            />
                            <ScrollReveal delay={0.3} blur={true}>
                                <Tilt3D intensity={5} scale={1.05}>
                                    <Link
                                        href={`${prefix}/contact`}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-cyan text-navy-950 font-semibold text-sm hover:bg-accent-green transition-all duration-500 group"
                                        style={{ transform: 'translateZ(15px)' }}
                                    >
                                        {rdvCta}
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </Tilt3D>
                            </ScrollReveal>
                        </ScrollReveal>

                        <ScrollReveal blur={true} direction="right" perspective={true}>
                            <MoneyBoomEffect>
                                <Tilt3D intensity={8} glare={true} borderGlow={true} scale={1.03}>
                                    <div className="glass-card p-8 lg:p-10">
                                        <div className="mb-5" style={{ transform: 'translateZ(20px)' }}>
                                            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                                {revenueLabel}
                                            </span>
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-bold text-white font-heading mb-6 leading-snug" style={{ transform: 'translateZ(15px)' }}>
                                            {revenueTitle.split(locale === 'ar' ? 'لعملائنا' : locale === 'en' ? 'OUR CLIENTS' : 'NOS CLIENTS')[0]}
                                            <span className="gradient-text">{locale === 'ar' ? 'لعملائنا' : locale === 'en' ? 'OUR CLIENTS' : 'NOS CLIENTS'}</span>
                                        </h3>
                                        <div className="flex items-baseline gap-2" style={{ transform: 'translateZ(25px)' }}>
                                            <AnimatedCounter
                                                value={1000000}
                                                suffix=" $"
                                                className="text-4xl lg:text-5xl font-black text-white font-heading"
                                                duration={2500}
                                            />
                                        </div>
                                        <div className="mt-6 relative h-2 rounded-full bg-white/5 overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: 'linear-gradient(90deg, #8B5CF6, #06B6D4, #10B981)',
                                                }}
                                                initial={{ scaleX: 0, originX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                        <p className="text-gray-500 text-xs mt-3" style={{ transform: 'translateZ(5px)' }}>
                                            {revenueGrowing}
                                        </p>
                                    </div>
                                </Tilt3D>
                            </MoneyBoomEffect>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
