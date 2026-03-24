'use client';

import { useEffect, useRef, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';

// Context so other components can access the Lenis instance
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
            smoothWheel: true,
        });

        lenisRef.current = lenisInstance;
        setLenis(lenisInstance);

        let rafHandle: number;
        function raf(time: number) {
            lenisInstance.raf(time);
            rafHandle = requestAnimationFrame(raf);
        }

        rafHandle = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafHandle);
            lenisInstance.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {/* Scroll progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, #8B5CF6, #06B6D4, #EC4899)',
                    willChange: 'transform',
                }}
            />

            {children}
        </LenisContext.Provider>
    );
}
