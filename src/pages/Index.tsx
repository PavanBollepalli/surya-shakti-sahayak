
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SolarCalculator from '../components/SolarCalculator';
import SchemesFinder from '../components/SchemesFinder';
import ResourcesSection from '../components/ResourcesSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { user, loading } = useAuth();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth';
    }
  }, [user, loading]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection setActiveSection={setActiveSection} />;
      case 'calculator':
        return <SolarCalculator />;
      case 'schemes':
        return <SchemesFinder />;
      case 'resources':
        return <ResourcesSection />;
      default:
        return <HeroSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main>
          {renderActiveSection()}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">SolarSeva</h3>
                <p className="text-gray-300">
                  Empowering rural India with clean, affordable solar energy solutions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><button onClick={() => setActiveSection('calculator')} className="hover:text-white">Solar Calculator</button></li>
                  <li><button onClick={() => setActiveSection('schemes')} className="hover:text-white">Government Schemes</button></li>
                  <li><button onClick={() => setActiveSection('resources')} className="hover:text-white">Resources</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-gray-300">
                  Helpline: 1800-180-3333<br />
                  Email: support@solarseva.in<br />
                  Available 24/7
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 SolarSeva. Made with ❤️ for Rural India. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default Index;
