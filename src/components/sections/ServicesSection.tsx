import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MagneticButton from '../ui/magnetic-button';
import { 
  Home, 
  Building, 
  Factory, 
  Wrench, 
  BarChart3, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const sectionRef = useScrollAnimation('.service-card', {
    from: { opacity: 0, y: 60, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.8 }
  });

  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Residential Solar",
      description: "Complete solar solutions for homes with premium panels and smart inverters.",
      features: ["Rooftop Installation", "Net Metering", "25-Year Warranty", "Smart Monitoring"],
      price: "Starting from ₹60,000/kW",
      popular: false
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Commercial Solar",
      description: "Scalable solar systems for businesses to reduce operational costs significantly.",
      features: ["Large Scale Systems", "Tax Benefits", "ROI Analysis", "Maintenance Support"],
      price: "Starting from ₹45,000/kW",
      popular: true
    },
    {
      icon: <Factory className="h-8 w-8" />,
      title: "Industrial Solar",
      description: "High-capacity solar installations for manufacturing and industrial facilities.",
      features: ["Mega Watt Systems", "Grid Integration", "Power Purchase Agreement", "24/7 Support"],
      price: "Custom Pricing",
      popular: false
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Installation & Maintenance",
      description: "Professional installation and ongoing maintenance by certified technicians.",
      features: ["Expert Installation", "Regular Cleaning", "Performance Monitoring", "Quick Repairs"],
      price: "₹2,000/visit",
      popular: false
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Energy Monitoring",
      description: "Real-time monitoring and analytics to optimize your solar energy production.",
      features: ["Live Dashboard", "Mobile App", "Performance Reports", "Alerts & Notifications"],
      price: "₹5,000/year",
      popular: false
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support and technical assistance for all your needs.",
      features: ["Phone Support", "Remote Diagnostics", "Emergency Response", "Expert Consultation"],
      price: "Included",
      popular: false
    }
  ];

  return (
    <section id="services-section" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Complete <span className="text-gradient">Solar Solutions</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            From consultation to installation and maintenance, we provide end-to-end 
            solar energy solutions tailored to your specific needs and budget.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card relative"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-solar-yellow to-leaf-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                service.popular ? 'ring-2 ring-solar-yellow/50' : ''
              }`}>
                <CardHeader className="text-center pb-4">
                  <motion.div 
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className={`p-4 rounded-full ${
                      service.popular 
                        ? 'bg-gradient-to-r from-solar-yellow to-leaf-green text-white' 
                        : 'bg-gradient-to-r from-solar-yellow/10 to-leaf-green/10 text-solar-yellow'
                    }`}>
                      {service.icon}
                    </div>
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-earth-brown mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-leaf-green flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-gradient">{service.price}</span>
                    </div>
                    
                    <MagneticButton className="w-full bg-gradient-to-r from-solar-yellow to-leaf-green text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all group">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-earth-brown mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every project is unique. Let our experts design a personalized solar solution 
              that perfectly fits your energy needs and budget requirements.
            </p>
            <MagneticButton className="bg-gradient-to-r from-solar-yellow to-leaf-green text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Schedule Consultation
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;