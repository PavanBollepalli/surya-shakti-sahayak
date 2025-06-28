import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Sun, Zap, Shield, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useScrollAnimation('.fade-in-up', {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1 }
  });

  const benefits = [
    {
      icon: <Sun className="h-8 w-8 text-solar-yellow" />,
      title: "Clean Energy",
      description: "Harness the power of the sun for unlimited, clean electricity that reduces your carbon footprint."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-leaf-green" />,
      title: "Save Money",
      description: "Reduce your electricity bills by up to 90% and earn from excess power generation."
    },
    {
      icon: <Shield className="h-8 w-8 text-solar-yellow" />,
      title: "25-Year Warranty",
      description: "Industry-leading warranty and maintenance support for complete peace of mind."
    },
    {
      icon: <Zap className="h-8 w-8 text-leaf-green" />,
      title: "Energy Independence",
      description: "Generate your own power and become independent from grid failures and price hikes."
    },
    {
      icon: <Leaf className="h-8 w-8 text-solar-yellow" />,
      title: "Eco-Friendly",
      description: "Contribute to a cleaner environment and help combat climate change for future generations."
    },
    {
      icon: <Users className="h-8 w-8 text-leaf-green" />,
      title: "Expert Support",
      description: "Professional installation and ongoing support from certified solar energy experts."
    }
  ];

  return (
    <section id="about-section" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Why Choose Solar?
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            The Future is <span className="text-gradient">Solar Powered</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join the renewable energy revolution and discover how solar power can transform 
            your home, reduce your bills, and help create a sustainable future for all.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="fade-in-up"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="flex justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="p-4 rounded-full bg-gradient-to-r from-solar-yellow/10 to-leaf-green/10">
                      {benefit.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-earth-brown mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 fade-in-up"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-gradient-to-r from-solar-yellow to-leaf-green p-8 rounded-2xl text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Go Solar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get a free consultation and personalized solar solution for your home.
            </p>
            <motion.button
              className="bg-white text-earth-brown px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;