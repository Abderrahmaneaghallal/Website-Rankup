import type { Locale } from './config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Locale, () => Promise<any>> = {
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDictionary = async (locale: Locale): Promise<any> => {
    return dictionaries[locale]();
};
