'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    once?: boolean;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    staggerDelay?: number;
}

export default function TextReveal({
    children,
    className = '',
    delay = 0,
    once = true,
    as: Component = 'span',
    staggerDelay = 0.03,
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.5 });

    const words = children.split(' ');

    return (
        <Component ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={isInView ? { y: '0%', opacity: 1 } : {}}
                        transition={{
                            duration: 0.6,
                            delay: delay + i * staggerDelay,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 && '\u00A0'}
                </span>
            ))}
        </Component>
    );
}
