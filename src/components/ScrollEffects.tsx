'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Parallax wrapper for entire sections - elements move at different speeds when scrolling
export function ParallaxLayer({
    children,
    speed = 0.5,
    className = '',
}: {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

// Horizontal scroll text ticker
export function ScrollTicker({
    text,
    speed = 1,
    className = '',
}: {
    text: string;
    speed?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -speed * 600]);
    const xReverse = useTransform(scrollYProgress, [0, 1], [0, speed * 600]);

    return (
        <div ref={ref} className={`overflow-hidden py-10 ${className}`}>
            {/* Forward row */}
            <motion.div style={{ x }} className="flex whitespace-nowrap gap-12 mb-5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <span
                        key={`f-${i}`}
                        className="text-[3.5rem] lg:text-[5rem] font-black select-none uppercase italic"
                        style={{
                            WebkitTextStroke: '1.5px rgba(56, 189, 248, 0.25)',
                            color: 'rgba(56, 189, 248, 0.04)',
                            letterSpacing: '0.06em',
                            fontFamily: '"Poppins", sans-serif',
                        }}
                    >
                        {text}
                    </span>
                ))}
            </motion.div>
            {/* Reverse row */}
            <motion.div style={{ x: xReverse }} className="flex whitespace-nowrap gap-12">
                {Array.from({ length: 6 }).map((_, i) => (
                    <span
                        key={`r-${i}`}
                        className="text-[3.5rem] lg:text-[5rem] font-black select-none uppercase italic"
                        style={{
                            WebkitTextStroke: '1.5px rgba(56, 189, 248, 0.18)',
                            color: 'rgba(56, 189, 248, 0.03)',
                            letterSpacing: '0.06em',
                            fontFamily: '"Poppins", sans-serif',
                        }}
                    >
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// Section divider with scroll-driven animation
export function SectionDivider({ className = '' }: { className?: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);

    return (
        <div ref={ref} className={`relative h-24 flex items-center justify-center ${className}`}>
            <motion.div
                className="w-full max-w-4xl h-px mx-auto"
                style={{
                    scaleX,
                    opacity,
                    background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)',
                }}
            />
        </div>
    );
}

// Counter that animates on scroll into view
export function ScrollCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const animatedValue = useTransform(scrollYProgress, [0, 1], [0, value]);

    return (
        <motion.span ref={ref} className={className}>
            {prefix}
            <motion.span>
                {useTransform(animatedValue, (v) => Math.round(v))}
            </motion.span>
            {suffix}
        </motion.span>
    );
}

// Text that reveals word by word on scroll
export function ScrollTextReveal({
    text,
    className = '',
}: {
    text: string;
    className?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.4'],
    });

    const words = text.split(' ');

    return (
        <p ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <ScrollWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </ScrollWord>
                );
            })}
        </p>
    );
}

function ScrollWord({
    children,
    progress,
    range,
}: {
    children: React.ReactNode;
    progress: any;
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const y = useTransform(progress, range, [8, 0]);

    return (
        <motion.span style={{ opacity, y }} className="inline-block">
            {children}
        </motion.span>
    );
}

// Zoom-in parallax for images
export function ParallaxImage({
    src,
    alt,
    className = '',
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
    const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ scale, y }}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
