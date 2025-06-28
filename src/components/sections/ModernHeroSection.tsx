import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import MagneticButton from '../ui/magnetic-button';
import AnimatedCounter from '../ui/animated-counter';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play, Zap, Leaf, Sun, TrendingUp, Star, Shield } from 'lucide-react';

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

  const scrollToCalculator = () => {
    const calculatorSection = document.querySelector('#calculator-section');
    if (calculatorSection) {
      const headerHeight = 80;
      const elementPosition = calculatorSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setActiveSection('calculator');
  };

  const scrollToServices = () => {
    const servicesSection = document.querySelector('#services-section');
    if (servicesSection) {
      const headerHeight = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setActiveSection('services');
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern pt-20"
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
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-bold text-base border-2 border-solar-yellow/30 shadow-lg">
              <Star className="w-5 h-5 mr-2 text-solar-yellow" />
              {t('indiaNumber1')}
              <Shield className="w-5 h-5 ml-2 text-leaf-green" />
            </div>
          </motion.div>

          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient">{t('heroTitle').split(' ').slice(0, 3).join(' ')}</span>
            <br />
            <span className="text-earth-brown">{t('heroTitle').split(' ').slice(3).join(' ')}</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            {t('heroSubtitle')}
          </p>

          {/* Urgency Banner */}
          <motion.div
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-2xl mb-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-center justify-center space-x-2 text-lg font-bold">
              <span className="animate-pulse">⚡</span>
              <span>{t('limitedOffer')} - {t('saveThousands')} {t('actNow')}!</span>
              <span className="animate-pulse">⚡</span>
            </div>
          </motion.div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <MagneticButton
              onClick={scrollToCalculator}
              className="btn-solar text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl pulse-glow"
            >
              <Zap className="w-6 h-6 mr-3 inline" />
              {t('startSavingNow')}
            </MagneticButton>
            
            <MagneticButton
              onClick={scrollToServices}
              className="bg-white/90 backdrop-blur-sm text-earth-brown px-10 py-5 rounded-full text-xl font-bold border-3 border-solar-yellow/50 hover:bg-white hover:shadow-2xl transition-all"
            >
              <Play className="w-6 h-6 mr-3 inline" />
              {t('getFreeSubsidies')}
            </MagneticButton>
          </div>

          {/* Action Keywords */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-700">{t('freeConsultation')}</div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-700">{t('instantQuote')}</div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-700">{t('zeroDownPayment')}</div>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-700">{t('governmentSubsidy')}</div>
            </div>
          </motion.div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={50} suffix="MW" />
              </div>
              <p className="text-gray-600 font-medium">Solar Installed</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter end={90} suffix="%" />
              </div>
              <p className="text-gray-600 font-medium">Bill Reduction</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
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