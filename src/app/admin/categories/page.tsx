'use client';
import { useEffect, useState } from 'react';

const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const };

export default function AdminCategories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ slug: '', nameFr: '', nameEn: '', nameAr: '' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
            .then(d => { setCategories(d); setLoading(false); })
            .catch(() => { setError('Failed to load categories.'); setLoading(false); });
    }, []);

    const create = async () => {
        if (!form.slug || !form.nameFr) return;
        setError('');
        setSaving(true);
        try {
            const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            if (res.ok) { const cat = await res.json(); setCategories([...categories, cat]); setForm({ slug: '', nameFr: '', nameEn: '', nameAr: '' }); setShowForm(false); }
            else { const body = await res.json(); setError(body.error || 'Failed to create category.'); }
        } catch { setError('Network error. Please try again.'); }
        finally { setSaving(false); }
    };

    return (
        <div style={{ maxWidth: 700 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Categories</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Blog post categories</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New Category</button>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>
                    {error}
                </div>
            )}

            {showForm && (
                <div style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)', marginBottom: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                        <div><label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 6 }}>SLUG</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="category-slug" style={inputStyle} /></div>
                        <div><label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 6 }}>🇫🇷 NOM</label><input value={form.nameFr} onChange={e => setForm({ ...form, nameFr: e.target.value })} placeholder="Nom en français" style={inputStyle} /></div>
                        <div><label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 6 }}>🇬🇧 NAME</label><input value={form.nameEn} onChange={e => setForm({ ...form, nameEn: e.target.value })} placeholder="Name in English" style={inputStyle} /></div>
                        <div><label style={{ display: 'block', fontSize: 11, color: '#888', marginBottom: 6 }}>🇲🇦 الاسم</label><input value={form.nameAr} onChange={e => setForm({ ...form, nameAr: e.target.value })} placeholder="الاسم بالعربية" style={inputStyle} /></div>
                    </div>
                    <button onClick={create} disabled={saving} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#8b5cf6', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{saving ? 'Creating...' : 'Create'}</button>
                </div>
            )}

            {loading ? <p style={{ color: '#888' }}>Loading...</p> : (
                <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    {categories.map((cat, i) => (
                        <div key={cat.id} style={{ padding: '16px 20px', borderBottom: i < categories.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>{cat.nameFr}</span>
                                <span style={{ color: '#666', fontSize: 12, marginLeft: 12 }}>/{cat.slug}</span>
                                {cat.nameEn && <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>• {cat.nameEn}</span>}
                            </div>
                            <span style={{ color: '#666', fontSize: 12 }}>{cat._count?.posts || 0} posts</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
