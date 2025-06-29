import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sun, Zap, Leaf, Home, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ScrollPinnedStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  const steps = [
    {
      icon: <Sun className="w-16 h-16" />,
      title: "1. Harness Solar Power",
      description: "Solar panels capture sunlight and convert it into clean electricity for your home.",
      visual: "☀️ → ⚡",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      icon: <Zap className="w-16 h-16" />,
      title: "2. Smart Energy Conversion", 
      description: "Advanced inverters convert DC power to AC electricity that powers your appliances.",
      visual: "⚡ → 🏠",
      color: "from-blue-400 to-purple-500",
      bgColor: "from-blue-50 to-purple-50"
    },
    {
      icon: <Home className="w-16 h-16" />,
      title: "3. Power Your Home",
      description: "Clean solar energy flows through your home, reducing dependence on the grid.",
      visual: "🏠 → 💡",
      color: "from-green-400 to-teal-500",
      bgColor: "from-green-50 to-teal-50"
    },
    {
      icon: <TrendingUp className="w-16 h-16" />,
      title: "4. Save & Earn Money",
      description: "Reduce electricity bills by 90% and earn from excess power fed back to the grid.",
      visual: "💰 → 📈",
      color: "from-emerald-400 to-green-600",
      bgColor: "from-emerald-50 to-green-50"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(stepsRef.current, { 
        opacity: 0, 
        scale: 0.8,
        y: 100,
        rotationY: -45
      });

      // Create the main timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Animate each step
      steps.forEach((_, index) => {
        const step = stepsRef.current[index];
        if (!step) return;

        // Step entrance animation
        mainTimeline.to(step, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          ease: 'back.out(1.7)',
        }, index * 1);

        // Step exit animation (except for the last one)
        if (index < steps.length - 1) {
          mainTimeline.to(step, {
            opacity: 0.3,
            scale: 0.9,
            y: -50,
            duration: 0.5,
          }, (index + 0.8) * 1);
        }
      });

      // Sun path animation
      const sunPath = containerRef.current?.querySelector('.sun-path');
      if (sunPath) {
        gsap.fromTo(sunPath, 
          { strokeDashoffset: 2000 },
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            }
          }
        );
      }

      // Floating animation for icons
      stepsRef.current.forEach((step, index) => {
        if (step) {
          const icon = step.querySelector('.step-icon');
          if (icon) {
            gsap.to(icon, {
              y: -10,
              duration: 2 + index * 0.3,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: index * 0.5,
            });
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-gradient-to-b from-sky-blue/10 to-leaf-green/10 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-solar-yellow/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-leaf-green/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-blue-400/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-green-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Enhanced Sun Path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFC107" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF9800" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          className="sun-path"
          d="M 100 700 Q 300 200 600 300 Q 900 400 1100 200"
          stroke="url(#sunGradient)"
          strokeWidth="6"
          fill="none"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          filter="url(#glow)"
          opacity="0.7"
        />
      </svg>

      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Section Title */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-earth-brown mb-6">
              How Solar <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Follow the journey of sunlight as it transforms into clean energy for your home
            </p>
          </motion.div>

          {/* Steps Container */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className={`bg-gradient-to-br ${step.color} p-8 md:p-12 rounded-3xl shadow-2xl text-white max-w-4xl mx-auto backdrop-blur-sm border border-white/20 transform-gpu`}>
                  <div className="text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                      <motion.div 
                        className="step-icon p-6 bg-white/20 rounded-full backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">{step.title}</h3>
                    
                    {/* Description */}
                    <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
                      {step.description}
                    </p>
                    
                    {/* Visual Flow */}
                    <div className="text-5xl md:text-6xl font-mono bg-white/10 py-6 px-8 rounded-2xl backdrop-blur-sm mb-6 inline-block">
                      {step.visual}
                    </div>
                    
                    {/* Step Counter */}
                    <div className="mt-6">
                      <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <span className="text-sm opacity-75">Step {index + 1} of {steps.length}</span>
                        <div className="flex space-x-1">
                          {steps.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i === index ? 'bg-white' : 'bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <p className="text-sm text-gray-600 font-medium">
                Scroll to see how solar energy transforms your home
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-solar-yellow to-solar-yellow-light rounded-full shadow-lg"
            style={{
              left: `${10 + i * 6}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ScrollPinnedStory;