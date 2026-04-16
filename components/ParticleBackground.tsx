"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  width: number;
  height: number;
  animationDuration: number;
  animationDelay: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on the client side to prevent hydration mismatches
    const generatedParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage string
      width: Math.random() * 6 + 2, // 2px to 8px
      height: Math.random() * 6 + 2,
      animationDuration: Math.random() * 15 + 10, // 10s to 25s
      animationDelay: Math.random() * 20, // 0s to 20s
    }));
    
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `${p.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
