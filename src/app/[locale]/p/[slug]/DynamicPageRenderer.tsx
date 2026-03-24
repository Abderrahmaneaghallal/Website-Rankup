'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { SectionDivider } from '@/components/ScrollEffects';
import AnimatedCounter from '@/components/AnimatedCounter';
import FAQAccordion from '@/components/FAQAccordion';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface PageSection {
    id: string;
    type: string;
    titleFr: string;
    titleEn: string;
    titleAr: string;
    contentFr: string;
    contentEn: string;
    contentAr: string;
    settings: string;
    sortOrder: number;
}

interface PageData {
    id: string;
    slug: string;
    titleFr: string;
    titleEn: string;
    titleAr: string;
    template: string;
    sections: PageSection[];
}

function t(section: PageSection, field: 'title' | 'content', locale: string): string {
    const suffix = locale === 'ar' ? 'Ar' : locale === 'en' ? 'En' : 'Fr';
    const key = `${field}${suffix}` as keyof PageSection;
    return (section[key] as string) || (section[`${field}Fr` as keyof PageSection] as string) || '';
}

function parseJSON(str: string): any {
    try { return JSON.parse(str); } catch { return null; }
}

function getPageTitle(page: PageData, locale: string): string {
    const suffix = locale === 'ar' ? 'Ar' : locale === 'en' ? 'En' : 'Fr';
    const key = `title${suffix}` as keyof PageData;
    return (page[key] as string) || page.titleFr || '';
}

// ─── SECTION RENDERERS ─────────────────────────────────────

function HeroSection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);
    const settings = parseJSON(section.settings) || {};

    return (
        <section className="relative pt-32 pb-20 bg-navy-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-cyan/5" />
            <div className="absolute inset-0">
                <div className="grid-pattern" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 text-center">
                <ScrollReveal blur={true} perspective={true}>
                    {settings.badge && (
                        <span className="inline-block px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-cyan/20 text-accent-cyan bg-accent-cyan/5 mb-6">
                            {settings.badge}
                        </span>
                    )}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6">
                        {title}
                        {settings.highlight && <> <span className="gradient-text">{settings.highlight}</span></>}
                    </h1>
                    {content && <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">{content}</p>}
                    {settings.buttonText && (
                        <Link href={settings.buttonLink || '#'} className="btn-primary">
                            {settings.buttonText}
                            <span className="btn-arrow">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    )}
                </ScrollReveal>
            </div>
        </section>
    );
}

function TextSection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);

    return (
        <section className="relative section-padding bg-navy-950 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                <ScrollReveal blur={true}>
                    {title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-8 text-center">
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </h2>
                    )}
                    <div className="max-w-3xl mx-auto text-gray-300 text-base leading-relaxed prose prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
                </ScrollReveal>
            </div>
        </section>
    );
}

function ImageSection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale); // image URL
    const settings = parseJSON(section.settings) || {};

    return (
        <section className="relative section-padding bg-navy-900/50 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                <ScrollReveal blur={true} scale={true}>
                    {title && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading leading-tight mb-8 text-center">
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </h2>
                    )}
                    {content && (
                        <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                            <Image
                                src={content}
                                alt={settings.alt || title || 'Image'}
                                width={settings.width || 1200}
                                height={settings.height || 600}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}
                    {settings.caption && (
                        <p className="text-gray-500 text-sm text-center mt-4">{settings.caption}</p>
                    )}
                </ScrollReveal>
            </div>
        </section>
    );
}

function CTASectionRenderer({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);
    const settings = parseJSON(section.settings) || {};

    return (
        <section className="relative section-padding bg-navy-900/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 via-transparent to-accent-cyan/5" />
            <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-12 text-center">
                <ScrollReveal blur={true} perspective={true}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6">
                        <span dangerouslySetInnerHTML={{ __html: title }} />
                    </h2>
                    {content && <p className="text-gray-400 text-lg leading-relaxed mb-10">{content}</p>}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {settings.buttonText && (
                            <Link href={settings.buttonLink || '/contact'} className="btn-primary">
                                {settings.buttonText}
                                <span className="btn-arrow">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        )}
                        {settings.secondaryText && (
                            <Link href={settings.secondaryLink || '#'} className="btn-secondary">
                                {settings.secondaryText}
                            </Link>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

function FAQSection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);
    const items = parseJSON(content);

    if (!items || !Array.isArray(items)) return null;

    const faqItems = items.map((item: any) => ({
        question: item.q || item.question || '',
        answer: item.a || item.answer || '',
    }));

    return (
        <section className="relative section-padding bg-navy-950 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                {title && (
                    <ScrollReveal blur={true} perspective={true}>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-12 text-center">
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </h2>
                    </ScrollReveal>
                )}
                <div className="max-w-3xl mx-auto">
                    <FAQAccordion items={faqItems} locale={locale} />
                </div>
            </div>
        </section>
    );
}

function StatsSection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);
    const stats = parseJSON(content);

    if (!stats || !Array.isArray(stats)) return null;

    return (
        <section className="relative section-padding bg-navy-900/50 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                {title && (
                    <ScrollReveal blur={true} perspective={true}>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-12 text-center">
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </h2>
                    </ScrollReveal>
                )}
                <div className={`grid grid-cols-2 ${stats.length >= 4 ? 'md:grid-cols-4' : stats.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                    {stats.map((stat: any, i: number) => {
                        const numericValue = parseInt(String(stat.value).replace(/[^0-9]/g, ''), 10);
                        const prefix = String(stat.value).startsWith('+') ? '+' : '';
                        const suffix = String(stat.value).replace(/[0-9+]/g, '');
                        return (
                            <ScrollReveal key={i} delay={i * 0.1} blur={true} scale={true}>
                                <div className="glass-card p-6 text-center">
                                    <AnimatedCounter
                                        value={isNaN(numericValue) ? 0 : numericValue}
                                        prefix={prefix}
                                        suffix={suffix}
                                        className="text-3xl sm:text-4xl font-bold gradient-text font-heading block"
                                    />
                                    <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function GallerySection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);
    const images = parseJSON(content);

    if (!images || !Array.isArray(images)) return null;

    return (
        <section className="relative section-padding bg-navy-950 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                {title && (
                    <ScrollReveal blur={true} perspective={true}>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-12 text-center">
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </h2>
                    </ScrollReveal>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img: any, i: number) => (
                        <ScrollReveal key={i} delay={i * 0.08} blur={true} scale={true}>
                            <div className="rounded-2xl overflow-hidden border border-white/[0.06] aspect-[4/3]">
                                <Image
                                    src={img.src || img.url || ''}
                                    alt={img.alt || `Image ${i + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {img.caption && <p className="text-gray-500 text-sm mt-2 text-center">{img.caption}</p>}
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturesSection({ section, locale }: { section: PageSection; locale: string }) {
    const title = t(section, 'title', locale);
    const content = t(section, 'content', locale);
    const features = parseJSON(content);

    if (!features || !Array.isArray(features)) return null;

    return (
        <section className="relative section-padding bg-navy-900/50 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                {title && (
                    <ScrollReveal blur={true} perspective={true}>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-12 text-center">
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </h2>
                    </ScrollReveal>
                )}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${features.length >= 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
                    {features.map((feature: any, i: number) => (
                        <ScrollReveal key={i} delay={i * 0.1} blur={true} scale={true}>
                            <div className="glass-card p-7 lg:p-8 h-full interactive-card group">
                                {feature.icon && <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>}
                                <h3 className="text-lg font-semibold text-white font-heading mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-[1.8]">{feature.desc || feature.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CustomSection({ section, locale }: { section: PageSection; locale: string }) {
    const content = t(section, 'content', locale);
    return (
        <section className="relative section-padding bg-navy-950 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </section>
    );
}

// ─── MAIN RENDERER ─────────────────────────────────────────

const sectionRenderers: Record<string, React.FC<{ section: PageSection; locale: string }>> = {
    hero: HeroSection,
    text: TextSection,
    image: ImageSection,
    cta: CTASectionRenderer,
    faq: FAQSection,
    stats: StatsSection,
    gallery: GallerySection,
    features: FeaturesSection,
    custom: CustomSection,
};

export default function DynamicPageRenderer({ page, locale }: { page: PageData; locale: string }) {
    const pageTitle = getPageTitle(page, locale);

    return (
        <main>
            {/* If no hero section exists, add a default page header */}
            {!page.sections.some(s => s.type === 'hero') && pageTitle && (
                <section className="relative pt-32 pb-16 bg-navy-950 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-cyan/5" />
                    <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight"
                        >
                            {pageTitle}
                        </motion.h1>
                    </div>
                </section>
            )}

            {/* Render each section */}
            {page.sections.map((section, i) => {
                const Renderer = sectionRenderers[section.type];
                if (!Renderer) return null;
                return (
                    <div key={section.id}>
                        <Renderer section={section} locale={locale} />
                        {i < page.sections.length - 1 && <SectionDivider />}
                    </div>
                );
            })}

            {/* If no sections at all, show a placeholder */}
            {page.sections.length === 0 && (
                <section className="relative section-padding bg-navy-950 overflow-hidden min-h-[50vh] flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl mb-4">📄</div>
                        <p className="text-gray-500">This page is being built.</p>
                    </div>
                </section>
            )}
        </main>
    );
}
