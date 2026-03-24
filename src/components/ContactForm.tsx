'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useLocale } from '@/hooks/useLocale';

function t(locale: string, fr: string, en: string, ar: string) {
    return locale === 'ar' ? ar : locale === 'en' ? en : fr;
}

export default function ContactForm() {
    const locale = useLocale();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const form = e.currentTarget;
        const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;
        if (honeypot) return;

        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
            email: (form.elements.namedItem('email') as HTMLInputElement)?.value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value,
            service: (form.elements.namedItem('service') as HTMLSelectElement)?.value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value,
        };

        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                const body = await res.json();
                setError(body.error || t(locale, 'Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.', 'حدث خطأ. يرجى المحاولة مرة أخرى.'));
            }
        } catch {
            setError(t(locale, 'Erreur réseau. Veuillez réessayer.', 'Network error. Please try again.', 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.'));
        } finally {
            setLoading(false);
        }
    };

    const labels = {
        formTitle: t(locale, 'Envoyez-nous un message', 'Send us a message', 'أرسلوا لنا رسالة'),
        formSubtitle: t(locale, 'Nous vous répondons sous 24 heures.', 'We respond within 24 hours.', 'نرد عليكم خلال 24 ساعة.'),
        fullName: t(locale, 'Nom complet', 'Full name', 'الاسم الكامل'),
        namePlaceholder: t(locale, 'Votre nom', 'Your name', 'اسمكم'),
        email: t(locale, 'Email', 'Email', 'البريد الإلكتروني'),
        phone: t(locale, 'Téléphone', 'Phone', 'الهاتف'),
        service: t(locale, 'Service', 'Service', 'الخدمة'),
        message: t(locale, 'Message', 'Message', 'الرسالة'),
        messagePlaceholder: t(locale, 'Décrivez votre projet...', 'Describe your project...', 'صِفوا مشروعكم...'),
        send: t(locale, 'Envoyer', 'Send', 'إرسال'),
        sending: t(locale, 'Envoi en cours...', 'Sending...', 'جاري الإرسال...'),
        sent: t(locale, 'Message envoyé !', 'Message sent!', 'تم إرسال الرسالة!'),
        sentDesc: t(locale, 'Notre équipe vous contactera très rapidement.', 'Our team will contact you very soon.', 'سيتواصل معكم فريقنا قريباً جداً.'),
        selectService: t(locale, 'Sélectionnez', 'Select', 'اختاروا'),
    };

    const serviceOptions = locale === 'ar' ? [
        { value: 'social', label: 'إدارة وسائل التواصل' },
        { value: 'ads', label: 'الإعلانات الرقمية' },
        { value: 'design', label: 'التصميم الجرافيكي' },
        { value: 'web', label: 'إنشاء المواقع' },
        { value: 'seo', label: 'تحسين محركات البحث' },
        { value: 'photo', label: 'التصوير' },
        { value: 'event', label: 'الفعاليات' },
        { value: 'autre', label: 'أخرى' },
    ] : locale === 'en' ? [
        { value: 'social', label: 'Social Media' },
        { value: 'ads', label: 'Online Advertising' },
        { value: 'design', label: 'Graphic Design' },
        { value: 'web', label: 'Website Creation' },
        { value: 'seo', label: 'SEO' },
        { value: 'photo', label: 'Photography' },
        { value: 'event', label: 'Events' },
        { value: 'autre', label: 'Other' },
    ] : [
        { value: 'social', label: 'Réseaux Sociaux' },
        { value: 'ads', label: 'Publicité en Ligne' },
        { value: 'design', label: 'Design Graphique' },
        { value: 'web', label: 'Création Sites Web' },
        { value: 'seo', label: 'SEO' },
        { value: 'photo', label: 'Photographie' },
        { value: 'event', label: 'Événements' },
        { value: 'autre', label: 'Autre' },
    ];

    return (
        <ScrollReveal>
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.015] p-7 lg:p-10">
                <h3 className="text-xl font-bold text-white font-heading mb-2">{labels.formTitle}</h3>
                <p className="text-gray-500 text-sm mb-8">{labels.formSubtitle}</p>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-14 h-14 mx-auto rounded-full bg-accent-green/10 border border-accent-green/20 flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-white font-heading mb-2">{labels.sent}</h4>
                            <p className="text-gray-400 text-sm">{labels.sentDesc}</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Honeypot */}
                            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                            {error && (
                                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{labels.fullName}</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder={labels.namePlaceholder}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 outline-none focus:border-accent-purple/30 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{labels.email}</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={locale === 'ar' ? 'بريدكم@email.com' : locale === 'en' ? 'your@email.com' : 'votre@email.com'}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 outline-none focus:border-accent-purple/30 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{labels.phone}</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+212 6XX XXX XXX"
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 outline-none focus:border-accent-purple/30 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{labels.service}</label>
                                    <select
                                        id="service"
                                        name="service"
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 text-sm outline-none focus:border-accent-purple/30 transition-colors appearance-none"
                                    >
                                        <option value="">{labels.selectService}</option>
                                        {serviceOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs text-gray-500 uppercase tracking-wider mb-2">{labels.message}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder={labels.messagePlaceholder}
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 outline-none focus:border-accent-purple/30 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full justify-center disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {labels.sending}
                                    </span>
                                ) : (
                                    <>
                                        {labels.send}
                                        <span className="btn-arrow">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </ScrollReveal>
    );
}
