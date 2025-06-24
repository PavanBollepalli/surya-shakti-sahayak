
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, Mail, FileText, HelpCircle } from 'lucide-react';

const ResourcesSection = () => {
  const { t } = useLanguage();

  const resources = [
    {
      title: t('mnrePortal'),
      description: 'Ministry of New and Renewable Energy - Official solar schemes portal',
      url: 'https://mnre.gov.in/',
      icon: <FileText className="h-6 w-6 text-green-600" />
    },
    {
      title: t('apNredcap'),
      description: 'Andhra Pradesh New and Renewable Energy Development Corporation',
      url: 'https://nredcap.ap.gov.in/',
      icon: <FileText className="h-6 w-6 text-blue-600" />
    },
    {
      title: t('nationalRooftop'),
      description: 'National Portal for Rooftop Solar Applications',
      url: 'https://solarrooftop.gov.in/',
      icon: <FileText className="h-6 w-6 text-orange-600" />
    }
  ];

  const helplines = [
    {
      title: 'Solar Helpline (Toll Free)',
      contact: '1800-180-3333',
      icon: <Phone className="h-5 w-5 text-green-600" />
    },
    {
      title: 'MNRE Email Support',
      contact: 'rooftopsolar@mnre.gov.in',
      icon: <Mail className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'AP NREDCAP Helpline',
      contact: '0863-2340544',
      icon: <Phone className="h-5 w-5 text-orange-600" />
    }
  ];

  const faqs = [
    {
      question: 'How long does solar panel installation take?',
      answer: 'Typically 1-3 days for residential installations, depending on system size.',
      questionHi: 'सोलर पैनल की स्थापना में कितना समय लगता है?',
      answerHi: 'आमतौर पर आवासीय स्थापना के लिए 1-3 दिन, सिस्टम के आकार के आधार पर।',
      questionTe: 'సోలార్ ప్యానెల్ ఇన్‌స్టాలేషన్‌కు ఎంత సమయం పడుతుంది?',
      answerTe: 'సాధారణంగా నివాస సంస్థాపనల కోసం 1-3 రోజులు, సిస్టమ్ పరిమాణాన్ని బట్టి.'
    },
    {
      question: 'What is the lifespan of solar panels?',
      answer: '25+ years with minimal maintenance required.',
      questionHi: 'सोलर पैनल का जीवनकाल क्या है?',
      answerHi: 'न्यूनतम रखरखाव के साथ 25+ वर्ष।',
      questionTe: 'సోలార్ ప్యానెల్స్ జీవితకాలం ఎంత?',
      answerTe: 'కనీస నిర్వహణతో 25+ సంవత్సరాలు.'
    },
    {
      question: 'Can solar panels work during monsoon?',
      answer: 'Yes, modern panels work efficiently even in cloudy weather, though output may be reduced.',
      questionHi: 'क्या सोलर पैनल मानसून के दौरान काम कर सकते हैं?',
      answerHi: 'हां, आधुनिक पैनल बादल मौसम में भी कुशलता से काम करते हैं, हालांकि आउटपुट कम हो सकता है।',
      questionTe: 'వానాకాలంలో సోలార్ ప్యానెల్స్ పని చేస్తాయా?',
      answerTe: 'అవును, ఆధునిక ప్యానెల్స్ మేఘావృత వాతావరణంలో కూడా సమర్థవంతంగా పని చేస్తాయి, అయితే అవుట్‌పుట్ తగ్గవచ్చు.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('resourcesTitle')}</h2>
        <p className="text-gray-600">Official portals, helplines, and frequently asked questions</p>
      </div>

      {/* Official Resources */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {resource.icon}
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              <Button 
                onClick={() => window.open(resource.url, '_blank')}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                Visit Portal <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Helplines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {helplines.map((helpline, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {helpline.icon}
                <div>
                  <div className="font-medium text-sm">{helpline.title}</div>
                  <div className="text-blue-600 font-semibold">{helpline.contact}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Support */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="text-center py-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Need Immediate Help?</h3>
          <p className="text-orange-700 mb-4">Contact our dedicated solar energy advisors</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesSection;
