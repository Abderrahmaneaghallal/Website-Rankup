'use client';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, ReactNode } from 'react';

const nav = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/pages', label: 'Pages', icon: '📄' },
    { href: '/admin/blog', label: 'Blog Posts', icon: '✍️' },
    { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
    { href: '/admin/portfolio', label: 'Portfolio', icon: '🗂️' },
    { href: '/admin/contacts', label: 'Contact Forms', icon: '📬' },
    { href: '/admin/media', label: 'Media', icon: '🖼️' },
    { href: '/admin/section-images', label: 'Section Images', icon: '🎨' },
    { href: '/admin/seo', label: 'SEO', icon: '🔍' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

function AdminShell({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/admin/login');
    }, [status, router]);

    if (status === 'loading') return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: '#fff' }}>Loading...</div>;
    if (!session) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a1a', fontFamily: "'Inter', sans-serif" }}>
            {/* Sidebar */}
            <aside style={{ width: 260, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 0', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 }}>
                <div style={{ padding: '0 24px', marginBottom: 32 }}>
                    <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>R</div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>RankUp</div>
                            <div style={{ color: '#666', fontSize: 11, letterSpacing: 1 }}>ADMIN PANEL</div>
                        </div>
                    </Link>
                </div>
                <nav style={{ flex: 1, padding: '0 12px' }}>
                    {nav.map(item => {
                        const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, marginBottom: 4, textDecoration: 'none', color: active ? '#fff' : '#888', background: active ? 'rgba(139,92,246,0.15)' : 'transparent', fontSize: 14, fontWeight: active ? 600 : 400, transition: 'all 0.2s' }}>
                                <span style={{ fontSize: 18 }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>{session.user?.name}</div>
                    <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 16px', color: '#888', fontSize: 12, cursor: 'pointer', width: '100%' }}>Sign Out</button>
                </div>
            </aside>
            {/* Main */}
            <main style={{ flex: 1, marginLeft: 260, padding: '32px 40px', minHeight: '100vh' }}>
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    if (pathname === '/admin/login') return <SessionProvider>{children}</SessionProvider>;
    return <SessionProvider><AdminShell>{children}</AdminShell></SessionProvider>;
}
