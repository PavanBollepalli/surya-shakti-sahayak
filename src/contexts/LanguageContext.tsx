import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header & Navigation
    solarSaathi: "SolarSaathi",
    home: "Home",
    about: "About",
    services: "Services", 
    calculator: "Calculator",
    testimonials: "Reviews",
    contact: "Contact",
    language: "Language",
    
    // Hero Section
    heroTitle: "Power Your Future with Solar Energy",
    heroSubtitle: "Transform your home with clean, affordable solar solutions. Join thousands of families saving money while saving the planet.",
    indiaNumber1: "India's #1 Solar Energy Platform",
    calculateSavings: "Calculate Savings",
    watchDemo: "Watch Demo",
    getQuote: "Get Free Quote",
    bookInspection: "Book Inspection",
    seePlans: "See Plans",
    startSavingNow: "🚀 START SAVING NOW",
    getFreeSubsidies: "💰 Get FREE Subsidies",
    
    // Action Keywords & CTAs
    actNow: "ACT NOW",
    limitedOffer: "LIMITED TIME OFFER",
    saveThousands: "SAVE THOUSANDS",
    freeConsultation: "FREE CONSULTATION",
    instantQuote: "INSTANT QUOTE",
    zeroDownPayment: "ZERO DOWN PAYMENT",
    governmentSubsidy: "GOVERNMENT SUBSIDY AVAILABLE",
    callToday: "CALL TODAY",
    dontWait: "DON'T WAIT",
    joinRevolution: "JOIN THE SOLAR REVOLUTION",
    
    // Benefits
    benefitsTitle: "Why Choose Solar Energy?",
    benefit1Title: "Save Money Instantly",
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
    bc: "BC (Backward Class)",
    obc: "OBC (Other Backward Class)",
    below2lakh: "Below ₹2 Lakh",
    "2to5lakh": "₹2-5 Lakh",
    "5to10lakh": "₹5-10 Lakh",
    above10lakh: "Above ₹10 Lakh",
    andhraPradesh: "Andhra Pradesh",
    findSchemes: "Find Eligible Schemes",
    eligibleSchemes: "Your Eligible Schemes",
    eligibility: "Eligibility",
    subsidyAmount: "Subsidy Amount",
    documents: "Required Documents",
    deadline: "Application Deadline",
    apply: "Apply Now",
    applyNow: "Apply Now",
    
    // Resources & Contact
    resourcesTitle: "Solar Energy Resources & Government Links",
    officialPortals: "Official Government Portals",
    mnrePortal: "Ministry of New and Renewable Energy",
    nationalRooftop: "National Rooftop Portal",
    apNredcap: "AP New and Renewable Energy Development Corporation",
    solarPolicyAP: "Andhra Pradesh Solar Policy",
    faqTitle: "Frequently Asked Questions",
    contactTitle: "Need Help?",
    helplineNumber: "Solar Helpline: 1800-180-3333",
    emailSupport: "Email: support@solarsaathi.in",
    available247: "Available 24/7 for assistance",
    
    // Government Contact Information
    govContactTitle: "Official Government Solar Contacts",
    mnreContact: "MNRE Helpline: 011-2436-0707",
    mnreEmail: "Email: rooftopsolar@mnre.gov.in",
    mnreWebsite: "Website: https://mnre.gov.in",
    apNredcapContact: "AP NREDCAP: 0863-2340544",
    apNredcapEmail: "Email: info@nredcap.ap.gov.in",
    apNredcapWebsite: "Website: https://nredcap.ap.gov.in",
    nationalPortalWebsite: "National Portal: https://solarrooftop.gov.in",
    
    // Services
    servicesTitle: "Complete Solar Solutions",
    residentialSolar: "Residential Solar",
    commercialSolar: "Commercial Solar", 
    industrialSolar: "Industrial Solar",
    installation: "Installation & Maintenance",
    monitoring: "Energy Monitoring",
    support: "24/7 Support",
    
    // Testimonials
    testimonialsTitle: "Real Stories, Real Savings",
    customerStories: "Customer Stories",
    
    // Footer
    footerTagline: "Made with ❤️ for a Sustainable India",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    followUs: "Follow Us"
  },
  
  te: {
    // Header & Navigation (Telugu)
    solarSaathi: "సోలార్ సాథీ",
    home: "హోమ్",
    about: "మా గురించి",
    services: "సేవలు",
    calculator: "కాలిక్యులేటర్",
    testimonials: "సమీక్షలు",
    contact: "సంప్రదింపులు",
    language: "భాష",
    
    // Hero Section
    heroTitle: "సౌర శక్తితో మీ భవిష్యత్తును శక్తివంతం చేయండి",
    heroSubtitle: "స్వచ్ఛమైన, సరసమైన సౌర పరిష్కారాలతో మీ ఇంటిని మార్చండి. డబ్బు ఆదా చేస్తూ గ్రహాన్ని కాపాడే వేలాది కుటుంబాలలో చేరండి.",
    indiaNumber1: "భారతదేశంలో నంబర్ 1 సౌర శక్తి ప్లాట్‌ఫారమ్",
    calculateSavings: "ఆదా లెక్కించండి",
    watchDemo: "డెమో చూడండి",
    getQuote: "ఉచిత కోట్ పొందండి",
    bookInspection: "తనిఖీ బుక్ చేయండి",
    seePlans: "ప్లాన్లు చూడండి",
    startSavingNow: "🚀 ఇప్పుడే ఆదా చేయడం ప్రారంభించండి",
    getFreeSubsidies: "💰 ఉచిత సబ్సిడీలు పొందండి",
    
    // Action Keywords & CTAs
    actNow: "ఇప్పుడే చర్య తీసుకోండి",
    limitedOffer: "పరిమిత కాల ఆఫర్",
    saveThousands: "వేలాది రూపాయలు ఆదా చేయండి",
    freeConsultation: "ఉచిత సలహా",
    instantQuote: "తక్షణ కోట్",
    zeroDownPayment: "జీరో డౌన్ పేమెంట్",
    governmentSubsidy: "ప్రభుత్వ సబ్సిడీ అందుబాటులో",
    callToday: "ఈరోజే కాల్ చేయండి",
    dontWait: "వేచి ఉండకండి",
    joinRevolution: "సౌర విప్లవంలో చేరండి",
    
    // Benefits
    benefitsTitle: "సౌర శక్తిని ఎందుకు ఎంచుకోవాలి?",
    benefit1Title: "తక్షణం డబ్బు ఆదా చేయండి",
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
    bc: "BC (వెనుకబడిన వర్గం)",
    obc: "OBC (ఇతర వెనుకబడిన వర్గం)",
    below2lakh: "₹2 లక్షల కంటే తక్కువ",
    "2to5lakh": "₹2-5 లక్షలు",
    "5to10lakh": "₹5-10 లక్షలు",
    above10lakh: "₹10 లక్షలకు మించి",
    andhraPradesh: "ఆంధ్ర ప్రదేశ్",
    findSchemes: "అర్హత గల పథకాలను కనుగొనండి",
    eligibleSchemes: "మీ అర్హత గల పథకాలు",
    eligibility: "అర్హత",
    subsidyAmount: "సబ్సిడీ మొత్తం",
    documents: "అవసరమైన పత్రాలు",
    deadline: "దరఖాస్తు గడువు",
    apply: "ఇప్పుడే దరఖాస్తు చేయండి",
    applyNow: "ఇప్పుడే దరఖాస్తు చేయండి",
    
    // Resources & Contact
    resourcesTitle: "సౌర శక్తి వనరులు & ప్రభుత్వ లింకులు",
    officialPortals: "అధికారిక ప్రభుత్వ పోర్టల్స్",
    mnrePortal: "కొత్త మరియు పునరుత్పాదక శక్తి మంత్రిత్వ శాఖ",
    nationalRooftop: "జాతీయ రూఫ్‌టాప్ పోర్టల్",
    apNredcap: "AP కొత్త మరియు పునరుత్పాదక శక్తి అభివృద్ధి సంస్థ",
    solarPolicyAP: "ఆంధ్ర ప్రదేశ్ సౌర విధానం",
    faqTitle: "తరచుగా అడిగే ప్రశ్నలు",
    contactTitle: "సహాయం కావాలా?",
    helplineNumber: "సౌర హెల్ప్‌లైన్: 1800-180-3333",
    emailSupport: "ఇమెయిల్: support@solarsaathi.in",
    available247: "సహాయం కోసం 24/7 అందుబాటులో",
    
    // Government Contact Information
    govContactTitle: "అధికారిక ప్రభుత్వ సౌర సంప్రదింపులు",
    mnreContact: "MNRE హెల్ప్‌లైన్: 011-2436-0707",
    mnreEmail: "ఇమెయిల్: rooftopsolar@mnre.gov.in",
    mnreWebsite: "వెబ్‌సైట్: https://mnre.gov.in",
    apNredcapContact: "AP NREDCAP: 0863-2340544",
    apNredcapEmail: "ఇమెయిల్: info@nredcap.ap.gov.in",
    apNredcapWebsite: "వెబ్‌సైట్: https://nredcap.ap.gov.in",
    nationalPortalWebsite: "జాతీయ పోర్టల్: https://solarrooftop.gov.in",
    
    // Services
    servicesTitle: "పూర్తి సౌర పరిష్కారాలు",
    residentialSolar: "నివాస సౌర వ్యవస్థ",
    commercialSolar: "వాణిజ్య సౌర వ్యవస్థ",
    industrialSolar: "పారిశ్రామిక సౌర వ్యవస్థ",
    installation: "సంస్థాపన & నిర్వహణ",
    monitoring: "శక్తి పర్యవేక్షణ",
    support: "24/7 మద్దతు",
    
    // Testimonials
    testimonialsTitle: "నిజమైన కథలు, నిజమైన ఆదా",
    customerStories: "కస్టమర్ కథలు",
    
    // Footer
    footerTagline: "స్థిరమైన భారతదేశం కోసం ❤️తో తయారు చేయబడింది",
    quickLinks: "త్వరిత లింకులు",
    contactInfo: "సంప్రదింపు సమాచారం",
    followUs: "మమ్మల్ని అనుసరించండి"
  },
  
  hi: {
    // Header & Navigation (Hindi)
    solarSaathi: "सोलर साथी",
    home: "होम",
    about: "हमारे बारे में",
    services: "सेवाएं",
    calculator: "कैलकुलेटर",
    testimonials: "समीक्षाएं",
    contact: "संपर्क",
    language: "भाषा",
    
    // Hero Section
    heroTitle: "सौर ऊर्जा के साथ अपना भविष्य शक्तिशाली बनाएं",
    heroSubtitle: "स्वच्छ, किफायती सौर समाधानों के साथ अपने घर को बदलें। पैसे बचाते हुए ग्रह को बचाने वाले हजारों परिवारों में शामिल हों।",
    indiaNumber1: "भारत का नंबर 1 सौर ऊर्जा प्लेटफॉर्म",
    calculateSavings: "बचत की गणना करें",
    watchDemo: "डेमो देखें",
    getQuote: "मुफ्त कोट पाएं",
    bookInspection: "निरीक्षण बुक करें",
    seePlans: "योजनाएं देखें",
    startSavingNow: "🚀 अभी बचत शुरू करें",
    getFreeSubsidies: "💰 मुफ्त सब्सिडी पाएं",
    
    // Action Keywords & CTAs
    actNow: "अभी कार्य करें",
    limitedOffer: "सीमित समय का ऑफर",
    saveThousands: "हजारों रुपए बचाएं",
    freeConsultation: "मुफ्त सलाह",
    instantQuote: "तुरंत कोट",
    zeroDownPayment: "जीरो डाउन पेमेंट",
    governmentSubsidy: "सरकारी सब्सिडी उपलब्ध",
    callToday: "आज ही कॉल करें",
    dontWait: "इंतजार न करें",
    joinRevolution: "सौर क्रांति में शामिल हों",
    
    // Benefits
    benefitsTitle: "सौर ऊर्जा क्यों चुनें?",
    benefit1Title: "तुरंत पैसे बचाएं",
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
    bc: "BC (पिछड़ा वर्ग)",
    obc: "OBC (अन्य पिछड़ा वर्ग)",
    below2lakh: "₹2 लाख से कम",
    "2to5lakh": "₹2-5 लाख",
    "5to10lakh": "₹5-10 लाख",
    above10lakh: "₹10 लाख से अधिक",
    andhraPradesh: "आंध्र प्रदेश",
    findSchemes: "योग्य योजनाएं खोजें",
    eligibleSchemes: "आपकी योग्य योजनाएं",
    eligibility: "योग्यता",
    subsidyAmount: "सब्सिडी राशि",
    documents: "आवश्यक दस्तावेज",
    deadline: "आवेदन की अंतिम तिथि",
    apply: "अभी आवेदन करें",
    applyNow: "अभी आवेदन करें",
    
    // Resources & Contact
    resourcesTitle: "सौर ऊर्जा संसाधन और सरकारी लिंक",
    officialPortals: "आधिकारिक सरकारी पोर्टल",
    mnrePortal: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
    nationalRooftop: "राष्ट्रीय रूफटॉप पोर्टल",
    apNredcap: "AP नवीन और नवीकरणीय ऊर्जा विकास निगम",
    solarPolicyAP: "आंध्र प्रदेश सौर नीति",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    contactTitle: "मदद चाहिए?",
    helplineNumber: "सौर हेल्पलाइन: 1800-180-3333",
    emailSupport: "ईमेल: support@solarsaathi.in",
    available247: "सहायता के लिए 24/7 उपलब्ध",
    
    // Government Contact Information
    govContactTitle: "आधिकारिक सरकारी सौर संपर्क",
    mnreContact: "MNRE हेल्पलाइन: 011-2436-0707",
    mnreEmail: "ईमेल: rooftopsolar@mnre.gov.in",
    mnreWebsite: "वेबसाइट: https://mnre.gov.in",
    apNredcapContact: "AP NREDCAP: 0863-2340544",
    apNredcapEmail: "ईमेल: info@nredcap.ap.gov.in",
    apNredcapWebsite: "वेबसाइट: https://nredcap.ap.gov.in",
    nationalPortalWebsite: "राष्ट्रीय पोर्टल: https://solarrooftop.gov.in",
    
    // Services
    servicesTitle: "पूर्ण सौर समाधान",
    residentialSolar: "आवासीय सौर",
    commercialSolar: "वाणिज्यिक सौर",
    industrialSolar: "औद्योगिक सौर",
    installation: "स्थापना और रखरखाव",
    monitoring: "ऊर्जा निगरानी",
    support: "24/7 सहायता",
    
    // Testimonials
    testimonialsTitle: "वास्तविक कहानियां, वास्तविक बचत",
    customerStories: "ग्राहक कहानियां",
    
    // Footer
    footerTagline: "स्थायी भारत के लिए ❤️ के साथ बनाया गया",
    quickLinks: "त्वरित लिंक",
    contactInfo: "संपर्क जानकारी",
    followUs: "हमें फॉलो करें"
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