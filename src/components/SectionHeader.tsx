'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface SectionHeaderProps {
    badge?: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export default function SectionHeader({
    badge,
    title,
    subtitle,
    centered = true,
}: SectionHeaderProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className={`mb-14 lg:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}>
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="inline-block px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-purple/15 text-accent-purple bg-accent-purple/5 mb-5">
                        {badge}
                    </span>
                </motion.div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            </motion.div>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-5 text-gray-400 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            )}
            {/* Animated underline */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent origin-center"
            />
        </div>
    );
}
