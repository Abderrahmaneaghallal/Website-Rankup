'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Floating3DShapes from './Floating3DShapes';
import MoneyHoverEffect from './MoneyHoverEffect';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CTASectionProps {
    title?: string;
    subtitle?: string;
    dict?: any;
    locale?: string;
}

export default function CTASection({
    title,
    subtitle,
    dict,
    locale = 'fr',
}: CTASectionProps) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const decorY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const fallbackTitle = locale === 'ar' ? 'مستعدون لتعزيز نموكم؟' : locale === 'en' ? 'Ready to boost your growth?' : 'Prêt à booster votre croissance ?';
    const fallbackSubtitle = locale === 'ar' ? 'تواصلوا مع رانك أب اليوم للحصول على تدقيق مجاني واقتراح استراتيجي مخصص.' : locale === 'en' ? 'Contact RankUp today for a free audit and personalized strategic proposal.' : "Contactez RankUp dès aujourd'hui pour un audit gratuit et une proposition stratégique personnalisée.";
    const fallbackBtn1 = locale === 'ar' ? 'طلب تدقيق مجاني' : locale === 'en' ? 'Request a free audit' : 'Demander un audit gratuit';
    const displayTitle = title || (dict ? (dict.highlight ? `${dict.title} ${dict.highlight}` : dict.title) : fallbackTitle);
    const displaySubtitle = subtitle || (dict?.subtitle || fallbackSubtitle);
    const btn1Text = dict?.btn1 || dict?.cta || fallbackBtn1;
    const btn2Text = dict?.btn2 || dict?.ctaSecondary || 'WhatsApp';
    const prefix = `/${locale}`;

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950" />
            <Floating3DShapes variant="cta" />
            <motion.div style={{ y: decorY }} className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="deco-circle w-[600px] h-[600px] -top-[200px] right-[10%]" />
                <div className="deco-circle w-[400px] h-[400px] bottom-[5%] -left-[100px]" />
            </motion.div>
            <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute w-full h-full" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
                    <motion.path
                        d="M-100 350 Q 400 50 800 200 Q 1200 350 1600 100"
                        stroke="url(#cta-stroke)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 0.12 } : {}}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                    <defs>
                        <linearGradient id="cta-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-8 lg:px-12">
                <ScrollReveal blur={true} scale={true}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-5">
                        {displayTitle}
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.15} blur={true}>
                    <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10">
                        {displaySubtitle}
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3} blur={true}>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <MoneyHoverEffect>
                            <Link href={`${prefix}/contact`} className="btn-primary money-hover-btn">
                                {btn1Text}
                                <span className="btn-arrow">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        </MoneyHoverEffect>
                        <a
                            href={`https://api.whatsapp.com/send/?phone=212604778249&text=${locale === 'ar' ? '%D9%85%D8%B1%D8%AD%D8%A8%D8%A7' : locale === 'en' ? 'Hello' : 'Bonjour'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            WhatsApp
                            <span className="btn-arrow">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
