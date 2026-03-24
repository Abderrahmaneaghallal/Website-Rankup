'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import Floating3DShapes from './Floating3DShapes';
import AnimatedCounter from './AnimatedCounter';
import MoneyBoomEffect from './MoneyBoomEffect';

/* eslint-disable @typescript-eslint/no-explicit-any */

const guaranteesFr = [
    { icon: '📈', title: 'Multipliez votre Chiffre d\'affaires en ligne', description: 'Notre agence marketing digital booste l\'engagement et la conversion grâce à des contenus captivants et un ciblage intelligent.' },
    { icon: '🎯', title: 'Stratégie Digitale Éprouvée', description: 'Nous transformons les publicités en véritables moteurs de revenus. Notre expertise en campagnes ciblées maximise le retour sur investissement.' },
    { icon: '🛡️', title: 'Élevez Votre e-Réputation', description: 'Nous bâtissons une réputation numérique qui inspire confiance et engagement. Votre marque prospère en ligne.' },
    { icon: '💎', title: 'Expertise en Branding Premium', description: 'Nous créons des visuels uniques qui captent l\'essence de votre marque, la rendant inoubliable dans un marché concurrentiel.' },
];

const guaranteesEn = [
    { icon: '📈', title: 'Multiply Your Online Revenue', description: 'Our digital marketing agency boosts engagement and conversion through captivating content and intelligent targeting.' },
    { icon: '🎯', title: 'Proven Digital Strategy', description: 'We transform advertising into real revenue drivers. Our expertise in targeted campaigns maximizes return on investment.' },
    { icon: '🛡️', title: 'Elevate Your e-Reputation', description: 'We build a digital reputation that inspires trust and engagement. Your brand thrives online.' },
    { icon: '💎', title: 'Premium Branding Expertise', description: 'We create unique visuals that capture the essence of your brand, making it unforgettable in a competitive market.' },
];

const guaranteesAr = [
    { icon: '📈', title: 'ضاعف إيراداتك عبر الإنترنت', description: 'وكالتنا للتسويق الرقمي تعزز التفاعل والتحويل من خلال محتوى جذاب واستهداف ذكي.' },
    { icon: '🎯', title: 'استراتيجية رقمية مثبتة', description: 'نحوّل الإعلانات إلى محركات إيرادات حقيقية. خبرتنا في الحملات المستهدفة تحقق أقصى عائد على الاستثمار.' },
    { icon: '🛡️', title: 'ارفع سمعتك الإلكترونية', description: 'نبني سمعة رقمية تلهم الثقة والتفاعل. علامتك التجارية تزدهر عبر الإنترنت.' },
    { icon: '💎', title: 'خبرة في العلامات التجارية المتميزة', description: 'نبتكر تصاميم بصرية فريدة تجسد جوهر علامتك التجارية وتجعلها لا تُنسى في سوق تنافسي.' },
];

export default function ResultsGuarantee({ dict, locale = 'fr' }: { dict?: any; locale?: string } = {}) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const guarantees = locale === 'ar' ? guaranteesAr : locale === 'en' ? guaranteesEn : guaranteesFr;

    const badge = dict?.badge || (locale === 'ar' ? 'نتائج ملموسة' : locale === 'en' ? 'Concrete Results' : 'Résultats Concrets');
    const title = dict?.title || (locale === 'ar' ? 'وكالة التسويق الرقمي التي <span class="gradient-text">تضمن النتائج</span>' : locale === 'en' ? 'The digital marketing agency that <span class="gradient-text">guarantees results</span>' : 'L\'agence marketing digital qui <span class="gradient-text">garantit des résultats</span>');

    const badgeLabels = dict?.badges || (locale === 'ar' ? ['بدون التزام', 'رد خلال 24 ساعة', 'نتائج موجهة نحو العائد'] : locale === 'en' ? ['No commitment', 'Response within 24h', 'ROI-oriented results'] : ['Sans engagement', 'Réponse sous 24h', 'Résultats orientés ROI']);

    const stats = dict?.stats || (locale === 'ar' ? [
        { value: '+240M', label: 'إيرادات محققة' },
        { value: '98%', label: 'نسبة الرضا' },
        { value: '+350%', label: 'متوسط عائد الاستثمار' },
        { value: '4 سنوات', label: 'من التميز المتواصل' },
    ] : locale === 'en' ? [
        { value: '+240M', label: 'Revenue Generated' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '+350%', label: 'Average Client ROI' },
        { value: '4 yrs', label: 'Of Consecutive Excellence' },
    ] : [
        { value: '+240M', label: 'Revenus Générés' },
        { value: '98%', label: 'Taux de Satisfaction' },
        { value: '+350%', label: 'ROI Moyen Clients' },
        { value: '4 ans', label: 'D\'Excellence Consécutive' },
    ]);

    return (
        <section ref={sectionRef} id="results" className="relative py-24 lg:py-32 bg-navy-950 overflow-hidden">
            <Floating3DShapes variant="why" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                <ScrollReveal blur={true} perspective={true}>
                    <div className="text-center mb-6">
                        <span className="inline-block px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-cyan/20 text-accent-cyan bg-accent-cyan/5 mb-6">
                            {badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15} blur={true}>
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                        {badgeLabels.map((label: string) => (
                            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-semibold">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                {label}
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
                    {guarantees.map((item, i) => (
                        <ScrollReveal key={item.title} delay={i * 0.1} blur={true} direction={i % 2 === 0 ? 'left' : 'right'}>
                            <div className="glass-card p-7 lg:p-8 h-full interactive-card group">
                                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-white font-heading mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-[1.8]">{item.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal blur={true} scale={true}>
                    <MoneyBoomEffect>
                        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 lg:p-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                {stats.map((stat: any, i: number) => (
                                    <div key={i}>
                                        <AnimatedCounter
                                            value={i === 0 ? 240 : i === 1 ? 98 : i === 2 ? 350 : 4}
                                            prefix={i === 0 || i === 2 ? '+' : ''}
                                            suffix={i === 1 ? '%' : i === 2 ? '%' : i === 3 ? (locale === 'ar' ? ' سنوات' : locale === 'en' ? ' yrs' : ' ans') : (locale === 'ar' ? 'م درهم' : 'M MAD')}
                                            className="text-2xl md:text-3xl font-bold gradient-text font-heading block"
                                            duration={i === 0 ? 2500 : i === 1 ? 2000 : i === 2 ? 2200 : 1500}
                                        />
                                        <p className="text-gray-500 text-xs mt-2 tracking-wide">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MoneyBoomEffect>
                </ScrollReveal>
            </div>
        </section>
    );
}
