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
      title: "Harness Solar Power",
      description: "Solar panels capture sunlight and convert it into clean electricity for your home.",
      visual: "☀️ → ⚡",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Zap className="w-16 h-16" />,
      title: "Smart Energy Conversion", 
      description: "Advanced inverters convert DC power to AC electricity that powers your appliances.",
      visual: "⚡ → 🏠",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <Home className="w-16 h-16" />,
      title: "Power Your Home",
      description: "Clean solar energy flows through your home, reducing dependence on the grid.",
      visual: "🏠 → 💡",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <TrendingUp className="w-16 h-16" />,
      title: "Save & Earn Money",
      description: "Reduce electricity bills by 90% and earn from excess power fed back to the grid.",
      visual: "💰 → 📈",
      color: "from-emerald-400 to-green-600"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        pinSpacing: true,
      });

      // Animate each step
      steps.forEach((_, index) => {
        const step = stepsRef.current[index];
        if (!step) return;

        // Step entrance
        gsap.fromTo(step,
          { 
            opacity: 0, 
            scale: 0.8,
            y: 100,
            rotationY: -45
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${index * 25}% top`,
              end: `top+=${(index + 1) * 25}% top`,
              scrub: 1,
            }
          }
        );

        // Step exit
        if (index < steps.length - 1) {
          gsap.to(step, {
            opacity: 0.3,
            scale: 0.9,
            y: -50,
            duration: 0.5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${(index + 1) * 25}% top`,
              end: `top+=${(index + 1.5) * 25}% top`,
              scrub: 1,
            }
          });
        }
      });

      // Sun path animation
      const sunPath = document.querySelector('.sun-path');
      if (sunPath) {
        gsap.to(sunPath, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-gradient-to-b from-sky-blue/10 to-leaf-green/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-solar-yellow/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-leaf-green/20 rounded-full blur-3xl" />
      </div>

      {/* Sun Path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800">
        <path
          className="sun-path"
          d="M 100 700 Q 600 100 1100 700"
          stroke="url(#sunGradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Section Title */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-earth-brown mb-6">
              How Solar <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow the journey of sunlight as it transforms into clean energy for your home
            </p>
          </motion.div>

          {/* Steps Container */}
          <div className="relative">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className={`bg-gradient-to-br ${step.color} p-12 rounded-3xl shadow-2xl text-white max-w-2xl backdrop-blur-sm border border-white/20`}>
                  <div className="text-center">
                    <div className="mb-8 flex justify-center">
                      <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg mb-6 opacity-90">{step.description}</p>
                    
                    <div className="text-4xl font-mono bg-white/10 py-4 px-8 rounded-2xl backdrop-blur-sm">
                      {step.visual}
                    </div>
                    
                    <div className="mt-6 text-sm opacity-75">
                      Step {index + 1} of {steps.length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollPinnedStory;