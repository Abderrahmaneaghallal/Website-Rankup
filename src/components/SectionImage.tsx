'use client';

import Image from 'next/image';
import { useSectionImage } from '@/hooks/useSectionImages';

interface SectionImageProps {
    sectionKey: string;
    fallback?: string;
    fallbackAlt?: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    sizes?: string;
    priority?: boolean;
    style?: React.CSSProperties;
    /** If true, renders as a div with background-image instead of <Image> */
    asBackground?: boolean;
    children?: React.ReactNode;
}

/**
 * Renders an image from the Section Images system.
 * Uses admin-uploaded images, with fallback to a default image.
 * 
 * Usage:
 *   <SectionImage sectionKey="about.mission" fallback="/images/default.png" fill className="object-cover" />
 *   <SectionImage sectionKey="home.hero" asBackground className="absolute inset-0">
 *     <div>Overlay content</div>
 *   </SectionImage>
 */
export default function SectionImage({
    sectionKey,
    fallback = '',
    fallbackAlt = '',
    className = '',
    fill = false,
    width,
    height,
    sizes,
    priority = false,
    style,
    asBackground = false,
    children,
}: SectionImageProps) {
    const { imageUrl, altText, hasImage } = useSectionImage(sectionKey, fallback);

    if (!imageUrl && !fallback) return null;

    const src = imageUrl || fallback;
    const alt = altText || fallbackAlt || sectionKey;

    if (asBackground) {
        return (
            <div
                className={className}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    ...style,
                }}
            >
                {children}
            </div>
        );
    }

    if (fill) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                className={className}
                sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
                priority={priority}
                style={style}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 400}
            className={className}
            sizes={sizes}
            priority={priority}
            style={style}
        />
    );
}
