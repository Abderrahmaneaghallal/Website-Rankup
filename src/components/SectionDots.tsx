'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const sectionsFr = [
    { id: 'hero', label: 'Accueil' },
    { id: 'why', label: 'Pourquoi' },
    { id: 'services', label: 'Services' },
    { id: 'methodology', label: 'Méthode' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'faq', label: 'FAQ' },
];

const sectionsEn = [
    { id: 'hero', label: 'Home' },
    { id: 'why', label: 'Why Us' },
    { id: 'services', label: 'Services' },
    { id: 'methodology', label: 'Method' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
];

const sectionsAr = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'why', label: 'لماذا نحن' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'methodology', label: 'المنهجية' },
    { id: 'testimonials', label: 'الشهادات' },
    { id: 'pricing', label: 'الأسعار' },
    { id: 'faq', label: 'الأسئلة' },
];

export default function SectionDots({ locale = 'fr' }: { locale?: string } = {}) {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('hero');
    const [isVisible, setIsVisible] = useState(false);

    const sections = locale === 'ar' ? sectionsAr : locale === 'en' ? sectionsEn : sectionsFr;

    // Only show on homepage
    const isHomePage = pathname === `/${locale}` || pathname === '/' || pathname === `/${locale}/`;

    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);

            const sectionEls = sections
                .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
                .filter((s) => s.el !== null);

            const viewportCenter = window.innerHeight / 2;

            let closest = sectionEls[0]?.id || 'hero';
            let closestDist = Infinity;

            for (const { id, el } of sectionEls) {
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = id;
                }
            }

            setActiveSection(closest);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, isHomePage]);

    if (!isHomePage) return null;

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="dot-nav"
        >
            {sections.map((section) => (
                <div key={section.id} className="relative group">
                    <button
                        onClick={() => scrollTo(section.id)}
                        className={`dot-nav-item ${activeSection === section.id ? 'active' : ''}`}
                        aria-label={section.label}
                    />
                    <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs text-white bg-navy-800/95 backdrop-blur-sm border border-white/[0.08] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                        {section.label}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}

