import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MagneticButton from '../ui/magnetic-button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  ExternalLink,
  Globe,
  Building
} from 'lucide-react';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'residential'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useScrollAnimation('.contact-card', {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8 }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '', service: 'residential' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('callToday'),
      details: ["+91 1800-180-3333", "+91 9876543210"],
      description: "Speak with our solar experts"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["info@solarsaathi.in", "support@solarsaathi.in"],
      description: "Get detailed information"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: ["123 Solar Street, Vijayawada", "Andhra Pradesh - 520001"],
      description: "See our showroom"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sun: 10:00 AM - 5:00 PM"],
      description: "We're here to help"
    }
  ];

  const governmentContacts = [
    {
      title: "Ministry of New and Renewable Energy (MNRE)",
      phone: "011-2436-0707",
      email: "rooftopsolar@mnre.gov.in",
      website: "https://mnre.gov.in",
      description: "Central Government Solar Schemes & Policies"
    },
    {
      title: "AP New and Renewable Energy Development Corporation",
      phone: "0863-2340544",
      email: "info@nredcap.ap.gov.in", 
      website: "https://nredcap.ap.gov.in",
      description: "Andhra Pradesh State Solar Programs"
    },
    {
      title: "National Solar Rooftop Portal",
      phone: "1800-180-3333",
      email: "support@solarrooftop.gov.in",
      website: "https://solarrooftop.gov.in",
      description: "Online Solar Applications & Tracking"
    },
    {
      title: "Solar Energy Corporation of India (SECI)",
      phone: "011-4057-4000",
      email: "info@seci.co.in",
      website: "https://seci.co.in",
      description: "Solar Project Implementation & Financing"
    }
  ];

  return (
    <section id="contact-section" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-solar-yellow/20 to-leaf-green/20 text-earth-brown font-medium text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('contactTitle')}
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Go <span className="text-gradient">Solar?</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Get a free consultation and personalized solar solution for your home or business. 
            Our experts are ready to help you start saving with solar energy.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-earth-brown flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3 text-solar-yellow" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="border-gray-300 focus:border-solar-yellow focus:ring-solar-yellow"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          required
                          className="border-gray-300 focus:border-solar-yellow focus:ring-solar-yellow"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="border-gray-300 focus:border-solar-yellow focus:ring-solar-yellow"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-yellow focus:border-solar-yellow"
                      >
                        <option value="residential">{t('residentialSolar')}</option>
                        <option value="commercial">{t('commercialSolar')}</option>
                        <option value="industrial">{t('industrialSolar')}</option>
                        <option value="maintenance">Maintenance & Support</option>
                        <option value="consultation">{t('freeConsultation')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your solar energy needs..."
                        rows={4}
                        className="border-gray-300 focus:border-solar-yellow focus:ring-solar-yellow"
                      />
                    </div>

                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-solar-yellow to-leaf-green text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </div>
                      )}
                    </MagneticButton>
                  </form>
                ) : (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="bg-gradient-to-r from-leaf-green/10 to-solar-yellow/10 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-leaf-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-earth-brown mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for your interest. Our team will contact you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-solar-yellow/10 to-leaf-green/10 p-3 rounded-full">
                        <div className="text-solar-yellow">
                          {info.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-earth-brown text-lg mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-700 font-medium">
                            {detail}
                          </p>
                        ))}
                        <p className="text-gray-500 text-sm mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Quick Actions */}
            <motion.div
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-solar-yellow to-leaf-green text-white">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Schedule a Free Site Visit
                  </h3>
                  <p className="mb-4 opacity-90">
                    Get a personalized assessment and quote for your property
                  </p>
                  <MagneticButton className="bg-white text-earth-brown px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                    Book Now
                  </MagneticButton>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Government Contacts Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-earth-brown mb-4 flex items-center justify-center">
              <Building className="h-8 w-8 mr-3 text-solar-yellow" />
              {t('govContactTitle')}
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Direct contact information for official government solar energy departments and schemes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {governmentContacts.map((contact, index) => (
              <motion.div
                key={index}
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-green-50">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-earth-brown text-lg mb-3">
                      {contact.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {contact.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 font-medium">{contact.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700 font-medium">{contact.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-purple-600" />
                        <a 
                          href={contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-solar-yellow/10 to-leaf-green/10 p-6 text-center">
              <h3 className="text-2xl font-bold text-earth-brown mb-2">
                Visit Our Solar Experience Center
              </h3>
              <p className="text-gray-600">
                See live solar installations and get hands-on experience with our technology
              </p>
            </div>
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>Interactive Map Coming Soon</p>
                <p className="text-sm">123 Solar Street, Vijayawada, AP 520001</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;