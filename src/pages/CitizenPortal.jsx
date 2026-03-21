import { useState } from 'react';
import { 
  User, Shield, Smartphone, TrendingUp, Clock, CheckCircle, 
  AlertCircle, FileText, Search, ArrowRight, ChevronRight
} from 'lucide-react';
import { mockData } from '../context/AuthContext';

export default function CitizenPortal({ setCurrentPage }) {
  const [deviceIMEI, setDeviceIMEI] = useState('');
  const [imeiResult, setImeiResult] = useState(null);
  const [showTariffComparison, setShowTariffComparison] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Submitted' },
      under_review: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: 'Under Review' },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
    };
    const config = statusConfig[status] || statusConfig.submitted;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <config.icon size={14} />
        {config.label}
      </span>
    );
  };

  const handleIMEICheck = () => {
    if (deviceIMEI.length >= 15) {
      setImeiResult({
        status: 'clean',
        message: 'Device not found in stolen devices database',
        lastChecked: new Date().toISOString(),
      });
    } else {
      setImeiResult({
        status: 'error',
        message: 'Please enter a valid 15-digit IMEI number',
      });
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, John!</h1>
              <p className="text-white/90">Citizen Portal Dashboard</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">{mockData.complaints.length}</div>
              <div className="text-sm">Total Complaints</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">
                {mockData.complaints.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm">Resolved</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">
                {mockData.complaints.filter(c => c.status === 'under_review').length}
              </div>
              <div className="text-sm">In Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Complaint Tracker */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1E293B]">Complaint Tracker</h2>
                <button 
                  onClick={() => setCurrentPage('complaints')}
                  className="text-[#002B7F] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  File New <ArrowRight size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {mockData.complaints.map((complaint, idx) => (
                  <div 
                    key={idx}
                    className="border border-gray-100 rounded-xl p-4 hover:border-[#2DD4BF] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono text-gray-500">{complaint.id}</span>
                          {getStatusBadge(complaint.status)}
                        </div>
                        <h3 className="font-semibold text-[#1E293B]">{complaint.category}</h3>
                        <p className="text-sm text-gray-500">{complaint.provider}</p>
                        <p className="text-sm text-gray-600 mt-2">{complaint.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Submitted</div>
                        <div className="font-medium">{complaint.submittedDate}</div>
                        {complaint.resolvedDate && (
                          <>
                            <div className="text-sm text-gray-500 mt-2">Resolved</div>
                            <div className="font-medium text-green-600">{complaint.resolvedDate}</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Timeline Visual */}
                    {complaint.status !== 'resolved' && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">Submitted</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-200">
                          <div className="h-full bg-[#2DD4BF]" style={{ width: complaint.status === 'submitted' ? '0%' : '100%' }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${complaint.status === 'under_review' ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                          <span className="text-xs text-gray-500">Under Review</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-200">
                          <div className="h-full bg-green-500" style={{ width: complaint.status === 'resolved' ? '100%"' : '0%' }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${complaint.status === 'resolved' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          <span className="text-xs text-gray-500">Resolved</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Consumer Tools */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Consumer Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stolen Device Check */}
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#002B7F] rounded-lg flex items-center justify-center">
                      <Smartphone size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Stolen Device Check</h3>
                      <p className="text-xs text-gray-500">Check if a device has been reported stolen</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter 15-digit IMEI number"
                      value={deviceIMEI}
                      onChange={(e) => setDeviceIMEI(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm"
                    />
                    <button
                      onClick={handleIMEICheck}
                      className="w-full px-4 py-2 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors flex items-center justify-center gap-2"
                    >
                      <Search size={16} />
                      Check Device
                    </button>
                    {imeiResult && (
                      <div className={`p-3 rounded-lg text-sm ${
                        imeiResult.status === 'clean' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {imeiResult.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tariff Comparison */}
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#F97316] rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tariff Comparison</h3>
                      <p className="text-xs text-gray-500">Compare internet plans from providers</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTariffComparison(!showTariffComparison)}
                    className="w-full px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors flex items-center justify-center gap-2"
                  >
                    {showTariffComparison ? 'Hide Plans' : 'Compare Plans'}
                    <ChevronRight size={16} className={`transform transition-transform ${showTariffComparison ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showTariffComparison && (
                    <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                      {mockData.tariffPlans.map((plan, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-sm">{plan.provider}</div>
                              <div className="text-xs text-gray-500">{plan.plan}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-[#002B7F]">P{plan.price}</div>
                              <div className="text-xs text-gray-500">{plan.data}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#1E293B] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setCurrentPage('complaints')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <FileText size={18} className="text-[#002B7F]" />
                  <span className="text-sm font-medium">File New Complaint</span>
                </button>
                <button 
                  onClick={() => setCurrentPage('sector')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <TrendingUp size={18} className="text-[#2DD4BF]" />
                  <span className="text-sm font-medium">View Sector Data</span>
                </button>
                <button 
                  onClick={() => setCurrentPage('licensing')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <Shield size={18} className="text-[#F97316]" />
                  <span className="text-sm font-medium">Apply for License</span>
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-white/80 mb-4">
                Contact our consumer support team for assistance with any issues.
              </p>
              <div className="space-y-2 text-sm">
                <div>📞 +267 368 5100</div>
                <div>✉️ consumer@bocra.bw</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
