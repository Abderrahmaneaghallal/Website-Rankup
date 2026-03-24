'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    once?: boolean;
    distance?: number;
    duration?: number;
    blur?: boolean;
    scale?: boolean;
    parallax?: boolean;
    parallaxOffset?: number;
    rotate?: boolean;
    stagger?: boolean;
    perspective?: boolean;
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    once = true,
    distance = 60,
    duration = 0.7,
    blur = false,
    scale = false,
    parallax = false,
    parallaxOffset = 50,
    rotate = false,
    perspective = false,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.1, margin: '0px 0px -60px 0px' });

    const directionMap = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { y: 0, x: distance },
        right: { y: 0, x: -distance },
    };

    const initialState: any = {
        opacity: 0,
        y: directionMap[direction].y,
        x: directionMap[direction].x,
    };

    if (blur) initialState.filter = 'blur(8px)';
    if (scale) initialState.scale = 0.92;
    if (rotate) {
        initialState.rotateX = direction === 'up' ? 6 : direction === 'down' ? -6 : 0;
        initialState.rotateY = direction === 'left' ? -6 : direction === 'right' ? 6 : 0;
    }
    if (perspective) {
        initialState.rotateX = 10;
        initialState.scale = 0.88;
        initialState.y = distance * 1.3;
    }

    const animateState: any = {
        opacity: 1,
        y: 0,
        x: 0,
    };

    if (blur) animateState.filter = 'blur(0px)';
    if (scale) animateState.scale = 1;
    if (rotate) {
        animateState.rotateX = 0;
        animateState.rotateY = 0;
    }
    if (perspective) {
        animateState.rotateX = 0;
        animateState.scale = 1;
    }

    const transition = {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
    };

    // Only use parallax scroll tracking when actually needed
    if (parallax) {
        return <ParallaxScrollReveal
            ref={ref}
            isInView={isInView}
            initialState={initialState}
            animateState={animateState}
            transition={transition}
            parallaxOffset={parallaxOffset}
            perspective={perspective}
            className={className}
        >
            {children}
        </ParallaxScrollReveal>;
    }

    return (
        <motion.div
            ref={ref}
            initial={initialState}
            animate={isInView ? animateState : {}}
            transition={transition}
            style={perspective ? { perspective: 1200, transformStyle: 'preserve-3d' as const } : { willChange: 'transform, opacity' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Separate component to isolate useScroll hook — only mounted when parallax=true
import { forwardRef } from 'react';

const ParallaxScrollReveal = forwardRef<HTMLDivElement, {
    isInView: boolean;
    initialState: any;
    animateState: any;
    transition: any;
    parallaxOffset: number;
    perspective: boolean;
    className: string;
    children: React.ReactNode;
}>(function ParallaxScrollReveal({ isInView, initialState, animateState, transition, parallaxOffset, perspective, className, children }, ref) {
    const innerRef = useRef(null);
    const targetRef = (ref as React.RefObject<HTMLDivElement>) || innerRef;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);

    return (
        <motion.div
            ref={targetRef}
            initial={initialState}
            animate={isInView ? animateState : {}}
            transition={transition}
            style={{
                y: parallaxY,
                ...(perspective ? { perspective: 1200, transformStyle: 'preserve-3d' as const } : {}),
                willChange: 'transform, opacity',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
});
