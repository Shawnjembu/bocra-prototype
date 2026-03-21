import { useState } from 'react';
import { Menu, X, ChevronDown, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About', hasDropdown: 'about' },
    { id: 'mandate', label: 'Mandate', hasDropdown: 'mandate' },
    { id: 'services', label: 'Online Services', hasMegaMenu: true },
    { id: 'complaints', label: 'Complaints' },
    { id: 'sector', label: 'Sector Data' },
    { id: 'tenders', label: 'Tenders' },
    { id: 'reports', label: 'Reports' },
    { id: 'news', label: 'News & Events' },
  ];

  const aboutMenu = [
    { label: 'Profile', action: () => setCurrentPage('about') },
    { label: 'History', action: () => setCurrentPage('about') },
    { label: 'Organogram', action: () => setCurrentPage('organogram') },
    { label: 'Careers', action: () => setCurrentPage('careers') },
    { label: 'Projects', action: () => setCurrentPage('projects') },
  ];

  const mandateMenu = [
    { label: 'Overview', action: () => setCurrentPage('mandate') },
    { label: 'Legislation', action: () => setCurrentPage('legislation') },
    { label: 'Telecommunications', action: () => setCurrentPage('telecom') },
    { label: 'Broadcasting', action: () => setCurrentPage('broadcasting') },
    { label: 'Postal Services', action: () => setCurrentPage('postal') },
    { label: 'Internet & ICTs', action: () => setCurrentPage('internet') },
  ];

  const servicesMenu = [
    {
      title: 'Licensing',
      items: [
        { label: 'Apply for License', action: () => setCurrentPage('licensing') },
        { label: 'Renew License', action: () => setCurrentPage('licensee') },
        { label: 'License Categories', action: () => {} },
      ],
    },
    {
      title: 'Consumer Services',
      items: [
        { label: 'File a Complaint', action: () => setCurrentPage('complaints') },
        { label: 'Check Complaint Status', action: () => setCurrentPage('complaints') },
        { label: 'Tariff Comparison', action: () => setCurrentPage('citizen') },
      ],
    },
    {
      title: 'Specialized Portals',
      items: [
        { label: 'bwCIRT (Cybersecurity)', action: () => setCurrentPage('bwcirt') },
        { label: 'Postal Services', action: () => setCurrentPage('postal') },
        { label: 'Reports Library', action: () => setCurrentPage('reports') },
        { label: 'QoS Monitoring', action: () => setCurrentPage('qos') },
        { label: 'Type Approval', action: () => setCurrentPage('type-approval') },
      ],
    },
    {
      title: 'Reports & Publications',
      items: [
        { label: 'Annual Reports', action: () => setCurrentPage('reports') },
        { label: 'Sector Statistics', action: () => setCurrentPage('sector') },
        { label: 'Regulations', action: () => {} },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-[#002B7F] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>📞 +267 368 5000</span>
            <span>✉️ info@bocra.bw</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Monday - Friday: 7:30 AM - 4:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex flex-col items-start cursor-pointer select-none"
            onClick={() => setCurrentPage('home')}
          >
            <h1 className="text-2xl font-black tracking-widest text-[#002B7F] leading-none">BOCRA</h1>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#1E90FF] inline-block"></span>
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#2ECC71] inline-block"></span>
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#E91E8C] inline-block"></span>
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#F1C40F] inline-block"></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown ? setOpenDropdown(item.hasDropdown) : item.hasMegaMenu ? setMegaMenuOpen(true) : null}
                onMouseLeave={() => { setOpenDropdown(null); setMegaMenuOpen(false); }}
              >
                {item.hasMegaMenu ? (
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-[#002B7F] font-medium transition-colors"
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                ) : item.hasDropdown ? (
                  <>
                    <button className="flex items-center gap-1 font-medium transition-colors text-gray-700 hover:text-[#002B7F]">
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                    {openDropdown === item.hasDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-48 z-50 border border-gray-100">
                        {(item.hasDropdown === 'about' ? aboutMenu : mandateMenu).map((menuItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => { menuItem.action(); setOpenDropdown(null); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#002B7F]"
                          >
                            {menuItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`font-medium transition-colors ${
                      currentPage === item.id
                        ? 'text-[#002B7F]'
                        : 'text-gray-700 hover:text-[#002B7F]'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Search & Auth */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] w-48"
              />
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#2DD4BF] rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#002B7F]"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('home')}
                className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {megaMenuOpen && (
        <div
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="absolute left-0 right-0 bg-white shadow-xl border-t"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-8">
            {servicesMenu.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-[#002B7F] mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button
                        onClick={() => {
                          item.action();
                          setMegaMenuOpen(false);
                        }}
                        className="text-gray-600 hover:text-[#002B7F] text-sm transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 font-medium ${
                  currentPage === item.id
                    ? 'text-[#002B7F]'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
