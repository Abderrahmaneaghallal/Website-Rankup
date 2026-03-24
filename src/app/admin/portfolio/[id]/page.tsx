'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 };
const cardBox = { padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 24 };
const btnPrimary = { padding: '10px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 };
const btnSecondary = { padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#888', cursor: 'pointer', fontSize: 13 };
const btnDanger = { padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontWeight: 500 };
const btnSmall = { padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', cursor: 'pointer', fontSize: 12, fontWeight: 500 };

interface PortfolioItem {
    slug: string; titleFr: string; titleEn: string; titleAr: string;
    excerptFr: string; excerptEn: string; excerptAr: string;
    clientName: string; industry: string; tags: string; results: string;
    galleryImages: string;
    featuredImage: string; imageAlt: string;
    metaTitleFr: string; metaTitleEn: string; metaTitleAr: string;
    metaDescFr: string; metaDescEn: string; metaDescAr: string;
    isFeatured: boolean; isPublished: boolean; sortOrder: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SubItem { id: string; title: string;[key: string]: any; }

const empty: PortfolioItem = {
    slug: '', titleFr: '', titleEn: '', titleAr: '',
    excerptFr: '', excerptEn: '', excerptAr: '',
    clientName: '', industry: '', tags: '', results: '[]',
    galleryImages: '[]',
    featuredImage: '', imageAlt: '',
    metaTitleFr: '', metaTitleEn: '', metaTitleAr: '',
    metaDescFr: '', metaDescEn: '', metaDescAr: '',
    isFeatured: false, isPublished: true, sortOrder: 0,
};

/* ─── SUB-ITEM INLINE MANAGER ─── */
function SubItemManager({ portfolioId, type, label, icon, fields }: {
    portfolioId: string; type: 'portfolio-websites' | 'portfolio-social-designs' | 'portfolio-videos';
    label: string; icon: string;
    fields: { key: string; label: string; type?: string; options?: string[]; placeholder?: string }[];
}) {
    const [items, setItems] = useState<SubItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [form, setForm] = useState<Record<string, any>>({});
    const [editId, setEditId] = useState<string | null>(null);

    const load = () => {
        fetch(`/api/admin/${type}?portfolioId=${portfolioId}`).then(r => r.json()).then(d => { if (Array.isArray(d)) setItems(d); }).catch(() => { });
    };
    useEffect(() => { if (portfolioId) load(); }, [portfolioId]); // eslint-disable-line

    const save = async () => {
        const url = editId ? `/api/admin/${type}/${editId}` : `/api/admin/${type}`;
        const method = editId ? 'PUT' : 'POST';
        const body = { ...form, portfolioId };
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        setShowForm(false); setEditId(null); setForm({}); load();
    };
    const edit = async (id: string) => {
        const data = await (await fetch(`/api/admin/${type}/${id}`)).json();
        setForm(data); setEditId(id); setShowForm(true);
    };
    const remove = async (id: string, title: string) => {
        if (!confirm(`Delete "${title}"?`)) return;
        await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' }); load();
    };

    return (
        <div style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: 0 }}>{icon} {label} ({items.length})</h3>
                <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({}); }} style={btnSmall}>+ Add</button>
            </div>

            {showForm && (
                <div style={{ padding: 20, borderRadius: 12, border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)', marginBottom: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {fields.map(f => (
                            <div key={f.key}>
                                <label style={{ ...labelStyle, marginBottom: 4 }}>{f.label}</label>
                                {f.type === 'select' ? (
                                    <select value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={{ ...inputStyle, cursor: 'pointer', marginBottom: 8 }}>
                                        {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                ) : (
                                    <input value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder || ''} style={{ ...inputStyle, marginBottom: 8 }} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
                        <button onClick={() => setShowForm(false)} style={btnSecondary}>Cancel</button>
                        <button onClick={save} style={btnPrimary}>{editId ? 'Update' : 'Create'}</button>
                    </div>
                </div>
            )}

            {items.length === 0 && !showForm && (
                <p style={{ color: '#555', fontSize: 13, margin: 0 }}>No items yet. Click &quot;+ Add&quot; to create one.</p>
            )}

            {items.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: i < items.length - 1 ? 8 : 0 }}>
                    <div>
                        <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{item.title}</span>
                        {item.type && <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(139,92,246,0.1)', color: '#a78bfa', textTransform: 'uppercase' }}>{item.type}</span>}
                        {item.platform && <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(239,68,68,0.1)', color: '#ef4444', textTransform: 'uppercase' }}>{item.platform}</span>}
                        {item.url && <span style={{ marginLeft: 8, fontSize: 11, color: '#06b6d4' }}>{item.url}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => edit(item.id)} style={{ ...btnSmall, background: 'rgba(139,92,246,0.1)' }}>Edit</button>
                        <button onClick={() => remove(item.id, item.title)} style={btnDanger}>✕</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── GALLERY IMAGES MANAGER ─── */
function GalleryManager({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
    const [newUrl, setNewUrl] = useState('');
    const add = () => { if (newUrl.trim()) { onChange([...images, newUrl.trim()]); setNewUrl(''); } };
    const remove = (i: number) => { onChange(images.filter((_, idx) => idx !== i)); };

    return (
        <div style={cardBox}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 }}>📸 Result Screenshots ({images.length})</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Image URL (e.g. /uploads/result.jpg)" style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
                <button onClick={add} style={btnSmall}>+ Add</button>
            </div>
            {images.length === 0 && <p style={{ color: '#555', fontSize: 13, margin: 0 }}>No screenshots yet. Add image URLs above.</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {images.map((img, i) => (
                    <div key={i} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <img src={img} alt={`Screenshot ${i + 1}`} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                        <button onClick={() => remove(i)} style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(239,68,68,0.8)', color: '#fff', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── MAIN EDIT PAGE ─── */
export default function EditPortfolio() {
    const params = useParams();
    const router = useRouter();
    const isNew = params.id === 'new';
    const [item, setItem] = useState<PortfolioItem>(empty);
    const [tab, setTab] = useState<'fr' | 'en' | 'ar'>('fr');
    const [activeSection, setActiveSection] = useState<'content' | 'media' | 'seo'>('content');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [savedId, setSavedId] = useState<string | null>(null);

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/admin/portfolio/${params.id}`)
                .then(r => r.json())
                .then(data => { setItem({ ...empty, ...data }); setSavedId(data.id); })
                .catch(() => setError('Failed to load portfolio item.'));
        }
    }, [isNew, params.id]);

    const save = async () => {
        setError(''); setSaving(true);
        try {
            const url = isNew ? '/api/admin/portfolio' : `/api/admin/portfolio/${params.id}`;
            const method = isNew ? 'POST' : 'PUT';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
            if (!res.ok) { const data = await res.json(); setError(data.error || 'Failed to save.'); }
            else {
                const data = await res.json();
                if (isNew) { router.push(`/admin/portfolio/${data.id}`); }
                else { setSavedId(data.id); }
            }
        } catch { setError('Network error.'); } finally { setSaving(false); }
    };

    const t = tab.charAt(0).toUpperCase() + tab.slice(1);

    let galleryImages: string[] = [];
    try { galleryImages = JSON.parse(item.galleryImages || '[]'); } catch { /* */ }
    const setGallery = (imgs: string[]) => setItem({ ...item, galleryImages: JSON.stringify(imgs) });

    const sections = [
        { key: 'content', label: '📝 Content', color: '#8b5cf6' },
        { key: 'media', label: '🖼️ Media & Gallery', color: '#06b6d4' },
        { key: 'seo', label: '🔍 SEO', color: '#10b981' },
    ];

    return (
        <div style={{ maxWidth: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>{isNew ? 'New Case Study' : 'Edit Case Study'}</h1>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => router.push('/admin/portfolio')} style={btnSecondary}>Cancel</button>
                    <button onClick={save} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save'}</button>
                </div>
            </div>

            {error && <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>{error}</div>}

            {/* Language Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {(['fr', 'en', 'ar'] as const).map(l => (
                    <button key={l} onClick={() => setTab(l)} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid', borderColor: tab === l ? '#8b5cf6' : 'rgba(255,255,255,0.08)', background: tab === l ? 'rgba(139,92,246,0.15)' : 'transparent', color: tab === l ? '#8b5cf6' : '#888', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                        {l === 'fr' ? '🇫🇷 Français' : l === 'en' ? '🇬🇧 English' : '🇲🇦 العربية'}
                    </button>
                ))}
            </div>

            {/* Section Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, padding: 4, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                {sections.map(s => (
                    <button key={s.key} onClick={() => setActiveSection(s.key as typeof activeSection)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: activeSection === s.key ? 600 : 400, background: activeSection === s.key ? `${s.color}15` : 'transparent', color: activeSection === s.key ? s.color : '#888' }}>{s.label}</button>
                ))}
            </div>

            {activeSection === 'content' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
                    <div>
                        <div style={cardBox}>
                            <label style={labelStyle}>Title ({tab.toUpperCase()})</label>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <input value={(item as any)[`title${t}`] || ''} onChange={e => setItem({ ...item, [`title${t}`]: e.target.value })} placeholder="Project title" style={{ ...inputStyle, fontSize: 18, fontWeight: 600 }} />
                            <label style={labelStyle}>Description ({tab.toUpperCase()})</label>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <textarea value={(item as any)[`excerpt${t}`] || ''} onChange={e => setItem({ ...item, [`excerpt${t}`]: e.target.value })} rows={5} placeholder="Describe the project..." style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                    </div>
                    <div>
                        <div style={cardBox}>
                            <label style={labelStyle}>URL Slug</label>
                            <input value={item.slug} onChange={e => setItem({ ...item, slug: e.target.value })} placeholder="case-study-slug" style={inputStyle} />
                            <label style={labelStyle}>Client Name</label>
                            <input value={item.clientName} onChange={e => setItem({ ...item, clientName: e.target.value })} placeholder="Client company" style={inputStyle} />
                            <label style={labelStyle}>Industry</label>
                            <input value={item.industry} onChange={e => setItem({ ...item, industry: e.target.value })} placeholder="e.g. E-commerce" style={inputStyle} />
                            <label style={labelStyle}>Tags (comma-separated)</label>
                            <input value={item.tags} onChange={e => setItem({ ...item, tags: e.target.value })} placeholder="SEO, Google Ads" style={inputStyle} />
                            <label style={labelStyle}>Results (JSON array)</label>
                            <input value={item.results} onChange={e => setItem({ ...item, results: e.target.value })} placeholder='["+320%", "x2"]' style={inputStyle} />
                        </div>
                        <div style={cardBox}>
                            <label style={{ ...labelStyle, marginBottom: 12 }}>Options</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ccc', fontSize: 14, marginBottom: 12, cursor: 'pointer' }}><input type="checkbox" checked={item.isPublished} onChange={e => setItem({ ...item, isPublished: e.target.checked })} /> Published</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ccc', fontSize: 14, marginBottom: 16, cursor: 'pointer' }}><input type="checkbox" checked={item.isFeatured} onChange={e => setItem({ ...item, isFeatured: e.target.checked })} /> Featured</label>
                            <label style={labelStyle}>Sort Order</label>
                            <input type="number" value={item.sortOrder} onChange={e => setItem({ ...item, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'media' && (
                <div>
                    <div style={cardBox}>
                        <label style={labelStyle}>Featured Image URL</label>
                        <input value={item.featuredImage} onChange={e => setItem({ ...item, featuredImage: e.target.value })} placeholder="/uploads/image.jpg" style={inputStyle} />
                        <label style={labelStyle}>Image Alt Text</label>
                        <input value={item.imageAlt} onChange={e => setItem({ ...item, imageAlt: e.target.value })} placeholder="Describe the image" style={inputStyle} />
                        {item.featuredImage && <img src={item.featuredImage} alt={item.imageAlt} style={{ width: '100%', borderRadius: 8, maxHeight: 200, objectFit: 'cover' }} />}
                    </div>

                    <GalleryManager images={galleryImages} onChange={setGallery} />

                    {/* Sub-items — only show after project is saved */}
                    {savedId ? (
                        <>
                            <SubItemManager portfolioId={savedId} type="portfolio-websites" label="Website Showcases" icon="🌐"
                                fields={[
                                    { key: 'title', label: 'Title *', placeholder: 'Website name' },
                                    { key: 'category', label: 'Category', placeholder: 'e.g., Tourism' },
                                    { key: 'url', label: 'Website URL', placeholder: 'example.com' },
                                    { key: 'screenshotUrl', label: 'Screenshot URL', placeholder: '/uploads/screenshot.jpg' },
                                    { key: 'descriptionFr', label: 'Description (FR)', placeholder: 'French description' },
                                    { key: 'descriptionEn', label: 'Description (EN)', placeholder: 'English description' },
                                    { key: 'statTraffic', label: 'Traffic Stat', placeholder: '+320%' },
                                    { key: 'statConversion', label: 'Conversion', placeholder: '4.2%' },
                                    { key: 'statSpeed', label: 'Speed Score', placeholder: '98/100' },
                                    { key: 'accentColor', label: 'Accent Color', placeholder: '#8b5cf6' },
                                ]}
                            />
                            <SubItemManager portfolioId={savedId} type="portfolio-social-designs" label="Social Media Designs" icon="🎨"
                                fields={[
                                    { key: 'title', label: 'Title *', placeholder: 'Design title' },
                                    { key: 'type', label: 'Type', type: 'select', options: ['instagram', 'story', 'facebook', 'carousel', 'tiktok'] },
                                    { key: 'imageUrl', label: 'Design Image URL', placeholder: '/uploads/design.jpg' },
                                    { key: 'clientName', label: 'Client Name', placeholder: 'Client' },
                                    { key: 'ratio', label: 'Aspect Ratio', type: 'select', options: ['aspect-square', 'aspect-[9/16]', 'aspect-video'] },
                                    { key: 'color', label: 'Gradient Fallback', placeholder: 'from-pink-500 to-purple-600' },
                                ]}
                            />
                            <SubItemManager portfolioId={savedId} type="portfolio-videos" label="Videos" icon="🎬"
                                fields={[
                                    { key: 'title', label: 'Title *', placeholder: 'Video title' },
                                    { key: 'platform', label: 'Platform', type: 'select', options: ['youtube', 'vimeo', 'tiktok', 'instagram'] },
                                    { key: 'videoUrl', label: 'Video URL / Embed', placeholder: 'https://youtube.com/watch?v=...' },
                                    { key: 'thumbnailUrl', label: 'Thumbnail URL', placeholder: '/uploads/thumb.jpg' },
                                    { key: 'clientName', label: 'Client Name', placeholder: 'Client' },
                                    { key: 'category', label: 'Category', placeholder: 'e.g., Promo' },
                                ]}
                            />
                        </>
                    ) : (
                        <div style={{ ...cardBox, textAlign: 'center', padding: 40 }}>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
                            <p style={{ color: '#888', fontSize: 14, margin: 0 }}>Save the case study first, then you can add websites, social media designs, and videos.</p>
                        </div>
                    )}
                </div>
            )}

            {activeSection === 'seo' && (
                <div style={cardBox}>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>🔍 SEO ({tab.toUpperCase()})</h3>
                    <label style={labelStyle}>Meta Title</label>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <input value={(item as any)[`metaTitle${t}`] || ''} onChange={e => setItem({ ...item, [`metaTitle${t}`]: e.target.value })} placeholder="SEO title" style={inputStyle} />
                    <label style={labelStyle}>Meta Description</label>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <textarea value={(item as any)[`metaDesc${t}`] || ''} onChange={e => setItem({ ...item, [`metaDesc${t}`]: e.target.value })} rows={3} placeholder="SEO description" style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
            )}
        </div>
    );
}
