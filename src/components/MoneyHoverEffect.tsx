'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoneyParticle {
    id: number;
    x: number;
    y: number;
    emoji: string;
    rotation: number;
    scale: number;
    delay: number;
}

const moneyEmojis = ['💰', '💵', '💎', '🤑', '📈', '💲'];

export default function MoneyHoverEffect({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<MoneyParticle[]>([]);
    const idCounter = useRef(0);

    const spawnParticles = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newParticles: MoneyParticle[] = Array.from({ length: 8 }, (_, i) => ({
            id: idCounter.current++,
            x: (e.clientX - rect.left) + (Math.random() - 0.5) * 60,
            y: (e.clientY - rect.top),
            emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
            rotation: (Math.random() - 0.5) * 90,
            scale: 0.6 + Math.random() * 0.6,
            delay: i * 0.04,
        }));
        setParticles(prev => [...prev, ...newParticles]);

        // Clean up after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.includes(p)));
        }, 1500);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseEnter={spawnParticles}
            style={{ display: 'inline-block' }}
        >
            {children}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.span
                        key={particle.id}
                        initial={{
                            opacity: 1,
                            x: particle.x,
                            y: particle.y,
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{
                            opacity: 0,
                            x: particle.x + (Math.random() - 0.5) * 120,
                            y: particle.y - 60 - Math.random() * 80,
                            scale: particle.scale,
                            rotate: particle.rotation,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.9 + Math.random() * 0.4,
                            delay: particle.delay,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute pointer-events-none z-50 text-lg select-none"
                        style={{ left: 0, top: 0 }}
                    >
                        {particle.emoji}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
}
