'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// SVG Logos - these represent various business types
const logos = [
    {
        name: 'Atlas Tours',
        svg: (
            <svg viewBox="0 0 140 40" fill="none" className="h-8 w-auto">
                <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 26l8-16 8 16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="14" y1="22" x2="26" y2="22" stroke="currentColor" strokeWidth="1.5" />
                <text x="42" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">Atlas Tours</text>
            </svg>
        ),
    },
    {
        name: 'FoodChain',
        svg: (
            <svg viewBox="0 0 140 40" fill="none" className="h-8 w-auto">
                <path d="M10 12c0 8 6 16 12 16s12-8 12-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="16" y1="10" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="22" y1="8" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <text x="40" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">FoodChain</text>
            </svg>
        ),
    },
    {
        name: 'EduMa',
        svg: (
            <svg viewBox="0 0 110 40" fill="none" className="h-8 w-auto">
                <path d="M8 22l12-10 12 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20 12v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="15" y="22" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <text x="38" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">EduMa</text>
            </svg>
        ),
    },
    {
        name: 'Riad Luxe',
        svg: (
            <svg viewBox="0 0 130 40" fill="none" className="h-8 w-auto">
                <path d="M10 30V14a10 10 0 0120 0v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
                <text x="38" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">Riad Luxe</text>
            </svg>
        ),
    },
    {
        name: 'TechVolt',
        svg: (
            <svg viewBox="0 0 130 40" fill="none" className="h-8 w-auto">
                <polygon points="20,6 26,18 34,18 28,26 30,36 20,30 10,36 12,26 6,18 14,18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <text x="40" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">TechVolt</text>
            </svg>
        ),
    },
    {
        name: 'MarocFit',
        svg: (
            <svg viewBox="0 0 130 40" fill="none" className="h-8 w-auto">
                <circle cx="12" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="17" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="28" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
                <text x="40" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">MarocFit</text>
            </svg>
        ),
    },
    {
        name: 'SkyTravel',
        svg: (
            <svg viewBox="0 0 130 40" fill="none" className="h-8 w-auto">
                <path d="M6 28l10-6 8 4 10-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="34" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
                <text x="42" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">SkyTravel</text>
            </svg>
        ),
    },
    {
        name: 'MediCare+',
        svg: (
            <svg viewBox="0 0 140 40" fill="none" className="h-8 w-auto">
                <rect x="8" y="8" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="14" x2="20" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <text x="38" y="25" fill="currentColor" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="600">MediCare+</text>
            </svg>
        ),
    },
];

// Duplicate logos for seamless loop
const allLogos = [...logos, ...logos, ...logos];

export default function TrustBanner({ locale = 'fr' }: { locale?: string } = {}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const trustTitle = locale === 'ar' ? 'يثقون بنا' : locale === 'en' ? 'They trust us' : 'Ils nous font confiance';

    return (
        <section ref={ref} className="relative py-14 lg:py-16 overflow-hidden bg-navy-950">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent" />

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-10"
            >
                <p className="text-sm text-gray-500 uppercase tracking-[0.2em] font-medium font-body">
                    {trustTitle}
                </p>
            </motion.div>

            {/* Logo marquee */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
            >
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div className="trust-marquee">
                    <div className="trust-marquee-track">
                        {allLogos.map((logo, i) => (
                            <div
                                key={`${logo.name}-${i}`}
                                className="flex-shrink-0 px-8 lg:px-12 text-gray-600 hover:text-gray-400 transition-colors duration-500"
                            >
                                {logo.svg}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent" />
        </section>
    );
}
