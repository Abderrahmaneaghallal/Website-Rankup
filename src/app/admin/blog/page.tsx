'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminBlog() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/posts')
            .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
            .then(d => { setPosts(d); setLoading(false); })
            .catch(() => { setError('Failed to load posts.'); setLoading(false); });
    }, []);

    const deletePost = async (id: string) => {
        if (!confirm('Delete this post?')) return;
        try {
            const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            setPosts(posts.filter(p => p.id !== id));
        } catch { setError('Failed to delete post. Please try again.'); }
    };

    const toggleStatus = async (id: string, current: string) => {
        const status = current === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        try {
            const res = await fetch(`/api/admin/posts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, publishedAt: status === 'PUBLISHED' ? new Date().toISOString() : null }) });
            if (!res.ok) throw new Error();
            setPosts(posts.map(p => p.id === id ? { ...p, status } : p));
        } catch { setError('Failed to update status. Please try again.'); }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Blog Posts</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>{posts.length} posts total</p>
                </div>
                <Link href="/admin/blog/new" style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>+ New Post</Link>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>
                    {error}
                </div>
            )}

            {loading ? <p style={{ color: '#888' }}>Loading...</p> : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
                    <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>No posts yet</h3>
                    <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Create your first blog post to get started.</p>
                    <Link href="/admin/blog/new" style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', textDecoration: 'none', fontSize: 14 }}>Create Post</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                    {posts.map(post => (
                        <div key={post.id} style={{ padding: 20, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                    <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{post.titleFr || post.titleEn}</span>
                                    <button onClick={() => toggleStatus(post.id, post.status)} style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, border: 'none', cursor: 'pointer', background: post.status === 'PUBLISHED' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: post.status === 'PUBLISHED' ? '#10b981' : '#f59e0b' }}>
                                        {post.status}
                                    </button>
                                </div>
                                <div style={{ color: '#666', fontSize: 12 }}>
                                    /{post.slug} • {post.category?.nameFr || 'No category'} • {post.readTime} min read • by {post.author?.name}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Link href={`/admin/blog/${post.id}`} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', textDecoration: 'none', fontSize: 12, border: '1px solid rgba(139,92,246,0.2)' }}>Edit</Link>
                                <button onClick={() => deletePost(post.id)} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 12, border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
