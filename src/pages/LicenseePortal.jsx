import { useState } from 'react';
import { 
  Building2, RefreshCw, FileText, User, Clock, CheckCircle, 
  AlertTriangle, Download, ChevronRight, Plus
} from 'lucide-react';
import { mockData } from '../context/AuthContext';

export default function LicenseePortal({ setCurrentPage }) {
  const [actionLoading, setActionLoading] = useState(null);

  const getStatusConfig = (status) => {
    const configs = {
      active: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle, 
        label: 'Active' 
      },
      expiring_soon: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertTriangle, 
        label: 'Expiring Soon' 
      },
      expired: { 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertTriangle, 
        label: 'Expired' 
      },
    };
    return configs[status] || configs.active;
  };

  const handleAction = async (actionId) => {
    setActionLoading(actionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setActionLoading(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Building2 size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Botswana Telecom Solutions</h1>
              <p className="text-white/90">Licensee Portal Dashboard</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">{mockData.licenses.length}</div>
              <div className="text-sm">Total Licenses</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">
                {mockData.licenses.filter(l => l.status === 'active').length}
              </div>
              <div className="text-sm">Active</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">
                {mockData.licenses.filter(l => l.status === 'expiring_soon').length}
              </div>
              <div className="text-sm">Expiring Soon</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* License Management */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1E293B]">License Management</h2>
                <button className="text-[#002B7F] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {mockData.licenses.map((license, idx) => {
                  const statusConfig = getStatusConfig(license.status);
                  return (
                    <div 
                      key={idx}
                      className={`border rounded-xl p-4 ${statusConfig.color} border`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-mono">{license.id}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${statusConfig.color}`}>
                              <statusConfig.icon size={12} />
                              {statusConfig.label}
                            </span>
                          </div>
                          <h3 className="font-semibold">{license.name}</h3>
                          <p className="text-sm opacity-80">{license.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-80">Valid Until</div>
                          <div className="font-semibold">{license.validUntil}</div>
                        </div>
                      </div>

                      {license.status === 'expiring_soon' && (
                        <div className="mt-4 pt-4 border-t border-current/20">
                          <p className="text-sm mb-3">
                            ⚠️ This license expires soon. Renew now to avoid interruption of services.
                          </p>
                          <button
                            onClick={() => handleAction(`renew-${license.id}`)}
                            disabled={actionLoading === `renew-${license.id}`}
                            className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors disabled:opacity-50"
                          >
                            {actionLoading === `renew-${license.id}` ? (
                              <span className="flex items-center gap-2">
                                <RefreshCw size={16} className="animate-spin" />
                                Processing...
                              </span>
                            ) : (
                              'Renew License'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Activity Log */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#1E293B] mb-6">Activity Log</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Reference</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.activityLog.map((activity, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{activity.action}</td>
                        <td className="py-3 px-4 text-sm font-mono text-gray-500">{activity.reference}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{activity.date}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            activity.status === 'approved' || activity.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Center */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#1E293B] mb-4">Action Center</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleAction('renew')}
                  disabled={actionLoading === 'renew'}
                  className="w-full flex items-center gap-3 p-3 bg-[#F97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={actionLoading === 'renew' ? 'animate-spin' : ''} />
                  <span className="font-medium">Renew License</span>
                </button>
                <button 
                  onClick={() => handleAction('compliance')}
                  disabled={actionLoading === 'compliance'}
                  className="w-full flex items-center gap-3 p-3 bg-[#002B7F] text-white rounded-lg hover:bg-[#1a4a9e] transition-colors disabled:opacity-50"
                >
                  <FileText size={18} className={actionLoading === 'compliance' ? 'animate-spin' : ''} />
                  <span className="font-medium">Submit Compliance Report</span>
                </button>
                <button 
                  onClick={() => handleAction('update')}
                  disabled={actionLoading === 'update'}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left disabled:opacity-50"
                >
                  <User size={18} className="text-[#002B7F]" />
                  <span className="font-medium text-gray-700">Update Contact Details</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#1E293B] mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Compliance Score</span>
                  <span className="font-bold text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">Pending Renewals</span>
                  <span className="font-bold text-yellow-600">1</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">Pending Reports</span>
                  <span className="font-bold text-green-600">0</span>
                </div>
              </div>
            </div>

            {/* Apply for New License */}
            <div className="bg-gradient-to-br from-[#002B7F] to-[#1a4a9e] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Apply for New License</h3>
              <p className="text-sm text-white/80 mb-4">
                Expand your business with new license categories.
              </p>
              <button 
                onClick={() => setCurrentPage('licensing')}
                className="w-full px-4 py-2 bg-white text-[#002B7F] rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Start Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
