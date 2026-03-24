'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPages() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/pages')
            .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
            .then(d => { setPages(d); setLoading(false); })
            .catch(() => { setError('Failed to load pages.'); setLoading(false); });
    }, []);

    const togglePublish = async (id: string, current: boolean) => {
        try {
            const res = await fetch(`/api/admin/pages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished: !current }) });
            if (!res.ok) throw new Error();
            setPages(pages.map(p => p.id === id ? { ...p, isPublished: !current } : p));
        } catch { setError('Failed to update page status.'); }
    };

    const deletePage = async (id: string) => {
        if (!confirm('Delete this page?')) return;
        try {
            const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
            if (res.ok) setPages(pages.filter(p => p.id !== id));
            else { const d = await res.json(); setError(d.error || 'Failed to delete page.'); }
        } catch { setError('Network error. Please try again.'); }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Pages</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Manage your website pages</p>
                </div>
                <Link href="/admin/pages/new" style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>+ New Page</Link>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>
                    {error}
                </div>
            )}

            {loading ? <p style={{ color: '#888' }}>Loading...</p> : (
                <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                {['Page', 'Slug', 'Status', 'Sections', 'Actions'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '14px 20px', color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map(page => (
                                <tr key={page.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>{page.titleEn || page.titleFr}</div>
                                        <div style={{ color: '#666', fontSize: 12, marginTop: 2 }}>{page.isSystem ? '🔒 System' : '📄 Custom'}</div>
                                    </td>
                                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 13 }}>/{page.slug}</td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <button onClick={() => togglePublish(page.id, page.isPublished)} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer', background: page.isPublished ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)', color: page.isPublished ? '#10b981' : '#666' }}>
                                            {page.isPublished ? '● Published' : '○ Draft'}
                                        </button>
                                    </td>
                                    <td style={{ padding: '16px 20px', color: '#888', fontSize: 13 }}>{page._count?.sections ?? 0}</td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <a href={page.slug === 'home' ? '/fr' : page.isSystem ? `/fr/${page.slug}` : `/fr/p/${page.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(6,182,212,0.1)', color: '#06b6d4', textDecoration: 'none', fontSize: 12, border: '1px solid rgba(6,182,212,0.2)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>View ↗</a>
                                            <Link href={`/admin/pages/${page.id}`} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', textDecoration: 'none', fontSize: 12, border: '1px solid rgba(139,92,246,0.2)' }}>Edit</Link>
                                            {!page.isSystem && <button onClick={() => deletePage(page.id)} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 12, border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}>Delete</button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
