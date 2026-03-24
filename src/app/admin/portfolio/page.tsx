'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PortfolioItem { id: string; slug: string; titleFr: string; clientName: string; industry: string; isFeatured: boolean; isPublished: boolean; sortOrder: number; createdAt: string; }
interface WebsiteItem { id: string; title: string; category: string; url: string; isPublished: boolean; isFeatured: boolean; sortOrder: number; }
interface SocialDesign { id: string; title: string; type: string; clientName: string; isPublished: boolean; sortOrder: number; }
interface VideoItem { id: string; title: string; platform: string; clientName: string; isPublished: boolean; sortOrder: number; }

const tabs = [
    { key: 'overview', label: '📊 Overview', color: '#8b5cf6' },
    { key: 'case-studies', label: '📋 Case Studies', color: '#06b6d4' },
    { key: 'websites', label: '🌐 Websites', color: '#10b981' },
    { key: 'social-designs', label: '🎨 Social Designs', color: '#f59e0b' },
    { key: 'videos', label: '🎬 Videos', color: '#ef4444' },
    { key: 'social-links', label: '🔗 Social Links', color: '#ec4899' },
];

const cardBox = { padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 20 };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, marginBottom: 12 };
const labelStyle = { display: 'block' as const, fontSize: 12, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 6 };
const btnPrimary = { padding: '10px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 };
const btnSecondary = { padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#888', cursor: 'pointer', fontSize: 13 };

function StatCard({ icon, label, value, color, href }: { icon: string; label: string; value: number | string; color: string; href: string }) {
    return (
        <Link href={href} style={{ padding: '24px 20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', flex: '1 1 180px', minWidth: 160, textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ color: '#888', fontSize: 11, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{value}</div>
                </div>
                <span style={{ fontSize: 24 }}>{icon}</span>
            </div>
            <div style={{ marginTop: 10, color, fontSize: 12 }}>Manage →</div>
        </Link>
    );
}

function TableShell({ headers, children, empty, emptyIcon }: { headers: string[]; children: React.ReactNode; empty?: boolean; emptyIcon?: string }) {
    if (empty) return (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{emptyIcon || '📭'}</div>
            <p>No items yet. Create your first one above.</p>
        </div>
    );
    return (
        <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {headers.map(h => <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#888', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>)}
                </tr></thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}

function StatusBadge({ published, onToggle }: { published: boolean; onToggle: () => void }) {
    return (
        <button onClick={onToggle} style={{ padding: '4px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: published ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)', color: published ? '#10b981' : '#666' }}>
            {published ? 'Published' : 'Draft'}
        </button>
    );
}

function ActionBtns({ editHref, onDelete }: { editHref?: string; onDelete: () => void }) {
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {editHref && <Link href={editHref} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>Edit</Link>}
            <button onClick={onDelete} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Delete</button>
        </div>
    );
}

/* ─── CASE STUDIES TAB ─── */
function CaseStudiesTab() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { fetch('/api/admin/portfolio').then(r => r.json()).then(setItems).finally(() => setLoading(false)); }, []);
    const remove = async (id: string, title: string) => { if (!confirm(`Delete "${title}"?`)) return; await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' }); setItems(p => p.filter(i => i.id !== id)); };
    const toggle = async (item: PortfolioItem) => { await fetch(`/api/admin/portfolio/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, isPublished: !item.isPublished }) }); setItems(p => p.map(i => i.id === item.id ? { ...i, isPublished: !i.isPublished } : i)); };
    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <p style={{ color: '#888', fontSize: 14, margin: 0 }}>{items.length} case studies</p>
            <Link href="/admin/portfolio/new" style={{ ...btnPrimary, textDecoration: 'none' }}>+ New Case Study</Link>
        </div>
        <TableShell headers={['Title', 'Client', 'Industry', 'Status', 'Actions']} empty={items.length === 0} emptyIcon="📋">
            {items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}><div style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>{item.titleFr}</div>{item.isFeatured && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 600 }}>FEATURED</span>}</td>
                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 14 }}>{item.clientName || '—'}</td>
                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 14 }}>{item.industry || '—'}</td>
                    <td style={{ padding: '16px 20px' }}><StatusBadge published={item.isPublished} onToggle={() => toggle(item)} /></td>
                    <td style={{ padding: '16px 20px' }}><ActionBtns editHref={`/admin/portfolio/${item.id}`} onDelete={() => remove(item.id, item.titleFr)} /></td>
                </tr>
            ))}
        </TableShell>
    </div>);
}

/* ─── WEBSITES TAB ─── */
function WebsitesTab() {
    const [items, setItems] = useState<WebsiteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', category: '', url: '', screenshotUrl: '', gradient: 'from-violet-900/80 via-purple-800/60 to-indigo-900/80', accentColor: '#8b5cf6', descriptionFr: '', descriptionEn: '', descriptionAr: '', statTraffic: '', statConversion: '', statSpeed: '', mockupSections: '["hero", "services", "portfolio", "contact"]', isFeatured: false, isPublished: true, sortOrder: 0 });
    const [editId, setEditId] = useState<string | null>(null);

    const load = () => { fetch('/api/admin/portfolio-websites').then(r => r.json()).then(setItems).finally(() => setLoading(false)); };
    useEffect(() => { load(); }, []);

    const save = async () => {
        const url = editId ? `/api/admin/portfolio-websites/${editId}` : '/api/admin/portfolio-websites';
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        setShowForm(false); setEditId(null); setForm({ title: '', category: '', url: '', screenshotUrl: '', gradient: 'from-violet-900/80 via-purple-800/60 to-indigo-900/80', accentColor: '#8b5cf6', descriptionFr: '', descriptionEn: '', descriptionAr: '', statTraffic: '', statConversion: '', statSpeed: '', mockupSections: '["hero", "services", "portfolio", "contact"]', isFeatured: false, isPublished: true, sortOrder: 0 });
        load();
    };

    const edit = async (id: string) => {
        const res = await fetch(`/api/admin/portfolio-websites/${id}`);
        const data = await res.json();
        setForm(data); setEditId(id); setShowForm(true);
    };

    const remove = async (id: string, title: string) => { if (!confirm(`Delete "${title}"?`)) return; await fetch(`/api/admin/portfolio-websites/${id}`, { method: 'DELETE' }); load(); };
    const toggle = async (item: WebsiteItem) => { await fetch(`/api/admin/portfolio-websites/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, isPublished: !item.isPublished }) }); load(); };

    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;

    const gradientPresets = [
        { label: 'Purple', value: 'from-violet-900/80 via-purple-800/60 to-indigo-900/80', accent: '#8b5cf6' },
        { label: 'Green', value: 'from-emerald-900/80 via-teal-800/60 to-green-900/80', accent: '#10b981' },
        { label: 'Amber', value: 'from-amber-900/80 via-orange-800/60 to-yellow-900/80', accent: '#f59e0b' },
        { label: 'Red', value: 'from-red-900/80 via-rose-800/60 to-pink-900/80', accent: '#f43f5e' },
        { label: 'Blue', value: 'from-blue-900/80 via-sky-800/60 to-cyan-900/80', accent: '#3b82f6' },
        { label: 'Cyan', value: 'from-cyan-900/80 via-teal-800/60 to-emerald-900/80', accent: '#06b6d4' },
    ];

    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <p style={{ color: '#888', fontSize: 14, margin: 0 }}>{items.length} website showcases</p>
            <button onClick={() => { setShowForm(!showForm); setEditId(null); }} style={btnPrimary}>+ New Website</button>
        </div>

        {showForm && (
            <div style={{ ...cardBox, padding: 28 }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>{editId ? '✏️ Edit Website' : '🌐 New Website Showcase'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div><label style={labelStyle}>Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Website name" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Category</label><input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g., Tourism, E-commerce" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Website URL</label><input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="example.com" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Screenshot URL</label><input value={form.screenshotUrl || ''} onChange={e => setForm({ ...form, screenshotUrl: e.target.value })} placeholder="/uploads/screenshot.jpg" style={inputStyle} /></div>
                </div>
                <label style={labelStyle}>Description (FR)</label><input value={form.descriptionFr} onChange={e => setForm({ ...form, descriptionFr: e.target.value })} placeholder="French description" style={inputStyle} />
                <label style={labelStyle}>Description (EN)</label><input value={form.descriptionEn} onChange={e => setForm({ ...form, descriptionEn: e.target.value })} placeholder="English description" style={inputStyle} />
                <label style={labelStyle}>Description (AR)</label><input value={form.descriptionAr} onChange={e => setForm({ ...form, descriptionAr: e.target.value })} placeholder="Arabic description" style={inputStyle} />
                <label style={{ ...labelStyle, marginTop: 8 }}>Color Theme</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {gradientPresets.map(p => (
                        <button key={p.value} onClick={() => setForm({ ...form, gradient: p.value, accentColor: p.accent })} style={{ padding: '6px 14px', borderRadius: 8, border: form.gradient === p.value ? `2px solid ${p.accent}` : '1px solid rgba(255,255,255,0.08)', background: `linear-gradient(135deg, ${p.accent}33, ${p.accent}11)`, color: p.accent, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>{p.label}</button>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div><label style={labelStyle}>Traffic Stat</label><input value={form.statTraffic} onChange={e => setForm({ ...form, statTraffic: e.target.value })} placeholder="+320%" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Conversion Stat</label><input value={form.statConversion} onChange={e => setForm({ ...form, statConversion: e.target.value })} placeholder="4.2%" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Speed Score</label><input value={form.statSpeed} onChange={e => setForm({ ...form, statSpeed: e.target.value })} placeholder="98/100" style={inputStyle} /></div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /> Published</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label>
                    <div style={{ flex: 1 }} />
                    <button onClick={() => setShowForm(false)} style={btnSecondary}>Cancel</button>
                    <button onClick={save} style={btnPrimary}>{editId ? 'Update' : 'Create'}</button>
                </div>
            </div>
        )}

        <TableShell headers={['Title', 'Category', 'URL', 'Status', 'Actions']} empty={items.length === 0} emptyIcon="🌐">
            {items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}><div style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>{item.title}</div>{item.isFeatured && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 600, marginLeft: 8 }}>FEATURED</span>}</td>
                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 14 }}>{item.category || '—'}</td>
                    <td style={{ padding: '16px 20px', color: '#06b6d4', fontSize: 13 }}>{item.url || '—'}</td>
                    <td style={{ padding: '16px 20px' }}><StatusBadge published={item.isPublished} onToggle={() => toggle(item)} /></td>
                    <td style={{ padding: '16px 20px' }}><div style={{ display: 'flex', gap: 8 }}><button onClick={() => edit(item.id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)', background: 'none', color: '#a78bfa', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Edit</button><button onClick={() => remove(item.id, item.title)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Delete</button></div></td>
                </tr>
            ))}
        </TableShell>
    </div>);
}

/* ─── SOCIAL DESIGNS TAB ─── */
function SocialDesignsTab() {
    const [items, setItems] = useState<SocialDesign[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', type: 'instagram', imageUrl: '', color: 'from-pink-500 to-purple-600', ratio: 'aspect-square', clientName: '', isFeatured: false, isPublished: true, sortOrder: 0 });
    const [editId, setEditId] = useState<string | null>(null);

    const load = () => { fetch('/api/admin/portfolio-social-designs').then(r => r.json()).then(setItems).finally(() => setLoading(false)); };
    useEffect(() => { load(); }, []);

    const save = async () => {
        const url = editId ? `/api/admin/portfolio-social-designs/${editId}` : '/api/admin/portfolio-social-designs';
        await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        setShowForm(false); setEditId(null); setForm({ title: '', type: 'instagram', imageUrl: '', color: 'from-pink-500 to-purple-600', ratio: 'aspect-square', clientName: '', isFeatured: false, isPublished: true, sortOrder: 0 }); load();
    };
    const edit = async (id: string) => { const data = await (await fetch(`/api/admin/portfolio-social-designs/${id}`)).json(); setForm(data); setEditId(id); setShowForm(true); };
    const remove = async (id: string, title: string) => { if (!confirm(`Delete "${title}"?`)) return; await fetch(`/api/admin/portfolio-social-designs/${id}`, { method: 'DELETE' }); load(); };

    const typeOptions = ['instagram', 'story', 'facebook', 'carousel', 'tiktok'];
    const ratioOptions = [{ label: 'Square (1:1)', value: 'aspect-square' }, { label: 'Story (9:16)', value: 'aspect-[9/16]' }, { label: 'Video (16:9)', value: 'aspect-video' }];
    const colorPresets = [
        { label: 'Pink-Purple', value: 'from-pink-500 to-purple-600' }, { label: 'Amber-Orange', value: 'from-amber-400 to-orange-600' },
        { label: 'Red-Rose', value: 'from-red-500 to-rose-600' }, { label: 'Blue-Indigo', value: 'from-blue-500 to-indigo-600' },
        { label: 'Green-Teal', value: 'from-emerald-400 to-teal-600' }, { label: 'Cyan-Blue', value: 'from-cyan-400 to-blue-600' },
    ];

    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <p style={{ color: '#888', fontSize: 14, margin: 0 }}>{items.length} social media designs</p>
            <button onClick={() => { setShowForm(!showForm); setEditId(null); }} style={btnPrimary}>+ New Design</button>
        </div>
        {showForm && (
            <div style={{ ...cardBox, padding: 28 }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>{editId ? '✏️ Edit Design' : '🎨 New Social Media Design'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div><label style={labelStyle}>Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Design title" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Client Name</label><input value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Client name" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Platform Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>{typeOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select></div>
                    <div><label style={labelStyle}>Aspect Ratio</label><select value={form.ratio} onChange={e => setForm({ ...form, ratio: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>{ratioOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}</select></div>
                </div>
                <label style={labelStyle}>Design Image URL</label><input value={form.imageUrl || ''} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="/uploads/design.jpg" style={inputStyle} />
                <label style={labelStyle}>Color Theme</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {colorPresets.map(p => (<button key={p.value} onClick={() => setForm({ ...form, color: p.value })} style={{ padding: '6px 14px', borderRadius: 8, border: form.color === p.value ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#ccc', fontSize: 12, cursor: 'pointer' }}>{p.label}</button>))}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /> Published</label>
                    <div style={{ flex: 1 }} /><button onClick={() => setShowForm(false)} style={btnSecondary}>Cancel</button><button onClick={save} style={btnPrimary}>{editId ? 'Update' : 'Create'}</button>
                </div>
            </div>
        )}
        <TableShell headers={['Title', 'Type', 'Client', 'Status', 'Actions']} empty={items.length === 0} emptyIcon="🎨">
            {items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '16px 20px', color: '#fff', fontWeight: 500, fontSize: 14 }}>{item.title}</td>
                    <td style={{ padding: '16px 20px' }}><span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(139,92,246,0.1)', color: '#a78bfa', textTransform: 'uppercase' }}>{item.type}</span></td>
                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 14 }}>{item.clientName || '—'}</td>
                    <td style={{ padding: '16px 20px' }}><StatusBadge published={item.isPublished} onToggle={async () => { await fetch(`/api/admin/portfolio-social-designs/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, isPublished: !item.isPublished }) }); load(); }} /></td>
                    <td style={{ padding: '16px 20px' }}><div style={{ display: 'flex', gap: 8 }}><button onClick={() => edit(item.id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)', background: 'none', color: '#a78bfa', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Edit</button><button onClick={() => remove(item.id, item.title)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Delete</button></div></td>
                </tr>
            ))}
        </TableShell>
    </div>);
}

/* ─── VIDEOS TAB ─── */
function VideosTab() {
    const [items, setItems] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', titleFr: '', titleEn: '', titleAr: '', platform: 'youtube', videoUrl: '', thumbnailUrl: '', descriptionFr: '', descriptionEn: '', descriptionAr: '', clientName: '', category: '', isFeatured: false, isPublished: true, sortOrder: 0 });
    const [editId, setEditId] = useState<string | null>(null);

    const load = () => { fetch('/api/admin/portfolio-videos').then(r => r.json()).then(setItems).finally(() => setLoading(false)); };
    useEffect(() => { load(); }, []);

    const save = async () => {
        const url = editId ? `/api/admin/portfolio-videos/${editId}` : '/api/admin/portfolio-videos';
        await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        setShowForm(false); setEditId(null); setForm({ title: '', titleFr: '', titleEn: '', titleAr: '', platform: 'youtube', videoUrl: '', thumbnailUrl: '', descriptionFr: '', descriptionEn: '', descriptionAr: '', clientName: '', category: '', isFeatured: false, isPublished: true, sortOrder: 0 }); load();
    };
    const edit = async (id: string) => { const data = await (await fetch(`/api/admin/portfolio-videos/${id}`)).json(); setForm(data); setEditId(id); setShowForm(true); };
    const remove = async (id: string, title: string) => { if (!confirm(`Delete "${title}"?`)) return; await fetch(`/api/admin/portfolio-videos/${id}`, { method: 'DELETE' }); load(); };

    const platforms = ['youtube', 'vimeo', 'tiktok', 'instagram'];
    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <p style={{ color: '#888', fontSize: 14, margin: 0 }}>{items.length} videos</p>
            <button onClick={() => { setShowForm(!showForm); setEditId(null); }} style={btnPrimary}>+ New Video</button>
        </div>
        {showForm && (
            <div style={{ ...cardBox, padding: 28 }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>{editId ? '✏️ Edit Video' : '🎬 New Video'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div><label style={labelStyle}>Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Video title" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Platform</label><select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>{platforms.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}</select></div>
                    <div><label style={labelStyle}>Video URL / Embed</label><input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." style={inputStyle} /></div>
                    <div><label style={labelStyle}>Thumbnail URL</label><input value={form.thumbnailUrl || ''} onChange={e => setForm({ ...form, thumbnailUrl: e.target.value })} placeholder="/uploads/thumb.jpg" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Client Name</label><input value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Client" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Category</label><input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g., Promo, Tutorial" style={inputStyle} /></div>
                </div>
                <label style={labelStyle}>Description (FR)</label><textarea value={form.descriptionFr} onChange={e => setForm({ ...form, descriptionFr: e.target.value })} rows={2} placeholder="French description" style={{ ...inputStyle, resize: 'vertical' }} />
                <label style={labelStyle}>Description (EN)</label><textarea value={form.descriptionEn} onChange={e => setForm({ ...form, descriptionEn: e.target.value })} rows={2} placeholder="English description" style={{ ...inputStyle, resize: 'vertical' }} />
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /> Published</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label>
                    <div style={{ flex: 1 }} /><button onClick={() => setShowForm(false)} style={btnSecondary}>Cancel</button><button onClick={save} style={btnPrimary}>{editId ? 'Update' : 'Create'}</button>
                </div>
            </div>
        )}
        <TableShell headers={['Title', 'Platform', 'Client', 'Status', 'Actions']} empty={items.length === 0} emptyIcon="🎬">
            {items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '16px 20px', color: '#fff', fontWeight: 500, fontSize: 14 }}>{item.title}</td>
                    <td style={{ padding: '16px 20px' }}><span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: item.platform === 'youtube' ? 'rgba(239,68,68,0.1)' : item.platform === 'tiktok' ? 'rgba(139,92,246,0.1)' : 'rgba(6,182,212,0.1)', color: item.platform === 'youtube' ? '#ef4444' : item.platform === 'tiktok' ? '#a78bfa' : '#06b6d4', textTransform: 'uppercase' }}>{item.platform}</span></td>
                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 14 }}>{item.clientName || '—'}</td>
                    <td style={{ padding: '16px 20px' }}><StatusBadge published={item.isPublished} onToggle={async () => { await fetch(`/api/admin/portfolio-videos/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, isPublished: !item.isPublished }) }); load(); }} /></td>
                    <td style={{ padding: '16px 20px' }}><div style={{ display: 'flex', gap: 8 }}><button onClick={() => edit(item.id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(139,92,246,0.3)', background: 'none', color: '#a78bfa', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Edit</button><button onClick={() => remove(item.id, item.title)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>Delete</button></div></td>
                </tr>
            ))}
        </TableShell>
    </div>);
}

/* ─── SOCIAL LINKS TAB ─── */
function SocialLinksTab() {
    const [links, setLinks] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch('/api/admin/social-links').then(r => r.json()).then(setLinks).finally(() => setLoading(false)); }, []);

    const save = async () => {
        setSaving(true); setSaved(false);
        await fetch('/api/admin/social-links', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(links) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const fields = [
        { key: 'social_instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/yourpage' },
        { key: 'social_facebook', label: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/yourpage' },
        { key: 'social_tiktok', label: 'TikTok', icon: '🎵', placeholder: 'https://tiktok.com/@yourpage' },
        { key: 'social_youtube', label: 'YouTube', icon: '▶️', placeholder: 'https://youtube.com/@yourchannel' },
        { key: 'social_linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/company/yourpage' },
        { key: 'social_twitter', label: 'X (Twitter)', icon: '🐦', placeholder: 'https://x.com/yourhandle' },
        { key: 'social_whatsapp', label: 'WhatsApp', icon: '💬', placeholder: '+212XXXXXXXXX' },
        { key: 'social_telegram', label: 'Telegram', icon: '✈️', placeholder: 'https://t.me/yourchannel' },
        { key: 'portfolio_behance_url', label: 'Behance Portfolio', icon: '🎨', placeholder: 'https://behance.net/yourportfolio' },
        { key: 'social_behance', label: 'Behance Profile', icon: '🅱️', placeholder: 'https://behance.net/yourself' },
        { key: 'social_dribbble', label: 'Dribbble', icon: '🏀', placeholder: 'https://dribbble.com/yourprofile' },
        { key: 'portfolio_dribbble_url', label: 'Dribbble Portfolio', icon: '🎯', placeholder: 'https://dribbble.com/yourportfolio' },
        { key: 'social_pinterest', label: 'Pinterest', icon: '📌', placeholder: 'https://pinterest.com/yourprofile' },
        { key: 'portfolio_github_url', label: 'GitHub', icon: '🐙', placeholder: 'https://github.com/yourorg' },
    ];

    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;

    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
                <p style={{ color: '#888', fontSize: 14, margin: 0 }}>Manage all social media & portfolio platform links</p>
                <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>These links are displayed on your website footer, portfolio page, and contact sections.</p>
            </div>
            <button onClick={save} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : saved ? '✓ Saved!' : '💾 Save All Links'}
            </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {fields.map(f => (
                <div key={f.key} style={{ ...cardBox, padding: 20, marginBottom: 0 }}>
                    <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{f.icon}</span> {f.label}
                    </label>
                    <input
                        value={links[f.key] || ''}
                        onChange={e => setLinks({ ...links, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        style={{ ...inputStyle, marginBottom: 0 }}
                    />
                </div>
            ))}
        </div>

        {saved && (
            <div style={{ marginTop: 16, padding: '14px 20px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: 14, textAlign: 'center' }}>
                ✓ All social links saved successfully!
            </div>
        )}
    </div>);
}

/* ─── OVERVIEW TAB ─── */
function OverviewTab({ counts }: { counts: { cases: number; websites: number; designs: number; videos: number } }) {
    return (<div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
            <StatCard icon="📋" label="Case Studies" value={counts.cases} color="#06b6d4" href="#" />
            <StatCard icon="🌐" label="Websites" value={counts.websites} color="#10b981" href="#" />
            <StatCard icon="🎨" label="Social Designs" value={counts.designs} color="#f59e0b" href="#" />
            <StatCard icon="🎬" label="Videos" value={counts.videos} color="#ef4444" href="#" />
        </div>
        <div style={cardBox}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>💡 Portfolio Setup Guide</h3>
            <div style={{ color: '#888', fontSize: 13, lineHeight: 1.8 }}>
                <p style={{ margin: '0 0 8px' }}>Use the tabs above to manage every aspect of your portfolio:</p>
                <p style={{ margin: '0 0 4px' }}>📋 <strong style={{ color: '#ccc' }}>Case Studies</strong> — Detailed project write-ups with results and metrics</p>
                <p style={{ margin: '0 0 4px' }}>🌐 <strong style={{ color: '#ccc' }}>Websites</strong> — Website showcases with auto-scroll preview, stats, and URLs</p>
                <p style={{ margin: '0 0 4px' }}>🎨 <strong style={{ color: '#ccc' }}>Social Designs</strong> — Instagram posts, stories, carousels, and Facebook designs</p>
                <p style={{ margin: '0 0 4px' }}>🎬 <strong style={{ color: '#ccc' }}>Videos</strong> — YouTube, TikTok, Vimeo video showcases</p>
                <p style={{ margin: '0 0 4px' }}>🔗 <strong style={{ color: '#ccc' }}>Social Links</strong> — All social media URLs, Behance, Dribbble, etc.</p>
            </div>
        </div>
    </div>);
}

/* ─── MAIN PAGE ─── */
export default function AdminPortfolioHub() {
    const [activeTab, setActiveTab] = useState('overview');
    const [counts, setCounts] = useState({ cases: 0, websites: 0, designs: 0, videos: 0 });

    useEffect(() => {
        Promise.all([
            fetch('/api/admin/portfolio').then(r => r.json()).then(d => d.length || 0).catch(() => 0),
            fetch('/api/admin/portfolio-websites').then(r => r.json()).then(d => d.length || 0).catch(() => 0),
            fetch('/api/admin/portfolio-social-designs').then(r => r.json()).then(d => d.length || 0).catch(() => 0),
            fetch('/api/admin/portfolio-videos').then(r => r.json()).then(d => d.length || 0).catch(() => 0),
        ]).then(([cases, websites, designs, videos]) => setCounts({ cases, websites, designs, videos }));
    }, []);

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Portfolio Management</h1>
                <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Full control over websites, designs, videos, and social presence.</p>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32, flexWrap: 'wrap', padding: 6, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                            fontSize: 13, fontWeight: activeTab === tab.key ? 600 : 400, transition: 'all 0.2s',
                            background: activeTab === tab.key ? `linear-gradient(135deg, ${tab.color}22, ${tab.color}11)` : 'transparent',
                            color: activeTab === tab.key ? tab.color : '#888',
                            borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && <OverviewTab counts={counts} />}
            {activeTab === 'case-studies' && <CaseStudiesTab />}
            {activeTab === 'websites' && <WebsitesTab />}
            {activeTab === 'social-designs' && <SocialDesignsTab />}
            {activeTab === 'videos' && <VideosTab />}
            {activeTab === 'social-links' && <SocialLinksTab />}
        </div>
    );
}
