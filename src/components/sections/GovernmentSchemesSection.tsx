import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  IndianRupee, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  ExternalLink,
  Download,
  MapPin
} from 'lucide-react';

interface GovernmentScheme {
  id: string;
  name: string;
  nameHi: string;
  nameTe: string;
  category: string[];
  incomeLimit: string[];
  subsidyPercentage: number;
  maxSubsidy: string;
  eligibility: string;
  eligibilityHi: string;
  eligibilityTe: string;
  documents: string[];
  documentsHi: string[];
  documentsTe: string[];
  applicationUrl: string;
  helplineNumber: string;
  state: string;
  type: 'central' | 'state';
  description: string;
  descriptionHi: string;
  descriptionTe: string;
  benefits: string[];
  benefitsHi: string[];
  benefitsTe: string[];
}

const GovernmentSchemesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIncome, setSelectedIncome] = useState('');
  const [selectedState, setSelectedState] = useState('ap');
  const [householdSize, setHouseholdSize] = useState('');
  const [landOwnership, setLandOwnership] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState<GovernmentScheme[]>([]);
  const [showResults, setShowResults] = useState(false);

  const sectionRef = useScrollAnimation('.scheme-card', {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8 }
  });

  const schemes: GovernmentScheme[] = [
    {
      id: 'pm-kusum-rooftop',
      name: 'PM-KUSUM Rooftop Solar Scheme',
      nameHi: 'PM-KUSUM रूफटॉप सोलर योजना',
      nameTe: 'PM-KUSUM రూఫ్‌టాప్ సోలార్ పథకం',
      category: ['general', 'sc', 'st', 'obc', 'farmer'],
      incomeLimit: ['below2lakh', '2to5lakh'],
      subsidyPercentage: 30,
      maxSubsidy: '₹14,588 per kW (up to 3kW), ₹7,294 per kW (above 3kW)',
      eligibility: 'Rural households, farmers, cooperative societies with valid electricity connection',
      eligibilityHi: 'ग्रामीण परिवार, किसान, सहकारी समितियां जिनके पास वैध बिजली कनेक्शन है',
      eligibilityTe: 'గ్రామీణ కుటుంబాలు, రైతులు, చెల్లుబాటు అయ్యే విద్యుత్ కనెక్షన్ ఉన్న సహకార సంఘాలు',
      documents: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate (if applicable)', 'Electricity Bill', 'Bank Account Details', 'Land Documents'],
      documentsHi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'जाति प्रमाण पत्र (यदि लागू हो)', 'बिजली बिल', 'बैंक खाता विवरण', 'भूमि दस्तावेज'],
      documentsTe: ['ఆధార్ కార్డ్', 'ఆదాయ ధృవీకరణ పత్రం', 'కుల ధృవీకరణ పత్రం (వర్తించినట్లయితే)', 'విద్యుత్ బిల్లు', 'బ్యాంక్ ఖాతా వివరాలు', 'భూమి పత్రాలు'],
      applicationUrl: 'https://mnre.gov.in/',
      helplineNumber: '1800-180-3333',
      state: 'all',
      type: 'central',
      description: 'Central government scheme providing 30% subsidy for rooftop solar installations for rural households and farmers',
      descriptionHi: 'ग्रामीण परिवारों और किसानों के लिए रूफटॉप सोलर इंस्टॉलेशन पर 30% सब्सिडी प्रदान करने वाली केंद्र सरकार की योजना',
      descriptionTe: 'గ్రామీణ కుటుంబాలు మరియు రైతుల కోసం రూఫ్‌టాప్ సోలార్ ఇన్‌స్టాలేషన్‌లపై 30% సబ్సిడీ అందించే కేంద్ర ప్రభుత్వ పథకం',
      benefits: ['30% subsidy on system cost', 'Reduced electricity bills', 'Net metering facility', 'Environmental benefits'],
      benefitsHi: ['सिस्टम लागत पर 30% सब्सिडी', 'कम बिजली बिल', 'नेट मीटरिंग सुविधा', 'पर्यावरणीय लाभ'],
      benefitsTe: ['సిస్టమ్ ఖర్చుపై 30% సబ్సిడీ', 'తగ్గిన విద్యుత్ బిల్లులు', 'నెట్ మీటరింగ్ సౌకర్యం', 'పర్యావరణ ప్రయోజనాలు']
    },
    {
      id: 'ap-solar-policy-2024',
      name: 'Andhra Pradesh Solar Policy 2024',
      nameHi: 'आंध्र प्रदेश सोलर नीति 2024',
      nameTe: 'ఆంధ్రప్రదేశ్ సోలార్ పాలసీ 2024',
      category: ['general', 'sc', 'st', 'obc', 'farmer'],
      incomeLimit: ['below2lakh', '2to5lakh', '5to10lakh'],
      subsidyPercentage: 40,
      maxSubsidy: '₹20,000 per kW (up to 5kW for farmers)',
      eligibility: 'AP residents, agricultural consumers, domestic consumers with valid electricity connection',
      eligibilityHi: 'AP निवासी, कृषि उपभोक्ता, वैध बिजली कनेक्शन वाले घरेलू उपभोक्ता',
      eligibilityTe: 'AP నివాసులు, వ్యవసాయ వినియోగదారులు, చెల్లుబాటు అయ్యే విద్యుత్ కనెక్షన్ ఉన్న గృహ వినియోగదారులు',
      documents: ['AP Residence Certificate', 'Electricity Bill', 'Aadhaar Card', 'Income Certificate', 'Caste Certificate (if applicable)', 'Bank Details'],
      documentsHi: ['AP निवास प्रमाण पत्र', 'बिजली बिल', 'आधार कार्ड', 'आय प्रमाण पत्र', 'जाति प्रमाण पत्र (यदि लागू हो)', 'बैंक विवरण'],
      documentsTe: ['AP నివాస ధృవీకరణ పత్రం', 'విద్యుత్ బిల్లు', 'ఆధార్ కార్డ్', 'ఆదాయ ధృవీకరణ పత్రం', 'కుల ధృవీకరణ పత్రం (వర్తించినట్లయితే)', 'బ్యాంక్ వివరాలు'],
      applicationUrl: 'https://nredcap.ap.gov.in/',
      helplineNumber: '0863-2340544',
      state: 'ap',
      type: 'state',
      description: 'Enhanced state subsidy for AP residents with special benefits for farmers and rural communities',
      descriptionHi: 'किसानों और ग्रामीण समुदायों के लिए विशेष लाभ के साथ AP निवासियों के लिए बढ़ी हुई राज्य सब्सिडी',
      descriptionTe: 'రైతులు మరియు గ్రామీణ సమాజాలకు ప్రత్యేక ప్రయోజనాలతో AP నివాసులకు మెరుగైన రాష్ట్র సబ్సిడీ',
      benefits: ['40% state subsidy', 'Additional farmer benefits', 'Priority processing', 'Free maintenance for 2 years'],
      benefitsHi: ['40% राज्य सब्सिडी', 'अतिरिक्त किसान लाभ', 'प्राथमिकता प्रसंस्करण', '2 साल के लिए मुफ्त रखरखाव'],
      benefitsTe: ['40% రాష్ట్र సబ్సిడీ', 'అదనపు రైతు ప్రయోజనాలు', 'ప్రాధాన్యత ప్రాసెసింగ్', '2 సంవత్సరాలకు ఉచిత నిర్వహణ']
    },
    {
      id: 'grid-connected-rooftop',
      name: 'Grid Connected Rooftop Solar Programme',
      nameHi: 'ग्रिड कनेक्टेड रूफटॉप सोलर कार्यक्रम',
      nameTe: 'గ్రిడ్ కనెక్టెడ్ రూఫ్‌టాప్ సోలార్ కార్యక్రమం',
      category: ['general', 'sc', 'st', 'obc'],
      incomeLimit: ['2to5lakh', '5to10lakh'],
      subsidyPercentage: 20,
      maxSubsidy: '₹14,588 per kW (up to 3kW), ₹7,294 per kW (above 3kW)',
      eligibility: 'Residential, institutional, social and government sectors with grid connectivity',
      eligibilityHi: 'ग्रिड कनेक्टिविटी के साथ आवासीय, संस्थागत, सामाजिक और सरकारी क्षेत्र',
      eligibilityTe: 'గ్రిడ్ కనెక్టివిటీతో నివాస, సంస్థాగత, సామాజిక మరియు ప్రభుత్వ రంగాలు',
      documents: ['Property Documents', 'Identity Proof', 'Address Proof', 'Electricity Connection Details', 'Bank Account'],
      documentsHi: ['संपत्ति दस्तावेज', 'पहचान प्रमाण', 'पता प्रमाण', 'बिजली कनेक्शन विवरण', 'बैंक खाता'],
      documentsTe: ['ఆస్తి పత్రాలు', 'గుర్తింపు రుజువు', 'చిరునామా రుజువు', 'విద్యుత్ కనెక్షన్ వివరాలు', 'బ్యాంక్ ఖాతా'],
      applicationUrl: 'https://solarrooftop.gov.in/',
      helplineNumber: '1800-180-3333',
      state: 'all',
      type: 'central',
      description: 'National programme for grid-connected rooftop solar systems with net metering benefits',
      descriptionHi: 'नेट मीटरिंग लाभ के साथ ग्रिड-कनेक्टेड रूफटॉप सोलर सिस्टम के लिए राष्ट्रीय कार्यक्रम',
      descriptionTe: 'నెట్ మీటరింగ్ ప్రయోజనాలతో గ్రిడ్-కనెక్టెడ్ రూఫ్‌టాప్ సోలార్ సిస్టమ్‌ల కోసం జాతీయ కార్యక్రమం',
      benefits: ['20% central subsidy', 'Net metering facility', 'Sell excess power', 'Reduced carbon footprint'],
      benefitsHi: ['20% केंद्रीय सब्सिडी', 'नेट मीटरिंग सुविधा', 'अतिरिक्त बिजली बेचें', 'कम कार्बन फुटप्रिंट'],
      benefitsTe: ['20% కేంద్ర సబ్సిడీ', 'నెట్ మీటరింగ్ సౌకర్యం', 'అదనపు విద్యుత్ అమ్మకం', 'తగ్గిన కార్బన్ పాదముద్ర']
    },
    {
      id: 'sc-st-special-scheme',
      name: 'SC/ST Special Solar Subsidy Scheme',
      nameHi: 'SC/ST विशेष सोलर सब्सिडी योजना',
      nameTe: 'SC/ST ప్రత్యేక సోలార్ సబ్సిడీ పథకం',
      category: ['sc', 'st'],
      incomeLimit: ['below2lakh', '2to5lakh'],
      subsidyPercentage: 50,
      maxSubsidy: '₹25,000 per kW (up to 3kW)',
      eligibility: 'SC/ST families with valid caste certificate and below poverty line status',
      eligibilityHi: 'वैध जाति प्रमाण पत्र और गरीबी रेखा से नीचे की स्थिति वाले SC/ST परिवार',
      eligibilityTe: 'చెల్లుబాటు అయ్యే కుల ధృవీకరణ పత్రం మరియు దారిద్య్ర రేఖకు దిగువన ఉన్న SC/ST కుటుంబాలు',
      documents: ['Caste Certificate', 'BPL Card', 'Aadhaar Card', 'Income Certificate', 'Electricity Bill', 'Bank Details'],
      documentsHi: ['जाति प्रमाण पत्र', 'BPL कार्ड', 'आधार कार्ड', 'आय प्रमाण पत्र', 'बिजली बिल', 'बैंक विवरण'],
      documentsTe: ['కుల ధృవీకరణ పత్రం', 'BPL కార్డ్', 'ఆధార్ కార్డ్', 'ఆదాయ ధృవీకరణ పత్రం', 'విద్యుత్ బిల్లు', 'బ్యాంక్ వివరాలు'],
      applicationUrl: 'https://mnre.gov.in/',
      helplineNumber: '1800-180-3333',
      state: 'all',
      type: 'central',
      description: 'Special enhanced subsidy scheme for SC/ST communities to promote solar energy adoption',
      descriptionHi: 'सोलर ऊर्जा अपनाने को बढ़ावा देने के लिए SC/ST समुदायों के लिए विशेष बढ़ी हुई सब्सिडी योजना',
      descriptionTe: 'సోలార్ ఎనర్జీ స్వీకరణను ప్రోత్సహించడానికి SC/ST కమ్యూనిటీల కోసం ప్రత్యేక మెరుగైన సబ్సిడీ పథకం',
      benefits: ['50% enhanced subsidy', 'Priority processing', 'Free technical support', 'Extended warranty'],
      benefitsHi: ['50% बढ़ी हुई सब्सिडी', 'प्राथमिकता प्रसंस्करण', 'मुफ्त तकनीकी सहायता', 'विस्तारित वारंटी'],
      benefitsTe: ['50% మెరుగైన సబ్సిడీ', 'ప్రాధాన్యత ప్రాసెసింగ్', 'ఉచిత సాంకేతిక మద్దతు', 'పొడిగించిన వారంటీ']
    }
  ];

  const findEligibleSchemes = () => {
    let filtered = schemes.filter(scheme => {
      let matches = true;
      
      // Check caste category
      if (selectedCategory && !scheme.category.includes(selectedCategory)) {
        matches = false;
      }
      
      // Check income level
      if (selectedIncome && !scheme.incomeLimit.includes(selectedIncome)) {
        matches = false;
      }
      
      // Check state
      if (selectedState && scheme.state !== 'all' && scheme.state !== selectedState) {
        matches = false;
      }
      
      return matches;
    });
    
    setFilteredSchemes(filtered);
    setShowResults(true);
  };

  const getLocalizedText = (scheme: GovernmentScheme, field: keyof Pick<GovernmentScheme, 'name' | 'eligibility' | 'description'>) => {
    const fieldMap = {
      name: { hi: 'nameHi', te: 'nameTe' },
      eligibility: { hi: 'eligibilityHi', te: 'eligibilityTe' },
      description: { hi: 'descriptionHi', te: 'descriptionTe' }
    };
    
    if (language === 'hi') return scheme[fieldMap[field].hi as keyof GovernmentScheme] as string;
    if (language === 'te') return scheme[fieldMap[field].te as keyof GovernmentScheme] as string;
    return scheme[field];
  };

  const getLocalizedArray = (scheme: GovernmentScheme, field: 'documents' | 'benefits') => {
    const fieldMap = {
      documents: { hi: 'documentsHi', te: 'documentsTe' },
      benefits: { hi: 'benefitsHi', te: 'benefitsTe' }
    };
    
    if (language === 'hi') return scheme[fieldMap[field].hi as keyof GovernmentScheme] as string[];
    if (language === 'te') return scheme[fieldMap[field].te as keyof GovernmentScheme] as string[];
    return scheme[field];
  };

  return (
    <section id="schemes-section" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-earth-brown font-medium text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            🏛️ Government Support
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Solar <span className="text-gradient">Government Schemes</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Find government subsidies and schemes available for your family. 
            Get financial support to make solar energy affordable for everyone.
          </motion.p>
        </div>

        {/* Eligibility Form */}
        <motion.div
          className="scheme-card mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-earth-brown text-center flex items-center justify-center">
                <Users className="h-6 w-6 mr-3 text-solar-yellow" />
                Check Your Eligibility for Solar Subsidies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Caste Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Social Category / जाति श्रेणी / సామాజిక వర్గం
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-gray-300 focus:border-solar-yellow">
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="general">General / सामान्य / సాధారణ</SelectItem>
                      <SelectItem value="sc">SC (Scheduled Caste) / अनुसूचित जाति / షెడ్యూల్డ్ కాస్ట్</SelectItem>
                      <SelectItem value="st">ST (Scheduled Tribe) / अनुसूचित जनजाति / షెడ్యూల్డ్ ట్రైబ్</SelectItem>
                      <SelectItem value="obc">OBC (Other Backward Class) / अन्य पिछड़ा वर्ग / ఇతర వెనుకబడిన వర్గం</SelectItem>
                      <SelectItem value="farmer">Farmer / किसान / రైతు</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Annual Family Income / वार्षिक पारिवारिक आय / వార్షిక కుటుంబ ఆదాయం
                  </Label>
                  <Select value={selectedIncome} onValueChange={setSelectedIncome}>
                    <SelectTrigger className="border-gray-300 focus:border-solar-yellow">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="below2lakh">Below ₹2 Lakh / ₹2 लाख से कम / ₹2 లక్షల కంటే తక్కువ</SelectItem>
                      <SelectItem value="2to5lakh">₹2-5 Lakh / ₹2-5 लाख / ₹2-5 లక్షలు</SelectItem>
                      <SelectItem value="5to10lakh">₹5-10 Lakh / ₹5-10 लाख / ₹5-10 లక్షలు</SelectItem>
                      <SelectItem value="above10lakh">Above ₹10 Lakh / ₹10 लाख से अधिक / ₹10 లక్షలకు మించి</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    State / राज्य / రాష్ట్రం
                  </Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="border-gray-300 focus:border-solar-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="ap">Andhra Pradesh / आंध्र प्रदेश / ఆంధ్రప్రదేశ్</SelectItem>
                      <SelectItem value="ts">Telangana / तेलंगाना / తెలంగాణ</SelectItem>
                      <SelectItem value="ka">Karnataka / कर्नाटक / కర్ణాటక</SelectItem>
                      <SelectItem value="tn">Tamil Nadu / तमिल नाडु / తమిళనాడు</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Household Size */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Family Size / परिवार का आकार / కుటుంబ పరిమాణం
                  </Label>
                  <Select value={householdSize} onValueChange={setHouseholdSize}>
                    <SelectTrigger className="border-gray-300 focus:border-solar-yellow">
                      <SelectValue placeholder="Number of family members" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1-2">1-2 Members / सदस्य / సభ్యులు</SelectItem>
                      <SelectItem value="3-4">3-4 Members / सदस्य / సభ్యులు</SelectItem>
                      <SelectItem value="5-6">5-6 Members / सदस्य / సభ్యులు</SelectItem>
                      <SelectItem value="7+">7+ Members / सदस्य / సభ్యులు</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Land Ownership */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Land Ownership / भूमि स्वामित्व / భూమి యాజమాన్యం
                  </Label>
                  <Select value={landOwnership} onValueChange={setLandOwnership}>
                    <SelectTrigger className="border-gray-300 focus:border-solar-yellow">
                      <SelectValue placeholder="Do you own land?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="own-house">Own House / अपना घर / సొంత ఇల్లు</SelectItem>
                      <SelectItem value="agricultural">Agricultural Land / कृषि भूमि / వ్యవసాయ భూమి</SelectItem>
                      <SelectItem value="rented">Rented / किराए पर / అద్దె</SelectItem>
                      <SelectItem value="none">No Land / कोई भूमि नहीं / భూమి లేదు</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  onClick={findEligibleSchemes}
                  className="bg-gradient-to-r from-solar-yellow to-leaf-green text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all text-lg"
                  disabled={!selectedCategory || !selectedIncome}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Find My Eligible Schemes / योजनाएं खोजें / పథకాలను కనుగొనండి
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {filteredSchemes.length > 0 ? (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-earth-brown mb-4">
                    🎉 Great News! You are eligible for {filteredSchemes.length} scheme{filteredSchemes.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-lg text-gray-600">
                    Here are the government schemes you can apply for:
                  </p>
                </div>

                <div className="grid gap-8">
                  {filteredSchemes.map((scheme, index) => (
                    <motion.div
                      key={scheme.id}
                      className="scheme-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Building className="h-6 w-6 text-solar-yellow" />
                                <Badge variant={scheme.type === 'central' ? 'default' : 'secondary'} className="text-xs">
                                  {scheme.type === 'central' ? '🏛️ Central Scheme' : '🏢 State Scheme'}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl md:text-2xl text-earth-brown mb-2">
                                {getLocalizedText(scheme, 'name')}
                              </CardTitle>
                              <p className="text-gray-600 leading-relaxed">
                                {getLocalizedText(scheme, 'description')}
                              </p>
                            </div>
                            <div className="text-center md:text-right">
                              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl">
                                <div className="text-3xl font-bold text-gradient mb-1">
                                  {scheme.subsidyPercentage}%
                                </div>
                                <div className="text-sm text-gray-600">Subsidy</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Max: {scheme.maxSubsidy}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                          {/* Benefits */}
                          <div>
                            <h4 className="font-semibold text-earth-brown mb-3 flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                              Key Benefits / मुख्य लाभ / ముख్య ప్రయోజనాలు
                            </h4>
                            <div className="grid md:grid-cols-2 gap-2">
                              {getLocalizedArray(scheme, 'benefits').map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Eligibility */}
                          <div>
                            <h4 className="font-semibold text-earth-brown mb-3 flex items-center">
                              <Users className="h-5 w-5 mr-2 text-blue-600" />
                              Eligibility / पात्रता / అర్హత
                            </h4>
                            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                              {getLocalizedText(scheme, 'eligibility')}
                            </p>
                          </div>
                          
                          {/* Required Documents */}
                          <div>
                            <h4 className="font-semibold text-earth-brown mb-3 flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-orange-600" />
                              Required Documents / आवश्यक दस्तावेज / అవసరమైన పత్రాలు
                            </h4>
                            <div className="grid md:grid-cols-2 gap-2">
                              {getLocalizedArray(scheme, 'documents').map((doc, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-earth-brown mb-3">
                              Contact & Application / संपर्क और आवेदन / సంప్రదింపు మరియు దరఖాస్తు
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-medium">Helpline:</span>
                                  <span className="text-sm text-blue-600 font-semibold">{scheme.helplineNumber}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <ExternalLink className="h-4 w-4 text-blue-600" />
                                  <a 
                                    href={scheme.applicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    Apply Online / ऑनलाइन आवेदन करें / ఆన్‌లైన్ దరఖాస్తు చేయండి
                                  </a>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  onClick={() => window.open(scheme.applicationUrl, '_blank')}
                                  className="bg-gradient-to-r from-solar-yellow to-leaf-green text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                                >
                                  Apply Now / अभी आवेदन करें / ఇప్పుడే దరఖాస్తు చేయండి
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="border-0 shadow-lg bg-orange-50">
                  <CardContent className="p-8">
                    <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-orange-800 mb-4">
                      No schemes found for your current selection
                    </h3>
                    <p className="text-orange-700 mb-6">
                      Don't worry! Try adjusting your criteria or contact our helpline for personalized assistance.
                    </p>
                    <div className="space-y-2">
                      <p className="text-orange-600 font-semibold">
                        📞 Call our Solar Helpline: 1800-180-3333
                      </p>
                      <p className="text-orange-600">
                        Our experts will help you find the best scheme for your situation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          className="mt-16 scheme-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-earth-brown mb-4">
                Need Help with Applications? / आवेदन में सहायता चाहिए? / దరఖాస్తులలో సహాయం కావాలా?
              </h3>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                Our team of experts is here to help you navigate government schemes and complete your applications. 
                We provide free guidance to rural communities.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Free Helpline</h4>
                  <p className="text-green-600 font-bold">1800-180-3333</p>
                </div>
                <div className="text-center">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Email Support</h4>
                  <p className="text-blue-600 font-bold">schemes@solarsaathi.in</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Local Centers</h4>
                  <p className="text-orange-600 font-bold">Visit Nearby Office</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default GovernmentSchemesSection;