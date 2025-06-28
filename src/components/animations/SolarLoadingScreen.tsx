import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface SolarLoadingScreenProps {
  onComplete: () => void;
}

const SolarLoadingScreen: React.FC<SolarLoadingScreenProps> = ({ onComplete }) => {
  const sunRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Sun animation
    tl.fromTo(sunRef.current, 
      { scale: 0, rotation: 0, opacity: 0 },
      { scale: 1, rotation: 360, opacity: 1, duration: 1.5, ease: 'back.out(1.7)' }
    )
    // Rays animation
    .fromTo(raysRef.current?.children || [], 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.5'
    )
    // Horizon animation
    .fromTo(horizonRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3'
    )
    // Solar panels animation
    .fromTo(panelsRef.current?.children || [],
      { y: 100, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' }, '-=0.5'
    )
    // Logo animation
    .fromTo(logoRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.3'
    )
    // Final glow effect
    .to(sunRef.current,
      { 
        boxShadow: '0 0 100px rgba(255, 193, 7, 0.8), 0 0 200px rgba(255, 193, 7, 0.4)',
        duration: 0.5,
        ease: 'power2.out'
      }
    )
    // Fade out
    .to('.loading-screen',
      { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=0.5'
    );

  }, [onComplete]);

  return (
    <motion.div 
      className="loading-screen fixed inset-0 z-50 bg-gradient-to-b from-sky-blue via-solar-yellow/20 to-leaf-green/30 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-200 to-transparent opacity-50" />
        <div ref={horizonRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-200 to-transparent opacity-50" />
      </div>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center space-y-16 w-full max-w-4xl mx-auto px-4">
        
        {/* Sun with Rays - Top Section */}
        <div className="relative">
          {/* Rays */}
          <div ref={raysRef} className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-20 bg-gradient-to-t from-solar-yellow to-transparent origin-bottom"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-60px)`,
                }}
              />
            ))}
          </div>

          {/* Sun */}
          <div
            ref={sunRef}
            className="w-32 h-32 bg-gradient-to-br from-solar-yellow to-solar-yellow-dark rounded-full relative z-10 flex items-center justify-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-solar-yellow rounded-full animate-pulse" />
          </div>
        </div>

        {/* Solar Panels Section */}
        <div ref={panelsRef} className="flex items-center justify-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative"
              style={{ transform: `perspective(500px) rotateX(15deg) rotateY(${-10 + i * 10}deg)` }}
            >
              {/* Solar Panel */}
              <div className="w-16 h-24 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg border-2 border-gray-300 shadow-lg">
                {/* Panel Grid */}
                <div className="grid grid-cols-2 gap-1 p-1 h-full">
                  {[...Array(6)].map((_, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-sm border border-blue-600"
                    />
                  ))}
                </div>
                
                {/* Panel Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg pointer-events-none" />
              </div>
              
              {/* Panel Stand */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-400 rounded-full" />
            </div>
          ))}
        </div>

        {/* Logo Section - Bottom */}
        <div ref={logoRef} className="text-center">
          <div className="text-4xl md:text-6xl font-bold text-earth-brown mb-4">
            <span className="inline-block">Solar</span>
            <span className="inline-block text-gradient ml-2">Saathi</span>
          </div>
          <div className="text-lg text-gray-600 font-medium">
            <span className="inline-block">Powering</span>
            <span className="inline-block ml-2">Your</span>
            <span className="inline-block ml-2">Future</span>
          </div>
        </div>
      </div>

      {/* Loading Progress */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-64 h-1 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-solar-yellow to-leaf-green"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600 font-medium">Loading solar experience...</span>
        </div>
      </div>

      {/* Floating Energy Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-solar-yellow/60 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SolarLoadingScreen;