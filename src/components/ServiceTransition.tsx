'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─── COLOR THEMES ─── */
const THEMES: Record<string, { primary: string; secondary: string; accent: string }> = {
    'referencement-naturel': { primary: '#10b981', secondary: '#06b6d4', accent: '#22d3ee' },
    'reseaux-sociaux': { primary: '#ec4899', secondary: '#a855f7', accent: '#f43f5e' },
    'publicite-en-ligne': { primary: '#f59e0b', secondary: '#ef4444', accent: '#f97316' },
    'design-graphique': { primary: '#8b5cf6', secondary: '#ec4899', accent: '#c084fc' },
    'creation-sites-web': { primary: '#3b82f6', secondary: '#6366f1', accent: '#0ea5e9' },
    'photographie': { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
    'gestion-evenements': { primary: '#ec4899', secondary: '#f59e0b', accent: '#8b5cf6' },
};
const DEFAULT = { primary: '#8b5cf6', secondary: '#06b6d4', accent: '#10b981' };

/* ═══════════════════════════════════════════════════
   SEO: Full analytics dashboard micro-scene
   ═══════════════════════════════════════════════════ */
function SEOTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const parallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const bars = [40, 55, 38, 65, 50, 78, 62, 88, 72, 95, 85, 100];
    const kpis = [
        { label: 'CTR', value: '4.8%', trend: '+32%' },
        { label: 'Traffic', value: '12.4K', trend: '+67%' },
        { label: 'Position', value: '#3', trend: '+5' },
    ];

    return (
        <div ref={ref} className="relative py-12 overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${c.primary}40 1px, transparent 1px), linear-gradient(90deg, ${c.primary}40 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            <motion.div style={{ y: parallax }} className="relative max-w-4xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Mini bar chart */}
                    <motion.div className="flex items-end gap-1.5 h-20"
                        initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                        {bars.map((h, i) => (
                            <motion.div key={i} className="w-3 rounded-t-sm"
                                style={{ background: `linear-gradient(to top, ${c.primary}${i > 8 ? 'cc' : '60'}, ${c.secondary}${i > 8 ? 'cc' : '40'})`, boxShadow: i > 8 ? `0 0 10px ${c.primary}40` : 'none' }}
                                initial={{ height: 0 }} animate={iv ? { height: `${h}%` } : {}}
                                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
                        ))}
                    </motion.div>

                    {/* Trend line SVG */}
                    <motion.div className="flex-1 h-16 relative"
                        initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
                        <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                            <motion.path d="M0,55 C30,50 50,45 80,40 C110,35 130,42 160,30 C190,18 210,25 240,15 C260,10 280,12 300,5"
                                fill="none" stroke={`url(#seoLine)`} strokeWidth="2" strokeLinecap="round"
                                initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                filter="url(#gl)" />
                            <motion.path d="M0,55 C30,50 50,45 80,40 C110,35 130,42 160,30 C190,18 210,25 240,15 C260,10 280,12 300,5 L300,60 L0,60Z"
                                fill={`url(#seoArea)`}
                                initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
                                transition={{ delay: 1, duration: 1 }} />
                            {/* Animated dots */}
                            {[[80, 40], [160, 30], [240, 15], [300, 5]].map(([cx, cy], i) => (
                                <motion.g key={i}>
                                    <motion.circle cx={cx} cy={cy} r="3" fill={c.primary}
                                        initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}}
                                        transition={{ delay: 1 + i * 0.2, type: 'spring', stiffness: 300 }} filter="url(#gl)" />
                                    <motion.circle cx={cx} cy={cy} r="8" fill="none" stroke={c.primary} strokeWidth="0.5"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={iv ? { scale: [0, 2.5], opacity: [0.6, 0] } : {}}
                                        transition={{ delay: 1.2 + i * 0.2, duration: 1.5, repeat: Infinity, repeatDelay: 3 }} />
                                </motion.g>
                            ))}
                            <defs>
                                <linearGradient id="seoLine" x1="0%" x2="100%"><stop offset="0%" stopColor={c.primary} /><stop offset="100%" stopColor={c.accent} /></linearGradient>
                                <linearGradient id="seoArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c.primary} stopOpacity="0.15" /><stop offset="100%" stopColor={c.primary} stopOpacity="0" /></linearGradient>
                                <filter id="gl"><feGaussianBlur stdDeviation="2" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                            </defs>
                        </svg>
                    </motion.div>

                    {/* KPI cards */}
                    <div className="flex gap-3">
                        {kpis.map((kpi, i) => (
                            <motion.div key={kpi.label}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={iv ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ delay: 0.8 + i * 0.15, type: 'spring', stiffness: 200 }}
                                className="px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-center min-w-[70px]">
                                <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">{kpi.label}</div>
                                <div className="text-sm font-bold" style={{ color: c.primary }}>{kpi.value}</div>
                                <div className="text-[9px] font-semibold" style={{ color: c.accent }}>↑ {kpi.trend}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Glow line */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${c.primary}30, ${c.secondary}30, transparent)` }}
                initial={{ scaleX: 0 }} animate={iv ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.3 }} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   SOCIAL: Real engagement feed simulation
   ═══════════════════════════════════════════════════ */
function SocialTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });

    const notifications = [
        { icon: '❤️', text: '+248 likes', time: '2m', x: -120 },
        { icon: '💬', text: '32 comments', time: '5m', x: 0 },
        { icon: '📤', text: '89 shares', time: '8m', x: 120 },
    ];

    const pulsePoints = Array.from({ length: 20 }, (_, i) => ({
        x: (i / 19) * 100,
        y: 50 + Math.sin(i * 0.8) * (i % 3 === 0 ? 35 : 15) * (i > 12 ? 1.3 : 0.8),
    }));
    const pulsePath = `M${pulsePoints.map(p => `${p.x},${p.y}`).join(' L')}`;

    return (
        <div ref={ref} className="relative py-14 overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative">
                {/* Pulse line */}
                <svg className="w-full h-24 mb-4" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path d={pulsePath} fill="none" stroke={`url(#soPulse)`} strokeWidth="0.8" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}}
                        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                        filter="url(#soGl)" />
                    <motion.path d={`${pulsePath} L100,100 L0,100Z`} fill={`url(#soFill)`}
                        initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 1 }} />
                    <defs>
                        <linearGradient id="soPulse"><stop offset="0%" stopColor={c.primary} /><stop offset="50%" stopColor={c.accent} /><stop offset="100%" stopColor={c.secondary} /></linearGradient>
                        <linearGradient id="soFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c.primary} stopOpacity="0.1" /><stop offset="100%" stopColor="transparent" /></linearGradient>
                        <filter id="soGl"><feGaussianBlur stdDeviation="1.5" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                </svg>

                {/* Notification cards */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    {notifications.map((n, i) => (
                        <motion.div key={n.text}
                            initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -5 + i * 5 }}
                            animate={iv ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
                            transition={{ delay: 0.6 + i * 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                            whileHover={{ scale: 1.08, y: -4 }}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm group cursor-default"
                            style={{ boxShadow: `0 4px 20px ${c.primary}08` }}>
                            <motion.span className="text-lg"
                                animate={iv ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ delay: 1 + i * 0.3, duration: 0.4 }}>{n.icon}</motion.span>
                            <div>
                                <div className="text-xs font-semibold text-white/80">{n.text}</div>
                                <div className="text-[9px] text-gray-500">{n.time} ago</div>
                            </div>
                            {/* Live dot */}
                            <motion.div className="w-1.5 h-1.5 rounded-full ml-1"
                                style={{ background: c.primary, boxShadow: `0 0 6px ${c.primary}` }}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   ADS: Live ad performance scene — cursor click + donut + revenue
   ═══════════════════════════════════════════════════ */
function AdsTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });

    // Donut chart segments
    const segments = [
        { label: 'Google', pct: 45, color: c.primary },
        { label: 'Meta', pct: 35, color: c.secondary },
        { label: 'TikTok', pct: 20, color: c.accent },
    ];
    const radius = 32;
    const circumference = 2 * Math.PI * radius;

    // Pre-compute cumulative offsets so render is pure (no mutation)
    const segmentData = useMemo(() => {
        let cum = 0;
        return segments.map(seg => {
            const dashLength = (seg.pct / 100) * circumference;
            const dashGap = circumference - dashLength;
            const offset = -(cum / 100) * circumference;
            cum += seg.pct;
            return { ...seg, dashLength, dashGap, offset };
        });
    }, [circumference]);

    // Floating bid tags
    const bids = [
        { text: 'CPC 0.42 MAD', x: 8, y: 20, d: 0.2 },
        { text: 'CTR 4.8%', x: 78, y: 15, d: 0.5 },
        { text: 'CPL 12 MAD', x: 15, y: 75, d: 0.8 },
        { text: 'ROAS 4.8x', x: 82, y: 70, d: 1.1 },
    ];

    return (
        <div ref={ref} className="relative py-14 overflow-hidden">
            {/* Background animated grid */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(${c.primary}60 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

            {/* Floating bid indicators */}
            {bids.map((b, i) => (
                <motion.div key={i} className="absolute hidden md:block"
                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={iv ? { opacity: [0, 0.7, 0.7, 0], y: [15, 0, -5, -15] } : {}}
                    transition={{ delay: b.d + 1, duration: 3, repeat: Infinity, repeatDelay: 4 }}>
                    <div className="px-2 py-1 rounded-md text-[8px] font-mono font-bold tracking-wider whitespace-nowrap"
                        style={{ background: `${c.primary}12`, color: `${c.primary}cc`, border: `1px solid ${c.primary}20` }}>
                        {b.text}
                    </div>
                </motion.div>
            ))}

            <div className="relative max-w-4xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">

                    {/* ── DONUT CHART ── */}
                    <motion.div className="relative w-24 h-24 flex-shrink-0"
                        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                        animate={iv ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}>
                        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                            {segmentData.map((seg, i) => (
                                <motion.circle key={i} cx="40" cy="40" r={radius} fill="none"
                                    stroke={seg.color} strokeWidth="7" strokeLinecap="round"
                                    strokeDasharray={`${seg.dashLength} ${seg.dashGap}`}
                                    strokeDashoffset={seg.offset}
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={iv ? { strokeDasharray: `${seg.dashLength} ${seg.dashGap}` } : {}}
                                    transition={{ delay: 0.3 + i * 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ filter: `drop-shadow(0 0 4px ${seg.color}40)` }} />
                            ))}
                        </svg>
                        {/* Center label */}
                        <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
                            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider">Budget</span>
                            <span className="text-sm font-bold" style={{ color: c.primary }}>15K</span>
                        </motion.div>
                        {/* Segment labels */}
                        {segments.map((seg, i) => {
                            const positions = [{ x: -8, y: -12 }, { x: 80, y: 30 }, { x: 10, y: 85 }];
                            return (
                                <motion.div key={seg.label} className="absolute text-[8px] font-bold uppercase tracking-wider whitespace-nowrap"
                                    style={{ left: positions[i].x, top: positions[i].y, color: seg.color }}
                                    initial={{ opacity: 0 }} animate={iv ? { opacity: 0.8 } : {}}
                                    transition={{ delay: 1 + i * 0.2 }}>
                                    {seg.label} {seg.pct}%
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* ── AD CLICK SCENE ── */}
                    <motion.div className="relative"
                        initial={{ opacity: 0, y: 20 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }}>
                        {/* Mini ad card */}
                        <div className="relative w-52 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                            style={{ boxShadow: `0 4px 30px ${c.primary}06` }}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider"
                                    style={{ background: `${c.primary}20`, color: c.primary }}>Ad</div>
                                <span className="text-[10px] text-gray-500">Sponsored</span>
                            </div>
                            <div className="text-xs font-semibold text-white/80 mb-1">Boost Your Business Today</div>
                            <div className="text-[10px] text-gray-500 mb-2.5">Get 10x more leads with targeted campaigns...</div>
                            <div className="h-6 rounded-md flex items-center justify-center text-[9px] font-bold uppercase tracking-wider"
                                style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, color: 'white' }}>
                                Learn More →
                            </div>
                            {/* Shimmer sweep */}
                            <motion.div className="absolute inset-0 pointer-events-none"
                                style={{ background: `linear-gradient(105deg, transparent 40%, ${c.primary}08 50%, transparent 60%)` }}
                                animate={iv ? { x: ['-200%', '200%'] } : {}}
                                transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatDelay: 5 }} />
                        </div>
                        {/* Animated cursor */}
                        <motion.div className="absolute z-20"
                            initial={{ left: '110%', top: '20%', opacity: 0 }}
                            animate={iv ? {
                                left: ['110%', '70%', '70%', '70%', '70%'],
                                top: ['20%', '75%', '75%', '75%', '75%'],
                                opacity: [0, 1, 1, 1, 0.5],
                                scale: [1, 1, 0.85, 1, 1],
                            } : {}}
                            transition={{ delay: 1, duration: 2.5, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 0.55, 0.65, 1] }}>
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                                <path d="M1 1L1 16L5.5 12L10 20L13 18.5L8.5 10.5L14 9.5L1 1Z"
                                    fill="white" stroke={c.primary} strokeWidth="1.5" />
                            </svg>
                        </motion.div>
                        {/* Click ripple */}
                        <motion.div className="absolute z-10 rounded-full"
                            style={{ left: '70%', top: '75%', width: 6, height: 6, border: `1.5px solid ${c.primary}` }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={iv ? { scale: [0, 8, 12], opacity: [0, 0.6, 0] } : {}}
                            transition={{ delay: 2, duration: 0.8 }} />
                        {/* +1 Conversion floating */}
                        <motion.div className="absolute z-20 text-xs font-bold whitespace-nowrap"
                            style={{ left: '55%', top: '55%', color: c.primary }}
                            initial={{ opacity: 0, y: 0, scale: 0.5 }}
                            animate={iv ? { opacity: [0, 1, 1, 0], y: [0, -25, -35, -50], scale: [0.5, 1.2, 1, 0.8] } : {}}
                            transition={{ delay: 2.2, duration: 1.5 }}>
                            +1 Conversion ✓
                        </motion.div>
                    </motion.div>

                    {/* ── REVENUE COUNTER ── */}
                    <motion.div className="flex flex-col items-center gap-3"
                        initial={{ opacity: 0, x: 20 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.6 }}>
                        <div className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold">Revenue Generated</div>
                        <div className="flex items-baseline gap-1">
                            <motion.span className="text-2xl md:text-3xl font-bold tabular-nums"
                                style={{ color: c.primary, textShadow: `0 0 20px ${c.primary}40` }}
                                initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
                                48,720
                            </motion.span>
                            <span className="text-xs font-semibold text-gray-500">MAD</span>
                        </div>
                        {/* Mini metrics */}
                        <div className="flex gap-4 mt-1">
                            {[
                                { label: 'CPC', value: '0.42', unit: 'MAD' },
                                { label: 'Conv.', value: '847', unit: '' },
                                { label: 'ROAS', value: '4.8', unit: 'x' },
                            ].map((m, i) => (
                                <motion.div key={m.label} className="text-center"
                                    initial={{ opacity: 0, y: 10 }} animate={iv ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1 + i * 0.15 }}>
                                    <div className="text-[8px] uppercase tracking-wider text-gray-600">{m.label}</div>
                                    <div className="text-xs font-bold" style={{ color: c.accent }}>{m.value}<span className="text-[8px] text-gray-500">{m.unit}</span></div>
                                </motion.div>
                            ))}
                        </div>
                        {/* Profit indicator */}
                        <motion.div className="flex items-center gap-1 px-3 py-1 rounded-full mt-1"
                            style={{ background: `${c.primary}10`, border: `1px solid ${c.primary}20` }}
                            initial={{ opacity: 0, scale: 0.8 }} animate={iv ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c.primary} strokeWidth="2.5"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
                            <span className="text-[9px] font-bold" style={{ color: c.primary }}>+325% ROI</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   DESIGN: Animated composition workspace
   ═══════════════════════════════════════════════════ */
function DesignTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });

    const palette = [c.primary, c.secondary, c.accent, '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#fb923c', '#22d3ee'];
    const shapes = [
        { type: 'circle', x: 15, y: 30, s: 28, r: 0 },
        { type: 'rect', x: 40, y: 20, s: 24, r: 15 },
        { type: 'tri', x: 65, y: 35, s: 26, r: -10 },
        { type: 'ring', x: 85, y: 25, s: 22, r: 0 },
    ];

    return (
        <div ref={ref} className="relative py-14 overflow-hidden">
            <div className="max-w-3xl mx-auto px-6">
                {/* Floating shapes */}
                <div className="relative h-24 mb-6">
                    {shapes.map((sh, i) => (
                        <motion.div key={i} className="absolute" style={{ left: `${sh.x}%`, top: `${sh.y}%` }}
                            initial={{ opacity: 0, scale: 0, rotate: sh.r - 30 }}
                            animate={iv ? { opacity: 0.7, scale: 1, rotate: sh.r } : {}}
                            transition={{ delay: i * 0.15, duration: 0.8, type: 'spring', stiffness: 150 }}
                            whileHover={{ scale: 1.3, opacity: 1, rotate: sh.r + 15 }}>
                            {sh.type === 'circle' && <div style={{ width: sh.s, height: sh.s, borderRadius: '50%', background: `linear-gradient(135deg, ${palette[i]}, ${palette[i + 1]})`, boxShadow: `0 0 20px ${palette[i]}40` }} />}
                            {sh.type === 'rect' && <div style={{ width: sh.s, height: sh.s, borderRadius: 6, background: `linear-gradient(135deg, ${palette[i + 2]}, ${palette[i + 3]})`, boxShadow: `0 0 20px ${palette[i + 2]}40` }} />}
                            {sh.type === 'tri' && <svg width={sh.s} height={sh.s} viewBox="0 0 30 30"><polygon points="15,2 28,28 2,28" fill={`url(#dg${i})`} filter={`drop-shadow(0 0 8px ${palette[i + 4]}40)`} /><defs><linearGradient id={`dg${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={palette[i + 4]} /><stop offset="100%" stopColor={palette[i + 5]} /></linearGradient></defs></svg>}
                            {sh.type === 'ring' && <div style={{ width: sh.s, height: sh.s, borderRadius: '50%', border: `2px solid ${palette[i + 6]}80`, boxShadow: `0 0 15px ${palette[i + 6]}30, inset 0 0 10px ${palette[i + 6]}10` }} />}
                        </motion.div>
                    ))}
                    {/* Connecting dotted lines between shapes */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.line x1="20" y1="40" x2="42" y2="30" stroke={`${c.primary}20`} strokeWidth="0.3" strokeDasharray="2 2"
                            initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }} />
                        <motion.line x1="48" y1="30" x2="67" y2="42" stroke={`${c.secondary}20`} strokeWidth="0.3" strokeDasharray="2 2"
                            initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}} transition={{ delay: 1, duration: 0.8 }} />
                        <motion.line x1="72" y1="42" x2="87" y2="32" stroke={`${c.accent}20`} strokeWidth="0.3" strokeDasharray="2 2"
                            initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}} transition={{ delay: 1.2, duration: 0.8 }} />
                    </svg>
                </div>

                {/* Color palette strip */}
                <div className="flex items-center justify-center gap-2">
                    {palette.map((color, i) => (
                        <motion.div key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={iv ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 300, damping: 15 }}
                            whileHover={{ scale: 1.6, y: -6, zIndex: 10 }}
                            className="relative group cursor-default">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full transition-shadow duration-300"
                                style={{ background: color, boxShadow: `0 2px 10px ${color}40` }} />
                            <motion.div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${color}50` }}
                                animate={iv ? { scale: [1, 1.8], opacity: [0.5, 0] } : {}}
                                transition={{ delay: 0.4 + i * 0.07 + 0.3, duration: 1.2, repeat: Infinity, repeatDelay: 4 }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   WEB: Live IDE + browser preview
   ═══════════════════════════════════════════════════ */
function WebTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });

    const lines = [
        { num: 1, indent: 0, tokens: [{ t: '<', c: '#9ca3af' }, { t: 'section', c: c.primary }, { t: ' class="', c: '#9ca3af' }, { t: 'hero', c: c.accent }, { t: '">', c: '#9ca3af' }] },
        { num: 2, indent: 1, tokens: [{ t: '<', c: '#9ca3af' }, { t: 'h1', c: c.primary }, { t: '>', c: '#9ca3af' }, { t: 'Your Brand', c: '#e5e7eb' }, { t: '</', c: '#9ca3af' }, { t: 'h1', c: c.primary }, { t: '>', c: '#9ca3af' }] },
        { num: 3, indent: 1, tokens: [{ t: '<', c: '#9ca3af' }, { t: 'Button', c: c.secondary }, { t: ' onClick={', c: '#9ca3af' }, { t: 'convert', c: '#fbbf24' }, { t: '} />', c: '#9ca3af' }] },
        { num: 4, indent: 0, tokens: [{ t: '</', c: '#9ca3af' }, { t: 'section', c: c.primary }, { t: '>', c: '#9ca3af' }] },
    ];

    return (
        <div ref={ref} className="relative py-10 overflow-hidden">
            <div className="max-w-2xl mx-auto px-6">
                <motion.div className="rounded-xl overflow-hidden border border-white/[0.06]"
                    style={{ boxShadow: `0 8px 40px ${c.primary}08` }}
                    initial={{ opacity: 0, y: 20 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                    {/* Tab bar */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-3 py-0.5 rounded text-[9px] font-mono text-gray-500 bg-white/[0.03] border border-white/[0.04]">
                                page.tsx
                            </div>
                        </div>
                    </div>
                    {/* Code area */}
                    <div className="p-4 font-mono text-[11px] leading-relaxed bg-navy-950/80 space-y-0.5">
                        {lines.map((line, li) => (
                            <motion.div key={li} className="flex items-center"
                                initial={{ opacity: 0, x: -15 }} animate={iv ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + li * 0.2, duration: 0.4 }}>
                                <span className="w-6 text-right text-white/15 select-none mr-4 text-[10px]">{line.num}</span>
                                <span style={{ paddingLeft: line.indent * 20 }}>
                                    {line.tokens.map((tk, ti) => (
                                        <span key={ti} style={{ color: tk.c }}>{tk.t}</span>
                                    ))}
                                </span>
                                {li === lines.length - 1 && (
                                    <motion.span className="inline-block w-[2px] h-3.5 ml-0.5 rounded-sm" style={{ background: c.primary }}
                                        animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   PHOTOGRAPHY: Camera viewfinder + gallery strip
   ═══════════════════════════════════════════════════ */
function PhotoTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });
    const bladeCount = 6;

    return (
        <div ref={ref} className="relative py-14 overflow-hidden">
            <div className="flex flex-col items-center gap-6">
                {/* Viewfinder aperture */}
                <motion.div className="relative w-24 h-24"
                    initial={{ scale: 0.6, opacity: 0, rotate: -60 }}
                    animate={iv ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                    transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}>
                    {/* Outer ring */}
                    <motion.div className="absolute inset-0 rounded-full"
                        style={{ border: `1.5px solid ${c.primary}40`, boxShadow: `0 0 25px ${c.primary}15` }}
                        animate={iv ? { rotate: 360 } : {}}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
                    {/* Blades */}
                    {Array.from({ length: bladeCount }).map((_, i) => (
                        <motion.div key={i} className="absolute inset-0" style={{ rotate: `${i * (360 / bladeCount)}deg` }}
                            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.15 * i + 0.3 }}>
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-8 rounded-full origin-bottom"
                                style={{ background: `linear-gradient(to top, ${c.primary}80, transparent)`, boxShadow: `0 0 6px ${c.primary}30` }} />
                        </motion.div>
                    ))}
                    {/* Inner lens */}
                    <motion.div className="absolute inset-5 rounded-full overflow-hidden"
                        style={{ border: `1px solid ${c.primary}50`, boxShadow: `inset 0 0 20px ${c.primary}10` }}
                        initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}} transition={{ delay: 0.8, type: 'spring' }}>
                        <div className="w-full h-full" style={{ background: `radial-gradient(circle at 30% 30%, ${c.primary}15, transparent)` }} />
                        {/* Focus crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div className="w-3 h-3" initial={{ opacity: 0 }} animate={iv ? { opacity: [0, 1, 0.5] } : {}} transition={{ delay: 1.2, duration: 0.8 }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full" style={{ background: `${c.primary}60` }} />
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px" style={{ background: `${c.primary}60` }} />
                            </motion.div>
                        </div>
                    </motion.div>
                    {/* Flash burst */}
                    <motion.div className="absolute inset-0 rounded-full"
                        style={{ background: `radial-gradient(circle, ${c.accent}40, transparent)` }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={iv ? { opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] } : {}}
                        transition={{ delay: 1.5, duration: 0.6 }} />
                </motion.div>

                {/* Film strip */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={iv ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 200 }}
                            className="w-10 h-8 rounded border border-white/[0.08] overflow-hidden"
                            style={{ background: `linear-gradient(135deg, ${c.primary}${i === 2 ? '25' : '08'}, ${c.secondary}${i === 2 ? '15' : '05'})`, boxShadow: i === 2 ? `0 0 12px ${c.primary}20` : 'none' }}>
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-3 h-3 rounded-sm" style={{ background: `${c.primary}${i === 2 ? '40' : '15'}` }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   EVENTS: Celebration explosion + timeline
   ═══════════════════════════════════════════════════ */
function EventTransition({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.3 });

    const confetti = Array.from({ length: 30 }, (_, i) => ({
        angle: (i / 30) * 360 + Math.random() * 20,
        dist: 35 + Math.random() * 80,
        size: 3 + Math.random() * 5,
        color: [c.primary, c.secondary, c.accent, '#fbbf24', '#34d399', '#f472b6', '#818cf8', '#fb923c'][i % 8],
        delay: Math.random() * 0.6,
        shape: i % 4, // 0=rect, 1=circle, 2=triangle, 3=line
        rot: Math.random() * 720,
    }));

    const timeline = [
        { icon: '📋', label: 'Plan' },
        { icon: '🎨', label: 'Design' },
        { icon: '📣', label: 'Promote' },
        { icon: '🎉', label: 'Launch' },
    ];

    return (
        <div ref={ref} className="relative py-14 overflow-hidden">
            <div className="max-w-2xl mx-auto px-6">
                {/* Confetti from center */}
                <div className="relative h-28 flex items-center justify-center mb-6">
                    {/* Center flash */}
                    <motion.div className="absolute w-4 h-4 rounded-full"
                        style={{ background: c.primary, boxShadow: `0 0 40px ${c.primary}80` }}
                        initial={{ scale: 0 }} animate={iv ? { scale: [0, 3, 0], opacity: [0, 1, 0] } : {}}
                        transition={{ duration: 0.6 }} />
                    {/* Expanding rings */}
                    {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div key={i} className="absolute rounded-full"
                            style={{ width: 8, height: 8, border: `1px solid ${c.primary}40` }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={iv ? { scale: [0, 12 + i * 4], opacity: [0.6, 0] } : {}}
                            transition={{ delay: d + 0.1, duration: 1.2 }} />
                    ))}
                    {/* Confetti */}
                    {confetti.map((p, i) => {
                        const rad = (p.angle * Math.PI) / 180;
                        return (
                            <motion.div key={i} className="absolute" style={{ left: '50%', top: '50%' }}
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
                                animate={iv ? {
                                    x: Math.cos(rad) * p.dist,
                                    y: Math.sin(rad) * p.dist + 15,
                                    opacity: [0, 1, 1, 0.5, 0],
                                    scale: [0, 1.2, 1, 0.8, 0.3],
                                    rotate: p.rot,
                                } : {}}
                                transition={{ delay: p.delay + 0.2, duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}>
                                {p.shape === 0 && <div style={{ width: p.size, height: p.size * 0.5, background: p.color, borderRadius: 1, boxShadow: `0 0 4px ${p.color}50` }} />}
                                {p.shape === 1 && <div style={{ width: p.size * 0.8, height: p.size * 0.8, background: p.color, borderRadius: '50%', boxShadow: `0 0 4px ${p.color}50` }} />}
                                {p.shape === 2 && <svg width={p.size} height={p.size} viewBox="0 0 10 10"><polygon points="5,0 10,10 0,10" fill={p.color} /></svg>}
                                {p.shape === 3 && <div style={{ width: p.size * 1.5, height: 1.5, background: p.color, borderRadius: 1 }} />}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-center gap-2">
                    {timeline.map((step, i) => (
                        <motion.div key={step.label} className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 15 }} animate={iv ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8 + i * 0.15, type: 'spring', stiffness: 200 }}>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                                style={{ boxShadow: i === 3 ? `0 0 15px ${c.primary}15` : 'none' }}>
                                <span className="text-sm">{step.icon}</span>
                                <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">{step.label}</span>
                            </div>
                            {i < 3 && (
                                <motion.div className="w-6 h-px" style={{ background: `${c.primary}30` }}
                                    initial={{ scaleX: 0 }} animate={iv ? { scaleX: 1 } : {}}
                                    transition={{ delay: 1 + i * 0.15 }} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   VARIANT 1: Flowing particle bridge
   ═══════════════════════════════════════════════════ */
function ParticleBridge({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.5 });
    const dots = Array.from({ length: 12 }, (_, i) => ({
        x: (i / 11) * 100,
        y: 50 + Math.sin(i * 0.6) * 20,
        s: 3 + (i % 3) * 2,
        d: i * 0.12,
    }));

    return (
        <div ref={ref} className="relative h-20 w-full overflow-hidden">
            {/* Central connection line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <motion.path
                    d="M0,20 C30,8 60,32 100,20 C140,8 170,32 200,20"
                    fill="none" stroke={`url(#pb-${c.primary.slice(1)})`} strokeWidth="0.6" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={iv ? { pathLength: 1, opacity: 0.5 } : {}}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
                <defs>
                    <linearGradient id={`pb-${c.primary.slice(1)}`}>
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="20%" stopColor={c.primary} />
                        <stop offset="80%" stopColor={c.secondary} />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
            {/* Floating dots */}
            {dots.map((d, i) => (
                <motion.div key={i} className="absolute rounded-full"
                    style={{
                        left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s,
                        background: i % 2 === 0 ? c.primary : c.secondary,
                        boxShadow: `0 0 ${d.s * 2}px ${i % 2 === 0 ? c.primary : c.secondary}50`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={iv ? { scale: [0, 1.3, 1], opacity: [0, 0.8, 0.5] } : {}}
                    transition={{ delay: d.d + 0.3, duration: 0.6, ease: 'easeOut' }} />
            ))}
            {/* Traveling pulse */}
            <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: c.accent, boxShadow: `0 0 12px ${c.accent}80, 0 0 24px ${c.accent}40` }}
                initial={{ left: '-5%', opacity: 0 }}
                animate={iv ? { left: ['-5%', '105%'], opacity: [0, 1, 1, 0] } : {}}
                transition={{ delay: 1, duration: 2, ease: 'linear', repeat: Infinity, repeatDelay: 3 }} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   VARIANT 2: Animated metric ticker strip
   ═══════════════════════════════════════════════════ */

const SERVICE_METRICS: Record<string, { icon: string; label: string; value: string }[]> = {
    'referencement-naturel': [
        { icon: '🔍', label: 'Keywords', value: '#1-3' },
        { icon: '📈', label: 'Organic', value: '+67%' },
        { icon: '🎯', label: 'CTR', value: '4.8%' },
        { icon: '🌐', label: 'Visibility', value: '92%' },
        { icon: '⚡', label: 'Speed', value: '98/100' },
    ],
    'reseaux-sociaux': [
        { icon: '❤️', label: 'Engagement', value: '8.2%' },
        { icon: '👥', label: 'Followers', value: '+12K' },
        { icon: '📱', label: 'Reach', value: '245K' },
        { icon: '💬', label: 'Comments', value: '+340' },
        { icon: '📤', label: 'Shares', value: '1.2K' },
    ],
    'publicite-en-ligne': [
        { icon: '💰', label: 'Revenue', value: '48.7K' },
        { icon: '🎯', label: 'ROAS', value: '4.8x' },
        { icon: '👆', label: 'Clicks', value: '18.2K' },
        { icon: '📧', label: 'Leads', value: '2.4K' },
        { icon: '📊', label: 'CVR', value: '6.2%' },
    ],
    'design-graphique': [
        { icon: '🎨', label: 'Projects', value: '120+' },
        { icon: '⭐', label: 'Rating', value: '4.9/5' },
        { icon: '🖼️', label: 'Visuals', value: '850+' },
        { icon: '🏆', label: 'Awards', value: '12' },
        { icon: '♻️', label: 'Revisions', value: '∞' },
    ],
    'creation-sites-web': [
        { icon: '🚀', label: 'Speed', value: '98/100' },
        { icon: '📱', label: 'Mobile', value: '100%' },
        { icon: '🔒', label: 'Security', value: 'A+' },
        { icon: '⚡', label: 'Uptime', value: '99.9%' },
        { icon: '📊', label: 'SEO', value: '95/100' },
    ],
    'photographie': [
        { icon: '📸', label: 'Shots', value: '5K+' },
        { icon: '✅', label: 'Delivered', value: '100%' },
        { icon: '🎞️', label: 'Projects', value: '200+' },
        { icon: '⭐', label: 'Quality', value: '4K+' },
        { icon: '🏅', label: 'Rated', value: '5/5' },
    ],
    'gestion-evenements': [
        { icon: '🎪', label: 'Events', value: '85+' },
        { icon: '👥', label: 'Attendees', value: '50K+' },
        { icon: '📺', label: 'Live Views', value: '120K' },
        { icon: '📱', label: 'Social', value: '+340%' },
        { icon: '⭐', label: 'Satisfaction', value: '98%' },
    ],
};

function MetricTicker({ c, slug }: { c: typeof DEFAULT; slug: string }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.5 });
    const metrics = SERVICE_METRICS[slug] || SERVICE_METRICS['referencement-naturel'];

    return (
        <div ref={ref} className="relative py-6 overflow-hidden">
            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
                {metrics.map((m, i) => (
                    <motion.div key={m.label}
                        initial={{ opacity: 0, y: 20, scale: 0.85 }}
                        animate={iv ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 18 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm">
                        <span className="text-sm">{m.icon}</span>
                        <div>
                            <div className="text-[8px] uppercase tracking-wider text-gray-600">{m.label}</div>
                            <motion.div className="text-xs font-bold tabular-nums" style={{ color: c.primary }}
                                initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 + 0.3 }}>
                                {m.value}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Bottom glow */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent 10%, ${c.primary}20 50%, transparent 90%)` }}
                initial={{ scaleX: 0 }} animate={iv ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.5 }} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   VARIANT 3: Signal wave with glowing nodes
   ═══════════════════════════════════════════════════ */
function SignalWave({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.5 });

    const wavePoints = Array.from({ length: 40 }, (_, i) => {
        const x = (i / 39) * 200;
        const y = 25 + Math.sin(i * 0.35) * 12 + Math.cos(i * 0.7) * 6;
        return `${x},${y}`;
    });
    const wavePath = `M${wavePoints.join(' L')}`;

    const nodes = [
        { x: 20, y: 22, s: 5, label: '●' },
        { x: 50, y: 30, s: 4, label: '●' },
        { x: 80, y: 18, s: 6, label: '●' },
    ];

    return (
        <div ref={ref} className="relative h-24 w-full overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                {/* Background subtle wave */}
                <motion.path d={wavePath} fill="none" stroke={`${c.primary}15`} strokeWidth="8"
                    initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}}
                    transition={{ duration: 2 }} />
                {/* Main signal line */}
                <motion.path d={wavePath} fill="none" stroke={`url(#sw-${c.primary.slice(1)})`} strokeWidth="1.2" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}}
                    transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    filter={`url(#swgl-${c.primary.slice(1)})`} />
                <defs>
                    <linearGradient id={`sw-${c.primary.slice(1)}`}>
                        <stop offset="0%" stopColor="transparent" /><stop offset="15%" stopColor={c.primary} />
                        <stop offset="50%" stopColor={c.accent} /><stop offset="85%" stopColor={c.secondary} />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id={`swgl-${c.primary.slice(1)}`}><feGaussianBlur stdDeviation="1.5" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
            </svg>
            {/* Nodes */}
            {nodes.map((n, i) => (
                <motion.div key={i} className="absolute" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                    <motion.div className="rounded-full"
                        style={{ width: n.s, height: n.s, background: c.primary, boxShadow: `0 0 ${n.s * 3}px ${c.primary}60` }}
                        initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}}
                        transition={{ delay: 0.8 + i * 0.3, type: 'spring', stiffness: 300 }} />
                    <motion.div className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${c.primary}40` }}
                        animate={iv ? { scale: [1, 3, 5], opacity: [0.6, 0.2, 0] } : {}}
                        transition={{ delay: 1.2 + i * 0.3, duration: 2, repeat: Infinity, repeatDelay: 4 }} />
                </motion.div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   VARIANT 4: Gradient mesh morphing orbs
   ═══════════════════════════════════════════════════ */
function GradientMesh({ c }: { c: typeof DEFAULT }) {
    const ref = useRef(null);
    const iv = useInView(ref, { once: true, amount: 0.5 });

    const orbs = [
        { x: 20, y: 40, s: 60, blur: 25 },
        { x: 45, y: 55, s: 80, blur: 30 },
        { x: 70, y: 35, s: 50, blur: 20 },
        { x: 85, y: 60, s: 40, blur: 18 },
    ];
    const colors = [c.primary, c.secondary, c.accent, c.primary];

    return (
        <div ref={ref} className="relative h-20 w-full overflow-hidden">
            {/* Orbs */}
            {orbs.map((o, i) => (
                <motion.div key={i} className="absolute rounded-full"
                    style={{
                        left: `${o.x}%`, top: `${o.y}%`,
                        width: o.s, height: o.s,
                        background: `radial-gradient(circle, ${colors[i]}25, ${colors[i]}08, transparent)`,
                        filter: `blur(${o.blur}px)`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={iv ? {
                        scale: [0, 1.2, 1, 1.1, 1],
                        opacity: [0, 0.8, 0.6, 0.7, 0.5],
                        x: [0, -8 + i * 4, 5 - i * 2, -3 + i, 0],
                    } : {}}
                    transition={{ delay: i * 0.15, duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }} />
            ))}
            {/* Center line */}
            <motion.div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                style={{ background: `linear-gradient(90deg, transparent, ${c.primary}15, ${c.secondary}15, ${c.accent}15, transparent)` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={iv ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }} />
            {/* Diamond accents */}
            {[25, 50, 75].map((x, i) => (
                <motion.div key={i} className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, width: 4, height: 4, background: colors[i], transform: 'translate(-50%, -50%) rotate(45deg)', boxShadow: `0 0 8px ${colors[i]}60` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={iv ? { scale: 1, opacity: 0.7 } : {}}
                    transition={{ delay: 0.6 + i * 0.2, type: 'spring', stiffness: 300 }} />
            ))}
        </div>
    );
}

/* ─── MAIN EXPORT ─── */
export default function ServiceTransition({ slug, variant = 0 }: { slug: string; variant?: number }) {
    const c = THEMES[slug] || DEFAULT;

    // Variant 0 = the main service-specific transition
    if (variant === 0) {
        switch (slug) {
            case 'referencement-naturel': return <SEOTransition c={c} />;
            case 'reseaux-sociaux': return <SocialTransition c={c} />;
            case 'publicite-en-ligne': return <AdsTransition c={c} />;
            case 'design-graphique': return <DesignTransition c={c} />;
            case 'creation-sites-web': return <WebTransition c={c} />;
            case 'photographie': return <PhotoTransition c={c} />;
            case 'gestion-evenements': return <EventTransition c={c} />;
            default: return <SEOTransition c={c} />;
        }
    }

    // Variants 1-4: shared transition types with service colors
    switch (variant) {
        case 1: return <ParticleBridge c={c} />;
        case 2: return <MetricTicker c={c} slug={slug} />;
        case 3: return <SignalWave c={c} />;
        case 4: return <GradientMesh c={c} />;
        default: return <ParticleBridge c={c} />;
    }
}
