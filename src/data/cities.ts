export type LocaleText = { fr: string; en: string; ar: string };

export interface CityData {
    slug: string;
    name: string;
    lat: number;
    lng: number;
    image: string;
    emoji: string;
    metaTitle: LocaleText;
    metaDescription: LocaleText;
    heroTitle: LocaleText;
    heroHighlight: LocaleText;
    heroSubtitle: LocaleText;
    intro: LocaleText;
    keyStats: { value: number; suffix: string; label: LocaleText }[];
    neighborhoods: string[];
    industries: { icon: string; name: LocaleText; desc: LocaleText }[];
    services: { title: LocaleText; description: LocaleText; icon: string }[];
    seoContent: LocaleText[];
    faq: { question: LocaleText; answer: LocaleText }[];
    testimonial: { name: string; company: string; text: LocaleText };
}

export function t(text: LocaleText, locale: string): string {
    return locale === 'ar' ? text.ar : locale === 'en' ? text.en : text.fr;
}

export const cities: CityData[] = [
    {
        slug: "agence-marketing-digital-agadir",
        name: "Agadir",
        lat: 30.4278,
        lng: -9.5981,
        image: "/images/cities/agadir.png",
        emoji: "🌊",
        metaTitle: {
            fr: "Agence Marketing Digital à Agadir | SEO, Ads & Web | RankUp",
            en: "Digital Marketing Agency in Agadir | SEO, Ads & Web | RankUp",
            ar: "وكالة تسويق رقمي في أكادير | SEO، إعلانات وتصميم مواقع | RankUp",
        },
        metaDescription: {
            fr: "RankUp, votre agence marketing digital N°1 à Agadir. SEO local, Google Ads, création de sites web, branding et gestion des réseaux sociaux. Résultats garantis.",
            en: "RankUp, your #1 digital marketing agency in Agadir. Local SEO, Google Ads, website creation, branding and social media management. Guaranteed results.",
            ar: "RankUp، وكالتكم الرائدة للتسويق الرقمي في أكادير. تحسين محركات البحث المحلي، إعلانات جوجل، تصميم المواقع، العلامات التجارية وإدارة وسائل التواصل الاجتماعي. نتائج مضمونة.",
        },
        heroTitle: {
            fr: "Agence Marketing Digital & Communication",
            en: "Digital Marketing & Communication Agency",
            ar: "وكالة تسويق رقمي وتواصل",
        },
        heroHighlight: {
            fr: "N°1 à Agadir — SEO, Ads & Branding",
            en: "#1 in Agadir — SEO, Ads & Branding",
            ar: "الأولى في أكادير — SEO وإعلانات وعلامات تجارية",
        },
        heroSubtitle: {
            fr: "Votre partenaire de croissance digitale à Agadir. RankUp accompagne les entreprises du Souss-Massa avec des stratégies SEO, publicité en ligne et branding qui génèrent des résultats concrets et mesurables.",
            en: "Your digital growth partner in Agadir. RankUp supports businesses in the Souss-Massa region with SEO strategies, online advertising and branding that deliver concrete, measurable results.",
            ar: "شريككم في النمو الرقمي في أكادير. تواكب RankUp شركات جهة سوس-ماسة باستراتيجيات تحسين محركات البحث والإعلانات الرقمية والعلامات التجارية التي تحقق نتائج ملموسة وقابلة للقياس.",
        },
        intro: {
            fr: "Agadir est le cœur économique du Sud du Maroc, avec un tissu entrepreneurial dynamique dans le tourisme, l'agroalimentaire, la pêche et les services. Dans un marché de plus en plus compétitif, les entreprises agadiriennes ont besoin d'une présence digitale forte pour se démarquer. RankUp, basée à Agadir, est l'agence marketing digital de référence dans la région du Souss-Massa. Notre proximité avec les entrepreneurs locaux nous permet de comprendre parfaitement les défis et les opportunités spécifiques au marché agadirien, et de proposer des stratégies digitales sur mesure qui génèrent un retour sur investissement exceptionnel.",
            en: "Agadir is the economic heart of Southern Morocco, with a dynamic entrepreneurial fabric spanning tourism, agri-food, fishing and services. In an increasingly competitive market, Agadir-based businesses need a strong digital presence to stand out. RankUp, headquartered in Agadir, is the leading digital marketing agency in the Souss-Massa region. Our proximity to local entrepreneurs allows us to fully understand the challenges and opportunities specific to the Agadir market, and to deliver tailor-made digital strategies that generate an exceptional return on investment.",
            ar: "أكادير هي القلب الاقتصادي لجنوب المغرب، بنسيج ريادي ديناميكي يشمل السياحة والصناعات الغذائية والصيد البحري والخدمات. في سوق يزداد تنافسية يوماً بعد يوم، تحتاج الشركات الأكاديرية إلى حضور رقمي قوي للتميز. RankUp، الكائن مقرها في أكادير، هي الوكالة المرجعية للتسويق الرقمي في جهة سوس-ماسة. قربنا من رواد الأعمال المحليين يتيح لنا فهم التحديات والفرص الخاصة بالسوق الأكاديري بشكل تام، وتقديم استراتيجيات رقمية مصممة خصيصاً تحقق عائداً استثنائياً على الاستثمار.",
        },
        keyStats: [
            { value: 450, suffix: '+', label: { fr: "Clients à Agadir", en: "Clients in Agadir", ar: "عميل في أكادير" } },
            { value: 98, suffix: '%', label: { fr: "Taux de satisfaction", en: "Satisfaction rate", ar: "نسبة الرضا" } },
            { value: 320, suffix: '%', label: { fr: "Croissance moyenne", en: "Average growth", ar: "نمو متوسط" } },
            { value: 5, suffix: ' ans', label: { fr: "d'expertise locale", en: "of local expertise", ar: "سنوات من الخبرة المحلية" } },
        ],
        neighborhoods: ["Centre-ville Agadir", "Hay Mohammadi", "Talborjt", "Cité Mass", "Dcheira El Jihadia", "Inezgane", "Ait Melloul", "Biougra", "Tiznit", "Taroudant"],
        industries: [
            {
                icon: "🏨",
                name: { fr: "Tourisme & Hôtellerie", en: "Tourism & Hospitality", ar: "السياحة والفندقة" },
                desc: {
                    fr: "Hôtels, riads, agences de voyages, activités touristiques et restaurants à Agadir et dans la région Souss-Massa.",
                    en: "Hotels, riads, travel agencies, tourist activities and restaurants in Agadir and the Souss-Massa region.",
                    ar: "فنادق، رياضات، وكالات أسفار، أنشطة سياحية ومطاعم في أكادير وجهة سوس-ماسة.",
                },
            },
            {
                icon: "🐟",
                name: { fr: "Pêche & Agroalimentaire", en: "Fishing & Agri-Food", ar: "الصيد البحري والصناعات الغذائية" },
                desc: {
                    fr: "Entreprises de pêche, conserveries, produits agroalimentaires et exportateurs basés dans la zone industrielle d'Agadir.",
                    en: "Fishing companies, canneries, agri-food products and exporters based in Agadir's industrial zone.",
                    ar: "شركات الصيد البحري، مصانع التعليب، المنتجات الغذائية والمصدّرون في المنطقة الصناعية بأكادير.",
                },
            },
            {
                icon: "🏠",
                name: { fr: "Immobilier", en: "Real Estate", ar: "العقارات" },
                desc: {
                    fr: "Promoteurs immobiliers, agences immobilières et architectes à Agadir, Ait Melloul et la Baie des Palmiers.",
                    en: "Property developers, real estate agencies and architects in Agadir, Ait Melloul and Baie des Palmiers.",
                    ar: "المنعشون العقاريون، الوكالات العقارية والمهندسون المعماريون في أكادير، أيت ملول وخليج النخيل.",
                },
            },
            {
                icon: "🛒",
                name: { fr: "Commerce & E-commerce", en: "Retail & E-commerce", ar: "التجارة والتجارة الإلكترونية" },
                desc: {
                    fr: "Boutiques en ligne, commerces de proximité et centres commerciaux de la région d'Agadir.",
                    en: "Online shops, local businesses and shopping centers in the Agadir region.",
                    ar: "المتاجر الإلكترونية، التجارة المحلية والمراكز التجارية في جهة أكادير.",
                },
            },
            {
                icon: "🎓",
                name: { fr: "Éducation & Formation", en: "Education & Training", ar: "التعليم والتكوين" },
                desc: {
                    fr: "Écoles privées, centres de formation, universités et instituts de la région du Souss-Massa.",
                    en: "Private schools, training centers, universities and institutes in the Souss-Massa region.",
                    ar: "المدارس الخاصة، مراكز التكوين، الجامعات والمعاهد في جهة سوس-ماسة.",
                },
            },
            {
                icon: "⚕️",
                name: { fr: "Santé & Bien-être", en: "Health & Wellness", ar: "الصحة والعافية" },
                desc: {
                    fr: "Cliniques, cabinets médicaux, pharmacies, spas et centres de bien-être à Agadir.",
                    en: "Clinics, medical practices, pharmacies, spas and wellness centers in Agadir.",
                    ar: "العيادات، المراكز الطبية، الصيدليات، المنتجعات الصحية ومراكز العافية في أكادير.",
                },
            },
        ],
        services: [
            {
                title: { fr: "SEO Local Agadir", en: "Local SEO Agadir", ar: "تحسين محركات البحث المحلي في أكادير" },
                description: {
                    fr: "Positionnez votre entreprise en première page Google pour les recherches locales à Agadir : optimisation Google Business Profile, citations locales, avis clients et contenu géo-ciblé.",
                    en: "Position your business on Google's first page for local searches in Agadir: Google Business Profile optimization, local citations, customer reviews and geo-targeted content.",
                    ar: "ضع شركتك في الصفحة الأولى من جوجل للبحث المحلي في أكادير: تحسين ملف Google Business Profile، الاستشهادات المحلية، تقييمات العملاء والمحتوى المستهدف جغرافياً.",
                },
                icon: "🔍",
            },
            {
                title: { fr: "Google Ads Agadir", en: "Google Ads Agadir", ar: "إعلانات جوجل أكادير" },
                description: {
                    fr: "Campagnes publicitaires Google ciblées sur Agadir et le Souss-Massa : Search, Display, Shopping et YouTube Ads avec optimisation continue du ROI.",
                    en: "Targeted Google advertising campaigns for Agadir and Souss-Massa: Search, Display, Shopping and YouTube Ads with continuous ROI optimization.",
                    ar: "حملات إعلانية على جوجل تستهدف أكادير وسوس-ماسة: إعلانات البحث، العرض، التسوق ويوتيوب مع تحسين مستمر للعائد على الاستثمار.",
                },
                icon: "📢",
            },
            {
                title: { fr: "Création de Sites Web", en: "Website Creation", ar: "تصميم المواقع الإلكترونية" },
                description: {
                    fr: "Sites web professionnels, rapides et responsive pour les entreprises à Agadir : sites vitrines, e-commerce et applications web sur mesure.",
                    en: "Professional, fast and responsive websites for businesses in Agadir: showcase sites, e-commerce and custom web applications.",
                    ar: "مواقع إلكترونية احترافية وسريعة ومتجاوبة للشركات في أكادير: مواقع تعريفية، تجارة إلكترونية وتطبيقات ويب مخصصة.",
                },
                icon: "🌐",
            },
            {
                title: { fr: "Réseaux Sociaux Agadir", en: "Social Media Agadir", ar: "وسائل التواصل الاجتماعي أكادير" },
                description: {
                    fr: "Gestion professionnelle de vos comptes Instagram, Facebook et TikTok à Agadir avec création de contenu local et community management.",
                    en: "Professional management of your Instagram, Facebook and TikTok accounts in Agadir with local content creation and community management.",
                    ar: "إدارة احترافية لحساباتكم على إنستغرام وفيسبوك وتيك توك في أكادير مع إنشاء محتوى محلي وإدارة المجتمع الرقمي.",
                },
                icon: "📱",
            },
            {
                title: { fr: "Branding & Design", en: "Branding & Design", ar: "العلامة التجارية والتصميم" },
                description: {
                    fr: "Création de logos, identités visuelles et supports de communication pour les marques à Agadir et dans le Souss-Massa.",
                    en: "Logo creation, visual identities and communication materials for brands in Agadir and Souss-Massa.",
                    ar: "تصميم الشعارات، الهويات البصرية ومواد التواصل للعلامات التجارية في أكادير وسوس-ماسة.",
                },
                icon: "🎨",
            },
            {
                title: { fr: "Photographie Professionnelle", en: "Professional Photography", ar: "التصوير الفوتوغرافي الاحترافي" },
                description: {
                    fr: "Photos corporate, produits, événements et immobilier à Agadir. Shooting en studio ou en extérieur avec la plage et les décors uniques d'Agadir.",
                    en: "Corporate, product, event and real estate photography in Agadir. Studio or outdoor shoots featuring the beach and Agadir's unique scenery.",
                    ar: "تصوير مؤسسي، منتجات، فعاليات وعقارات في أكادير. جلسات تصوير في الاستوديو أو في الهواء الطلق مع الشاطئ والمناظر الفريدة لأكادير.",
                },
                icon: "📸",
            },
        ],
        seoContent: [
            {
                fr: "Agadir, capitale du Souss-Massa et destination touristique prisée, connaît une transformation digitale rapide. Les entreprises agadiriennes investissent de plus en plus dans le marketing digital pour capter une clientèle locale, nationale et internationale. En tant qu'agence marketing digital basée à Agadir, RankUp comprend les spécificités du marché local — la saisonnalité touristique, les habitudes de consommation de la région et les dynamiques concurrentielles propres au tissu économique du Sud marocain.",
                en: "Agadir, capital of the Souss-Massa region and a popular tourist destination, is undergoing a rapid digital transformation. Agadir-based businesses are increasingly investing in digital marketing to capture local, national and international clientele. As a digital marketing agency based in Agadir, RankUp understands the specificities of the local market — tourist seasonality, regional consumer habits and the competitive dynamics unique to the economic fabric of Southern Morocco.",
                ar: "أكادير، عاصمة جهة سوس-ماسة والوجهة السياحية المفضلة، تشهد تحولاً رقمياً سريعاً. تستثمر الشركات الأكاديرية بشكل متزايد في التسويق الرقمي لاستقطاب العملاء المحليين والوطنيين والدوليين. بصفتنا وكالة تسويق رقمي مقرها في أكادير، تدرك RankUp خصوصيات السوق المحلي — الموسمية السياحية، وعادات الاستهلاك في المنطقة والديناميكيات التنافسية الخاصة بالنسيج الاقتصادي لجنوب المغرب.",
            },
            {
                fr: "Notre expertise en SEO local à Agadir nous permet de positionner les entreprises de la région en tête des résultats Google pour les requêtes géo-ciblées. Que vous soyez un hôtel sur la corniche, un restaurant dans le centre-ville, une agence immobilière à Hay Mohammadi ou un commerce à Inezgane, nous optimisons votre visibilité en ligne pour attirer plus de clients qualifiés.",
                en: "Our expertise in local SEO in Agadir allows us to position businesses in the region at the top of Google results for geo-targeted queries. Whether you are a hotel on the corniche, a restaurant in the city center, a real estate agency in Hay Mohammadi or a shop in Inezgane, we optimize your online visibility to attract more qualified customers.",
                ar: "خبرتنا في تحسين محركات البحث المحلي في أكادير تمكننا من وضع شركات المنطقة في صدارة نتائج جوجل للاستعلامات المستهدفة جغرافياً. سواء كنتم فندقاً على الكورنيش، أو مطعماً في وسط المدينة، أو وكالة عقارية في حي المحمدي أو متجراً في إنزكان، نعمل على تحسين ظهوركم الرقمي لجذب المزيد من العملاء المؤهلين.",
            },
            {
                fr: "Le choix d'une agence marketing digital à Agadir plutôt qu'une agence basée à Casablanca ou à l'étranger offre des avantages significatifs : proximité géographique pour des réunions en personne, connaissance approfondie du marché local, tarifs adaptés au tissu économique du Souss-Massa et réactivité optimale. RankUp combine cette proximité locale avec une expertise technique de niveau international pour offrir le meilleur des deux mondes.",
                en: "Choosing a digital marketing agency in Agadir rather than one based in Casablanca or abroad offers significant advantages: geographic proximity for in-person meetings, in-depth knowledge of the local market, pricing adapted to the Souss-Massa economic fabric and optimal responsiveness. RankUp combines this local proximity with international-level technical expertise to offer the best of both worlds.",
                ar: "اختيار وكالة تسويق رقمي في أكادير بدلاً من وكالة مقرها في الدار البيضاء أو في الخارج يوفر مزايا كبيرة: القرب الجغرافي للاجتماعات الشخصية، المعرفة المعمقة بالسوق المحلي، أسعار ملائمة للنسيج الاقتصادي لسوس-ماسة واستجابة مثالية. تجمع RankUp بين هذا القرب المحلي والخبرة التقنية على المستوى الدولي لتقديم أفضل ما في العالمين.",
            },
        ],
        faq: [
            {
                question: {
                    fr: "Pourquoi choisir une agence marketing digital à Agadir ?",
                    en: "Why choose a digital marketing agency in Agadir?",
                    ar: "لماذا تختار وكالة تسويق رقمي في أكادير؟",
                },
                answer: {
                    fr: "Choisir une agence locale à Agadir comme RankUp présente de nombreux avantages : connaissance approfondie du marché du Souss-Massa, proximité pour des réunions en personne, compréhension des spécificités culturelles et économiques de la région, tarifs adaptés au marché local, et réactivité optimale. Notre équipe vit et travaille à Agadir, nous connaissons les tendances, les acteurs et les opportunités du marché agadirien.",
                    en: "Choosing a local agency in Agadir like RankUp offers many advantages: in-depth knowledge of the Souss-Massa market, proximity for in-person meetings, understanding of the region's cultural and economic specificities, pricing adapted to the local market, and optimal responsiveness. Our team lives and works in Agadir — we know the trends, key players and opportunities of the Agadir market.",
                    ar: "اختيار وكالة محلية في أكادير مثل RankUp يقدم مزايا عديدة: معرفة معمقة بسوق سوس-ماسة، القرب للاجتماعات الشخصية، فهم الخصوصيات الثقافية والاقتصادية للمنطقة، أسعار ملائمة للسوق المحلي واستجابة مثالية. فريقنا يعيش ويعمل في أكادير، نعرف التوجهات والفاعلين والفرص في السوق الأكاديري.",
                },
            },
            {
                question: {
                    fr: "Combien coûte le marketing digital à Agadir ?",
                    en: "How much does digital marketing cost in Agadir?",
                    ar: "كم تكلفة التسويق الرقمي في أكادير؟",
                },
                answer: {
                    fr: "Les tarifs du marketing digital à Agadir dépendent de vos objectifs et de l'étendue des services. Un accompagnement SEO mensuel commence à partir de 3 000 MAD/mois. La gestion des réseaux sociaux démarre à 2 500 MAD/mois. La création d'un site web se situe entre 8 000 et 30 000 MAD selon la complexité. RankUp propose des formules adaptées aux budgets de toutes les entreprises à Agadir, des startups aux grandes entreprises.",
                    en: "Digital marketing pricing in Agadir depends on your objectives and the scope of services. Monthly SEO support starts from 3 000 MAD/month. Social media management starts at 2 500 MAD/month. Website creation ranges from 8 000 to 30 000 MAD depending on complexity. RankUp offers packages tailored to the budgets of all businesses in Agadir, from startups to large enterprises.",
                    ar: "تعتمد أسعار التسويق الرقمي في أكادير على أهدافكم ونطاق الخدمات. تبدأ خدمة تحسين محركات البحث الشهرية من 3 000 درهم/شهر. وتبدأ إدارة وسائل التواصل الاجتماعي من 2 500 درهم/شهر. ويتراوح تصميم المواقع الإلكترونية بين 8 000 و30 000 درهم حسب التعقيد. تقدم RankUp باقات ملائمة لميزانيات جميع الشركات في أكادير، من الشركات الناشئة إلى المؤسسات الكبرى.",
                },
            },
            {
                question: {
                    fr: "Quels secteurs accompagnez-vous à Agadir ?",
                    en: "What industries do you serve in Agadir?",
                    ar: "ما هي القطاعات التي ترافقونها في أكادير؟",
                },
                answer: {
                    fr: "Nous accompagnons tous les secteurs d'activité présents à Agadir : tourisme et hôtellerie, immobilier, pêche et agroalimentaire, commerce, santé, éducation, services professionnels et industrie. Notre méthodologie s'adapte aux spécificités de chaque secteur pour maximiser les résultats.",
                    en: "We serve all industries present in Agadir: tourism and hospitality, real estate, fishing and agri-food, retail, healthcare, education, professional services and industry. Our methodology adapts to the specificities of each sector to maximize results.",
                    ar: "نرافق جميع القطاعات الموجودة في أكادير: السياحة والفندقة، العقارات، الصيد البحري والصناعات الغذائية، التجارة، الصحة، التعليم، الخدمات المهنية والصناعة. تتكيف منهجيتنا مع خصوصيات كل قطاع لتعظيم النتائج.",
                },
            },
            {
                question: {
                    fr: "Quels résultats puis-je espérer du SEO local à Agadir ?",
                    en: "What results can I expect from local SEO in Agadir?",
                    ar: "ما النتائج التي يمكنني توقعها من تحسين محركات البحث المحلي في أكادير؟",
                },
                answer: {
                    fr: "Avec une stratégie SEO local bien exécutée à Agadir, nos clients voient généralement une augmentation de 200 à 500% du trafic organique local sous 3 à 6 mois. Le taux de conversion des visiteurs locaux est significativement plus élevé car ces recherches indiquent une intention d'achat forte. Nous travaillons l'optimisation Google Business Profile, les avis clients et le contenu géo-ciblé.",
                    en: "With a well-executed local SEO strategy in Agadir, our clients typically see a 200 to 500% increase in local organic traffic within 3 to 6 months. The conversion rate of local visitors is significantly higher as these searches indicate strong purchase intent. We work on Google Business Profile optimization, customer reviews and geo-targeted content.",
                    ar: "مع استراتيجية تحسين محركات البحث المحلي المنفذة بإتقان في أكادير، يشهد عملاؤنا عادةً زيادة بنسبة 200 إلى 500% في حركة المرور العضوية المحلية خلال 3 إلى 6 أشهر. معدل تحويل الزوار المحليين أعلى بشكل ملحوظ لأن هذه البحوث تدل على نية شراء قوية. نعمل على تحسين ملف Google Business Profile وتقييمات العملاء والمحتوى المستهدف جغرافياً.",
                },
            },
            {
                question: {
                    fr: "Est-ce que RankUp travaille aussi avec des clients en dehors d'Agadir ?",
                    en: "Does RankUp also work with clients outside of Agadir?",
                    ar: "هل تعمل RankUp أيضاً مع عملاء خارج أكادير؟",
                },
                answer: {
                    fr: "Absolument. Bien que notre siège soit à Agadir, nous accompagnons des clients dans tout le Maroc (Casablanca, Rabat, Marrakech, Tanger, Fès) et à l'international. Le digital nous permet d'offrir le même niveau de service indépendamment de la localisation de nos clients.",
                    en: "Absolutely. Although our headquarters is in Agadir, we support clients throughout Morocco (Casablanca, Rabat, Marrakech, Tangier, Fez) and internationally. Digital technology allows us to provide the same level of service regardless of our clients' location.",
                    ar: "بالتأكيد. رغم أن مقرنا الرئيسي في أكادير، نرافق عملاء في جميع أنحاء المغرب (الدار البيضاء، الرباط، مراكش، طنجة، فاس) وعلى المستوى الدولي. يتيح لنا المجال الرقمي تقديم نفس مستوى الخدمة بغض النظر عن موقع عملائنا.",
                },
            },
        ],
        testimonial: {
            name: "Hassan M.",
            company: "Atlas Tours, Agadir",
            text: {
                fr: "RankUp a transformé notre visibilité en ligne à Agadir. En 4 mois, notre trafic organique a augmenté de 320% et nos réservations en ligne ont doublé. L'équipe locale comprend parfaitement notre marché.",
                en: "RankUp transformed our online visibility in Agadir. In 4 months, our organic traffic increased by 320% and our online bookings doubled. The local team perfectly understands our market.",
                ar: "حوّلت RankUp ظهورنا الرقمي في أكادير. خلال 4 أشهر، ارتفعت حركة المرور العضوية لدينا بنسبة 320% وتضاعفت حجوزاتنا عبر الإنترنت. الفريق المحلي يفهم سوقنا تماماً.",
            },
        },
    },
    {
        slug: "agence-marketing-digital-casablanca",
        name: "Casablanca",
        lat: 33.5731,
        lng: -7.5898,
        image: "/images/cities/casablanca.png",
        emoji: "🏙️",
        metaTitle: {
            fr: "Agence Marketing Digital à Casablanca | SEO, Ads & Web | RankUp",
            en: "Digital Marketing Agency in Casablanca | SEO, Ads & Web | RankUp",
            ar: "وكالة تسويق رقمي في الدار البيضاء | SEO، إعلانات وتصميم مواقع | RankUp",
        },
        metaDescription: {
            fr: "RankUp, votre agence marketing digital à Casablanca. SEO, Google Ads, création de sites web, branding et social media. Accompagnement sur mesure pour les entreprises casablancaises.",
            en: "RankUp, your digital marketing agency in Casablanca. SEO, Google Ads, website creation, branding and social media. Tailored support for Casablanca-based businesses.",
            ar: "RankUp، وكالتكم للتسويق الرقمي في الدار البيضاء. تحسين محركات البحث، إعلانات جوجل، تصميم المواقع، العلامات التجارية ووسائل التواصل الاجتماعي. مرافقة مخصصة لشركات الدار البيضاء.",
        },
        heroTitle: {
            fr: "Agence de Communication Digitale",
            en: "Digital Communication Agency",
            ar: "وكالة تواصل رقمي",
        },
        heroHighlight: {
            fr: "à Casablanca — Marketing & SEO",
            en: "in Casablanca — Marketing & SEO",
            ar: "في الدار البيضاء — تسويق وSEO",
        },
        heroSubtitle: {
            fr: "Propulsez votre entreprise à Casablanca avec des stratégies de marketing digital performantes. RankUp accompagne les startups, PME et grandes entreprises de la capitale économique du Maroc.",
            en: "Propel your business in Casablanca with high-performance digital marketing strategies. RankUp supports startups, SMEs and large enterprises in Morocco's economic capital.",
            ar: "ادفع بمؤسستكم في الدار البيضاء إلى الأمام باستراتيجيات تسويق رقمي عالية الأداء. ترافق RankUp الشركات الناشئة والمقاولات الصغرى والمتوسطة والمؤسسات الكبرى في العاصمة الاقتصادية للمغرب.",
        },
        intro: {
            fr: "Casablanca, capitale économique du Maroc, concentre la plus grande densité d'entreprises du Royaume. Dans cet environnement ultra-compétitif, se démarquer en ligne est crucial. RankUp est votre agence marketing digital à Casablanca, spécialisée dans le SEO, la publicité en ligne, la création de sites web et le branding pour les entreprises casablancaises. Notre approche combine expertise digitale de pointe et connaissance approfondie de l'écosystème business casablancais pour vous donner un avantage concurrentiel décisif sur le marché le plus dynamique du Maroc.",
            en: "Casablanca, Morocco's economic capital, has the highest concentration of businesses in the Kingdom. In this ultra-competitive environment, standing out online is crucial. RankUp is your digital marketing agency in Casablanca, specializing in SEO, online advertising, website creation and branding for Casablanca-based businesses. Our approach combines cutting-edge digital expertise with in-depth knowledge of the Casablanca business ecosystem to give you a decisive competitive advantage in Morocco's most dynamic market.",
            ar: "الدار البيضاء، العاصمة الاقتصادية للمغرب، تضم أعلى كثافة للشركات في المملكة. في هذه البيئة شديدة التنافسية، يُعدّ التميز الرقمي أمراً حاسماً. RankUp هي وكالتكم للتسويق الرقمي في الدار البيضاء، المتخصصة في تحسين محركات البحث والإعلانات الرقمية وتصميم المواقع والعلامات التجارية لشركات الدار البيضاء. يجمع نهجنا بين الخبرة الرقمية المتقدمة والمعرفة المعمقة بمنظومة الأعمال البيضاوية لمنحكم ميزة تنافسية حاسمة في أكثر أسواق المغرب ديناميكية.",
        },
        keyStats: [
            { value: 350, suffix: '+', label: { fr: "Clients à Casablanca", en: "Clients in Casablanca", ar: "عميل في الدار البيضاء" } },
            { value: 240, suffix: 'M+ MAD', label: { fr: "Revenus générés", en: "Revenue generated", ar: "إيرادات محققة" } },
            { value: 450, suffix: '%', label: { fr: "Croissance moyenne", en: "Average growth", ar: "نمو متوسط" } },
            { value: 50, suffix: '+', label: { fr: "Secteurs couverts", en: "Industries covered", ar: "قطاع مغطى" } },
        ],
        neighborhoods: ["Casablanca Centre", "Maârif", "Anfa", "Ain Diab", "Hay Hassani", "Sidi Moumen", "Mohammedia", "Ain Sebaa", "Bouskoura", "Dar Bouazza"],
        industries: [
            {
                icon: "🏦",
                name: { fr: "Finance & Banque", en: "Finance & Banking", ar: "المالية والبنوك" },
                desc: {
                    fr: "Banques, assurances, sociétés de financement et fintech de la place financière de Casablanca.",
                    en: "Banks, insurance companies, financing firms and fintechs from the Casablanca financial hub.",
                    ar: "البنوك، شركات التأمين، مؤسسات التمويل وشركات التكنولوجيا المالية في الساحة المالية بالدار البيضاء.",
                },
            },
            {
                icon: "🏭",
                name: { fr: "Industrie & Manufacturing", en: "Industry & Manufacturing", ar: "الصناعة والتصنيع" },
                desc: {
                    fr: "Usines, zones industrielles de Ain Sebaa, Bouskoura et Mohammedia. Entreprises de production et de transformation.",
                    en: "Factories, industrial zones of Ain Sebaa, Bouskoura and Mohammedia. Production and processing companies.",
                    ar: "المصانع والمناطق الصناعية في عين السبع وبوسكورة والمحمدية. شركات الإنتاج والتحويل.",
                },
            },
            {
                icon: "🛒",
                name: { fr: "E-commerce & Retail", en: "E-commerce & Retail", ar: "التجارة الإلكترونية والتوزيع" },
                desc: {
                    fr: "Boutiques en ligne, marketplaces et enseignes de distribution de la métropole casablancaise.",
                    en: "Online shops, marketplaces and retail brands in the Casablanca metropolitan area.",
                    ar: "المتاجر الإلكترونية، الأسواق الرقمية وعلامات التوزيع في حاضرة الدار البيضاء.",
                },
            },
            {
                icon: "💼",
                name: { fr: "Services B2B", en: "B2B Services", ar: "خدمات الأعمال" },
                desc: {
                    fr: "Cabinets de conseil, agences, ESN, bureaux d'études et sociétés de services aux entreprises.",
                    en: "Consulting firms, agencies, IT service companies, engineering firms and business service providers.",
                    ar: "مكاتب الاستشارات، الوكالات، شركات خدمات تكنولوجيا المعلومات، مكاتب الدراسات وشركات الخدمات للمقاولات.",
                },
            },
            {
                icon: "🏥",
                name: { fr: "Santé", en: "Healthcare", ar: "الصحة" },
                desc: {
                    fr: "Cliniques, laboratoires, pharmacies et entreprises de la santé basées à Casablanca.",
                    en: "Clinics, laboratories, pharmacies and healthcare companies based in Casablanca.",
                    ar: "العيادات، المختبرات، الصيدليات وشركات الصحة المتمركزة في الدار البيضاء.",
                },
            },
            {
                icon: "🚗",
                name: { fr: "Automobile", en: "Automotive", ar: "قطاع السيارات" },
                desc: {
                    fr: "Concessionnaires, garages, entreprises de location et acteurs de la mobilité à Casablanca.",
                    en: "Dealerships, garages, rental companies and mobility players in Casablanca.",
                    ar: "وكلاء السيارات، ورشات التصليح، شركات التأجير وفاعلو التنقل في الدار البيضاء.",
                },
            },
        ],
        services: [
            {
                title: { fr: "SEO Casablanca", en: "SEO Casablanca", ar: "تحسين محركات البحث في الدار البيضاء" },
                description: {
                    fr: "Dominez les résultats Google à Casablanca avec une stratégie SEO locale et nationale adaptée au marché casablancais le plus concurrentiel du Maroc.",
                    en: "Dominate Google results in Casablanca with a local and national SEO strategy tailored to Morocco's most competitive market.",
                    ar: "تصدّروا نتائج جوجل في الدار البيضاء باستراتيجية تحسين محركات بحث محلية ووطنية ملائمة لأكثر أسواق المغرب تنافسية.",
                },
                icon: "🔍",
            },
            {
                title: { fr: "Google Ads Casablanca", en: "Google Ads Casablanca", ar: "إعلانات جوجل الدار البيضاء" },
                description: {
                    fr: "Campagnes Google Ads hautement ciblées sur Casablanca et le Grand Casablanca pour générer des leads qualifiés avec un ROI optimisé.",
                    en: "Highly targeted Google Ads campaigns for Casablanca and Greater Casablanca to generate qualified leads with optimized ROI.",
                    ar: "حملات إعلانات جوجل مستهدفة بدقة على الدار البيضاء والدار البيضاء الكبرى لتوليد عملاء محتملين مؤهلين بعائد استثمار محسّن.",
                },
                icon: "📢",
            },
            {
                title: { fr: "Sites Web Premium", en: "Premium Websites", ar: "مواقع إلكترونية متميزة" },
                description: {
                    fr: "Création de sites web premium pour les entreprises casablancaises : design sophistiqué, performances optimales et SEO intégré.",
                    en: "Premium website creation for Casablanca businesses: sophisticated design, optimal performance and built-in SEO.",
                    ar: "تصميم مواقع إلكترونية متميزة لشركات الدار البيضاء: تصميم راقٍ، أداء مثالي وتحسين محركات البحث المدمج.",
                },
                icon: "🌐",
            },
            {
                title: { fr: "Social Media Casablanca", en: "Social Media Casablanca", ar: "وسائل التواصل الاجتماعي الدار البيضاء" },
                description: {
                    fr: "Stratégie social media locale pour engager l'audience casablancaise sur Instagram, Facebook, TikTok et LinkedIn.",
                    en: "Local social media strategy to engage the Casablanca audience on Instagram, Facebook, TikTok and LinkedIn.",
                    ar: "استراتيجية وسائل التواصل الاجتماعي المحلية لإشراك جمهور الدار البيضاء على إنستغرام وفيسبوك وتيك توك ولينكدإن.",
                },
                icon: "📱",
            },
            {
                title: { fr: "Branding Corporate", en: "Corporate Branding", ar: "العلامة التجارية المؤسسية" },
                description: {
                    fr: "Identités visuelles et branding corporate pour les entreprises casablancaises, du logo à la charte graphique complète.",
                    en: "Visual identities and corporate branding for Casablanca businesses, from logo to complete brand guidelines.",
                    ar: "هويات بصرية وعلامات تجارية مؤسسية لشركات الدار البيضاء، من الشعار إلى الميثاق البصري الكامل.",
                },
                icon: "🎨",
            },
            {
                title: { fr: "Formation Marketing Digital", en: "Digital Marketing Training", ar: "التكوين في التسويق الرقمي" },
                description: {
                    fr: "Formations en marketing digital pour les équipes internes des entreprises casablancaises : SEO, Ads, Social Media.",
                    en: "Digital marketing training for internal teams of Casablanca businesses: SEO, Ads, Social Media.",
                    ar: "دورات تكوينية في التسويق الرقمي لفرق العمل الداخلية في شركات الدار البيضاء: تحسين محركات البحث، الإعلانات، وسائل التواصل الاجتماعي.",
                },
                icon: "🎓",
            },
        ],
        seoContent: [
            {
                fr: "Casablanca est le moteur économique du Maroc. Avec plus de 4 millions d'habitants et une concentration inégalée d'entreprises, la ville offre des opportunités immenses mais aussi une concurrence féroce. Pour se démarquer dans ce marché, une stratégie de marketing digital structurée et performante n'est plus une option — c'est une nécessité vitale pour toute entreprise souhaitant croître.",
                en: "Casablanca is Morocco's economic engine. With over 4 million inhabitants and an unmatched concentration of businesses, the city offers immense opportunities but also fierce competition. To stand out in this market, a structured and high-performance digital marketing strategy is no longer an option — it is a vital necessity for any business seeking growth.",
                ar: "الدار البيضاء هي المحرك الاقتصادي للمغرب. بأكثر من 4 ملايين نسمة وتركيز لا مثيل له من الشركات، تقدم المدينة فرصاً هائلة ولكن أيضاً منافسة شرسة. للتميز في هذا السوق، لم تعد استراتيجية التسويق الرقمي المنظمة والفعالة خياراً — بل أصبحت ضرورة حيوية لكل مؤسسة تسعى للنمو.",
            },
            {
                fr: "RankUp accompagne les entreprises casablancaises dans tous les quartiers d'affaires : Maârif, Anfa, Hay Hassani, Ain Diab et le centre-ville. Notre connaissance du tissu économique casablancais — des startups de CasaNearshore aux grandes entreprises du boulevard d'Anfa — nous permet de proposer des stratégies adaptées à chaque profil d'entreprise et à chaque budget.",
                en: "RankUp supports Casablanca businesses across all business districts: Maârif, Anfa, Hay Hassani, Ain Diab and the city center. Our knowledge of the Casablanca economic fabric — from CasaNearshore startups to major corporations on Boulevard d'Anfa — allows us to deliver strategies tailored to every business profile and budget.",
                ar: "ترافق RankUp شركات الدار البيضاء في جميع أحياء الأعمال: المعاريف، أنفا، الحي الحسني، عين الذياب ووسط المدينة. معرفتنا بالنسيج الاقتصادي البيضاوي — من الشركات الناشئة في كازانيرشور إلى المؤسسات الكبرى في شارع أنفا — تمكننا من تقديم استراتيجيات ملائمة لكل نمط مقاولاتي ولكل ميزانية.",
            },
            {
                fr: "Le SEO à Casablanca est particulièrement concurrentiel. Les requêtes comme 'restaurant Casablanca', 'agence immobilière Casablanca' ou 'avocat Casablanca' génèrent des milliers de recherches mensuelles. RankUp utilise des techniques avancées de SEO local, d'optimisation de contenu et de netlinking pour positionner vos pages en tête des résultats et capter ce flux de clients potentiels.",
                en: "SEO in Casablanca is particularly competitive. Queries such as 'restaurant Casablanca', 'real estate agency Casablanca' or 'lawyer Casablanca' generate thousands of monthly searches. RankUp uses advanced local SEO techniques, content optimization and link building to position your pages at the top of results and capture this flow of potential customers.",
                ar: "تحسين محركات البحث في الدار البيضاء تنافسي بشكل خاص. استعلامات مثل 'مطعم الدار البيضاء'، 'وكالة عقارية الدار البيضاء' أو 'محامي الدار البيضاء' تولّد آلاف البحوث الشهرية. تستخدم RankUp تقنيات متقدمة في تحسين محركات البحث المحلي وتحسين المحتوى وبناء الروابط لوضع صفحاتكم في صدارة النتائج واستقطاب هذا التدفق من العملاء المحتملين.",
            },
        ],
        faq: [
            {
                question: {
                    fr: "Pourquoi choisir RankUp comme agence marketing digital à Casablanca ?",
                    en: "Why choose RankUp as your digital marketing agency in Casablanca?",
                    ar: "لماذا تختار RankUp كوكالة تسويق رقمي في الدار البيضاء؟",
                },
                answer: {
                    fr: "RankUp combine une expertise technique de pointe avec une connaissance approfondie du marché casablancais. Notre équipe a accompagné plus de 350 entreprises à Casablanca dans des secteurs variés. Nous comprenons les dynamiques concurrentielles, les comportements de recherche et les leviers de croissance spécifiques à la capitale économique du Maroc.",
                    en: "RankUp combines cutting-edge technical expertise with in-depth knowledge of the Casablanca market. Our team has supported over 350 businesses in Casablanca across various industries. We understand the competitive dynamics, search behaviors and growth levers specific to Morocco's economic capital.",
                    ar: "تجمع RankUp بين الخبرة التقنية المتقدمة والمعرفة المعمقة بسوق الدار البيضاء. رافق فريقنا أكثر من 350 شركة في الدار البيضاء عبر قطاعات متنوعة. نفهم الديناميكيات التنافسية وسلوكيات البحث وروافع النمو الخاصة بالعاصمة الاقتصادية للمغرب.",
                },
            },
            {
                question: {
                    fr: "Quel est le coût du marketing digital à Casablanca ?",
                    en: "What is the cost of digital marketing in Casablanca?",
                    ar: "ما هي تكلفة التسويق الرقمي في الدار البيضاء؟",
                },
                answer: {
                    fr: "Les investissements en marketing digital à Casablanca varient selon l'ambition et le secteur. Pour le SEO, comptez à partir de 4 000 MAD/mois. La publicité en ligne nécessite un budget moyen de 5 000 à 15 000 MAD/mois pour être compétitif. La création d'un site web professionnel commence à 10 000 MAD. Nous adaptons nos propositions à votre budget et vos objectifs de croissance.",
                    en: "Digital marketing investments in Casablanca vary depending on ambition and industry. For SEO, expect from 4 000 MAD/month. Online advertising requires an average budget of 5 000 to 15 000 MAD/month to be competitive. Professional website creation starts at 10 000 MAD. We tailor our proposals to your budget and growth objectives.",
                    ar: "تختلف استثمارات التسويق الرقمي في الدار البيضاء حسب الطموح والقطاع. بالنسبة لتحسين محركات البحث، تبدأ الأسعار من 4 000 درهم/شهر. تتطلب الإعلانات الرقمية ميزانية متوسطة من 5 000 إلى 15 000 درهم/شهر لتكونوا تنافسيين. يبدأ تصميم موقع إلكتروني احترافي من 10 000 درهم. نكيّف عروضنا حسب ميزانيتكم وأهداف نموكم.",
                },
            },
            {
                question: {
                    fr: "Combien de temps faut-il pour être premier sur Google à Casablanca ?",
                    en: "How long does it take to rank first on Google in Casablanca?",
                    ar: "كم من الوقت يلزم للوصول إلى المرتبة الأولى على جوجل في الدار البيضاء؟",
                },
                answer: {
                    fr: "La concurrence étant plus forte à Casablanca qu'ailleurs au Maroc, le SEO nécessite un travail plus soutenu. Les premiers résultats apparaissent sous 3 à 4 mois, mais les positions stables en première page sur des requêtes concurrentielles peuvent demander 6 à 12 mois d'efforts constants. Notre approche progressive garantit des gains réguliers et mesurables tout au long du processus.",
                    en: "With competition being stronger in Casablanca than elsewhere in Morocco, SEO requires more sustained effort. Initial results appear within 3 to 4 months, but stable first-page positions on competitive queries can take 6 to 12 months of consistent effort. Our progressive approach ensures steady, measurable gains throughout the process.",
                    ar: "نظراً لأن المنافسة أقوى في الدار البيضاء مقارنة ببقية المغرب، يتطلب تحسين محركات البحث جهداً أكثر استدامة. تظهر النتائج الأولى خلال 3 إلى 4 أشهر، لكن المراتب المستقرة في الصفحة الأولى على الاستعلامات التنافسية قد تتطلب من 6 إلى 12 شهراً من الجهد المتواصل. يضمن نهجنا التدريجي تحقيق مكاسب منتظمة وقابلة للقياس طوال العملية.",
                },
            },
            {
                question: {
                    fr: "Proposez-vous des rendez-vous en personne à Casablanca ?",
                    en: "Do you offer in-person meetings in Casablanca?",
                    ar: "هل تقدمون لقاءات شخصية في الدار البيضاء؟",
                },
                answer: {
                    fr: "Oui, nous nous déplaçons régulièrement à Casablanca pour des rendez-vous clients. Nous disposons d'espaces de réunion partenaires dans le quartier Maârif et à Anfa. Les échanges à distance (visioconférence, WhatsApp) complètent ces rencontres pour un suivi régulier et efficace.",
                    en: "Yes, we regularly travel to Casablanca for client meetings. We have partner meeting spaces in the Maârif district and Anfa. Remote exchanges (video conferencing, WhatsApp) complement these meetings for regular and effective follow-up.",
                    ar: "نعم، نتنقل بانتظام إلى الدار البيضاء للقاء العملاء. لدينا فضاءات اجتماعات شريكة في حي المعاريف وأنفا. تكمّل التبادلات عن بُعد (المؤتمرات المرئية، واتساب) هذه اللقاءات لمتابعة منتظمة وفعالة.",
                },
            },
            {
                question: {
                    fr: "RankUp travaille avec quels types d'entreprises à Casablanca ?",
                    en: "What types of businesses does RankUp work with in Casablanca?",
                    ar: "ما أنواع الشركات التي تعمل معها RankUp في الدار البيضاء؟",
                },
                answer: {
                    fr: "Nous travaillons avec tous types d'entreprises casablancaises : startups en phase de lancement, PME en croissance, grandes entreprises, multinationales et franchises. Notre méthodologie modulaire s'adapte à la taille, au secteur et aux ambitions de chaque client pour offrir un accompagnement véritablement personnalisé.",
                    en: "We work with all types of Casablanca businesses: startups in launch phase, growing SMEs, large enterprises, multinationals and franchises. Our modular methodology adapts to the size, industry and ambitions of each client to deliver truly personalized support.",
                    ar: "نعمل مع جميع أنواع شركات الدار البيضاء: شركات ناشئة في مرحلة الانطلاق، مقاولات صغرى ومتوسطة في طور النمو، مؤسسات كبرى، شركات متعددة الجنسيات وامتيازات تجارية. تتكيف منهجيتنا المرنة مع حجم كل عميل وقطاعه وطموحاته لتقديم مرافقة شخصية حقيقية.",
                },
            },
        ],
        testimonial: {
            name: "Sara M.",
            company: "TechStart, Casablanca",
            text: {
                fr: "L'équipe de RankUp a multiplié notre communauté par 5 en 3 mois. Leur expertise en branding et social media à Casablanca est exceptionnelle. Un vrai partenaire de croissance.",
                en: "The RankUp team grew our community 5x in 3 months. Their branding and social media expertise in Casablanca is exceptional. A true growth partner.",
                ar: "ضاعف فريق RankUp مجتمعنا الرقمي 5 مرات خلال 3 أشهر. خبرتهم في العلامات التجارية ووسائل التواصل الاجتماعي في الدار البيضاء استثنائية. شريك نمو حقيقي.",
            },
        },
    },
    {
        slug: "agence-marketing-digital-rabat",
        name: "Rabat",
        lat: 34.0209,
        lng: -6.8416,
        image: "/images/cities/rabat.png",
        emoji: "🏛️",
        metaTitle: {
            fr: "Agence Marketing Digital à Rabat | SEO, Ads & Web | RankUp",
            en: "Digital Marketing Agency in Rabat | SEO, Ads & Web | RankUp",
            ar: "وكالة تسويق رقمي في الرباط | SEO، إعلانات وتصميم مواقع | RankUp",
        },
        metaDescription: {
            fr: "RankUp, votre agence marketing digital à Rabat. SEO, publicité digitale, création de sites web et branding pour les entreprises de la capitale administrative du Maroc.",
            en: "RankUp, your digital marketing agency in Rabat. SEO, digital advertising, website creation and branding for businesses in Morocco's administrative capital.",
            ar: "RankUp، وكالتكم للتسويق الرقمي في الرباط. تحسين محركات البحث، الإعلانات الرقمية، تصميم المواقع والعلامات التجارية لشركات العاصمة الإدارية للمغرب.",
        },
        heroTitle: {
            fr: "Agence Marketing Digital & Web",
            en: "Digital Marketing & Web Agency",
            ar: "وكالة تسويق رقمي وويب",
        },
        heroHighlight: {
            fr: "à Rabat — Votre Partenaire Digital",
            en: "in Rabat — Your Digital Partner",
            ar: "في الرباط — شريككم الرقمي",
        },
        heroSubtitle: {
            fr: "Boostez la visibilité de votre entreprise à Rabat avec des stratégies digitales performantes. RankUp accompagne les institutions, startups et PME de la capitale du Maroc.",
            en: "Boost your business visibility in Rabat with high-performance digital strategies. RankUp supports institutions, startups and SMEs in Morocco's capital.",
            ar: "عززوا ظهور مؤسستكم في الرباط باستراتيجيات رقمية فعالة. ترافق RankUp المؤسسات والشركات الناشئة والمقاولات الصغرى والمتوسطة في عاصمة المغرب.",
        },
        intro: {
            fr: "Rabat, capitale administrative du Maroc, est un pôle économique majeur avec une concentration unique d'institutions publiques, d'organisations internationales, de startups tech et de PME dynamiques. RankUp est votre agence marketing digital à Rabat, combinant expertise digitale de pointe et compréhension fine de l'écosystème rbati. De la Tech City de Rabat aux ministères de Hay Riad, nous accompagnons les acteurs de la capitale dans leur transformation digitale avec des résultats mesurables.",
            en: "Rabat, Morocco's administrative capital, is a major economic hub with a unique concentration of public institutions, international organizations, tech startups and dynamic SMEs. RankUp is your digital marketing agency in Rabat, combining cutting-edge digital expertise with a deep understanding of the Rabat ecosystem. From Rabat's Tech City to the ministries of Hay Riad, we support the capital's key players in their digital transformation with measurable results.",
            ar: "الرباط، العاصمة الإدارية للمغرب، هي قطب اقتصادي رئيسي بتركيز فريد من المؤسسات العمومية والمنظمات الدولية والشركات التكنولوجية الناشئة والمقاولات الصغرى والمتوسطة الديناميكية. RankUp هي وكالتكم للتسويق الرقمي في الرباط، تجمع بين الخبرة الرقمية المتقدمة والفهم العميق للمنظومة الرباطية. من مدينة التكنولوجيا بالرباط إلى الوزارات في حي الرياض، نرافق فاعلي العاصمة في تحولهم الرقمي بنتائج قابلة للقياس.",
        },
        keyStats: [
            { value: 180, suffix: '+', label: { fr: "Clients à Rabat", en: "Clients in Rabat", ar: "عميل في الرباط" } },
            { value: 95, suffix: '%', label: { fr: "Taux de rétention", en: "Retention rate", ar: "نسبة الاحتفاظ بالعملاء" } },
            { value: 380, suffix: '%', label: { fr: "Croissance moyenne", en: "Average growth", ar: "نمو متوسط" } },
            { value: 30, suffix: '+', label: { fr: "Secteurs couverts", en: "Industries covered", ar: "قطاع مغطى" } },
        ],
        neighborhoods: ["Agdal", "Hay Riad", "Hassan", "Océan", "Souissi", "Yacoub El Mansour", "Salé", "Témara", "Harhoura", "Bouknadel"],
        industries: [
            {
                icon: "🏛️",
                name: { fr: "Institutions & Secteur Public", en: "Institutions & Public Sector", ar: "المؤسسات والقطاع العام" },
                desc: {
                    fr: "Ministères, établissements publics, organisations internationales et administrations de la capitale du Maroc.",
                    en: "Ministries, public institutions, international organizations and government agencies in Morocco's capital.",
                    ar: "الوزارات، المؤسسات العمومية، المنظمات الدولية والإدارات في عاصمة المغرب.",
                },
            },
            {
                icon: "💻",
                name: { fr: "Tech & Innovation", en: "Tech & Innovation", ar: "التكنولوجيا والابتكار" },
                desc: {
                    fr: "Startups, incubateurs, ESN et entreprises technologiques du Technopark et de la Tech City de Rabat.",
                    en: "Startups, incubators, IT service companies and tech firms from Technopark and Rabat's Tech City.",
                    ar: "الشركات الناشئة، حاضنات الأعمال، شركات خدمات تكنولوجيا المعلومات والشركات التكنولوجية في تكنوبارك ومدينة التكنولوجيا بالرباط.",
                },
            },
            {
                icon: "📚",
                name: { fr: "Éducation & Recherche", en: "Education & Research", ar: "التعليم والبحث العلمي" },
                desc: {
                    fr: "Universités, grandes écoles, laboratoires de recherche et centres de formation de Rabat et Salé.",
                    en: "Universities, prestigious schools, research laboratories and training centers in Rabat and Salé.",
                    ar: "الجامعات، المدارس العليا، مختبرات البحث ومراكز التكوين في الرباط وسلا.",
                },
            },
            {
                icon: "⚖️",
                name: { fr: "Services Juridiques", en: "Legal Services", ar: "الخدمات القانونية" },
                desc: {
                    fr: "Cabinets d'avocats, notaires, experts-comptables et sociétés de consulting de la capitale.",
                    en: "Law firms, notaries, chartered accountants and consulting firms in the capital.",
                    ar: "مكاتب المحاماة، الموثقون، خبراء المحاسبة وشركات الاستشارات في العاصمة.",
                },
            },
            {
                icon: "🏠",
                name: { fr: "Immobilier", en: "Real Estate", ar: "العقارات" },
                desc: {
                    fr: "Promoteurs, agences immobilières et architectes de Rabat, Hay Riad, Souissi et Témara.",
                    en: "Developers, real estate agencies and architects in Rabat, Hay Riad, Souissi and Témara.",
                    ar: "المنعشون العقاريون، الوكالات العقارية والمهندسون المعماريون في الرباط، حي الرياض، السويسي وتمارة.",
                },
            },
            {
                icon: "🎭",
                name: { fr: "Culture & Tourisme", en: "Culture & Tourism", ar: "الثقافة والسياحة" },
                desc: {
                    fr: "Musées, galeries, festivals culturels, hôtels et restaurants de la médina et du centre-ville.",
                    en: "Museums, galleries, cultural festivals, hotels and restaurants in the medina and city center.",
                    ar: "المتاحف، المعارض الفنية، المهرجانات الثقافية، الفنادق والمطاعم في المدينة القديمة ووسط المدينة.",
                },
            },
        ],
        services: [
            {
                title: { fr: "SEO Rabat", en: "SEO Rabat", ar: "تحسين محركات البحث في الرباط" },
                description: {
                    fr: "Référencement naturel optimisé pour les entreprises à Rabat : SEO local, contenu géo-ciblé et optimisation Google Business Profile spécifique à la capitale.",
                    en: "Optimized organic search for businesses in Rabat: local SEO, geo-targeted content and Google Business Profile optimization specific to the capital.",
                    ar: "تحسين محركات البحث الطبيعي للشركات في الرباط: تحسين محلي، محتوى مستهدف جغرافياً وتحسين ملف Google Business Profile خاص بالعاصمة.",
                },
                icon: "🔍",
            },
            {
                title: { fr: "Google Ads Rabat", en: "Google Ads Rabat", ar: "إعلانات جوجل الرباط" },
                description: {
                    fr: "Campagnes publicitaires ciblées sur Rabat, Salé et Témara pour générer des leads qualifiés et augmenter votre chiffre d'affaires.",
                    en: "Targeted advertising campaigns for Rabat, Salé and Témara to generate qualified leads and increase your revenue.",
                    ar: "حملات إعلانية مستهدفة على الرباط وسلا وتمارة لتوليد عملاء محتملين مؤهلين وزيادة رقم معاملاتكم.",
                },
                icon: "📢",
            },
            {
                title: { fr: "Sites Web Institutionnels", en: "Institutional Websites", ar: "المواقع الإلكترونية المؤسسية" },
                description: {
                    fr: "Création de sites web professionnels et institutionnels pour les organisations et entreprises de Rabat, conformes aux standards d'accessibilité.",
                    en: "Professional and institutional website creation for organizations and businesses in Rabat, compliant with accessibility standards.",
                    ar: "تصميم مواقع إلكترونية احترافية ومؤسسية للمنظمات والشركات في الرباط، مطابقة لمعايير إمكانية الوصول.",
                },
                icon: "🌐",
            },
            {
                title: { fr: "Social Media Rabat", en: "Social Media Rabat", ar: "وسائل التواصل الاجتماعي الرباط" },
                description: {
                    fr: "Stratégies social media adaptées à l'audience rbatie sur LinkedIn, Instagram, Facebook et Twitter.",
                    en: "Social media strategies tailored to the Rabat audience on LinkedIn, Instagram, Facebook and Twitter.",
                    ar: "استراتيجيات وسائل التواصل الاجتماعي الملائمة لجمهور الرباط على لينكدإن وإنستغرام وفيسبوك وتويتر.",
                },
                icon: "📱",
            },
            {
                title: { fr: "Branding Institutionnel", en: "Institutional Branding", ar: "العلامة التجارية المؤسسية" },
                description: {
                    fr: "Identités visuelles premium pour les institutions, startups et entreprises de la capitale marocaine.",
                    en: "Premium visual identities for institutions, startups and businesses in the Moroccan capital.",
                    ar: "هويات بصرية متميزة للمؤسسات والشركات الناشئة والمقاولات في العاصمة المغربية.",
                },
                icon: "🎨",
            },
            {
                title: { fr: "Communication Digitale", en: "Digital Communication", ar: "التواصل الرقمي" },
                description: {
                    fr: "Stratégies de communication digitale complètes pour les entreprises et institutions de Rabat : newsletters, webinaires, événements.",
                    en: "Comprehensive digital communication strategies for businesses and institutions in Rabat: newsletters, webinars, events.",
                    ar: "استراتيجيات تواصل رقمي شاملة للشركات والمؤسسات في الرباط: نشرات إخبارية، ندوات عبر الإنترنت، فعاليات.",
                },
                icon: "📧",
            },
        ],
        seoContent: [
            {
                fr: "Rabat, capitale politique et administrative du Maroc, est aussi un pôle économique en pleine expansion. Avec le développement de la Tech City, du Technopark et des zones d'activités modernes, la ville attire de plus en plus de startups et d'entreprises innovantes. Le marketing digital est un levier essentiel pour ces acteurs souhaitant se positionner rapidement sur un marché en forte croissance.",
                en: "Rabat, Morocco's political and administrative capital, is also a rapidly expanding economic hub. With the development of Tech City, Technopark and modern business zones, the city is attracting an increasing number of startups and innovative companies. Digital marketing is an essential lever for these players seeking to position themselves quickly in a fast-growing market.",
                ar: "الرباط، العاصمة السياسية والإدارية للمغرب، هي أيضاً قطب اقتصادي في توسع سريع. مع تطوير مدينة التكنولوجيا وتكنوبارك والمناطق الاقتصادية الحديثة، تستقطب المدينة عدداً متزايداً من الشركات الناشئة والمقاولات المبتكرة. يُعدّ التسويق الرقمي رافعة أساسية لهؤلاء الفاعلين الراغبين في التموقع سريعاً في سوق يشهد نمواً قوياً.",
            },
            {
                fr: "RankUp accompagne les entreprises rbaties dans des quartiers stratégiques : Agdal avec ses commerces dynamiques, Hay Riad et son quartier d'affaires, Hassan et ses institutions historiques, Souissi et sa clientèle premium. Notre connaissance du tissu économique de Rabat-Salé-Kénitra nous permet de proposer des stratégies parfaitement adaptées.",
                en: "RankUp supports Rabat businesses in strategic neighborhoods: Agdal with its dynamic retail scene, Hay Riad and its business district, Hassan and its historic institutions, Souissi and its premium clientele. Our knowledge of the Rabat-Salé-Kénitra economic fabric allows us to deliver perfectly tailored strategies.",
                ar: "ترافق RankUp شركات الرباط في أحياء استراتيجية: أكدال بتجارته الديناميكية، حي الرياض وحيه التجاري، حسان ومؤسساته التاريخية، السويسي وعملائه المميزين. معرفتنا بالنسيج الاقتصادي للرباط-سلا-القنيطرة تمكننا من تقديم استراتيجيات ملائمة تماماً.",
            },
            {
                fr: "Le positionnement SEO à Rabat offre des opportunités significatives, notamment pour les requêtes liées aux services B2B, à l'éducation, à la santé et à l'immobilier. RankUp développe des stratégies de contenu ciblées qui captent cette demande locale et convertissent les visiteurs en clients.",
                en: "SEO positioning in Rabat offers significant opportunities, particularly for queries related to B2B services, education, healthcare and real estate. RankUp develops targeted content strategies that capture this local demand and convert visitors into customers.",
                ar: "يوفر التموقع في محركات البحث في الرباط فرصاً كبيرة، لا سيما للاستعلامات المتعلقة بخدمات الأعمال والتعليم والصحة والعقارات. تطوّر RankUp استراتيجيات محتوى مستهدفة تستقطب هذا الطلب المحلي وتحوّل الزوار إلى عملاء.",
            },
        ],
        faq: [
            {
                question: {
                    fr: "Pourquoi investir dans le marketing digital à Rabat ?",
                    en: "Why invest in digital marketing in Rabat?",
                    ar: "لماذا الاستثمار في التسويق الرقمي في الرباط؟",
                },
                answer: {
                    fr: "Rabat connaît une croissance digitale rapide avec le développement de la Tech City et l'augmentation du nombre d'entreprises en ligne. Investir dans le marketing digital permet aux entreprises rbaties de capter une clientèle locale et nationale en pleine expansion, avec un coût d'acquisition souvent inférieur à celui de Casablanca.",
                    en: "Rabat is experiencing rapid digital growth with the development of Tech City and the increasing number of online businesses. Investing in digital marketing allows Rabat businesses to capture a rapidly expanding local and national clientele, with acquisition costs often lower than in Casablanca.",
                    ar: "تشهد الرباط نمواً رقمياً سريعاً مع تطوير مدينة التكنولوجيا وارتفاع عدد المقاولات الرقمية. يتيح الاستثمار في التسويق الرقمي لشركات الرباط استقطاب عملاء محليين ووطنيين في توسع مستمر، بتكلفة اكتساب غالباً ما تكون أقل مما هي عليه في الدار البيضاء.",
                },
            },
            {
                question: {
                    fr: "RankUp a-t-il des bureaux à Rabat ?",
                    en: "Does RankUp have offices in Rabat?",
                    ar: "هل لدى RankUp مكاتب في الرباط؟",
                },
                answer: {
                    fr: "Oui, RankUp dispose d'un bureau régional dans le quartier Agdal à Rabat. Nous accueillons régulièrement nos clients pour des réunions stratégiques et des présentations de projets. Nos experts se déplacent également dans vos locaux à Rabat, Salé ou Témara.",
                    en: "Yes, RankUp has a regional office in the Agdal district of Rabat. We regularly host our clients for strategic meetings and project presentations. Our experts also travel to your premises in Rabat, Salé or Témara.",
                    ar: "نعم، تمتلك RankUp مكتباً جهوياً في حي أكدال بالرباط. نستقبل عملاءنا بانتظام لاجتماعات استراتيجية وعروض المشاريع. ينتقل خبراؤنا أيضاً إلى مقراتكم في الرباط أو سلا أو تمارة.",
                },
            },
            {
                question: {
                    fr: "Quels secteurs accompagnez-vous à Rabat ?",
                    en: "What industries do you serve in Rabat?",
                    ar: "ما هي القطاعات التي ترافقونها في الرباط؟",
                },
                answer: {
                    fr: "Nous accompagnons les institutions publiques, les startups tech, les cabinets de conseil, les professions libérales, les entreprises immobilières, les établissements d'éducation et les acteurs culturels de Rabat. Notre expertise s'adapte aux spécificités de chaque secteur.",
                    en: "We serve public institutions, tech startups, consulting firms, liberal professions, real estate companies, educational establishments and cultural organizations in Rabat. Our expertise adapts to the specificities of each sector.",
                    ar: "نرافق المؤسسات العمومية، الشركات التكنولوجية الناشئة، مكاتب الاستشارات، المهن الحرة، الشركات العقارية، المؤسسات التعليمية والفاعلين الثقافيين في الرباط. تتكيف خبرتنا مع خصوصيات كل قطاع.",
                },
            },
            {
                question: {
                    fr: "Combien coûte le SEO à Rabat ?",
                    en: "How much does SEO cost in Rabat?",
                    ar: "كم تكلفة تحسين محركات البحث في الرباط؟",
                },
                answer: {
                    fr: "Le SEO à Rabat est légèrement moins concurrentiel qu'à Casablanca, ce qui permet d'obtenir des résultats significatifs avec des budgets à partir de 3 500 MAD/mois. Pour une stratégie complète incluant le contenu et le netlinking, comptez entre 5 000 et 10 000 MAD/mois selon la concurrence dans votre secteur.",
                    en: "SEO in Rabat is slightly less competitive than in Casablanca, which allows for significant results with budgets starting from 3 500 MAD/month. For a comprehensive strategy including content and link building, expect between 5 000 and 10 000 MAD/month depending on competition in your industry.",
                    ar: "تحسين محركات البحث في الرباط أقل تنافسية بقليل من الدار البيضاء، مما يسمح بتحقيق نتائج ملموسة بميزانيات تبدأ من 3 500 درهم/شهر. لاستراتيجية شاملة تتضمن المحتوى وبناء الروابط، توقعوا ما بين 5 000 و10 000 درهم/شهر حسب المنافسة في قطاعكم.",
                },
            },
            {
                question: {
                    fr: "En combien de temps peut-on voir des résultats à Rabat ?",
                    en: "How quickly can you see results in Rabat?",
                    ar: "في كم من الوقت يمكن رؤية النتائج في الرباط؟",
                },
                answer: {
                    fr: "Le marché de Rabat étant moins saturé que celui de Casablanca pour de nombreuses requêtes, les premiers résultats SEO apparaissent généralement sous 2 à 4 mois. La publicité en ligne (Google Ads, Social Ads) génère des résultats dès la première semaine de lancement.",
                    en: "As the Rabat market is less saturated than Casablanca for many queries, initial SEO results typically appear within 2 to 4 months. Online advertising (Google Ads, Social Ads) generates results from the very first week of launch.",
                    ar: "نظراً لأن سوق الرباط أقل تشبعاً من الدار البيضاء في العديد من الاستعلامات، تظهر النتائج الأولى لتحسين محركات البحث عادةً خلال 2 إلى 4 أشهر. تحقق الإعلانات الرقمية (إعلانات جوجل، إعلانات وسائل التواصل) نتائج منذ الأسبوع الأول من الإطلاق.",
                },
            },
        ],
        testimonial: {
            name: "Mehdi A.",
            company: "MedTech, Rabat",
            text: {
                fr: "RankUp nous a aidés à nous positionner sur les mots-clés stratégiques de la santé digitale à Rabat. Résultat : +800% de trafic organique en 6 mois et une augmentation significative de nos leads.",
                en: "RankUp helped us rank for strategic digital health keywords in Rabat. Result: +800% organic traffic in 6 months and a significant increase in our leads.",
                ar: "ساعدتنا RankUp على التموقع في الكلمات المفتاحية الاستراتيجية للصحة الرقمية في الرباط. النتيجة: +800% من حركة المرور العضوية خلال 6 أشهر وزيادة ملموسة في العملاء المحتملين.",
            },
        },
    },
    {
        slug: "agence-marketing-digital-marrakech",
        name: "Marrakech",
        lat: 31.6295,
        lng: -7.9811,
        image: "/images/cities/marrakech.png",
        emoji: "🕌",
        metaTitle: {
            fr: "Agence Marketing Digital à Marrakech | SEO, Ads & Web | RankUp",
            en: "Digital Marketing Agency in Marrakech | SEO, Ads & Web | RankUp",
            ar: "وكالة تسويق رقمي في مراكش | SEO، إعلانات وتصميم مواقع | RankUp",
        },
        metaDescription: {
            fr: "RankUp, agence marketing digital à Marrakech. SEO tourisme, Google Ads, création de sites web et branding pour les entreprises de la ville ocre.",
            en: "RankUp, digital marketing agency in Marrakech. Tourism SEO, Google Ads, website creation and branding for businesses in the Ochre City.",
            ar: "RankUp، وكالة تسويق رقمي في مراكش. تحسين محركات البحث السياحي، إعلانات جوجل، تصميم المواقع والعلامات التجارية لشركات المدينة الحمراء.",
        },
        heroTitle: {
            fr: "Agence Marketing Digital & SEO Tourisme",
            en: "Digital Marketing & Tourism SEO Agency",
            ar: "وكالة تسويق رقمي وSEO سياحي",
        },
        heroHighlight: {
            fr: "à Marrakech — Croissance Digitale",
            en: "in Marrakech — Digital Growth",
            ar: "في مراكش — نمو رقمي",
        },
        heroSubtitle: {
            fr: "Donnez à votre entreprise à Marrakech une visibilité digitale à la hauteur de la renommée de la Ville Ocre. SEO tourisme, publicité ciblée et branding premium avec RankUp.",
            en: "Give your business in Marrakech digital visibility that matches the Ochre City's renown. Tourism SEO, targeted advertising and premium branding with RankUp.",
            ar: "امنحوا مؤسستكم في مراكش حضوراً رقمياً يليق بشهرة المدينة الحمراء. تحسين محركات البحث السياحي، إعلانات مستهدفة وعلامة تجارية متميزة مع RankUp.",
        },
        intro: {
            fr: "Marrakech est l'une des destinations les plus célèbres au monde, attirant des millions de visiteurs chaque année. Pour les entreprises marrakchies, cette notoriété internationale est une opportunité exceptionnelle — à condition de savoir la capter en ligne. RankUp est votre agence marketing digital à Marrakech, spécialisée dans les stratégies digitales pour le tourisme, l'hôtellerie, la restauration, l'immobilier de luxe et le commerce. Notre expertise unique combine SEO international, publicité multilingue et branding premium pour positionner votre entreprise face à une clientèle locale, nationale et internationale.",
            en: "Marrakech is one of the world's most famous destinations, attracting millions of visitors every year. For Marrakech-based businesses, this international renown is an exceptional opportunity — provided you know how to capture it online. RankUp is your digital marketing agency in Marrakech, specializing in digital strategies for tourism, hospitality, dining, luxury real estate and retail. Our unique expertise combines international SEO, multilingual advertising and premium branding to position your business in front of local, national and international clientele.",
            ar: "مراكش هي واحدة من أشهر الوجهات في العالم، تستقطب ملايين الزوار كل سنة. بالنسبة للشركات المراكشية، هذه الشهرة العالمية فرصة استثنائية — شرط معرفة استقطابها رقمياً. RankUp هي وكالتكم للتسويق الرقمي في مراكش، المتخصصة في الاستراتيجيات الرقمية للسياحة والفندقة والمطاعم والعقارات الفاخرة والتجارة. تجمع خبرتنا الفريدة بين تحسين محركات البحث الدولي والإعلانات متعددة اللغات والعلامة التجارية المتميزة لوضع مؤسستكم أمام عملاء محليين ووطنيين ودوليين.",
        },
        keyStats: [
            { value: 200, suffix: '+', label: { fr: "Clients à Marrakech", en: "Clients in Marrakech", ar: "عميل في مراكش" } },
            { value: 15, suffix: '+', label: { fr: "Langues ciblées", en: "Languages targeted", ar: "لغة مستهدفة" } },
            { value: 500, suffix: '%', label: { fr: "Croissance tourisme", en: "Tourism growth", ar: "نمو السياحة" } },
            { value: 40, suffix: '%', label: { fr: "Occupation hôtelière +", en: "Hotel occupancy +", ar: "نسبة إشغال فندقي +" } },
        ],
        neighborhoods: ["Guéliz", "Médina", "Hivernage", "Palmeraie", "Route d'Ourika", "Targa", "Agdal Marrakech", "Ménara", "Route de l'Ourika", "Tamansourt"],
        industries: [
            {
                icon: "🏨",
                name: { fr: "Hôtellerie & Riads", en: "Hotels & Riads", ar: "الفندقة والرياضات" },
                desc: {
                    fr: "Hôtels, riads, maisons d'hôtes, résidences touristiques et complexes de luxe de la Palmeraie et de la Médina.",
                    en: "Hotels, riads, guesthouses, tourist residences and luxury resorts in the Palmeraie and Medina.",
                    ar: "الفنادق، الرياضات، دور الضيافة، الإقامات السياحية والمنتجعات الفاخرة في النخيل والمدينة القديمة.",
                },
            },
            {
                icon: "🍽️",
                name: { fr: "Restauration & Gastronomie", en: "Dining & Gastronomy", ar: "المطاعم وفن الطبخ" },
                desc: {
                    fr: "Restaurants gastronomiques, rooftops, cafés branchés et traiteurs de Guéliz et de la Place Jemaa el-Fna.",
                    en: "Gourmet restaurants, rooftops, trendy cafés and caterers in Guéliz and Jemaa el-Fna Square.",
                    ar: "المطاعم الراقية، الأسطح، المقاهي العصرية ومتعهدو الحفلات في جليز وساحة جامع الفنا.",
                },
            },
            {
                icon: "🏡",
                name: { fr: "Immobilier de Luxe", en: "Luxury Real Estate", ar: "العقارات الفاخرة" },
                desc: {
                    fr: "Villas de prestige, appartements haut de gamme, promotions immobilières dans la Palmeraie et Route de l'Ourika.",
                    en: "Prestigious villas, high-end apartments, property developments in the Palmeraie and Route de l'Ourika.",
                    ar: "فيلات فاخرة، شقق راقية، مشاريع عقارية في النخيل وطريق أوريكا.",
                },
            },
            {
                icon: "🧖",
                name: { fr: "Spa & Bien-être", en: "Spa & Wellness", ar: "المنتجعات الصحية والعافية" },
                desc: {
                    fr: "Spas, hammams, centres de bien-être et retraites yoga à Marrakech et dans la vallée de l'Ourika.",
                    en: "Spas, hammams, wellness centers and yoga retreats in Marrakech and the Ourika Valley.",
                    ar: "المنتجعات الصحية، الحمامات، مراكز العافية ومنتجعات اليوغا في مراكش ووادي أوريكا.",
                },
            },
            {
                icon: "🎪",
                name: { fr: "Événementiel", en: "Events", ar: "تنظيم الفعاليات" },
                desc: {
                    fr: "Organisation d'événements, mariages de destination, conférences et festivals culturels de la Ville Ocre.",
                    en: "Event planning, destination weddings, conferences and cultural festivals in the Ochre City.",
                    ar: "تنظيم الفعاليات، حفلات الزفاف السياحية، المؤتمرات والمهرجانات الثقافية في المدينة الحمراء.",
                },
            },
            {
                icon: "🛍️",
                name: { fr: "Artisanat & Luxe", en: "Craftsmanship & Luxury", ar: "الحرف اليدوية والفخامة" },
                desc: {
                    fr: "Artisans, boutiques de luxe, galeries d'art et créateurs de mode de la médina et de Guéliz.",
                    en: "Artisans, luxury boutiques, art galleries and fashion designers in the medina and Guéliz.",
                    ar: "الحرفيون، المتاجر الفاخرة، المعارض الفنية ومصممو الأزياء في المدينة القديمة وجليز.",
                },
            },
        ],
        services: [
            {
                title: { fr: "SEO Tourisme Marrakech", en: "Tourism SEO Marrakech", ar: "تحسين محركات البحث السياحي في مراكش" },
                description: {
                    fr: "Stratégie SEO multilingue (FR/EN/ES/DE) pour les entreprises touristiques de Marrakech : hôtels, riads, activités et restaurants.",
                    en: "Multilingual SEO strategy (FR/EN/ES/DE) for Marrakech tourism businesses: hotels, riads, activities and restaurants.",
                    ar: "استراتيجية تحسين محركات البحث متعددة اللغات (FR/EN/ES/DE) للشركات السياحية في مراكش: فنادق، رياضات، أنشطة ومطاعم.",
                },
                icon: "🔍",
            },
            {
                title: { fr: "Google Ads International", en: "International Google Ads", ar: "إعلانات جوجل الدولية" },
                description: {
                    fr: "Campagnes publicitaires ciblant les touristes internationaux recherchant des services à Marrakech sur Google, Instagram et TripAdvisor.",
                    en: "Advertising campaigns targeting international tourists searching for services in Marrakech on Google, Instagram and TripAdvisor.",
                    ar: "حملات إعلانية تستهدف السياح الدوليين الباحثين عن خدمات في مراكش على جوجل وإنستغرام وتريب أدفايزر.",
                },
                icon: "📢",
            },
            {
                title: { fr: "Sites Web Booking", en: "Booking Websites", ar: "مواقع الحجز الإلكتروني" },
                description: {
                    fr: "Création de sites web avec système de réservation intégré pour les hôtels, riads et prestataires d'activités à Marrakech.",
                    en: "Website creation with integrated booking systems for hotels, riads and activity providers in Marrakech.",
                    ar: "تصميم مواقع إلكترونية بنظام حجز متكامل للفنادق والرياضات ومقدمي الأنشطة في مراكش.",
                },
                icon: "🌐",
            },
            {
                title: { fr: "Social Media Tourism", en: "Tourism Social Media", ar: "وسائل التواصل الاجتماعي السياحية" },
                description: {
                    fr: "Gestion des réseaux sociaux avec focus sur l'engagement touristique : Instagram aesthetics, stories immersives et UGC.",
                    en: "Social media management focused on tourism engagement: Instagram aesthetics, immersive stories and UGC.",
                    ar: "إدارة وسائل التواصل الاجتماعي مع التركيز على التفاعل السياحي: جماليات إنستغرام، قصص غامرة ومحتوى المستخدمين.",
                },
                icon: "📱",
            },
            {
                title: { fr: "Branding Luxe", en: "Luxury Branding", ar: "العلامة التجارية الفاخرة" },
                description: {
                    fr: "Identités visuelles premium et branding de luxe pour les marques marrakchies souhaitant refléter l'élégance de la Ville Ocre.",
                    en: "Premium visual identities and luxury branding for Marrakech brands seeking to reflect the elegance of the Ochre City.",
                    ar: "هويات بصرية متميزة وعلامات تجارية فاخرة للعلامات المراكشية الراغبة في عكس أناقة المدينة الحمراء.",
                },
                icon: "🎨",
            },
            {
                title: { fr: "Gestion TripAdvisor/Booking", en: "TripAdvisor/Booking Management", ar: "إدارة TripAdvisor/Booking" },
                description: {
                    fr: "Optimisation de votre présence sur TripAdvisor, Booking.com et Google Maps pour maximiser les réservations directes.",
                    en: "Optimization of your presence on TripAdvisor, Booking.com and Google Maps to maximize direct bookings.",
                    ar: "تحسين حضوركم على TripAdvisor وBooking.com وخرائط جوجل لتعظيم الحجوزات المباشرة.",
                },
                icon: "⭐",
            },
        ],
        seoContent: [
            {
                fr: "Marrakech occupe une place unique dans le paysage touristique mondial. Avec des millions de recherches mensuelles sur Google pour des requêtes comme 'riad Marrakech', 'hotel Marrakech', 'restaurant Marrakech' ou 'activités Marrakech', la ville offre un potentiel SEO exceptionnel. Les entreprises qui se positionnent en tête de ces résultats captent un flux continu de clients à fort pouvoir d'achat.",
                en: "Marrakech holds a unique position in the global tourism landscape. With millions of monthly Google searches for queries like 'riad Marrakech', 'hotel Marrakech', 'restaurant Marrakech' or 'activities Marrakech', the city offers exceptional SEO potential. Businesses that rank at the top of these results capture a continuous flow of high-spending customers.",
                ar: "تحتل مراكش مكانة فريدة في المشهد السياحي العالمي. مع ملايين البحوث الشهرية على جوجل لاستعلامات مثل 'رياض مراكش'، 'فندق مراكش'، 'مطعم مراكش' أو 'أنشطة مراكش'، تقدم المدينة إمكانات استثنائية في تحسين محركات البحث. الشركات التي تتصدر هذه النتائج تستقطب تدفقاً مستمراً من العملاء ذوي القدرة الشرائية العالية.",
            },
            {
                fr: "RankUp est spécialisée dans le SEO touristique à Marrakech. Notre expertise couvre le référencement multilingue (français, anglais, espagnol, allemand), l'optimisation des fiches Google Business Profile, la gestion des avis sur TripAdvisor et Booking.com, et la création de contenu immersif qui convertit les dreamers en bookers.",
                en: "RankUp specializes in tourism SEO in Marrakech. Our expertise covers multilingual search optimization (French, English, Spanish, German), Google Business Profile optimization, review management on TripAdvisor and Booking.com, and the creation of immersive content that converts dreamers into bookers.",
                ar: "تتخصص RankUp في تحسين محركات البحث السياحي في مراكش. تشمل خبرتنا تحسين محركات البحث متعدد اللغات (الفرنسية، الإنجليزية، الإسبانية، الألمانية)، تحسين ملفات Google Business Profile، إدارة التقييمات على TripAdvisor وBooking.com، وإنشاء محتوى غامر يحوّل الحالمين إلى حاجزين.",
            },
            {
                fr: "Au-delà du tourisme, Marrakech est aussi un hub pour l'immobilier de luxe, l'événementiel haut de gamme et l'artisanat premium. RankUp accompagne ces secteurs avec des stratégies digitales sophistiquées qui ciblent une clientèle internationale exigeante, en utilisant les dernières techniques de marketing digital et de storytelling visuel.",
                en: "Beyond tourism, Marrakech is also a hub for luxury real estate, high-end events and premium craftsmanship. RankUp supports these sectors with sophisticated digital strategies targeting a demanding international clientele, using the latest digital marketing techniques and visual storytelling.",
                ar: "بعيداً عن السياحة، مراكش هي أيضاً مركز للعقارات الفاخرة والفعاليات الراقية والحرف اليدوية المتميزة. ترافق RankUp هذه القطاعات باستراتيجيات رقمية متطورة تستهدف عملاء دوليين متطلبين، باستخدام أحدث تقنيات التسويق الرقمي والسرد البصري.",
            },
        ],
        faq: [
            {
                question: {
                    fr: "Quel type de marketing digital fonctionne le mieux à Marrakech ?",
                    en: "What type of digital marketing works best in Marrakech?",
                    ar: "ما نوع التسويق الرقمي الأكثر فعالية في مراكش؟",
                },
                answer: {
                    fr: "À Marrakech, le SEO multilingue et la publicité ciblée sur les voyageurs sont les leviers les plus puissants. Les recherches touristiques génèrent un volume immense de trafic qualifié. Pour les secteurs locaux (restauration, commerce), le SEO local et les réseaux sociaux (Instagram notamment) sont particulièrement efficaces. RankUp adapte la stratégie au profil de chaque entreprise marrakchie.",
                    en: "In Marrakech, multilingual SEO and traveler-targeted advertising are the most powerful levers. Tourism searches generate an immense volume of qualified traffic. For local sectors (dining, retail), local SEO and social media (especially Instagram) are particularly effective. RankUp tailors the strategy to each Marrakech business's profile.",
                    ar: "في مراكش، يُعدّ تحسين محركات البحث متعدد اللغات والإعلانات المستهدفة للمسافرين الروافع الأقوى. تولّد البحوث السياحية حجماً هائلاً من حركة المرور المؤهلة. بالنسبة للقطاعات المحلية (المطاعم، التجارة)، يكون تحسين محركات البحث المحلي ووسائل التواصل الاجتماعي (خاصة إنستغرام) فعالين بشكل خاص. تكيّف RankUp الاستراتيجية حسب نمط كل مؤسسة مراكشية.",
                },
            },
            {
                question: {
                    fr: "Comment attirer plus de touristes via le digital depuis Marrakech ?",
                    en: "How can you attract more tourists digitally from Marrakech?",
                    ar: "كيف تستقطب المزيد من السياح رقمياً من مراكش؟",
                },
                answer: {
                    fr: "La clé est de combiner SEO international (ciblant les requêtes en anglais, français et espagnol), publicité Google et Meta ciblée géographiquement, présence optimisée sur les plateformes de réservation, et un Instagram captivant qui met en valeur l'expérience que vous offrez. RankUp maîtrise l'ensemble de ces leviers pour maximiser votre visibilité auprès des voyageurs.",
                    en: "The key is to combine international SEO (targeting queries in English, French and Spanish), geographically targeted Google and Meta advertising, optimized presence on booking platforms, and a captivating Instagram that showcases the experience you offer. RankUp masters all of these levers to maximize your visibility among travelers.",
                    ar: "المفتاح هو الجمع بين تحسين محركات البحث الدولي (استهداف الاستعلامات بالإنجليزية والفرنسية والإسبانية)، إعلانات جوجل وميتا المستهدفة جغرافياً، الحضور المحسّن على منصات الحجز، وحساب إنستغرام جذاب يبرز التجربة التي تقدمونها. تتقن RankUp مجمل هذه الروافع لتعظيم ظهوركم لدى المسافرين.",
                },
            },
            {
                question: {
                    fr: "Proposez-vous des services en anglais pour de clients internationaux à Marrakech ?",
                    en: "Do you offer services in English for international clients in Marrakech?",
                    ar: "هل تقدمون خدمات بالإنجليزية للعملاء الدوليين في مراكش؟",
                },
                answer: {
                    fr: "Oui, notre équipe est trilingue (français, anglais, arabe) et nous créons du contenu marketing en français, anglais, espagnol et allemand. Nous accompagnons de nombreuses entreprises internationales basées à Marrakech et gérons des campagnes publicitaires ciblant des audiences dans plus de 15 pays.",
                    en: "Yes, our team is trilingual (French, English, Arabic) and we create marketing content in French, English, Spanish and German. We support numerous international businesses based in Marrakech and manage advertising campaigns targeting audiences in over 15 countries.",
                    ar: "نعم، فريقنا ثلاثي اللغات (الفرنسية، الإنجليزية، العربية) ونقوم بإنشاء محتوى تسويقي بالفرنسية والإنجليزية والإسبانية والألمانية. نرافق العديد من الشركات الدولية المتمركزة في مراكش وندير حملات إعلانية تستهدف جماهير في أكثر من 15 دولة.",
                },
            },
            {
                question: {
                    fr: "Combien coûte le marketing digital pour un riad à Marrakech ?",
                    en: "How much does digital marketing cost for a riad in Marrakech?",
                    ar: "كم تكلفة التسويق الرقمي لرياض في مراكش؟",
                },
                answer: {
                    fr: "Le marketing digital pour un riad à Marrakech commence à partir de 4 000 MAD/mois pour une gestion basique des réseaux sociaux et du SEO local. Un accompagnement complet incluant SEO multilingue, Google Ads, Instagram management et gestion TripAdvisor se situe entre 8 000 et 15 000 MAD/mois selon l'ambition et la taille de l'établissement.",
                    en: "Digital marketing for a riad in Marrakech starts from 4 000 MAD/month for basic social media management and local SEO. A comprehensive package including multilingual SEO, Google Ads, Instagram management and TripAdvisor management ranges from 8 000 to 15 000 MAD/month depending on the ambition and size of the property.",
                    ar: "يبدأ التسويق الرقمي لرياض في مراكش من 4 000 درهم/شهر للإدارة الأساسية لوسائل التواصل الاجتماعي وتحسين محركات البحث المحلي. المرافقة الشاملة التي تتضمن تحسين محركات البحث متعدد اللغات وإعلانات جوجل وإدارة إنستغرام وإدارة TripAdvisor تتراوح بين 8 000 و15 000 درهم/شهر حسب طموح وحجم المؤسسة.",
                },
            },
            {
                question: {
                    fr: "RankUp gère-t-il la présence TripAdvisor et Booking.com ?",
                    en: "Does RankUp manage TripAdvisor and Booking.com presence?",
                    ar: "هل تدير RankUp الحضور على TripAdvisor وBooking.com؟",
                },
                answer: {
                    fr: "Oui, nous optimisons votre présence sur TripAdvisor, Booking.com, Google Maps et autres plateformes de réservation. Cela inclut l'optimisation des descriptions, la gestion des photos, la stratégie de réponse aux avis et des techniques pour encourager les réservations directes via votre site web plutôt que via les OTAs.",
                    en: "Yes, we optimize your presence on TripAdvisor, Booking.com, Google Maps and other booking platforms. This includes description optimization, photo management, review response strategy and techniques to encourage direct bookings through your website rather than through OTAs.",
                    ar: "نعم، نعمل على تحسين حضوركم على TripAdvisor وBooking.com وخرائط جوجل ومنصات الحجز الأخرى. يشمل ذلك تحسين الأوصاف، إدارة الصور، استراتيجية الرد على التقييمات وتقنيات لتشجيع الحجوزات المباشرة عبر موقعكم الإلكتروني بدلاً من وكالات السفر الإلكترونية.",
                },
            },
        ],
        testimonial: {
            name: "Karim L.",
            company: "Riad Luxe, Marrakech",
            text: {
                fr: "Le projet 360° réalisé par RankUp a dépassé toutes nos attentes. Notre taux d'occupation a augmenté de 40% et nous attirons désormais une clientèle internationale grâce au SEO multilingue.",
                en: "The 360° project delivered by RankUp exceeded all our expectations. Our occupancy rate increased by 40% and we now attract an international clientele thanks to multilingual SEO.",
                ar: "تجاوز المشروع الشامل الذي أنجزته RankUp جميع توقعاتنا. ارتفع معدل إشغالنا بنسبة 40% وأصبحنا نستقطب عملاء دوليين بفضل تحسين محركات البحث متعدد اللغات.",
            },
        },
    },
];

export function getCityBySlug(slug: string): CityData | undefined {
    return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
    return cities.map((c) => c.slug);
}
