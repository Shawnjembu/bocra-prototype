import { TrendingUp, Users, Building2, Radio, Globe, BarChart3, PieChart } from 'lucide-react';
import { mockData } from '../context/AuthContext';

export default function SectorDashboard() {
  const { sectorStats } = mockData;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Sector Performance Dashboard</h1>
          <p className="text-white/90">Statistics and insights on Botswana's communications sector</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#002B7F]/10 rounded-lg flex items-center justify-center">
                <Globe size={24} className="text-[#002B7F]" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +{sectorStats.internetPenetration.growth}%
              </span>
            </div>
            <div className="text-3xl font-bold text-[#1E293B]">{sectorStats.internetPenetration.total}%</div>
            <div className="text-sm text-gray-500">Internet Penetration</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-lg flex items-center justify-center">
                <Building2 size={24} className="text-[#2DD4BF]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#1E293B]">{sectorStats.activeLicenses.total.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Active Licenses</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-[#F97316]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#1E293B]">1,218</div>
            <div className="text-sm text-gray-500">Total Complaints</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">98%</span>
            </div>
            <div className="text-3xl font-bold text-[#1E293B]">85%</div>
            <div className="text-sm text-gray-500">Resolution Rate</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Internet Penetration Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1E293B]">Internet Penetration Growth</h2>
              <Globe size={20} className="text-gray-400" />
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {sectorStats.internetPenetration.data.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-gray-500">{item.year}</div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#002B7F] to-[#2DD4BF] rounded-lg transition-all duration-500"
                      style={{ width: `${(item.value / 100) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right font-medium text-[#002B7F]">{item.value}%</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                📈 Internet penetration has grown by {sectorStats.internetPenetration.growth}% this year, 
                reflecting increased digital adoption across Botswana.
              </p>
            </div>
          </div>

          {/* Complaints by Provider Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1E293B]">Complaints by Provider</h2>
              <PieChart size={20} className="text-gray-400" />
            </div>

            {/* Pie Chart Visualization */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* BTC - 28% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#002B7F"
                    strokeWidth="20"
                    strokeDasharray="70.37 251.33"
                    strokeDashoffset="0"
                  />
                  {/* Mascom - 23% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#2DD4BF"
                    strokeWidth="20"
                    strokeDasharray="57.73 251.33"
                    strokeDashoffset="-70.37"
                  />
                  {/* Orange - 22% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="20"
                    strokeDasharray="55.29 251.33"
                    strokeDashoffset="-128.1"
                  />
                  {/* Other - 27% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="20"
                    strokeDasharray="67.86 251.33"
                    strokeDashoffset="-183.39"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1E293B]">1,218</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              {sectorStats.complaintsByProvider.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    idx === 0 ? 'bg-[#002B7F]' :
                    idx === 1 ? 'bg-[#2DD4BF]' :
                    idx === 2 ? 'bg-[#F97316]' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm text-gray-600">{item.provider}</span>
                  <span className="text-sm font-medium ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* License Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#1E293B]">Active License Distribution</h2>
            <Building2 size={20} className="text-gray-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Telecommunications', count: sectorStats.activeLicenses.telecommunications, color: 'bg-[#002B7F]' },
              { label: 'ISP', count: sectorStats.activeLicenses.isp, color: 'bg-[#2DD4BF]' },
              { label: 'VAS', count: sectorStats.activeLicenses.vas, color: 'bg-[#F97316]' },
              { label: 'Broadcast', count: sectorStats.activeLicenses.broadcast, color: 'bg-purple-500' },
              { label: 'Other', count: sectorStats.activeLicenses.other, color: 'bg-gray-400' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <Radio size={20} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-[#1E293B]">{item.count}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] rounded-xl p-6 text-white">
            <h3 className="font-bold mb-4">Mobile Penetration</h3>
            <div className="text-4xl font-bold mb-2">89%</div>
            <p className="text-white/80 text-sm">Of population has mobile phone access</p>
          </div>
          <div className="bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] rounded-xl p-6 text-white">
            <h3 className="font-bold mb-4">Broadband Coverage</h3>
            <div className="text-4xl font-bold mb-2">78%</div>
            <p className="text-white/80 text-sm">Geographic coverage achieved</p>
          </div>
          <div className="bg-gradient-to-br from-[#F97316] to-[#ea580c] rounded-xl p-6 text-white">
            <h3 className="font-bold mb-4">5G Readiness</h3>
            <div className="text-4xl font-bold mb-2">45%</div>
            <p className="text-white/80 text-sm">Infrastructure readiness score</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">
            📊 Data presented is for demonstration purposes. Visit bocra.bw for official statistics.
          </p>
        </div>
      </div>
    </div>
  );
}
