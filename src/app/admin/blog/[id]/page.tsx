'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 8 };

export default function EditPost() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const isNew = params.id === 'new';
    const [categories, setCategories] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [tab, setTab] = useState<'fr' | 'en' | 'ar'>('fr');
    const [post, setPost] = useState<any>({
        slug: '', titleFr: '', titleEn: '', titleAr: '', excerptFr: '', excerptEn: '', excerptAr: '',
        contentFr: '', contentEn: '', contentAr: '', tags: '', status: 'DRAFT', readTime: 5,
        categoryId: '', metaTitleFr: '', metaTitleEn: '', metaTitleAr: '', metaDescFr: '', metaDescEn: '', metaDescAr: '',
        featuredImage: '', imageAlt: '',
    });

    useEffect(() => {
        fetch('/api/admin/categories').then(r => r.json()).then(setCategories);
        if (!isNew) fetch(`/api/admin/posts/${params.id}`).then(r => r.json()).then(setPost);
    }, [isNew, params.id]);

    const save = async (status?: string) => {
        setError('');
        setSaving(true);
        try {
            const data = { ...post, authorId: (session?.user as any)?.id, ...(status ? { status } : {}) };
            const url = isNew ? '/api/admin/posts' : `/api/admin/posts/${params.id}`;
            const method = isNew ? 'POST' : 'PUT';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
            if (res.ok) {
                router.push('/admin/blog');
            } else {
                const body = await res.json();
                setError(body.error || 'Failed to save. Please try again.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const t = tab.charAt(0).toUpperCase() + tab.slice(1);

    return (
        <div style={{ maxWidth: 900 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>{isNew ? 'New Post' : 'Edit Post'}</h1>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => router.push('/admin/blog')} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#888', cursor: 'pointer', fontSize: 13 }}>Cancel</button>
                    <button onClick={() => save('DRAFT')} disabled={saving} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#ccc', cursor: 'pointer', fontSize: 13 }}>Save Draft</button>
                    <button onClick={() => save('PUBLISHED')} disabled={saving} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Publish'}</button>
                </div>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>
                    {error}
                </div>
            )}

            {/* Language Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {(['fr', 'en', 'ar'] as const).map(l => (
                    <button key={l} onClick={() => setTab(l)} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid', borderColor: tab === l ? '#8b5cf6' : 'rgba(255,255,255,0.08)', background: tab === l ? 'rgba(139,92,246,0.15)' : 'transparent', color: tab === l ? '#8b5cf6' : '#888', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                        {l === 'fr' ? '🇫🇷 Français' : l === 'en' ? '🇬🇧 English' : '🇲🇦 العربية'}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
                {/* Main Content */}
                <div>
                    <div style={{ padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 24 }}>
                        <label style={labelStyle}>Title ({tab.toUpperCase()})</label>
                        <input value={post[`title${t}`] || ''} onChange={e => setPost({ ...post, [`title${t}`]: e.target.value })} placeholder="Post title" style={{ ...inputStyle, fontSize: 18, fontWeight: 600 }} />

                        <label style={labelStyle}>Excerpt ({tab.toUpperCase()})</label>
                        <textarea value={post[`excerpt${t}`] || ''} onChange={e => setPost({ ...post, [`excerpt${t}`]: e.target.value })} placeholder="Short summary..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />

                        <label style={labelStyle}>Content ({tab.toUpperCase()})</label>
                        <textarea value={post[`content${t}`] || ''} onChange={e => setPost({ ...post, [`content${t}`]: e.target.value })} placeholder="Write your article content here... (Supports HTML)" rows={16} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} />
                    </div>

                    {/* SEO */}
                    <div style={{ padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 20 }}>🔍 SEO Settings</h3>
                        <label style={labelStyle}>Meta Title ({tab.toUpperCase()})</label>
                        <input value={post[`metaTitle${t}`] || ''} onChange={e => setPost({ ...post, [`metaTitle${t}`]: e.target.value })} placeholder="SEO title" style={inputStyle} />
                        <label style={labelStyle}>Meta Description ({tab.toUpperCase()})</label>
                        <textarea value={post[`metaDesc${t}`] || ''} onChange={e => setPost({ ...post, [`metaDesc${t}`]: e.target.value })} placeholder="SEO description" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <div style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 20 }}>
                        <label style={labelStyle}>URL Slug</label>
                        <input value={post.slug} onChange={e => setPost({ ...post, slug: e.target.value })} placeholder="post-url-slug" style={inputStyle} />

                        <label style={labelStyle}>Category</label>
                        <select value={post.categoryId || ''} onChange={e => setPost({ ...post, categoryId: e.target.value || null })} style={{ ...inputStyle, appearance: 'none' }}>
                            <option value="">No category</option>
                            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.nameFr}</option>)}
                        </select>

                        <label style={labelStyle}>Tags (comma-separated)</label>
                        <input value={post.tags} onChange={e => setPost({ ...post, tags: e.target.value })} placeholder="seo, marketing, digital" style={inputStyle} />

                        <label style={labelStyle}>Read Time (min)</label>
                        <input type="number" value={post.readTime} onChange={e => setPost({ ...post, readTime: parseInt(e.target.value) || 5 })} style={inputStyle} />
                    </div>

                    <div style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', marginBottom: 20 }}>
                        <label style={labelStyle}>Featured Image URL</label>
                        <input value={post.featuredImage || ''} onChange={e => setPost({ ...post, featuredImage: e.target.value })} placeholder="/uploads/image.jpg" style={inputStyle} />
                        <label style={labelStyle}>Image Alt Text</label>
                        <input value={post.imageAlt || ''} onChange={e => setPost({ ...post, imageAlt: e.target.value })} placeholder="Describe the image" style={inputStyle} />
                        {post.featuredImage && <img src={post.featuredImage} alt={post.imageAlt} style={{ width: '100%', borderRadius: 8, marginTop: 8 }} />}
                    </div>

                    <div style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                        <label style={labelStyle}>Status</label>
                        <select value={post.status} onChange={e => setPost({ ...post, status: e.target.value })} style={{ ...inputStyle, appearance: 'none' }}>
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
