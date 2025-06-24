
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    calculator: 'Solar Calculator',
    schemes: 'Government Schemes',
    resources: 'Resources',
    language: 'Language',
    
    // Homepage
    heroTitle: 'Harness Solar Power for Your Home',
    heroSubtitle: 'Discover how solar energy can reduce your electricity bills and help the environment. Get personalized recommendations and find government subsidies.',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    
    // Benefits
    benefitsTitle: 'Why Choose Solar Energy?',
    benefit1Title: 'Save Money',
    benefit1Desc: 'Reduce your monthly electricity bills by up to 80%',
    benefit2Title: 'Help Environment',
    benefit2Desc: 'Clean, renewable energy that reduces pollution',
    benefit3Title: 'Government Support',
    benefit3Desc: 'Get subsidies up to 40% on solar installation',
    
    // Calculator
    calcTitle: 'Solar Power Calculator',
    monthlyBill: 'Monthly Electricity Bill (₹)',
    monthlyUnits: 'Monthly Units Consumed',
    rooftopSpace: 'Do you have rooftop space?',
    householdType: 'Household Type',
    calculate: 'Calculate',
    
    // Household Types
    single: 'Single Person',
    family: 'Family',
    farmer: 'Farmer',
    business: 'Small Business',
    
    // Schemes
    schemesTitle: 'Government Solar Schemes',
    casteCategory: 'Category',
    incomeLevel: 'Annual Income',
    state: 'State',
    findSchemes: 'Find Schemes',
    
    // Categories
    general: 'General',
    sc: 'SC (Scheduled Caste)',
    st: 'ST (Scheduled Tribe)',
    bc: 'BC (Backward Class)',
    obc: 'OBC (Other Backward Class)',
    
    // Income Levels
    below2lakh: 'Below ₹2 Lakh',
    '2to5lakh': '₹2-5 Lakh',
    '5to10lakh': '₹5-10 Lakh',
    above10lakh: 'Above ₹10 Lakh',
    
    // Results
    recommendedSystem: 'Recommended Solar System',
    estimatedCost: 'Estimated Cost',
    afterSubsidy: 'After Subsidy',
    monthlySavings: 'Monthly Savings',
    paybackPeriod: 'Payback Period',
    
    // Resources
    resourcesTitle: 'Helpful Resources',
    mnrePortal: 'MNRE Official Portal',
    apNredcap: 'AP NREDCAP Portal',
    nationalRooftop: 'National Rooftop Portal',
    
    // Common
    yes: 'Yes',
    no: 'No',
    apply: 'Apply Now',
    viewDetails: 'View Details',
    eligibility: 'Eligibility',
    subsidy: 'Subsidy Amount',
    documents: 'Required Documents'
  },
  
  te: {
    // Navigation (Telugu)
    home: 'హోమ్',
    calculator: 'సోలార్ కాలిక్యులేటర్',
    schemes: 'ప్రభుత్వ పథకాలు',
    resources: 'వనరులు',
    language: 'భాష',
    
    // Homepage
    heroTitle: 'మీ ఇంటికి సౌర శక్తిని వినియోగించండి',
    heroSubtitle: 'సౌర శక్తి మీ విద్యుత్ బిల్లులను ఎలా తగ్గిస్తుందో మరియు పర్యావరణానికి ఎలా సహాయపడుతుందో తెలుసుకోండి. వ్యక్తిగత సిఫార్సులు మరియు ప్రభుత్వ సబ్సిడీలను పొందండి.',
    learnMore: 'మరింత తెలుసుకోండి',
    getStarted: 'ప్రారంభించండి',
    
    // Benefits
    benefitsTitle: 'సౌర శక్తిని ఎందుకు ఎంచుకోవాలి?',
    benefit1Title: 'డబ్బు ఆదా చేయండి',
    benefit1Desc: 'మీ నెలవారీ విద్యుత్ బిల్లులను 80% వరకు తగ్గించండి',
    benefit2Title: 'పర్యావరణానికి సహాయం',
    benefit2Desc: 'కాలుష్యాన్ని తగ్గించే శుభ్రమైన, పునరుత్పాదక శక్తి',
    benefit3Title: 'ప్రభుత్వ మద్దతు',
    benefit3Desc: 'సౌర సంస్థాపనపై 40% వరకు సబ్సిడీలు పొందండి',
    
    // Calculator
    calcTitle: 'సౌర శక్తి కాలిక్యులేటర్',
    monthlyBill: 'నెలవారీ విద్యుత్ బిల్లు (₹)',
    monthlyUnits: 'నెలవారీ యూనిట్లు వినియోగం',
    rooftopSpace: 'మీకు పైకప్పు స్థలం ఉందా?',
    householdType: 'ఇంటి రకం',
    calculate: 'లెక్కించండి',
    
    // Household Types
    single: 'ఒకే వ్యక్తి',
    family: 'కుటుంబం',
    farmer: 'రైతు',
    business: 'చిన్న వ్యాపారం',
    
    // Schemes
    schemesTitle: 'ప్రభుత్వ సౌర పథకాలు',
    casteCategory: 'వర్గం',
    incomeLevel: 'వార్షిక ఆదాయం',
    state: 'రాష్ట్రం',
    findSchemes: 'పథకాలను కనుగొనండి',
    
    // Categories
    general: 'సాధారణ',
    sc: 'SC (షెడ్యూల్డ్ కాస్ట్)',
    st: 'ST (షెడ్యూల్డ్ ట్రైబ్)',
    bc: 'BC (వెనుకబడిన వర్గం)',
    obc: 'OBC (ఇతర వెనుకబడిన వర్గం)',
    
    // Income Levels
    below2lakh: '₹2 లక్షల కంటే తక్కువ',
    '2to5lakh': '₹2-5 లక్షలు',
    '5to10lakh': '₹5-10 లక్షలు',
    above10lakh: '₹10 లక్షలకు మించి',
    
    // Results
    recommendedSystem: 'సిఫార్సు చేయబడిన సౌర వ్యవస్థ',
    estimatedCost: 'అంచనా వేసిన ఖర్చు',
    afterSubsidy: 'సబ్సిడీ తర్వాత',
    monthlySavings: 'నెలవారీ పొదుపు',
    paybackPeriod: 'రాబడి కాలం',
    
    // Resources
    resourcesTitle: 'సహాయకరమైన వనరులు',
    mnrePortal: 'MNRE అధికారిక పోర్టల్',
    apNredcap: 'AP NREDCAP పోర్టల్',
    nationalRooftop: 'జాతీయ రూఫ్టాప్ పోర్టల్',
    
    // Common
    yes: 'అవును',
    no: 'లేదు',
    apply: 'ఇప్పుడే దరఖాస్తు చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    eligibility: 'అర్హత',
    subsidy: 'సబ్సిడీ మొత్తం',
    documents: 'అవసరమైన పత్రాలు'
  },
  
  hi: {
    // Navigation (Hindi)
    home: 'होम',
    calculator: 'सोलर कैलकुलेटर',
    schemes: 'सरकारी योजनाएं',
    resources: 'संसाधन',
    language: 'भाषा',
    
    // Homepage
    heroTitle: 'अपने घर के लिए सौर ऊर्जा का उपयोग करें',
    heroSubtitle: 'जानिए कि सौर ऊर्जा आपके बिजली के बिल को कैसे कम कर सकती है और पर्यावरण की मदद कर सकती है। व्यक्तिगत सिफारिशें प्राप्त करें और सरकारी सब्सिडी पाएं।',
    learnMore: 'और जानें',
    getStarted: 'शुरू करें',
    
    // Benefits
    benefitsTitle: 'सौर ऊर्जा क्यों चुनें?',
    benefit1Title: 'पैसे बचाएं',
    benefit1Desc: 'अपने मासिक बिजली बिल को 80% तक कम करें',
    benefit2Title: 'पर्यावरण की मदद',
    benefit2Desc: 'स्वच्छ, नवीकरणीय ऊर्जा जो प्रदूषण को कम करती है',
    benefit3Title: 'सरकारी सहायता',
    benefit3Desc: 'सौर स्थापना पर 40% तक सब्सिडी प्राप्त करें',
    
    // Calculator
    calcTitle: 'सौर ऊर्जा कैलकुलेटर',
    monthlyBill: 'मासिक बिजली बिल (₹)',
    monthlyUnits: 'मासिक यूनिट खपत',
    rooftopSpace: 'क्या आपके पास छत की जगह है?',
    householdType: 'घरेलू प्रकार',
    calculate: 'गणना करें',
    
    // Household Types
    single: 'अकेला व्यक्ति',
    family: 'परिवार',
    farmer: 'किसान',
    business: 'छोटा व्यापार',
    
    // Schemes
    schemesTitle: 'सरकारी सौर योजनाएं',
    casteCategory: 'श्रेणी',
    incomeLevel: 'वार्षिक आय',
    state: 'राज्य',
    findSchemes: 'योजनाएं खोजें',
    
    // Categories
    general: 'सामान्य',
    sc: 'SC (अनुसूचित जाति)',
    st: 'ST (अनुसूचित जनजाति)',
    bc: 'BC (पिछड़ा वर्ग)',
    obc: 'OBC (अन्य पिछड़ा वर्ग)',
    
    // Income Levels
    below2lakh: '₹2 लाख से कम',
    '2to5lakh': '₹2-5 लाख',
    '5to10lakh': '₹5-10 लाख',
    above10lakh: '₹10 लाख से अधिक',
    
    // Results
    recommendedSystem: 'अनुशंसित सौर प्रणाली',
    estimatedCost: 'अनुमानित लागत',
    afterSubsidy: 'सब्सिडी के बाद',
    monthlySavings: 'मासिक बचत',
    paybackPeriod: 'वापसी अवधि',
    
    // Resources
    resourcesTitle: 'सहायक संसाधन',
    mnrePortal: 'MNRE आधिकारिक पोर्टल',
    apNredcap: 'AP NREDCAP पोर्टल',
    nationalRooftop: 'राष्ट्रीय रूफटॉप पोर्टल',
    
    // Common
    yes: 'हां',
    no: 'नहीं',
    apply: 'अभी आवेदन करें',
    viewDetails: 'विवरण देखें',
    eligibility: 'पात्रता',
    subsidy: 'सब्सिडी राशि',
    documents: 'आवश्यक दस्तावेज'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
