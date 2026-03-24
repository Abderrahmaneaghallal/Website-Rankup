'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface BoomParticle {
    id: number;
    x: number;
    y: number;
    emoji: string;
    angle: number;
    distance: number;
    scale: number;
    delay: number;
}

const moneyEmojis = ['💰', '💵', '💎', '🤑', '📈', '💲', '🪙', '💸', '💴', '💶'];

export default function MoneyBoomEffect({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [particles, setParticles] = useState<BoomParticle[]>([]);
    const hasTriggered = useRef(false);

    useEffect(() => {
        if (isInView && !hasTriggered.current) {
            hasTriggered.current = true;
            // Delay slightly to sync with counter animation
            setTimeout(() => {
                const newParticles: BoomParticle[] = Array.from({ length: 24 }, (_, i) => {
                    const angle = (i / 24) * 360 + (Math.random() - 0.5) * 30;
                    return {
                        id: i,
                        x: 50,
                        y: 50,
                        emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
                        angle,
                        distance: 80 + Math.random() * 180,
                        scale: 0.5 + Math.random() * 0.8,
                        delay: Math.random() * 0.3,
                    };
                });
                setParticles(newParticles);

                // Clean up after animation
                setTimeout(() => {
                    setParticles([]);
                }, 3000);
            }, 600);
        }
    }, [isInView]);

    return (
        <div ref={ref} className="relative">
            {children}
            <AnimatePresence>
                {particles.map(particle => {
                    const radians = (particle.angle * Math.PI) / 180;
                    const targetX = Math.cos(radians) * particle.distance;
                    const targetY = Math.sin(radians) * particle.distance;

                    return (
                        <motion.span
                            key={particle.id}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '50%',
                                y: '50%',
                            }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0, particle.scale * 1.5, particle.scale, 0],
                                x: `calc(50% + ${targetX}px)`,
                                y: `calc(50% + ${targetY}px)`,
                            }}
                            transition={{
                                duration: 1.8,
                                delay: particle.delay,
                                ease: [0.16, 1, 0.3, 1],
                                opacity: {
                                    times: [0, 0.1, 0.7, 1],
                                    duration: 1.8,
                                },
                                scale: {
                                    times: [0, 0.2, 0.5, 1],
                                    duration: 1.8,
                                },
                            }}
                            className="absolute pointer-events-none z-40 text-xl select-none"
                            style={{ left: 0, top: 0 }}
                        >
                            {particle.emoji}
                        </motion.span>
                    );
                })}
            </AnimatePresence>

            {/* Flash effect */}
            {isInView && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 2] }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 pointer-events-none z-30 rounded-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.15), transparent 70%)',
                    }}
                />
            )}
        </div>
    );
}
