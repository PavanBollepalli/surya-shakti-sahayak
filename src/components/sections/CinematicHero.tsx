import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import MagneticButton from '../ui/magnetic-button';
import AnimatedCounter from '../ui/animated-counter';
import TextReveal from '../animations/TextReveal';
import SolarOrb from '../animations/SolarOrb';
import ParticleField from '../animations/ParticleField';
import { ArrowDown, Play, Zap, Star, Shield, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroProps {
  setActiveSection: (section: string) => void;
}

const CinematicHero: React.FC<CinematicHeroProps> = ({ setActiveSection }) => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo('.hero-badge', 
        { scale: 0, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title', 
        { y: 120, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, '-=0.5'
      )
      .fromTo('.hero-subtitle', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.7'
      )
      .fromTo('.hero-cta', 
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)', stagger: 0.15 }, '-=0.5'
      )
      .fromTo('.hero-stats', 
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out', stagger: 0.1 }, '-=0.3'
      );

      // Enhanced parallax effects
      gsap.to('.parallax-slow', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.parallax-fast', {
        yPercent: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Enhanced floating elements
      gsap.to('.floating-element', {
        y: -40,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Interactive hover animations
      gsap.utils.toArray('.interactive-element').forEach((element: any) => {
        element.addEventListener('mouseenter', () => {
          gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        element.addEventListener('mouseleave', () => {
          gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
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

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced background with gradient transitions */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/10 via-transparent to-leaf-green/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
        
        {/* Enhanced animated background pattern with parallax */}
        <div className="absolute inset-0 opacity-40">
          <div className="parallax-slow absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-solar-yellow/15 to-transparent rounded-full blur-3xl" />
          <div className="parallax-fast absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-leaf-green/10 to-transparent rounded-full blur-3xl" />
          <div className="parallax-slow absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-solar-yellow/20 to-transparent rounded-full blur-2xl" />
          <div className="parallax-fast absolute bottom-40 right-1/3 w-48 h-48 bg-gradient-to-r from-leaf-green/15 to-transparent rounded-full blur-xl" />
        </div>
      </div>

      {/* Enhanced particle field */}
      <ParticleField />

      {/* Enhanced floating solar orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <SolarOrb className="floating-element absolute top-1/4 left-1/4 opacity-50" size="sm" />
        <SolarOrb className="floating-element absolute top-1/3 right-1/4 opacity-30" size="md" />
        <SolarOrb className="floating-element absolute bottom-1/3 left-1/3 opacity-40" size="sm" />
        <SolarOrb className="floating-element absolute bottom-1/4 right-1/5 opacity-35" size="sm" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        {/* Enhanced top badge */}
        <motion.div className="hero-badge mb-8">
          <div className="interactive-element inline-flex items-center px-8 py-4 rounded-full bg-white/15 backdrop-blur-md text-earth-brown font-bold text-lg border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <Star className="w-6 h-6 mr-3 text-solar-yellow animate-pulse" />
            <TextReveal className="text-gradient">{t('indiaNumber1')}</TextReveal>
            <Shield className="w-6 h-6 ml-3 text-leaf-green animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>

        {/* Enhanced main title */}
        <div className="hero-title mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <div className="mb-4">
              <TextReveal 
                className="text-gradient bg-gradient-to-r from-solar-yellow via-solar-yellow-light to-leaf-green bg-clip-text text-transparent"
                stagger={0.05}
              >
                Power Your Future
              </TextReveal>
            </div>
            <div>
              <TextReveal 
                className="text-earth-brown"
                delay={0.5}
                stagger={0.05}
              >
                with Solar Energy
              </TextReveal>
            </div>
          </h1>
        </div>

        {/* Enhanced subtitle */}
        <div className="hero-subtitle mb-12">
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <TextReveal delay={1}>
              {t('heroSubtitle')}
            </TextReveal>
          </p>
        </div>

        {/* Enhanced urgency banner */}
        <motion.div
          className="hero-cta interactive-element bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white p-6 rounded-2xl mb-10 shadow-2xl backdrop-blur-sm border border-white/20"
          whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex items-center justify-center space-x-3 text-xl font-bold">
            <motion.span 
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡
            </motion.span>
            <span>{t('limitedOffer')} - {t('saveThousands')} {t('actNow')}!</span>
            <motion.span 
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              ⚡
            </motion.span>
          </div>
        </motion.div>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <MagneticButton
            onClick={scrollToCalculator}
            className="hero-cta interactive-element group relative overflow-hidden bg-gradient-to-r from-solar-yellow to-leaf-green text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              {t('startSavingNow')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-leaf-green to-solar-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>
          
          <MagneticButton
            className="hero-cta interactive-element group relative overflow-hidden bg-white/15 backdrop-blur-md text-earth-brown px-12 py-6 rounded-full text-xl font-bold border-2 border-white/40 hover:bg-white/25 transition-all shadow-2xl hover:shadow-3xl"
          >
            <span className="flex items-center">
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              {t('watchDemo')}
            </span>
          </MagneticButton>
        </div>

        {/* Enhanced action keywords grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[
            { text: t('freeConsultation'), color: 'from-green-400 to-green-600', icon: '🆓' },
            { text: t('instantQuote'), color: 'from-blue-400 to-blue-600', icon: '⚡' },
            { text: t('zeroDownPayment'), color: 'from-purple-400 to-purple-600', icon: '💰' },
            { text: t('governmentSubsidy'), color: 'from-orange-400 to-orange-600', icon: '🏛️' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`hero-cta interactive-element bg-gradient-to-r ${item.color} text-white p-6 rounded-2xl text-center shadow-xl backdrop-blur-sm border border-white/20 hover:shadow-2xl transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-lg font-bold">{item.text}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { end: 10000, suffix: '+', label: 'Happy Customers', icon: '😊' },
            { end: 50, suffix: 'MW', label: 'Solar Installed', icon: '⚡' },
            { end: 90, suffix: '%', label: 'Bill Reduction', icon: '💰' },
            { end: 25, suffix: ' Years', label: 'Warranty', icon: '🛡️' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="hero-stats interactive-element text-center bg-white/15 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToNext}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center space-y-3 text-white/80 hover:text-white transition-colors">
          <span className="text-sm font-medium">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-solar-yellow to-leaf-green rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;