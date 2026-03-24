'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonialsFr = [
    { name: 'Youssef B.', role: 'CEO, Atlas Tours', quote: "RankUp a complètement transformé notre présence digitale. En 4 mois, notre trafic organique a augmenté de 320% et nos réservations en ligne ont doublé." },
    { name: 'Sarah M.', role: 'Fondatrice, EduMa', quote: "L'équipe de RankUp est exceptionnelle. Grâce à leurs campagnes Facebook Ads, nous avons divisé notre coût par inscription par 3." },
    { name: 'Karim A.', role: 'Directeur Marketing, FoodChain', quote: "Nous avons atteint 50K abonnés Instagram en 5 mois grâce à RankUp. La qualité du contenu et la stratégie éditoriale sont de niveau international." },
    { name: 'Fatima Z.', role: 'Gérante, Riad Luxe', quote: "La refonte de notre site web et la stratégie SEO mise en place par RankUp ont augmenté notre taux d'occupation de 40%." },
];

const testimonialsEn = [
    { name: 'Youssef B.', role: 'CEO, Atlas Tours', quote: "RankUp completely transformed our digital presence. In 4 months, our organic traffic increased by 320% and our online bookings doubled." },
    { name: 'Sarah M.', role: 'Founder, EduMa', quote: "The RankUp team is exceptional. Thanks to their Facebook Ads campaigns, we divided our cost per registration by 3." },
    { name: 'Karim A.', role: 'Marketing Director, FoodChain', quote: "We reached 50K Instagram followers in 5 months thanks to RankUp. The content quality and editorial strategy are world-class." },
    { name: 'Fatima Z.', role: 'Manager, Riad Luxe', quote: "The redesign of our website and SEO strategy implemented by RankUp increased our occupancy rate by 40%." },
];

const testimonialsAr = [
    { name: 'يوسف ب.', role: 'المدير التنفيذي، أطلس تورز', quote: "غيّرت رانك أب حضورنا الرقمي بالكامل. في 4 أشهر، زاد حركة المرور العضوية لدينا بنسبة 320% وتضاعفت حجوزاتنا عبر الإنترنت." },
    { name: 'سارة م.', role: 'مؤسسة، إيديوما', quote: "فريق رانك أب استثنائي. بفضل حملاتهم على Facebook Ads، خفضنا تكلفة التسجيل بمقدار 3 مرات." },
    { name: 'كريم أ.', role: 'مدير التسويق، فودتشين', quote: "وصلنا إلى 50 ألف متابع على إنستغرام في 5 أشهر بفضل رانك أب. جودة المحتوى والاستراتيجية التحريرية على مستوى عالمي." },
    { name: 'فاطمة ز.', role: 'مديرة، رياض لوكس', quote: "إعادة تصميم موقعنا واستراتيجية SEO التي نفذتها رانك أب زادت معدل إشغالنا بنسبة 40%." },
];

export default function TestimonialsSlider({ locale = 'fr' }: { locale?: string } = {}) {
    const [current, setCurrent] = useState(0);
    const testimonials = locale === 'ar' ? testimonialsAr : locale === 'en' ? testimonialsEn : testimonialsFr;
    const ariaLabel = locale === 'ar' ? 'شهادة' : locale === 'en' ? 'Testimonial' : 'Témoignage';

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [next]);

    return (
        <div>
            <div className="relative max-w-3xl mx-auto min-h-[250px] flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="w-full"
                    >
                        <div className="text-center px-6">
                            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 font-light italic">
                                &ldquo;{testimonials[current].quote}&rdquo;
                            </p>
                            <div>
                                <p className="text-white font-semibold font-heading text-base">{testimonials[current].name}</p>
                                <p className="text-gray-500 text-sm">{testimonials[current].role}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`${ariaLabel} ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current
                            ? 'bg-accent-purple w-6'
                            : 'bg-white/[0.12] hover:bg-white/[0.2]'
                            }`}
                    />
                ))}
            </div>
            <div className="sr-only">
                {testimonials.map((t, i) => (
                    <blockquote key={i}>
                        <p>{t.quote}</p>
                        <cite>{t.name}, {t.role}</cite>
                    </blockquote>
                ))}
            </div>
        </div>
    );
}
