import { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/data/services";
import { getAllCitySlugs } from "@/data/cities";
import prisma from "@/lib/prisma";

const locales = ['fr', 'en', 'ar'];
const baseUrl = "https://rankuplus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages — one entry per locale
    const staticSlugs = ['', 'a-propos', 'services', 'portfolio', 'blog', 'contact'];
    const staticPages = locales.flatMap(locale =>
        staticSlugs.map(slug => ({
            url: slug ? `${baseUrl}/${locale}/${slug}` : `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: slug === '' ? 'daily' as const : 'monthly' as const,
            priority: slug === '' ? 1 : 0.8,
        }))
    );

    // Service pages
    const servicePages = locales.flatMap(locale =>
        getAllServiceSlugs().map(slug => ({
            url: `${baseUrl}/${locale}/services/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    // City pages
    const cityPages = locales.flatMap(locale =>
        getAllCitySlugs().map(slug => ({
            url: `${baseUrl}/${locale}/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    );

    // Blog posts from DB
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const posts = await prisma.blogPost.findMany({
            where: { status: 'PUBLISHED' },
            select: { slug: true, updatedAt: true },
        });
        blogPages = locales.flatMap(locale =>
            posts.map(post => ({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: post.updatedAt,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
        );
    } catch { /* DB may not be available at build time */ }

    // Portfolio items from DB
    let portfolioPages: MetadataRoute.Sitemap = [];
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = await (prisma as any).portfolio.findMany({
            where: { isPublished: true },
            select: { slug: true, updatedAt: true },
        }) as { slug: string; updatedAt: Date }[];
        portfolioPages = locales.flatMap(locale =>
            items.map(item => ({
                url: `${baseUrl}/${locale}/portfolio/${item.slug}`,
                lastModified: item.updatedAt,
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }))
        );
    } catch { /* DB may not be available at build time */ }

    // CMS pages from DB
    let cmsPages: MetadataRoute.Sitemap = [];
    try {
        const pages = await prisma.page.findMany({
            where: { isPublished: true, isSystem: false },
            select: { slug: true, updatedAt: true },
        });
        cmsPages = locales.flatMap(locale =>
            pages.map(page => ({
                url: `${baseUrl}/${locale}/p/${page.slug}`,
                lastModified: page.updatedAt,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
        );
    } catch { /* DB may not be available at build time */ }

    return [...staticPages, ...servicePages, ...cityPages, ...blogPages, ...portfolioPages, ...cmsPages];
}
