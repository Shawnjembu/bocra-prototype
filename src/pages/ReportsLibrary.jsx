import { useState } from 'react';
import { 
  FileText, Download, Search, Filter, Calendar, BarChart3, MapPin, 
  TrendingUp, Phone, Wifi, Radio, Globe, Users, Building2, ChevronRight,
  Eye, PieChart, LineChart
} from 'lucide-react';

export default function ReportsLibrary({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const reports = [
    { id: 1, title: 'Annual Report 2023', category: 'Annual Reports', year: 2023, size: '5.2 MB', date: 'March 15, 2024' },
    { id: 2, title: 'Quarterly Market Review Q4 2023', category: 'Market Analysis', year: 2023, size: '2.8 MB', date: 'January 30, 2024' },
    { id: 3, title: 'Telecommunications Sector Statistics', category: 'Statistics', year: 2023, size: '8.1 MB', date: 'January 15, 2024' },
    { id: 4, title: 'Broadcasting Industry Report', category: 'Industry Reports', year: 2023, size: '4.5 MB', date: 'December 20, 2023' },
    { id: 5, title: 'Internet Penetration Survey', category: 'Statistics', year: 2023, size: '6.2 MB', date: 'December 10, 2023' },
    { id: 6, title: 'Annual Report 2022', category: 'Annual Reports', year: 2022, size: '4.9 MB', date: 'March 15, 2023' },
    { id: 7, title: 'Postal Services Performance Report', category: 'Industry Reports', year: 2023, size: '3.1 MB', date: 'November 20, 2023' },
    { id: 8, title: 'Consumer Complaints Analysis', category: 'Statistics', year: 2023, size: '2.4 MB', date: 'October 5, 2023' },
    { id: 9, title: 'Spectrum Allocation Report', category: 'Technical Reports', year: 2023, size: '7.8 MB', date: 'September 15, 2023' },
    { id: 10, title: 'Mobile Network Quality Assessment', category: 'Technical Reports', year: 2023, size: '9.2 MB', date: 'August 20, 2023' },
  ];

  const categories = ['All', 'Annual Reports', 'Market Analysis', 'Statistics', 'Industry Reports', 'Technical Reports'];
  const years = ['All', '2024', '2023', '2022', '2021', '2020'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = yearFilter === 'all' || report.year === parseInt(yearFilter);
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesYear && matchesCategory;
  });

  const coverageData = [
    { region: 'Gaborone', population: 231592, coverage: 98, operators: 5 },
    { region: 'Francistown', population: 103903, coverage: 94, operators: 4 },
    { region: 'Molepolole', population: 73062, coverage: 87, operators: 3 },
    { region: 'Maun', population: 60234, coverage: 82, operators: 3 },
    { region: 'Serowe', population: 50578, coverage: 78, operators: 2 },
    { region: 'Kanye', population: 45893, coverage: 75, operators: 2 },
    { region: 'Mogoditshane', population: 43700, coverage: 95, operators: 4 },
    { region: 'Bobonong', population: 19576, coverage: 65, operators: 2 },
  ];

  const dashboardStats = [
    { title: 'Total Subscribers', value: '3.2M', change: '+8.5%', icon: Users },
    { title: 'Active Data Users', value: '1.8M', change: '+12.3%', icon: Globe },
    { title: 'Network Coverage', value: '94%', change: '+2.1%', icon: Wifi },
    { title: 'Service Providers', value: '28', change: '+3', icon: Building2 },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Reports & Data Library</h1>
              <p className="text-white/90">Access BOCRA publications, statistics, and sector data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'reports', label: 'Reports Library', icon: FileText },
              { id: 'dashboard', label: 'Interactive Dashboard', icon: BarChart3 },
              { id: 'coverage', label: 'Coverage Maps', icon: MapPin },
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
        {/* Reports Library Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year === 'all' ? 'All Years' : year}</option>
                    ))}
                  </select>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat === 'All' ? 'all' : cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#002B7F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={24} className="text-[#002B7F]" />
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{report.category}</span>
                      <h3 className="font-semibold text-[#1E293B] mt-2">{report.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors flex items-center justify-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-600 hover:border-[#002B7F] hover:text-[#002B7F] transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No reports found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Data Downloads Section */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Open Data Downloads</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { title: 'Subscriber Data', format: 'CSV', records: '125K' },
                  { title: 'Coverage Data', format: 'GeoJSON', records: '8K' },
                  { title: 'Complaint Statistics', format: 'CSV', records: '45K' },
                  { title: 'Licensee Directory', format: 'JSON', records: '280' },
                ].map((data, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#1E293B]">{data.title}</span>
                      <span className="px-2 py-1 bg-[#2DD4BF]/20 text-[#002B7F] rounded text-xs font-medium">{data.format}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">{data.records} records</div>
                    <button className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#002B7F] hover:text-[#002B7F] transition-colors flex items-center justify-center gap-2">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#002B7F]/10 rounded-lg flex items-center justify-center">
                      <stat.icon size={24} className="text-[#002B7F]" />
                    </div>
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#1E293B]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1E293B] mb-6">Subscriber Growth</h3>
                <div className="space-y-4">
                  {[
                    { year: '2023', value: 3.2, color: 'bg-[#002B7F]' },
                    { year: '2022', value: 2.9, color: 'bg-[#1a4a9e]' },
                    { year: '2021', value: 2.6, color: 'bg-[#2DD4BF]' },
                    { year: '2020', value: 2.3, color: 'bg-[#F97316]' },
                    { year: '2019', value: 2.0, color: 'bg-gray-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 text-sm text-gray-500">{item.year}</div>
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-lg transition-all duration-500`}
                          style={{ width: `${(item.value / 3.5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-right font-medium">{item.value}M</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1E293B] mb-6">Market Share by Operator</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#002B7F" strokeWidth="20" strokeDasharray="75.4 251.33" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#2DD4BF" strokeWidth="20" strokeDasharray="62.83 251.33" strokeDashoffset="-75.4" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="50.27 251.33" strokeDashoffset="-138.23" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#94a3b8" strokeWidth="20" strokeDasharray="62.83 251.33" strokeDashoffset="-188.5" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#1E293B]">100%</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'BTC (Mobile)', share: '30%', color: 'bg-[#002B7F]' },
                    { name: 'Mascom', share: '25%', color: 'bg-[#2DD4BF]' },
                    { name: 'Orange', share: '20%', color: 'bg-[#F97316]' },
                    { name: 'Others', share: '25%', color: 'bg-gray-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="flex-1 text-sm">{item.name}</span>
                      <span className="text-sm font-medium">{item.share}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#1E293B] mb-6">Sector Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { sector: 'Telecommunications', revenue: 'P 4.2B', growth: '+12%', icon: Phone },
                  { sector: 'Internet/ISP', revenue: 'P 2.8B', growth: '+18%', icon: Wifi },
                  { sector: 'Broadcasting', revenue: 'P 1.1B', growth: '+5%', icon: Radio },
                  { sector: 'Postal', revenue: 'P 320M', growth: '+3%', icon: Building2 },
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl">
                    <item.icon size={32} className="mx-auto text-[#002B7F] mb-3" />
                    <div className="font-bold text-[#1E293B]">{item.sector}</div>
                    <div className="text-2xl font-bold text-[#002B7F] my-2">{item.revenue}</div>
                    <div className="text-sm text-green-600">{item.growth} YoY</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Coverage Maps Tab */}
        {activeTab === 'coverage' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Network Coverage by Region</h2>
              
              {/* Map Representation */}
              <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl overflow-hidden mb-6">
                <svg viewBox="0 0 600 400" className="w-full h-full">
                  {/* Simplified Botswana map */}
                  <path 
                    d="M120,80 L280,50 L420,70 L480,150 L500,250 L460,320 L340,360 L200,350 L100,300 L60,220 L80,140 Z" 
                    fill="#E5E7EB" 
                    stroke="#002B7F" 
                    strokeWidth="2"
                  />
                  {/* Coverage points */}
                  {coverageData.map((region, idx) => {
                    const positions = [
                      { x: 280, y: 180 }, { x: 380, y: 120 }, { x: 220, y: 160 },
                      { x: 200, y: 280 }, { x: 320, y: 220 }, { x: 240, y: 100 },
                      { x: 300, y: 150 }, { x: 420, y: 260 }
                    ];
                    return (
                      <g key={idx}>
                        <circle 
                          cx={positions[idx].x} 
                          cy={positions[idx].y} 
                          r={region.coverage / 5} 
                          fill={region.coverage >= 90 ? '#22C55E' : region.coverage >= 80 ? '#EAB308' : '#EF4444'}
                          opacity="0.6"
                        />
                        <circle cx={positions[idx].x} cy={positions[idx].y} r="5" fill="#002B7F" />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 text-xs">
                  <div className="font-semibold mb-2">Coverage Legend</div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> 90%+ 
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> 70-89%
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span> Below 70%
                  </div>
                </div>
              </div>

              {/* Regional Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Region</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Population</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Coverage</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Operators</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverageData.map((region, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{region.region}</td>
                        <td className="py-3 px-4 text-gray-600">{region.population.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  region.coverage >= 90 ? 'bg-green-500' : region.coverage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${region.coverage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{region.coverage}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{region.operators}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            region.coverage >= 90 ? 'bg-green-100 text-green-800' :
                            region.coverage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {region.coverage >= 90 ? 'Excellent' : region.coverage >= 80 ? 'Good' : 'Needs Improvement'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
