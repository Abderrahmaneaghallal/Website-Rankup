'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

/* ─── TYPES ─── */
interface PortfolioData {
    title: string; excerpt: string; clientName: string; industry: string;
    featuredImage: string | null; imageAlt: string; results: string[]; tags: string[];
    slug: string; galleryImages: string;
}
interface WebsiteItem {
    id: string; title: string; category: string; url: string; screenshotUrl: string | null;
    gradient: string; accentColor: string; descriptionFr: string; descriptionEn: string; descriptionAr: string;
    statTraffic: string; statConversion: string; statSpeed: string; mockupSections: string;
}
interface SocialDesign {
    id: string; title: string; type: string; imageUrl: string | null;
    color: string; ratio: string; clientName: string;
}
interface VideoItem {
    id: string; title: string; titleFr: string; titleEn: string; titleAr: string;
    platform: string; videoUrl: string; thumbnailUrl: string | null;
    descriptionFr: string; descriptionEn: string; descriptionAr: string;
    clientName: string; category: string;
}

/* ─── WEBSITE BROWSER MOCKUP ─── */
function WebsiteMockup({ site, locale }: { site: WebsiteItem; locale: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    let sections: string[] = [];
    try { sections = JSON.parse(site.mockupSections); } catch { sections = ['hero', 'services', 'contact']; }

    const desc = locale === 'en' ? site.descriptionEn || site.descriptionFr
        : locale === 'ar' ? site.descriptionAr || site.descriptionFr : site.descriptionFr;

    const startScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        let pos = 0;
        const max = el.scrollHeight - el.clientHeight;
        const speed = 0.75;
        const animate = () => { pos += speed; if (pos >= max) pos = 0; el.scrollTop = pos; animationRef.current = requestAnimationFrame(animate); };
        animationRef.current = requestAnimationFrame(animate);
    }, []);
    const stopScroll = useCallback(() => { cancelAnimationFrame(animationRef.current); }, []);

    useEffect(() => {
        if (isHovered) startScroll(); else stopScroll();
        return () => stopScroll();
    }, [isHovered, startScroll, stopScroll]);

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            className="group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
                            <span className="truncate">{site.url || site.title}</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div ref={scrollRef} className="h-[350px] md:h-[420px] overflow-hidden relative" style={{ scrollBehavior: 'auto' }}>
                    {site.screenshotUrl ? (
                        <img src={site.screenshotUrl} alt={site.title} className="w-full" style={{ minHeight: '1200px', objectFit: 'cover', objectPosition: 'top' }} />
                    ) : (
                        <div className="min-h-[1600px]">
                            <div className={`h-[380px] bg-gradient-to-br ${site.gradient} flex items-center justify-center relative`}>
                                <div className="text-center px-8 relative z-10">
                                    <div className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">{site.category}</div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading">{site.title}</h3>
                                    <p className="text-white/70 text-sm max-w-md mx-auto">{desc}</p>
                                </div>
                            </div>
                            {sections.slice(1).map((section, i) => (
                                <div key={section} className="border-t border-white/[0.04]">
                                    <div className={`px-8 py-12 ${i % 2 === 0 ? 'bg-navy-950/40' : 'bg-navy-900/30'}`}>
                                        <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: site.accentColor }}>{section}</div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[1, 2, 3].map(j => (
                                                <div key={j} className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-4 h-24">
                                                    <div className="w-8 h-8 rounded-lg mb-2" style={{ backgroundColor: `${site.accentColor}20` }} />
                                                    <div className="h-2 rounded bg-white/[0.06] w-full mb-1.5" />
                                                    <div className="h-2 rounded bg-white/[0.04] w-2/3" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-50'}`} />
                    <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/40 transition-all duration-300 ${isHovered ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
                        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        </motion.div>
                        {locale === 'ar' ? 'مرر للاستكشاف' : locale === 'en' ? 'Hover to explore' : 'Survolez pour explorer'}
                    </div>
                </div>

                {/* Stats Bar */}
                {(site.statTraffic || site.statConversion || site.statSpeed) && (
                    <div className="flex items-center justify-between px-6 py-4 bg-navy-950/60 border-t border-white/[0.06]">
                        <div className="flex gap-6">
                            {site.statTraffic && <div className="text-center"><div className="text-xs font-bold" style={{ color: site.accentColor }}>{site.statTraffic}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider">traffic</div></div>}
                            {site.statConversion && <div className="text-center"><div className="text-xs font-bold" style={{ color: site.accentColor }}>{site.statConversion}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider">conversion</div></div>}
                            {site.statSpeed && <div className="text-center"><div className="text-xs font-bold" style={{ color: site.accentColor }}>{site.statSpeed}</div><div className="text-[10px] text-gray-500 uppercase tracking-wider">speed</div></div>}
                        </div>
                        {site.url && (
                            <a href={`https://${site.url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                                {locale === 'ar' ? 'زيارة الموقع' : locale === 'en' ? 'Visit site' : 'Visiter le site'}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ─── SOCIAL MEDIA CARD ─── */
function SocialMediaCard({ design, index }: { design: SocialDesign; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const isStory = design.type === 'story';

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 }} className={`group relative ${isStory ? 'row-span-2' : ''}`}>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-navy-900/40 hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className={`relative ${design.ratio} overflow-hidden`}>
                    {design.imageUrl ? (
                        <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${design.color} flex flex-col items-center justify-center p-6 text-center`}>
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-4 flex items-center justify-center text-white font-bold text-lg">{design.title.charAt(0)}</div>
                            <div className="space-y-2 w-full max-w-[80%]">
                                <div className="h-3 rounded-full bg-white/30 w-3/4 mx-auto" />
                                <div className="h-2 rounded-full bg-white/20 w-1/2 mx-auto" />
                            </div>
                        </div>
                    )}
                    {isStory && (
                        <div className="absolute top-3 left-3 right-3 flex gap-1">
                            {[1, 2, 3].map(i => <div key={i} className={`flex-1 h-0.5 rounded-full ${i === 1 ? 'bg-white/80' : 'bg-white/20'}`} />)}
                        </div>
                    )}
                    {design.type === 'instagram' && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                            <div className="flex gap-3">{['♥', '💬', '📤'].map(icon => <span key={icon} className="text-white/80 text-sm">{icon}</span>)}</div>
                        </div>
                    )}
                </div>
                <div className="px-4 py-3">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${design.type === 'instagram' ? 'bg-pink-500/10 text-pink-400' :
                            design.type === 'story' ? 'bg-orange-500/10 text-orange-400' :
                                design.type === 'carousel' ? 'bg-purple-500/10 text-purple-400' :
                                    design.type === 'tiktok' ? 'bg-cyan-500/10 text-cyan-400' :
                                        'bg-blue-500/10 text-blue-400'
                        }`}>{design.type}</span>
                    <p className="text-xs text-gray-400 truncate mt-1">{design.title}</p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── VIDEO CARD ─── */
function VideoCard({ video, locale, index }: { video: VideoItem; locale: string; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const title = locale === 'en' ? video.titleEn || video.title : locale === 'ar' ? video.titleAr || video.title : video.titleFr || video.title;

    const getEmbedUrl = (url: string, platform: string): string | null => {
        if (platform === 'youtube') {
            const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]+)/);
            return match ? `https://www.youtube.com/embed/${match[1]}` : null;
        }
        if (platform === 'vimeo') {
            const match = url.match(/vimeo\.com\/(\d+)/);
            return match ? `https://player.vimeo.com/video/${match[1]}` : null;
        }
        return null;
    };
    const embedUrl = getEmbedUrl(video.videoUrl, video.platform);
    const platformColors: Record<string, string> = { youtube: '#ef4444', vimeo: '#06b6d4', tiktok: '#a78bfa', instagram: '#ec4899' };

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.1 }}>
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-navy-900/40">
                {embedUrl ? (
                    <div className="aspect-video"><iframe src={embedUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={title} /></div>
                ) : video.thumbnailUrl ? (
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block aspect-video relative group/vid">
                        <img src={video.thumbnailUrl} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/vid:bg-black/50 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>
                    </a>
                ) : (
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-gradient-to-br from-navy-900 to-navy-950 flex items-center justify-center">
                        <div className="text-center"><span className="text-4xl">🎬</span></div>
                    </a>
                )}
                <div className="p-5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full" style={{ background: `${platformColors[video.platform] || '#888'}15`, color: platformColors[video.platform] || '#888' }}>{video.platform}</span>
                    <h3 className="text-white font-semibold text-sm mt-2">{title}</h3>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── GALLERY LIGHTBOX ─── */
function GallerySection({ images, locale }: { images: string[]; locale: string }) {
    const [selected, setSelected] = useState<string | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <>
            <section ref={ref} className="relative py-16 bg-navy-950 overflow-hidden">
                <div className="max-w-5xl mx-auto px-8 lg:px-12">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-2xl">📸</span>
                        <h2 className="text-xl font-bold text-white font-heading">
                            {locale === 'ar' ? 'لقطات من النتائج' : locale === 'en' ? 'Results Screenshots' : 'Captures des résultats'}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((img, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group cursor-pointer" onClick={() => setSelected(img)}>
                                <div className="rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
                                    <img src={img} alt={`Result ${i + 1}`} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selected && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8 cursor-pointer" onClick={() => setSelected(null)}>
                    <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">✕</button>
                    <img src={selected} alt="Full view" className="max-w-full max-h-full rounded-xl object-contain" />
                </div>
            )}
        </>
    );
}

/* ─── MAIN CLIENT COMPONENT ─── */
export default function PortfolioDetailClient({ item, locale }: { item: PortfolioData; locale: string }) {
    const [websites, setWebsites] = useState<WebsiteItem[]>([]);
    const [socialDesigns, setSocialDesigns] = useState<SocialDesign[]>([]);
    const [videos, setVideos] = useState<VideoItem[]>([]);

    // Fetch THIS project's associated content
    useEffect(() => {
        fetch(`/api/portfolio/${item.slug}`)
            .then(r => r.json())
            .then(data => {
                if (data.websites) setWebsites(data.websites);
                if (data.socialDesigns) setSocialDesigns(data.socialDesigns);
                if (data.videos) setVideos(data.videos);
            })
            .catch(() => { });
    }, [item.slug]);

    const l = locale as 'fr' | 'en' | 'ar';
    const t = (fr: string, en: string, ar: string) => l === 'ar' ? ar : l === 'en' ? en : fr;

    let galleryImages: string[] = [];
    try { galleryImages = JSON.parse(item.galleryImages || '[]'); } catch { /* */ }

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-12">
                    <Link href={`/${l}/portfolio`} className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-accent-purple transition-colors mb-8">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        {t('Retour au Portfolio', 'Back to Portfolio', 'العودة إلى المحفظة')}
                    </Link>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {item.industry && <span className="px-3 py-1 rounded-full bg-accent-purple/15 text-accent-purple text-xs font-semibold uppercase tracking-wider border border-accent-purple/20">{item.industry}</span>}
                        {item.tags.map(tag => <span key={tag} className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs">{tag}</span>)}
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-4">{item.title}</h1>
                    {item.clientName && <p className="text-accent-cyan text-lg font-medium mb-6">{item.clientName}</p>}
                    {item.excerpt && <p className="text-gray-400 text-lg leading-relaxed">{item.excerpt}</p>}
                </div>
            </section>

            {/* Featured Image */}
            {item.featuredImage && (
                <div className="max-w-5xl mx-auto px-8 lg:px-12 mb-12">
                    <div className="rounded-2xl overflow-hidden aspect-video">
                        <img src={item.featuredImage} alt={item.imageAlt || item.title} className="w-full h-full object-cover" />
                    </div>
                </div>
            )}

            {/* Results */}
            {item.results.length > 0 && (
                <section className="relative py-12 bg-navy-950">
                    <div className="max-w-5xl mx-auto px-8 lg:px-12">
                        <h2 className="text-xl font-bold text-white font-heading mb-8">{t('Résultats', 'Results', 'النتائج')}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {item.results.map(r => (
                                <div key={r} className="glass-card p-6 text-center"><div className="text-2xl font-bold gradient-text font-heading">{r}</div></div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Website Showcase */}
            {websites.length > 0 && (
                <section className="relative py-16 bg-navy-950 overflow-hidden">
                    <div className="max-w-5xl mx-auto px-8 lg:px-12">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-2xl">🌐</span>
                            <h2 className="text-xl font-bold text-white font-heading">{t('Site Web Réalisé', 'Website Created', 'الموقع الإلكتروني المنجز')}</h2>
                        </div>
                        <div className={`grid gap-8 ${websites.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
                            {websites.map(site => <WebsiteMockup key={site.id} site={site} locale={locale} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* Social Media Designs */}
            {socialDesigns.length > 0 && (
                <section className="relative py-16 bg-navy-950 overflow-hidden">
                    <div className="max-w-5xl mx-auto px-8 lg:px-12">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-2xl">🎨</span>
                            <h2 className="text-xl font-bold text-white font-heading">{t('Posts & Reels Social Media', 'Social Media Posts & Reels', 'منشورات وريلز وسائل التواصل')}</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
                            {socialDesigns.map((d, i) => <SocialMediaCard key={d.id} design={d} index={i} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* Videos */}
            {videos.length > 0 && (
                <section className="relative py-16 bg-navy-950 overflow-hidden">
                    <div className="max-w-5xl mx-auto px-8 lg:px-12">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-2xl">🎬</span>
                            <h2 className="text-xl font-bold text-white font-heading">{t('Vidéos Réalisées', 'Videos Produced', 'الفيديوهات المنجزة')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {videos.map((v, i) => <VideoCard key={v.id} video={v} locale={locale} index={i} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Screenshots */}
            {galleryImages.length > 0 && <GallerySection images={galleryImages} locale={locale} />}

            {/* Back / CTA */}
            <section className="py-16 bg-navy-950">
                <div className="max-w-5xl mx-auto px-8 lg:px-12 flex flex-wrap gap-4 justify-center">
                    <Link href={`/${l}/portfolio`} className="btn-secondary">{t('Plus de projets', 'More Projects', 'المزيد من المشاريع')}</Link>
                    <Link href={`/${l}/contact`} className="btn-primary">
                        {t('Démarrer votre projet', 'Start your project', 'ابدأ مشروعك')}
                        <span className="btn-arrow"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                    </Link>
                </div>
            </section>
        </>
    );
}
