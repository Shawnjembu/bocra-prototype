import { useState } from 'react';
import { 
  Shield, AlertTriangle, Bell, FileText, Search, MapPin, Phone, Mail,
  Download, ChevronRight, CheckCircle, Clock, AlertCircle, Lock, Globe,
  Users, Building2, Landmark, Bug, Send, Eye, TrendingUp
} from 'lucide-react';

export default function BwcirtPortal({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [incidentForm, setIncidentForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    incidentType: '',
    severity: '',
    description: '',
    files: []
  });
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [subscriptionForm, setSubscriptionForm] = useState({
    email: '',
    phone: '',
    smsAlerts: false,
    emailAlerts: true,
    categories: ['all']
  });

  const incidentTypes = [
    'Malware/Ransomware', 'Phishing', 'Data Breach', 'DDoS Attack', 
    'Unauthorized Access', 'Social Engineering', 'Other'
  ];

  const severityLevels = [
    { value: 'critical', label: 'Critical', color: 'bg-red-500', description: 'Active breach, data exposed' },
    { value: 'high', label: 'High', color: 'bg-orange-500', description: 'Significant threat, immediate attention' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', description: 'Moderate impact, needs response' },
    { value: 'low', label: 'Low', color: 'bg-green-500', description: 'Minimal impact, informational' },
  ];

  const threats = [
    { id: 1, type: 'Ransomware', location: 'Gaborone', severity: 'critical', count: 12 },
    { id: 2, type: 'Phishing', location: 'Nationwide', severity: 'high', count: 45 },
    { id: 3, type: 'DDoS', location: 'Francistown', severity: 'medium', count: 8 },
    { id: 4, type: 'Malware', location: 'Kasane', severity: 'low', count: 23 },
  ];

  const alerts = [
    { id: 1, title: 'Critical Ransomware Campaign Targeting Financial Institutions', date: '2024-03-15', severity: 'critical' },
    { id: 2, title: 'New Phishing Campaign Using Fake BOCRA Emails', date: '2024-03-12', severity: 'high' },
    { id: 3, title: 'Vulnerability Disclosure: Popular Router Models', date: '2024-03-10', severity: 'medium' },
    { id: 4, title: 'Security Advisory: Mobile Banking Apps', date: '2024-03-08', severity: 'low' },
  ];

  const resources = {
    citizens: [
      { title: 'Online Safety Guide', type: 'PDF', size: '2.4 MB' },
      { title: 'Password Security Tips', type: 'PDF', size: '1.1 MB' },
      { title: 'Safe Browsing Guidelines', type: 'PDF', size: '0.8 MB' },
    ],
    businesses: [
      { title: 'Cybersecurity Best Practices', type: 'PDF', size: '3.2 MB' },
      { title: 'Incident Response Plan Template', type: 'DOCX', size: '0.5 MB' },
      { title: 'Employee Security Training', type: 'PDF', size: '5.1 MB' },
    ],
    government: [
      { title: 'National Cybersecurity Framework', type: 'PDF', size: '8.4 MB' },
      { title: 'Critical Infrastructure Protection', type: 'PDF', size: '4.2 MB' },
      { title: 'Security Compliance Guidelines', type: 'PDF', size: '2.8 MB' },
    ]
  };

  const handleSubmitIncident = (e) => {
    e.preventDefault();
    alert('Incident report submitted successfully. Reference: BWCIRT-' + Date.now());
  };

  const handleSubscribe = () => {
    setAlertSubscribed(true);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">bwCIRT</h1>
              <p className="text-white/90">Botswana Cybersecurity Incident Response Team</p>
            </div>
          </div>
          <p className="text-white/80 max-w-2xl mt-4">
            National CERT for Botswana. Reporting cyber incidents, providing threat intelligence, 
            and coordinating cybersecurity response across all sectors.
          </p>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <AlertTriangle size={20} />
          <span className="font-medium">Emergency Hotline: +267 368 5199</span>
          <span className="text-white/60">|</span>
          <span>24/7 Incident Response</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Threat Dashboard', icon: TrendingUp },
              { id: 'report', label: 'Report Incident', icon: FileText },
              { id: 'alerts', label: 'Alerts', icon: Bell },
              { id: 'resources', label: 'Resources', icon: Download },
              { id: 'vulnerability', label: 'VDP', icon: Bug },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#002B7F] border-b-2 border-[#002B7F]'
                    : 'text-gray-500 hover:text-[#002B7F]'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '156', label: 'Incidents This Month', trend: '+23%', color: 'bg-red-500' },
                { value: '89%', label: 'Resolution Rate', trend: '+5%', color: 'bg-green-500' },
                { value: '12', label: 'Active Threats', trend: '-8', color: 'bg-orange-500' },
                { value: '2,450', label: 'Alerts Sent', trend: '+120', color: 'bg-blue-500' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1E293B]">{stat.value}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-500">{stat.label}</div>
                    <div className="text-sm font-medium text-green-600">{stat.trend}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botswana Map with Threat Indicators */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Threat Distribution Map</h2>
              <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl overflow-hidden">
                {/* Simplified Botswana Map Representation */}
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Botswana outline simplified */}
                  <path 
                    d="M80,120 L180,80 L280,90 L320,150 L340,220 L320,280 L280,320 L180,340 L100,300 L60,240 L80,180 Z" 
                    fill="#E5E7EB" 
                    stroke="#002B7F" 
                    strokeWidth="2"
                  />
                  {/* Threat locations */}
                  <g>
                    <circle cx="200" cy="180" r="20" fill="#EF4444" opacity="0.8">
                      <title>Gaborone - Critical</title>
                    </circle>
                    <circle cx="160" cy="220" r="15" fill="#F97316" opacity="0.8">
                      <title>Molepolole - High</title>
                    </circle>
                    <circle cx="280" cy="160" r="15" fill="#F97316" opacity="0.8">
                      <title>Francistown - High</title>
                    </circle>
                    <circle cx="120" cy="280" r="10" fill="#EAB308" opacity="0.8">
                      <title>Kasane - Medium</title>
                    </circle>
                    <circle cx="240" cy="280" r="10" fill="#22C55E" opacity="0.8">
                      <title>Maun - Low</title>
                    </circle>
                  </g>
                </svg>
                <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span> Critical
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span> High
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Medium
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> Low
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Threats Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Recent Threats</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Location</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Severity</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Incidents</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {threats.map((threat) => (
                      <tr key={threat.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{threat.type}</td>
                        <td className="py-3 px-4 text-gray-600">{threat.location}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            threat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            threat.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            threat.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{threat.count}</td>
                        <td className="py-3 px-4">
                          <button className="text-[#002B7F] text-sm font-medium hover:underline">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Report Incident Tab */}
        {activeTab === 'report' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">Report a Security Incident</h2>
                <form onSubmit={handleSubmitIncident} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                        placeholder="+267 XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                        placeholder="Company name (if applicable)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                      >
                        <option value="">Select incident type</option>
                        {incidentTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Severity *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                      >
                        <option value="">Select severity</option>
                        {severityLevels.map((level) => (
                          <option key={level.value} value={level.value}>{level.label} - {level.description}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                      placeholder="Describe the incident in detail..."
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                    <input type="file" multiple className="hidden" id="incident-files" />
                    <label htmlFor="incident-files" className="flex items-center justify-center gap-2 text-gray-600 cursor-pointer">
                      <Download size={20} />
                      <span>Click to upload evidence files</span>
                    </label>
                    <p className="text-xs text-gray-400 text-center mt-2">Screenshots, logs, or any relevant evidence</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <Send size={18} />
                    Submit Incident Report
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-bold text-red-800 mb-3">Emergency Response</h3>
                <p className="text-sm text-red-700 mb-4">
                  For critical incidents requiring immediate assistance:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-red-800">
                    <Phone size={18} />
                    <span className="font-bold">+267 368 5199</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-800">
                    <Mail size={18} />
                    <span>emergency@bwcirt.bw</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#1E293B] mb-4">Response Times</h3>
                <div className="space-y-4">
                  {severityLevels.map((level) => (
                    <div key={level.value} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${level.color} rounded-full`}></div>
                        <span className="text-sm">{level.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {level.value === 'critical' ? '< 1 hour' : level.value === 'high' ? '< 4 hours' : level.value === 'medium' ? '< 24 hours' : '72 hours'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Security Alerts</h2>
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        alert.severity === 'critical' ? 'bg-red-100' :
                        alert.severity === 'high' ? 'bg-orange-100' :
                        alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <AlertCircle size={20} className={
                          alert.severity === 'critical' ? 'text-red-600' :
                          alert.severity === 'high' ? 'text-orange-600' :
                          alert.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        } />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">{alert.date}</span>
                        </div>
                        <h3 className="font-semibold text-[#1E293B]">{alert.title}</h3>
                      </div>
                    </div>
                    <button className="text-[#002B7F] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Subscribe to Alerts</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest security alerts delivered to your inbox or phone.
                </p>
                {alertSubscribed ? (
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <CheckCircle size={32} className="mx-auto mb-2" />
                    <p className="font-medium">Successfully Subscribed!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 rounded-lg text-gray-900"
                      value={subscriptionForm.email}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, email: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="Enter phone number (optional)"
                      className="w-full px-4 py-2 rounded-lg text-gray-900"
                      value={subscriptionForm.phone}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, phone: e.target.value })}
                    />
                    <button
                      onClick={handleSubscribe}
                      className="w-full px-4 py-2 bg-[#2DD4BF] text-[#002B7F] rounded-lg font-medium hover:bg-[#14b8a6]"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#1E293B] mb-4">Alert Categories</h3>
                <div className="space-y-2">
                  {['Critical Threats', 'Vulnerability Advisories', 'General Security', 'Policy Updates'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded text-[#002B7F]" defaultChecked />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1E293B] mb-6">Resource Center</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Citizens */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#2DD4BF] rounded-lg flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Citizens</h3>
                    <p className="text-sm text-gray-500">General public resources</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {resources.citizens.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#002B7F]" />
                        <span className="text-sm">{resource.title}</span>
                      </div>
                      <button className="text-[#002B7F] hover:text-[#1a4a9e]">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Businesses */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center">
                    <Building2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Businesses</h3>
                    <p className="text-sm text-gray-500">Corporate resources</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {resources.businesses.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#002B7F]" />
                        <span className="text-sm">{resource.title}</span>
                      </div>
                      <button className="text-[#002B7F] hover:text-[#1a4a9e]">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Government */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#002B7F] rounded-lg flex items-center justify-center">
                    <Landmark size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Government</h3>
                    <p className="text-sm text-gray-500">Public sector resources</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {resources.government.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#002B7F]" />
                        <span className="text-sm">{resource.title}</span>
                      </div>
                      <button className="text-[#002B7F] hover:text-[#1a4a9e]">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vulnerability Disclosure Tab */}
        {activeTab === 'vulnerability' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#002B7F] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bug size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Vulnerability Disclosure Program</h2>
                <p className="text-gray-600">
                  We welcome responsible disclosure of security vulnerabilities in Botswana's digital infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-[#1E293B] mb-4">Scope</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• .bw domain infrastructure</li>
                    <li>• BOCRA online services</li>
                    <li>• Licensed service provider systems</li>
                    <li>• Government digital services</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-[#1E293B] mb-4">Out of Scope</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Physical security testing</li>
                    <li>• Social engineering attacks</li>
                    <li>• Denial of service attacks</li>
                    <li>• Third-party systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#002B7F]/5 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-[#1E293B] mb-4">How to Report</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>
                    <span>Email details of the vulnerability to security@bwcirt.bw</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>
                    <span>Include steps to reproduce and potential impact</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>
                    <span>Our team will acknowledge within 48 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">4</span>
                    <span>We'll work with you on resolution and public disclosure</span>
                  </li>
                </ol>
              </div>

              <div className="text-center">
                <a 
                  href="mailto:security@bwcirt.bw" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors"
                >
                  <Mail size={18} />
                  Report Vulnerability
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
