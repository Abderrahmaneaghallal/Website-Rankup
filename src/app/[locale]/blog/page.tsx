'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import Floating3DShapes from "@/components/Floating3DShapes";
import Tilt3D from "@/components/Tilt3D";
import MoneyHoverEffect from "@/components/MoneyHoverEffect";
import { ScrollTicker, SectionDivider } from "@/components/ScrollEffects";
import { breadcrumbSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/useLocale";
import { getBlogPageData } from "@/i18n/pageTranslations";

interface BlogPost {
    id: string;
    slug: string;
    titleFr: string; titleEn: string; titleAr: string;
    excerptFr: string; excerptEn: string; excerptAr: string;
    featuredImage: string | null;
    readTime: number;
    publishedAt: string | null;
    createdAt: string;
    category: { slug: string; nameFr: string; nameEn: string; nameAr: string } | null;
}

interface Category {
    slug: string; nameFr: string; nameEn: string; nameAr: string;
}

export default function BlogPage() {
    const locale = useLocale();
    const d = getBlogPageData(locale);
    const prefix = `/${locale}`;
    const l = locale as 'fr' | 'en' | 'ar';

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (activeCategory) params.set('category', activeCategory);
        fetch(`/api/blog?${params}`)
            .then(r => r.json())
            .then(data => { setPosts(data.posts || []); setLoading(false); })
            .catch(() => setLoading(false));
    }, [search, activeCategory]);

    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const getTitle = (p: BlogPost) => (p[`title${cap(l)}` as keyof BlogPost] as string) || p.titleFr;
    const getExcerpt = (p: BlogPost) => (p[`excerpt${cap(l)}` as keyof BlogPost] as string) || p.excerptFr;
    const getCatName = (cat: Category) => (cat[`name${cap(l)}` as keyof Category] as string) || cat.nameFr;

    const formatDate = (date: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString(
            locale === 'ar' ? 'ar-MA' : locale === 'en' ? 'en-GB' : 'fr-FR',
            { day: '2-digit', month: 'long', year: 'numeric' }
        );
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${locale}` },
                    { name: 'Blog', url: `https://rankuplus.com/${locale}/blog` },
                ]))
            }} />

            <Hero badge={d.hero.badge} title={d.hero.title} highlight={d.hero.highlight} subtitle={d.hero.subtitle} locale={locale} />

            <ScrollTicker text="SEO • BRANDING • CONTENT MARKETING • SOCIAL MEDIA • AI •" speed={1} />

            {/* Search + Categories */}
            <section className="relative py-16 bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.topicsBadge} title={d.topicsTitle} subtitle="" />
                    </ScrollReveal>

                    <ScrollReveal blur={true}>
                        <div className="max-w-xl mx-auto mt-10 mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder={locale === 'ar' ? 'ابحث في المقالات...' : locale === 'en' ? 'Search articles...' : 'Rechercher des articles...'}
                                    className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-500 outline-none focus:border-accent-purple/40 transition-colors"
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center">
                                <button onClick={() => setActiveCategory('')} className={`px-4 py-2 text-sm rounded-full transition-all ${activeCategory === '' ? 'bg-accent-purple/20 border border-accent-purple/40 text-white' : 'glass text-gray-400 hover:text-white'}`}>
                                    {locale === 'ar' ? 'الكل' : locale === 'en' ? 'All' : 'Tous'}
                                </button>
                                {categories.map(cat => (
                                    <button key={cat.slug} onClick={() => setActiveCategory(activeCategory === cat.slug ? '' : cat.slug)} className={`px-4 py-2 text-sm rounded-full transition-all ${activeCategory === cat.slug ? 'bg-accent-purple/20 border border-accent-purple/40 text-white' : 'glass text-gray-300 hover:text-white'}`}>
                                        {getCatName(cat)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </ScrollReveal>
                </div>
            </section>

            <SectionDivider />

            {/* Posts grid */}
            <section className="relative section-padding bg-navy-900/50 overflow-hidden">
                <Floating3DShapes variant="pricing" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true} perspective={true}>
                        <SectionHeader badge={d.articlesBadge} title={d.articlesTitle} subtitle="" />
                    </ScrollReveal>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="glass-card overflow-hidden animate-pulse">
                                    <div className="h-48 bg-white/5" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-3 bg-white/5 rounded w-1/3" />
                                        <div className="h-5 bg-white/5 rounded" />
                                        <div className="h-5 bg-white/5 rounded w-4/5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 mt-12">
                            <div className="text-5xl mb-4">📝</div>
                            <p>{locale === 'ar' ? 'لا توجد مقالات بعد.' : locale === 'en' ? 'No articles yet.' : 'Aucun article pour le moment.'}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {posts.map((post, i) => (
                                <ScrollReveal key={post.id} delay={i * 0.08} blur={true} scale={true} rotate={true}>
                                    <Tilt3D intensity={8} glare={true} borderGlow={true} scale={1.03}>
                                        <article className="glass-card overflow-hidden h-full flex flex-col group">
                                            <div
                                                className="h-48 bg-gradient-to-br from-accent-purple/15 via-accent-blue/10 to-accent-cyan/15 flex items-end p-4"
                                                style={post.featuredImage ? { backgroundImage: `url(${post.featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                                            >
                                                {post.category && (
                                                    <span className="px-3 py-1 rounded-full bg-accent-purple/80 text-white text-xs font-medium backdrop-blur-sm" style={{ transform: 'translateZ(15px)' }}>
                                                        {getCatName(post.category)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                                                    <span>•</span>
                                                    <span>{post.readTime} min</span>
                                                </div>
                                                <h2 className="text-lg font-semibold text-white font-heading mb-3 group-hover:text-accent-purple transition-colors leading-snug" style={{ transform: 'translateZ(10px)' }}>
                                                    {getTitle(post)}
                                                </h2>
                                                {getExcerpt(post) && (
                                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{getExcerpt(post)}</p>
                                                )}
                                                <Link href={`${prefix}/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-accent-purple text-sm font-medium group-hover:gap-2.5 transition-all mt-auto" style={{ transform: 'translateZ(12px)' }}>
                                                    {d.readArticle}
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </article>
                                    </Tilt3D>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <SectionDivider />

            <section className="relative section-padding bg-navy-950 overflow-hidden">
                <Floating3DShapes variant="methodology" />
                <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                    <ScrollReveal blur={true}>
                        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 lg:p-12 text-center">
                            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-6">{d.resourcesBadge}</span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-6" dangerouslySetInnerHTML={{ __html: d.resourcesTitle }} />
                            <MoneyHoverEffect>
                                <Link href={`${prefix}/contact`} className="btn-primary money-hover-btn">
                                    {d.subscribeBtn}
                                    <span className="btn-arrow"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                                </Link>
                            </MoneyHoverEffect>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <CTASection dict={{ title: d.ctaTitle, subtitle: d.ctaSubtitle, cta: locale === 'ar' ? 'تواصلوا معنا' : locale === 'en' ? 'Contact us' : 'Contactez-nous', ctaSecondary: 'WhatsApp' }} locale={locale} />
        </>
    );
}
