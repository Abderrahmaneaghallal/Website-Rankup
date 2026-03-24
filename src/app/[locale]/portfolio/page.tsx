'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import Floating3DShapes from "@/components/Floating3DShapes";
import Tilt3D from "@/components/Tilt3D";
import AnimatedCounter from "@/components/AnimatedCounter";
import MoneyBoomEffect from "@/components/MoneyBoomEffect";
import { ScrollTicker, SectionDivider } from "@/components/ScrollEffects";
import { breadcrumbSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/useLocale";
import { getPortfolioPageData } from "@/i18n/pageTranslations";
import { motion, useInView } from 'framer-motion';
import EngagementBurst, { FloatingEngagementBar, EngagementDivider } from '@/components/EngagementBurst';

/* ─── TYPES ─────────────────────────────────────── */
interface PortfolioItem {
    id: string;
    slug: string;
    titleFr: string; titleEn: string; titleAr: string;
    excerptFr: string; excerptEn: string; excerptAr: string;
    clientName: string;
    industry: string;
    tags: string;
    results: string;
    featuredImage: string | null;
    isFeatured: boolean;
}

/* ─── SHOWCASE DATA (hardcoded for premium display) ─── */
const websiteShowcases = [
    {
        id: 'riad-luxe',
        title: 'Riad Luxe Marrakech',
        category: 'Hospitality',
        url: 'riadluxe-marrakech.com',
        gradient: 'from-amber-900/80 via-orange-800/60 to-yellow-900/80',
        accent: '#f59e0b',
        description: { fr: 'Site de réservation luxe pour un riad 5 étoiles à Marrakech', en: 'Luxury booking website for a 5-star riad in Marrakech', ar: 'موقع حجز فاخر لرياض 5 نجوم في مراكش' },
        stats: { traffic: '+320%', conversion: '4.2%', speed: '98/100' },
        mockupSections: ['hero', 'rooms', 'gallery', 'booking', 'reviews', 'footer'],
    },
    {
        id: 'atlas-tours',
        title: 'Atlas Tours',
        category: 'Tourism',
        url: 'atlas-tours.ma',
        gradient: 'from-emerald-900/80 via-teal-800/60 to-green-900/80',
        accent: '#10b981',
        description: { fr: 'Plateforme de réservation de circuits touristiques au Maroc', en: 'Tour booking platform for Morocco travel experiences', ar: 'منصة حجز رحلات سياحية في المغرب' },
        stats: { traffic: '+280%', conversion: '5.1%', speed: '95/100' },
        mockupSections: ['hero', 'tours', 'destinations', 'testimonials', 'blog', 'footer'],
    },
    {
        id: 'techvolt',
        title: 'TechVolt Solutions',
        category: 'Technology',
        url: 'techvolt.ma',
        gradient: 'from-violet-900/80 via-purple-800/60 to-indigo-900/80',
        accent: '#8b5cf6',
        description: { fr: 'Site corporate moderne pour une startup tech à Casablanca', en: 'Modern corporate website for a Casablanca tech startup', ar: 'موقع شركة حديث لشركة تقنية ناشئة في الدار البيضاء' },
        stats: { traffic: '+450%', conversion: '3.8%', speed: '99/100' },
        mockupSections: ['hero', 'services', 'portfolio', 'team', 'pricing', 'contact'],
    },
    {
        id: 'foodchain',
        title: 'FoodChain Restaurant',
        category: 'Restaurant',
        url: 'foodchain.ma',
        gradient: 'from-red-900/80 via-rose-800/60 to-pink-900/80',
        accent: '#f43f5e',
        description: { fr: 'Site e-commerce et commande en ligne pour chaîne de restaurants', en: 'E-commerce and online ordering for restaurant chain', ar: 'موقع تجارة إلكترونية وطلب عبر الإنترنت لسلسلة مطاعم' },
        stats: { traffic: '+190%', conversion: '6.3%', speed: '96/100' },
        mockupSections: ['hero', 'menu', 'order', 'locations', 'reviews', 'app'],
    },
];

const socialMediaDesigns = [
    { id: 'sm-1', type: 'instagram', title: 'Atlas Tours — Instagram Campaign', color: 'from-pink-500 to-purple-600', ratio: 'aspect-square' },
    { id: 'sm-2', type: 'story', title: 'Riad Luxe — Story Series', color: 'from-amber-400 to-orange-600', ratio: 'aspect-[9/16]' },
    { id: 'sm-3', type: 'instagram', title: 'FoodChain — Food Photography', color: 'from-red-500 to-rose-600', ratio: 'aspect-square' },
    { id: 'sm-4', type: 'facebook', title: 'TechVolt — Tech Series', color: 'from-blue-500 to-indigo-600', ratio: 'aspect-video' },
    { id: 'sm-5', type: 'carousel', title: 'EduMa — Carousel Posts', color: 'from-emerald-400 to-teal-600', ratio: 'aspect-square' },
    { id: 'sm-6', type: 'story', title: 'MarocFit — Fitness Stories', color: 'from-cyan-400 to-blue-600', ratio: 'aspect-[9/16]' },
    { id: 'sm-7', type: 'instagram', title: 'SkyTravel — Adventure Posts', color: 'from-sky-400 to-blue-600', ratio: 'aspect-square' },
    { id: 'sm-8', type: 'facebook', title: 'MediCare+ — Health Tips', color: 'from-green-400 to-emerald-600', ratio: 'aspect-video' },
];

/* ─── WEBSITE BROWSER MOCKUP (auto-scroll on hover) ─── */
function WebsiteBrowserMockup({ site, locale }: { site: typeof websiteShowcases[0]; locale: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const startAutoScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        let pos = 0;
        const maxScroll = el.scrollHeight - el.clientHeight;
        const speed = 0.75;
        const animate = () => {
            pos += speed;
            if (pos >= maxScroll) pos = 0;
            el.scrollTop = pos;
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
    }, []);

    const stopAutoScroll = useCallback(() => {
        cancelAnimationFrame(animationRef.current);
    }, []);

    useEffect(() => {
        if (isHovered) startAutoScroll();
        else stopAutoScroll();
        return () => stopAutoScroll();
    }, [isHovered, startAutoScroll, stopAutoScroll]);

    const desc = site.description[locale as 'fr' | 'en' | 'ar'] || site.description.fr;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-navy-900/60 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-navy-950/80 border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-gray-400 max-w-xs">
                            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            <span className="truncate">{site.url}</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Website Content */}
                <div
                    ref={scrollRef}
                    className="h-[320px] md:h-[380px] overflow-hidden relative"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {/* Simulated website content sections */}
                    <div className="min-h-[1600px]">
                        {/* Hero Section */}
                        <div className={`h-[380px] bg-gradient-to-br ${site.gradient} flex items-center justify-center relative`}>
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
                            <div className="text-center px-8 relative z-10">
                                <div className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">{site.category}</div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading">{site.title}</h3>
                                <p className="text-white/70 text-sm max-w-md mx-auto">{desc}</p>
                                <div className="mt-6 flex gap-3 justify-center">
                                    <div className="px-5 py-2 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: site.accent }}>Book Now</div>
                                    <div className="px-5 py-2 rounded-full text-xs font-semibold text-white/80 border border-white/20">Learn More</div>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        {site.mockupSections.slice(1).map((section, i) => (
                            <div key={section} className="border-t border-white/[0.04]">
                                <div className={`px-8 py-12 ${i % 2 === 0 ? 'bg-navy-950/40' : 'bg-navy-900/30'}`}>
                                    <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: site.accent }}>{section}</div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3].map(j => (
                                            <div key={j} className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-4 h-24">
                                                <div className="w-8 h-8 rounded-lg mb-2" style={{ backgroundColor: `${site.accent}20` }} />
                                                <div className="h-2 rounded bg-white/[0.06] w-full mb-1.5" />
                                                <div className="h-2 rounded bg-white/[0.04] w-2/3" />
                                            </div>
                                        ))}
                                    </div>
                                    {i === 0 && (
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            {[1, 2].map(j => (
                                                <div key={j} className={`rounded-lg h-32 bg-gradient-to-br ${site.gradient} opacity-30`} />
                                            ))}
                                        </div>
                                    )}
                                    {i === 1 && (
                                        <div className="flex gap-2 mt-4">
                                            {[1, 2, 3, 4].map(j => (
                                                <div key={j} className={`rounded-lg flex-1 h-20 bg-gradient-to-br ${site.gradient} opacity-20`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hover overlay indicator */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-50 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-50'}`} />

                    {/* Scroll indicator */}
                    <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/40 transition-all duration-300 ${isHovered ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
                        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        </motion.div>
                        {locale === 'ar' ? 'مرر للاستكشاف' : locale === 'en' ? 'Hover to explore' : 'Survolez pour explorer'}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-navy-950/60 border-t border-white/[0.06]">
                    <div className="flex gap-6">
                        {Object.entries(site.stats).map(([key, val]) => (
                            <div key={key} className="text-center">
                                <div className="text-xs font-bold" style={{ color: site.accent }}>{val}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{key}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-white transition-colors">
                        {locale === 'ar' ? 'عرض المشروع' : locale === 'en' ? 'View project' : 'Voir le projet'}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── SOCIAL MEDIA PHONE MOCKUP ─── */
function SocialMediaCard({ design, index }: { design: typeof socialMediaDesigns[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const isStory = design.type === 'story';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative ${isStory ? 'row-span-2' : ''}`}
        >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-navy-900/40 hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
                {/* Design Preview */}
                <div className={`relative ${design.ratio} bg-gradient-to-br ${design.color} overflow-hidden`}>
                    {/* Simulated design content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        {/* Abstract design shapes */}
                        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute bottom-8 left-6 w-24 h-24 rounded-full bg-black/10 blur-xl" />

                        {/* Logo placeholder */}
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-4 flex items-center justify-center text-white font-bold text-lg">
                            {design.title.charAt(0)}
                        </div>

                        {/* Text placeholders */}
                        <div className="space-y-2 w-full max-w-[80%]">
                            <div className="h-3 rounded-full bg-white/30 w-3/4 mx-auto" />
                            <div className="h-2 rounded-full bg-white/20 w-1/2 mx-auto" />
                        </div>

                        {/* CTA button */}
                        <div className="mt-4 px-6 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                            <div className="h-2 rounded-full bg-white/40 w-16" />
                        </div>

                        {/* Story-specific elements */}
                        {isStory && (
                            <>
                                <div className="absolute top-3 left-3 right-3 flex gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`flex-1 h-0.5 rounded-full ${i === 1 ? 'bg-white/80' : 'bg-white/20'}`} />
                                    ))}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 rounded-full bg-white/30" />
                                        <div className="h-2 rounded bg-white/30 w-20" />
                                    </div>
                                    <div className="h-8 rounded-full bg-white/10 border border-white/20 flex items-center px-3">
                                        <div className="h-2 rounded bg-white/20 w-full" />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Instagram-specific elements */}
                        {design.type === 'instagram' && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                                <div className="flex gap-3 mb-2">
                                    {['♥', '💬', '📤'].map(icon => (
                                        <span key={icon} className="text-white/80 text-sm">{icon}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Carousel indicator */}
                        {design.type === 'carousel' && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/30'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${design.type === 'instagram' ? 'bg-pink-500/10 text-pink-400' :
                            design.type === 'story' ? 'bg-orange-500/10 text-orange-400' :
                                design.type === 'carousel' ? 'bg-purple-500/10 text-purple-400' :
                                    'bg-blue-500/10 text-blue-400'
                            }`}>
                            {design.type}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{design.title}</p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── FILTER TABS ─── */
function FilterTabs({ active, onFilter, locale }: { active: string; onFilter: (v: string) => void; locale: string }) {
    const filters = [
        { key: 'all', label: { fr: 'Tous', en: 'All', ar: 'الكل' } },
        { key: 'websites', label: { fr: 'Sites Web', en: 'Websites', ar: 'مواقع ويب' } },
        { key: 'social', label: { fr: 'Social Media', en: 'Social Media', ar: 'وسائل التواصل' } },
        { key: 'branding', label: { fr: 'Branding', en: 'Branding', ar: 'هوية بصرية' } },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map(f => (
                <button
                    key={f.key}
                    onClick={() => onFilter(f.key)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === f.key
                        ? 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg shadow-accent-purple/20'
                        : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                        }`}
                >
                    {f.label[locale as 'fr' | 'en' | 'ar'] || f.label.fr}
                </button>
            ))}
        </div>
    );
}

/* ─── MAIN PAGE ─── */
export default function PortfolioPage() {
    const locale = useLocale();
    const d = getPortfolioPageData(locale);
    const prefix = `/${locale}`;
    const l = locale as 'fr' | 'en' | 'ar';

    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetch('/api/portfolio')
            .then(r => r.json())
            .then(data => setItems(Array.isArray(data) ? data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const getTitle = (item: PortfolioItem) => (item[`title${cap(l)}` as keyof PortfolioItem] as string) || item.titleFr;
    const getExcerpt = (item: PortfolioItem) => (item[`excerpt${cap(l)}` as keyof PortfolioItem] as string) || item.excerptFr;

    const parseResults = (raw: string): string[] => {
        try { return JSON.parse(raw) as string[]; } catch { return []; }
    };

    const websitesLabel = { fr: 'Sites Web Réalisés', en: 'Website Projects', ar: 'مشاريع المواقع' };
    const socialLabel = { fr: 'Designs Social Media', en: 'Social Media Designs', ar: 'تصاميم وسائل التواصل' };
    const caseStudiesLabel = { fr: 'Études de Cas', en: 'Case Studies', ar: 'دراسات حالة' };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${locale}` },
                    { name: 'Portfolio', url: `https://rankuplus.com/${locale}/portfolio` },
                ]))
            }} />

            <Hero badge={d.hero.badge} title={d.hero.title} highlight={d.hero.highlight} subtitle={d.hero.subtitle} locale={locale} />

            <ScrollTicker text="ATLAS TOURS • TECHSTART • AGADIR PROPERTIES • FOODCHAIN • EDUMA • RIAD LUXE •" speed={0.8} />

            {/* Impact stats */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <EngagementBurst variant="stats" count={10} repeatInterval={3500} spread="sides" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.statsBadge} title={d.statsTitle} subtitle="" />
                    </ScrollReveal>
                    <MoneyBoomEffect>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {d.stats.map((stat: { value: number; suffix: string; label: string }, i: number) => (
                                <ScrollReveal key={stat.label} delay={i * 0.1} blur={true} scale={true}>
                                    <Tilt3D intensity={10} glare={true} scale={1.06}>
                                        <div className="glass-card p-6 text-center">
                                            <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-2xl lg:text-3xl font-bold gradient-text font-heading block" duration={2500} />
                                            <div className="text-gray-400 text-sm mt-2" style={{ transform: 'translateZ(5px)' }}>{stat.label}</div>
                                        </div>
                                    </Tilt3D>
                                </ScrollReveal>
                            ))}
                        </div>
                    </MoneyBoomEffect>
                </div>
            </section>

            <SectionDivider />

            {/* ═══ WEBSITE SHOWCASE ═══ */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <EngagementBurst variant="websites" count={16} repeatInterval={3000} />
                <Floating3DShapes variant="services" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={websitesLabel[l]}
                            title={l === 'ar' ? 'مواقع ويب <span class="gradient-text">تحوّل الزوار</span> إلى عملاء' : l === 'en' ? 'Websites that <span class="gradient-text">convert visitors</span> into clients' : 'Des sites web qui <span class="gradient-text">convertissent</span> vos visiteurs'}
                            subtitle={l === 'ar' ? 'مرر الماوس على كل موقع لاستكشافه كما يراه الزائر' : l === 'en' ? 'Hover over each website to explore it as a visitor would' : 'Survolez chaque site pour l\'explorer comme un visiteur'}
                        />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {websiteShowcases.map(site => (
                            <WebsiteBrowserMockup key={site.id} site={site} locale={locale} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ENGAGEMENT METRICS DIVIDER ═══ */}
            <EngagementDivider locale={locale} />

            {/* ═══ SOCIAL MEDIA DESIGNS ═══ */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <EngagementBurst variant="social" count={22} repeatInterval={2000} />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader
                            badge={socialLabel[l]}
                            title={l === 'ar' ? 'تصاميم <span class="gradient-text">إبداعية</span> تحقق التفاعل' : l === 'en' ? 'Creative designs that <span class="gradient-text">drive engagement</span>' : 'Des designs qui <span class="gradient-text">captivent</span> votre audience'}
                            subtitle={l === 'ar' ? 'منشورات وقصص وحملات سوشيال ميديا مصممة لتحقيق أقصى تفاعل' : l === 'en' ? 'Posts, stories and social media campaigns designed for maximum engagement' : 'Posts, stories et campagnes social media conçus pour un engagement maximal'}
                        />
                    </ScrollReveal>

                    {/* Masonry-like grid for social media */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
                        {socialMediaDesigns.map((design, i) => (
                            <SocialMediaCard key={design.id} design={design} index={i} />
                        ))}
                    </div>

                    {/* Engagement bar */}
                    <FloatingEngagementBar />
                </div>
            </section>

            <SectionDivider />

            {/* ═══ CASE STUDIES FROM DB ═══ */}
            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <EngagementBurst variant="results" count={12} repeatInterval={3000} />
                <Floating3DShapes variant="services" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={caseStudiesLabel[l]} title={d.casesTitle} subtitle="" />
                    </ScrollReveal>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="glass-card overflow-hidden animate-pulse">
                                    <div className="h-48 bg-white/5" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-5 bg-white/5 rounded" />
                                        <div className="h-3 bg-white/5 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 mt-12">
                            <div className="text-5xl mb-4">🗂️</div>
                            <p>{locale === 'ar' ? 'لا توجد مشاريع بعد.' : locale === 'en' ? 'No projects yet.' : 'Aucun projet pour le moment.'}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {items.map((item, i) => {
                                const results = parseResults(item.results);
                                const tags = item.tags ? item.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
                                return (
                                    <ScrollReveal key={item.id} delay={i * 0.08} blur={true} scale={true} rotate={true}>
                                        <Tilt3D intensity={8} glare={true} borderGlow={true} scale={1.03}>
                                            <div className="glass-card overflow-hidden h-full flex flex-col">
                                                <div
                                                    className="h-48 bg-gradient-to-br from-accent-purple/20 via-accent-blue/10 to-accent-cyan/20 flex items-center justify-center p-6"
                                                    style={item.featuredImage ? { backgroundImage: `url(${item.featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                                                >
                                                    <h3 className="text-xl font-bold text-white text-center font-heading drop-shadow-lg" style={{ transform: 'translateZ(10px)' }}>
                                                        {item.clientName || getTitle(item)}
                                                    </h3>
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <span className="text-accent-purple text-xs font-semibold uppercase tracking-wider mb-3" style={{ transform: 'translateZ(8px)' }}>
                                                        {item.industry || getTitle(item)}
                                                    </span>
                                                    {getExcerpt(item) && (
                                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{getExcerpt(item)}</p>
                                                    )}
                                                    {results.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {results.map(r => (
                                                                <span key={r} className="px-3 py-1 text-xs rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20">{r}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                                            {tags.map(tag => (
                                                                <span key={tag} className="px-2 py-0.5 text-xs rounded bg-white/5 text-gray-400">{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <Link
                                                        href={`${prefix}/portfolio/${item.slug}`}
                                                        className="inline-flex items-center gap-1.5 text-accent-purple text-sm font-medium hover:gap-2.5 transition-all mt-auto"
                                                        style={{ transform: 'translateZ(12px)' }}
                                                    >
                                                        {locale === 'ar' ? 'عرض التفاصيل' : locale === 'en' ? 'View Case Study' : 'Voir le projet'}
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Tilt3D>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <SectionDivider />

            <CTASection dict={{ title: d.ctaTitle, highlight: '', subtitle: d.ctaSubtitle, cta: locale === 'ar' ? 'تواصلوا معنا' : locale === 'en' ? 'Contact us' : 'Contactez-nous', ctaSecondary: 'WhatsApp' }} locale={locale} />
        </>
    );
}
