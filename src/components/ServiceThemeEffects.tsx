'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── THEMED SVG ICONS PER SERVICE ─── */

// SEO: graphs, search, rankings, traffic arrows
const SEO_ICONS = {
    graph: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></svg>,
    search: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    trendUp: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>,
    bar: (c: string) => <svg viewBox="0 0 24 24" fill={c} opacity="0.8"><rect x="2" y="13" width="4" height="9" rx="1" /><rect x="8" y="9" width="4" height="13" rx="1" /><rect x="14" y="5" width="4" height="17" rx="1" /><rect x="20" y="2" width="4" height="20" rx="1" /></svg>,
    link: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    globe: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
};

// Social Media: hearts, comments, shares, followers
const SOCIAL_ICONS = {
    heart: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
    comment: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    share: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
    users: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    bell: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    play: (c: string) => <svg viewBox="0 0 24 24" fill={c}><polygon points="5 3 19 12 5 21 5 3" /></svg>,
};

// Ads: money, target, click, conversion funnel
const ADS_ICONS = {
    target: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    cursor: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M5 3l14 7-6 2-2 6z" /><path d="M14 14l5 5" stroke={c} strokeWidth="2" /></svg>,
    dollar: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    funnel: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    zap: (c: string) => <svg viewBox="0 0 24 24" fill={c}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    pieChart: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>,
};

// Design: pen, palette, layers, shapes
const DESIGN_ICONS = {
    pen: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
    palette: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="13.5" cy="6.5" r="0.5" fill={c} /><circle cx="17.5" cy="10.5" r="0.5" fill={c} /><circle cx="8.5" cy="7.5" r="0.5" fill={c} /><circle cx="6.5" cy="12.5" r="0.5" fill={c} /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
    layers: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    star: (c: string) => <svg viewBox="0 0 24 24" fill={c}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    hexagon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
    diamond: (c: string) => <svg viewBox="0 0 24 24" fill={c} opacity="0.7"><path d="M6 3h12l4 6-10 12L2 9z" /></svg>,
};

// Web: code, layout, monitor, mobile
const WEB_ICONS = {
    code: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    layout: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
    monitor: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    smartphone: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    server: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
    rocket: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
};

// Photography: camera, aperture, image, flash
const PHOTO_ICONS = {
    camera: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    aperture: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="14.31" y1="8" x2="20.05" y2="17.94" /><line x1="9.69" y1="8" x2="21.17" y2="8" /><line x1="7.38" y1="12" x2="13.12" y2="2.06" /><line x1="9.69" y1="16" x2="3.95" y2="6.06" /><line x1="14.31" y1="16" x2="2.83" y2="16" /><line x1="16.62" y1="12" x2="10.88" y2="21.94" /></svg>,
    image: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    flash: (c: string) => <svg viewBox="0 0 24 24" fill={c}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    eye: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    focus: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M2 12h3m14 0h3M12 2v3m0 14v3" /></svg>,
};

// Events: calendar, mic, ticket, celebration
const EVENT_ICONS = {
    calendar: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    mic: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
    sparkle: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" /></svg>,
    video: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
    flag: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>,
    gift: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>,
};

/* ─── THEME CONFIGURATIONS ─── */
interface ThemeConfig {
    icons: Record<string, (c: string) => React.JSX.Element>;
    palette: string[];
    orbColors: string[];
}

const SERVICE_THEMES: Record<string, ThemeConfig> = {
    'referencement-naturel': {
        icons: SEO_ICONS,
        palette: ['#10b981', '#06b6d4', '#22d3ee', '#34d399', '#2dd4bf', '#14b8a6'],
        orbColors: ['#10b98180', '#06b6d460', '#22d3ee50'],
    },
    'reseaux-sociaux': {
        icons: SOCIAL_ICONS,
        palette: ['#ec4899', '#a855f7', '#f43f5e', '#e879f9', '#fb7185', '#c084fc'],
        orbColors: ['#ec489980', '#a855f760', '#f43f5e50'],
    },
    'publicite-en-ligne': {
        icons: ADS_ICONS,
        palette: ['#f59e0b', '#ef4444', '#f97316', '#fbbf24', '#fb923c', '#facc15'],
        orbColors: ['#f59e0b80', '#ef444460', '#f9731650'],
    },
    'design-graphique': {
        icons: DESIGN_ICONS,
        palette: ['#8b5cf6', '#ec4899', '#a855f7', '#c084fc', '#e879f9', '#818cf8'],
        orbColors: ['#8b5cf680', '#ec489960', '#a855f750'],
    },
    'creation-sites-web': {
        icons: WEB_ICONS,
        palette: ['#3b82f6', '#6366f1', '#8b5cf6', '#0ea5e9', '#818cf8', '#06b6d4'],
        orbColors: ['#3b82f680', '#6366f160', '#8b5cf650'],
    },
    photographie: {
        icons: PHOTO_ICONS,
        palette: ['#f59e0b', '#d97706', '#fbbf24', '#78716c', '#a8a29e', '#facc15'],
        orbColors: ['#f59e0b80', '#d9770660', '#fbbf2450'],
    },
    'gestion-evenements': {
        icons: EVENT_ICONS,
        palette: ['#ec4899', '#f59e0b', '#8b5cf6', '#f43f5e', '#fbbf24', '#a855f7'],
        orbColors: ['#ec489980', '#f59e0b60', '#8b5cf650'],
    },
};

/* ─── DEFAULT THEME ─── */
const DEFAULT_THEME: ThemeConfig = {
    icons: SEO_ICONS,
    palette: ['#8b5cf6', '#06b6d4', '#10b981', '#ec4899', '#f59e0b', '#6366f1'],
    orbColors: ['#8b5cf680', '#06b6d460', '#10b98150'],
};

/* ─── PARTICLE ─── */
interface Particle {
    id: number;
    type: 'icon' | 'orb' | 'ring';
    iconKey?: string;
    color: string;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    drift: number;
    opacity: number;
    blur: number;
    rotation: number;
}

/* ─── MAIN COMPONENT ─── */
export default function ServiceThemeEffects({ slug, count = 14, repeatInterval = 2800 }: {
    slug: string; count?: number; repeatInterval?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.1 });
    const [particles, setParticles] = useState<Particle[]>([]);
    const idCounter = useRef(0);

    const theme = SERVICE_THEMES[slug] || DEFAULT_THEME;
    const iconKeys = useMemo(() => Object.keys(theme.icons), [slug]); // eslint-disable-line

    const spawnBurst = () => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            idCounter.current += 1;
            const types: Particle['type'][] = ['icon', 'icon', 'orb', 'ring'];
            const type = types[Math.floor(Math.random() * types.length)];
            newParticles.push({
                id: idCounter.current,
                type,
                iconKey: type === 'icon' ? iconKeys[Math.floor(Math.random() * iconKeys.length)] : undefined,
                color: theme.palette[Math.floor(Math.random() * theme.palette.length)],
                x: 5 + Math.random() * 90,
                y: 70 + Math.random() * 30,
                size: type === 'orb' ? 8 + Math.random() * 16 : type === 'ring' ? 18 + Math.random() * 20 : 16 + Math.random() * 14,
                delay: Math.random() * 2,
                duration: 3 + Math.random() * 3,
                drift: (Math.random() - 0.5) * 100,
                opacity: 0.5 + Math.random() * 0.5,
                blur: type === 'orb' ? 1 + Math.random() * 3 : 0,
                rotation: Math.random() * 360,
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 7000);
    };

    useEffect(() => {
        if (!isInView) return;
        spawnBurst();
        const interval = setInterval(spawnBurst, repeatInterval);
        return () => clearInterval(interval);
    }, [isInView]); // eslint-disable-line

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iconFns = theme.icons as Record<string, (c: string) => any>;

    return (
        <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0, scale: 0, rotate: p.rotation }}
                        animate={{
                            top: `${p.y - 60 - Math.random() * 25}%`,
                            left: `calc(${p.x}% + ${p.drift}px)`,
                            opacity: [0, p.opacity, p.opacity * 0.8, p.opacity * 0.3, 0],
                            scale: [0, 1.3, 1, 0.7, 0],
                            rotate: p.rotation + (Math.random() > 0.5 ? 120 : -120),
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: p.duration, delay: p.delay, ease: [0.22, 0.61, 0.36, 1] }}
                        className="absolute"
                        style={{ width: p.size, height: p.size }}
                    >
                        {p.type === 'icon' && p.iconKey && iconFns[p.iconKey] && (
                            <div className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${p.size * 0.5}px ${p.color}80)`, opacity: p.opacity }}>
                                {iconFns[p.iconKey](p.color)}
                            </div>
                        )}
                        {p.type === 'orb' && (
                            <div className="w-full h-full rounded-full" style={{
                                background: `radial-gradient(circle, ${p.color}bb, ${p.color}30, transparent)`,
                                filter: `blur(${p.blur}px)`,
                                boxShadow: `0 0 ${p.size}px ${p.color}50, 0 0 ${p.size * 2}px ${p.color}20`,
                            }} />
                        )}
                        {p.type === 'ring' && (
                            <div className="w-full h-full rounded-full" style={{
                                border: `1.5px solid ${p.color}60`,
                                boxShadow: `0 0 ${p.size * 0.5}px ${p.color}40, inset 0 0 ${p.size * 0.3}px ${p.color}15`,
                            }} />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
