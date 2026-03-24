export const locales = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
    fr: 'Français',
    en: 'English',
    ar: 'العربية',
};

export const localeFlags: Record<Locale, string> = {
    fr: '🇫🇷',
    en: '🇬🇧',
    ar: '🇲🇦',
};

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
    fr: 'ltr',
    en: 'ltr',
    ar: 'rtl',
};
