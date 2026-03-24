import prisma from '@/lib/prisma';

/**
 * Server component — injects verification meta tags into <head>.
 * These must be server-rendered for search engines to see them.
 */
export default async function SeoVerificationTags() {
    let verifications: Record<string, string> = {};

    try {
        const settings = await prisma.siteSetting.findMany({
            where: {
                key: {
                    in: [
                        'google_verification',
                        'bing_verification',
                        'yandex_verification',
                        'google_site_kit_verified',
                        'pinterest_verification',
                    ],
                },
            },
        });
        settings.forEach(s => { verifications[s.key] = s.value; });
    } catch {
        // Fail silently — verification tags are not critical
    }

    return (
        <>
            {verifications.google_verification && (
                <meta name="google-site-verification" content={verifications.google_verification} />
            )}
            {verifications.bing_verification && (
                <meta name="msvalidate.01" content={verifications.bing_verification} />
            )}
            {verifications.yandex_verification && (
                <meta name="yandex-verification" content={verifications.yandex_verification} />
            )}
            {verifications.pinterest_verification && (
                <meta name="p:domain_verify" content={verifications.pinterest_verification} />
            )}
            {verifications.google_site_kit_verified && (
                <meta name="google-site-kit" content={verifications.google_site_kit_verified} />
            )}
        </>
    );
}
