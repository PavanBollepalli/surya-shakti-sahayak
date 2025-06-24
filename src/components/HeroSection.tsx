
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Zap, Leaf, DollarSign, ArrowRight, Thermometer, Globe, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

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

  const globalWarmingFacts = [
    {
      icon: <Thermometer className="h-6 w-6 text-red-500" />,
      fact: "Earth's temperature has risen by 1.1°C since 1880",
      impact: "Causing extreme weather in India"
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      fact: "India produces 2.88 billion tons of CO₂ annually",
      impact: "3rd largest global emitter"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      fact: "Solar can reduce 80% of your carbon footprint",
      impact: "Be part of the solution today!"
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
          
          {/* Punch Line Alert */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 border-l-4 border-red-500 p-6 mb-8 mx-auto max-w-4xl rounded-lg">
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-xl font-bold text-red-800">Climate Emergency Alert!</h3>
            </div>
            <p className="text-lg text-red-700 font-semibold">
              "Every minute you delay solar installation, you're contributing to climate change. 
              <span className="text-red-800"> Act NOW - Your children's future depends on it!"</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg animate-pulse"
              onClick={() => setActiveSection('calculator')}
            >
              🚀 START SAVING NOW <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
              onClick={() => setActiveSection('schemes')}
            >
              💰 Get FREE Subsidies
            </Button>
          </div>
        </div>

        {/* Global Warming Crisis Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-16 border-2 border-red-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-800 mb-4 flex items-center justify-center">
              <Globe className="h-8 w-8 mr-3 text-red-600" />
              🔥 Climate Crisis: India is Burning! 🔥
            </h2>
            <p className="text-lg text-red-700 font-semibold max-w-4xl mx-auto">
              Rising temperatures, unpredictable monsoons, and extreme weather are destroying our crops and livelihoods. 
              <span className="text-red-800 font-bold"> But YOU can be the hero who fights back!</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {globalWarmingFacts.map((item, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur border-2 border-red-100 hover:border-red-300 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{item.fact}</h4>
                  <p className="text-sm text-gray-600">{item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center bg-yellow-100 p-6 rounded-xl border-2 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-800 mb-3">
              ⚡ Solar Power: Your Weapon Against Climate Change! ⚡
            </h3>
            <p className="text-lg text-yellow-700">
              <span className="font-bold">ONE solar panel</span> saves <span className="font-bold text-green-600">1 ton of CO₂ per year</span> - 
              equivalent to planting <span className="font-bold text-green-600">40 trees!</span>
            </p>
          </div>
        </div>

        {/* Punch Lines Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-300 hover:shadow-xl transition-all">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                💸 Stop Throwing Money Away!
              </h3>
              <p className="text-lg text-green-700 mb-4">
                You're paying ₹3,000+ every month to electricity companies. 
                <span className="font-bold"> That's ₹36,000 per year gone forever!</span>
              </p>
              <p className="text-xl font-bold text-green-800">
                🌟 Solar pays for itself in 3-4 years, then it's FREE electricity for 25+ years!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 hover:shadow-xl transition-all">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                🛡️ Protect Your Family's Future!
              </h3>
              <p className="text-lg text-orange-700 mb-4">
                Climate change means higher electricity bills, water scarcity, and crop failures.
              </p>
              <p className="text-xl font-bold text-orange-800">
                🌞 Solar = Energy Independence + Climate Protection!
              </p>
            </CardContent>
          </Card>
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
            How Solar Panels Work - Simple as 1-2-3-4!
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sun className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Sunlight Hits Panels</h4>
              <p className="text-sm text-gray-600">Solar panels capture free sunlight and convert it into electricity</p>
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

        {/* Urgency Call-to-Action */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ⏰ DON'T WAIT! Every Day Costs You Money! ⏰
          </h2>
          <p className="text-xl mb-6">
            While you're thinking, you're losing ₹100+ daily on electricity bills!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-bold"
              onClick={() => setActiveSection('calculator')}
            >
              🔥 Calculate My Savings NOW!
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg font-bold"
              onClick={() => setActiveSection('schemes')}
            >
              💰 Get Government Money!
            </Button>
          </div>
        </div>

        {/* Success Stories */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Real Success Stories from Rural Andhra Pradesh
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
                <p className="text-gray-600 italic mb-3">
                  "My monthly electricity bill reduced from ₹3,000 to ₹500. The government subsidy made it very affordable!"
                </p>
                <p className="text-green-600 font-bold">💰 Saving ₹2,500 every month!</p>
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
                <p className="text-gray-600 italic mb-3">
                  "Solar panels on our roof now power our entire house. We save ₹2,000 every month!"
                </p>
                <p className="text-green-600 font-bold">🌟 Best decision of our lives!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
