const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    const hashedPassword = await bcryptjs.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@rankuplus.com' },
        update: {},
        create: { email: 'admin@rankuplus.com', password: hashedPassword, name: 'Admin RankUp', role: 'ADMIN' },
    });
    console.log('✅ Admin user:', admin.email);

    const settings = [
        { key: 'site_name', value: 'RankUp' },
        { key: 'site_tagline_fr', value: 'Agence Marketing Digital au Maroc' },
        { key: 'site_tagline_en', value: 'Digital Marketing Agency in Morocco' },
        { key: 'site_tagline_ar', value: 'وكالة تسويق رقمي في المغرب' },
        { key: 'contact_email', value: 'contact@rankuplus.com' },
        { key: 'contact_phone', value: '+212 60 47 78 249' },
        { key: 'whatsapp_number', value: '+212 68 00 88 350' },
        { key: 'facebook_url', value: 'https://facebook.com/rankuplus' },
        { key: 'instagram_url', value: 'https://instagram.com/rankuplus' },
        { key: 'linkedin_url', value: 'https://linkedin.com/company/rankuplus' },
    ];
    for (const s of settings) {
        await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
    }
    console.log('✅ Settings:', settings.length);

    const pages = [
        { slug: 'home', titleFr: 'Accueil', titleEn: 'Home', titleAr: 'الرئيسية', isSystem: true, isPublished: true, sortOrder: 0 },
        { slug: 'a-propos', titleFr: 'À Propos', titleEn: 'About', titleAr: 'من نحن', isSystem: true, isPublished: true, sortOrder: 1 },
        { slug: 'services', titleFr: 'Services', titleEn: 'Services', titleAr: 'خدماتنا', isSystem: true, isPublished: true, sortOrder: 2 },
        { slug: 'portfolio', titleFr: 'Portfolio', titleEn: 'Portfolio', titleAr: 'أعمالنا', isSystem: true, isPublished: true, sortOrder: 3 },
        { slug: 'blog', titleFr: 'Blog', titleEn: 'Blog', titleAr: 'المدونة', isSystem: true, isPublished: true, sortOrder: 4 },
        { slug: 'contact', titleFr: 'Contact', titleEn: 'Contact', titleAr: 'اتصل بنا', isSystem: true, isPublished: true, sortOrder: 5 },
    ];
    for (const p of pages) {
        await prisma.page.upsert({ where: { slug: p.slug }, update: {}, create: p });
    }
    console.log('✅ Pages:', pages.length);

    const cats = [
        { slug: 'strategy', nameFr: 'Stratégie', nameEn: 'Strategy', nameAr: 'استراتيجية' },
        { slug: 'seo', nameFr: 'SEO', nameEn: 'SEO', nameAr: 'تحسين محركات البحث' },
        { slug: 'content-marketing', nameFr: 'Content Marketing', nameEn: 'Content Marketing', nameAr: 'تسويق المحتوى' },
        { slug: 'branding', nameFr: 'Branding', nameEn: 'Branding', nameAr: 'العلامة التجارية' },
        { slug: 'web', nameFr: 'Web', nameEn: 'Web', nameAr: 'الويب' },
        { slug: 'social-media', nameFr: 'Social Media', nameEn: 'Social Media', nameAr: 'وسائل التواصل' },
    ];
    for (const c of cats) {
        await prisma.blogCategory.upsert({ where: { slug: c.slug }, update: {}, create: c });
    }
    console.log('✅ Categories:', cats.length);

    // Portfolio items
    const portfolioItems = [
        {
            slug: 'campagne-reseaux-sociaux-restaurant',
            titleFr: 'Campagne Réseaux Sociaux – Restaurant Casablanca',
            titleEn: 'Social Media Campaign – Casablanca Restaurant',
            titleAr: 'حملة وسائل التواصل – مطعم الدار البيضاء',
            excerptFr: 'Stratégie complète de contenu et gestion des réseaux sociaux ayant multiplié l\'engagement par 4 en 3 mois.',
            excerptEn: 'Full content strategy and social media management that quadrupled engagement in 3 months.',
            excerptAr: 'استراتيجية محتوى شاملة وإدارة وسائل التواصل أدت إلى مضاعفة التفاعل 4 مرات خلال 3 أشهر.',
            clientName: 'Restaurant La Perle',
            industry: 'Restauration',
            tags: 'social-media,content,instagram',
            results: JSON.stringify(['+320% d\'engagement', '+85% de followers', '3× plus de réservations']),
            isFeatured: true,
            isPublished: true,
            sortOrder: 1,
        },
        {
            slug: 'refonte-site-web-boutique',
            titleFr: 'Refonte Site Web – Boutique Mode',
            titleEn: 'Website Redesign – Fashion Boutique',
            titleAr: 'إعادة تصميم الموقع – بوتيك الأزياء',
            excerptFr: 'Création d\'un site e-commerce moderne avec optimisation SEO complète, doublant le trafic organique.',
            excerptEn: 'Modern e-commerce website with full SEO optimization, doubling organic traffic.',
            excerptAr: 'إنشاء موقع تجارة إلكترونية حديث مع تحسين شامل لمحركات البحث، مما ضاعف حركة المرور العضوية.',
            clientName: 'Boutique Élégance',
            industry: 'Mode & Retail',
            tags: 'web,seo,ecommerce',
            results: JSON.stringify(['+120% trafic organique', 'Taux de conversion +45%', 'Page Speed 95+']),
            isFeatured: true,
            isPublished: true,
            sortOrder: 2,
        },
        {
            slug: 'publicite-google-ads-immobilier',
            titleFr: 'Google Ads – Agence Immobilière',
            titleEn: 'Google Ads – Real Estate Agency',
            titleAr: 'إعلانات جوجل – وكالة عقارية',
            excerptFr: 'Campagne Google Ads ciblée générant 3× plus de leads qualifiés pour un coût réduit de 40%.',
            excerptEn: 'Targeted Google Ads campaign generating 3× more qualified leads at 40% lower cost.',
            excerptAr: 'حملة إعلانات جوجل مستهدفة أنتجت 3 أضعاف العملاء المحتملين بتكلفة أقل بـ 40%.',
            clientName: 'Immo Maroc Premium',
            industry: 'Immobilier',
            tags: 'ads,google,leads',
            results: JSON.stringify(['3× plus de leads', 'CPA réduit de 40%', 'ROI 580%']),
            isFeatured: false,
            isPublished: true,
            sortOrder: 3,
        },
        {
            slug: 'branding-startup-tech',
            titleFr: 'Identité Visuelle – Startup Tech',
            titleEn: 'Visual Identity – Tech Startup',
            titleAr: 'الهوية البصرية – شركة تقنية ناشئة',
            excerptFr: 'Création complète de l\'identité visuelle (logo, charte graphique, supports print & digital) pour une startup tech.',
            excerptEn: 'Complete visual identity creation (logo, brand guidelines, print & digital assets) for a tech startup.',
            excerptAr: 'إنشاء هوية بصرية كاملة (شعار، دليل العلامة التجارية، مواد مطبوعة ورقمية) لشركة تقنية ناشئة.',
            clientName: 'TechFlow Solutions',
            industry: 'Technologie',
            tags: 'branding,design,logo',
            results: JSON.stringify(['Logo + Charte graphique', 'Supports print & digital', 'Notoriété +200%']),
            isFeatured: false,
            isPublished: true,
            sortOrder: 4,
        },
        {
            slug: 'seo-cabinet-medical',
            titleFr: 'SEO Local – Cabinet Médical',
            titleEn: 'Local SEO – Medical Practice',
            titleAr: 'تحسين البحث المحلي – عيادة طبية',
            excerptFr: 'Optimisation SEO locale permettant au cabinet de se positionner n°1 sur les recherches locales en 4 mois.',
            excerptEn: 'Local SEO optimization bringing the practice to #1 position on local searches within 4 months.',
            excerptAr: 'تحسين البحث المحلي الذي أوصل العيادة إلى المرتبة الأولى في نتائج البحث المحلية خلال 4 أشهر.',
            clientName: 'Dr. Benali Médecine',
            industry: 'Santé',
            tags: 'seo,local,google-business',
            results: JSON.stringify(['Position #1 locale', '+95% de visites', '4× plus d\'appels']),
            isFeatured: false,
            isPublished: true,
            sortOrder: 5,
        },
        {
            slug: 'shooting-photo-hotel',
            titleFr: 'Shooting Photo & Vidéo – Hôtel 5★',
            titleEn: 'Photo & Video Shoot – 5-Star Hotel',
            titleAr: 'تصوير فوتوغرافي وفيديو – فندق 5 نجوم',
            excerptFr: 'Production complète photo et vidéo pour la refonte des supports marketing d\'un hôtel 5 étoiles à Marrakech.',
            excerptEn: 'Full photo and video production for the marketing refresh of a 5-star hotel in Marrakech.',
            excerptAr: 'إنتاج فوتوغرافي وفيديو كامل لتجديد المواد التسويقية لفندق 5 نجوم في مراكش.',
            clientName: 'Riad Luxe Marrakech',
            industry: 'Hôtellerie & Tourisme',
            tags: 'photo,video,hotel',
            results: JSON.stringify(['+60% taux de réservation', 'Contenus pro utilisés 2 ans', 'Récompense Best Hotel Morocco']),
            isFeatured: true,
            isPublished: true,
            sortOrder: 6,
        },
    ];

    for (const item of portfolioItems) {
        await prisma.portfolio.upsert({
            where: { slug: item.slug },
            update: {},
            create: item,
        });
    }
    console.log('✅ Portfolio items:', portfolioItems.length);

    // Sample contact submission (for testing)
    const sampleContact = await prisma.contactSubmission.create({
        data: {
            name: 'Mohamed Alaoui',
            email: 'mohamed.alaoui@example.com',
            phone: '+212 6 12 34 56 78',
            service: 'social',
            message: 'Bonjour, je souhaite développer la présence de mon restaurant sur les réseaux sociaux. Pouvez-vous me proposer un devis?',
            isRead: false,
        },
    });
    console.log('✅ Sample contact submission:', sampleContact.id);

    console.log('🎉 Done!');
}

main().catch(e => { console.error('❌', e); process.exit(1); }).finally(() => prisma.$disconnect());
