
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  nameTe: string;
  category: string[];
  incomeLimit: string;
  subsidyPercentage: number;
  subsidyAmount: string;
  eligibility: string;
  eligibilityHi: string;
  eligibilityTe: string;
  documents: string[];
  documentsHi: string[];
  documentsTe: string[];
  applicationUrl: string;
  state: string;
  type: 'central' | 'state';
}

const SchemesFinder = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIncome, setSelectedIncome] = useState('');
  const [selectedState, setSelectedState] = useState('ap');
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);

  const schemes: Scheme[] = [
    {
      id: 'rooftop-solar-central',
      name: 'PM-KUSUM (Rooftop Solar)',
      nameHi: 'PM-KUSUM (रूफटॉप सोलर)',
      nameTe: 'PM-KUSUM (రూఫ్టాప్ సోలార్)',
      category: ['general', 'sc', 'st', 'bc', 'obc'],
      incomeLimit: 'below2lakh',
      subsidyPercentage: 30,
      subsidyAmount: 'Up to ₹14,588 per kW',
      eligibility: 'Rural households, farmers, cooperative societies',
      eligibilityHi: 'ग्रामीण परिवार, किसान, सहकारी समितियां',
      eligibilityTe: 'గ్రామీణ కుటుంబాలు, రైతులు, సహకార సంఘాలు',
      documents: ['Aadhaar Card', 'Income Certificate', 'Land Documents', 'Bank Account'],
      documentsHi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'भूमि दस्तावेज', 'बैंक खाता'],
      documentsTe: ['ఆధార్ కార్డ్', 'ఆదాయ ధృవీకరణ పత్రం', 'భూమి పత్రాలు', 'బ్యాంక్ ఖాతా'],
      applicationUrl: 'https://mnre.gov.in/',
      state: 'all',
      type: 'central'
    },
    {
      id: 'ap-solar-policy',
      name: 'AP Solar Policy 2024',
      nameHi: 'AP सोलर नीति 2024',
      nameTe: 'AP సోలార్ పాలసీ 2024',
      category: ['general', 'sc', 'st', 'bc'],
      incomeLimit: '5to10lakh',
      subsidyPercentage: 40,
      subsidyAmount: 'Up to ₹20,000 per kW',
      eligibility: 'AP residents, agricultural consumers, domestic consumers',
      eligibilityHi: 'AP निवासी, कृषि उпотребители, घरेलू उपभोक्ता',
      eligibilityTe: 'AP నివాసులు, వ్యవసాయ వినియోగదారులు, గృహ వినియోగదారులు',
      documents: ['AP Resident Certificate', 'Electricity Bill', 'Caste Certificate', 'Bank Details'],
      documentsHi: ['AP निवास प्रमाण पत्र', 'बिजली बिल', 'जाति प्रमाण पत्र', 'बैंक विवरण'],
      documentsTe: ['AP నివాస ధృవీకరణ పత్రం', 'విద్యుత్ బిల్లు', 'కుల ధృవీకరణ పత్రం', 'బ్యాంక్ వివరాలు'],
      applicationUrl: 'https://nredcap.ap.gov.in/',
      state: 'ap',
      type: 'state'
    },
    {
      id: 'grid-connected-rooftop',
      name: 'Grid Connected Rooftop Solar Programme',
      nameHi: '🎍ग ग्रिड कनेक्टेड रूफटॉप सोलर कार्यक्रम',
      nameTe: 'గ్రిడ్ కనెక్టెడ్ రూఫ్టాప్ సోలార్ కార్యక్రమం',
      category: ['general', 'sc', 'st'],
      incomeLimit: '2to5lakh',
      subsidyPercentage: 20,
      subsidyAmount: '₹14,588 per kW (up to 3kW), ₹7,294 per kW (above 3kW)',
      eligibility: 'Residential, institutional, social and government sectors',
      eligibilityHi: 'आवासीय, संस्थागत, सामाजिक और सरकारी क्षेत्र',
      eligibilityTe: 'నివాస, సంస్థాగత, సామాజిక మరియు ప్రభుత్వ రంగాలు',
      documents: ['Property Documents', 'Identity Proof', 'Address Proof', 'Electricity Connection'],
      documentsHi: ['संपत्ति दस्तावेज', 'पहचान प्रमाण', 'पता प्रमाण', 'बिजली कनेक्शन'],
      documentsTe: ['ఆస్తి పత్రాలు', 'గుర్తింపు రుజువు', 'చిరునామా రుజువు', 'విద్యుత్ కనెక్షన్'],
      applicationUrl: 'https://solarrooftop.gov.in/',
      state: 'all',
      type: 'central'
    }
  ];

  const findSchemes = () => {
    let filtered = schemes.filter(scheme => {
      let matches = true;
      
      if (selectedCategory && !scheme.category.includes(selectedCategory)) {
        matches = false;
      }
      
      if (selectedState && scheme.state !== 'all' && scheme.state !== selectedState) {
        matches = false;
      }
      
      return matches;
    });
    
    setFilteredSchemes(filtered);
  };

  const getLocalizedText = (scheme: Scheme, field: 'name' | 'eligibility') => {
    if (language === 'hi') return scheme[`${field}Hi` as keyof Scheme] as string;
    if (language === 'te') return scheme[`${field}Te` as keyof Scheme] as string;
    return scheme[field];
  };

  const getLocalizedDocuments = (scheme: Scheme) => {
    if (language === 'hi') return scheme.documentsHi;
    if (language === 'te') return scheme.documentsTe;
    return scheme.documents;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-700">
            {t('schemesTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('casteCategory')}</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="general">{t('general')}</SelectItem>
                  <SelectItem value="sc">{t('sc')}</SelectItem>
                  <SelectItem value="st">{t('st')}</SelectItem>
                  <SelectItem value="bc">{t('bc')}</SelectItem>
                  <SelectItem value="obc">{t('obc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('incomeLevel')}</label>
              <Select value={selectedIncome} onValueChange={setSelectedIncome}>
                <SelectTrigger>
                  <SelectValue placeholder="Select income level" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="below2lakh">{t('below2lakh')}</SelectItem>
                  <SelectItem value="2to5lakh">{t('2to5lakh')}</SelectItem>
                  <SelectItem value="5to10lakh">{t('5to10lakh')}</SelectItem>
                  <SelectItem value="above10lakh">{t('above10lakh')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('state')}</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="ap">Andhra Pradesh</SelectItem>
                  <SelectItem value="ts">Telangana</SelectItem>
                  <SelectItem value="ka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={findSchemes}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!selectedCategory}
          >
            {t('findSchemes')}
          </Button>
        </CardContent>
      </Card>

      {filteredSchemes.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Available Schemes ({filteredSchemes.length})</h3>
          
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-green-700">
                      {getLocalizedText(scheme, 'name')}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={scheme.type === 'central' ? 'default' : 'secondary'}>
                        {scheme.type === 'central' ? 'Central Scheme' : 'State Scheme'}
                      </Badge>
                      <Badge variant="outline">
                        {scheme.subsidyPercentage}% {t('subsidy')}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => window.open(scheme.applicationUrl, '_blank')}
                  >
                    {t('apply')} <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{t('subsidy')}</h4>
                  <p className="text-green-600 font-semibold">{scheme.subsidyAmount}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{t('eligibility')}</h4>
                  <p className="text-gray-600">{getLocalizedText(scheme, 'eligibility')}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{t('documents')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {getLocalizedDocuments(scheme).map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredSchemes.length === 0 && selectedCategory && (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-gray-500">No schemes found for the selected criteria. Try adjusting your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SchemesFinder;
