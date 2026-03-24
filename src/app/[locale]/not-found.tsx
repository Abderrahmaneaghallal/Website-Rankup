'use client';

import Link from "next/link";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import { useLocale } from "@/hooks/useLocale";
import { getNotFoundData } from "@/i18n/pageTranslations";

export default function NotFound() {
    const locale = useLocale();
    const d = getNotFoundData(locale);

    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
            <AnimatedBlobs />
            <div className="grid-pattern" />

            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                <div className="text-8xl md:text-9xl font-bold gradient-text font-heading mb-4">
                    404
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-heading mb-4">
                    {d.title}
                </h1>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                    {d.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/${locale}`} className="btn-primary justify-center">
                        {d.homeBtn}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                    <Link href={`/${locale}/contact`} className="btn-secondary justify-center">
                        {d.contactBtn}
                    </Link>
                </div>
            </div>
        </section>
    );
}
