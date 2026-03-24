'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGlow() {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rafId = useRef<number>(0);
    const pendingX = useRef(0);
    const pendingY = useRef(0);
    const ticking = useRef(false);

    // Primary glow - slow, fluid tracking
    const springX1 = useSpring(mouseX, { stiffness: 30, damping: 25, mass: 1.5 });
    const springY1 = useSpring(mouseY, { stiffness: 30, damping: 25, mass: 1.5 });

    // Secondary glow - faster follow (removed layer 3 & 4 — merged into layer 2)
    const springX2 = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 0.6 });
    const springY2 = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 0.6 });

    useEffect(() => {
        setMounted(true);

        // Throttle mousemove with rAF for max performance
        const handleMouseMove = (e: MouseEvent) => {
            pendingX.current = e.clientX;
            pendingY.current = e.clientY;

            if (!ticking.current) {
                ticking.current = true;
                rafId.current = requestAnimationFrame(() => {
                    mouseX.set(pendingX.current);
                    mouseY.set(pendingY.current);
                    ticking.current = false;
                });
            }
        };

        // Single event listener for card hover effects (throttled)
        const handleCardMouse = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const card = target.closest('.glass-card, .service-card-hover, .stat-card, .methodology-card') as HTMLElement;
            if (card) {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousemove', handleCardMouse, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousemove', handleCardMouse);
            cancelAnimationFrame(rafId.current);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <>
            {/* Layer 1: Large diffuse purple glow */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-[1]"
                style={{ opacity: 0.9, willChange: 'transform' }}
            >
                <motion.div
                    style={{
                        x: springX1,
                        y: springY1,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    className="absolute w-[800px] h-[800px] rounded-full gpu-accelerated"
                >
                    <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,rgba(139,92,246,0.04)_30%,transparent_65%)]" />
                </motion.div>
            </motion.div>

            {/* Layer 2: Combined medium + tight glow (merged 3 layers into 1) */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-[1]"
                style={{ opacity: 0.9, willChange: 'transform' }}
            >
                <motion.div
                    style={{
                        x: springX2,
                        y: springY2,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                    className="absolute w-[350px] h-[350px] rounded-full gpu-accelerated"
                >
                    <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(6,182,212,0.08)_30%,rgba(59,130,246,0.03)_50%,transparent_70%)] mix-blend-screen" />
                </motion.div>
            </motion.div>
        </>
    );
}
