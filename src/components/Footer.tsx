'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FooterProps {
    locale: string;
    dict: any;
}

export default function Footer({ locale, dict }: FooterProps) {
    const prefix = `/${locale}`;

    const footerLinks: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
        {
            title: dict.services,
            links: [
                { label: locale === 'ar' ? 'وسائل التواصل' : locale === 'en' ? 'Social Media' : 'Réseaux Sociaux', href: `${prefix}/services/reseaux-sociaux` },
                { label: locale === 'ar' ? 'الإعلانات' : locale === 'en' ? 'Online Ads' : 'Publicité en Ligne', href: `${prefix}/services/publicite-en-ligne` },
                { label: locale === 'ar' ? 'التصميم' : locale === 'en' ? 'Graphic Design' : 'Design Graphique', href: `${prefix}/services/design-graphique` },
                { label: locale === 'ar' ? 'تطوير المواقع' : locale === 'en' ? 'Web Development' : 'Création Sites Web', href: `${prefix}/services/creation-sites-web` },
                { label: 'SEO', href: `${prefix}/services/referencement-naturel` },
                { label: locale === 'ar' ? 'التصوير' : locale === 'en' ? 'Photography' : 'Photographie', href: `${prefix}/services/photographie` },
                { label: locale === 'ar' ? 'الفعاليات' : locale === 'en' ? 'Events' : 'Événements', href: `${prefix}/services/gestion-evenements` },
            ],
        },
        {
            title: dict.company,
            links: [
                { label: locale === 'ar' ? 'من نحن' : locale === 'en' ? 'About' : 'À Propos', href: `${prefix}/a-propos` },
                { label: locale === 'ar' ? 'أعمالنا' : locale === 'en' ? 'Portfolio' : 'Portfolio', href: `${prefix}/portfolio` },
                { label: locale === 'ar' ? 'المدونة' : locale === 'en' ? 'Blog' : 'Blog', href: `${prefix}/blog` },
                { label: locale === 'ar' ? 'اتصل بنا' : locale === 'en' ? 'Contact' : 'Contact', href: `${prefix}/contact` },
            ],
        },
        {
            title: dict.cities,
            links: [
                { label: locale === 'ar' ? 'أكادير' : 'Agadir', href: `${prefix}/agence-marketing-digital-agadir` },
                { label: locale === 'ar' ? 'الدار البيضاء' : 'Casablanca', href: `${prefix}/agence-marketing-digital-casablanca` },
                { label: locale === 'ar' ? 'الرباط' : 'Rabat', href: `${prefix}/agence-marketing-digital-rabat` },
                { label: locale === 'ar' ? 'مراكش' : 'Marrakech', href: `${prefix}/agence-marketing-digital-marrakech` },
            ],
        },
        {
            title: dict.social,
            links: [
                { label: 'Instagram', href: 'https://www.instagram.com/rankup.ma', external: true },
                { label: 'Facebook', href: 'https://www.facebook.com/rankup.ma', external: true },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rankup-marketing/', external: true },
                { label: 'YouTube', href: 'https://www.youtube.com/@MarketingDigitalAgencyAgadir', external: true },
            ],
        },
    ];

    return (
        <footer className="border-t border-white/[0.04]">
            <div className="max-w-6xl mx-auto px-8 lg:px-12 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <ScrollReveal blur={true}>
                            <Link href={`${prefix}`} className="flex items-center gap-2.5 mb-5 group">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold text-sm font-heading transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    R
                                </div>
                                <span className="text-xl font-bold text-white font-heading tracking-tight">
                                    Rank<span className="gradient-text">Up</span>
                                </span>
                            </Link>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1} blur={true}>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                {dict.description}
                            </p>
                        </ScrollReveal>

                        {/* Contact info */}
                        <ScrollReveal delay={0.2} blur={true}>
                            <div className="mt-6 space-y-2.5">
                                <a href="mailto:contact@rankuplus.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent-purple transition-colors duration-300">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    contact@rankuplus.com
                                </a>
                                <a href="tel:+212604778249" className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent-purple transition-colors duration-300">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    +212 60 47 78 249
                                </a>
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Agadir, {locale === 'ar' ? 'المغرب' : locale === 'en' ? 'Morocco' : 'Maroc'}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((group, gi) => (
                        <ScrollReveal key={group.title} delay={gi * 0.1} blur={true}>
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 tracking-[0.12em] uppercase mb-5">
                                    {group.title}
                                </h3>
                                <ul className="space-y-3">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            {link.external ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-gray-500 hover:text-white transition-all duration-300 inline-flex items-center gap-1.5 hover:gap-2.5"
                                                >
                                                    {link.label}
                                                    <svg className="w-3 h-3 text-accent-purple opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.04]">
                <div className="max-w-6xl mx-auto px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} RankUp. {dict.rights}
                    </p>
                    <div className="flex gap-5">
                        <Link href={`${prefix}/mentions-legales`} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                            {dict.legal.privacy}
                        </Link>
                        <Link href={`${prefix}/politique-confidentialite`} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                            {dict.legal.terms}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
