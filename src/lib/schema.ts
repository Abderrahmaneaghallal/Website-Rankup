export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://rankuplus.com/#organization",
        name: "RankUp",
        url: "https://rankuplus.com",
        logo: {
            "@type": "ImageObject",
            url: "https://rankuplus.com/logo.png",
            width: 512,
            height: 512,
        },
        description: "Agence marketing digital au Maroc spécialisée en SEO, publicité digitale, branding et génération de leads.",
        foundingDate: "2020",
        founder: {
            "@type": "Person",
            name: "RankUp Team",
        },
        numberOfEmployees: {
            "@type": "QuantitativeValue",
            minValue: 10,
            maxValue: 50,
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Rue Guercif",
            addressLocality: "Agadir",
            postalCode: "80026",
            addressRegion: "Souss-Massa",
            addressCountry: "MA",
        },
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+212-604-778-249",
                contactType: "customer service",
                availableLanguage: ["French", "Arabic", "English"],
                areaServed: "MA",
            },
            {
                "@type": "ContactPoint",
                telephone: "+212-604-778-249",
                contactType: "sales",
                availableLanguage: ["French", "Arabic", "English"],
                areaServed: "MA",
            },
        ],
        sameAs: [
            "https://www.instagram.com/rankup.ma",
            "https://www.facebook.com/rankup.ma",
            "https://www.linkedin.com/company/rankup-marketing/",
            "https://www.youtube.com/@MarketingDigitalAgencyAgadir",
        ],
        knowsAbout: [
            "SEO", "Search Engine Optimization", "Digital Marketing",
            "Social Media Marketing", "Google Ads", "Facebook Ads",
            "Web Development", "Graphic Design", "Branding",
            "Content Marketing", "Email Marketing", "E-commerce",
        ],
    };
}

export function webSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://rankuplus.com/#website",
        name: "RankUp - Agence Marketing Digital au Maroc",
        alternateName: "RankUp Marketing",
        url: "https://rankuplus.com",
        description: "Agence marketing digital N°1 au Maroc. Experts en SEO, publicité digitale, branding et génération de leads à Agadir, Casablanca, Marrakech et Rabat.",
        publisher: {
            "@id": "https://rankuplus.com/#organization",
        },
        inLanguage: ["fr-MA", "en", "ar-MA"],
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://rankuplus.com/fr/blog?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    };
}

export function localBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://rankuplus.com/#business",
        name: "RankUp - Agence Marketing Digital",
        image: "https://rankuplus.com/logo.png",
        url: "https://rankuplus.com",
        telephone: "+212-604-778-249",
        email: "contact@rankuplus.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Rue Guercif",
            addressLocality: "Agadir",
            postalCode: "80026",
            addressRegion: "Souss-Massa",
            addressCountry: "MA",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 30.4278,
            longitude: -9.5981,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "17:00",
        },
        priceRange: "$$",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        currenciesAccepted: "MAD",
    };
}

export function professionalServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://rankuplus.com/#service",
        name: "RankUp - Agence Marketing Digital au Maroc",
        image: "https://rankuplus.com/logo.png",
        url: "https://rankuplus.com",
        telephone: "+212-604-778-249",
        email: "contact@rankuplus.com",
        description: "RankUp est l'agence marketing digital N°1 au Maroc. Experts en SEO, publicité digitale (Google Ads, Facebook Ads), branding, création de sites web et génération de leads à Casablanca, Agadir, Marrakech, Rabat, Tanger et Fès.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Rue Guercif",
            addressLocality: "Agadir",
            postalCode: "80026",
            addressRegion: "Souss-Massa",
            addressCountry: "MA",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 30.4278,
            longitude: -9.5981,
        },
        areaServed: [
            { "@type": "City", name: "Agadir" },
            { "@type": "City", name: "Casablanca" },
            { "@type": "City", name: "Marrakech" },
            { "@type": "City", name: "Rabat" },
            { "@type": "City", name: "Tanger" },
            { "@type": "City", name: "Fès" },
            { "@type": "Country", name: "Maroc" },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services Marketing Digital",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Référencement Naturel (SEO)", description: "Optimisation SEO pour positionner votre site en première page Google au Maroc" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Publicité Digitale (Google Ads & Social Ads)", description: "Campagnes publicitaires ciblées pour générer des leads qualifiés" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Création de Sites Web", description: "Sites web modernes, rapides et optimisés SEO au Maroc" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestion des Réseaux Sociaux", description: "Community management et stratégie social media au Maroc" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Design Graphique", description: "Identité visuelle et branding premium pour les entreprises marocaines" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Génération de Leads", description: "Systèmes de conversion et tunnels marketing optimisés" } },
            ],
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
        },
        priceRange: "$$",
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "17:00",
        },
    };
}

export function serviceSchema(name: string, description: string, url: string, slug: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://rankuplus.com/fr/services/${slug}#service`,
        name,
        description,
        url,
        provider: {
            "@type": "Organization",
            "@id": "https://rankuplus.com/#organization",
            name: "RankUp",
            url: "https://rankuplus.com",
        },
        areaServed: [
            { "@type": "City", name: "Agadir" },
            { "@type": "City", name: "Casablanca" },
            { "@type": "City", name: "Marrakech" },
            { "@type": "City", name: "Rabat" },
            { "@type": "Country", name: "Morocco" },
        ],
        serviceType: name,
        termsOfService: "https://rankuplus.com/fr/contact",
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "MAD",
            eligibleRegion: {
                "@type": "Country",
                name: "MA",
            },
        },
    };
}

export function faqSchema(items: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function articleSchema(title: string, description: string, url: string, datePublished: string, dateModified: string, imageUrl?: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished,
        dateModified,
        author: {
            "@type": "Organization",
            "@id": "https://rankuplus.com/#organization",
            name: "RankUp",
        },
        publisher: {
            "@type": "Organization",
            "@id": "https://rankuplus.com/#organization",
            name: "RankUp",
            logo: {
                "@type": "ImageObject",
                url: "https://rankuplus.com/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        ...(imageUrl ? { image: imageUrl } : {}),
        inLanguage: "fr-MA",
    };
}

export function cityLocalBusinessSchema(city: string, slug: string, lat: number, lng: number) {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://rankuplus.com/${slug}/#business`,
        name: `RankUp - Agence Marketing Digital à ${city}`,
        image: `https://rankuplus.com/images/cities/${slug.replace('agence-marketing-digital-', '')}.png`,
        url: `https://rankuplus.com/${slug}`,
        telephone: "+212-604-778-249",
        email: "contact@rankuplus.com",
        description: `RankUp est votre agence de marketing digital à ${city}. SEO, publicité en ligne, création de sites web, branding et gestion des réseaux sociaux.`,
        address: {
            "@type": "PostalAddress",
            addressLocality: city,
            addressCountry: "MA",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: lat,
            longitude: lng,
        },
        areaServed: {
            "@type": "City",
            name: city,
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Services Marketing Digital à ${city}`,
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: `SEO à ${city}`, description: `Référencement naturel et SEO local pour les entreprises à ${city}` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: `Publicité Digitale à ${city}`, description: `Google Ads et Social Ads pour générer des leads qualifiés à ${city}` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: `Création de Sites Web à ${city}`, description: `Sites web modernes et performants pour les entreprises à ${city}` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: `Réseaux Sociaux à ${city}`, description: `Community management et stratégie social media à ${city}` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: `Branding à ${city}`, description: `Identité visuelle et branding premium à ${city}` } },
            ],
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
        },
        priceRange: "$$",
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "17:00",
        },
    };
}

