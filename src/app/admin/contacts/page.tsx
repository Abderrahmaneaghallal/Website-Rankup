'use client';
import { useEffect, useState } from 'react';

interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function AdminContacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [error, setError] = useState('');

    const load = () => {
        fetch('/api/admin/contacts')
            .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
            .then(data => { setContacts(data); setLoading(false); })
            .catch(() => { setError('Failed to load submissions.'); setLoading(false); });
    };

    useEffect(() => { load(); }, []);

    const markRead = async (id: string, isRead: boolean) => {
        try {
            const res = await fetch('/api/admin/contacts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isRead }),
            });
            if (!res.ok) throw new Error();
            setContacts(prev => prev.map(c => c.id === id ? { ...c, isRead } : c));
        } catch { setError('Failed to update. Please try again.'); }
    };

    const remove = async (id: string) => {
        if (!confirm('Delete this submission?')) return;
        try {
            const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            setContacts(prev => prev.filter(c => c.id !== id));
        } catch { setError('Failed to delete. Please try again.'); }
    };

    const unread = contacts.filter(c => !c.isRead).length;

    if (loading) return <p style={{ color: '#888' }}>Loading...</p>;

    return (
        <div style={{ maxWidth: 900 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>
                        Contact Forms
                        {unread > 0 && (
                            <span style={{ marginLeft: 12, fontSize: 14, padding: '2px 10px', borderRadius: 20, background: '#14b8a6', color: '#fff', fontWeight: 600 }}>
                                {unread} new
                            </span>
                        )}
                    </h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>{contacts.length} total submissions</p>
                </div>
            </div>

            {error && (
                <div style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 14, marginBottom: 24 }}>
                    {error}
                </div>
            )}

            {contacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
                    <p>No contact submissions yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${contact.isRead ? 'rgba(255,255,255,0.06)' : 'rgba(20,184,166,0.3)'}`,
                                background: contact.isRead ? 'rgba(255,255,255,0.02)' : 'rgba(20,184,166,0.04)',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Header row */}
                            <div
                                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', cursor: 'pointer' }}
                                onClick={() => {
                                    setExpanded(expanded === contact.id ? null : contact.id);
                                    if (!contact.isRead) markRead(contact.id, true);
                                }}
                            >
                                {!contact.isRead && (
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#14b8a6', flexShrink: 0 }} />
                                )}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{contact.name}</span>
                                        <span style={{ color: '#888', fontSize: 13 }}>{contact.email}</span>
                                        {contact.phone && <span style={{ color: '#666', fontSize: 12 }}>{contact.phone}</span>}
                                        {contact.service && (
                                            <span style={{ padding: '2px 8px', borderRadius: 6, background: 'rgba(139,92,246,0.15)', color: '#a78bfa', fontSize: 11, fontWeight: 600 }}>
                                                {contact.service}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                                        {new Date(contact.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                    {contact.isRead ? (
                                        <button
                                            onClick={e => { e.stopPropagation(); markRead(contact.id, false); }}
                                            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#888', fontSize: 12, cursor: 'pointer' }}
                                        >
                                            Mark unread
                                        </button>
                                    ) : (
                                        <button
                                            onClick={e => { e.stopPropagation(); markRead(contact.id, true); }}
                                            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(20,184,166,0.3)', background: 'rgba(20,184,166,0.1)', color: '#14b8a6', fontSize: 12, cursor: 'pointer' }}
                                        >
                                            Mark read
                                        </button>
                                    )}
                                    <button
                                        onClick={e => { e.stopPropagation(); remove(contact.id); }}
                                        style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Expanded message */}
                            {expanded === contact.id && (
                                <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.7, margin: '16px 0 0', whiteSpace: 'pre-wrap' }}>{contact.message}</p>
                                    <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                                        <a
                                            href={`mailto:${contact.email}?subject=Re: ${contact.service || 'Votre demande'}`}
                                            style={{ padding: '8px 16px', borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}
                                        >
                                            Reply by Email
                                        </a>
                                        {contact.phone && (
                                            <a
                                                href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ padding: '8px 16px', borderRadius: 8, background: '#25d366', color: '#fff', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}
                                            >
                                                WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
