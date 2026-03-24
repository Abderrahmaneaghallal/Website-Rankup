'use client';

import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import Floating3DShapes from './Floating3DShapes';

/* eslint-disable @typescript-eslint/no-explicit-any */

const citiesFr = [
    { name: 'Casablanca', emoji: '🏙️', tagline: 'Capital Économique & Hub Digital', description: 'À Casablanca, capital économique du Maroc, nous combinons performance et précision dans des campagnes Google Ads, du SEO et des sites web.', stats: { clients: '450+', growth: '+320%' }, borderColor: 'border-blue-500/20' },
    { name: 'Marrakech', emoji: '🕌', tagline: 'Le Digital au Cœur de la Ville Rouge', description: 'À Marrakech, notre storytelling digital s\'inspire des émotions sensorielles de la ville rouge pour des campagnes mémorables.', stats: { clients: '280+', growth: '+280%' }, borderColor: 'border-orange-500/20' },
    { name: 'Rabat', emoji: '🏛️', tagline: 'L\'Élégance de la Capitale', description: 'À Rabat, l\'élégance institutionnelle guide nos conceptions : du SEO aux identités visuelles pour les entreprises de la capitale.', stats: { clients: '200+', growth: '+290%' }, borderColor: 'border-emerald-500/20' },
    { name: 'Agadir', emoji: '🌊', tagline: 'Innovation & Croissance Touristique', description: 'Notre siège à Agadir accompagne la relance touristique et économique du Souss-Massa à travers des stratégies digitales innovantes.', stats: { clients: '350+', growth: '+400%' }, borderColor: 'border-purple-500/20' },
    { name: 'Tanger', emoji: '⚓', tagline: 'La Fusion des Cultures au Service du Web', description: 'À Tanger, porte de l\'Afrique vers l\'Europe, nous bâtissons des ponts digitaux multilingues et des stratégies de marketing international.', stats: { clients: '150+', growth: '+250%' }, borderColor: 'border-sky-500/20' },
    { name: 'Fès', emoji: '📚', tagline: 'Tradition & Stratégies Digitales', description: 'À Fès, berceau du savoir ancestral, notre agence conçoit des plateformes qui valorisent l\'artisanat et le patrimoine.', stats: { clients: '120+', growth: '+270%' }, borderColor: 'border-amber-500/20' },
];

const citiesEn = [
    { name: 'Casablanca', emoji: '🏙️', tagline: 'Economic Capital & Digital Hub', description: 'In Casablanca, Morocco\'s economic capital, we combine performance and precision in Google Ads campaigns, SEO and websites.', stats: { clients: '450+', growth: '+320%' }, borderColor: 'border-blue-500/20' },
    { name: 'Marrakech', emoji: '🕌', tagline: 'Digital at the Heart of the Red City', description: 'In Marrakech, our digital storytelling draws from the sensory emotions of the red city for memorable campaigns.', stats: { clients: '280+', growth: '+280%' }, borderColor: 'border-orange-500/20' },
    { name: 'Rabat', emoji: '🏛️', tagline: 'The Elegance of the Capital', description: 'In Rabat, institutional elegance guides our designs: from SEO to visual identities for capital city businesses.', stats: { clients: '200+', growth: '+290%' }, borderColor: 'border-emerald-500/20' },
    { name: 'Agadir', emoji: '🌊', tagline: 'Innovation & Tourism Growth', description: 'Our headquarters in Agadir supports the tourism and economic revival of Souss-Massa through innovative digital strategies.', stats: { clients: '350+', growth: '+400%' }, borderColor: 'border-purple-500/20' },
    { name: 'Tangier', emoji: '⚓', tagline: 'Cultural Fusion for the Web', description: 'In Tangier, gateway from Africa to Europe, we build multilingual digital bridges and international marketing strategies.', stats: { clients: '150+', growth: '+250%' }, borderColor: 'border-sky-500/20' },
    { name: 'Fez', emoji: '📚', tagline: 'Tradition & Digital Strategies', description: 'In Fez, cradle of ancestral knowledge, our agency designs platforms that showcase craftsmanship and heritage.', stats: { clients: '120+', growth: '+270%' }, borderColor: 'border-amber-500/20' },
];

const citiesAr = [
    { name: 'الدار البيضاء', emoji: '🏙️', tagline: 'العاصمة الاقتصادية والمركز الرقمي', description: 'في الدار البيضاء، العاصمة الاقتصادية للمغرب، نجمع بين الأداء والدقة في حملات Google Ads وSEO والمواقع الإلكترونية.', stats: { clients: '450+', growth: '+320%' }, borderColor: 'border-blue-500/20' },
    { name: 'مراكش', emoji: '🕌', tagline: 'الرقمي في قلب المدينة الحمراء', description: 'في مراكش، يستلهم سرديتنا الرقمية من المشاعر الحسية للمدينة الحمراء لحملات لا تُنسى.', stats: { clients: '280+', growth: '+280%' }, borderColor: 'border-orange-500/20' },
    { name: 'الرباط', emoji: '🏛️', tagline: 'أناقة العاصمة', description: 'في الرباط، الأناقة المؤسساتية توجه تصاميمنا: من SEO إلى الهويات البصرية لشركات العاصمة.', stats: { clients: '200+', growth: '+290%' }, borderColor: 'border-emerald-500/20' },
    { name: 'أكادير', emoji: '🌊', tagline: 'الابتكار والنمو السياحي', description: 'مقرنا في أكادير يرافق الانتعاش السياحي والاقتصادي لسوس ماسة من خلال استراتيجيات رقمية مبتكرة.', stats: { clients: '350+', growth: '+400%' }, borderColor: 'border-purple-500/20' },
    { name: 'طنجة', emoji: '⚓', tagline: 'اندماج الثقافات لخدمة الويب', description: 'في طنجة، بوابة أفريقيا إلى أوروبا، نبني جسوراً رقمية متعددة اللغات واستراتيجيات تسويق دولية.', stats: { clients: '150+', growth: '+250%' }, borderColor: 'border-sky-500/20' },
    { name: 'فاس', emoji: '📚', tagline: 'التقاليد والاستراتيجيات الرقمية', description: 'في فاس، مهد المعرفة الأصيلة، وكالتنا تصمم منصات تبرز الحرف اليدوية والتراث.', stats: { clients: '120+', growth: '+270%' }, borderColor: 'border-amber-500/20' },
];

const seoFr = { title: 'Agence de Communication & Marketing Digital au Maroc', p1: 'En tant qu\'agence marketing digital au Maroc, RankUp se spécialise dans la création de stratégies digitales puissantes et personnalisées.', p2: 'Que vous soyez une startup à Agadir, une PME à Casablanca, une entreprise en expansion à Marrakech ou une institution à Rabat, notre approche s\'adapte à vos objectifs.', p3: 'Notre agence de communication digitale combine l\'agilité d\'une agence web moderne et l\'expertise créative d\'une boîte de communication innovante.' };
const seoEn = { title: 'Communication & Digital Marketing Agency in Morocco', p1: 'As a digital marketing agency in Morocco, RankUp specializes in creating powerful and personalized digital strategies.', p2: 'Whether you\'re a startup in Agadir, an SME in Casablanca, a growing company in Marrakech or an institution in Rabat, our approach adapts to your goals.', p3: 'Our digital communication agency combines the agility of a modern web agency and the creative expertise of an innovative communication firm.' };
const seoAr = { title: 'وكالة تواصل وتسويق رقمي في المغرب', p1: 'كوكالة تسويق رقمي في المغرب، تتخصص رانك أب في إنشاء استراتيجيات رقمية قوية ومخصصة.', p2: 'سواء كنت شركة ناشئة في أكادير أو شركة صغيرة ومتوسطة في الدار البيضاء أو شركة متنامية في مراكش أو مؤسسة في الرباط، نهجنا يتكيف مع أهدافكم.', p3: 'وكالتنا للتواصل الرقمي تجمع بين مرونة وكالة ويب حديثة والخبرة الإبداعية لشركة تواصل مبتكرة.' };

const headersFr = { badge: 'Présence Nationale', title: 'Votre agence marketing digital', highlight: 'dans tout le Maroc', subtitle: 'De Casablanca à Agadir, de Marrakech à Tanger, RankUp développe des stratégies digitales sur mesure.', clientsLabel: 'clients', growthLabel: 'croissance' };
const headersEn = { badge: 'National Presence', title: 'Your digital marketing agency', highlight: 'across Morocco', subtitle: 'From Casablanca to Agadir, from Marrakech to Tangier, RankUp develops tailored digital strategies.', clientsLabel: 'clients', growthLabel: 'growth' };
const headersAr = { badge: 'التواجد الوطني', title: 'وكالتكم للتسويق الرقمي', highlight: 'في جميع أنحاء المغرب', subtitle: 'من الدار البيضاء إلى أكادير، من مراكش إلى طنجة، رانك أب تطور استراتيجيات رقمية مخصصة.', clientsLabel: 'عملاء', growthLabel: 'نمو' };

export default function CityPresence({ dict, locale = 'fr' }: { dict?: any; locale?: string } = {}) {
    const sectionRef = useRef(null);
    const cities = locale === 'ar' ? citiesAr : locale === 'en' ? citiesEn : citiesFr;
    const headers = locale === 'ar' ? headersAr : locale === 'en' ? headersEn : headersFr;
    const seo = locale === 'ar' ? seoAr : locale === 'en' ? seoEn : seoFr;

    return (
        <section ref={sectionRef} id="presence" className="relative py-24 lg:py-32 bg-navy-900/40 overflow-hidden">
            <Floating3DShapes variant="services" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent" />
            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12">
                <ScrollReveal blur={true} perspective={true}>
                    <div className="text-center mb-6">
                        <span className="inline-block px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-accent-purple/20 text-accent-purple bg-accent-purple/5 mb-6">
                            {dict?.badge || headers.badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
                            {headers.title}{' '}<span className="gradient-text">{headers.highlight}</span>
                        </h2>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1} blur={true}>
                    <p className="text-gray-400 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-16">
                        {dict?.subtitle || headers.subtitle}
                    </p>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {cities.map((city, i) => (
                        <ScrollReveal key={city.name} delay={i * 0.08} blur={true} scale={true}>
                            <div className={`glass-card p-7 h-full group interactive-card border ${city.borderColor}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{city.emoji}</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white font-heading">{city.name}</h3>
                                        <p className="text-xs text-accent-purple font-medium">{city.tagline}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-[1.8] mb-5">{city.description}</p>
                                <div className="flex gap-4 pt-4 border-t border-white/[0.04]">
                                    <div>
                                        <span className="text-white font-bold text-sm font-heading">{city.stats.clients}</span>
                                        <span className="text-gray-600 text-xs ms-1">{headers.clientsLabel}</span>
                                    </div>
                                    <div>
                                        <span className="text-accent-cyan font-bold text-sm font-heading">{city.stats.growth}</span>
                                        <span className="text-gray-600 text-xs ms-1">{headers.growthLabel}</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
                <ScrollReveal blur={true} delay={0.2}>
                    <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 lg:p-10">
                        <h3 className="text-xl font-bold text-white font-heading mb-4 text-center">{seo.title}</h3>
                        <div className="text-gray-500 text-sm leading-[1.9] space-y-4 max-w-4xl mx-auto">
                            <p>{seo.p1}</p>
                            <p>{seo.p2}</p>
                            <p>{seo.p3}</p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
