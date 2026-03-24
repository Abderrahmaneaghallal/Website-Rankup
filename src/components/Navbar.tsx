'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface NavbarProps {
    locale: string;
    dict: any;
}

export default function Navbar({ locale, dict }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();

    const prefix = `/${locale}`;

    const navLinks = [
        { label: dict.home, href: `${prefix}` },
        { label: dict.about, href: `${prefix}/a-propos` },
        {
            label: dict.services,
            href: `${prefix}/services`,
            children: [
                { label: dict.servicesList.socialMedia, href: `${prefix}/services/reseaux-sociaux` },
                { label: dict.servicesList.onlineAds, href: `${prefix}/services/publicite-en-ligne` },
                { label: dict.servicesList.graphicDesign, href: `${prefix}/services/design-graphique` },
                { label: dict.servicesList.webCreation, href: `${prefix}/services/creation-sites-web` },
                { label: dict.servicesList.seo, href: `${prefix}/services/referencement-naturel` },
                { label: dict.servicesList.photography, href: `${prefix}/services/photographie` },
                { label: dict.servicesList.events, href: `${prefix}/services/gestion-evenements` },
            ],
        },
        { label: dict.portfolio, href: `${prefix}/portfolio` },
        { label: dict.blog, href: `${prefix}/blog` },
        { label: dict.contact, href: `${prefix}/contact` },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setDropdownOpen(false);
    }, [pathname]);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled
                ? 'bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.04]'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-6xl mx-auto px-8 lg:px-12 flex items-center justify-between h-[72px]">
                {/* Logo */}
                <Link href={`${prefix}`} className="flex items-center gap-2.5 shrink-0 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold text-sm font-heading transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-accent-purple/20">
                        R
                    </div>
                    <span className="text-xl font-bold text-white font-heading tracking-tight">
                        Rank<span className="gradient-text">Up</span>
                    </span>
                </Link>

                {/* Center nav - Desktop */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 text-[0.9rem] font-medium rounded-full transition-all duration-400 flex items-center gap-1.5 ${pathname.includes('/services')
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform duration-400 ${dropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Link>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12, scale: 0.95, filter: 'blur(4px)' }}
                                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, y: 12, scale: 0.95, filter: 'blur(4px)' }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] rounded-2xl bg-navy-900/95 backdrop-blur-2xl border border-white/[0.06] p-2 shadow-2xl shadow-black/30"
                                        >
                                            {link.children.map((child, j) => (
                                                <motion.div
                                                    key={child.href}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: j * 0.04, duration: 0.3 }}
                                                >
                                                    <Link
                                                        href={child.href}
                                                        className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all duration-200"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`px-4 py-2 text-[0.9rem] font-medium rounded-full transition-all duration-400 relative ${pathname === link.href
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-purple"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    )}
                </div>

                {/* Right - Language Switcher + CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <LanguageSwitcher locale={locale} />
                    <Link href={`${prefix}/contact`} className="btn-primary text-sm !py-2.5 !px-5 money-hover-btn">
                        {dict.contactUs}
                        <span className="btn-arrow">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Mobile toggle */}
                <div className="lg:hidden flex items-center gap-2">
                    <LanguageSwitcher locale={locale} />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-300"
                        aria-label="Menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                        exit={{ opacity: 0, height: 0, filter: 'blur(8px)' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden border-t border-white/[0.04] bg-navy-950/95 backdrop-blur-2xl"
                    >
                        <div className="px-6 py-6 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        className="block px-4 py-3 text-[0.95rem] text-gray-300 hover:text-white rounded-xl hover:bg-white/[0.03] transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                    {link.children && (
                                        <div className="ps-6">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-gray-500 hover:text-white transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            <motion.div
                                className="pt-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <Link href={`${prefix}/contact`} className="btn-primary w-full justify-center text-sm">
                                    {dict.contactUs}
                                    <span className="btn-arrow">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
