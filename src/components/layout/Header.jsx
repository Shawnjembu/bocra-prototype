import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, User, LogOut, Shield, Building2, Lock } from 'lucide-react';
import { useAuth, searchIndex } from '../../context/AuthContext';

const ROLE_OPTIONS = [
  { id: 'citizen', label: 'Citizen', icon: User, color: 'bg-[#2DD4BF]', portal: 'citizen' },
  { id: 'licensee', label: 'Licensee', icon: Building2, color: 'bg-[#F97316]', portal: 'licensee' },
  { id: 'admin', label: 'Admin', icon: Shield, color: 'bg-[#002B7F]', portal: 'admin' },
  { id: 'superadmin', label: 'Super Admin', icon: Lock, color: 'bg-red-600', portal: 'superadmin' },
];

export default function Header({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const signInRef = useRef(null);
  const { user, userType, logout } = useAuth();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false);
      if (signInRef.current && !signInRef.current.contains(e.target)) setSignInOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim().length < 2) { setSearchResults([]); setShowSearchResults(false); return; }
    const lower = q.toLowerCase();
    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.keywords.some(k => k.includes(lower))
    ).slice(0, 6);
    setSearchResults(results);
    setShowSearchResults(true);
  };

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
        { label: 'License Categories', action: () => setCurrentPage('licensing') },
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
        { label: 'Regulations', action: () => setCurrentPage('legislation') },
      ],
    },
  ];

  const roleConfig = ROLE_OPTIONS.find(r => r.id === userType);

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
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex flex-col items-start cursor-pointer select-none flex-shrink-0" onClick={() => setCurrentPage('home')}>
            <h1 className="text-2xl font-black tracking-widest text-[#002B7F] leading-none">BOCRA</h1>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#1E90FF] inline-block"></span>
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#2ECC71] inline-block"></span>
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#E91E8C] inline-block"></span>
              <span className="bocra-dot w-3 h-3 rounded-full bg-[#F1C40F] inline-block"></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 flex-1 justify-center">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown ? setOpenDropdown(item.hasDropdown) : item.hasMegaMenu ? setMegaMenuOpen(true) : null}
                onMouseLeave={() => { setOpenDropdown(null); setMegaMenuOpen(false); }}
              >
                {item.hasMegaMenu ? (
                  <button className="flex items-center gap-1 text-gray-700 hover:text-[#002B7F] font-medium transition-colors text-sm">
                    {item.label} <ChevronDown size={14} />
                  </button>
                ) : item.hasDropdown ? (
                  <>
                    <button className="flex items-center gap-1 font-medium transition-colors text-gray-700 hover:text-[#002B7F] text-sm">
                      {item.label} <ChevronDown size={14} />
                    </button>
                    {openDropdown === item.hasDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-48 z-50 border border-gray-100">
                        {(item.hasDropdown === 'about' ? aboutMenu : mandateMenu).map((menuItem, idx) => (
                          <button key={idx} onClick={() => { menuItem.action(); setOpenDropdown(null); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#002B7F]">
                            {menuItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={() => setCurrentPage(item.id)}
                    className={`font-medium transition-colors text-sm ${currentPage === item.id ? 'text-[#002B7F]' : 'text-gray-700 hover:text-[#002B7F]'}`}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Search + Auth */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* Search */}
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] w-44 text-sm"
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl w-72 z-50 overflow-hidden">
                  {searchResults.map((r, i) => (
                    <button key={i} onClick={() => { setCurrentPage(r.page); setShowSearchResults(false); setSearchQuery(''); }}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-50 last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{r.title}</p>
                        <p className="text-xs text-gray-400">{r.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(userType === 'superadmin' ? 'superadmin' : userType === 'admin' ? 'admin' : userType === 'citizen' ? 'citizen' : 'licensee')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-7 h-7 ${roleConfig?.color || 'bg-[#2DD4BF]'} rounded-full flex items-center justify-center`}>
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-24 truncate">{user.name}</span>
                </button>
                <button onClick={logout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="relative" ref={signInRef}>
                <button
                  onClick={() => setSignInOpen(!signInOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors text-sm"
                >
                  Sign In <ChevronDown size={14} className={`transition-transform ${signInOpen ? 'rotate-180' : ''}`} />
                </button>
                {signInOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl w-56 z-50 overflow-hidden">
                    <p className="text-xs font-semibold text-gray-400 px-4 pt-3 pb-1 uppercase tracking-wide">Sign in as</p>
                    {ROLE_OPTIONS.map(role => (
                      <button key={role.id}
                        onClick={() => { setSignInOpen(false); setCurrentPage(`login-${role.id}`); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div className={`w-8 h-8 ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <role.icon size={15} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{role.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {megaMenuOpen && (
        <div onMouseEnter={() => setMegaMenuOpen(true)} onMouseLeave={() => setMegaMenuOpen(false)}
          className="absolute left-0 right-0 bg-white shadow-xl border-t z-40">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-8">
            {servicesMenu.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-[#002B7F] mb-3 text-sm uppercase tracking-wide">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button onClick={() => { item.action(); setMegaMenuOpen(false); }}
                        className="text-gray-600 hover:text-[#002B7F] text-sm transition-colors">
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
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                className={`block w-full text-left py-2.5 px-3 rounded-lg font-medium text-sm ${currentPage === item.id ? 'bg-[#002B7F] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t space-y-2">
              {user ? (
                <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm">
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                ROLE_OPTIONS.map(role => (
                  <button key={role.id}
                    onClick={() => { setCurrentPage(`login-${role.id}`); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 ${role.color} text-white rounded-lg font-medium text-sm`}>
                    <role.icon size={15} /> Sign In as {role.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
