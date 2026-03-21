import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
