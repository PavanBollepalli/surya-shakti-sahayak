import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useScrollAnimation('.testimonial-card', {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1, duration: 0.8 }
  });

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Guntur, Andhra Pradesh",
      role: "Farmer",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      quote: "SolarSeva transformed my farm operations. My electricity bill reduced from ₹8,000 to just ₹800 per month. The installation was professional and the panels work perfectly even during monsoons.",
      savings: "₹7,200/month",
      system: "10kW Solar System"
    },
    {
      name: "Priya Sharma",
      location: "Vijayawada, Andhra Pradesh",
      role: "Homemaker",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      quote: "Best decision we made for our home! The solar panels look great on our roof and we're saving so much money. The mobile app lets me track our energy production in real-time.",
      savings: "₹3,500/month",
      system: "5kW Rooftop Solar"
    },
    {
      name: "Venkat Reddy",
      location: "Kurnool, Andhra Pradesh",
      role: "Business Owner",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      quote: "Our textile business now runs on clean solar energy. The ROI was achieved in just 3 years and now we're saving lakhs annually. SolarSeva's support team is excellent.",
      savings: "₹45,000/month",
      system: "50kW Commercial Solar"
    },
    {
      name: "Lakshmi Devi",
      location: "Tirupati, Andhra Pradesh",
      role: "Teacher",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      quote: "The government subsidy made solar very affordable for us. Installation was completed in just 2 days and we started saving immediately. Highly recommend SolarSeva!",
      savings: "₹2,800/month",
      system: "3kW Home Solar"
    },
    {
      name: "Suresh Babu",
      location: "Visakhapatnam, Andhra Pradesh",
      role: "Engineer",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      rating: 5,
      quote: "Amazing technology and service! The smart monitoring system alerts me about any issues. My neighbors are now planning to install solar after seeing our results.",
      savings: "₹4,200/month",
      system: "7kW Smart Solar"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials-section" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Customer Stories
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Real Stories, <span className="text-gradient">Real Savings</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Discover how families and businesses across Andhra Pradesh are transforming 
            their lives with solar energy and saving thousands every month.
          </motion.p>
        </div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Customer Image */}
                    <div className="flex-shrink-0">
                      <motion.img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-solar-yellow to-leaf-green"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        <Quote className="h-8 w-8 text-solar-yellow/50" />
                      </div>
                      
                      <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                        "{testimonials[currentIndex].quote}"
                      </blockquote>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex justify-center md:justify-start mb-2">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-solar-yellow fill-current" />
                            ))}
                          </div>
                          <h4 className="font-bold text-earth-brown text-lg">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-600">
                            {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                          </p>
                        </div>

                        <div className="text-center md:text-right">
                          <div className="bg-gradient-to-r from-leaf-green/10 to-solar-yellow/10 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                            <p className="text-2xl font-bold text-gradient">
                              {testimonials[currentIndex].savings}
                            </p>
                            <p className="text-xs text-gray-500">
                              {testimonials[currentIndex].system}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10"
          >
            <ChevronLeft className="h-6 w-6 text-earth-brown" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10"
          >
            <ChevronRight className="h-6 w-6 text-earth-brown" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-solar-yellow to-leaf-green' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">4.9/5</div>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">10,000+</div>
            <p className="text-gray-600 font-medium">Happy Customers</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">₹50Cr+</div>
            <p className="text-gray-600 font-medium">Total Savings</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">99%</div>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;