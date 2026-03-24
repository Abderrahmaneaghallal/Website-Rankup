'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
    locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const switchLocale = (newLocale: Locale) => {
        // Replace the locale in the current path
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');

        // Set cookie for middleware to remember
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

        router.push(newPath);
        setOpen(false);
    };

    const currentLocale = locale as Locale;

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all duration-300 text-sm text-gray-300 hover:text-white"
                aria-label="Change language"
            >
                <span className="text-base">{localeFlags[currentLocale]}</span>
                <span className="hidden sm:inline font-medium">{localeNames[currentLocale]}</span>
                <svg
                    className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full right-0 mt-2 w-[180px] rounded-2xl bg-navy-900/95 backdrop-blur-2xl border border-white/[0.08] p-1.5 shadow-2xl shadow-black/40 z-50"
                    >
                        {locales.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => switchLocale(loc)}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${loc === currentLocale
                                        ? 'bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                                    }`}
                            >
                                <span className="text-lg">{localeFlags[loc]}</span>
                                <span className="font-medium">{localeNames[loc]}</span>
                                {loc === currentLocale && (
                                    <svg className="w-4 h-4 ml-auto text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
