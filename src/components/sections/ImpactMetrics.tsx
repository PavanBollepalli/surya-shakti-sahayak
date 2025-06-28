import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from '../ui/animated-counter';
import { Leaf, Zap, Home, Globe, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ImpactMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement[]>([]);

  const metrics = [
    {
      icon: <Zap className="w-8 h-8" />,
      value: 50000,
      suffix: 'kWh',
      label: 'Clean Energy Generated',
      description: 'Every month across our installations',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      value: 25000,
      suffix: ' kg',
      label: 'CO₂ Emissions Saved',
      description: 'Equivalent to planting 1,000 trees',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Home className="w-8 h-8" />,
      value: 10000,
      suffix: '+',
      label: 'Homes Powered',
      description: 'Families enjoying clean energy',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 5,
      suffix: ' Crore',
      prefix: '₹',
      label: 'Money Saved',
      description: 'Total savings by our customers',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: 15,
      suffix: ' States',
      label: 'Pan-India Presence',
      description: 'Serving customers nationwide',
      color: 'from-indigo-400 to-blue-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 50000,
      suffix: '+',
      label: 'Lives Impacted',
      description: 'People benefiting from solar energy',
      color: 'from-rose-400 to-red-500'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger animation for metrics
      gsap.fromTo(metricsRef.current,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.8,
          rotationY: -30
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Floating animation
      metricsRef.current.forEach((metric, index) => {
        gsap.to(metric, {
          y: -10,
          duration: 2 + index * 0.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });

      // Background elements animation
      gsap.to('.impact-bg-element', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="impact-bg-element absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-solar-yellow/10 to-leaf-green/10 rounded-full blur-3xl" />
        <div className="impact-bg-element absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-leaf-green/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Impact
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Transforming <span className="text-gradient">India's Energy</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Every solar installation creates a ripple effect of positive change. 
            Here's the real impact we're making together for a sustainable future.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) metricsRef.current[index] = el;
              }}
              className="group"
            >
              <motion.div
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${metric.color} text-white shadow-2xl overflow-hidden`}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 border border-white/30 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm w-fit">
                      {metric.icon}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <AnimatedCounter 
                        end={metric.value} 
                        suffix={metric.suffix}
                        prefix={metric.prefix}
                      />
                    </div>
                    <h3 className="text-xl font-bold opacity-90">
                      {metric.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm opacity-80 leading-relaxed">
                    {metric.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-earth-brown to-gray-800 text-white p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Be Part of the Solar Revolution
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of families and businesses who are already making a positive impact 
              on the environment while saving money with solar energy.
            </p>
            <motion.button
              className="bg-gradient-to-r from-solar-yellow to-leaf-green text-earth-brown px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Solar Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;