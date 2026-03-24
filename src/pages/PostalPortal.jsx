import { useState } from 'react';
import { 
  Package, Search, MapPin, Phone, Mail, Globe, Truck, Clock, CheckCircle,
  AlertCircle, FileText, ChevronRight, Filter, Download, Shield, Users,
  Building2, Star, ExternalLink
} from 'lucide-react';

export default function PostalPortal({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('directory');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [operatorFilter, setOperatorFilter] = useState('all');

  const operators = [
    { 
      id: 1, 
      name: 'BotswanaPost', 
      type: 'Universal Service Provider',
      services: ['Letters', 'Parcels', 'EMS', 'COD'],
      coverage: 'Nationwide',
      rating: 4.2,
      phone: '+267 367 3000',
      email: 'info@botswanapost.bw',
      branches: 89,
      verified: true
    },
    { 
      id: 2, 
      name: 'Courier Plus', 
      type: 'Private Courier',
      services: ['Express Delivery', 'Oversize Cargo', 'Temperature Controlled'],
      coverage: 'Major Cities',
      rating: 4.5,
      phone: '+267 390 5000',
      email: 'info@courierplus.bw',
      branches: 12,
      verified: true
    },
    { 
      id: 3, 
      name: 'DHL Botswana', 
      type: 'International Courier',
      services: ['Express Worldwide', 'Freight', 'Supply Chain'],
      coverage: 'International',
      rating: 4.7,
      phone: '+267 391 2000',
      email: 'enquiries@dhl.co.bw',
      branches: 8,
      verified: true
    },
    { 
      id: 4, 
      name: 'FedEx Botswana', 
      type: 'International Courier',
      services: ['Express Delivery', 'International Shipping'],
      coverage: 'International',
      rating: 4.6,
      phone: '+267 391 3000',
      email: 'fedex.bw@fedex.com',
      branches: 5,
      verified: true
    },
    { 
      id: 5, 
      name: 'SkyNet Botswana', 
      type: 'Private Courier',
      services: ['Express Delivery', 'Document Services', 'E-commerce'],
      coverage: 'Southern Africa',
      rating: 4.1,
      phone: '+267 392 1000',
      email: 'info@skynet.co.bw',
      branches: 15,
      verified: true
    },
    { 
      id: 6, 
      name: 'RAM Courier', 
      type: 'Local Courier',
      services: ['Same Day Delivery', 'Documents', 'Small Parcels'],
      coverage: 'Gaborone Region',
      rating: 3.9,
      phone: '+267 393 4000',
      email: 'ramcourier@gmail.com',
      branches: 3,
      verified: false
    },
  ];

  const trackingHistory = [
    { status: 'Delivered', location: 'Gaborone', date: '2024-03-15 14:30', completed: true },
    { status: 'Out for Delivery', location: 'Gaborone', date: '2024-03-15 08:00', completed: true },
    { status: 'Arrived at Distribution Center', location: 'Gaborone', date: '2024-03-14 22:15', completed: true },
    { status: 'Dispatched from Hub', location: 'Francistown', date: '2024-03-13 16:45', completed: true },
    { status: 'Package Processed', location: 'Francistown', date: '2024-03-12 11:30', completed: true },
    { status: 'Shipment Picked Up', location: 'Maun', date: '2024-03-11 09:00', completed: true },
  ];

  const universalServiceStats = {
    postOffices: 89,
    ruralCoverage: '78%',
    mailProcessed: '2.4M',
    parcelsDelivered: '456K',
    deliveryPoints: '312,500'
  };

  const filteredOperators = operators.filter(op => {
    const matchesSearch = op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          op.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = operatorFilter === 'all' || op.type === operatorFilter;
    return matchesSearch && matchesFilter;
  });

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
    setTrackingResult({
      trackingNumber: trackingNumber,
      status: 'In Transit',
      lastUpdate: '2024-03-15 14:30',
      history: trackingHistory
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#a30000] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Package size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Postal Services</h1>
              <p className="text-white/90">Regulating postal and courier services in Botswana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'directory', label: 'Operator Directory', icon: Building2 },
              { id: 'tracking', label: 'Parcel Tracking', icon: Truck },
              { id: 'licensing', label: 'Courier Licensing', icon: FileText },
              { id: 'universal', label: 'Universal Service', icon: Globe },
              { id: 'complaints', label: 'Complaints', icon: AlertCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
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
        {/* Operator Directory Tab */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search operators by name or service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                  />
                </div>
                <select
                  value={operatorFilter}
                  onChange={(e) => setOperatorFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                >
                  <option value="all">All Types</option>
                  <option value="Universal Service Provider">Universal Service Provider</option>
                  <option value="Private Courier">Private Courier</option>
                  <option value="International Courier">International Courier</option>
                  <option value="Local Courier">Local Courier</option>
                </select>
              </div>
            </div>

            {/* Operator Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOperators.map((operator) => (
                <div key={operator.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#8B0000] rounded-lg flex items-center justify-center">
                        <Truck size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#1E293B]">{operator.name}</h3>
                          {operator.verified && <CheckCircle size={16} className="text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-500">{operator.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{operator.coverage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 size={16} className="text-gray-400" />
                      <span>{operator.branches} branches</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(operator.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{operator.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {operator.services.map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} />
                      <span>{operator.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} />
                      <span>{operator.email}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors flex items-center justify-center gap-2">
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parcel Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">Track Your Package</h2>
                
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Enter tracking number (e.g., BW123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                  />
                  <button
                    onClick={handleTrack}
                    className="px-6 py-3 bg-[#8B0000] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors flex items-center gap-2"
                  >
                    <Search size={18} />
                    Track
                  </button>
                </div>

                {/* Trackable Services */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3">Track packages from:</p>
                  <div className="flex flex-wrap gap-2">
                    {['BotswanaPost', 'DHL', 'FedEx', 'Courier Plus', 'SkyNet'].map((service) => (
                      <span key={service} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tracking Result */}
                {trackingResult && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Tracking Number</p>
                        <p className="text-xl font-bold text-[#002B7F]">{trackingResult.trackingNumber}</p>
                      </div>
                      <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                        {trackingResult.status}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6">
                        {trackingResult.history.map((item, idx) => (
                          <div key={idx} className="flex gap-4 relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                              item.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {item.completed ? <CheckCircle size={16} className="text-white" /> : <Clock size={16} className="text-white" />}
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="font-medium text-[#1E293B]">{item.status}</div>
                              <div className="text-sm text-gray-500">{item.location} • {item.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#8B0000] to-[#a30000] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Unified Tracking</h3>
                <p className="text-white/80 text-sm mb-4">
                  Track packages from multiple courier services using a single platform.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} />
                    <span>Real-time updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} />
                    <span>Multiple carriers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} />
                    <span>Delivery notifications</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#1E293B] mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our postal regulation team for assistance.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-[#002B7F]" />
                    <span>+267 368 5100</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-[#002B7F]" />
                    <span>postal@bocra.bw</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courier Licensing Tab */}
        {activeTab === 'licensing' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="w-14 h-14 bg-[#8B0000] rounded-xl flex items-center justify-center mb-4">
                  <FileText size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3">Apply for Courier License</h3>
                <p className="text-gray-600 mb-6">
                  Obtain a license to operate as a postal or courier service provider in Botswana.
                </p>
                <button 
                  onClick={() => setCurrentPage('licensing')}
                  className="px-6 py-3 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors"
                >
                  Start Application
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="w-14 h-14 bg-[#2DD4BF] rounded-xl flex items-center justify-center mb-4">
                  <Shield size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3">License Categories</h3>
                <div className="space-y-3">
                  {[
                    { category: 'Category A', desc: 'Universal Service Provider', fee: 'P 50,000/year' },
                    { category: 'Category B', desc: 'International Courier', fee: 'P 30,000/year' },
                    { category: 'Category C', desc: 'National Courier', fee: 'P 15,000/year' },
                    { category: 'Category D', desc: 'Local Courier', fee: 'P 5,000/year' },
                  ].map((item) => (
                    <div key={item.category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-[#1E293B]">{item.category}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                      <div className="text-sm font-medium text-[#002B7F]">{item.fee}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-6">Licensing Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-3">Required Documents</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Company Registration Certificate
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Tax Clearance Certificate
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Proof of Financial Capability
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Network/Delivery Infrastructure Plan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Security Clearance (for certain categories)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E293B] mb-3">Compliance Obligations</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Meet universal service obligations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Submit quarterly performance reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Maintain minimum service standards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Participate in universal service fund
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Accept items from other licensed operators
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universal Service Tab */}
        {activeTab === 'universal' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { value: universalServiceStats.postOffices, label: 'Post Offices', icon: Building2 },
                { value: universalServiceStats.ruralCoverage, label: 'Rural Coverage', icon: MapPin },
                { value: universalServiceStats.mailProcessed, label: 'Mail Processed', icon: Package },
                { value: universalServiceStats.parcelsDelivered, label: 'Parcels Delivered', icon: Truck },
                { value: universalServiceStats.deliveryPoints, label: 'Delivery Points', icon: Users },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                  <stat.icon size={24} className="mx-auto text-[#F97316] mb-2" />
                  <div className="text-2xl font-bold text-[#1E293B]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Universal Service Obligations</h3>
                <p className="text-gray-600 mb-4">
                  BotswanaPost, as the universal service provider, is required to:
                </p>
                <ul className="space-y-3">
                  {[
                    'Maintain at least one post office in each district',
                    'Provide postal services to all inhabited areas',
                    'Offer basic postal services at affordable prices',
                    'Deliver mail at least once per week to all areas',
                    'Provide EMS (Express Mail Service) nationwide',
                    'Accept and process international mail'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Universal Service Fund</h3>
                <p className="text-gray-600 mb-4">
                  The Universal Service Fund (USF) ensures affordable postal services in underserved areas.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-500 mb-1">Annual Fund Allocation</div>
                  <div className="text-2xl font-bold text-[#002B7F]">P 12.5 Million</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rural Infrastructure</span>
                    <span className="font-medium">P 6.0M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Expansion</span>
                    <span className="font-medium">P 3.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Technology Upgrade</span>
                    <span className="font-medium">P 3.0M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">File a Postal Complaint</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Provider *</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]">
                        <option>Select provider</option>
                        {operators.map(op => (
                          <option key={op.id} value={op.name}>{op.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Type *</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]">
                        <option>Select type</option>
                        <option>Delayed Delivery</option>
                        <option>Lost Package</option>
                        <option>Damaged Package</option>
                        <option>Poor Service</option>
                        <option>Billing Issue</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number (if available)</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]" placeholder="Describe your complaint in detail..."></textarea>
                  </div>

                  <button className="w-full px-6 py-3 bg-[#8B0000] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors">
                    Submit Complaint
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#1E293B] mb-4">Complaint Categories</h3>
                <div className="space-y-2">
                  {[
                    'Delayed Delivery',
                    'Lost Package',
                    'Damaged Package',
                    'Poor Customer Service',
                    'Incorrect Billing',
                    'Failed Delivery Attempts'
                  ].map((cat) => (
                    <button key={cat} className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-[#1E293B] mb-2">Resolution Time</h4>
                <p className="text-sm text-gray-600">
                  We aim to resolve postal complaints within 14 business days.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
