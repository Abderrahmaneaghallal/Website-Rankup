'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 };
const cardStyle = { padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 24 };
const tabBtnStyle = (active: boolean) => ({ padding: '8px 20px', borderRadius: 8, border: '1px solid', borderColor: active ? '#8b5cf6' : 'rgba(255,255,255,0.08)', background: active ? 'rgba(139,92,246,0.15)' : 'transparent', color: active ? '#8b5cf6' : '#888', cursor: 'pointer' as const, fontSize: 13, fontWeight: 500 as const });

const SECTION_TYPES = [
    { value: 'hero', label: '🏔️ Hero', desc: 'Large banner with title, subtitle and CTA' },
    { value: 'text', label: '📝 Text Block', desc: 'Rich text content section' },
    { value: 'image', label: '🖼️ Image', desc: 'Full-width or contained image' },
    { value: 'cta', label: '📢 Call to Action', desc: 'CTA with buttons' },
    { value: 'faq', label: '❓ FAQ', desc: 'Accordion FAQ section' },
    { value: 'stats', label: '📊 Statistics', desc: 'Animated number counters' },
    { value: 'gallery', label: '🎨 Gallery', desc: 'Image grid gallery' },
    { value: 'features', label: '✨ Features', desc: 'Feature cards grid' },
    { value: 'custom', label: '🔧 Custom HTML', desc: 'Custom HTML/code block' },
];

interface SectionData {
    id?: string;
    type: string;
    titleFr: string;
    titleEn: string;
    titleAr: string;
    contentFr: string;
    contentEn: string;
    contentAr: string;
    settings: string;
    sortOrder: number;
    isEnabled: boolean;
    pageId?: string;
}

export default function EditPage() {
    const params = useParams();
    const router = useRouter();
    const isNew = params.id === 'new';
    const [page, setPage] = useState<any>({
        slug: '', titleFr: '', titleEn: '', titleAr: '',
        metaDescFr: '', metaDescEn: '', metaDescAr: '',
        ogTitleFr: '', ogTitleEn: '', ogTitleAr: '', ogImage: '',
        canonicalUrl: '', robots: 'index, follow',
        schemaType: '', schemaData: '{}', customHeadCode: '',
        isPublished: false, template: 'default',
    });
    const [sections, setSections] = useState<SectionData[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState<'content' | 'sections' | 'seo'>('content');
    const [langTab, setLangTab] = useState<'fr' | 'en' | 'ar'>('fr');
    const [editingSection, setEditingSection] = useState<number | null>(null);
    const [showAddSection, setShowAddSection] = useState(false);

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/admin/pages/${params.id}`)
                .then(r => r.json())
                .then(data => {
                    const { sections: s, ...rest } = data;
                    setPage(rest);
                    setSections(s || []);
                })
                .catch(() => setError('Failed to load page.'));
        }
    }, [isNew, params.id]);

    const save = async () => {
        setError('');
        setSaving(true);
        try {
            const url = isNew ? '/api/admin/pages' : `/api/admin/pages/${params.id}`;
            const method = isNew ? 'POST' : 'PUT';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(page) });
            if (!res.ok) { const body = await res.json(); setError(body.error || 'Failed to save.'); setSaving(false); return; }
            const saved = await res.json();

            // Save sections
            for (const section of sections) {
                const sectionData = { ...section, pageId: saved.id };
                if (section.id) {
                    await fetch('/api/admin/sections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sectionData) });
                } else {
                    const sRes = await fetch('/api/admin/sections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sectionData) });
                    if (sRes.ok) {
                        const created = await sRes.json();
                        section.id = created.id;
                    }
                }
            }

            setSuccess('Page saved successfully!');
            setTimeout(() => setSuccess(''), 3000);
            if (isNew) router.push('/admin/pages');
        } catch { setError('Network error. Please try again.'); }
        finally { setSaving(false); }
    };

    const addSection = (type: string) => {
        setSections([...sections, {
            type, titleFr: '', titleEn: '', titleAr: '',
            contentFr: '', contentEn: '', contentAr: '',
            settings: '{}', sortOrder: sections.length, isEnabled: true,
        }]);
        setEditingSection(sections.length);
        setShowAddSection(false);
    };

    const updateSection = (idx: number, data: Partial<SectionData>) => {
        const updated = [...sections];
        updated[idx] = { ...updated[idx], ...data };
        setSections(updated);
    };

    const removeSection = async (idx: number) => {
        if (!confirm('Remove this section?')) return;
        const section = sections[idx];
        if (section.id) {
            await fetch('/api/admin/sections', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: section.id }) });
        }
        setSections(sections.filter((_, i) => i !== idx));
        setEditingSection(null);
    };

    const moveSection = (idx: number, dir: 'up' | 'down') => {
        const newIdx = dir === 'up' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= sections.length) return;
        const updated = [...sections];
        [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
        updated.forEach((s, i) => s.sortOrder = i);
        setSections(updated);
    };

    const titleKey = `title${langTab.charAt(0).toUpperCase() + langTab.slice(1)}` as 'titleFr' | 'titleEn' | 'titleAr';
    const descKey = `metaDesc${langTab.charAt(0).toUpperCase() + langTab.slice(1)}` as 'metaDescFr' | 'metaDescEn' | 'metaDescAr';
    const ogTitleKey = `ogTitle${langTab.charAt(0).toUpperCase() + langTab.slice(1)}` as 'ogTitleFr' | 'ogTitleEn' | 'ogTitleAr';

    const sectionContentKey = `content${langTab.charAt(0).toUpperCase() + langTab.slice(1)}` as 'contentFr' | 'contentEn' | 'contentAr';
    const sectionTitleKey = `title${langTab.charAt(0).toUpperCase() + langTab.slice(1)}` as 'titleFr' | 'titleEn' | 'titleAr';

    return (
        <div style={{ maxWidth: 900 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>{isNew ? 'Create New Page' : 'Edit Page'}</h1>
                    <p style={{ color: '#666', fontSize: 13, marginTop: 6 }}>{page.slug ? `/${page.slug}` : 'Set the page URL slug below'}</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => router.push('/admin/pages')} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#888', cursor: 'pointer', fontSize: 13 }}>Cancel</button>
                    {page.slug && (
                        <a href={`/fr/p/${page.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.1)', color: '#06b6d4', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>Preview ↗</a>
                    )}
                    <button onClick={save} disabled={saving} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: success ? '#10b981' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1 }}>
                        {success ? '✓ Saved!' : saving ? 'Saving...' : 'Save Page'}
                    </button>
                </div>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>{error}</div>
            )}

            {/* Main Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                    { key: 'content', label: '📄 Content', desc: 'Page details' },
                    { key: 'sections', label: '🧩 Sections', desc: `${sections.length} blocks` },
                    { key: 'seo', label: '🔍 SEO', desc: 'Search optimization' },
                ].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} style={{
                        flex: 1, padding: '14px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: activeTab === tab.key ? 'rgba(139,92,246,0.15)' : 'transparent',
                        color: activeTab === tab.key ? '#fff' : '#888', textAlign: 'left' as const,
                    }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{tab.label}</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{tab.desc}</div>
                    </button>
                ))}
            </div>

            {/* ─── CONTENT TAB ─── */}
            {activeTab === 'content' && (
                <>
                    <div style={cardStyle}>
                        <label style={labelStyle}>URL Slug</label>
                        <input value={page.slug} onChange={e => setPage({ ...page, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} placeholder="my-new-page" style={inputStyle} />
                        <div style={{ fontSize: 11, color: '#555', marginTop: -10, marginBottom: 16 }}>
                            Will be accessible at: <span style={{ color: '#06b6d4' }}>/fr/p/{page.slug || '...'}</span>
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                            {(['fr', 'en', 'ar'] as const).map(l => (
                                <button key={l} onClick={() => setLangTab(l)} style={tabBtnStyle(langTab === l)}>
                                    {l === 'fr' ? '🇫🇷 Français' : l === 'en' ? '🇬🇧 English' : '🇲🇦 العربية'}
                                </button>
                            ))}
                        </div>

                        <label style={labelStyle}>Page Title ({langTab.toUpperCase()})</label>
                        <input value={page[titleKey] || ''} onChange={e => setPage({ ...page, [titleKey]: e.target.value })} placeholder="Page title" style={inputStyle} />

                        <label style={labelStyle}>Meta Description ({langTab.toUpperCase()})</label>
                        <textarea value={page[descKey] || ''} onChange={e => setPage({ ...page, [descKey]: e.target.value })} placeholder="Short page description for search engines (150-160 chars)" rows={3} style={{ ...inputStyle, resize: 'vertical' as const }} />
                        <div style={{ fontSize: 11, color: (page[descKey] || '').length > 160 ? '#ef4444' : '#555', marginTop: -10 }}>
                            {(page[descKey] || '').length}/160 characters
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <label style={labelStyle}>Template</label>
                        <select value={page.template} onChange={e => setPage({ ...page, template: e.target.value })} style={{ ...inputStyle, appearance: 'none' as const }}>
                            <option value="default">Default</option>
                            <option value="landing">Landing Page</option>
                            <option value="blog">Blog Style</option>
                        </select>

                        <label style={labelStyle}>Featured Image URL</label>
                        <input value={page.featuredImage || ''} onChange={e => setPage({ ...page, featuredImage: e.target.value })} placeholder="https://example.com/image.jpg" style={inputStyle} />

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#ccc', fontSize: 14 }}>
                                <input type="checkbox" checked={page.isPublished} onChange={e => setPage({ ...page, isPublished: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#8b5cf6' }} />
                                Published
                            </label>
                        </div>
                    </div>
                </>
            )}

            {/* ─── SECTIONS TAB ─── */}
            {activeTab === 'sections' && (
                <>
                    {/* Section List */}
                    {sections.length === 0 ? (
                        <div style={{ ...cardStyle, textAlign: 'center' as const, padding: 60 }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🧩</div>
                            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No sections yet</h3>
                            <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Add sections to build your page content</p>
                            <button onClick={() => setShowAddSection(true)} style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>+ Add First Section</button>
                        </div>
                    ) : (
                        <div>
                            {sections.map((section, idx) => (
                                <div key={idx} style={{ ...cardStyle, borderColor: editingSection === idx ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)', position: 'relative' as const }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: editingSection === idx ? 20 : 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
                                                <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} style={{ background: 'none', border: 'none', color: idx === 0 ? '#333' : '#888', cursor: 'pointer', fontSize: 10, padding: 2 }}>▲</button>
                                                <button onClick={() => moveSection(idx, 'down')} disabled={idx === sections.length - 1} style={{ background: 'none', border: 'none', color: idx === sections.length - 1 ? '#333' : '#888', cursor: 'pointer', fontSize: 10, padding: 2 }}>▼</button>
                                            </div>
                                            <span style={{ fontSize: 20 }}>{SECTION_TYPES.find(t => t.value === section.type)?.label.split(' ')[0] || '🔧'}</span>
                                            <div>
                                                <div style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>
                                                    {SECTION_TYPES.find(t => t.value === section.type)?.label.slice(3) || section.type}
                                                    {section.titleFr && <span style={{ color: '#666', marginLeft: 8 }}>— {section.titleFr}</span>}
                                                </div>
                                                <div style={{ color: '#555', fontSize: 12, marginTop: 2 }}>
                                                    {section.isEnabled ? '● Active' : '○ Disabled'} · Sort: {section.sortOrder}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button onClick={() => updateSection(idx, { isEnabled: !section.isEnabled })} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'none', color: section.isEnabled ? '#10b981' : '#666', cursor: 'pointer', fontSize: 11 }}>
                                                {section.isEnabled ? '👁 On' : '👁‍🗨 Off'}
                                            </button>
                                            <button onClick={() => setEditingSection(editingSection === idx ? null : idx)} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)', background: editingSection === idx ? 'rgba(139,92,246,0.15)' : 'none', color: '#8b5cf6', cursor: 'pointer', fontSize: 11 }}>
                                                {editingSection === idx ? 'Close' : '✏️ Edit'}
                                            </button>
                                            <button onClick={() => removeSection(idx)} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 11 }}>🗑</button>
                                        </div>
                                    </div>

                                    {/* Section Editor */}
                                    {editingSection === idx && (
                                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                                            {/* Language Tabs */}
                                            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                                {(['fr', 'en', 'ar'] as const).map(l => (
                                                    <button key={l} onClick={() => setLangTab(l)} style={tabBtnStyle(langTab === l)}>
                                                        {l === 'fr' ? '🇫🇷 FR' : l === 'en' ? '🇬🇧 EN' : '🇲🇦 AR'}
                                                    </button>
                                                ))}
                                            </div>

                                            <label style={labelStyle}>Section Title ({langTab.toUpperCase()})</label>
                                            <input value={section[sectionTitleKey] || ''} onChange={e => updateSection(idx, { [sectionTitleKey]: e.target.value })} placeholder="Section heading" style={inputStyle} />

                                            <label style={labelStyle}>
                                                Content ({langTab.toUpperCase()})
                                                {section.type === 'faq' && <span style={{ color: '#06b6d4', marginLeft: 8 }}>{'JSON: [{"q":"...","a":"..."}]'}</span>}
                                                {section.type === 'stats' && <span style={{ color: '#06b6d4', marginLeft: 8 }}>{'JSON: [{"value":"100+","label":"..."}]'}</span>}
                                                {section.type === 'features' && <span style={{ color: '#06b6d4', marginLeft: 8 }}>{'JSON: [{"icon":"🎯","title":"...","desc":"..."}]'}</span>}
                                                {section.type === 'gallery' && <span style={{ color: '#06b6d4', marginLeft: 8 }}>{'JSON: [{"src":"...","alt":"..."}]'}</span>}
                                            </label>
                                            <textarea
                                                value={section[sectionContentKey] || ''}
                                                onChange={e => updateSection(idx, { [sectionContentKey]: e.target.value })}
                                                placeholder={
                                                    section.type === 'faq' ? '[{"q":"Question?","a":"Answer"}]' :
                                                        section.type === 'stats' ? '[{"value":"1600+","label":"Projects"}]' :
                                                            section.type === 'features' ? '[{"icon":"🎯","title":"Feature","desc":"Description"}]' :
                                                                section.type === 'gallery' ? '[{"src":"/images/photo.jpg","alt":"Description"}]' :
                                                                    section.type === 'custom' ? '<div class="...">Custom HTML</div>' :
                                                                        'Enter content text or HTML...'
                                                }
                                                rows={section.type === 'text' || section.type === 'custom' ? 10 : section.type === 'hero' ? 4 : 6}
                                                style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: ['faq', 'stats', 'features', 'gallery', 'custom'].includes(section.type) ? 'monospace' : 'inherit' }}
                                            />

                                            {(section.type === 'hero' || section.type === 'cta') && (
                                                <>
                                                    <label style={labelStyle}>Settings (JSON)</label>
                                                    <textarea
                                                        value={section.settings}
                                                        onChange={e => updateSection(idx, { settings: e.target.value })}
                                                        placeholder='{"buttonText":"Contact us","buttonLink":"/contact","background":"gradient"}'
                                                        rows={3}
                                                        style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: 'monospace' }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button onClick={() => setShowAddSection(true)} style={{ width: '100%', padding: '16px', borderRadius: 16, border: '2px dashed rgba(139,92,246,0.3)', background: 'none', color: '#8b5cf6', cursor: 'pointer', fontSize: 14, fontWeight: 500, marginTop: 8 }}>
                                + Add Section
                            </button>
                        </div>
                    )}

                    {/* Add Section Modal */}
                    {showAddSection && (
                        <div style={{ position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAddSection(false)}>
                            <div style={{ background: '#0f0f23', borderRadius: 20, padding: 32, maxWidth: 600, width: '90%', border: '1px solid rgba(255,255,255,0.08)', maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>Add Section</h3>
                                <p style={{ color: '#666', fontSize: 13, marginBottom: 24 }}>Choose a section type to add to your page</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                                    {SECTION_TYPES.map(type => (
                                        <button key={type.value} onClick={() => addSection(type.value)} style={{
                                            padding: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)',
                                            background: 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left' as const,
                                        }}>
                                            <div style={{ fontSize: 24, marginBottom: 8 }}>{type.label.split(' ')[0]}</div>
                                            <div style={{ color: '#fff', fontWeight: 500, fontSize: 13, marginBottom: 4 }}>{type.label.slice(3)}</div>
                                            <div style={{ color: '#555', fontSize: 11 }}>{type.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ─── SEO TAB ─── */}
            {activeTab === 'seo' && (
                <>
                    <div style={cardStyle}>
                        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>🔍 Search Engine Optimization</h3>

                        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                            {(['fr', 'en', 'ar'] as const).map(l => (
                                <button key={l} onClick={() => setLangTab(l)} style={tabBtnStyle(langTab === l)}>
                                    {l === 'fr' ? '🇫🇷 FR' : l === 'en' ? '🇬🇧 EN' : '🇲🇦 AR'}
                                </button>
                            ))}
                        </div>

                        <label style={labelStyle}>OG Title ({langTab.toUpperCase()}) — Social sharing title</label>
                        <input value={page[ogTitleKey] || ''} onChange={e => setPage({ ...page, [ogTitleKey]: e.target.value })} placeholder="Title shown when shared on social media (defaults to page title)" style={inputStyle} />

                        <label style={labelStyle}>Meta Description ({langTab.toUpperCase()})</label>
                        <textarea value={page[descKey] || ''} onChange={e => setPage({ ...page, [descKey]: e.target.value })} placeholder="Description for search engines" rows={3} style={{ ...inputStyle, resize: 'vertical' as const }} />
                        <div style={{ fontSize: 11, color: (page[descKey] || '').length > 160 ? '#ef4444' : '#555', marginTop: -10, marginBottom: 16 }}>
                            {(page[descKey] || '').length}/160 characters
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>📊 Technical SEO</h3>

                        <label style={labelStyle}>OG Image URL</label>
                        <input value={page.ogImage || ''} onChange={e => setPage({ ...page, ogImage: e.target.value })} placeholder="https://example.com/og-image.jpg (1200×630 recommended)" style={inputStyle} />

                        <label style={labelStyle}>Canonical URL</label>
                        <input value={page.canonicalUrl || ''} onChange={e => setPage({ ...page, canonicalUrl: e.target.value })} placeholder="Leave empty for automatic (recommended)" style={inputStyle} />
                        <div style={{ fontSize: 11, color: '#555', marginTop: -10, marginBottom: 16 }}>Only set if this content is duplicated elsewhere</div>

                        <label style={labelStyle}>Robots Directive</label>
                        <select value={page.robots || 'index, follow'} onChange={e => setPage({ ...page, robots: e.target.value })} style={{ ...inputStyle, appearance: 'none' as const }}>
                            <option value="index, follow">Index, Follow (default — search engines can index)</option>
                            <option value="noindex, follow">No Index, Follow (don't show in search results)</option>
                            <option value="index, nofollow">Index, No Follow (don't follow links)</option>
                            <option value="noindex, nofollow">No Index, No Follow (hide completely)</option>
                        </select>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>🏗️ Structured Data (Schema.org)</h3>

                        <label style={labelStyle}>Schema Type</label>
                        <select value={page.schemaType || ''} onChange={e => setPage({ ...page, schemaType: e.target.value })} style={{ ...inputStyle, appearance: 'none' as const }}>
                            <option value="">None</option>
                            <option value="WebPage">WebPage</option>
                            <option value="Article">Article</option>
                            <option value="FAQPage">FAQPage</option>
                            <option value="LocalBusiness">LocalBusiness</option>
                            <option value="Organization">Organization</option>
                            <option value="Service">Service</option>
                            <option value="Product">Product</option>
                        </select>

                        <label style={labelStyle}>Custom Schema JSON-LD</label>
                        <textarea value={page.schemaData || '{}'} onChange={e => setPage({ ...page, schemaData: e.target.value })} placeholder='{"@context":"https://schema.org","@type":"WebPage","name":"..."}' rows={6} style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: 'monospace' }} />
                    </div>

                    <div style={cardStyle}>
                        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>💉 Custom Head Code</h3>
                        <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>Inject custom code into the page&apos;s &lt;head&gt; tag. Use for analytics, tracking pixels, or custom meta tags.</p>
                        <textarea value={page.customHeadCode || ''} onChange={e => setPage({ ...page, customHeadCode: e.target.value })} placeholder='<meta name="custom" content="value" />' rows={5} style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: 'monospace' }} />
                    </div>

                    {/* SEO Preview */}
                    <div style={cardStyle}>
                        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 }}>👀 Google Search Preview</h3>
                        <div style={{ padding: 20, background: '#fff', borderRadius: 12 }}>
                            <div style={{ fontSize: 18, color: '#1a0dab', fontWeight: 400, marginBottom: 4, cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
                                {page[ogTitleKey] || page[titleKey] || 'Page Title'}
                            </div>
                            <div style={{ fontSize: 13, color: '#006621', fontFamily: 'Arial, sans-serif', marginBottom: 4 }}>
                                rankuplus.com/fr/p/{page.slug || '...'}
                            </div>
                            <div style={{ fontSize: 13, color: '#545454', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
                                {page[descKey] || 'No meta description set. Search engines will auto-generate one from the page content.'}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
