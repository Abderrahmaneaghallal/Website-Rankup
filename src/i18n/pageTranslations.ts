/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper: picks locale from map
function t(locale: string, fr: string, en: string, ar: string): string {
    return locale === 'ar' ? ar : locale === 'en' ? en : fr;
}

// ─── ABOUT PAGE ─────────────────────────────────────────────
export function getAboutPageData(locale: string) {
    return {
        hero: {
            badge: t(locale, 'À Propos de RankUp', 'About RankUp', 'حول رانك أب'),
            title: t(locale, "Agence Marketing Digital au Maroc —", 'Digital Marketing Agency in Morocco —', 'وكالة تسويق رقمي في المغرب —'),
            highlight: t(locale, 'Votre Partenaire à Agadir', 'Your Partner in Agadir', 'شريككم في أكادير'),
            subtitle: t(locale,
                "Depuis 2020, RankUp accompagne les entreprises à Casablanca, Marrakech, Agadir et Rabat dans leur transformation digitale avec une approche unique combinant expertise technique, créativité et orientation résultats.",
                "Since 2020, RankUp has been supporting businesses in Casablanca, Marrakech, Agadir and Rabat in their digital transformation with a unique approach combining technical expertise, creativity and results orientation.",
                "منذ 2020، ترافق رانك أب الشركات في الدار البيضاء ومراكش وأكادير والرباط في تحولها الرقمي بنهج فريد يجمع بين الخبرة التقنية والإبداع والتوجه نحو النتائج."
            ),
        },
        ticker: t(locale, 'PASSION • RÉSULTATS • INNOVATION • EXCELLENCE •', 'PASSION • RESULTS • INNOVATION • EXCELLENCE •', 'شغف • نتائج • ابتكار • تميز •'),
        mission: {
            badge: t(locale, 'Notre Mission', 'Our Mission', 'مهمتنا'),
            title: t(locale, 'Transformer le paysage digital au', 'Transform the digital landscape in', 'تحويل المشهد الرقمي في'),
            highlight: t(locale, 'Maroc', 'Morocco', 'المغرب'),
            p1: t(locale,
                "RankUp est née d'une conviction forte : les entreprises à Casablanca, Marrakech, Rabat et Agadir méritent un marketing digital de classe mondiale, accessible et orienté résultats.",
                "RankUp was born from a strong conviction: businesses in Casablanca, Marrakech, Rabat and Agadir deserve world-class digital marketing that is accessible and results-oriented.",
                "وُلدت رانك أب من قناعة راسخة: الشركات في الدار البيضاء ومراكش والرباط وأكادير تستحق تسويقاً رقمياً عالمي المستوى وميسّراً وموجهاً نحو النتائج."
            ),
            p2: t(locale,
                "Notre mission est d'accompagner les entrepreneurs, les PME et les grandes entreprises dans tout le Maroc dans leur conquête du digital — avec des résultats concrets et mesurables.",
                "Our mission is to support entrepreneurs, SMEs and large companies across Morocco in their digital conquest — with concrete and measurable results.",
                "مهمتنا هي دعم رواد الأعمال والشركات الصغيرة والمتوسطة والكبيرة في جميع أنحاء المغرب في غزوها الرقمي — بنتائج ملموسة وقابلة للقياس."
            ),
            stats: [
                { value: 1600, suffix: '+', label: t(locale, 'Projets réalisés', 'Completed projects', 'مشاريع منجزة') },
                { value: 1215, suffix: '+', label: t(locale, 'Entreprises accompagnées', 'Supported businesses', 'شركات مرافَقة') },
                { value: 20, suffix: '+', label: t(locale, 'Pays', 'Countries', 'بلدان') },
                { value: 240, suffix: 'M+', label: t(locale, 'MAD Revenus générés', 'MAD Revenue generated', 'درهم إيرادات') },
            ],
        },
        team: {
            badge: t(locale, 'Notre Équipe', 'Our Team', 'فريقنا'),
            title: t(locale, 'Des experts <span class="gradient-text">pluridisciplinaires</span>', 'Multi-disciplinary <span class="gradient-text">experts</span>', 'خبراء <span class="gradient-text">متعددو التخصصات</span>'),
            subtitle: t(locale,
                "Chaque membre de notre équipe est un expert dans son domaine. Ensemble, nous formons une équipe complémentaire capable de gérer tous les aspects de votre stratégie digitale.",
                "Each member of our team is an expert in their field. Together, we form a complementary team capable of managing all aspects of your digital strategy.",
                "كل عضو في فريقنا خبير في مجاله. معاً نشكل فريقاً متكاملاً قادراً على إدارة جميع جوانب استراتيجيتكم الرقمية."
            ),
        },
        expertises: locale === 'ar' ? [
            { icon: '🔍', title: 'خبراء SEO', description: 'خبراء تحسين محركات البحث معتمدون ومتخصصون في السوق المغربي والدولي.' },
            { icon: '📢', title: 'متخصصو إعلانات', description: 'مديرو حملات Google Ads وSocial Ads معتمدون بعائد استثمار متوسط +350%.' },
            { icon: '🎨', title: 'مصممون مبدعون', description: 'مديرون فنيون ومصممو UI/UX شغوفون بالهويات البصرية المتميزة.' },
            { icon: '💻', title: 'مطورو ويب', description: 'مطورون full-stack متخصصون في مواقع عالية الأداء وصديقة لـ SEO ومتجاوبة.' },
            { icon: '📱', title: 'مديرو مجتمع', description: 'خبراء في وسائل التواصل الاجتماعي يبنون ويديرون مجتمعات متفاعلة.' },
            { icon: '✍️', title: 'كتّاب SEO', description: 'كتّاب محتوى متخصصون في كتابة محتوى SEO محسّن يحوّل ويصنّف.' },
        ] : locale === 'en' ? [
            { icon: '🔍', title: 'SEO Strategists', description: 'Certified SEO experts specialized in the Moroccan and international market.' },
            { icon: '📢', title: 'Ads Specialists', description: 'Certified Google Ads and Social Ads campaign managers with an average ROI of +350%.' },
            { icon: '🎨', title: 'Creative Designers', description: 'Art directors and UI/UX designers passionate about premium visual identities.' },
            { icon: '💻', title: 'Web Developers', description: 'Full-stack developers specialized in high-performance, SEO-friendly, responsive websites.' },
            { icon: '📱', title: 'Community Managers', description: 'Social media experts who build and manage engaged communities.' },
            { icon: '✍️', title: 'SEO Writers', description: 'Copywriters specialized in optimized SEO content that converts and ranks.' },
        ] : [
            { icon: '🔍', title: 'Stratèges SEO', description: 'Experts en référencement naturel certifiés, spécialisés dans le marché marocain et international.' },
            { icon: '📢', title: 'Spécialistes Ads', description: 'Gestionnaires de campagnes Google Ads et Social Ads certifiés avec un ROI moyen de +350%.' },
            { icon: '🎨', title: 'Designers Créatifs', description: 'Directeurs artistiques et designers UI/UX passionnés par les identités visuelles premium.' },
            { icon: '💻', title: 'Développeurs Web', description: 'Développeurs full-stack spécialisés en sites performants, SEO-friendly et responsive.' },
            { icon: '📱', title: 'Community Managers', description: 'Experts en réseaux sociaux qui construisent et animent des communautés engagées.' },
            { icon: '✍️', title: 'Rédacteurs SEO', description: 'Copywriters spécialisés en contenu SEO optimisé qui convertit et positionne.' },
        ],
        values: {
            badge: t(locale, 'Nos Valeurs', 'Our Values', 'قيمنا'),
            title: t(locale, 'Ce qui nous <span class="gradient-text">définit</span>', 'What <span class="gradient-text">defines us</span>', 'ما <span class="gradient-text">يميّزنا</span>'),
            subtitle: t(locale,
                'Nos valeurs fondamentales guident chaque décision et chaque stratégie.',
                'Our core values guide every decision and every strategy.',
                'قيمنا الأساسية توجه كل قرار وكل استراتيجية.'
            ),
            items: locale === 'ar' ? [
                { icon: '🎯', title: 'التوجه نحو النتائج', description: 'كل إجراء نتخذه مصمم ومقاس حسب تأثيره الفعلي على عملكم.' },
                { icon: '🔬', title: 'الابتكار المستمر', description: 'نستثمر باستمرار في تدريب فريقنا واستكشاف التقنيات الجديدة.' },
                { icon: '🤝', title: 'الشفافية التامة', description: 'لا وعود فارغة. نتواصل بوضوح حول أعمالنا ونتائجنا وتوصياتنا.' },
                { icon: '❤️', title: 'الشغف والالتزام', description: 'نحن شغوفون بالتسويق الرقمي وملتزمون بعمق بنجاح كل مشروع.' },
            ] : locale === 'en' ? [
                { icon: '🎯', title: 'Results Orientation', description: 'Every action we take is designed and measured by its real impact on your business.' },
                { icon: '🔬', title: 'Continuous Innovation', description: 'We continuously invest in training our team and exploring new technologies.' },
                { icon: '🤝', title: 'Total Transparency', description: 'No empty promises. We communicate clearly about our actions, results and recommendations.' },
                { icon: '❤️', title: 'Passion & Commitment', description: 'We are passionate about digital marketing and deeply committed to the success of every project.' },
            ] : [
                { icon: '🎯', title: 'Orientation Résultats', description: "Chaque action que nous menons est pensée et mesurée en fonction de son impact réel sur votre business." },
                { icon: '🔬', title: 'Innovation Continue', description: "Le digital évolue à une vitesse fulgurante. Nous investissons continuellement dans la formation de notre équipe." },
                { icon: '🤝', title: 'Transparence Totale', description: "Pas de promesses vides, pas de jargon technique opaque. Nous communiquons clairement sur nos actions." },
                { icon: '❤️', title: 'Passion et Engagement', description: "Nous sommes passionnés par le marketing digital et profondément engagés dans la réussite de chaque projet." },
            ],
        },
        certs: {
            badge: 'Certifications',
            title: t(locale, "Partenaires d'Excellence <span class=\"gradient-text\">Certifiés</span>", 'Certified Partners of <span class="gradient-text">Excellence</span>', 'شركاء التميز <span class="gradient-text">المعتمدون</span>'),
            subtitle: t(locale, "Nos certifications attestent d'un niveau d'expertise technique conforme aux standards les plus élevés.", 'Our certifications attest to a level of technical expertise that meets the highest industry standards.', 'شهاداتنا تشهد على مستوى خبرة تقنية يتوافق مع أعلى معايير الصناعة.'),
        },
        journey: {
            badge: t(locale, 'Notre Parcours', 'Our Journey', 'مسيرتنا'),
            title: t(locale, "L'histoire de <span class=\"gradient-text\">RankUp</span>", 'The story of <span class="gradient-text">RankUp</span>', 'قصة <span class="gradient-text">رانك أب</span>'),
            subtitle: t(locale, "Découvrez les étapes clés de notre croissance.", 'Discover the key milestones of our growth.', 'اكتشفوا المراحل الرئيسية لنمونا.'),
        },
        timeline: locale === 'ar' ? [
            { year: '2020', title: 'تأسيس رانك أب', description: 'تأسيس الوكالة في أكادير برؤية لتحويل مشهد التسويق الرقمي في المغرب.' },
            { year: '2021', title: 'توسيع الخدمات', description: 'توسيع عرضنا بإضافة خدمات الإعلانات والتصميم الجرافيكي وإنشاء المواقع.' },
            { year: '2022', title: 'نمو متسارع', description: 'تجاوز 50 شركة مرافَقة والتوسع في الدار البيضاء والرباط.' },
            { year: '2023', title: 'اعتراف وطني', description: 'الاعتراف كواحدة من أكثر وكالات التسويق الرقمي أداءً في المغرب.' },
            { year: '2024', title: 'توسع دولي', description: 'بدء التوسع الدولي مع عملاء في 5 دول.' },
            { year: '2025', title: 'رؤية 2025+', description: 'طموح أن نصبح المرجع في التسويق الرقمي في شمال أفريقيا.' },
        ] : locale === 'en' ? [
            { year: '2020', title: 'RankUp Founded', description: 'Agency founded in Agadir with the vision of transforming the digital marketing landscape in Morocco.' },
            { year: '2021', title: 'Service Expansion', description: 'Broadening our offering with online advertising, graphic design and website creation services.' },
            { year: '2022', title: 'Accelerated Growth', description: 'Surpassing 50 supported companies and expanding presence to Casablanca and Rabat.' },
            { year: '2023', title: 'National Recognition', description: 'Recognized as one of the top-performing digital marketing agencies in Morocco.' },
            { year: '2024', title: 'International Expansion', description: 'Beginning international expansion with clients in 5 countries.' },
            { year: '2025', title: 'Vision 2025+', description: 'Ambition to become the digital marketing reference in North Africa.' },
        ] : [
            { year: '2020', title: 'Création de RankUp', description: "Fondation de l'agence à Agadir avec la vision de transformer le paysage du marketing digital au Maroc." },
            { year: '2021', title: 'Expansion des services', description: "Élargissement de notre offre avec l'ajout des services de publicité en ligne, design graphique et création de sites web." },
            { year: '2022', title: 'Croissance accélérée', description: "Franchissement du cap des 50 entreprises accompagnées et expansion à Casablanca et Rabat." },
            { year: '2023', title: 'Reconnaissance nationale', description: "Reconnaissance comme l'une des agences marketing digitales les plus performantes au Maroc." },
            { year: '2024', title: 'Expansion internationale', description: "Début de notre expansion internationale avec des clients dans 5 pays." },
            { year: '2025', title: 'Vision 2025+', description: "Ambition de devenir la référence du marketing digital en Afrique du Nord." },
        ],
        faqBadge: 'FAQ',
        faqTitle: t(locale, 'Questions sur <span class="gradient-text">RankUp</span>', 'Questions about <span class="gradient-text">RankUp</span>', 'أسئلة حول <span class="gradient-text">رانك أب</span>'),
        faqs: locale === 'ar' ? [
            { question: 'منذ متى توجد رانك أب؟', answer: 'تأسست رانك أب في 2020 في أكادير بالمغرب. منذ تأسيسها لم تتوقف عن النمو.' },
            { question: 'كم عدد أعضاء فريق رانك أب؟', answer: 'يتكون فريقنا من محترفين شغوفين يغطون جميع تخصصات التسويق الرقمي.' },
            { question: 'ما هي شهادات رانك أب؟', answer: 'يحمل فريقنا أبرز شهادات الصناعة: Google Ads, Google Analytics, Meta Blueprint, HubSpot, SEMrush.' },
        ] : locale === 'en' ? [
            { question: 'How long has RankUp existed?', answer: 'RankUp was founded in 2020 in Agadir, Morocco. Since its creation, the agency has continued to grow.' },
            { question: 'How many people make up the RankUp team?', answer: 'Our team consists of passionate professionals covering all digital marketing expertise areas.' },
            { question: 'What certifications does RankUp hold?', answer: 'Our team holds the most recognized industry certifications: Google Ads, Google Analytics, Meta Blueprint, HubSpot, SEMrush.' },
        ] : [
            { question: "Depuis quand RankUp existe-t-elle ?", answer: "RankUp a été fondée en 2020 à Agadir, au Maroc. Depuis sa création, l'agence n'a cessé de croître." },
            { question: "Combien de personnes composent l'équipe RankUp ?", answer: "Notre équipe est composée de professionnels passionnés couvrant l'ensemble des expertises du marketing digital." },
            { question: "Quelles sont les certifications de RankUp ?", answer: "Notre équipe détient les certifications les plus reconnues de l'industrie : Google Ads, Google Analytics, Meta Blueprint, HubSpot, SEMrush." },
        ],
        ctaTitle: t(locale, 'Prêt à écrire votre success story ?', 'Ready to write your success story?', 'مستعدون لكتابة قصة نجاحكم؟'),
        ctaSubtitle: t(locale, "Rejoignez les 1 215+ entreprises qui ont fait confiance à RankUp.", "Join the 1,215+ companies that have trusted RankUp.", "انضموا إلى أكثر من 1215 شركة وثقت في رانك أب."),
    };
}

// ─── CONTACT PAGE ───────────────────────────────────────────
export function getContactPageData(locale: string) {
    return {
        hero: {
            badge: 'Contact',
            title: t(locale, 'Agence de Communication Digitale au Maroc —', 'Digital Communication Agency in Morocco —', 'وكالة تواصل رقمي في المغرب —'),
            highlight: t(locale, 'Parlons de Votre Projet à Agadir', 'Let\'s Talk About Your Project in Agadir', 'لنتحدث عن مشروعكم في أكادير'),
            subtitle: t(locale,
                "Contactez RankUp pour discuter de vos besoins en marketing digital. Notre équipe d'experts vous répond sous 24 heures.",
                "Contact RankUp to discuss your digital marketing needs. Our team of experts responds within 24 hours.",
                "تواصلوا مع رانك أب لمناقشة احتياجاتكم في التسويق الرقمي. فريقنا يرد خلال 24 ساعة."
            ),
            cta: 'WhatsApp',
        },
        contactInfoTitle: t(locale, 'Coordonnées', 'Contact Details', 'معلومات الاتصال'),
        contactInfoDesc: t(locale,
            "Contactez-nous et découvrez la différence RankUp.",
            "Contact us and discover the RankUp difference.",
            "تواصلوا معنا واكتشفوا فرق رانك أب."
        ),
        trustPoints: locale === 'ar' ? [
            { icon: '✅', text: 'رد مضمون خلال 24 ساعة' },
            { icon: '🆓', text: 'تدقيق رقمي مجاني بدون التزام' },
            { icon: '📊', text: 'عرض أسعار مخصص خلال 48 ساعة' },
            { icon: '🤝', text: 'مكالمة استكشافية مجانية 30 دقيقة' },
            { icon: '🔒', text: 'سرية تامة مضمونة' },
            { icon: '🌍', text: 'خدمة متاحة في جميع أنحاء المغرب' },
        ] : locale === 'en' ? [
            { icon: '✅', text: 'Guaranteed response within 24 hours' },
            { icon: '🆓', text: 'Free digital audit with no commitment' },
            { icon: '📊', text: 'Custom quote within 48 hours' },
            { icon: '🤝', text: 'Free 30-minute discovery call' },
            { icon: '🔒', text: 'Total confidentiality assured' },
            { icon: '🌍', text: 'Service available across Morocco' },
        ] : [
            { icon: '✅', text: 'Réponse garantie sous 24 heures' },
            { icon: '🆓', text: 'Audit digital gratuit sans engagement' },
            { icon: '📊', text: 'Devis personnalisé sous 48 heures' },
            { icon: '🤝', text: 'Appel de découverte de 30 minutes offert' },
            { icon: '🔒', text: 'Confidentialité totale assurée' },
            { icon: '🌍', text: 'Service disponible dans tout le Maroc' },
        ],
        contactLabels: {
            address: t(locale, 'Adresse', 'Address', 'العنوان'),
            email: t(locale, 'Email', 'Email', 'البريد الإلكتروني'),
            phone: t(locale, 'Téléphone', 'Phone', 'الهاتف'),
        },
        hours: {
            title: t(locale, "Horaires d'ouverture", 'Business Hours', 'ساعات العمل'),
            schedule: t(locale, 'Lundi – Samedi : 9h00 – 17h00', 'Monday – Saturday: 9:00 AM – 5:00 PM', 'الإثنين – السبت: 9:00 – 17:00'),
            closed: t(locale, 'Dimanche : Fermé', 'Sunday: Closed', 'الأحد: مغلق'),
        },
        offices: {
            badge: t(locale, 'Nos Bureaux', 'Our Offices', 'مكاتبنا'),
            title: t(locale, 'Présents dans les <span class="gradient-text">grandes villes du Maroc</span>', 'Present in Morocco\'s <span class="gradient-text">major cities</span>', 'متواجدون في <span class="gradient-text">المدن الكبرى بالمغرب</span>'),
            subtitle: t(locale, "Notre réseau de bureaux couvre les principales villes du Royaume.", "Our office network covers the main cities of the Kingdom.", "شبكة مكاتبنا تغطي المدن الرئيسية للمملكة."),
        },
        officeLocations: locale === 'ar' ? [
            { city: 'أكادير', emoji: '🌊', type: 'المقر الرئيسي', address: 'شارع قرسيف، 80026' },
            { city: 'الدار البيضاء', emoji: '🏙️', type: 'مكتب إقليمي', address: 'مركز الأعمال' },
            { city: 'مراكش', emoji: '🕌', type: 'مكتب إقليمي', address: 'جيليز' },
            { city: 'الرباط', emoji: '🏛️', type: 'مكتب إقليمي', address: 'أكدال' },
        ] : locale === 'en' ? [
            { city: 'Agadir', emoji: '🌊', type: 'Headquarters', address: 'Rue Guercif, 80026' },
            { city: 'Casablanca', emoji: '🏙️', type: 'Regional Office', address: 'Business Center' },
            { city: 'Marrakech', emoji: '🕌', type: 'Regional Office', address: 'Guéliz' },
            { city: 'Rabat', emoji: '🏛️', type: 'Regional Office', address: 'Agdal' },
        ] : [
            { city: 'Agadir', emoji: '🌊', type: 'Siège Social', address: 'Rue Guercif, 80026' },
            { city: 'Casablanca', emoji: '🏙️', type: 'Bureau Régional', address: "Centre d'Affaires" },
            { city: 'Marrakech', emoji: '🕌', type: 'Bureau Régional', address: 'Guéliz' },
            { city: 'Rabat', emoji: '🏛️', type: 'Bureau Régional', address: 'Agdal' },
        ],
        engagement: {
            title: t(locale, 'Notre <span class="gradient-text">Engagement</span> envers Vous', 'Our <span class="gradient-text">Commitment</span> to You', '<span class="gradient-text">التزامنا</span> تجاهكم'),
            whatsappText: t(locale, '💬 Discutons sur WhatsApp', '💬 Let\'s chat on WhatsApp', '💬 لنتحدث عبر واتساب'),
        },
        faq: {
            badge: 'FAQ',
            title: t(locale, 'Questions sur le <span class="gradient-text">Contact</span>', 'Questions about <span class="gradient-text">Contact</span>', 'أسئلة حول <span class="gradient-text">التواصل</span>'),
            subtitle: t(locale, "Tout ce que vous devez savoir avant de nous contacter.", "Everything you need to know before contacting us.", "كل ما تحتاجون معرفته قبل التواصل معنا."),
        },
        faqs: locale === 'ar' ? [
            { question: 'ما هو وقت الرد بعد أول تواصل؟', answer: 'نلتزم بالرد على أي طلب خلال 24 ساعة عمل كحد أقصى.' },
            { question: 'كيف يتم اللقاء الأول مع رانك أب؟', answer: 'اللقاء الأول هو مكالمة استكشافية مجانية مدتها 30 دقيقة.' },
            { question: 'هل تقدمون تدقيقاً مجانياً قبل البدء؟', answer: 'نعم، نقدم تدقيقاً رقمياً مجانياً لكل عميل محتمل جديد.' },
        ] : locale === 'en' ? [
            { question: 'What is the response time after first contact?', answer: 'We commit to responding to any request within a maximum of 24 business hours.' },
            { question: 'How does the first meeting with RankUp work?', answer: 'The first meeting is a free 30-minute discovery call.' },
            { question: 'Do you offer a free audit before starting?', answer: 'Yes, we offer a free digital audit for every new prospect.' },
        ] : [
            { question: "Quel est le délai de réponse après un premier contact ?", answer: "Nous nous engageons à répondre à toute demande dans un délai maximum de 24 heures ouvrées." },
            { question: "Comment se déroule le premier rendez-vous avec RankUp ?", answer: "Le premier rendez-vous est un appel de découverte gratuit de 30 minutes." },
            { question: "Proposez-vous un audit gratuit avant de démarrer ?", answer: "Oui, nous offrons un audit digital gratuit pour tout nouveau prospect." },
        ],
    };
}

// ─── SERVICES PAGE ──────────────────────────────────────────
export function getServicesPageData(locale: string) {
    return {
        hero: {
            badge: t(locale, 'Nos Services', 'Our Services', 'خدماتنا'),
            title: t(locale, 'Agence Marketing Digital au Maroc —', 'Digital Marketing Agency in Morocco —', 'وكالة تسويق رقمي في المغرب —'),
            highlight: t(locale, 'Solutions Digitales à Agadir', 'Digital Solutions in Agadir', 'حلول رقمية في أكادير'),
            subtitle: t(locale,
                "Du SEO à la publicité en ligne, en passant par le branding et la création de sites web, RankUp couvre l'ensemble de vos besoins en marketing digital.",
                "From SEO to online advertising, through branding and website creation, RankUp covers all your digital marketing needs.",
                "من SEO إلى الإعلانات الرقمية مروراً بالعلامات التجارية وإنشاء المواقع، رانك أب تغطي جميع احتياجاتكم في التسويق الرقمي."
            ),
        },
        resultsBadge: t(locale, 'Résultats Concrets & Mesurables', 'Concrete & Measurable Results', 'نتائج ملموسة وقابلة للقياس'),
        resultsTitle: t(locale, "L'impact de nos <span class=\"gradient-text\">solutions digitales</span>", 'The impact of our <span class="gradient-text">digital solutions</span>', 'تأثير <span class="gradient-text">حلولنا الرقمية</span>'),
        metrics: [
            { value: 35, suffix: '%', label: t(locale, 'Augmentation du taux de conversion', 'Conversion rate increase', 'زيادة معدل التحويل'), icon: '📈' },
            { value: 2200, suffix: '%', label: t(locale, 'Croissance en visibilité et trafic', 'Visibility & traffic growth', 'نمو في الظهور وحركة المرور'), icon: '🚀' },
            { value: 280, suffix: '%', label: t(locale, 'Augmentation du taux de clics (CTR)', 'Click-through rate (CTR) increase', 'زيادة معدل النقر (CTR)'), icon: '🎯' },
            { value: 24, suffix: 'h', label: t(locale, 'Délai de réponse garanti', 'Guaranteed response time', 'وقت استجابة مضمون'), icon: '⏱️' },
        ],
        servicesBadge: t(locale, 'Ce que nous faisons', 'What We Do', 'ما نقوم به'),
        servicesTitle: t(locale, "9 expertises au service de votre <span class=\"gradient-text\">croissance</span>", '9 areas of expertise for your <span class="gradient-text">growth</span>', '9 مجالات خبرة لخدمة <span class="gradient-text">نموكم</span>'),
        servicesSubtitle: t(locale, "Chaque service est conçu pour avoir un impact direct et mesurable.", "Each service is designed to have a direct and measurable impact.", "كل خدمة مصممة لتأثير مباشر وقابل للقياس."),
        servicesData: locale === 'ar' ? [
            { icon: '📱', title: 'إدارة وسائل التواصل الاجتماعي', description: 'استراتيجية وسائل التواصل وإنشاء المحتوى وإدارة المجتمع على Instagram وFacebook وTikTok وLinkedIn.', href: '/services/reseaux-sociaux' },
            { icon: '📢', title: 'الإعلانات الرقمية', description: 'حملات Google Ads وFacebook Ads وInstagram Ads المحسّنة لتوليد عملاء مؤهلين.', href: '/services/publicite-en-ligne' },
            { icon: '🎨', title: 'التصميم الجرافيكي', description: 'إنشاء هوية بصرية وشعارات ودلائل علامة تجارية للعلامات التجارية.', href: '/services/design-graphique' },
            { icon: '🌐', title: 'إنشاء المواقع الإلكترونية', description: 'مواقع حديثة ومتجاوبة ومحسّنة لـ SEO.', href: '/services/creation-sites-web' },
            { icon: '🚀', title: 'تحسين محركات البحث (SEO)', description: 'تدقيق SEO وتحسين تقني واستراتيجية محتوى لتصدر نتائج Google.', href: '/services/referencement-naturel' },
            { icon: '📸', title: 'التصوير الاحترافي', description: 'تصوير احترافي للشركات والمنتجات والفعاليات مع معالجة احترافية.', href: '/services/photographie' },
            { icon: '🎪', title: 'إدارة الفعاليات الرقمية', description: 'تصميم وترويج وتغطية الفعاليات لتعظيم التأثير والمشاركة.', href: '/services/gestion-evenements' },
            { icon: '✍️', title: 'كتابة المحتوى', description: 'كتابة محتوى جذاب ومحسّن لـ SEO للمواقع والحملات والشبكات الاجتماعية.', href: '/services/copywriting' },
            { icon: '📧', title: 'التسويق عبر البريد الإلكتروني', description: 'حملات بريد إلكتروني مخصصة تحفز المبيعات وتعزز ولاء العملاء.', href: '/services/email-marketing' },
        ] : locale === 'en' ? [
            { icon: '📱', title: 'Social Media Management', description: 'Social media strategy, content creation, community management on Instagram, Facebook, TikTok and LinkedIn.', href: '/services/reseaux-sociaux' },
            { icon: '📢', title: 'Online Advertising', description: 'Optimized Google Ads, Facebook Ads, Instagram Ads campaigns to generate qualified leads.', href: '/services/publicite-en-ligne' },
            { icon: '🎨', title: 'Graphic Design', description: 'Visual identity creation, logos, brand guidelines for brands.', href: '/services/design-graphique' },
            { icon: '🌐', title: 'Website Creation', description: 'Modern, responsive, SEO-optimized websites.', href: '/services/creation-sites-web' },
            { icon: '🚀', title: 'Search Engine Optimization (SEO)', description: 'SEO audit, technical optimization and content strategy to rank on Google\'s first page.', href: '/services/referencement-naturel' },
            { icon: '📸', title: 'Professional Photography', description: 'Professional corporate, product and event photography with expert retouching.', href: '/services/photographie' },
            { icon: '🎪', title: 'Digital Event Management', description: 'Event design, digital promotion and coverage to maximize impact.', href: '/services/gestion-evenements' },
            { icon: '✍️', title: 'Copywriting & Content', description: 'Captivating and SEO-optimized content for websites, campaigns and social media.', href: '/services/copywriting' },
            { icon: '📧', title: 'Email Marketing', description: 'Personalized email campaigns that drive sales and build customer loyalty.', href: '/services/email-marketing' },
        ] : [
            { icon: '📱', title: 'Gestion des Réseaux Sociaux', description: "Stratégie social media, création de contenu, community management et publicité sur Instagram, Facebook, TikTok et LinkedIn.", href: '/services/reseaux-sociaux' },
            { icon: '📢', title: 'Publicité en Ligne', description: "Campagnes Google Ads, Facebook Ads, Instagram Ads optimisées pour générer des clients qualifiés et maximiser votre ROI.", href: '/services/publicite-en-ligne' },
            { icon: '🎨', title: 'Design Graphique', description: "Création d'identité visuelle, logos, chartes graphiques, supports print et digital pour les marques.", href: '/services/design-graphique' },
            { icon: '🌐', title: 'Création de Sites Web', description: "Sites web modernes, responsive et optimisés SEO : sites vitrines, e-commerce, landing pages.", href: '/services/creation-sites-web' },
            { icon: '🚀', title: 'Référencement Naturel (SEO)', description: "Audit SEO, optimisation technique, stratégie de contenu et link building pour positionner votre site en première page Google.", href: '/services/referencement-naturel' },
            { icon: '📸', title: 'Photographie Professionnelle', description: "Photographie corporate, produits, événements, immobilier et lifestyle avec retouche professionnelle.", href: '/services/photographie' },
            { icon: '🎪', title: "Gestion d'Événements Digitaux", description: "Conception, promotion digitale et couverture d'événements pour maximiser l'impact et la participation.", href: '/services/gestion-evenements' },
            { icon: '✍️', title: 'Copywriting & Contenu', description: "Rédaction de contenu captivant et optimisé SEO pour sites web, campagnes publicitaires et réseaux sociaux.", href: '/services/copywriting' },
            { icon: '📧', title: 'Email Marketing', description: "Campagnes d'emailing personnalisées qui stimulent les ventes et fidélisent votre clientèle.", href: '/services/email-marketing' },
        ],
        faqBadge: 'FAQ',
        faqTitle: t(locale, 'Questions sur nos <span class="gradient-text">Services</span>', 'Questions about our <span class="gradient-text">Services</span>', 'أسئلة حول <span class="gradient-text">خدماتنا</span>'),
        faqs: locale === 'ar' ? [
            { question: 'كيف أختار الخدمة الأنسب لشركتي؟', answer: 'الاختيار يعتمد على أهدافكم وقطاعكم وميزانيتكم. خلال مكالمة الاستكشاف المجانية نحلل معاً احتياجاتكم.' },
            { question: 'هل تقدمون باقات تجمع عدة خدمات؟', answer: 'نعم، صيغنا Startup وRankUp وGrowth تجمع عدة خدمات لمرافقة شاملة.' },
            { question: 'ما النتائج المتوقعة وفي كم من الوقت؟', answer: 'الإعلانات تولد نتائج في الأسابيع الأولى، وسائل التواصل خلال 1-2 شهر، وSEO خلال 3-6 أشهر.' },
        ] : locale === 'en' ? [
            { question: 'How do I choose the right service for my business?', answer: 'The choice depends on your goals, sector and budget. During our free discovery call we analyze your needs together.' },
            { question: 'Do you offer packages combining multiple services?', answer: 'Yes, our Startup, RankUp and Growth plans combine several services for comprehensive support.' },
            { question: 'What results can I expect and in how long?', answer: 'Online advertising generates results from the first weeks, social media within 1-2 months, and SEO within 3-6 months.' },
        ] : [
            { question: "Comment choisir le service le plus adapté à mon entreprise ?", answer: "Le choix dépend de vos objectifs, votre secteur et votre budget. Lors de notre appel de découverte gratuit, nous analysons ensemble vos besoins." },
            { question: "Proposez-vous des packages combinant plusieurs services ?", answer: "Oui, nos formules Startup, RankUp et Growth combinent plusieurs services pour un accompagnement complet." },
            { question: "Quels résultats puis-je espérer et en combien de temps ?", answer: "La publicité en ligne génère des résultats dès les premières semaines, les réseaux sociaux sous 1 à 2 mois, et le SEO sous 3 à 6 mois." },
        ],
    };
}

// ─── PORTFOLIO PAGE ─────────────────────────────────────────
export function getPortfolioPageData(locale: string) {
    return {
        hero: {
            badge: t(locale, 'Notre Portfolio', 'Our Portfolio', 'أعمالنا'),
            title: t(locale, 'Portfolio Marketing Digital au Maroc —', 'Digital Marketing Portfolio in Morocco —', 'معرض التسويق الرقمي في المغرب —'),
            highlight: t(locale, "Réalisations à Agadir & au Maroc", 'Work in Agadir & Morocco', 'إنجازات في أكادير والمغرب'),
            subtitle: t(locale,
                "Découvrez une sélection de projets réalisés pour des entreprises à Casablanca, Marrakech, Agadir, Rabat et à l'international.",
                "Discover a selection of projects completed for companies in Casablanca, Marrakech, Agadir, Rabat and internationally.",
                "اكتشفوا مجموعة من المشاريع المنجزة لشركات في الدار البيضاء ومراكش وأكادير والرباط ودولياً."
            ),
        },
        statsBadge: t(locale, 'Impact Mesurable', 'Measurable Impact', 'تأثير قابل للقياس'),
        statsTitle: t(locale, 'Les chiffres qui <span class="gradient-text">parlent</span>', 'The numbers that <span class="gradient-text">speak</span>', 'الأرقام التي <span class="gradient-text">تتحدث</span>'),
        stats: [
            { value: 1600, suffix: '+', label: t(locale, 'Projets Livrés', 'Projects Delivered', 'مشاريع مسلّمة') },
            { value: 98, suffix: '%', label: t(locale, 'Satisfaction Client', 'Client Satisfaction', 'رضا العملاء') },
            { value: 1215, suffix: '+', label: t(locale, 'Entreprises Actives', 'Active Companies', 'شركات نشطة') },
            { value: 240, suffix: 'M+', label: t(locale, 'MAD Revenus Générés', 'MAD Revenue Generated', 'درهم إيرادات') },
        ],
        casesBadge: t(locale, "Études de Cas", 'Case Studies', 'دراسات حالة'),
        casesTitle: t(locale, 'Des résultats <span class="gradient-text">concrets</span>', 'Concrete <span class="gradient-text">results</span>', 'نتائج <span class="gradient-text">ملموسة</span>'),
        testimonialsBadge: t(locale, 'Témoignages', 'Testimonials', 'الشهادات'),
        testimonialsTitle: t(locale, 'Les voix de nos <span class="gradient-text">clients</span>', 'The voices of our <span class="gradient-text">clients</span>', 'أصوات <span class="gradient-text">عملائنا</span>'),
        ctaTitle: t(locale, "Votre projet mérite d'être dans ce portfolio", 'Your project deserves to be in this portfolio', 'مشروعكم يستحق أن يكون في هذا المعرض'),
        ctaSubtitle: t(locale, "Discutons de la manière dont RankUp peut transformer votre présence digitale.", "Let's discuss how RankUp can transform your digital presence.", "لنناقش كيف يمكن لرانك أب تحويل حضوركم الرقمي."),
    };
}

// ─── BLOG PAGE ──────────────────────────────────────────────
export function getBlogPageData(locale: string) {
    return {
        hero: {
            badge: t(locale, 'Blog RankUp', 'RankUp Blog', 'مدونة رانك أب'),
            title: t(locale, 'Blog Marketing Digital au Maroc —', 'Digital Marketing Blog in Morocco —', 'مدونة التسويق الرقمي في المغرب —'),
            highlight: t(locale, 'Guides & Actualités SEO', 'SEO Guides & News', 'أدلة وأخبار SEO'),
            subtitle: t(locale,
                "Articles, guides et analyses approfondies sur le marketing digital au Maroc.",
                "Articles, guides and in-depth analysis on digital marketing in Morocco.",
                "مقالات وأدلة وتحليلات معمقة حول التسويق الرقمي في المغرب."
            ),
        },
        topicsBadge: t(locale, 'Thèmes Populaires', 'Popular Topics', 'المواضيع الشائعة'),
        topicsTitle: t(locale, "Explorez nos <span class=\"gradient-text\">sujets d'expertise</span>", 'Explore our <span class="gradient-text">areas of expertise</span>', 'استكشفوا <span class="gradient-text">مجالات خبرتنا</span>'),
        articlesBadge: t(locale, 'Articles Récents', 'Recent Articles', 'مقالات حديثة'),
        articlesTitle: t(locale, 'Dernières <span class="gradient-text">Publications</span>', 'Latest <span class="gradient-text">Publications</span>', 'أحدث <span class="gradient-text">المنشورات</span>'),
        readArticle: t(locale, "Lire l'article", 'Read article', 'اقرأ المقال'),
        readTime: t(locale, 'de lecture', 'read', 'قراءة'),
        resourcesBadge: t(locale, 'Ressources Gratuites', 'Free Resources', 'موارد مجانية'),
        resourcesTitle: t(locale, 'Restez à la pointe du <span class="gradient-text">marketing digital</span>', 'Stay at the forefront of <span class="gradient-text">digital marketing</span>', 'ابقوا في طليعة <span class="gradient-text">التسويق الرقمي</span>'),
        subscribeBtn: t(locale, "S'inscrire à la newsletter", 'Subscribe to newsletter', 'اشتركوا في النشرة'),
        ctaTitle: t(locale, "Besoin d'une stratégie digitale sur mesure ?", 'Need a custom digital strategy?', 'تحتاجون استراتيجية رقمية مخصصة؟'),
        ctaSubtitle: t(locale, "Nos experts transforment ces conseils en résultats concrets pour votre entreprise.", "Our experts turn these tips into concrete results for your business.", "خبراؤنا يحولون هذه النصائح إلى نتائج ملموسة لشركتكم."),
        categories: locale === 'ar' ? ['الكل', 'استراتيجية', 'SEO', 'تسويق محتوى', 'علامة تجارية', 'ويب', 'وسائل التواصل', 'تكنولوجيا'] : locale === 'en' ? ['All', 'Strategy', 'SEO', 'Content Marketing', 'Branding', 'Web', 'Social Media', 'Technology'] : ['Tous', 'Stratégie', 'SEO', 'Content Marketing', 'Branding', 'Web', 'Social Media', 'Technologie'],
        topics: locale === 'ar' ? [
            { icon: '🔍', name: 'SEO والمراجع', count: '12 مقال' },
            { icon: '📱', name: 'وسائل التواصل', count: '8 مقالات' },
            { icon: '🎨', name: 'علامة تجارية وتصميم', count: '6 مقالات' },
            { icon: '📈', name: 'استراتيجية رقمية', count: '10 مقالات' },
            { icon: '🌐', name: 'إنشاء مواقع', count: '7 مقالات' },
            { icon: '🤖', name: 'ذكاء اصطناعي وابتكار', count: '5 مقالات' },
        ] : locale === 'en' ? [
            { icon: '🔍', name: 'SEO & Rankings', count: '12 articles' },
            { icon: '📱', name: 'Social Media', count: '8 articles' },
            { icon: '🎨', name: 'Branding & Design', count: '6 articles' },
            { icon: '📈', name: 'Digital Strategy', count: '10 articles' },
            { icon: '🌐', name: 'Web Creation', count: '7 articles' },
            { icon: '🤖', name: 'AI & Innovation', count: '5 articles' },
        ] : [
            { icon: '🔍', name: 'SEO & Référencement', count: '12 articles' },
            { icon: '📱', name: 'Social Media', count: '8 articles' },
            { icon: '🎨', name: 'Branding & Design', count: '6 articles' },
            { icon: '📈', name: 'Stratégie Digitale', count: '10 articles' },
            { icon: '🌐', name: 'Création Web', count: '7 articles' },
            { icon: '🤖', name: 'IA & Innovation', count: '5 articles' },
        ],
    };
}

// ─── 404 PAGE ───────────────────────────────────────────────
export function getNotFoundData(locale: string) {
    return {
        title: t(locale, 'Page introuvable', 'Page not found', 'الصفحة غير موجودة'),
        description: t(locale,
            "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
            "Sorry, the page you're looking for doesn't exist or has been moved.",
            "عذراً، الصفحة التي تبحثون عنها غير موجودة أو تم نقلها."
        ),
        homeBtn: t(locale, "Retour à l'accueil", 'Back to home', 'العودة للرئيسية'),
        contactBtn: t(locale, 'Contactez-nous', 'Contact us', 'تواصلوا معنا'),
    };
}
