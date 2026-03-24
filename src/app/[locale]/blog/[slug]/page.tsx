import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { breadcrumbSchema } from '@/lib/schema';
import { locales, type Locale } from '@/i18n/config';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true } });
    return locales.flatMap(locale => posts.map(p => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const l = locale as Locale;
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return {};

    const title = l === 'en' ? post.metaTitleEn || post.titleEn || post.titleFr
        : l === 'ar' ? post.metaTitleAr || post.titleAr || post.titleFr
            : post.metaTitleFr || post.titleFr;

    const description = l === 'en' ? post.metaDescEn || post.excerptEn || post.excerptFr
        : l === 'ar' ? post.metaDescAr || post.excerptAr || post.excerptFr
            : post.metaDescFr || post.excerptFr;

    const url = `https://rankuplus.com/${locale}/blog/${slug}`;
    return {
        title,
        description,
        keywords: [post.tags || '', 'marketing digital maroc', 'blog seo maroc', 'RankUp'].filter(Boolean),
        alternates: {
            canonical: url,
            languages: {
                fr: `https://rankuplus.com/fr/blog/${slug}`,
                en: `https://rankuplus.com/en/blog/${slug}`,
                ar: `https://rankuplus.com/ar/blog/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_MA',
            siteName: 'RankUp',
            publishedTime: post.publishedAt?.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: ['RankUp'],
            images: post.featuredImage ? [{ url: post.featuredImage, alt: post.imageAlt || title }] : [{ url: 'https://rankuplus.com/og-image.png', width: 1200, height: 630, alt: 'RankUp Blog' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    const l = locale as Locale;

    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: { category: true, author: { select: { name: true } } },
    });

    if (!post || post.status !== 'PUBLISHED') notFound();

    const title = l === 'en' ? post.titleEn || post.titleFr : l === 'ar' ? post.titleAr || post.titleFr : post.titleFr;
    const content = l === 'en' ? post.contentEn || post.contentFr : l === 'ar' ? post.contentAr || post.contentFr : post.contentFr;
    const excerpt = l === 'en' ? post.excerptEn || post.excerptFr : l === 'ar' ? post.excerptAr || post.excerptFr : post.excerptFr;
    const catName = post.category
        ? (l === 'en' ? post.category.nameEn || post.category.nameFr : l === 'ar' ? post.category.nameAr || post.category.nameFr : post.category.nameFr)
        : null;

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString(
            l === 'ar' ? 'ar-MA' : l === 'en' ? 'en-GB' : 'fr-FR',
            { day: '2-digit', month: 'long', year: 'numeric' }
        );
    };

    const articleSchemaData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `https://rankuplus.com/${l}/blog/${slug}#article`,
        headline: title,
        description: excerpt,
        image: post.featuredImage || 'https://rankuplus.com/og-image.png',
        author: { '@type': 'Organization', '@id': 'https://rankuplus.com/#organization', name: post.author?.name || 'RankUp' },
        publisher: { '@type': 'Organization', '@id': 'https://rankuplus.com/#organization', name: 'RankUp', logo: { '@type': 'ImageObject', url: 'https://rankuplus.com/logo.png' } },
        datePublished: post.publishedAt?.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://rankuplus.com/${l}/blog/${slug}` },
        inLanguage: l === 'ar' ? 'ar-MA' : l === 'en' ? 'en' : 'fr-MA',
        wordCount: content ? content.replace(/<[^>]*>/g, '').split(/\s+/).length : undefined,
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema([
                    { name: l === 'ar' ? 'الرئيسية' : l === 'en' ? 'Home' : 'Accueil', url: `https://rankuplus.com/${l}` },
                    { name: 'Blog', url: `https://rankuplus.com/${l}/blog` },
                    { name: title, url: `https://rankuplus.com/${l}/blog/${slug}` },
                ]))
            }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchemaData) }} />

            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-navy-950 overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-12">
                    <Link href={`/${l}/blog`} className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-accent-purple transition-colors mb-8">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {l === 'ar' ? 'العودة إلى المدونة' : l === 'en' ? 'Back to Blog' : 'Retour au Blog'}
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        {catName && (
                            <span className="px-3 py-1 rounded-full bg-accent-purple/15 text-accent-purple text-xs font-semibold uppercase tracking-wider border border-accent-purple/20">
                                {catName}
                            </span>
                        )}
                        {post.tags && post.tags.split(',').slice(0, 3).map(tag => (
                            <span key={tag.trim()} className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-xs">{tag.trim()}</span>
                        ))}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6">
                        {title}
                    </h1>

                    {excerpt && (
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">{excerpt}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-white/[0.06]">
                        <span>{post.author?.name || 'RankUp'}</span>
                        <span>•</span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span>{post.readTime} min</span>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {post.featuredImage && (
                <div className="max-w-4xl mx-auto px-8 lg:px-12 -mt-2 mb-8">
                    <div className="rounded-2xl overflow-hidden aspect-video">
                        <img src={post.featuredImage} alt={post.imageAlt || title} className="w-full h-full object-cover" />
                    </div>
                </div>
            )}

            {/* Article Content */}
            <article className="relative py-12 bg-navy-950" itemScope itemType="https://schema.org/Article">
                <meta itemProp="headline" content={title} />
                <meta itemProp="datePublished" content={post.publishedAt?.toISOString() || ''} />
                <meta itemProp="dateModified" content={post.updatedAt.toISOString()} />
                <div className="max-w-4xl mx-auto px-8 lg:px-12">
                    {content ? (
                        <div
                            itemProp="articleBody"
                            className="prose prose-invert prose-lg max-w-none
                                prose-headings:font-heading prose-headings:text-white
                                prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-a:text-accent-purple prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-white
                                prose-ul:text-gray-300 prose-ol:text-gray-300
                                prose-li:marker:text-accent-purple
                                prose-blockquote:border-accent-purple prose-blockquote:text-gray-400
                                prose-code:text-accent-cyan prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
                                prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <p className="text-gray-500 text-center py-12">
                            {l === 'ar' ? 'المحتوى غير متوفر بهذه اللغة.' : l === 'en' ? 'Content not available in this language.' : 'Contenu non disponible dans cette langue.'}
                        </p>
                    )}
                </div>
            </article>

            {/* Back to blog */}
            <section className="py-16 bg-navy-950">
                <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
                    <Link
                        href={`/${l}/blog`}
                        className="btn-primary"
                    >
                        {l === 'ar' ? 'المزيد من المقالات' : l === 'en' ? 'More articles' : 'Plus d\'articles'}
                        <span className="btn-arrow">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </section>
        </>
    );
}
