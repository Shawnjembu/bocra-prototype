import { useState } from 'react';
import { Search, Download, Calendar, DollarSign, Filter, ChevronRight } from 'lucide-react';
import { mockData } from '../context/AuthContext';

const categories = ['All', 'Procurement', 'Services', 'Training', 'Consultancy'];

export default function TendersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTenders = mockData.tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tender.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tender.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || tender.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Tenders & Publications</h1>
          <p className="text-white/90">Current tender opportunities and public documents</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tenders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#002B7F] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tenders List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#1E293B]">
            {filteredTenders.length} tender{filteredTenders.length !== 1 ? 's' : ''} found
          </h2>
        </div>

        <div className="space-y-4">
          {filteredTenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-[#2DD4BF] transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-500">{tender.id}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      tender.status === 'open'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tender.status === 'open' ? '● Open' : '● Closed'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{tender.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {tender.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Closing: {tender.closingDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Filter size={16} />
                      {tender.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#002B7F] hover:text-[#002B7F] transition-colors">
                    <Download size={16} />
                    Download
                  </button>
                  {tender.status === 'open' && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] transition-colors">
                      Apply
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTenders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No tenders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Publications Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#1E293B] mb-6">Recent Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Annual Report 2023',
                date: 'March 1, 2024',
                type: 'Report',
                size: '5.2 MB',
              },
              {
                title: 'Spectrum Management Guidelines',
                date: 'February 15, 2024',
                type: 'Guidelines',
                size: '2.1 MB',
              },
              {
                title: 'Consumer Protection Code',
                date: 'January 30, 2024',
                type: 'Code',
                size: '1.8 MB',
              },
            ].map((pub, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-[#2DD4BF] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#002B7F]/10 rounded-lg flex items-center justify-center">
                    <Download size={20} className="text-[#002B7F]" />
                  </div>
                  <span className="text-xs text-gray-500">{pub.size}</span>
                </div>
                <h3 className="font-semibold text-[#1E293B] mb-2">{pub.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{pub.type}</span>
                  <span>•</span>
                  <span>{pub.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
