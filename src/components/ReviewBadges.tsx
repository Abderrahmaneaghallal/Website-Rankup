'use client';

import ScrollReveal from './ScrollReveal';
import Tilt3D from './Tilt3D';

const reviews = [
    {
        name: 'Google',
        rating: 4.9,
        stars: 5,
        icon: (
            <svg viewBox="0 0 24 24" className="w-10 h-10">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
        ),
        bg: 'from-blue-500/10 to-blue-600/5',
        borderColor: 'border-blue-500/20',
        link: '#',
    },
    {
        name: 'Provenexpert',
        rating: 4.5,
        stars: 5,
        icon: (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
            </div>
        ),
        bg: 'from-amber-500/10 to-amber-600/5',
        borderColor: 'border-amber-500/20',
        link: '#',
    },
    {
        name: 'Clutch',
        rating: 4.6,
        stars: 5,
        icon: (
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" fill="#EF4444" />
                    <circle cx="12" cy="12" r="4" fill="white" />
                </svg>
            </div>
        ),
        bg: 'from-red-500/10 to-red-600/5',
        borderColor: 'border-red-500/20',
        link: '#',
    },
    {
        name: 'Sortlist',
        rating: 4.8,
        stars: 5,
        icon: (
            <div className="flex items-center justify-center">
                <span className="text-3xl font-heading font-black tracking-tighter text-white/90" style={{ fontStyle: 'italic' }}>
                    sl
                </span>
            </div>
        ),
        bg: 'from-gray-500/10 to-gray-600/5',
        borderColor: 'border-gray-500/20',
        link: '#',
    },
];

function StarRating({ count, filled }: { count: number; filled: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < filled ? 'text-amber-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function ReviewBadges() {
    return (
        <div className="mt-12">
            <ScrollReveal blur={true} direction="up">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                    {reviews.map((review, i) => (
                        <ScrollReveal key={review.name} delay={i * 0.1} blur={true} scale={true}>
                            <Tilt3D intensity={10} glare={true} scale={1.05}>
                                <a
                                    href={review.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`glass-card p-5 lg:p-6 flex flex-col items-center text-center gap-3 group border ${review.borderColor} hover:border-accent-purple/30 transition-all duration-500`}
                                >
                                    <div style={{ transform: 'translateZ(20px)' }}>
                                        {review.icon}
                                    </div>
                                    <div style={{ transform: 'translateZ(10px)' }}>
                                        <div className="text-white font-heading font-semibold text-sm mb-1">{review.name}</div>
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <span className="text-white font-bold text-lg">{review.rating}</span>
                                        </div>
                                        <StarRating count={review.stars} filled={Math.round(review.rating)} />
                                    </div>
                                </a>
                            </Tilt3D>
                        </ScrollReveal>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    );
}
