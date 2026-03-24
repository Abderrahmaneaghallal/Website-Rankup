'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
    pages: number;
    posts: number;
    publishedPosts: number;
    media: number;
    portfolio: number;
    contacts: number;
    unreadContacts: number;
    siteName: string;
}

const cardStyle = () => ({
    padding: '28px 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.02)', flex: '1 1 180px', minWidth: 180,
    position: 'relative' as const, overflow: 'hidden' as const,
});

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(r => r.json())
            .then(setStats)
            .catch(console.error);
    }, []);

    const cards = [
        { label: 'Pages', value: stats?.pages ?? '—', icon: '📄', color: '#8b5cf6', href: '/admin/pages' },
        { label: 'Blog Posts', value: stats?.posts ?? '—', icon: '✍️', color: '#06b6d4', href: '/admin/blog' },
        { label: 'Published', value: stats?.publishedPosts ?? '—', icon: '🟢', color: '#10b981', href: '/admin/blog' },
        { label: 'Portfolio', value: stats?.portfolio ?? '—', icon: '🗂️', color: '#f59e0b', href: '/admin/portfolio' },
        { label: 'Media', value: stats?.media ?? '—', icon: '🖼️', color: '#ec4899', href: '/admin/media' },
        {
            label: 'Contact Forms',
            value: stats ? `${stats.contacts}${stats.unreadContacts > 0 ? ` (${stats.unreadContacts} new)` : ''}` : '—',
            icon: '📬', color: '#14b8a6', href: '/admin/contacts',
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Dashboard</h1>
                <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Welcome back! Here&apos;s your website overview.</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
                {cards.map(card => (
                    <div key={card.label} style={cardStyle()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ color: '#888', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{card.label}</div>
                                <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{card.value}</div>
                            </div>
                            <span style={{ fontSize: 28 }}>{card.icon}</span>
                        </div>
                        <Link href={card.href} style={{ display: 'inline-block', marginTop: 14, color: card.color, fontSize: 12, textDecoration: 'none' }}>Manage →</Link>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                        { label: '+ New Blog Post', href: '/admin/blog/new', bg: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' },
                        { label: '+ New Page', href: '/admin/pages/new', bg: 'linear-gradient(135deg, #06b6d4, #10b981)' },
                        { label: '+ New Portfolio', href: '/admin/portfolio/new', bg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
                        { label: '📤 Upload Media', href: '/admin/media', bg: 'rgba(255,255,255,0.05)' },
                        { label: '⚙️ Site Settings', href: '/admin/settings', bg: 'rgba(255,255,255,0.05)' },
                    ].map(action => (
                        <Link key={action.label} href={action.href} style={{ padding: '12px 24px', borderRadius: 12, background: action.bg, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 500, border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s' }}>
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(139,92,246,0.05)' }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>Getting Started</h3>
                <p style={{ color: '#888', fontSize: 13, margin: 0 }}>Use the Quick Actions above to create content, manage media, or configure site settings. All content changes are reflected on the website immediately.</p>
            </div>
        </div>
    );
}
