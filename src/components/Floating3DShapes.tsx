'use client';


interface Shape3DProps {
    variant?: 'hero' | 'why' | 'services' | 'methodology' | 'testimonials' | 'pricing' | 'faq' | 'cta' | 'trust';
}

// Wireframe Cube - pure CSS 3D
function WireframeCube({ size = 40, color = 'rgba(139,92,246,0.15)', speed = 20, delay = 0, className = '' }: {
    size?: number; color?: string; speed?: number; delay?: number; className?: string;
}) {
    const half = size / 2;
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '800px' }}>
            <div
                className="wireframe-cube"
                style={{
                    width: size,
                    height: size,
                    transformStyle: 'preserve-3d',
                    animation: `spin3d ${speed}s linear infinite`,
                    animationDelay: `${delay}s`,
                }}
            >
                {/* Front */}
                <div style={{ position: 'absolute', width: size, height: size, border: `1px solid ${color}`, transform: `translateZ(${half}px)` }} />
                {/* Back */}
                <div style={{ position: 'absolute', width: size, height: size, border: `1px solid ${color}`, transform: `translateZ(-${half}px) rotateY(180deg)` }} />
                {/* Left */}
                <div style={{ position: 'absolute', width: size, height: size, border: `1px solid ${color}`, transform: `translateX(-${half}px) rotateY(-90deg)` }} />
                {/* Right */}
                <div style={{ position: 'absolute', width: size, height: size, border: `1px solid ${color}`, transform: `translateX(${half}px) rotateY(90deg)` }} />
                {/* Top */}
                <div style={{ position: 'absolute', width: size, height: size, border: `1px solid ${color}`, transform: `translateY(-${half}px) rotateX(90deg)` }} />
                {/* Bottom */}
                <div style={{ position: 'absolute', width: size, height: size, border: `1px solid ${color}`, transform: `translateY(${half}px) rotateX(-90deg)` }} />
            </div>
        </div>
    );
}

// 3D Rotating Ring
function Ring3D({ size = 60, color = 'rgba(6,182,212,0.12)', speed = 15, delay = 0, className = '' }: {
    size?: number; color?: string; speed?: number; delay?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '600px' }}>
            <div
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    transformStyle: 'preserve-3d',
                    animation: `ringRotate ${speed}s linear infinite`,
                    animationDelay: `${delay}s`,
                }}
            />
        </div>
    );
}

// Floating Diamond (rotated square)
function Diamond3D({ size = 30, color = 'rgba(236,72,153,0.1)', speed = 12, delay = 0, className = '' }: {
    size?: number; color?: string; speed?: number; delay?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '500px' }}>
            <div
                style={{
                    width: size,
                    height: size,
                    border: `1.5px solid ${color}`,
                    transformStyle: 'preserve-3d',
                    animation: `diamondFloat ${speed}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                }}
            />
        </div>
    );
}

// Glowing Sphere with 3D depth
function Sphere3D({ size = 50, color1 = 'rgba(139,92,246,0.08)', color2 = 'rgba(6,182,212,0.04)', speed = 18, delay = 0, className = '' }: {
    size?: number; color1?: string; color2?: string; speed?: number; delay?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            <div
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 35%, ${color1}, ${color2}, transparent 70%)`,
                    border: `1px solid rgba(139,92,246,0.06)`,
                    animation: `sphereFloat ${speed}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                    boxShadow: `inset -${size / 5}px -${size / 5}px ${size / 3}px rgba(0,0,0,0.3), 0 0 ${size / 2}px ${color1}`,
                }}
            />
        </div>
    );
}

// Orbiting dots
function OrbitDots({ radius = 40, dotSize = 4, color = 'rgba(139,92,246,0.2)', speed = 10, className = '' }: {
    radius?: number; dotSize?: number; color?: string; speed?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '500px' }}>
            <div style={{
                width: radius * 2,
                height: radius * 2,
                position: 'relative',
                transformStyle: 'preserve-3d',
                animation: `orbitSpin ${speed}s linear infinite`,
            }}>
                {[0, 90, 180, 270].map((deg) => (
                    <div key={deg} style={{
                        position: 'absolute',
                        width: dotSize,
                        height: dotSize,
                        borderRadius: '50%',
                        background: color,
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${deg}deg) translateX(${radius}px) translateY(-50%)`,
                        boxShadow: `0 0 ${dotSize * 2}px ${color}`,
                    }} />
                ))}
            </div>
        </div>
    );
}

// Helix/DNA strand
function Helix3D({ height = 120, color = 'rgba(139,92,246,0.08)', speed = 20, className = '' }: {
    height?: number; color?: string; speed?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '800px' }}>
            <div style={{
                width: 30,
                height,
                position: 'relative',
                transformStyle: 'preserve-3d',
                animation: `helixSpin ${speed}s linear infinite`,
            }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: color,
                        left: '50%',
                        top: `${(i / 8) * 100}%`,
                        transform: `translateX(-50%) translateZ(${Math.sin(i * 0.8) * 20}px)`,
                        boxShadow: `0 0 8px ${color}`,
                    }} />
                ))}
            </div>
        </div>
    );
}

// Cross/Plus shape
function Cross3D({ size = 24, color = 'rgba(6,182,212,0.12)', speed = 14, delay = 0, className = '' }: {
    size?: number; color?: string; speed?: number; delay?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '400px' }}>
            <div style={{
                transformStyle: 'preserve-3d',
                animation: `crossFloat ${speed}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}>
                <div style={{ width: size, height: 2, background: color, position: 'absolute', top: size / 2 - 1, left: 0 }} />
                <div style={{ width: 2, height: size, background: color, position: 'absolute', left: size / 2 - 1, top: 0 }} />
            </div>
        </div>
    );
}

// Triangle wireframe
function Triangle3D({ size = 35, color = 'rgba(236,72,153,0.08)', speed = 16, delay = 0, className = '' }: {
    size?: number; color?: string; speed?: number; delay?: number; className?: string;
}) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ perspective: '500px' }}>
            <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{
                animation: `triangleFloat ${speed}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}>
                <polygon points="20,4 36,36 4,36" stroke={color} strokeWidth="1.5" fill="none" />
            </svg>
        </div>
    );
}

// Main component that places 3D shapes per section variant
export default function Floating3DShapes({ variant = 'hero' }: Shape3DProps) {
    const shapeConfigs: Record<string, React.ReactNode> = {
        hero: (
            <>
                <WireframeCube size={60} color="rgba(139,92,246,0.2)" speed={25} className="top-[15%] left-[8%]" />
                <WireframeCube size={35} color="rgba(6,182,212,0.18)" speed={18} delay={3} className="bottom-[25%] right-[12%]" />
                <Ring3D size={80} color="rgba(139,92,246,0.15)" speed={20} className="top-[30%] right-[15%]" />
                <Ring3D size={50} color="rgba(6,182,212,0.12)" speed={14} delay={5} className="bottom-[35%] left-[15%]" />
                <Sphere3D size={45} className="top-[60%] left-[5%]" speed={22} color1="rgba(139,92,246,0.15)" />
                <Diamond3D size={30} className="top-[45%] right-[8%]" speed={10} color="rgba(139,92,246,0.18)" />
                <Cross3D className="top-[70%] right-[30%]" speed={18} color="rgba(6,182,212,0.2)" size={28} />
                <Triangle3D className="top-[10%] right-[40%]" speed={20} delay={2} color="rgba(236,72,153,0.15)" size={40} />
            </>
        ),
        trust: (
            <>
                <Ring3D size={40} className="top-[20%] left-[5%]" speed={18} color="rgba(139,92,246,0.12)" />
                <Cross3D className="top-[30%] right-[8%]" speed={14} color="rgba(6,182,212,0.15)" />
                <Diamond3D className="bottom-[20%] left-[10%]" speed={12} size={22} color="rgba(236,72,153,0.12)" />
            </>
        ),
        why: (
            <>
                <WireframeCube size={45} color="rgba(139,92,246,0.18)" speed={22} className="top-[10%] right-[5%]" />
                <Ring3D size={65} className="bottom-[15%] left-[3%]" speed={16} color="rgba(6,182,212,0.15)" />
                <Sphere3D size={35} className="top-[50%] right-[10%]" speed={20} delay={3} color1="rgba(139,92,246,0.15)" />
                <Triangle3D className="top-[20%] left-[8%]" speed={14} delay={1} color="rgba(236,72,153,0.15)" size={40} />
                <Cross3D className="top-[75%] left-[20%]" speed={16} delay={4} color="rgba(6,182,212,0.18)" size={30} />
                <Diamond3D className="bottom-[5%] right-[25%]" speed={11} color="rgba(139,92,246,0.15)" size={25} />
            </>
        ),
        services: (
            <>
                <WireframeCube size={55} color="rgba(6,182,212,0.15)" speed={20} delay={2} className="top-[5%] left-[3%]" />
                <Ring3D size={60} className="top-[40%] right-[3%]" speed={18} color="rgba(139,92,246,0.12)" />
                <Sphere3D size={50} color1="rgba(6,182,212,0.12)" className="bottom-[30%] left-[5%]" speed={24} />
                <Diamond3D size={28} className="top-[65%] left-[10%]" speed={13} color="rgba(139,92,246,0.15)" delay={2} />
                <Triangle3D className="bottom-[20%] right-[20%]" speed={17} size={35} color="rgba(236,72,153,0.12)" />
                <Cross3D className="bottom-[50%] right-[15%]" speed={12} color="rgba(6,182,212,0.18)" />
            </>
        ),
        methodology: (
            <>
                <WireframeCube size={50} color="rgba(139,92,246,0.16)" speed={24} className="top-[8%] right-[8%]" />
                <Ring3D size={70} className="bottom-[10%] left-[5%]" speed={20} color="rgba(236,72,153,0.1)" />
                <Sphere3D size={35} className="top-[25%] left-[8%]" speed={18} color1="rgba(139,92,246,0.15)" />
                <Cross3D className="bottom-[40%] right-[15%]" speed={12} color="rgba(6,182,212,0.18)" size={28} />
                <Triangle3D className="top-[70%] left-[12%]" speed={15} delay={3} color="rgba(236,72,153,0.12)" size={35} />
                <Diamond3D className="top-[15%] left-[25%]" speed={13} color="rgba(139,92,246,0.14)" size={24} />
            </>
        ),
        testimonials: (
            <>
                <Ring3D size={75} className="top-[10%] left-[5%]" speed={22} color="rgba(139,92,246,0.12)" />
                <WireframeCube size={40} className="bottom-[15%] right-[8%]" speed={18} color="rgba(6,182,212,0.14)" />
                <Diamond3D className="top-[60%] right-[5%]" speed={14} color="rgba(236,72,153,0.14)" size={28} />
                <Cross3D className="top-[20%] right-[20%]" speed={16} delay={2} color="rgba(6,182,212,0.15)" size={26} />
                <Triangle3D className="bottom-[40%] right-[25%]" speed={14} color="rgba(139,92,246,0.1)" />
            </>
        ),
        pricing: (
            <>
                <WireframeCube size={50} color="rgba(6,182,212,0.14)" speed={22} className="top-[5%] left-[5%]" />
                <Ring3D size={60} className="bottom-[10%] right-[5%]" speed={16} color="rgba(139,92,246,0.12)" />
                <Triangle3D className="top-[60%] left-[15%]" speed={18} color="rgba(236,72,153,0.12)" size={35} />
                <Diamond3D className="top-[15%] right-[20%]" speed={10} delay={5} color="rgba(139,92,246,0.15)" size={26} />
                <Cross3D className="bottom-[40%] left-[25%]" speed={14} color="rgba(6,182,212,0.15)" />
            </>
        ),
        faq: (
            <>
                <Ring3D size={55} className="top-[15%] right-[8%]" speed={20} color="rgba(139,92,246,0.12)" />
                <WireframeCube size={38} className="bottom-[20%] left-[5%]" speed={16} color="rgba(236,72,153,0.12)" />
                <Cross3D className="bottom-[10%] right-[15%]" speed={14} color="rgba(139,92,246,0.18)" size={28} />
                <Diamond3D className="top-[35%] right-[25%]" speed={12} color="rgba(6,182,212,0.15)" size={24} />
            </>
        ),
        cta: (
            <>
                <WireframeCube size={45} className="top-[15%] left-[8%]" speed={20} color="rgba(139,92,246,0.18)" />
                <Ring3D size={65} className="bottom-[15%] right-[5%]" speed={18} color="rgba(6,182,212,0.14)" />
                <Triangle3D className="bottom-[30%] left-[15%]" speed={16} color="rgba(236,72,153,0.15)" size={38} />
                <Diamond3D className="bottom-[50%] left-[3%]" speed={14} color="rgba(139,92,246,0.14)" size={24} />
            </>
        ),
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[0]">
            {shapeConfigs[variant] || shapeConfigs.hero}
        </div>
    );
}
