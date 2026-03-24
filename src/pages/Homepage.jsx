import { useState } from 'react';
import {
  ArrowRight, Users, Search, TrendingUp, FileText,
  ChevronRight, Phone, Mail, Globe, Shield, Wifi, Radio, Lock, CheckCircle,
  Bell, Clock, Zap, BarChart3, MapPin, Package, AlertTriangle, MessageCircle,
  Eye, Type, Contrast, SkipForward, X, Send, User
} from 'lucide-react';
import { useAuth, searchIndex } from '../context/AuthContext';


export default function Homepage({ setCurrentPage }) {
  const { user, userType, login, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [newsFilter, setNewsFilter] = useState('all');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I'm BOTSI, your BOCRA assistant. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [accessibility, setAccessibility] = useState({ highContrast: false, textSize: 'normal', screenReader: false });
  const [domainCheck, setDomainCheck] = useState('');
  const [domainResult, setDomainResult] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState('');

  const services = [
    { id: 'telecom', name: 'Telecommunications', icon: Phone, color: 'bg-[#0057A8]', description: 'Voice & Data Services', page: 'telecom', hoverBorder: '#0057A8' },
    { id: 'broadcasting', name: 'Broadcasting', icon: Radio, color: 'bg-[#D4A017]', description: 'Radio & TV', page: 'broadcasting', hoverBorder: '#D4A017' },
    { id: 'postal', name: 'Postal Services', icon: Package, color: 'bg-[#8B0000]', description: 'Courier & Mail', page: 'postal', hoverBorder: '#8B0000' },
    { id: 'internet', name: 'Internet Services', icon: Wifi, color: 'bg-[#006400]', description: 'ISP & Broadband', page: 'internet', hoverBorder: '#006400' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Lock, color: 'bg-[#002B7F]', description: 'bwCIRT', page: 'bwcirt', hoverBorder: '#002B7F' },
    { id: 'typeapproval', name: 'Type Approval', icon: CheckCircle, color: 'bg-[#475569]', description: 'Device Certification', page: 'type-approval', hoverBorder: '#475569' },
    { id: 'license', name: 'Sector Data', icon: Shield, color: 'bg-[#1a4a9e]', description: 'Statistics & Reports', page: 'sector', hoverBorder: '#1a4a9e' },
    { id: 'domain', name: '.bw Domain', icon: Globe, color: 'bg-[#2DD4BF]', description: 'Domain Register', page: 'qos', hoverBorder: '#2DD4BF' },
  ];

  const consumerTools = [
    { id: 'tariff', name: 'Tariff Compare', icon: TrendingUp, desc: 'Compare mobile & internet plans', requiresAuth: false, page: 'citizen' },
    { id: 'speed', name: 'QoS & Speed Test', icon: Zap, desc: 'Test your internet speed', requiresAuth: false, page: 'qos' },
    { id: 'complaint', name: 'File Complaint', icon: AlertTriangle, desc: 'Report a service issue', requiresAuth: true, page: 'complaints' },
    { id: 'mnp', name: 'Number Portability', icon: Phone, desc: 'Keep your number when switching', requiresAuth: false, page: 'telecom' },
  ];

  const news = [
    { id: 1, category: 'news', date: 'March 15, 2024', title: 'BOCRA Launches New Online Licensing Portal', excerpt: 'The new portal provides a streamlined experience for license applicants.', image: '/images/news/635036951_1347279590770115_3603102997177699115_n.jpg' },
    { id: 2, category: 'speech', date: 'March 12, 2024', title: 'Keynote Address: Digital Transformation in Botswana', excerpt: 'CEO discusses the future of communications sector.', image: '/images/news/642800723_1356812449816829_990481576931445014_n.jpg' },
    { id: 3, category: 'statement', date: 'March 10, 2024', title: 'Statement on Spectrum Allocation', excerpt: 'BOCRA announces new spectrum allocation guidelines.', image: '/images/news/647144726_1369366781894729_4830595175703378796_n.jpg' },
    { id: 4, category: 'news', date: 'March 8, 2024', title: 'New Consumer Protection Guidelines Effective', excerpt: 'Updated guidelines aim to strengthen consumer rights.', image: '/images/news/649328637_1370840881747319_2084495551010995861_n.jpg' },
  ];

  const complaintCategories = ['Network Quality', 'Billing Dispute', 'Customer Service', 'Service Interruption', 'Data Privacy', 'Contract Issues'];
  const filteredNews = newsFilter === 'all' ? news : news.filter(n => n.category === newsFilter);

  // FCC-style search
  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim().length < 2) { setSearchResults([]); setShowSearchResults(false); return; }
    const lower = q.toLowerCase();
    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(lower) || item.keywords.some(k => k.includes(lower))
    ).slice(0, 7);
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchSelect = (page) => {
    setShowSearchResults(false);
    setSearchQuery('');
    setCurrentPage(page);
  };

  // Auth guard for protected actions
  const handleProtectedAction = (page, label) => {
    if (!isAuthenticated) {
      setPendingAction(label);
      setShowLoginPrompt(true);
    } else {
      setCurrentPage(page);
    }
  };

  const handleDomainCheck = () => {
    if (!domainCheck.trim()) return;
    setDomainResult({ available: Math.random() > 0.5, domain: domainCheck });
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const responses = [
      'For complaints, visit our Complaints page or call +267 395 7755.',
      'License applications can be submitted through our Online Services portal.',
      'For cybersecurity incidents, visit the bwCIRT portal.',
      'BOCRA office hours are Monday–Friday, 7:30 AM – 4:30 PM.',
      'Thank you for your message. A representative will respond shortly.',
    ];
    setChatMessages(prev => [...prev, { id: Date.now(), type: 'user', text: chatInput }]);
    const q = chatInput.toLowerCase();
    setChatInput('');
    setTimeout(() => {
      const reply = responses.find((_, i) =>
        [['complaint', 'file'], ['license', 'apply'], ['cyber', 'hack', 'incident'], ['hour', 'open', 'time']][i]?.some(k => q.includes(k))
      ) || responses[4];
      setChatMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <div className={`animate-fade-in ${accessibility.highContrast ? 'bg-black text-white' : ''}`}>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-[#002B7F] mb-2">Sign In Required</h3>
            <p className="text-gray-600 text-sm mb-4">You need to be signed in to {pendingAction}. Choose your account type to continue.</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button onClick={() => { setShowLoginPrompt(false); setCurrentPage('login-citizen'); }}
                className="flex items-center gap-2 p-3 bg-[#2DD4BF] text-white rounded-lg text-sm font-medium">
                <User size={16} /> Citizen / Member
              </button>
              <button onClick={() => { setShowLoginPrompt(false); setCurrentPage('login-admin'); }}
                className="flex items-center gap-2 p-3 bg-[#002B7F] text-white rounded-lg text-sm font-medium">
                <Shield size={16} /> Admin
              </button>
            </div>
            <button onClick={() => setShowLoginPrompt(false)} className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Top utility bar */}
      <div className="bg-[#002B7F] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => setCurrentPage('legislation')} className="hover:text-[#2DD4BF] transition-colors">Documents</button>
              <span className="text-white/30">|</span>
              <button onClick={() => setCurrentPage('complaints')} className="hover:text-[#2DD4BF] transition-colors">Complaints</button>
              <span className="text-white/30">|</span>
              <button onClick={() => setCurrentPage('about')} className="hover:text-[#2DD4BF] transition-colors">About BOCRA</button>
              <span className="text-white/30">|</span>
              <button onClick={() => setCurrentPage('tenders')} className="hover:text-[#2DD4BF] transition-colors">Tenders</button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => handleProtectedAction('licensing', 'access the Licensing Portal')} className="flex items-center gap-1 hover:text-[#2DD4BF] transition-colors">
                <Lock size={12} /> Licensing Portal
              </button>
              <span className="text-white/30">|</span>
              <button onClick={() => setCurrentPage('type-approval')} className="hover:text-[#2DD4BF] transition-colors">Type Approval</button>
              <span className="text-white/30">|</span>
              <button onClick={() => setCurrentPage('qos')} className="hover:text-[#2DD4BF] transition-colors">QoS Monitoring</button>
            </div>
          </div>
        </div>
      </div>


      {/* Hero */}
      <section className="relative overflow-hidden"
        style={{ backgroundImage: 'url(/bocra-building.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-[#001a4f]/55" />
        {/* Connectivity Web mesh pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g stroke="white" strokeWidth="0.6" fill="none">
              <line x1="80" y1="60" x2="220" y2="130"/><line x1="220" y1="130" x2="380" y2="80"/><line x1="380" y1="80" x2="540" y2="150"/>
              <line x1="540" y1="150" x2="700" y2="90"/><line x1="700" y1="90" x2="760" y2="200"/><line x1="80" y1="60" x2="160" y2="200"/>
              <line x1="160" y1="200" x2="320" y2="260"/><line x1="320" y1="260" x2="220" y2="130"/><line x1="320" y1="260" x2="480" y2="300"/>
              <line x1="480" y1="300" x2="540" y2="150"/><line x1="480" y1="300" x2="640" y2="340"/><line x1="640" y1="340" x2="760" y2="200"/>
              <line x1="160" y1="200" x2="80" y2="320"/><line x1="80" y1="320" x2="200" y2="400"/><line x1="200" y1="400" x2="320" y2="260"/>
              <line x1="200" y1="400" x2="360" y2="450"/><line x1="360" y1="450" x2="480" y2="300"/><line x1="360" y1="450" x2="520" y2="460"/>
              <line x1="520" y1="460" x2="640" y2="340"/><line x1="640" y1="340" x2="720" y2="420"/><line x1="380" y1="80" x2="320" y2="260"/>
              <line x1="700" y1="90" x2="640" y2="340" strokeDasharray="4,4"/><line x1="80" y1="60" x2="380" y2="80" strokeDasharray="4,4"/>
            </g>
            <g fill="white">
              {[[80,60],[220,130],[380,80],[540,150],[700,90],[760,200],[160,200],[320,260],[480,300],[640,340],[80,320],[200,400],[360,450],[520,460],[720,420]].map(([x,y],i)=>(
                <circle key={i} cx={x} cy={y} r={i%3===0?3.5:2} opacity={i%3===0?0.9:0.6}/>
              ))}
            </g>
          </svg>
        </div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center text-white mb-8">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-sm font-semibold tracking-widest uppercase text-white/90">
              Fair play, fair game
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              Connecting Botswana,<br />Empowering You
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              The Botswana Communications Regulatory Authority — your gateway to reliable, fair, and innovative communications services.
            </p>
          </div>

          {/* FCC-style Search */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
            <input type="text" placeholder="Search for services, forms, regulations, or information..."
              value={searchQuery} onChange={e => handleSearch(e.target.value)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
              onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#2DD4BF]/30 text-gray-800" />
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl z-20 overflow-hidden border border-gray-100">
                {searchResults.map((r, i) => (
                  <button key={i} onMouseDown={() => handleSearchSelect(r.page)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 text-left">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{r.title}</p>
                      <p className="text-xs text-gray-400">{r.category}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'File Complaint', icon: FileText, action: () => handleProtectedAction('complaints', 'file a complaint') },
              { label: 'Apply for License', icon: Shield, action: () => handleProtectedAction('licensing', 'apply for a license') },
              { label: 'Check Status', icon: Clock, action: () => handleProtectedAction('complaints', 'check your complaint status') },
              { label: 'Register .bw', icon: Globe, action: () => setCurrentPage('qos') },
            ].map((action, idx) => (
              <button key={idx} onClick={action.action}
                className="group lift-sm bocra-focusable flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-250 cursor-pointer relative overflow-hidden">
                <action.icon size={24} className="text-white group-hover:-translate-y-0.5 transition-transform duration-250" />
                <span className="text-sm font-medium text-white">{action.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2DD4BF] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1E293B] mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <button key={service.id} onClick={() => setCurrentPage(service.page)}
                className="group card-lift bocra-focusable p-6 bg-white border-2 border-gray-100 rounded-xl hover:shadow-xl transition-all text-left cursor-pointer"
                style={{ '--hover-border': service.hoverBorder }}
                onMouseEnter={e => e.currentTarget.style.borderColor = service.hoverBorder}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#f3f4f6'}>
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#1E293B] mb-1">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">How It Works</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Simple steps to use BOCRA's online platform — from filing complaints to applying for licenses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { step: '01', icon: User, title: 'Create an Account', desc: 'Register using your national ID or passport. Non-citizens and companies are welcome — just select the right ID type.', color: 'bg-[#002B7F]' },
              { step: '02', icon: FileText, title: 'Access Services', desc: 'File complaints, apply for licenses, register .bw domains, or report cybersecurity incidents online.', color: 'bg-[#F97316]' },
              { step: '03', icon: CheckCircle, title: 'Track & Manage', desc: 'Monitor your applications and complaints in real time through your personal dashboard with live status updates.', color: 'bg-[#2DD4BF]' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                {idx < 2 && <div className="hidden md:block absolute top-8 left-3/4 w-1/2 border-t-2 border-dashed border-gray-200 z-0" />}
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon size={28} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 mb-1 tracking-widest">STEP {item.step}</div>
                  <h3 className="font-bold text-[#1E293B] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consumer Tools */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B]">Consumer Tools</h2>
            <button onClick={() => handleProtectedAction('citizen', 'access consumer tools')}
              className="text-[#002B7F] font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consumerTools.map((tool) => (
              <div key={tool.id} className="group card-lift bocra-focusable bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#002B7F] hover:shadow-xl cursor-pointer">
                <div className="w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tool.icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#1E293B] mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{tool.desc}</p>
                <button onClick={() => tool.requiresAuth ? handleProtectedAction(tool.page, `use ${tool.name}`) : setCurrentPage(tool.page)}
                  className="text-[#002B7F] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Launch Tool <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-12 bg-[#002B7F] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="text-[#2DD4BF]" />
            <h2 className="text-2xl font-bold">Live Statistics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Active Licenses */}
            <button onClick={() => setCurrentPage('sector')} className="bocra-focusable bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-xl p-6 text-left cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-white/80 uppercase tracking-wide">Active Licenses</span>
                <span className="text-[#2DD4BF] font-bold text-lg">1,247</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Telecommunications', value: 412, total: 1247, color: 'bg-[#2DD4BF]' },
                  { label: 'Internet Service Providers', value: 318, total: 1247, color: 'bg-[#F97316]' },
                  { label: 'Broadcasting (Radio)', value: 276, total: 1247, color: 'bg-purple-400' },
                  { label: 'Broadcasting (TV)', value: 145, total: 1247, color: 'bg-yellow-400' },
                  { label: 'Postal & Courier', value: 96, total: 1247, color: 'bg-green-400' },
                ].map(({ label, value, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                      <span>{label}</span><span className="font-medium text-white">{value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </button>

            {/* Complaints Resolved */}
            <button onClick={() => setCurrentPage('sector')} className="bocra-focusable bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-xl p-6 text-left cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-white/80 uppercase tracking-wide">Complaints Resolved</span>
                <span className="text-[#2DD4BF] font-bold text-lg">12,450</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Network Quality', value: 4210, total: 12450, color: 'bg-[#2DD4BF]' },
                  { label: 'Billing Disputes', value: 3180, total: 12450, color: 'bg-[#F97316]' },
                  { label: 'Customer Service', value: 2340, total: 12450, color: 'bg-purple-400' },
                  { label: 'Service Interruption', value: 1620, total: 12450, color: 'bg-yellow-400' },
                  { label: 'Data Privacy', value: 1100, total: 12450, color: 'bg-green-400' },
                ].map(({ label, value, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                      <span>{label}</span><span className="font-medium text-white">{value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </button>

            {/* .bw Domains */}
            <button onClick={() => setCurrentPage('qos')} className="bocra-focusable bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-xl p-6 text-left cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-white/80 uppercase tracking-wide">.bw Domains Registered</span>
                <span className="text-[#2DD4BF] font-bold text-lg">24,589</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'co.bw (Commercial)', value: 11240, total: 24589, color: 'bg-[#2DD4BF]' },
                  { label: 'org.bw (Organisations)', value: 5870, total: 24589, color: 'bg-[#F97316]' },
                  { label: 'gov.bw (Government)', value: 3920, total: 24589, color: 'bg-purple-400' },
                  { label: 'edu.bw (Education)', value: 2310, total: 24589, color: 'bg-yellow-400' },
                  { label: 'net.bw (Network)', value: 1249, total: 24589, color: 'bg-green-400' },
                ].map(({ label, value, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                      <span>{label}</span><span className="font-medium text-white">{value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </button>

            {/* Internet Penetration */}
            <button onClick={() => setCurrentPage('sector')} className="bocra-focusable bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-xl p-6 text-left cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-white/80 uppercase tracking-wide">Internet Penetration</span>
                <span className="text-[#2DD4BF] font-bold text-lg">67.5%</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Mobile Broadband (4G/5G)', value: 72, total: 100, color: 'bg-[#2DD4BF]' },
                  { label: 'Fixed Broadband', value: 18, total: 100, color: 'bg-[#F97316]' },
                  { label: 'Urban Coverage', value: 94, total: 100, color: 'bg-purple-400' },
                  { label: 'Rural Coverage', value: 48, total: 100, color: 'bg-yellow-400' },
                  { label: '5G Readiness', value: 31, total: 100, color: 'bg-green-400' },
                ].map(({ label, value, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                      <span>{label}</span><span className="font-medium text-white">{value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B]">Latest News & Updates</h2>
            <div className="flex gap-2">
              {['all', 'news', 'speech', 'statement'].map(filter => (
                <button key={filter} onClick={() => setNewsFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${newsFilter === filter ? 'bg-[#002B7F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {filter === 'all' ? 'All' : filter === 'news' ? 'News' : filter === 'speech' ? 'Speeches' : 'Statements'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map(item => (
              <button key={item.id} onClick={() => setCurrentPage('news')}
                className="card-lift bocra-focusable border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#002B7F]/20 transition-all text-left w-full cursor-pointer">
                <div className="h-32 overflow-hidden">
                  {item.image
                    ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] flex items-center justify-center"><TrendingUp size={32} className="text-white/40" /></div>
                  }
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="text-[#2DD4BF] font-medium capitalize">{item.category}</span>
                    <span>•</span><span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-[#1E293B] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.excerpt}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => setCurrentPage('news')} className="bocra-focusable px-6 py-2.5 border-2 border-[#002B7F] text-[#002B7F] rounded-lg font-medium hover:bg-[#002B7F] hover:text-white hover:scale-105 hover:shadow-md transition-all duration-300 text-sm cursor-pointer">
              View All News & Events
            </button>
          </div>
        </div>
      </section>

      {/* Quick Complaint */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Quick Complaint Filing</h2>
              <p className="text-white/80">Select a category to file your complaint</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {complaintCategories.map(category => (
                <button key={category}
                  onClick={() => handleProtectedAction('complaints', 'file a complaint')}
                  className="group lift-sm bocra-focusable p-4 bg-white/10 rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-250 text-left cursor-pointer">
                  <AlertTriangle size={18} className="text-[#2DD4BF] mb-2 group-hover:-translate-y-0.5 transition-transform" />
                  <div className="font-medium text-sm">{category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* License Application */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Apply for a License</h2>
              <p className="text-gray-600 mb-6">Streamlined online license application. Apply for telecommunications, broadcasting, ISP, or Value Added Services licenses.</p>
              <div className="space-y-4 mb-8">
                {[
                  { step: 1, title: 'Submit Application', desc: 'Fill in company and license details' },
                  { step: 2, title: 'Upload Documents', desc: 'Provide required documentation' },
                  { step: 3, title: 'Make Payment', desc: 'Pay application fees securely' },
                  { step: 4, title: 'Get Approval', desc: 'Receive your license certificate' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-9 h-9 bg-[#002B7F] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">{item.step}</div>
                    <div><div className="font-semibold text-[#1E293B] text-sm">{item.title}</div><div className="text-xs text-gray-500">{item.desc}</div></div>
                  </div>
                ))}
              </div>
              <button onClick={() => handleProtectedAction('licensing', 'start a license application')}
                className="bocra-focusable px-6 py-3 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 text-sm cursor-pointer">
                Start Application <ArrowRight size={16} />
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-[#1E293B] mb-4">License Categories</h3>
              <div className="space-y-2">
                {['Telecommunications Service', 'Internet Service Provider', 'Value Added Services', 'Broadcasting', 'Postal Operator'].map(cat => (
                  <button key={cat} onClick={() => handleProtectedAction('licensing', `apply for a ${cat} license`)}
                    className="bocra-focusable flex items-center gap-3 p-3 bg-white rounded-lg w-full hover:shadow-md hover:translate-x-1 hover:border-l-4 hover:border-[#002B7F] transition-all duration-200 text-left cursor-pointer">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">{cat}</span>
                    <ChevronRight size={14} className="text-gray-300 ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Checker */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1E293B] mb-3">Check .bw Domain Availability</h2>
          <p className="text-gray-500 mb-6 text-sm">Search for your perfect .bw domain name.</p>
          <div className="flex gap-3">
            <input type="text" placeholder="yourbusiness" value={domainCheck}
              onChange={e => setDomainCheck(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleDomainCheck()}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
            <span className="flex items-center px-3 py-3 bg-gray-100 rounded-lg text-gray-500 text-sm font-medium">.bw</span>
            <button onClick={handleDomainCheck} className="bocra-focusable px-5 py-3 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] hover:scale-105 hover:shadow-md transition-all duration-200 text-sm cursor-pointer">Check</button>
          </div>
          {domainResult && (
            <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${domainResult.available ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {domainResult.available ? `✅ ${domainResult.domain}.bw is available!` : `❌ ${domainResult.domain}.bw is already taken.`}
            </div>
          )}
        </div>
      </section>

      {/* Bulletin Board */}
      <section className="bg-[#002B7F] text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <span className="text-base font-bold tracking-wide text-white">BULLETIN BOARD</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/advertboard/Screenshot 2026-03-24 085041.png"
              alt="Vote Ms. Basedi Mosinyi"
              className="w-40 h-40 object-cover rounded-xl flex-shrink-0 shadow-lg"
            />
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <p className="text-[#2DD4BF] font-bold text-lg leading-snug">Vote Now!</p>
              <p className="text-white/90 text-base font-medium leading-relaxed">
                Vote Ms. Basedi Mosinyi — Botswana's Candidate to the ITU - Radio Regulation Board (RRB)
              </p>
              <div>
                <button className="bocra-focusable mt-1 px-5 py-2 bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-md transition-all duration-200 text-[#002B7F] text-sm font-semibold rounded-lg cursor-pointer">
                  Find Out More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tenders Ticker */}
      <section className="bg-[#002B7F] text-white py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <button onClick={() => setCurrentPage('tenders')}
            className="flex-shrink-0 px-3 py-1 bg-[#F97316] rounded text-xs font-semibold hover:bg-[#ea580c] transition-colors">
            LATEST TENDERS
          </button>
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-[ticker_25s_linear_infinite]">
              {['TND-2024-001 — Network Monitoring Equipment (Closes: 15 Apr 2024)',
                'TND-2024-002 — Spectrum Audit Consultancy (Closes: 20 Apr 2024)',
                'TND-2024-004 — Cybersecurity Training Program (Closes: 30 Apr 2024)',
                'TND-2024-005 — Website Redevelopment (Closes: 10 May 2024)'].map((t, i) => (
                <button key={i} onClick={() => setCurrentPage('tenders')} className="mx-8 text-xs whitespace-nowrap hover:text-[#2DD4BF]">{t}</button>
              ))}
              {['TND-2024-001 — Network Monitoring Equipment (Closes: 15 Apr 2024)',
                'TND-2024-002 — Spectrum Audit Consultancy (Closes: 20 Apr 2024)',
                'TND-2024-004 — Cybersecurity Training Program (Closes: 30 Apr 2024)',
                'TND-2024-005 — Website Redevelopment (Closes: 10 May 2024)'].map((t, i) => (
                <button key={`dup-${i}`} onClick={() => setCurrentPage('tenders')} className="mx-8 text-xs whitespace-nowrap hover:text-[#2DD4BF]">{t}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Toolbar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-white shadow-xl rounded-r-xl overflow-hidden">
        <div className="flex flex-col">
          {[
            { icon: SkipForward, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), title: 'Skip to top', active: false },
            { icon: Eye, action: () => setAccessibility(p => ({ ...p, screenReader: !p.screenReader })), title: 'Screen reader', active: accessibility.screenReader },
            { icon: Type, action: () => setAccessibility(p => ({ ...p, textSize: p.textSize === 'normal' ? 'large' : 'normal' })), title: 'Text size', active: accessibility.textSize !== 'normal' },
            { icon: Contrast, action: () => setAccessibility(p => ({ ...p, highContrast: !p.highContrast })), title: 'High contrast', active: accessibility.highContrast },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} title={btn.title}
              className={`p-3 hover:bg-gray-100 border-b border-gray-100 last:border-0 ${btn.active ? 'bg-[#2DD4BF]/10' : ''}`}>
              <btn.icon size={18} className={`${btn.active ? 'text-[#2DD4BF]' : 'text-[#002B7F]'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* BOTSI Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChatbot ? (
          <button onClick={() => setShowChatbot(true)}
            className="w-14 h-14 bg-[#002B7F] rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a4a9e] transition-colors">
            <MessageCircle size={26} className="text-white" />
          </button>
        ) : (
          <div className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
            <div className="bg-[#002B7F] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div><div className="font-semibold text-sm">BOTSI</div><div className="text-xs text-white/70">BOCRA Assistant • Online</div></div>
              </div>
              <button onClick={() => setShowChatbot(false)} className="text-white/60 hover:text-white"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.type === 'user' ? 'bg-[#002B7F] text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
                <button onClick={handleSendMessage} className="p-2 bg-[#002B7F] text-white rounded-lg hover:bg-[#1a4a9e]">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
