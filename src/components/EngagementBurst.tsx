'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── SVG ICON SHAPES ─── */
const ICONS = {
    heart: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
    star: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    bolt: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>,
    chart: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" /></svg>,
    fire: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" /></svg>,
    diamond: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M19 3H5L2 9l10 12L22 9l-3-6zM12 17.77L5.07 9.5h13.86L12 17.77z" /></svg>,
    zap: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    target: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    crown: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" /></svg>,
    rocket: (c: string) => <svg viewBox="0 0 24 24" fill={c}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>,
};

type IconKey = keyof typeof ICONS;

/* ─── COLOR PALETTES ─── */
const PALETTES = {
    social: ['#ec4899', '#a855f7', '#8b5cf6', '#6366f1', '#f43f5e', '#e879f9', '#c084fc'],
    websites: ['#8b5cf6', '#06b6d4', '#6366f1', '#3b82f6', '#0ea5e9', '#818cf8', '#22d3ee'],
    results: ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#22d3ee', '#34d399', '#a78bfa'],
    stats: ['#f59e0b', '#10b981', '#8b5cf6', '#06b6d4', '#ec4899', '#22d3ee', '#fbbf24'],
};

const ICON_SETS: Record<string, IconKey[]> = {
    social: ['heart', 'star', 'fire', 'diamond', 'crown', 'zap'],
    websites: ['bolt', 'chart', 'rocket', 'target', 'star', 'zap'],
    results: ['chart', 'crown', 'diamond', 'target', 'star', 'rocket'],
    stats: ['diamond', 'chart', 'crown', 'bolt', 'star', 'fire'],
};

/* ─── PARTICLE TYPES ─── */
interface GlowParticle {
    id: number;
    type: 'icon' | 'orb' | 'ring';
    icon?: IconKey;
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

interface EngagementBurstProps {
    count?: number;
    variant?: 'social' | 'websites' | 'results' | 'stats';
    repeat?: boolean;
    repeatInterval?: number;
    spread?: 'full' | 'sides' | 'center';
}

export default function EngagementBurst({
    count = 18,
    variant = 'social',
    repeat = true,
    repeatInterval = 2500,
    spread = 'full',
}: EngagementBurstProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.15 });
    const [particles, setParticles] = useState<GlowParticle[]>([]);
    const idCounter = useRef(0);

    const palette = PALETTES[variant] || PALETTES.social;
    const iconSet = ICON_SETS[variant] || ICON_SETS.social;

    const getX = (): number => {
        if (spread === 'sides') return Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
        if (spread === 'center') return 25 + Math.random() * 50;
        return 5 + Math.random() * 90;
    };

    const spawnBurst = () => {
        const newParticles: GlowParticle[] = [];
        for (let i = 0; i < count; i++) {
            idCounter.current += 1;
            const types: GlowParticle['type'][] = ['icon', 'orb', 'orb', 'ring'];
            const type = types[Math.floor(Math.random() * types.length)];
            newParticles.push({
                id: idCounter.current,
                type,
                icon: type === 'icon' ? iconSet[Math.floor(Math.random() * iconSet.length)] : undefined,
                color: palette[Math.floor(Math.random() * palette.length)],
                x: getX(),
                y: 75 + Math.random() * 25,
                size: type === 'orb' ? 6 + Math.random() * 18 : type === 'ring' ? 16 + Math.random() * 24 : 14 + Math.random() * 14,
                delay: Math.random() * 1.8,
                duration: 3 + Math.random() * 3,
                drift: (Math.random() - 0.5) * 100,
                opacity: 0.6 + Math.random() * 0.4,
                blur: type === 'orb' ? 1 + Math.random() * 4 : 0,
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
        if (!repeat) return;
        const interval = setInterval(spawnBurst, repeatInterval);
        return () => clearInterval(interval);
    }, [isInView]); // eslint-disable-line

    return (
        <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            opacity: 0,
                            scale: 0,
                            rotate: p.rotation,
                        }}
                        animate={{
                            top: `${p.y - 55 - Math.random() * 30}%`,
                            left: `calc(${p.x}% + ${p.drift}px)`,
                            opacity: [0, p.opacity, p.opacity * 0.8, p.opacity * 0.3, 0],
                            scale: [0, 1.2, 1, 0.7, 0],
                            rotate: p.rotation + (Math.random() > 0.5 ? 180 : -180),
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            ease: [0.22, 0.61, 0.36, 1],
                        }}
                        className="absolute"
                        style={{ width: p.size, height: p.size }}
                    >
                        {p.type === 'icon' && p.icon && (
                            <div
                                className="w-full h-full"
                                style={{
                                    filter: `drop-shadow(0 0 ${p.size * 0.6}px ${p.color}90)`,
                                    opacity: p.opacity,
                                }}
                            >
                                {ICONS[p.icon](p.color)}
                            </div>
                        )}
                        {p.type === 'orb' && (
                            <div
                                className="w-full h-full rounded-full"
                                style={{
                                    background: `radial-gradient(circle, ${p.color}cc, ${p.color}40, transparent)`,
                                    filter: `blur(${p.blur}px)`,
                                    boxShadow: `0 0 ${p.size}px ${p.color}60, 0 0 ${p.size * 2}px ${p.color}25`,
                                }}
                            />
                        )}
                        {p.type === 'ring' && (
                            <div
                                className="w-full h-full rounded-full"
                                style={{
                                    border: `2px solid ${p.color}70`,
                                    boxShadow: `0 0 ${p.size * 0.6}px ${p.color}50, inset 0 0 ${p.size * 0.3}px ${p.color}20`,
                                }}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

/* ─── ENGAGEMENT METRICS DIVIDER ─── */
export function EngagementDivider({ locale }: { locale: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const metrics = [
        { icon: 'heart' as IconKey, value: '12.8K', label: locale === 'ar' ? 'إعجابات' : locale === 'en' ? 'Likes' : 'Likes', color: '#ec4899' },
        { icon: 'fire' as IconKey, value: '3.2K', label: locale === 'ar' ? 'تعليقات' : locale === 'en' ? 'Comments' : 'Commentaires', color: '#a855f7' },
        { icon: 'zap' as IconKey, value: '5.6K', label: locale === 'ar' ? 'مشاركات' : locale === 'en' ? 'Shares' : 'Partages', color: '#06b6d4' },
        { icon: 'chart' as IconKey, value: '89K', label: locale === 'ar' ? 'مشاهدات' : locale === 'en' ? 'Views' : 'Vues', color: '#10b981' },
        { icon: 'target' as IconKey, value: '+340%', label: locale === 'ar' ? 'تفاعل' : locale === 'en' ? 'Engagement' : 'Engagement', color: '#f59e0b' },
    ];

    return (
        <div ref={ref} className="relative py-20 overflow-hidden">
            <EngagementBurst variant="social" count={14} repeatInterval={2500} spread="full" />

            {/* Glow lines */}
            <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={isInView ? { scaleX: 1, opacity: 1 } : {}} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 20%, rgba(236,72,153,0.4) 50%, rgba(6,182,212,0.3) 80%, transparent 100%)' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                    {metrics.map((m, i) => (
                        <motion.div key={m.label} initial={{ opacity: 0, y: 40, scale: 0.85 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.7, type: 'spring', stiffness: 180 }}
                            className="group relative">
                            <div className="glass-card p-6 text-center hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                                style={{ '--glow-color': m.color, boxShadow: `0 0 0 0 transparent` } as React.CSSProperties}
                                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 40px ${m.color}20, 0 0 80px ${m.color}08`)}
                                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 transparent`)}>

                                <motion.div whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }} className="w-8 h-8 mx-auto mb-3" style={{ filter: `drop-shadow(0 0 12px ${m.color}60)` }}>
                                    {ICONS[m.icon](m.color)}
                                </motion.div>
                                <div className="text-xl font-bold font-heading mb-0.5" style={{ color: m.color }}>{m.value}</div>
                                <div className="text-[11px] text-gray-400 uppercase tracking-wider">{m.label}</div>

                                {/* Ambient glow behind card */}
                                <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                                    style={{ background: `radial-gradient(circle, ${m.color}08, transparent 70%)` }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── FLOATING ENGAGEMENT BAR ─── */
export function FloatingEngagementBar() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const reactions: { icon: IconKey; count: string; color: string; delay: number }[] = [
        { icon: 'heart', count: '2.4K', color: '#ec4899', delay: 0 },
        { icon: 'fire', count: '847', color: '#f59e0b', delay: 0.1 },
        { icon: 'star', count: '1.2K', color: '#a855f7', delay: 0.2 },
        { icon: 'bolt', count: '563', color: '#06b6d4', delay: 0.3 },
        { icon: 'crown', count: '918', color: '#10b981', delay: 0.4 },
    ];

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-5 py-8 mt-8">
            {reactions.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: r.delay + 0.3, duration: 0.5, type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.08] hover:border-white/[0.2] transition-all duration-400 cursor-default group hover:-translate-y-1"
                    style={{ background: `linear-gradient(135deg, ${r.color}08, ${r.color}03)` }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 30px ${r.color}20`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                    <motion.div whileHover={{ scale: 1.3, rotate: [0, -12, 12, 0] }} transition={{ type: 'spring' }}
                        className="w-5 h-5" style={{ filter: `drop-shadow(0 0 8px ${r.color}80)` }}>
                        {ICONS[r.icon](r.color)}
                    </motion.div>
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{r.count}</span>
                </motion.div>
            ))}
        </motion.div>
    );
}
