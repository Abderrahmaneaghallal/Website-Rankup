'use client';
import { useEffect, useState, useRef } from 'react';

export default function AdminMedia() {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => { fetch('/api/admin/media').then(r => r.json()).then(d => { setMedia(d); setLoading(false); }); }, []);

    const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        setUploading(true);
        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('altText', file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
            const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
            if (res.ok) { const m = await res.json(); setMedia(prev => [m, ...prev]); }
        }
        setUploading(false);
        if (fileRef.current) fileRef.current.value = '';
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>Media Library</h1>
                    <p style={{ color: '#666', fontSize: 14, marginTop: 8 }}>{media.length} files uploaded</p>
                </div>
                <label style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: uploading ? 'wait' : 'pointer', opacity: uploading ? 0.7 : 1 }}>
                    {uploading ? 'Uploading...' : '📤 Upload Files'}
                    <input ref={fileRef} type="file" multiple accept="image/*,video/*,.pdf" onChange={upload} style={{ display: 'none' }} />
                </label>
            </div>

            {loading ? <p style={{ color: '#888' }}>Loading...</p> : media.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, borderRadius: 16, border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🖼️</div>
                    <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>No media yet</h3>
                    <p style={{ color: '#666', fontSize: 14 }}>Upload images, videos, or documents to your media library.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                    {media.map(m => (
                        <div key={m.id} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                            {m.mimeType?.startsWith('image/') ? (
                                <img src={m.url} alt={m.altText} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, background: 'rgba(255,255,255,0.03)' }}>📄</div>
                            )}
                            <div style={{ padding: 12 }}>
                                <div style={{ color: '#ccc', fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.filename}</div>
                                <div style={{ color: '#666', fontSize: 11, marginTop: 4 }}>{(m.size / 1024).toFixed(1)} KB</div>
                                <button onClick={() => copyUrl(m.url)} style={{ marginTop: 8, padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: '#8b5cf6', fontSize: 11, cursor: 'pointer' }}>📋 Copy URL</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
