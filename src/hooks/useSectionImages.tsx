'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SectionImageData {
    imageUrl: string;
    altText: string;
    titleFr: string;
    titleEn: string;
    titleAr: string;
    descFr: string;
    descEn: string;
    descAr: string;
}

type SectionImagesMap = Record<string, SectionImageData>;

const SectionImagesContext = createContext<SectionImagesMap>({});

export function SectionImagesProvider({ children }: { children: ReactNode }) {
    const [images, setImages] = useState<SectionImagesMap>({});

    useEffect(() => {
        fetch('/api/section-images')
            .then(r => r.json())
            .then(setImages)
            .catch(() => { });
    }, []);

    return (
        <SectionImagesContext.Provider value={images}>
            {children}
        </SectionImagesContext.Provider>
    );
}

export function useSectionImages() {
    return useContext(SectionImagesContext);
}

/**
 * Get a specific section image by key
 * @param key - Section key like "home.hero", "about.mission", etc.
 * @param fallback - Fallback image URL if none is set
 * @returns Object with imageUrl, altText, and localized titles/descriptions
 */
export function useSectionImage(key: string, fallback?: string) {
    const images = useContext(SectionImagesContext);
    const img = images[key];
    return {
        imageUrl: img?.imageUrl || fallback || '',
        altText: img?.altText || '',
        titleFr: img?.titleFr || '',
        titleEn: img?.titleEn || '',
        titleAr: img?.titleAr || '',
        descFr: img?.descFr || '',
        descEn: img?.descEn || '',
        descAr: img?.descAr || '',
        hasImage: !!img?.imageUrl,
    };
}
