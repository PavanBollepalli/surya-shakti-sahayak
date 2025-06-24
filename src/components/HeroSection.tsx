
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Zap, Leaf, DollarSign, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

const HeroSection = ({ setActiveSection }: HeroSectionProps) => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: t('benefit1Title'),
      description: t('benefit1Desc')
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: t('benefit2Title'),
      description: t('benefit2Desc')
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: t('benefit3Title'),
      description: t('benefit3Desc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-4 rounded-full animate-pulse">
              <Sun className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            {t('heroTitle')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              onClick={() => setActiveSection('calculator')}
            >
              {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
              onClick={() => setActiveSection('schemes')}
            >
              {t('learnMore')}
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t('benefitsTitle')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How Solar Works */}
        <div className="bg-white/60 backdrop-blur rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How Solar Panels Work
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sun className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Sunlight Hits Panels</h4>
              <p className="text-sm text-gray-600">Solar panels capture sunlight and convert it into electricity</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">2. DC to AC Conversion</h4>
              <p className="text-sm text-gray-600">Inverter converts DC electricity to usable AC power</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="text-green-600 font-bold text-xl">⚡</div>
              </div>
              <h4 className="font-semibold mb-2">3. Power Your Home</h4>
              <p className="text-sm text-gray-600">Clean electricity powers your appliances and lights</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">4. Save Money</h4>
              <p className="text-sm text-gray-600">Reduce electricity bills and earn from excess power</p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Success Stories from Rural Andhra Pradesh
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <span className="text-green-600 font-bold">👨‍🌾</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Raman, Farmer from Guntur</h4>
                    <p className="text-sm text-gray-500">Installed 3kW Solar System</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "My monthly electricity bill reduced from ₹3,000 to ₹500. The government subsidy made it very affordable!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <span className="text-blue-600 font-bold">👩‍💼</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Lakshmi, Homemaker from Vijayawada</h4>
                    <p className="text-sm text-gray-500">Installed 2kW Rooftop System</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Solar panels on our roof now power our entire house. We save ₹2,000 every month!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
