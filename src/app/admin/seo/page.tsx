'use client';
import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8, fontWeight: 500 as const };
const cardStyle = { padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 24 };
const helpStyle = { fontSize: 11, color: '#666', marginBottom: 12, lineHeight: 1.6 };

const seoKeys = {
    integrations: [
        {
            key: 'google_analytics_id', label: 'Google Analytics 4 (GA4) Measurement ID', type: 'text', placeholder: 'G-XXXXXXXXXX', icon: '📊',
            help: '1. Go to analytics.google.com → Admin → Data Streams\n2. Click your web stream\n3. Copy the "Measurement ID" (starts with G-)'
        },
        {
            key: 'google_tag_manager_id', label: 'Google Tag Manager Container ID', type: 'text', placeholder: 'GTM-XXXXXXX', icon: '🏷️',
            help: '1. Go to tagmanager.google.com → Create Account\n2. Set up a Web container\n3. Copy the "Container ID" (starts with GTM-)\n⚠️ If you use GTM, add GA4 through GTM instead of here.'
        },
        {
            key: 'google_ads_id', label: 'Google Ads Conversion ID', type: 'text', placeholder: 'AW-XXXXXXXXX', icon: '📢',
            help: '1. Go to ads.google.com → Tools → Conversions\n2. Set up a Website conversion\n3. Copy the "Conversion ID" (starts with AW-)'
        },
    ],
    verification: [
        {
            key: 'google_verification', label: 'Google Search Console Verification Code', type: 'text', placeholder: 'e.g. HkR2gk4WxC9A...', icon: '🔍',
            help: '1. Go to search.google.com/search-console\n2. Add Property → URL prefix → enter https://rankuplus.com\n3. Choose "HTML tag" method\n4. Copy only the content="..." value (not the full meta tag)'
        },
        {
            key: 'bing_verification', label: 'Bing Webmaster Tools Verification', type: 'text', placeholder: 'e.g. B3F9E2...', icon: '🅱️',
            help: '1. Go to bing.com/webmasters\n2. Add Site → enter https://rankuplus.com\n3. Choose "Meta Tag" method\n4. Copy only the content="..." value'
        },
        {
            key: 'yandex_verification', label: 'Yandex Webmaster Verification', type: 'text', placeholder: 'e.g. 1234abc...', icon: '🟡',
            help: 'Go to webmaster.yandex.com → Add site → get verification code'
        },
        {
            key: 'pinterest_verification', label: 'Pinterest Verification', type: 'text', placeholder: 'e.g. abc123...', icon: '📌',
            help: 'Go to Pinterest Business → Settings → Claim Website → Meta tag method'
        },
        {
            key: 'google_site_kit_verified', label: 'Google Site Kit Verification Token', type: 'text', placeholder: 'Site Kit verification token', icon: '🧰',
            help: '1. Install Site Kit plugin or connect via sitekit.withgoogle.com\n2. Get your verification token\n3. Paste the token here to verify ownership'
        },
    ],
    pixels: [
        {
            key: 'facebook_pixel_id', label: 'Facebook / Meta Pixel ID', type: 'text', placeholder: '123456789012345', icon: '📘',
            help: '1. Go to Facebook Events Manager → Data Sources\n2. Click "Add New Data Source" → Select "Web"\n3. Create a new Pixel or select existing\n4. Copy the Pixel ID (15-16 digit number)'
        },
        {
            key: 'tiktok_pixel_id', label: 'TikTok Pixel ID', type: 'text', placeholder: 'CXXXXXXXXXXXXXXXXX', icon: '🎵',
            help: '1. Go to TikTok Ads Manager → Assets → Events\n2. Create a new Pixel → Manual Setup\n3. Copy the Pixel ID'
        },
    ],
    analytics_extra: [
        {
            key: 'hotjar_id', label: 'Hotjar Site ID', type: 'text', placeholder: '1234567', icon: '🔥',
            help: '1. Go to hotjar.com → Sites & Organizations\n2. Add a new site\n3. Copy the Site ID (numeric)'
        },
        {
            key: 'clarity_id', label: 'Microsoft Clarity Project ID', type: 'text', placeholder: 'abc123xyz', icon: '🔬',
            help: '1. Go to clarity.microsoft.com → New Project\n2. Add your site URL\n3. Copy the Project ID from the setup instructions'
        },
    ],
    general: [
        { key: 'default_meta_title_fr', label: 'Default Meta Title (FR)', type: 'text' },
        { key: 'default_meta_title_en', label: 'Default Meta Title (EN)', type: 'text' },
        { key: 'default_meta_title_ar', label: 'Default Meta Title (AR)', type: 'text' },
        { key: 'default_meta_desc_fr', label: 'Default Meta Description (FR)', type: 'textarea' },
        { key: 'default_meta_desc_en', label: 'Default Meta Description (EN)', type: 'textarea' },
        { key: 'default_meta_desc_ar', label: 'Default Meta Description (AR)', type: 'textarea' },
    ],
    ogDefaults: [
        { key: 'og_site_name', label: 'OG Site Name', type: 'text', placeholder: 'RankUp - Agence Marketing Digital' },
        { key: 'og_default_image', label: 'Default OG Image URL', type: 'text', placeholder: 'https://rankuplus.com/og-image.png (1200×630)' },
        { key: 'og_type', label: 'Default OG Type', type: 'select', options: ['website', 'article', 'product'] },
        { key: 'twitter_card', label: 'Twitter Card Type', type: 'select', options: ['summary_large_image', 'summary', 'player'] },
        { key: 'twitter_handle', label: 'Twitter/X Handle', type: 'text', placeholder: '@rankuplus' },
    ],
    robots: [
        { key: 'robots_txt_custom', label: 'Custom robots.txt Content', type: 'textarea', placeholder: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://rankuplus.com/sitemap.xml' },
        { key: 'sitemap_include_pages', label: 'Include CMS Pages in Sitemap', type: 'select', options: ['yes', 'no'] },
        { key: 'sitemap_include_blog', label: 'Include Blog Posts in Sitemap', type: 'select', options: ['yes', 'no'] },
        { key: 'sitemap_changefreq', label: 'Default Sitemap Change Frequency', type: 'select', options: ['daily', 'weekly', 'monthly', 'yearly'] },
    ],
    schema: [
        { key: 'schema_org_type', label: 'Organization Schema Type', type: 'select', options: ['Organization', 'LocalBusiness', 'ProfessionalService'] },
        { key: 'schema_org_name', label: 'Organization Name', type: 'text', placeholder: 'RankUp' },
        { key: 'schema_org_url', label: 'Organization URL', type: 'text', placeholder: 'https://rankuplus.com' },
        { key: 'schema_org_logo', label: 'Organization Logo URL', type: 'text', placeholder: 'https://rankuplus.com/logo.png' },
        { key: 'schema_org_phone', label: 'Contact Phone', type: 'text', placeholder: '+212604778249' },
        { key: 'schema_org_email', label: 'Contact Email', type: 'text', placeholder: 'contact@rankuplus.com' },
        { key: 'schema_org_address', label: 'Address (JSON)', type: 'textarea', placeholder: '{"streetAddress":"Rue Guercif","addressLocality":"Agadir","postalCode":"80026","addressCountry":"MA"}' },
    ],
    custom: [
        {
            key: 'custom_head_scripts', label: 'Custom <head> Scripts', type: 'textarea', placeholder: '<!-- Paste any custom script tags here -->\n<script>...</script>', icon: '💻',
            help: 'Scripts added here load after page becomes interactive (afterInteractive strategy).'
        },
        {
            key: 'custom_body_scripts', label: 'Custom <body> Scripts', type: 'textarea', placeholder: '<!-- Scripts that load lazily -->\n<script>...</script>', icon: '📝',
            help: 'Scripts added here load lazily after all other resources (lazyOnload strategy). Use for non-critical tracking.'
        },
    ],
};

const sections = [
    { key: 'integrations', title: '🔗 Google Integrations', desc: 'Google Analytics, Tag Manager, Google Ads — connect your site to Google tools', badge: 'ESSENTIAL' },
    { key: 'verification', title: '✅ Search Console & Verification', desc: 'Verify ownership with Google, Bing, Yandex, Pinterest, and Site Kit', badge: 'ESSENTIAL' },
    { key: 'pixels', title: '📱 Social Media Pixels', desc: 'Facebook Pixel, TikTok Pixel for conversion tracking and remarketing' },
    { key: 'analytics_extra', title: '🔥 Heatmaps & Session Recording', desc: 'Hotjar heatmaps, Microsoft Clarity session recordings' },
    { key: 'general', title: '🔍 Default Meta Tags', desc: 'Fallback SEO tags when pages don\'t have custom ones' },
    { key: 'ogDefaults', title: '🖼️ Open Graph & Social', desc: 'How your site appears when shared on social media' },
    { key: 'robots', title: '🤖 Robots & Sitemap', desc: 'Control how search engines crawl your site' },
    { key: 'schema', title: '🏗️ Organization Schema', desc: 'Structured data for your business (shown in Google)' },
    { key: 'custom', title: '💻 Custom Scripts', desc: 'Add any custom tracking or widget scripts' },
];

export default function AdminSEO() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [openSection, setOpenSection] = useState<string>('integrations');

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
            .then(d => { setSettings(d); setLoading(false); })
            .catch(() => { setError('Failed to load settings.'); setLoading(false); });
    }, []);

    const save = async () => {
        setError('');
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
            if (!res.ok) { const body = await res.json(); throw new Error(body.error || 'Failed to save.'); }
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e: any) { setError(e.message || 'Network error. Please try again.'); }
        finally { setSaving(false); }
    };

    // Count configured integrations
    const integrationKeys = ['google_analytics_id', 'google_tag_manager_id', 'google_ads_id', 'google_verification', 'bing_verification', 'facebook_pixel_id', 'tiktok_pixel_id', 'hotjar_id', 'clarity_id', 'google_site_kit_verified'];
    const configuredCount = integrationKeys.filter(k => settings[k] && settings[k].trim()).length;

    if (loading) return <p style={{ color: '#888' }}>Loading SEO settings...</p>;

    return (
        <div style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>🔍 SEO & Integrations</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Connect Google Search Console, Analytics, Tag Manager, Site Kit & more</p>
                </div>
                <button onClick={save} disabled={saving} style={{
                    padding: '12px 28px', borderRadius: 12, border: 'none',
                    background: saved ? '#10b981' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    opacity: saving ? 0.7 : 1, transition: 'all 0.3s',
                }}>
                    {saved ? '✓ Saved!' : saving ? 'Saving...' : '💾 Save All Settings'}
                </button>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>{error}</div>
            )}

            {/* Status Banner */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1))', borderColor: 'rgba(139,92,246,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🚀</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>SEO Tools Integration Center</div>
                        <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                            {configuredCount}/{integrationKeys.length} tools connected •
                            All tracking codes are automatically injected into your website
                        </div>
                        {/* Mini status dots */}
                        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                            {[
                                { key: 'google_analytics_id', label: 'GA4' },
                                { key: 'google_tag_manager_id', label: 'GTM' },
                                { key: 'google_verification', label: 'GSC' },
                                { key: 'google_ads_id', label: 'Ads' },
                                { key: 'google_site_kit_verified', label: 'Site Kit' },
                                { key: 'facebook_pixel_id', label: 'Meta' },
                                { key: 'bing_verification', label: 'Bing' },
                                { key: 'hotjar_id', label: 'Hotjar' },
                                { key: 'clarity_id', label: 'Clarity' },
                            ].map(t => {
                                const active = settings[t.key] && settings[t.key].trim();
                                return (
                                    <span key={t.key} style={{
                                        padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                        background: active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                                        color: active ? '#22c55e' : '#555',
                                        border: `1px solid ${active ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                    }}>
                                        {active ? '●' : '○'} {t.label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Collapsible Sections */}
            {sections.map(section => {
                const isOpen = openSection === section.key;
                const fields = seoKeys[section.key as keyof typeof seoKeys];
                const sectionConfigured = fields.filter((f: any) => settings[f.key] && settings[f.key].trim()).length;
                return (
                    <div key={section.key} style={{ ...cardStyle, borderColor: isOpen ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)' }}>
                        <button onClick={() => setOpenSection(isOpen ? '' : section.key)} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}>
                            <div style={{ textAlign: 'left' as const }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{section.title}</span>
                                    {(section as any).badge && (
                                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', letterSpacing: 1 }}>{(section as any).badge}</span>
                                    )}
                                    <span style={{ fontSize: 11, color: '#555', padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)' }}>
                                        {sectionConfigured}/{fields.length}
                                    </span>
                                </div>
                                <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{section.desc}</div>
                            </div>
                            <span style={{ color: '#888', fontSize: 18, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                        </button>

                        {isOpen && (
                            <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                                {fields.map((field: any) => (
                                    <div key={field.key} style={{ marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                            {field.icon && <span style={{ fontSize: 16 }}>{field.icon}</span>}
                                            <label style={{ ...labelStyle, marginBottom: 0 }}>{field.label}</label>
                                            {settings[field.key] && settings[field.key].trim() && (
                                                <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600 }}>● ACTIVE</span>
                                            )}
                                        </div>
                                        {field.help && (
                                            <div style={helpStyle}>
                                                {field.help.split('\n').map((line: string, i: number) => (
                                                    <div key={i}>{line}</div>
                                                ))}
                                            </div>
                                        )}
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                value={settings[field.key] || ''}
                                                onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                                                rows={field.key.includes('robots') || field.key.includes('scripts') || field.key.includes('address') ? 6 : 2}
                                                placeholder={field.placeholder || ''}
                                                style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: field.key.includes('scripts') || field.key.includes('address') || field.key.includes('robots') ? 'monospace' : 'inherit' }}
                                            />
                                        ) : field.type === 'select' ? (
                                            <select
                                                value={settings[field.key] || field.options?.[0] || ''}
                                                onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                                                style={{ ...inputStyle, appearance: 'none' as const }}
                                            >
                                                {field.options?.map((opt: string) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                value={settings[field.key] || ''}
                                                onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                                                placeholder={field.placeholder || ''}
                                                style={inputStyle}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Quick Setup Guide */}
            <div style={{ ...cardStyle, borderColor: 'rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.05)' }}>
                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginBottom: 16 }}>📚 Quick Setup Guide</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                        { label: 'Google Search Console', url: 'https://search.google.com/search-console', icon: '🔍' },
                        { label: 'Google Analytics', url: 'https://analytics.google.com', icon: '📊' },
                        { label: 'Google Tag Manager', url: 'https://tagmanager.google.com', icon: '🏷️' },
                        { label: 'Google Site Kit', url: 'https://sitekit.withgoogle.com', icon: '🧰' },
                        { label: 'Google Ads', url: 'https://ads.google.com', icon: '📢' },
                        { label: 'Facebook Business', url: 'https://business.facebook.com/events_manager', icon: '📘' },
                        { label: 'Bing Webmaster', url: 'https://www.bing.com/webmasters', icon: '🅱️' },
                        { label: 'Microsoft Clarity', url: 'https://clarity.microsoft.com', icon: '🔬' },
                        { label: 'Hotjar', url: 'https://www.hotjar.com', icon: '🔥' },
                        { label: 'TikTok Ads', url: 'https://ads.tiktok.com', icon: '🎵' },
                    ].map(link => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                            borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(255,255,255,0.02)', textDecoration: 'none',
                            color: '#ccc', fontSize: 13, transition: 'all 0.2s',
                        }}>
                            <span style={{ fontSize: 18 }}>{link.icon}</span>
                            <span>{link.label}</span>
                            <span style={{ marginLeft: 'auto', color: '#555', fontSize: 12 }}>↗</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
