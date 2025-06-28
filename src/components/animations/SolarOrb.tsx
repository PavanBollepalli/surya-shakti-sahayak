import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SolarOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SolarOrb: React.FC<SolarOrbProps> = ({ className = '', size = 'md' }) => {
  const orbRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  useEffect(() => {
    if (!orbRef.current) return;

    // Floating animation
    gsap.to(orbRef.current, {
      y: -20,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Rotation animation
    gsap.to(orbRef.current, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Glow pulse
    gsap.to(orbRef.current, {
      boxShadow: '0 0 40px rgba(255, 193, 7, 0.8), 0 0 80px rgba(255, 193, 7, 0.4)',
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Scroll-based movement
    ScrollTrigger.create({
      trigger: orbRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(orbRef.current, {
          x: progress * 100 - 50,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
    });

  }, []);

  return (
    <div
      ref={orbRef}
      className={`
        ${sizeClasses[size]}
        ${className}
        bg-gradient-to-br from-solar-yellow via-yellow-400 to-solar-yellow-dark
        rounded-full
        relative
        shadow-lg
      `}
    >
      {/* Inner glow */}
      <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-transparent rounded-full opacity-60" />
      
      {/* Core */}
      <div className="absolute inset-4 bg-gradient-to-br from-white to-yellow-100 rounded-full opacity-80" />
      
      {/* Highlight */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-90" />
    </div>
  );
};

export default SolarOrb;