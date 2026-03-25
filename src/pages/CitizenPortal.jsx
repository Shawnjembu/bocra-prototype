import { useState, useRef, useEffect } from 'react';
import {
  FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Zap, Phone,
  ArrowRight, Shield, X, User, Bell, Lock, RefreshCw, MessageCircle, Send
} from 'lucide-react';
import { useAuth, mockData } from '../context/AuthContext';

const CITIZEN_NOTIFICATIONS = [
  { id: 1, title: 'Complaint CMP-2024-001 Updated', body: 'Your complaint has been assigned to an agent.', time: '2 min ago', read: false, type: 'complaint' },
  { id: 2, title: 'License Application Received', body: 'Your application LIC-APP-001 is under review.', time: '1 hr ago', read: false, type: 'license' },
  { id: 3, title: 'BOCRA Alert: Network Advisory', body: 'Scheduled maintenance on Orange Botswana — 18 Mar 02:00–04:00.', time: '3 hrs ago', read: true, type: 'alert' },
  { id: 4, title: 'Speed Test Completed', body: 'Your last speed test result: 24.3 Mbps download.', time: 'Yesterday', read: true, type: 'info' },
];

function NotificationDropdown({ notifications, onClose, onMarkAll }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  const typeColor = { complaint: 'bg-orange-100 text-orange-600', license: 'bg-blue-100 text-blue-600', alert: 'bg-red-100 text-red-600', info: 'bg-green-100 text-green-600' };

  return (
    <div ref={ref} className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <span className="font-bold text-gray-800 text-sm">Notifications</span>
        <button onClick={onMarkAll} className="text-xs text-[#002B7F] font-medium hover:underline">Mark all read</button>
      </div>
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
        {notifications.map(n => (
          <div key={n.id} className={`px-4 py-3 flex gap-3 ${n.read ? 'opacity-60' : 'bg-blue-50/40'}`}>
            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-gray-300' : 'bg-[#F97316]'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
              <span className={`text-xs font-medium mt-1 inline-block px-1.5 py-0.5 rounded ${typeColor[n.type]}`}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t text-center">
        <button className="text-xs text-[#002B7F] font-medium hover:underline">View all notifications</button>
      </div>
    </div>
  );
}

const TABS = ['Dashboard', 'My Complaints', 'My Applications', 'Consumer Tools', 'bwCIRT'];

const STATUS_BADGE = {
  submitted: 'bg-blue-100 text-blue-700',
  under_review: 'bg-yellow-100 text-yellow-700',
  resolved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  approved: 'bg-green-100 text-green-700',
  pending_documents: 'bg-orange-100 text-orange-700',
};

const STEPS = { submitted: 0, under_review: 1, resolved: 2 };

function Toast({ msg, onClose }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#002B7F] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
      <CheckCircle size={18} className="text-[#2DD4BF]" />
      <span className="text-sm font-medium">{msg}</span>
      <button onClick={onClose}><X size={16} className="text-white/60 hover:text-white" /></button>
    </div>
  );
}

const CITIZEN_AI_RESPONSES = {
  'How do I file a complaint?': 'Go to the "My Complaints" tab and click "File New Complaint". Fill in the category, provider, and description. You\'ll receive a reference number immediately.',
  'Track my application': 'Open the "My Applications" tab to see real-time status updates for all your license applications and complaints.',
  'Tariff comparison help': 'Visit the "Consumer Tools" tab to compare mobile and internet plans side by side across all licensed operators.',
  'Contact BOCRA support': 'Call us on +267 368 5000, email info@bocra.bw, or visit our offices at plot 50671, Fairgrounds, Gaborone. Office hours: Mon–Fri, 7:30AM–4:30PM.',
};

export default function CitizenPortal({ setCurrentPage }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [toast, setToast] = useState('');
  const [complaints, setComplaints] = useState(mockData.complaints.filter(c => c.userId === 'CIT-001'));
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ category: '', provider: '', description: '' });
  const [trackRef, setTrackRef] = useState('');
  const [trackedComplaint, setTrackedComplaint] = useState(null);
  const [tariffFilter, setTariffFilter] = useState('all');
  const [speedResult, setSpeedResult] = useState(null);
  const [speedTesting, setSpeedTesting] = useState(false);
  const [incidentForm, setIncidentForm] = useState({ type: '', severity: '', description: '', anonymous: false });
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const [imeiInput, setImeiInput] = useState('');
  const [imeiResult, setImeiResult] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(CITIZEN_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: "Hi! I'm BOTSI, your BOCRA AI assistant. How can I help you today?" }
  ]);

  const sendChat = (text) => {
    const q = text || chatInput;
    if (!q.trim()) return;
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'user', text: q }]);
    const reply = CITIZEN_AI_RESPONSES[q] || "I don't have a specific answer for that. Please contact BOCRA directly at +267 368 5000 or info@bocra.bw.";
    setTimeout(() => setChatMessages(prev => [...prev, { type: 'bot', text: reply }]), 600);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const submitComplaint = () => {
    if (!newComplaint.category || !newComplaint.provider || !newComplaint.description) {
      showToast('Please fill in all required fields.'); return;
    }
    const id = `CMP-2024-0${complaints.length + 10}`;
    setComplaints(prev => [...prev, {
      id, userId: 'CIT-001', category: newComplaint.category, provider: newComplaint.provider,
      status: 'submitted', priority: 'medium', submittedDate: new Date().toISOString().split('T')[0],
      resolvedDate: null, description: newComplaint.description, assignedTo: null, response: null,
    }]);
    setNewComplaint({ category: '', provider: '', description: '' });
    setShowComplaintForm(false);
    showToast(`Complaint ${id} submitted successfully.`);
  };

  const trackComplaint = () => {
    const found = [...complaints, ...mockData.complaints].find(c => c.id === trackRef.trim());
    setTrackedComplaint(found || null);
    if (!found) showToast('No complaint found with that reference.');
  };

  const runSpeedTest = () => {
    setSpeedTesting(true); setSpeedResult(null);
    setTimeout(() => {
      setSpeedResult({ download: (Math.random() * 40 + 5).toFixed(1), upload: (Math.random() * 15 + 2).toFixed(1), ping: Math.floor(Math.random() * 50 + 10) });
      setSpeedTesting(false);
    }, 2500);
  };

  const checkIMEI = () => {
    if (imeiInput.length < 10) { showToast('Enter a valid IMEI number (at least 15 digits).'); return; }
    setImeiResult({ status: Math.random() > 0.3 ? 'clean' : 'reported_stolen', imei: imeiInput });
  };

  const submitIncident = () => {
    if (!incidentForm.type || !incidentForm.description) { showToast('Please fill in all required fields.'); return; }
    setIncidentSubmitted(true);
    showToast('Incident report submitted to bwCIRT successfully.');
  };

  const filteredTariffs = tariffFilter === 'all' ? mockData.tariffPlans : mockData.tariffPlans.filter(t => t.type === tariffFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast msg={toast} onClose={() => setToast('')} />}

      {/* Portal Header */}
      <div className="bg-[#002B7F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2DD4BF] rounded-full flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div>
                <p className="text-blue-200 text-sm">Welcome back,</p>
                <h1 className="text-2xl font-bold">{user?.name || 'Citizen'}</h1>
                <p className="text-blue-300 text-xs mt-0.5">Citizen Portal · {user?.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setShowNotifications(v => !v)} className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] rounded-full text-xs flex items-center justify-center font-bold">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <NotificationDropdown
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    onMarkAll={() => setNotifications(n => n.map(x => ({ ...x, read: true })))}
                  />
                )}
              </div>
              <button onClick={() => setCurrentPage('home')} className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">← Home</button>
            </div>
          </div>
          <div className="flex gap-1 mt-6 overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-white text-[#002B7F]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── DASHBOARD ── */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Complaints', value: complaints.length, color: 'bg-blue-500', icon: FileText },
                { label: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: 'bg-green-500', icon: CheckCircle },
                { label: 'Under Review', value: complaints.filter(c => c.status === 'under_review').length, color: 'bg-yellow-500', icon: Clock },
                { label: 'Pending', value: complaints.filter(c => c.status === 'submitted').length, color: 'bg-orange-500', icon: AlertTriangle },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-5">
                  <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                    <s.icon size={20} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-[#1E293B]">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-[#002B7F] mb-4">Recent Complaints</h3>
                <div className="space-y-3">
                  {complaints.slice(0, 3).map(c => (
                    <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-800">{c.id}</p>
                        <p className="text-xs text-gray-500">{c.category} · {c.provider}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_BADGE[c.status] || 'bg-gray-100 text-gray-600'}`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('My Complaints')} className="mt-4 text-[#002B7F] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ArrowRight size={14} />
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-[#002B7F] mb-4">Quick Actions</h3>
                <div className="space-y-1">
                  {[
                    { label: 'File a Complaint', icon: AlertTriangle, action: () => { setActiveTab('My Complaints'); setShowComplaintForm(true); } },
                    { label: 'Compare Tariffs', icon: TrendingUp, action: () => setActiveTab('Consumer Tools') },
                    { label: 'Speed Test', icon: Zap, action: () => setActiveTab('Consumer Tools') },
                    { label: 'Report Cyber Incident', icon: Shield, action: () => setActiveTab('bwCIRT') },
                    { label: 'Apply for License', icon: FileText, action: () => setCurrentPage('licensing') },
                  ].map((a, i) => (
                    <button key={i} onClick={a.action} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors">
                      <a.icon size={16} className="text-[#002B7F] flex-shrink-0" />
                      <span className="text-sm text-gray-700">{a.label}</span>
                      <ArrowRight size={13} className="text-gray-300 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MY COMPLAINTS ── */}
        {activeTab === 'My Complaints' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#002B7F]">My Complaints</h2>
              <button onClick={() => setShowComplaintForm(!showComplaintForm)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white rounded-lg font-medium text-sm hover:bg-[#ea580c] transition-colors">
                <FileText size={16} /> File New Complaint
              </button>
            </div>

            {showComplaintForm && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-[#2DD4BF]">
                <h3 className="font-bold text-[#002B7F] mb-4">New Complaint</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category *</label>
                    <select value={newComplaint.category} onChange={e => setNewComplaint(p => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F]">
                      <option value="">Select category...</option>
                      {['Network Quality', 'Billing Dispute', 'Customer Service', 'Service Interruption', 'Data Privacy', 'Contract Issues'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Provider *</label>
                    <select value={newComplaint.provider} onChange={e => setNewComplaint(p => ({ ...p, provider: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F]">
                      <option value="">Select provider...</option>
                      {['Botswana Telecommunications Corporation', 'Mascom Wireless', 'Orange Botswana', 'Botswana Postal Services', 'Other'].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea value={newComplaint.description} onChange={e => setNewComplaint(p => ({ ...p, description: e.target.value }))}
                    rows={4} placeholder="Describe your issue in detail..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F] resize-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={submitComplaint} className="px-5 py-2.5 bg-[#002B7F] text-white rounded-lg font-medium text-sm hover:bg-[#1a4a9e] transition-colors">Submit</button>
                  <button onClick={() => setShowComplaintForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {/* Track */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Track by Reference Number</h3>
              <div className="flex gap-2">
                <input value={trackRef} onChange={e => setTrackRef(e.target.value)} onKeyDown={e => e.key === 'Enter' && trackComplaint()}
                  placeholder="e.g. CMP-2024-001"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F]" />
                <button onClick={trackComplaint} className="px-4 py-2 bg-[#002B7F] text-white rounded-lg text-sm font-medium hover:bg-[#1a4a9e] transition-colors">Track</button>
              </div>
              {trackedComplaint && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-sm">{trackedComplaint.id}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[trackedComplaint.status]}`}>{trackedComplaint.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{trackedComplaint.category} · {trackedComplaint.provider}</p>
                  <div className="flex">
                    {['Submitted', 'Under Review', 'Resolved'].map((step, i) => (
                      <div key={step} className="flex-1 flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= (STEPS[trackedComplaint.status] ?? 0) ? 'bg-[#002B7F] text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</div>
                        <p className="text-xs text-gray-400 mt-1 text-center">{step}</p>
                      </div>
                    ))}
                  </div>
                  {trackedComplaint.response && (
                    <p className="mt-3 text-xs text-green-700 bg-white rounded p-3 border border-green-200"><strong>BOCRA Response:</strong> {trackedComplaint.response}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {complaints.map(c => (
                <div key={c.id} className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-sm font-bold text-[#002B7F]">{c.id}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[c.status]}`}>{c.status.replace('_', ' ')}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.priority}</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{c.category}</p>
                      <p className="text-xs text-gray-500">{c.provider} · Filed {c.submittedDate}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{c.description}</p>
                  {c.response && <p className="text-xs text-green-700 bg-green-50 rounded p-2"><strong>Response:</strong> {c.response}</p>}
                  <div className="flex mt-3">
                    {['Submitted', 'Under Review', 'Resolved'].map((step, i) => (
                      <div key={step} className="flex-1 flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${i <= (STEPS[c.status] ?? 0) ? 'bg-[#002B7F] text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</div>
                        <p className="text-xs text-gray-400 mt-1 text-center">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MY APPLICATIONS ── */}
        {activeTab === 'My Applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-xl font-bold text-[#002B7F]">License & Service Applications</h2>
              <button onClick={() => setCurrentPage('licensing')}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#002B7F] text-white rounded-lg font-medium text-sm hover:bg-[#1a4a9e] transition-colors">
                <FileText size={16} /> New Application
              </button>
            </div>
            {mockData.licenseApplications.slice(0, 2).map(app => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-sm font-bold text-[#002B7F]">{app.id}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[app.status] || 'bg-gray-100 text-gray-600'}`}>{app.status.replace('_', ' ')}</span>
                    </div>
                    <p className="font-semibold text-gray-800">{app.licenseType} Licence</p>
                    <p className="text-xs text-gray-500">{app.category} · {app.submittedDate} · Fee: {app.fee}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {app.documents.map((doc, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{doc}</span>
                      ))}
                    </div>
                    {app.rejectionReason && <p className="mt-2 text-xs text-red-700 bg-red-50 rounded p-2"><strong>Rejection:</strong> {app.rejectionReason}</p>}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500 text-sm mb-3">Ready to apply for a new licence?</p>
              <button onClick={() => setCurrentPage('licensing')} className="px-5 py-2 bg-[#F97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] transition-colors">Apply Now</button>
            </div>
          </div>
        )}

        {/* ── CONSUMER TOOLS ── */}
        {activeTab === 'Consumer Tools' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#002B7F]">Consumer Tools</h2>

            {/* Tariff Comparison */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-[#F97316]" />
                <h3 className="font-bold text-[#002B7F]">Tariff Comparison</h3>
              </div>
              <div className="flex gap-2 mb-5 flex-wrap">
                {['all', 'Fixed Broadband', 'Mobile Data'].map(f => (
                  <button key={f} onClick={() => setTariffFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tariffFilter === f ? 'bg-[#002B7F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {f === 'all' ? 'All Plans' : f}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#002B7F] text-white text-xs">
                      <th className="text-left px-4 py-2 rounded-l-lg">Provider</th>
                      <th className="text-left px-4 py-2">Plan</th>
                      <th className="text-left px-4 py-2">Data</th>
                      <th className="text-left px-4 py-2">Speed</th>
                      <th className="text-left px-4 py-2 rounded-r-lg">Price (BWP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTariffs.map((t, i) => (
                      <tr key={t.id} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 font-medium text-gray-800">{t.provider}</td>
                        <td className="px-4 py-3 text-gray-600">{t.plan}</td>
                        <td className="px-4 py-3 text-gray-600">{t.data}</td>
                        <td className="px-4 py-3 text-gray-600">{t.speed}</td>
                        <td className="px-4 py-3 font-bold text-[#002B7F]">P {t.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">* Data is indicative. Contact providers for current pricing and availability.</p>
            </section>

            {/* Speed Test */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="text-[#F97316]" />
                <h3 className="font-bold text-[#002B7F]">Internet Speed Test</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Test your current internet connection speed.</p>
              {speedResult && (
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: 'Download', value: `${speedResult.download} Mbps`, color: 'text-[#002B7F]' },
                    { label: 'Upload', value: `${speedResult.upload} Mbps`, color: 'text-[#2DD4BF]' },
                    { label: 'Ping', value: `${speedResult.ping} ms`, color: 'text-[#F97316]' },
                  ].map(r => (
                    <div key={r.label} className="text-center p-4 bg-gray-50 rounded-xl">
                      <p className={`text-2xl font-black ${r.color}`}>{r.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{r.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={runSpeedTest} disabled={speedTesting}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#002B7F] text-white rounded-lg font-medium text-sm hover:bg-[#1a4a9e] transition-colors disabled:opacity-60">
                <RefreshCw size={16} className={speedTesting ? 'animate-spin' : ''} />
                {speedTesting ? 'Testing...' : speedResult ? 'Run Again' : 'Run Speed Test'}
              </button>
            </section>

            {/* IMEI Check */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone size={20} className="text-[#F97316]" />
                <h3 className="font-bold text-[#002B7F]">Stolen Device Check (IMEI)</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Check if a device has been reported stolen using its IMEI number.</p>
              <div className="flex gap-2 max-w-md">
                <input value={imeiInput} onChange={e => setImeiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && checkIMEI()}
                  placeholder="Enter 15-digit IMEI"
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F]" />
                <button onClick={checkIMEI} className="px-4 py-2.5 bg-[#002B7F] text-white rounded-lg text-sm font-medium hover:bg-[#1a4a9e] transition-colors">Check</button>
              </div>
              {imeiResult && (
                <div className={`mt-3 p-3 rounded-lg text-sm font-medium max-w-md ${imeiResult.status === 'clean' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {imeiResult.status === 'clean' ? `✅ IMEI ${imeiResult.imei} — No reports found. Device is clear.` : `🚨 IMEI ${imeiResult.imei} — Reported stolen. Do not purchase.`}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── bwCIRT ── */}
        {activeTab === 'bwCIRT' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <Shield size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm">Cybersecurity Incident Reporting</p>
                <p className="text-red-600 text-xs mt-0.5">Report phishing, ransomware, data breaches or other cyber incidents to bwCIRT.</p>
              </div>
            </div>

            {incidentSubmitted ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#002B7F] mb-2">Incident Reported</h3>
                <p className="text-gray-500 text-sm mb-4">Your report has been submitted to bwCIRT. A reference number will be sent to you within 24 hours.</p>
                <button onClick={() => { setIncidentSubmitted(false); setIncidentForm({ type: '', severity: '', description: '', anonymous: false }); }}
                  className="px-5 py-2.5 bg-[#002B7F] text-white rounded-lg text-sm font-medium hover:bg-[#1a4a9e] transition-colors">
                  Report Another Incident
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-[#002B7F] mb-5">Report a Cyber Incident</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type *</label>
                      <select value={incidentForm.type} onChange={e => setIncidentForm(p => ({ ...p, type: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F]">
                        <option value="">Select type...</option>
                        {['Phishing', 'Ransomware', 'DDoS Attack', 'Data Breach', 'Malware', 'Account Compromise', 'Fraud / Scam', 'Other'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity Level</label>
                      <select value={incidentForm.severity} onChange={e => setIncidentForm(p => ({ ...p, severity: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F]">
                        <option value="">Select severity...</option>
                        {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea value={incidentForm.description} onChange={e => setIncidentForm(p => ({ ...p, description: e.target.value }))}
                      rows={4} placeholder="Describe what happened, when it occurred, and any systems affected..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002B7F] resize-none" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={incidentForm.anonymous} onChange={e => setIncidentForm(p => ({ ...p, anonymous: e.target.checked }))} className="w-4 h-4" />
                    <span className="text-sm text-gray-600">Submit anonymously — your identity will not be disclosed</span>
                  </label>
                  <button onClick={submitIncident} className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors">
                    Submit Incident Report
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-[#002B7F] mb-4">Active bwCIRT Alerts</h3>
              <div className="space-y-3">
                {mockData.incidents.map(inc => (
                  <div key={inc.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${inc.severity === 'critical' ? 'bg-red-500' : inc.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-gray-800">{inc.type}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${inc.severity === 'critical' ? 'bg-red-100 text-red-700' : inc.severity === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{inc.severity}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${inc.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{inc.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{inc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('bwcirt')} className="mt-4 text-[#002B7F] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Full bwCIRT Portal <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTSI Floating Chat */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChat ? (
          <button onClick={() => setShowChat(true)}
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
                <div><div className="font-semibold text-sm">BOTSI</div><div className="text-xs text-white/70">BOCRA Assistant · Online</div></div>
              </div>
              <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.type === 'user' ? 'bg-[#002B7F] text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-3 pt-2 border-t space-y-2">
              <div className="flex flex-wrap gap-1">
                {['How do I file a complaint?', 'Tariff comparison help', 'Contact BOCRA support'].map(p => (
                  <button key={p} onClick={() => sendChat(p)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-[#2DD4BF]/20 hover:text-[#002B7F] transition-colors">
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
                <button onClick={() => sendChat()} className="p-2 bg-[#002B7F] text-white rounded-lg hover:bg-[#1a4a9e]">
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
