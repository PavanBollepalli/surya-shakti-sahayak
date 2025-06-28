import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ParticleField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 60;

    // Create enhanced particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.6 + 0.2;
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = `hsl(${45 + Math.random() * 30}, 100%, ${60 + Math.random() * 20}%)`;
      particle.style.opacity = opacity.toString();
      particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    // Enhanced particle animations
    particles.forEach((particle, index) => {
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(particle, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 300 - 150}`,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 15 + 10,
        ease: 'sine.inOut',
      })
      .to(particle, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 300 - 150}`,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 15 + 10,
        ease: 'sine.inOut',
      })
      .to(particle, {
        x: 0,
        y: 0,
        opacity: Math.random() * 0.6 + 0.2,
        scale: 1,
        duration: Math.random() * 10 + 8,
        ease: 'sine.inOut',
      });

      // Stagger the start times
      tl.delay(index * 0.1);
    });

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default ParticleField;