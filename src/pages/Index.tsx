import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import ModernHeader from '../components/layout/ModernHeader';
import ModernHeroSection from '../components/sections/ModernHeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import SolarCalculator from '../components/SolarCalculator';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import ScrollIndicator from '../components/animations/ScrollIndicator';
import LoadingSpinner from '../components/animations/LoadingSpinner';
import FloatingElements from '../components/animations/FloatingElements';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user, loading } = useAuth();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth';
    }
  }, [user, loading]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'calculator', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(`${section}-section`) || 
                       (section === 'home' ? document.querySelector('section') : null);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Scroll Progress Indicator */}
        <ScrollIndicator />
        
        {/* Floating Background Elements */}
        <FloatingElements />
        
        {/* Header */}
        <ModernHeader activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <ModernHeroSection setActiveSection={setActiveSection} />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Services Section */}
          <ServicesSection />
          
          {/* Calculator Section */}
          <section id="calculator-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <motion.span 
                  className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Solar Calculator
                </motion.span>
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Calculate Your <span className="text-gradient">Solar Savings</span>
                </motion.h2>
              </div>
              <SolarCalculator />
            </div>
          </section>
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Contact Section */}
          <ContactSection />
        </main>
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-earth-brown to-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-solar-yellow to-leaf-green p-2 rounded-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    </motion.div>
                  </div>
                  <span className="text-2xl font-bold">SolarSaathi</span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Empowering India with clean, affordable solar energy solutions. 
                  Join the renewable energy revolution and start saving today.
                </p>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-solar-yellow transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-solar-yellow transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-gray-300 hover:text-solar-yellow transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><button onClick={() => setActiveSection('about')} className="hover:text-solar-yellow transition-colors">About Us</button></li>
                  <li><button onClick={() => setActiveSection('services')} className="hover:text-solar-yellow transition-colors">Our Services</button></li>
                  <li><button onClick={() => setActiveSection('calculator')} className="hover:text-solar-yellow transition-colors">Solar Calculator</button></li>
                  <li><button onClick={() => setActiveSection('contact')} className="hover:text-solar-yellow transition-colors">Contact Us</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-300">
                  <p>📞 1800-180-3333</p>
                  <p>✉️ info@solarsaathi.in</p>
                  <p>📍 Vijayawada, AP</p>
                  <p>🕒 24/7 Support</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 SolarSaathi. Made with ❤️ for a Sustainable India. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-solar-yellow to-leaf-green text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
};

export default Index;