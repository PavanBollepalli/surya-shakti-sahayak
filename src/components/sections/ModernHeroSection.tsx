import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import MagneticButton from '../ui/magnetic-button';
import AnimatedCounter from '../ui/animated-counter';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play, Zap, Leaf, Sun, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ModernHeroSectionProps {
  setActiveSection: (section: string) => void;
}

const ModernHeroSection: React.FC<ModernHeroSectionProps> = ({ setActiveSection }) => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 100, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2, 
            ease: 'power3.out',
            delay: 0.5
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power2.out',
            delay: 0.8
          }
        );
      }

      // CTA buttons animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 30, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            ease: 'back.out(1.7)',
            stagger: 0.2,
            delay: 1.1
          }
        );
      }

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power2.out',
            stagger: 0.1,
            delay: 1.4
          }
        );
      }

      // Parallax effect for background elements
      gsap.to('.hero-bg-element', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about-section');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg-element absolute top-20 left-10 w-32 h-32 bg-solar-yellow/10 rounded-full blur-xl" />
        <div className="hero-bg-element absolute top-40 right-20 w-48 h-48 bg-leaf-green/10 rounded-full blur-2xl" />
        <div className="hero-bg-element absolute bottom-20 left-1/4 w-24 h-24 bg-solar-yellow/20 rounded-full blur-lg" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sun className="floating-icon absolute top-1/4 left-1/4 text-solar-yellow/30 w-8 h-8" />
        <Leaf className="floating-icon absolute top-1/3 right-1/4 text-leaf-green/30 w-6 h-6" />
        <Zap className="floating-icon absolute bottom-1/3 left-1/3 text-solar-yellow/40 w-7 h-7" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm border border-solar-yellow/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              India's #1 Solar Energy Platform
            </span>
          </motion.div>

          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">Power Your Future</span>
            <br />
            <span className="text-earth-brown">with Solar Energy</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your home with clean, affordable solar solutions. 
            Join thousands of families saving money while saving the planet.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MagneticButton
              onClick={() => setActiveSection('calculator')}
              className="btn-solar text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2 inline" />
              Calculate Savings
            </MagneticButton>
            
            <MagneticButton
              onClick={() => setActiveSection('services')}
              className="bg-white/80 backdrop-blur-sm text-earth-brown px-8 py-4 rounded-full text-lg font-semibold border-2 border-solar-yellow/30 hover:bg-white hover:shadow-lg transition-all"
            >
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Demo
            </MagneticButton>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={50} suffix="MW" />
              </div>
              <p className="text-gray-600 font-medium">Solar Installed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={90} suffix="%" />
              </div>
              <p className="text-gray-600 font-medium">Bill Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={25} suffix=" Years" />
              </div>
              <p className="text-gray-600 font-medium">Warranty</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center space-y-2 text-gray-500 hover:text-solar-yellow transition-colors">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHeroSection;