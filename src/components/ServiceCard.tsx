'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import Tilt3D from './Tilt3D';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    href: string;
    index?: number;
    locale?: string;
}

export default function ServiceCard({ icon, title, description, href, index = 0, locale = 'fr' }: ServiceCardProps) {
    const readMore = locale === 'ar' ? 'اقرأ المزيد' : locale === 'en' ? 'Learn more' : 'En savoir plus';
    return (
        <ScrollReveal delay={index * 0.1} blur={true} scale={true}>
            <Tilt3D intensity={12} glare={true} borderGlow={true} scale={1.03}>
                <Link href={href} className="block group">
                    <div className="glass-card p-7 lg:p-8 h-full service-card-hover">
                        {/* Floating 3D icon */}
                        <div
                            className="w-14 h-14 rounded-2xl bg-accent-purple/8 border border-accent-purple/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-accent-purple/12 group-hover:border-accent-purple/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(139,92,246,0.25)]"
                            style={{ transform: 'translateZ(30px)' }}
                        >
                            {icon}
                        </div>

                        {/* Title - 3D pop */}
                        <h3
                            className="text-base font-semibold text-white font-heading mb-3 group-hover:text-accent-purple transition-colors duration-300"
                            style={{ transform: 'translateZ(20px)' }}
                        >
                            {title}
                        </h3>

                        {/* Description */}
                        <p
                            className="text-gray-500 text-sm leading-relaxed mb-5"
                            style={{ transform: 'translateZ(10px)' }}
                        >
                            {description}
                        </p>

                        {/* Arrow link */}
                        <span
                            className="inline-flex items-center gap-2 text-sm text-gray-400 group-hover:text-accent-purple group-hover:gap-3 transition-all duration-400"
                            style={{ transform: 'translateZ(25px)' }}
                        >
                            {readMore}
                            <svg className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </Link>
            </Tilt3D>
        </ScrollReveal>
    );
}
