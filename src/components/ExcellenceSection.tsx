'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Floating3DShapes from './Floating3DShapes';

/* eslint-disable @typescript-eslint/no-explicit-any */

const promisesFr = [
    { icon: '✨', title: 'Design Captivant', description: 'Des sites web élégants et intuitifs qui incarnent votre marque et captivent vos visiteurs.' },
    { icon: '🎯', title: 'Stratégies Gagnantes', description: 'Marketing digital sur mesure pour des conversions explosives et un ROI maximisé.' },
    { icon: '🇲🇦', title: 'Expertise 100% Marocaine', description: 'Une connaissance approfondie du marché marocain et de ses opportunités business.' },
    { icon: '🤖', title: 'Technologie d\'Avant-Garde', description: 'Solutions innovantes intégrant SEO, intelligence artificielle et Data Analytics.' },
];
const promisesEn = [
    { icon: '✨', title: 'Captivating Design', description: 'Elegant and intuitive websites that embody your brand and captivate your visitors.' },
    { icon: '🎯', title: 'Winning Strategies', description: 'Tailored digital marketing for explosive conversions and maximized ROI.' },
    { icon: '🇲🇦', title: '100% Moroccan Expertise', description: 'Deep knowledge of the Moroccan market and its business opportunities.' },
    { icon: '🤖', title: 'Cutting-Edge Technology', description: 'Innovative solutions integrating SEO, artificial intelligence and Data Analytics.' },
];
const promisesAr = [
    { icon: '✨', title: 'تصميم آسر', description: 'مواقع أنيقة وسهلة الاستخدام تجسد علامتكم التجارية وتأسر زوارك.' },
    { icon: '🎯', title: 'استراتيجيات رابحة', description: 'تسويق رقمي مصمم خصيصاً لتحويلات هائلة وعائد استثمار أقصى.' },
    { icon: '🇲🇦', title: 'خبرة مغربية 100%', description: 'معرفة عميقة بالسوق المغربي وفرصه التجارية.' },
    { icon: '🤖', title: 'تكنولوجيا متطورة', description: 'حلول مبتكرة تدمج SEO والذكاء الاصطناعي وتحليلات البيانات.' },
];

const awardsFr = [
    { year: '2026', title: 'Agence Marketing Digital N°1 au Maroc', badge: '🏆' },
    { year: '2025', title: 'Meilleure Agence SEO — Région Souss-Massa', badge: '🥇' },
    { year: '2024', title: 'Top Agence Digitale — Performance Google Ads', badge: '🏅' },
    { year: '2023', title: 'Excellence en Branding & Communication', badge: '⭐' },
];
const awardsEn = [
    { year: '2026', title: '#1 Digital Marketing Agency in Morocco', badge: '🏆' },
    { year: '2025', title: 'Best SEO Agency — Souss-Massa Region', badge: '🥇' },
    { year: '2024', title: 'Top Digital Agency — Google Ads Performance', badge: '🏅' },
    { year: '2023', title: 'Excellence in Branding & Communication', badge: '⭐' },
];
const awardsAr = [
    { year: '2026', title: 'وكالة التسويق الرقمي الأولى في المغرب', badge: '🏆' },
    { year: '2025', title: 'أفضل وكالة SEO — جهة سوس ماسة', badge: '🥇' },
    { year: '2024', title: 'أفضل وكالة رقمية — أداء Google Ads', badge: '🏅' },
    { year: '2023', title: 'التميز في العلامات التجارية والتواصل', badge: '⭐' },
];

const headersFr = { badge: 'Notre Promesse', title: 'Excellence au Maroc :', highlight: 'Votre Agence Premium', subtitle: 'Quatre années consécutives de récompenses pour nos campagnes SEO, publicité digitale et content marketing.', awardsTitle: 'L\'Excellence <span class="gradient-text">Reconnue</span> en Marketing Digital' };
const headersEn = { badge: 'Our Promise', title: 'Excellence in Morocco:', highlight: 'Your Premium Agency', subtitle: 'Four consecutive years of awards for our SEO campaigns, digital advertising and content marketing.', awardsTitle: 'Recognized <span class="gradient-text">Excellence</span> in Digital Marketing' };
const headersAr = { badge: 'وعدنا', title: 'التميز في المغرب:', highlight: 'وكالتكم المتميزة', subtitle: 'أربع سنوات متتالية من الجوائز لحملاتنا في SEO والإعلانات الرقمية وتسويق المحتوى.', awardsTitle: 'التميز <span class="gradient-text">المعترف به</span> في التسويق الرقمي' };

export default function ExcellenceSection({ dict, locale = 'fr' }: { dict?: any; locale?: string } = {}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const promises = locale === 'ar' ? promisesAr : locale === 'en' ? promisesEn : promisesFr;
    const awards = locale === 'ar' ? awardsAr : locale === 'en' ? awardsEn : awardsFr;
    const headers = locale === 'ar' ? headersAr : locale === 'en' ? headersEn : headersFr;

    return (
        <section ref={ref} className="relative py-24 lg:py-32 bg-navy-900/40 overflow-hidden">
            <Floating3DShapes variant="testimonials" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent" />
            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                <ScrollReveal blur={true} perspective={true}>
                    <div className="text-center mb-6">
                        <span className="inline-block px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-cyan/20 text-accent-cyan bg-accent-cyan/5 mb-6">
                            {dict?.badge || headers.badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
                            {headers.title}{' '}<span className="gradient-text">{headers.highlight}</span>
                        </h2>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1} blur={true}>
                    <p className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16">
                        {headers.subtitle}
                    </p>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {promises.map((item, i) => (
                        <ScrollReveal key={item.title} delay={i * 0.1} blur={true} scale={true}>
                            <div className="glass-card p-6 h-full text-center interactive-card group">
                                <div className="text-3xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-base font-semibold text-white font-heading mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-xs leading-[1.8]">{item.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
                <ScrollReveal blur={true} delay={0.2}>
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-white font-heading" dangerouslySetInnerHTML={{ __html: headers.awardsTitle }} />
                    </div>
                </ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {awards.map((award, i) => (
                        <ScrollReveal key={award.year + i} delay={0.3 + i * 0.1} blur={true} scale={true}>
                            <div className="glass-card p-6 text-center group interactive-card">
                                <div className="text-3xl mb-3">{award.badge}</div>
                                <div className="text-2xl font-bold gradient-text font-heading mb-2">{award.year}</div>
                                <p className="text-gray-500 text-xs leading-snug">{award.title}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
