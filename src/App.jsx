import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import VotingSystem from './pages/VotingSystem';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import CitizenPortal from './pages/CitizenPortal';
import LicenseePortal from './pages/LicenseePortal';
import LicensingService from './pages/LicensingService';
import ComplaintsPage from './pages/ComplaintsPage';
import SectorDashboard from './pages/SectorDashboard';
import TendersPage from './pages/TendersPage';
import BwcirtPortal from './pages/BwcirtPortal';
import PostalPortal from './pages/PostalPortal';
import ReportsLibrary from './pages/ReportsLibrary';
import NewsEvents from './pages/NewsEvents';
import AboutPage from './pages/AboutPage';
import MandatePage from './pages/MandatePage';
import LegislationPage from './pages/LegislationPage';
import TelecomPage from './pages/TelecomPage';
import BroadcastingPage from './pages/BroadcastingPage';
import InternetPage from './pages/InternetPage';
import CareersPage from './pages/CareersPage';
import OrganogramPage from './pages/OrganogramPage';
import QoSPage from './pages/QoSPage';
import ProjectsPage from './pages/ProjectsPage';
import TypeApprovalPage from './pages/TypeApprovalPage';
import AdminPortal from './pages/AdminPortal';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import LoginPage from './pages/LoginPage';

function PrivacyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('bocra_privacy_accepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem('bocra_privacy_accepted', '1'); setVisible(false); };

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E293B] border-t-4 border-[#2DD4BF] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <ShieldCheck size={28} className="text-[#2DD4BF] flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-sm text-gray-300 flex-1">
          BOCRA uses cookies and processes personal data in accordance with the{' '}
          <span className="text-[#2DD4BF] font-medium cursor-pointer hover:underline">Privacy Policy</span>
          {' '}and{' '}
          <span className="text-[#2DD4BF] font-medium cursor-pointer hover:underline">Terms of Service</span>.
          By continuing you consent to our use of cookies for analytics and security purposes.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={accept}
            className="px-5 py-2 bg-[#2DD4BF] text-[#002B7F] font-bold rounded-lg text-sm hover:bg-white transition-colors">
            Accept & Continue
          </button>
          <button onClick={() => setVisible(false)}
            className="p-2 text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { userType } = useAuth();

  // Determine which page to render based on current state
  const renderPage = () => {
    // Check if user is logged in and should be in a portal
    if (userType !== 'public') {
      switch (userType) {
        case 'citizen':
          if (currentPage === 'citizen') {
            return <CitizenPortal setCurrentPage={setCurrentPage} />;
          }
          break;
        case 'licensee':
        case 'provider':
          if (currentPage === 'licensee') {
            return <LicenseePortal setCurrentPage={setCurrentPage} />;
          }
          break;
        case 'admin':
          if (currentPage === 'admin') {
            return <AdminPortal setCurrentPage={setCurrentPage} />;
          }
          break;
        case 'superadmin':
          if (currentPage === 'superadmin') {
            return <SuperAdminDashboard setCurrentPage={setCurrentPage} />;
          }
          break;
      }
    }

    // Public pages
    switch (currentPage) {
      case 'home':
        return <Homepage setCurrentPage={setCurrentPage} />;
      case 'citizen':
        return userType === 'citizen' ? (
          <CitizenPortal setCurrentPage={setCurrentPage} />
        ) : (
          <Homepage setCurrentPage={setCurrentPage} />
        );
      case 'licensee':
        return userType === 'licensee' || userType === 'provider' ? (
          <LicenseePortal setCurrentPage={setCurrentPage} />
        ) : (
          <Homepage setCurrentPage={setCurrentPage} />
        );
      case 'services':
      case 'licensing':
        return <LicensingService setCurrentPage={setCurrentPage} />;
      case 'complaints':
        return <ComplaintsPage setCurrentPage={setCurrentPage} />;
      case 'sector':
        return <SectorDashboard />;
      case 'tenders':
        return <TendersPage />;
      case 'bwcirt':
        return <BwcirtPortal setCurrentPage={setCurrentPage} />;
      case 'postal':
        return <PostalPortal setCurrentPage={setCurrentPage} />;
      case 'reports':
        return <ReportsLibrary setCurrentPage={setCurrentPage} />;
      case 'news':
        return <NewsEvents setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'mandate':
        return <MandatePage setCurrentPage={setCurrentPage} />;
      case 'legislation':
        return <LegislationPage />;
      case 'telecom':
        return <TelecomPage setCurrentPage={setCurrentPage} />;
      case 'broadcasting':
        return <BroadcastingPage setCurrentPage={setCurrentPage} />;
      case 'internet':
        return <InternetPage setCurrentPage={setCurrentPage} />;
      case 'careers':
        return <CareersPage />;
      case 'organogram':
        return <OrganogramPage />;
      case 'qos':
        return <QoSPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'type-approval':
        return <TypeApprovalPage />;
      case 'voting':
        return <VotingSystem setCurrentPage={setCurrentPage} />;
      case 'login-citizen':
      case 'login-licensee':
      case 'login-admin':
      case 'login-superadmin':
        return <LoginPage setCurrentPage={setCurrentPage} preselectedRole={currentPage.split('-')[1]} />;
      case 'admin':
        return userType === 'admin' ? (
          <AdminPortal setCurrentPage={setCurrentPage} />
        ) : (
          <Homepage setCurrentPage={setCurrentPage} />
        );
      case 'superadmin':
        return userType === 'superadmin' ? (
          <SuperAdminDashboard setCurrentPage={setCurrentPage} />
        ) : (
          <Homepage setCurrentPage={setCurrentPage} />
        );
      default:
        return <Homepage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <PrivacyBanner />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
