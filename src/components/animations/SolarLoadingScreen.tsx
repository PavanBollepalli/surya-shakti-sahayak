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

    // Enhanced sun animation with perfect centering
    tl.fromTo(sunRef.current, 
      { scale: 0, rotation: 0, opacity: 0 },
      { 
        scale: 1, 
        rotation: 360, 
        opacity: 1, 
        duration: 1.8, 
        ease: 'back.out(1.7)',
        transformOrigin: 'center center'
      }
    )
    // Refined rays animation with smooth rotation
    .fromTo(raysRef.current?.children || [], 
      { scale: 0, opacity: 0, rotation: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        rotation: 360,
        duration: 1.2, 
        stagger: 0.08, 
        ease: 'power2.out',
        transformOrigin: 'center center'
      }, '-=0.8'
    )
    // Horizon animation
    .fromTo(horizonRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.6'
    )
    // Enhanced solar panels animation
    .fromTo(panelsRef.current?.children || [],
      { y: 120, opacity: 0, rotationX: -90, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0, 
        scale: 1,
        duration: 1.4, 
        stagger: 0.15, 
        ease: 'back.out(1.7)',
        transformOrigin: 'bottom center'
      }, '-=0.4'
    )
    // Logo animation with enhanced timing
    .fromTo(logoRef.current?.children || [],
      { y: 60, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1, 
        stagger: 0.12, 
        ease: 'power2.out' 
      }, '-=0.6'
    )
    // Enhanced final glow effect
    .to(sunRef.current,
      { 
        boxShadow: '0 0 120px rgba(255, 193, 7, 0.9), 0 0 240px rgba(255, 193, 7, 0.5)',
        duration: 0.8,
        ease: 'power2.out'
      }
    )
    // Smooth fade out
    .to('.loading-screen',
      { opacity: 0, duration: 1, ease: 'power2.inOut' }, '+=0.3'
    );

    // Continuous ray rotation during loading
    gsap.to(raysRef.current, {
      rotation: 360,
      duration: 8,
      ease: 'none',
      repeat: -1,
    });

  }, [onComplete]);

  return (
    <motion.div 
      className="loading-screen fixed inset-0 z-50 bg-gradient-to-br from-sky-blue/20 via-solar-yellow/10 to-leaf-green/20 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Enhanced animated background with gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-100/50 to-transparent" />
        <div ref={horizonRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-100/50 to-transparent" />
        
        {/* Floating gradient orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-solar-yellow/20 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-leaf-green/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content container with perfect centering */}
      <div className="relative flex flex-col items-center justify-center space-y-20 w-full max-w-5xl mx-auto px-6">
        
        {/* Enhanced sun with rays - perfectly centered */}
        <div className="relative flex items-center justify-center">
          {/* Precisely positioned rays */}
          <div ref={raysRef} className="absolute inset-0 flex items-center justify-center">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-28 bg-gradient-to-t from-solar-yellow via-solar-yellow-light to-transparent origin-bottom"
                style={{
                  transform: `rotate(${i * 22.5}deg) translateY(-80px)`,
                  transformOrigin: 'center 80px'
                }}
              />
            ))}
          </div>

          {/* Perfectly centered sun */}
          <div
            ref={sunRef}
            className="relative z-10 w-40 h-40 bg-gradient-to-br from-solar-yellow via-solar-yellow-light to-solar-yellow-dark rounded-full flex items-center justify-center shadow-2xl"
            style={{ transformOrigin: 'center center' }}
          >
            {/* Inner sun layers for depth */}
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-200 to-solar-yellow rounded-full animate-pulse" />
            <div className="absolute w-24 h-24 bg-gradient-to-br from-white/60 to-yellow-100/60 rounded-full" />
            <div className="absolute top-4 left-4 w-6 h-6 bg-white/80 rounded-full blur-sm" />
          </div>
        </div>

        {/* Enhanced solar panels section with 3D perspective */}
        <div ref={panelsRef} className="flex items-center justify-center space-x-6 perspective-1000">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative transform-gpu"
              style={{ 
                transform: `perspective(600px) rotateX(15deg) rotateY(${-15 + i * 10}deg)`,
                transformOrigin: 'bottom center'
              }}
            >
              {/* Enhanced solar panel with realistic details */}
              <div className="w-20 h-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-lg border-2 border-gray-300 shadow-2xl overflow-hidden">
                {/* Panel grid with enhanced details */}
                <div className="grid grid-cols-2 gap-1 p-1.5 h-full">
                  {[...Array(8)].map((_, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 rounded-sm border border-blue-600 relative overflow-hidden"
                    >
                      {/* Cell reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>
                
                {/* Enhanced panel reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-lg pointer-events-none" />
                <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-sm" />
              </div>
              
              {/* Enhanced panel stand */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg" />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-500 rounded-full shadow-md" />
            </div>
          ))}
        </div>

        {/* Enhanced logo section with better typography */}
        <div ref={logoRef} className="text-center">
          <div className="text-5xl md:text-7xl font-bold text-earth-brown mb-6 tracking-tight">
            <span className="inline-block">Solar</span>
            <span className="inline-block text-gradient ml-3">Saathi</span>
          </div>
          <div className="text-xl md:text-2xl text-gray-600 font-medium tracking-wide">
            <span className="inline-block">Powering</span>
            <span className="inline-block ml-2">Your</span>
            <span className="inline-block ml-2 text-gradient font-semibold">Future</span>
          </div>
        </div>
      </div>

      {/* Enhanced loading progress with gradient */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
          <motion.div
            className="h-full bg-gradient-to-r from-solar-yellow via-solar-yellow-light to-leaf-green shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 4.5, ease: 'easeInOut' }}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600 font-medium tracking-wide">Loading solar experience...</span>
        </div>
      </div>

      {/* Enhanced floating energy particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-solar-yellow to-solar-yellow-light rounded-full shadow-lg"
            style={{
              left: `${15 + i * 7}%`,
              top: `${25 + (i % 4) * 15}%`,
            }}
            animate={{
              y: [-30, -60, -30],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SolarLoadingScreen;