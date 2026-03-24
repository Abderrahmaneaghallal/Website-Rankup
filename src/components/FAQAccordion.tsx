'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface FAQItem {
    question: string;
    answer: string;
}

const INITIAL_VISIBLE = 3;

function FAQItemCard({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden transition-all duration-300 hover:border-white/[0.1]">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 lg:p-6 text-left group"
                aria-expanded={isOpen}
                id={`faq-question-${index}`}
            >
                <span className="text-sm lg:text-base font-medium text-gray-200 group-hover:text-white transition-colors pr-4 leading-snug">
                    {item.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="shrink-0 w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-gray-500 group-hover:text-accent-purple group-hover:border-accent-purple/20 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                            <div className="h-px bg-white/[0.04] mb-4" />
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SEO: hidden content always in DOM */}
            <div className="sr-only" aria-hidden="true">
                <p>{item.answer}</p>
            </div>
        </div>
    );
}

export default function FAQAccordion({ items, locale = 'fr' }: { items: FAQItem[]; locale?: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE);
    const hiddenCount = items.length - INITIAL_VISIBLE;

    const showMoreText = locale === 'ar' ? `عرض المزيد من الأسئلة (${hiddenCount})` : locale === 'en' ? `Show more questions (${hiddenCount})` : `Voir plus de questions (${hiddenCount})`;
    const showLessText = locale === 'ar' ? 'عرض أقل' : locale === 'en' ? 'Show fewer questions' : 'Voir moins de questions';

    return (
        <div className="space-y-3">
            {/* First 3 items - always visible */}
            {items.slice(0, INITIAL_VISIBLE).map((item, i) => (
                <ScrollReveal key={`visible-${i}`} delay={i * 0.04}>
                    <FAQItemCard
                        item={item}
                        index={i}
                        isOpen={openIndex === i}
                        onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                </ScrollReveal>
            ))}

            {/* Remaining items - shown/hidden with animation */}
            <AnimatePresence>
                {showAll && items.slice(INITIAL_VISIBLE).map((item, i) => {
                    const actualIndex = i + INITIAL_VISIBLE;
                    return (
                        <motion.div
                            key={`hidden-${actualIndex}`}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: i * 0.05,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            <FAQItemCard
                                item={item}
                                index={actualIndex}
                                isOpen={openIndex === actualIndex}
                                onToggle={() => setOpenIndex(openIndex === actualIndex ? null : actualIndex)}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Read More / Show Less Button */}
            {hiddenCount > 0 && (
                <motion.div
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <button
                        onClick={() => {
                            setShowAll(!showAll);
                            if (showAll) setOpenIndex(null);
                        }}
                        className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-500 overflow-hidden"
                        id="faq-read-more-btn"
                    >
                        {/* Button background */}
                        <span className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.02] group-hover:border-accent-purple/30 group-hover:bg-accent-purple/[0.06] transition-all duration-500" />

                        {/* Gradient glow on hover */}
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-purple/5 via-accent-cyan/5 to-accent-purple/5" />

                        {/* Button text */}
                        <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">
                            {showAll ? showLessText : showMoreText}
                        </span>

                        {/* Arrow icon */}
                        <motion.span
                            className="relative z-10"
                            animate={{ rotate: showAll ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <svg
                                className="w-4 h-4 text-gray-500 group-hover:text-accent-purple transition-colors duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.span>

                        {/* Shimmer effect */}
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                    </button>
                </motion.div>
            )}
        </div>
    );
}
