'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import MoneyHoverEffect from './MoneyHoverEffect';

interface HeroProps {
    badge?: string;
    title: string;
    highlight: string;
    subtitle: string;
    showStats?: boolean;
    primaryCTA?: { text: string; href: string };
    secondaryCTA?: { text: string; href: string };
}

export default function Hero({
    badge,
    title,
    highlight,
    subtitle,
    showStats = false,
    primaryCTA,
    secondaryCTA,
    locale = 'fr',
}: HeroProps & { locale?: string }) {
    const defaultPrimary = primaryCTA ?? {
        text: locale === 'ar' ? 'تواصلوا معنا' : locale === 'en' ? 'Contact us' : 'Contactez-nous',
        href: `/${locale}/contact`,
    };
    const defaultSecondary = secondaryCTA ?? {
        text: locale === 'ar' ? 'خدماتنا' : locale === 'en' ? 'Our Services' : 'Nos Services',
        href: `/${locale}/services`,
    };
    const sectionRef = useRef<HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    // Mouse parallax for decorative elements
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 30 });

    // Transforms for different parallax layers
    const circleX1 = useTransform(smoothMouseX, (v) => (v - (mounted ? window.innerWidth / 2 : 0)) * 0.03);
    const circleY1 = useTransform(smoothMouseY, (v) => (v - (mounted ? window.innerHeight / 2 : 0)) * 0.03);
    const circleX2 = useTransform(smoothMouseX, (v) => (v - (mounted ? window.innerWidth / 2 : 0)) * -0.02);
    const circleY2 = useTransform(smoothMouseY, (v) => (v - (mounted ? window.innerHeight / 2 : 0)) * -0.02);
    const lineX = useTransform(smoothMouseX, (v) => (v - (mounted ? window.innerWidth / 2 : 0)) * 0.015);
    const lineY = useTransform(smoothMouseY, (v) => (v - (mounted ? window.innerHeight / 2 : 0)) * 0.015);

    useEffect(() => {
        setMounted(true);
        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouse, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const decorScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const badgeVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const titleWords = title.split(' ');
    const highlightWords = highlight.split(' ');

    return (
        <section ref={sectionRef} id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            {/* Background with parallax */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

            {/* Mouse-reactive geometric circles — only after mount to avoid hydration mismatch */}
            {mounted && (
                <>
                    <motion.div style={{ scale: decorScale }} className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div style={{ x: circleX1, y: circleY1 }}>
                            <div className="deco-circle w-[500px] h-[500px] -top-[100px] -left-[150px] absolute hero-circle-pulse" />
                        </motion.div>
                        <motion.div style={{ x: circleX2, y: circleY2 }}>
                            <div className="deco-circle w-[700px] h-[700px] top-[20%] -right-[200px] absolute hero-circle-pulse-alt" />
                        </motion.div>
                        <motion.div style={{ x: circleX1, y: circleY2 }}>
                            <div className="deco-circle w-[400px] h-[400px] bottom-[10%] left-[20%] absolute" />
                        </motion.div>
                        <motion.div style={{ x: circleX2, y: circleY1 }}>
                            <div className="deco-circle w-[300px] h-[300px] top-[40%] left-[60%] absolute" />
                        </motion.div>
                    </motion.div>

                    {/* ENHANCED animated accent lines - MORE VISIBLE, mouse-reactive */}
                    <motion.div style={{ x: lineX, y: lineY }} className="absolute inset-0 overflow-hidden pointer-events-none">
                        <svg className="absolute w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
                            {/* Line 1 - bold primary curve */}
                            <motion.path
                                d="M-100 700 Q 300 300 700 500 Q 1100 700 1600 200"
                                stroke="url(#stroke-gradient-1)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.35 }}
                                transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
                            />
                            {/* Line 2 - flowing secondary */}
                            <motion.path
                                d="M-200 200 Q 200 600 600 400 Q 1000 200 1500 600"
                                stroke="url(#stroke-gradient-2)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.25 }}
                                transition={{ duration: 3, delay: 0.6, ease: 'easeInOut' }}
                            />
                            {/* Line 3 - NEW flowing pink curve */}
                            <motion.path
                                d="M-50 500 Q 350 100 750 350 Q 1150 600 1550 150"
                                stroke="url(#stroke-gradient-3)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.2 }}
                                transition={{ duration: 3.5, delay: 0.9, ease: 'easeInOut' }}
                            />
                            {/* Line 4 - NEW thin accent */}
                            <motion.path
                                d="M100 800 Q 500 400 900 600 Q 1300 800 1600 300"
                                stroke="url(#stroke-gradient-4)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.15 }}
                                transition={{ duration: 4, delay: 1.2, ease: 'easeInOut' }}
                            />
                            {/* Animated glowing particle along line 1 */}
                            <motion.circle
                                r="4"
                                fill="#8b5cf6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.8, 0] }}
                                transition={{ duration: 4, delay: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <animateMotion dur="6s" repeatCount="indefinite" path="M-100 700 Q 300 300 700 500 Q 1100 700 1600 200" />
                            </motion.circle>
                            {/* Animated glowing particle along line 2 */}
                            <motion.circle
                                r="3"
                                fill="#06b6d4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.6, 0] }}
                                transition={{ duration: 5, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <animateMotion dur="8s" repeatCount="indefinite" path="M-200 200 Q 200 600 600 400 Q 1000 200 1500 600" />
                            </motion.circle>

                            <defs>
                                <linearGradient id="stroke-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <linearGradient id="stroke-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                                <linearGradient id="stroke-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                                <linearGradient id="stroke-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="50%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>

                    {/* Subtle blobs - more visible */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div style={{ x: circleX1, y: circleY1 }}>
                            <div className="blob blob-purple w-[600px] h-[600px] -top-[150px] left-[20%] !opacity-[0.18] absolute" />
                        </motion.div>
                        <motion.div style={{ x: circleX2, y: circleY2 }}>
                            <div className="blob blob-cyan w-[500px] h-[500px] bottom-[10%] right-[10%] !opacity-[0.12] absolute" />
                        </motion.div>
                        <motion.div style={{ x: circleX2, y: circleY1 }}>
                            <div className="blob blob-pink w-[350px] h-[350px] top-[30%] right-[30%] !opacity-[0.08] absolute" />
                        </motion.div>
                    </div>
                </>
            )}

            <div className="grid-pattern" />

            {/* Content with scroll-away effect */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-10 text-center w-full px-8 lg:px-12 max-w-5xl mx-auto pt-24"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {badge && (
                        <motion.div variants={badgeVariants}>
                            <span className="hero-badge inline-block px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-purple/20 text-accent-purple bg-accent-purple/5 mb-8">
                                {badge}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading leading-[1.08] tracking-tight mb-6"
                    >
                        <span className="inline-block overflow-hidden">
                            {titleWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block hover-lift"
                                    initial={{ y: '110%', opacity: 0, rotateX: -80 }}
                                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4 + i * 0.08,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {word}{i < titleWords.length - 1 ? '\u00A0' : ''}
                                </motion.span>
                            ))}
                        </span>
                        <br />
                        <span className="gradient-text inline-block overflow-hidden">
                            {highlightWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block hover-lift"
                                    initial={{ y: '110%', opacity: 0, rotateX: -80 }}
                                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.6 + i * 0.08,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {word}{i < highlightWords.length - 1 ? '\u00A0' : ''}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <MoneyHoverEffect>
                            <Link href={defaultPrimary.href} className="btn-primary magnetic-btn money-hover-btn">
                                {defaultPrimary.text}
                                <span className="btn-arrow">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        </MoneyHoverEffect>
                        <Link href={defaultSecondary.href} className="btn-secondary magnetic-btn">
                            {defaultSecondary.text}
                            <span className="btn-arrow">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Stats bar */}
                    {showStats && (
                        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                            {[
                                { value: 1600, suffix: '+', label: locale === 'ar' ? 'مشاريع رقمية' : locale === 'en' ? 'Digital Projects' : 'Projets Digitaux' },
                                { value: 1215, suffix: '+', label: locale === 'ar' ? 'شركات' : locale === 'en' ? 'Companies' : 'Entreprises' },
                                { value: 20, suffix: '+', label: locale === 'ar' ? 'بلدان' : locale === 'en' ? 'Countries' : 'Pays' },
                                { value: 1, suffix: 'M$+', label: locale === 'ar' ? 'إيرادات' : locale === 'en' ? 'Revenue Generated' : 'Revenus Générés' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ delay: 1.3 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-center px-4 py-5 rounded-2xl border border-white/[0.04] bg-white/[0.02] stat-card interactive-card"
                                >
                                    <AnimatedCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        className="text-2xl md:text-3xl font-bold gradient-text font-heading block"
                                        duration={2500}
                                    />
                                    <div className="text-gray-500 text-xs mt-1.5 tracking-wide">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[0.65rem] text-gray-500 uppercase tracking-[0.2em] font-medium">{locale === 'ar' ? 'مرر للأسفل' : 'Scroll'}</span>
                    <div className="w-5 h-8 rounded-full border border-white/[0.12] flex items-start justify-center p-1.5 scroll-indicator">
                        <motion.div
                            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1 h-2 rounded-full bg-accent-purple/60"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
