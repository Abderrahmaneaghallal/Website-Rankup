'use client';
import { useEffect, useState } from 'react';

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 };

const groups = [
    { title: '🏢 General', keys: ['site_name', 'site_tagline_fr', 'site_tagline_en', 'site_tagline_ar'] },
    { title: '📞 Contact', keys: ['contact_email', 'contact_phone', 'whatsapp_number'] },
    { title: '🌐 Social Media', keys: ['facebook_url', 'instagram_url', 'linkedin_url', 'tiktok_url'] },
    { title: '🔍 Default SEO', keys: ['default_meta_title_fr', 'default_meta_title_en', 'default_meta_title_ar', 'default_meta_desc_fr', 'default_meta_desc_en', 'default_meta_desc_ar'] },
];

const keyLabels: Record<string, string> = {
    site_name: 'Site Name', site_tagline_fr: 'Tagline (FR)', site_tagline_en: 'Tagline (EN)', site_tagline_ar: 'Tagline (AR)',
    contact_email: 'Email', contact_phone: 'Phone', whatsapp_number: 'WhatsApp',
    facebook_url: 'Facebook', instagram_url: 'Instagram', linkedin_url: 'LinkedIn', tiktok_url: 'TikTok',
    default_meta_title_fr: 'Meta Title (FR)', default_meta_title_en: 'Meta Title (EN)', default_meta_title_ar: 'Meta Title (AR)',
    default_meta_desc_fr: 'Meta Desc (FR)', default_meta_desc_en: 'Meta Desc (EN)', default_meta_desc_ar: 'Meta Desc (AR)',
};

export default function AdminSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

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

    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;

    return (
        <div style={{ maxWidth: 700 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Site Settings</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Global website configuration</p>
                </div>
                <button onClick={save} disabled={saving} style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: saved ? '#10b981' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1, transition: 'all 0.3s' }}>
                    {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>
                    {error}
                </div>
            )}

            {groups.map(group => (
                <div key={group.title} style={{ padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 20 }}>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>{group.title}</h3>
                    {group.keys.map(key => (
                        <div key={key}>
                            <label style={labelStyle}>{keyLabels[key] || key}</label>
                            {key.includes('desc') ? (
                                <textarea value={settings[key] || ''} onChange={e => setSettings({ ...settings, [key]: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                            ) : (
                                <input value={settings[key] || ''} onChange={e => setSettings({ ...settings, [key]: e.target.value })} style={inputStyle} />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
