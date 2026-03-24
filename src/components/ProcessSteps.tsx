'use client';

import Link from 'next/link';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import MoneyHoverEffect from './MoneyHoverEffect';

/* eslint-disable @typescript-eslint/no-explicit-any */

const stepsFr = [
    { number: '01', title: 'Audit & Stratégie', icon: '🔍', description: 'Nous commençons par un audit complet de votre présence digitale actuelle. Puis nous définissons une stratégie sur mesure alignée avec vos objectifs business.', features: ['Analyse concurrentielle', 'Audit SEO technique', 'Étude de marché', 'Plan d\'action détaillé'] },
    { number: '02', title: 'Exécution & Lancement', icon: '🚀', description: 'Notre équipe met en œuvre la stratégie validée : création de contenu, optimisation SEO, lancement de campagnes publicitaires, développement web.', features: ['Contenus engageants', 'Campagnes optimisées', 'Sites web performants', 'Suivi en temps réel'] },
    { number: '03', title: 'Mesure & Optimisation', icon: '📊', description: 'Chaque action est mesurée et analysée. Nous optimisons en continu grâce à l\'A/B testing et l\'analyse des données.', features: ['Rapports transparents', 'KPIs mesurables', 'Optimisation continue', 'ROI maximisé'] },
];

const stepsEn = [
    { number: '01', title: 'Audit & Strategy', icon: '🔍', description: 'We start with a complete audit of your current digital presence. Then we define a tailored strategy aligned with your business goals.', features: ['Competitive analysis', 'Technical SEO audit', 'Market research', 'Detailed action plan'] },
    { number: '02', title: 'Execution & Launch', icon: '🚀', description: 'Our team implements the validated strategy: content creation, SEO optimization, advertising campaigns, web development.', features: ['Engaging content', 'Optimized campaigns', 'High-performing websites', 'Real-time tracking'] },
    { number: '03', title: 'Measure & Optimize', icon: '📊', description: 'Every action is measured and analyzed. We continuously optimize through A/B testing and data analysis.', features: ['Transparent reports', 'Measurable KPIs', 'Continuous optimization', 'Maximized ROI'] },
];

const stepsAr = [
    { number: '01', title: 'التدقيق والاستراتيجية', icon: '🔍', description: 'نبدأ بتدقيق شامل لحضوركم الرقمي الحالي. ثم نحدد استراتيجية مخصصة تتماشى مع أهدافكم التجارية.', features: ['تحليل المنافسين', 'تدقيق SEO تقني', 'دراسة السوق', 'خطة عمل مفصلة'] },
    { number: '02', title: 'التنفيذ والإطلاق', icon: '🚀', description: 'فريقنا ينفذ الاستراتيجية: إنشاء المحتوى، تحسين SEO، إطلاق الحملات الإعلانية، تطوير المواقع.', features: ['محتوى جذاب', 'حملات محسّنة', 'مواقع عالية الأداء', 'متابعة فورية'] },
    { number: '03', title: 'القياس والتحسين', icon: '📊', description: 'كل إجراء يتم قياسه وتحليله. نحسّن باستمرار من خلال اختبارات A/B وتحليل البيانات.', features: ['تقارير شفافة', 'مؤشرات أداء قابلة للقياس', 'تحسين مستمر', 'عائد استثمار أقصى'] },
];

const headersFr = { badge: 'Comment Ça Marche', title: '3 étapes simples pour', highlight: 'booster votre business', subtitle: 'Travailler avec RankUp, c\'est bénéficier d\'une stratégie claire, d\'une exécution rigoureuse et de résultats mesurables.', cta: 'Réserver mon audit stratégique gratuit' };
const headersEn = { badge: 'How It Works', title: '3 simple steps to', highlight: 'boost your business', subtitle: 'Working with RankUp means benefiting from a clear strategy, rigorous execution and measurable results.', cta: 'Book my free strategic audit' };
const headersAr = { badge: 'كيف يعمل', title: '3 خطوات بسيطة', highlight: 'لتنمية أعمالكم', subtitle: 'العمل مع رانك أب يعني الاستفادة من استراتيجية واضحة وتنفيذ دقيق ونتائج قابلة للقياس.', cta: 'احجز تدقيقك الاستراتيجي المجاني' };

const colors = [
    { color: 'from-purple-500 to-indigo-500', borderColor: 'border-purple-500/20' },
    { color: 'from-cyan-500 to-blue-500', borderColor: 'border-cyan-500/20' },
    { color: 'from-pink-500 to-rose-500', borderColor: 'border-pink-500/20' },
];

export default function ProcessSteps({ dict, locale = 'fr' }: { dict?: any; locale?: string } = {}) {
    const sectionRef = useRef(null);
    const steps = locale === 'ar' ? stepsAr : locale === 'en' ? stepsEn : stepsFr;
    const headers = locale === 'ar' ? headersAr : locale === 'en' ? headersEn : headersFr;
    const prefix = `/${locale}`;

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 bg-navy-950 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent" />
            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                <ScrollReveal blur={true} perspective={true}>
                    <div className="text-center mb-6">
                        <span className="inline-block px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-purple/20 text-accent-purple bg-accent-purple/5 mb-6">
                            {dict?.badge || headers.badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
                            {dict?.title ? <span dangerouslySetInnerHTML={{ __html: dict.title }} /> : <>{headers.title}{' '}<span className="gradient-text">{headers.highlight}</span></>}
                        </h2>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1} blur={true}>
                    <p className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16">
                        {dict?.steps ? undefined : headers.subtitle}
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {steps.map((step, i) => (
                        <ScrollReveal key={step.number} delay={i * 0.15} blur={true} scale={true}>
                            <div className={`glass-card p-8 h-full group interactive-card relative border ${colors[i].borderColor}`}>
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[i].color} flex items-center justify-center text-white font-bold font-heading text-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.number}
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{step.icon}</span>
                                    <h3 className="text-xl font-bold text-white font-heading">{step.title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-[1.8] mb-6">{step.description}</p>
                                <ul className="space-y-2">
                                    {step.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                                            <svg className="w-4 h-4 text-accent-purple shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal blur={true} delay={0.3}>
                    <div className="text-center">
                        <MoneyHoverEffect>
                            <Link href={`${prefix}/contact`} className="btn-primary money-hover-btn">
                                {dict?.cta || headers.cta}
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
    );
}
