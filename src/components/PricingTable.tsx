'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const plansFr = [
    { name: 'Startup', tagline: 'Pour démarrer', price: 'Sur devis', description: 'La formule idéale pour les nouvelles entreprises souhaitant établir une présence digitale solide.', features: ['Audit digital initial', 'Stratégie social media (2 plateformes)', 'Création de 12 posts/mois', 'Reporting mensuel', 'Support par email'], highlighted: false },
    { name: 'RankUp', tagline: 'Recommandé', price: 'Sur devis', description: 'Le choix des PME en croissance pour une stratégie digitale complète et performante.', features: ['Tout dans Startup +', 'SEO technique et on-page', 'Google Ads / Meta Ads', 'Création de 20 posts/mois', 'Community management', 'Site web optimisé', 'Reporting bi-mensuel', 'Account manager dédié'], highlighted: true },
    { name: 'Growth', tagline: 'Pour scaler', price: 'Sur devis', description: 'Pour les entreprises ambitieuses visant une croissance agressive et multi-canal.', features: ['Tout dans RankUp +', 'Stratégie 360° multi-plateformes', 'Production vidéo et photo', 'Lead nurturing avancé', 'Landing pages illimitées', 'Consulting stratégique', 'Reporting hebdomadaire', 'Priorité support 24/7'], highlighted: false },
];

const plansEn = [
    { name: 'Startup', tagline: 'To get started', price: 'Custom quote', description: 'The ideal formula for new businesses looking to establish a solid digital presence.', features: ['Initial digital audit', 'Social media strategy (2 platforms)', '12 posts/month creation', 'Monthly reporting', 'Email support'], highlighted: false },
    { name: 'RankUp', tagline: 'Recommended', price: 'Custom quote', description: 'The choice for growing SMEs seeking a complete and high-performing digital strategy.', features: ['Everything in Startup +', 'Technical & on-page SEO', 'Google Ads / Meta Ads', '20 posts/month creation', 'Community management', 'Optimized website', 'Bi-monthly reporting', 'Dedicated account manager'], highlighted: true },
    { name: 'Growth', tagline: 'To scale', price: 'Custom quote', description: 'For ambitious businesses aiming for aggressive multi-channel growth.', features: ['Everything in RankUp +', '360° multi-platform strategy', 'Video & photo production', 'Advanced lead nurturing', 'Unlimited landing pages', 'Strategic consulting', 'Weekly reporting', '24/7 priority support'], highlighted: false },
];

const plansAr = [
    { name: 'Startup', tagline: 'للبدء', price: 'حسب الطلب', description: 'الصيغة المثالية للشركات الجديدة الراغبة في بناء حضور رقمي قوي.', features: ['تدقيق رقمي أولي', 'استراتيجية وسائل التواصل (منصتان)', 'إنشاء 12 منشوراً/شهر', 'تقرير شهري', 'دعم عبر البريد الإلكتروني'], highlighted: false },
    { name: 'RankUp', tagline: 'موصى به', price: 'حسب الطلب', description: 'الخيار الأمثل للشركات المتنامية لاستراتيجية رقمية شاملة وفعالة.', features: ['كل ما في Startup +', 'SEO تقني وعلى الصفحة', 'Google Ads / Meta Ads', 'إنشاء 20 منشوراً/شهر', 'إدارة المجتمع', 'موقع محسّن', 'تقرير نصف شهري', 'مدير حساب مخصص'], highlighted: true },
    { name: 'Growth', tagline: 'للتوسع', price: 'حسب الطلب', description: 'للشركات الطموحة التي تسعى لنمو قوي متعدد القنوات.', features: ['كل ما في RankUp +', 'استراتيجية 360° متعددة المنصات', 'إنتاج فيديو وصور', 'رعاية عملاء متقدمة', 'صفحات هبوط غير محدودة', 'استشارات استراتيجية', 'تقرير أسبوعي', 'دعم أولوية 24/7'], highlighted: false },
];

export default function PricingTable({ locale = 'fr' }: { locale?: string } = {}) {
    const plans = locale === 'ar' ? plansAr : locale === 'en' ? plansEn : plansFr;
    const ctaText = locale === 'ar' ? 'طلب عرض أسعار' : locale === 'en' ? 'Request a quote' : 'Demander un devis';
    const prefix = `/${locale}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {plans.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 0.1}>
                    <div
                        className={`relative rounded-3xl p-7 lg:p-8 h-full flex flex-col transition-all duration-400 ${plan.highlighted
                            ? 'bg-gradient-to-b from-accent-purple/10 to-accent-cyan/5 border border-accent-purple/20 shadow-lg shadow-accent-purple/5'
                            : 'border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'
                            }`}
                    >
                        {plan.highlighted && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="px-4 py-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase rounded-full bg-accent-purple text-white">
                                    {plan.tagline}
                                </span>
                            </div>
                        )}
                        <div className="mb-6">
                            <p className="text-xs text-accent-purple font-semibold uppercase tracking-wider mb-2">{plan.tagline}</p>
                            <h3 className="text-2xl font-bold text-white font-heading mb-2">{plan.name}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
                        </div>
                        <div className="mb-7 pb-7 border-b border-white/[0.06]">
                            <span className="text-xl font-bold text-white font-heading">{plan.price}</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm">
                                    <svg className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-accent-purple' : 'text-accent-cyan/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-400">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={`${prefix}/contact`}
                            className={plan.highlighted ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                        >
                            {ctaText}
                            <span className="btn-arrow">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    );
}
