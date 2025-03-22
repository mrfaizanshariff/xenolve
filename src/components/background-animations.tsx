"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackgroundAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-white/20 rounded-full';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);

      // Animate each particle
      gsap.to(particle, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        opacity: 'random(0.1, 0.3)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }

    // Create floating lines
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = 'absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45';
      line.style.width = `${Math.random() * 200 + 100}px`;
      line.style.left = `${Math.random() * 100}%`;
      line.style.top = `${Math.random() * 100}%`;
      container.appendChild(line);

      gsap.to(line, {
        y: 'random(-100, 100)',
        opacity: 'random(0.05, 0.2)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }

    // Cleanup
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,36,255,0.1)_0%,transparent_70%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(92, 36, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(92, 36, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FF3BFF] rounded-full filter blur-[150px] opacity-10 animate-pulse" />
      <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-[#5C24FF] rounded-full filter blur-[150px] opacity-10 animate-pulse" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-[#0096FF] rounded-full filter blur-[150px] opacity-10 animate-pulse" />
    </div>
  );
}