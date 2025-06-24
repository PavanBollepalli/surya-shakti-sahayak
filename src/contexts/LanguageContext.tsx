import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translateService } from '../services/translateService';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  translateText: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ... keep existing code (translations object with all the static translations)

const translations = {
  en: {
    // Header
    solarSeva: "SolarSeva",
    home: "Home",
    calculator: "Calculator",
    schemes: "Schemes",
    resources: "Resources",
    
    // Hero Section
    heroTitle: "Harness the Power of Sun for Rural India",
    heroSubtitle: "Clean, affordable solar energy solutions for every village household",
    
    // Benefits
    benefitsTitle: "Why Choose Solar Energy?",
    benefit1Title: "Save Money",
    benefit1Desc: "Reduce your electricity bills by up to 90% and earn from excess power generation",
    benefit2Title: "Help Environment",
    benefit2Desc: "Reduce carbon footprint and contribute to a cleaner, greener future",
    benefit3Title: "Energy Independence",
    benefit3Desc: "Generate your own power and become independent from grid failures",
    
    // Calculator
    calcTitle: "Solar Power Calculator",
    monthlyBill: "Monthly Electricity Bill (₹)",
    monthlyUnits: "Monthly Units Consumed",
    rooftopSpace: "Do you have rooftop space?",
    householdType: "Household Type",
    yes: "Yes",
    no: "No",
    single: "Single Person",
    family: "Family",
    farmer: "Farmer",
    business: "Business",
    calculate: "Calculate Solar Requirements",
    recommendedSystem: "Your Recommended Solar System",
    estimatedCost: "Estimated Cost",
    subsidy: "Government Subsidy",
    afterSubsidy: "Cost After Subsidy",
    monthlySavings: "Monthly Savings",
    paybackPeriod: "Payback Period",
    
    // Schemes
    schemesTitle: "Government Solar Schemes",
    casteCategory: "Caste Category",
    incomeLevel: "Annual Income Level",
    state: "State",
    general: "General",
    sc: "SC (Scheduled Caste)",
    st: "ST (Scheduled Tribe)",
    obc: "OBC (Other Backward Class)",
    below2lakh: "Below ₹2 Lakh",
    lakh2to5: "₹2-5 Lakh",
    lakh5to10: "₹5-10 Lakh",
    above10lakh: "Above ₹10 Lakh",
    andhraPradesh: "Andhra Pradesh",
    findSchemes: "Find Eligible Schemes",
    eligibleSchemes: "Your Eligible Schemes",
    eligibility: "Eligibility",
    subsidyAmount: "Subsidy Amount",
    documents: "Required Documents",
    deadline: "Application Deadline",
    applyNow: "Apply Now",
    
    // Resources
    resourcesTitle: "Solar Energy Resources",
    officialPortals: "Official Government Portals",
    mnrePortal: "Ministry of New and Renewable Energy",
    nationalRooftop: "National Rooftop Portal",
    apNredcap: "AP New and Renewable Energy Development Corporation",
    solarPolicyAP: "Andhra Pradesh Solar Policy",
    faqTitle: "Frequently Asked Questions",
    contactTitle: "Need Help?",
    helplineNumber: "Solar Helpline: 1800-180-3333",
    emailSupport: "Email: support@solarseva.in",
    available247: "Available 24/7 for assistance"
  },
  
  te: {
    // Header (Telugu)
    solarSeva: "సోలార్ సేవ",
    home: "హోమ్",
    calculator: "కాలిక్యులేటర్",
    schemes: "పథకాలు",
    resources: "వనరులు",
    
    // Hero Section
    heroTitle: "గ్రామీణ భారతదేశానికి సూర్య శక్తిని ఉపయోగించండి",
    heroSubtitle: "ప్రతి గ్రామ కుటుంబానికి స్వచ్ఛమైన, సరసమైన సౌర శక్తి పరిష్కారాలు",
    
    // Benefits
    benefitsTitle: "సౌర శక్తిని ఎందుకు ఎంచుకోవాలి?",
    benefit1Title: "డబ్బు ఆదా చేయండి",
    benefit1Desc: "మీ విద్యుత్ బిల్లులను 90% వరకు తగ్గించండి మరియు అదనపు విద్యుత్ ఉత్పాదన నుండి సంపాదించండి",
    benefit2Title: "పర్యావరణానికి సహాయం చేయండి",
    benefit2Desc: "కార్బన్ పాదముద్రను తగ్గించండి మరియు మరింత స్వచ్ఛమైన, పచ్చని భవిష్యత్తుకు దోహదపడండి",
    benefit3Title: "శక్తి స్వాతంత్ర్యం",
    benefit3Desc: "మీ స్వంత విద్యుత్తును ఉత్పత్తి చేయండి మరియు గ్రిడ్ వైఫల్యాల నుండి స్వతంత్రులు అవ్వండి",
    
    // Calculator
    calcTitle: "సౌర శక్తి కాలిక్యులేటర్",
    monthlyBill: "నెలవారీ విద్యుత్ బిల్లు (₹)",
    monthlyUnits: "నెలవారీ యూనిట్లు వినియోగం",
    rooftopSpace: "మీకు పైకప్పు స్థలం ఉందా?",
    householdType: "కుటుంబ రకం",
    yes: "అవును",
    no: "లేదు",
    single: "ఒకే వ్యక్తి",
    family: "కుటుంబం",
    farmer: "రైతు",
    business: "వ్యాపారం",
    calculate: "సౌర అవసరాలను లెక్కించండి",
    recommendedSystem: "మీకు సిఫార్సు చేయబడిన సౌర వ్యవస్థ",
    estimatedCost: "అంచనా వేసిన ఖర్చు",
    subsidy: "ప్రభుత్వ సబ్సిడీ",
    afterSubsidy: "సబ్సిడీ తర్వాత ఖర్చు",
    monthlySavings: "నెలవారీ ఆదా",
    paybackPeriod: "తిరిగి చెల్లించే కాలం",
    
    // Schemes
    schemesTitle: "ప్రభుత్వ సౌర పథకాలు",
    casteCategory: "కుల వర్గం",
    incomeLevel: "వార్షిక ఆదాయ స్థాయి",
    state: "రాష్ట్రం",
    general: "సాధారణ",
    sc: "SC (షెడ్యూల్డ్ కాస్ట్)",
    st: "ST (షెడ్యూల్డ్ ట్రైబ్)",
    obc: "OBC (ఇతర వెనుకబడిన వర్గం)",
    below2lakh: "₹2 లక్షల కంటే తక్కువ",
    lakh2to5: "₹2-5 లక్షలు",
    lakh5to10: "₹5-10 లక్షలు",
    above10lakh: "₹10 లక్షలకు మించి",
    andhraPradesh: "ఆంధ్ర ప్రదేశ్",
    findSchemes: "అర్హత గల పథకాలను కనుగొనండి",
    eligibleSchemes: "మీ అర్హత గల పథకాలు",
    eligibility: "అర్హత",
    subsidyAmount: "సబ్సిడీ మొత్తం",
    documents: "అవసరమైన పత్రాలు",
    deadline: "దరఖాస్తు గడువు",
    applyNow: "ఇప్పుడే దరఖాస్తు చేయండి",
    
    // Resources
    resourcesTitle: "సౌర శక్తి వనరులు",
    officialPortals: "అధికారిక ప్రభుత్వ పోర్టల్స్",
    mnrePortal: "కొత్త మరియు పునరుత్పాదక శక్తి మంత్రిత్వ శాఖ",
    nationalRooftop: "జాతీయ రూఫ్‌టాప్ పోర్టల్",
    apNredcap: "AP కొత్త మరియు పునరుత్పాదక శక్తి అభివృద్ధి సంస్థ",
    solarPolicyAP: "ఆంధ్ర ప్రదేశ్ సౌర విధానం",
    faqTitle: "తరచుగా అడిగే ప్రశ్నలు",
    contactTitle: "సహాయం కావాలా?",
    helplineNumber: "సౌర హెల్ప్‌లైన్: 1800-180-3333",
    emailSupport: "ఇమెయిల్: support@solarseva.in",
    available247: "సహాయం కోసం 24/7 అందుబాటులో"
  },
  
  hi: {
    // Header (Hindi)
    solarSeva: "सोलर सेवा",
    home: "होम",
    calculator: "कैलकुलेटर",
    schemes: "योजनाएं",
    resources: "संसाधन",
    
    // Hero Section
    heroTitle: "ग्रामीण भारत के लिए सूर्य की शक्ति का उपयोग करें",
    heroSubtitle: "हर गांव के घर के लिए स्वच्छ, किफायती सौर ऊर्जा समाधान",
    
    // Benefits
    benefitsTitle: "सौर ऊर्जा क्यों चुनें?",
    benefit1Title: "पैसे बचाएं",
    benefit1Desc: "अपने बिजली के बिल को 90% तक कम करें और अतिरिक्त बिजली उत्पादन से कमाई करें",
    benefit2Title: "पर्यावरण की मदद करें",
    benefit2Desc: "कार्बन फुटप्रिंट कम करें और एक स्वच्छ, हरित भविष्य में योगदान दें",
    benefit3Title: "ऊर्जा स्वतंत्रता",
    benefit3Desc: "अपनी बिजली उत्पन्न करें और ग्रिड विफलताओं से स्वतंत्र हो जाएं",
    
    // Calculator
    calcTitle: "सौर ऊर्जा कैलकुलेटर",
    monthlyBill: "मासिक बिजली बिल (₹)",
    monthlyUnits: "मासिक यूनिट खपत",
    rooftopSpace: "क्या आपके पास छत की जगह है?",
    householdType: "घरेलू प्रकार",
    yes: "हां",
    no: "नहीं",
    single: "अकेला व्यक्ति",
    family: "परिवार",
    farmer: "किसान",
    business: "व्यवसाय",
    calculate: "सौर आवश्यकताओं की गणना करें",
    recommendedSystem: "आपके लिए अनुशंसित सौर प्रणाली",
    estimatedCost: "अनुमानित लागत",
    subsidy: "सरकारी सब्सिडी",
    afterSubsidy: "सब्सिडी के बाद लागत",
    monthlySavings: "मासिक बचत",
    paybackPeriod: "वापसी की अवधि",
    
    // Schemes
    schemesTitle: "सरकारी सौर योजनाएं",
    casteCategory: "जाति श्रेणी",
    incomeLevel: "वार्षिक आय स्तर",
    state: "राज्य",
    general: "सामान्य",
    sc: "SC (अनुसूचित जाति)",
    st: "ST (अनुसूचित जनजाति)",
    obc: "OBC (अन्य पिछड़ा वर्ग)",
    below2lakh: "₹2 लाख से कम",
    lakh2to5: "₹2-5 लाख",
    lakh5to10: "₹5-10 लाख",
    above10lakh: "₹10 लाख से अधिक",
    andhraPradesh: "आंध्र प्रदेश",
    findSchemes: "योग्य योजनाएं खोजें",
    eligibleSchemes: "आपकी योग्य योजनाएं",
    eligibility: "योग्यता",
    subsidyAmount: "सब्सिडी राशि",
    documents: "आवश्यक दस्तावेज",
    deadline: "आवेदन की अंतिम तिथि",
    applyNow: "अभी आवेदन करें",
    
    // Resources
    resourcesTitle: "सौर ऊर्जा संसाधन",
    officialPortals: "आधिकारिक सरकारी पोर्टल",
    mnrePortal: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
    nationalRooftop: "राष्ट्रीय रूफटॉप पोर्टल",
    apNredcap: "AP नवीन और नवीकरणीय ऊर्जा विकास निगम",
    solarPolicyAP: "आंध्र प्रदेश सौर नीति",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    contactTitle: "मदद चाहिए?",
    helplineNumber: "सौर हेल्पलाइन: 1800-180-3333",
    emailSupport: "ईमेल: support@solarseva.in",
    available247: "सहायता के लिए 24/7 उपलब्ध"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  const translateText = async (text: string): Promise<string> => {
    if (language === 'en') {
      return text;
    }

    // First check if we have a static translation
    const staticTranslation = translations[language as keyof typeof translations]?.[text as keyof typeof translations.en];
    if (staticTranslation) {
      return staticTranslation;
    }

    // Use Google Translate API for dynamic content
    const languageCode = language === 'te' ? 'te' : language === 'hi' ? 'hi' : 'en';
    return await translateService.translateText(text, languageCode);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText }}>
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
