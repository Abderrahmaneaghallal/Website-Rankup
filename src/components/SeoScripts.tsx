'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface SeoSettings {
    google_analytics_id?: string;
    google_tag_manager_id?: string;
    facebook_pixel_id?: string;
    tiktok_pixel_id?: string;
    hotjar_id?: string;
    google_ads_id?: string;
    clarity_id?: string;
    custom_head_scripts?: string;
    custom_body_scripts?: string;
}

/**
 * Injects SEO tracking scripts (GA4, GTM, Pixel, etc.) dynamically
 * based on admin panel settings. Place in root layout.
 */
export default function SeoScripts() {
    const [settings, setSettings] = useState<SeoSettings>({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/seo-settings')
            .then(r => r.json())
            .then(d => { setSettings(d); setLoaded(true); })
            .catch(() => setLoaded(true));
    }, []);

    if (!loaded) return null;

    const ga = settings.google_analytics_id;
    const gtm = settings.google_tag_manager_id;
    const fb = settings.facebook_pixel_id;
    const tt = settings.tiktok_pixel_id;
    const hj = settings.hotjar_id;
    const gads = settings.google_ads_id;
    const clarity = settings.clarity_id;

    return (
        <>
            {/* ═══════════════════════════════════════════════════
                GOOGLE TAG MANAGER (loads first — manages all tags)
                ═══════════════════════════════════════════════════ */}
            {gtm && (
                <>
                    <Script
                        id="gtm-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`,
                        }}
                    />
                    {/* GTM noscript iframe — for users with JS disabled */}
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            )}

            {/* ═══════════════════════════════════════════════════
                GOOGLE ANALYTICS 4
                ═══════════════════════════════════════════════════ */}
            {ga && !gtm && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="ga4-config"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{page_path:window.location.pathname,send_page_view:true});`,
                        }}
                    />
                </>
            )}

            {/* ═══════════════════════════════════════════════════
                GOOGLE ADS CONVERSION TRACKING
                ═══════════════════════════════════════════════════ */}
            {gads && !gtm && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gads}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="gads-config"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gads}');`,
                        }}
                    />
                </>
            )}

            {/* ═══════════════════════════════════════════════════
                FACEBOOK / META PIXEL
                ═══════════════════════════════════════════════════ */}
            {fb && (
                <Script
                    id="facebook-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fb}');fbq('track','PageView');`,
                    }}
                />
            )}

            {/* ═══════════════════════════════════════════════════
                TIKTOK PIXEL
                ═══════════════════════════════════════════════════ */}
            {tt && (
                <Script
                    id="tiktok-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tt}');ttq.page()}(window,document,'ttq');`,
                    }}
                />
            )}

            {/* ═══════════════════════════════════════════════════
                HOTJAR
                ═══════════════════════════════════════════════════ */}
            {hj && (
                <Script
                    id="hotjar"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hj},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                    }}
                />
            )}

            {/* ═══════════════════════════════════════════════════
                MICROSOFT CLARITY
                ═══════════════════════════════════════════════════ */}
            {clarity && (
                <Script
                    id="clarity"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`,
                    }}
                />
            )}

            {/* ═══════════════════════════════════════════════════
                CUSTOM HEAD SCRIPTS (from admin panel)
                ═══════════════════════════════════════════════════ */}
            {settings.custom_head_scripts && (
                <Script
                    id="custom-head"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: settings.custom_head_scripts }}
                />
            )}

            {/* ═══════════════════════════════════════════════════
                CUSTOM BODY SCRIPTS (from admin panel)
                ═══════════════════════════════════════════════════ */}
            {settings.custom_body_scripts && (
                <Script
                    id="custom-body"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{ __html: settings.custom_body_scripts }}
                />
            )}
        </>
    );
}
