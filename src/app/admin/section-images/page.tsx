'use client';
import { useEffect, useState, useRef } from 'react';

interface SectionImage {
    id: string;
    sectionKey: string;
    imageUrl: string;
    altText: string;
    titleFr: string;
    titleEn: string;
    titleAr: string;
    descFr: string;
    descEn: string;
    descAr: string;
    isEnabled: boolean;
    updatedAt: string;
}

// Predefined sections for every page
const SECTION_DEFINITIONS = [
    {
        group: '🏠 Homepage', sections: [
            { key: 'home.hero', label: 'Hero Background' },
            { key: 'home.services', label: 'Services Section' },
            { key: 'home.about', label: 'About Preview' },
            { key: 'home.testimonials', label: 'Testimonials' },
            { key: 'home.stats', label: 'Statistics' },
            { key: 'home.why', label: 'Why Choose Us' },
            { key: 'home.cta', label: 'Call to Action' },
        ]
    },
    {
        group: '📋 About Page', sections: [
            { key: 'about.hero', label: 'Hero Background' },
            { key: 'about.mission', label: 'Mission Section' },
            { key: 'about.team', label: 'Team Section' },
            { key: 'about.values', label: 'Values Section' },
            { key: 'about.certifications', label: 'Certifications' },
            { key: 'about.timeline', label: 'Timeline' },
        ]
    },
    {
        group: '📞 Contact Page', sections: [
            { key: 'contact.hero', label: 'Hero Background' },
            { key: 'contact.office', label: 'Office Section' },
            { key: 'contact.map', label: 'Map Background' },
        ]
    },
    {
        group: '⚡ Services Page', sections: [
            { key: 'services.hero', label: 'Hero Background' },
            { key: 'services.overview', label: 'Overview Section' },
        ]
    },
    {
        group: '📱 Social Media Service', sections: [
            { key: 'services.reseaux-sociaux.hero', label: 'Hero Image' },
            { key: 'services.reseaux-sociaux.features', label: 'Features Section' },
            { key: 'services.reseaux-sociaux.process', label: 'Process Section' },
        ]
    },
    {
        group: '📢 Online Advertising', sections: [
            { key: 'services.publicite-en-ligne.hero', label: 'Hero Image' },
            { key: 'services.publicite-en-ligne.features', label: 'Features Section' },
            { key: 'services.publicite-en-ligne.process', label: 'Process Section' },
        ]
    },
    {
        group: '🎨 Graphic Design', sections: [
            { key: 'services.design-graphique.hero', label: 'Hero Image' },
            { key: 'services.design-graphique.features', label: 'Features Section' },
            { key: 'services.design-graphique.process', label: 'Process Section' },
        ]
    },
    {
        group: '🌐 Web Development', sections: [
            { key: 'services.creation-sites-web.hero', label: 'Hero Image' },
            { key: 'services.creation-sites-web.features', label: 'Features Section' },
            { key: 'services.creation-sites-web.process', label: 'Process Section' },
        ]
    },
    {
        group: '🔍 SEO Service', sections: [
            { key: 'services.referencement-naturel.hero', label: 'Hero Image' },
            { key: 'services.referencement-naturel.features', label: 'Features Section' },
            { key: 'services.referencement-naturel.process', label: 'Process Section' },
        ]
    },
    {
        group: '🗂️ Portfolio', sections: [
            { key: 'portfolio.hero', label: 'Hero Background' },
            { key: 'portfolio.showcase', label: 'Showcase Section' },
        ]
    },
    {
        group: '✍️ Blog', sections: [
            { key: 'blog.hero', label: 'Hero Background' },
        ]
    },
    {
        group: '🏙️ City: Agadir', sections: [
            { key: 'city.agadir.hero', label: 'Hero Image' },
            { key: 'city.agadir.services', label: 'Services Section' },
        ]
    },
    {
        group: '🏙️ City: Casablanca', sections: [
            { key: 'city.casablanca.hero', label: 'Hero Image' },
            { key: 'city.casablanca.services', label: 'Services Section' },
        ]
    },
    {
        group: '🏙️ City: Marrakech', sections: [
            { key: 'city.marrakech.hero', label: 'Hero Image' },
            { key: 'city.marrakech.services', label: 'Services Section' },
        ]
    },
    {
        group: '🏙️ City: Rabat', sections: [
            { key: 'city.rabat.hero', label: 'Hero Image' },
            { key: 'city.rabat.services', label: 'Services Section' },
        ]
    },
];

const s = {
    card: { borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' as const },
    input: { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 13, outline: 'none' },
    label: { display: 'block', color: '#888', fontSize: 11, marginBottom: 6, fontWeight: 500 as const, textTransform: 'uppercase' as const, letterSpacing: 1 },
    btn: { padding: '10px 20px', borderRadius: 10, border: 'none', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' },
    purple: { background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff' },
    red: { background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' },
    green: { background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' },
};

export default function SectionImagesPage() {
    const [images, setImages] = useState<SectionImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string>('');
    const [expandedGroup, setExpandedGroup] = useState<string>(SECTION_DEFINITIONS[0].group);
    const [toast, setToast] = useState('');
    const fileRefs = useRef<Record<string, HTMLInputElement>>({});

    useEffect(() => {
        fetch('/api/admin/section-images').then(r => r.json()).then(d => { setImages(d); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const getImage = (key: string) => images.find(i => i.sectionKey === key);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const handleSave = async (key: string, file: File | null, altText: string) => {
        setSaving(key);
        try {
            const formData = new FormData();
            formData.append('sectionKey', key);
            if (file) formData.append('file', file);
            formData.append('altText', altText);
            formData.append('isEnabled', 'true');

            const res = await fetch('/api/admin/section-images', { method: 'POST', body: formData });
            if (res.ok) {
                const updated = await res.json();
                setImages(prev => {
                    const idx = prev.findIndex(i => i.sectionKey === key);
                    if (idx >= 0) { const n = [...prev]; n[idx] = updated; return n; }
                    return [...prev, updated];
                });
                showToast(`✅ ${key} saved!`);
            } else {
                showToast('❌ Error saving');
            }
        } catch { showToast('❌ Network error'); }
        setSaving('');
    };

    const handleDelete = async (key: string) => {
        if (!confirm('Delete this image?')) return;
        try {
            const res = await fetch('/api/admin/section-images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sectionKey: key }),
            });
            if (res.ok) {
                setImages(prev => prev.filter(i => i.sectionKey !== key));
                showToast(`🗑️ ${key} deleted`);
            }
        } catch { showToast('❌ Error deleting'); }
    };

    const uploadCount = images.length;
    const totalSections = SECTION_DEFINITIONS.reduce((t, g) => t + g.sections.length, 0);

    return (
        <div>
            {/* Toast */}
            {toast && (
                <div style={{ position: 'fixed', top: 24, right: 24, padding: '14px 24px', borderRadius: 12, background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animation: 'fadeIn 0.3s ease' }}>
                    {toast}
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>🖼️ Section Images</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>
                        Manage images for every section of your website • {uploadCount}/{totalSections} configured
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ ...s.card, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: uploadCount > 0 ? '#22c55e' : '#ef4444' }} />
                        <span style={{ color: '#fff', fontSize: 13 }}>{uploadCount} images active</span>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 32, ...s.card, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#888', fontSize: 12 }}>Coverage</span>
                    <span style={{ color: '#8b5cf6', fontSize: 12, fontWeight: 600 }}>{Math.round((uploadCount / totalSections) * 100)}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)', width: `${(uploadCount / totalSections) * 100}%`, transition: 'width 0.5s ease' }} />
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>Loading section images...</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SECTION_DEFINITIONS.map(group => {
                        const isExpanded = expandedGroup === group.group;
                        const configured = group.sections.filter(sec => getImage(sec.key)).length;
                        return (
                            <div key={group.group} style={s.card}>
                                {/* Group Header */}
                                <button
                                    onClick={() => setExpandedGroup(isExpanded ? '' : group.group)}
                                    style={{ width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 18 }}>{group.group.split(' ')[0]}</span>
                                        <span style={{ fontSize: 16, fontWeight: 600 }}>{group.group.substring(group.group.indexOf(' ') + 1)}</span>
                                        <span style={{ fontSize: 11, color: '#888', padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)' }}>
                                            {configured}/{group.sections.length}
                                        </span>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isExpanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}>
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                {/* Sections */}
                                {isExpanded && (
                                    <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        {group.sections.map(sec => (
                                            <SectionImageCard
                                                key={sec.key}
                                                sectionKey={sec.key}
                                                label={sec.label}
                                                image={getImage(sec.key)}
                                                saving={saving === sec.key}
                                                onSave={(file, alt) => handleSave(sec.key, file, alt)}
                                                onDelete={() => handleDelete(sec.key)}
                                                fileRef={(el: HTMLInputElement | null) => { if (el) fileRefs.current[sec.key] = el; }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// Individual section image card
function SectionImageCard({
    sectionKey, label, image, saving, onSave, onDelete, fileRef,
}: {
    sectionKey: string;
    label: string;
    image: SectionImage | undefined;
    saving: boolean;
    onSave: (file: File | null, altText: string) => void;
    onDelete: () => void;
    fileRef: (el: HTMLInputElement | null) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [altText, setAltText] = useState(image?.altText || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(f);
        }
    };

    const currentImage = preview || image?.imageUrl;
    const hasChanges = file || altText !== (image?.altText || '');

    return (
        <div style={{ ...s.card, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 0 }}>
            {/* Image Preview */}
            <div
                onClick={() => inputRef.current?.click()}
                style={{
                    width: 200, minHeight: 140, flexShrink: 0, cursor: 'pointer', position: 'relative',
                    background: currentImage ? `url(${currentImage}) center/cover` : 'rgba(255,255,255,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                {!currentImage && (
                    <div style={{ textAlign: 'center', color: '#555' }}>
                        <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
                        <div style={{ fontSize: 11 }}>Click to upload</div>
                    </div>
                )}
                {currentImage && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                    >
                        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>📷 Change</span>
                    </div>
                )}
                <input ref={(el) => { inputRef.current = el; fileRef(el); }} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            </div>

            {/* Details */}
            <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{label}</div>
                        <code style={{ color: '#666', fontSize: 11 }}>{sectionKey}</code>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {image && (
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} title="Active" />
                        )}
                    </div>
                </div>

                <div>
                    <label style={s.label}>Alt Text (SEO)</label>
                    <input
                        value={altText}
                        onChange={e => setAltText(e.target.value)}
                        placeholder="Describe this image for SEO..."
                        style={s.input}
                    />
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 'auto' }}>
                    {image && (
                        <button onClick={onDelete} style={{ ...s.btn, ...s.red, fontSize: 12, padding: '6px 14px' }}>
                            🗑️ Remove
                        </button>
                    )}
                    {hasChanges && (
                        <button
                            onClick={() => { onSave(file, altText); setFile(null); setPreview(''); }}
                            disabled={saving}
                            style={{ ...s.btn, ...s.purple, fontSize: 12, padding: '6px 14px', opacity: saving ? 0.6 : 1 }}
                        >
                            {saving ? '⏳ Saving...' : '💾 Save'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
