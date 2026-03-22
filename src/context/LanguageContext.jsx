import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home', about: 'About', mandate: 'Mandate', onlineServices: 'Online Services',
    complaints: 'Complaints', sectorData: 'Sector Data', tenders: 'Tenders', reports: 'Reports',
    newsEvents: 'News & Events', signIn: 'Sign In', signOut: 'Sign Out',
    searchPlaceholder: 'Search...', citizen: 'Citizen / Member', admin: 'Admin', superAdmin: 'Super Admin',
    heroTitle: 'Connecting Botswana, Empowering You',
    heroSubtitle: 'The Botswana Communications Regulatory Authority — your gateway to reliable, fair, and innovative communications services.',
    fileComplaint: 'File Complaint', applyForLicense: 'Apply for License',
    checkStatus: 'Check Status', registerBw: 'Register .bw',
    ourServices: 'Our Services', consumerTools: 'Consumer Tools', viewAll: 'View All',
    latestNews: 'Latest News & Updates', liveStats: 'Live Statistics',
    accessPortal: 'Access Your Portal',
    signInToContinue: 'Sign in to your account to access personalised tools and services.',
    activeLicenses: 'Active Licenses', complaintsResolved: 'Complaints Resolved',
    bwDomains: '.bw Domains', internetPenetration: 'Internet Penetration',
    checkDomain: 'Check .bw Domain Availability', quickComplaint: 'Quick Complaint Filing',
    startApplication: 'Start Application', howItWorks: 'How It Works',
    howItWorksSubtitle: "Simple steps to use BOCRA's online services",
    dashboard: 'Dashboard', myComplaints: 'My Complaints', myApplications: 'My Applications',
    profile: 'Profile', submit: 'Submit', cancel: 'Cancel', search: 'Search',
    internalVoting: 'Internal Voting', castVote: 'Cast Your Vote', viewResults: 'View Results',
    loading: 'Loading...', error: 'An error occurred', success: 'Success', close: 'Close',
    yes: 'Yes', no: 'No',
  },
  tn: {
    home: 'Gae', about: 'Ka ga Rona', mandate: 'Maikarabelo', onlineServices: 'Ditirelo tsa Inthanete',
    complaints: 'Dikgotlelo', sectorData: 'Datha ya Lephata', tenders: 'Ditenda', reports: 'Dipego',
    newsEvents: 'Dikgang le Ditiragalo', signIn: 'Tsena', signOut: 'Tswa',
    searchPlaceholder: 'Batla...', citizen: 'Moagi / Setho', admin: 'Motsamaisi', superAdmin: 'Motsamaisi yo Mogolo',
    heroTitle: 'Go Golaganya Botswana, Go Gona Maatla Go Wena',
    heroSubtitle: 'Botswana Communications Regulatory Authority — tshono ya gago ya go fitlhelela ditirelo tsa dikgokagano tse di tshephagalang, tse di siameng le tse di ntshafaditsweng.',
    fileComplaint: 'Leba Kgotlelo', applyForLicense: 'Leka Laesense',
    checkStatus: 'Tlhola Boemo', registerBw: 'Ingwadise .bw',
    ourServices: 'Ditirelo Tsa Rona', consumerTools: 'Didiriswa tsa Badirisi', viewAll: 'Bona Tsotlhe',
    latestNews: 'Dikgang le Dipego Tse Di Mocha', liveStats: 'Palo tsa Gannyane',
    accessPortal: 'Tsena Kwa Mophaposing Wa Gago',
    signInToContinue: 'Tsena mo akhaonteng ya gago go fitlhelela didiriswa le ditirelo tse di itshekile.',
    activeLicenses: 'Dilaesensi tse di Dirang', complaintsResolved: 'Dikgotlelo tse di Rarabangweng',
    bwDomains: 'Diterene tsa .bw', internetPenetration: 'Go Tsena Inthanete',
    checkDomain: 'Tlhola go Nna Gona ga Ateresi ya .bw', quickComplaint: 'Leba Kgotlelo ka Bonako',
    startApplication: 'Simolola Kopo', howItWorks: 'Go Dira Jang',
    howItWorksSubtitle: 'Dikgato tse di Bonolo tsa go Dirisa Ditirelo tsa Inthanete tsa BOCRA',
    dashboard: 'Tshepediso', myComplaints: 'Dikgotlelo Tsa Me', myApplications: 'Dikopo Tsa Me',
    profile: 'Profaele', submit: 'Romela', cancel: 'Khansela', search: 'Batla',
    internalVoting: 'Go Vouta ga Gare', castVote: 'Vouta', viewResults: 'Bona Dipholo',
    loading: 'E a laela...', error: 'Go ne ga nna le phoso', success: 'Go atlegile', close: 'Tswalela',
    yes: 'Ee', no: 'Nnyaa',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const toggleLang = () => setLang(l => (l === 'en' ? 'tn' : 'en'));
  const t = (key) => translations[lang][key] ?? translations['en'][key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
