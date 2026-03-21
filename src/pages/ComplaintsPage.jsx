import { useState } from 'react';
import { 
  FileText, Search, CheckCircle, AlertCircle, Clock, Upload, 
  Send, ChevronRight, Building2, Phone, Mail
} from 'lucide-react';
import { mockData } from '../context/AuthContext';

const issueTypes = [
  'Network Quality',
  'Billing Dispute',
  'Customer Service',
  'Service Interruption',
  'Data Privacy',
  'Contract Issues',
  'Other',
];

const providers = [
  'Botswana Telecommunications Corporation',
  'Mascom Wireless',
  'Orange Botswana',
  'Other',
];

export default function ComplaintsPage({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('file'); // 'file' or 'track'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    provider: '',
    issueType: '',
    description: '',
    file: null,
  });
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleTrackComplaint = async () => {
    if (!trackingId) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find mock complaint or create a mock result
    const found = mockData.complaints.find(c => c.id === trackingId);
    if (found) {
      setTrackingResult(found);
    } else {
      setTrackingResult({
        id: trackingId,
        status: 'not_found',
        message: 'No complaint found with this reference number. Please check and try again.',
      });
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Submitted' },
      under_review: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: 'Under Review' },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
      not_found: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Not Found' },
    };
    return configs[status] || configs.submitted;
  };

  if (submitSuccess) {
    return (
      <div className="animate-fade-in py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-4">Complaint Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Your complaint has been successfully submitted. Our team will review it and get back to you within the stipulated timeframe.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2">Your Reference Number</p>
            <p className="text-2xl font-bold text-[#002B7F]">2024-BOCRA-001</p>
            <p className="text-sm text-gray-500 mt-2">Please save this number for tracking your complaint.</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                setSubmitSuccess(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  provider: '',
                  issueType: '',
                  description: '',
                  file: null,
                });
              }}
              className="px-6 py-3 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors"
            >
              Submit Another Complaint
            </button>
            <button 
              onClick={() => {
                setActiveTab('track');
                setSubmitSuccess(false);
              }}
              className="px-6 py-3 border border-[#002B7F] text-[#002B7F] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Track This Complaint
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002B7F] to-[#1a4a9e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Public Complaints</h1>
          <p className="text-white/90">File a complaint or check the status of an existing complaint</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('file')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'file'
                  ? 'border-[#002B7F] text-[#002B7F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText size={20} className="inline mr-2" />
              File a Complaint
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeTab === 'track'
                  ? 'border-[#002B7F] text-[#002B7F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Search size={20} className="inline mr-2" />
              Check Status
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'file' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">Complaint Form</h2>
                
                <form onSubmit={handleSubmitComplaint} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                      placeholder="+267 XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Provider *
                    </label>
                    <select
                      name="provider"
                      value={formData.provider}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                    >
                      <option value="">Select a provider</option>
                      {providers.map((provider) => (
                        <option key={provider} value={provider}>{provider}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Type *
                    </label>
                    <select
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                    >
                      <option value="">Select issue type</option>
                      {issueTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="complaint-file"
                      />
                      <label
                        htmlFor="complaint-file"
                        className="flex items-center justify-center gap-2 text-gray-600 cursor-pointer"
                      >
                        <Upload size={20} />
                        <span>Click to upload supporting documents</span>
                      </label>
                      <p className="text-xs text-gray-400 text-center mt-2">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                    {formData.file && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.file.name}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Complaint
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">Track Your Complaint</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Reference Number
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="e.g., CMP-2024-001"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                    />
                    <button
                      onClick={handleTrackComplaint}
                      className="px-6 py-3 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors flex items-center gap-2"
                    >
                      <Search size={18} />
                      Track
                    </button>
                  </div>
                </div>

                {trackingResult && (
                  <div className={`rounded-xl p-6 ${
                    trackingResult.status === 'not_found' 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    {trackingResult.status === 'not_found' ? (
                      <div className="text-center">
                        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Complaint Not Found</h3>
                        <p className="text-red-600">{trackingResult.message}</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Reference Number</span>
                            <p className="text-xl font-bold text-[#002B7F]">{trackingResult.id}</p>
                          </div>
                          {(() => {
                            const StatusIcon = getStatusConfig(trackingResult.status).icon;
                            const statusConfig = getStatusConfig(trackingResult.status);
                            return (
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                                <StatusIcon size={16} />
                                {statusConfig.label}
                              </span>
                            );
                          })()}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Category</span>
                            <p className="font-medium">{trackingResult.category}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Service Provider</span>
                            <p className="font-medium">{trackingResult.provider}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Description</span>
                            <p className="text-gray-700">{trackingResult.description}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Submitted Date</span>
                            <p className="font-medium">{trackingResult.submittedDate}</p>
                          </div>
                          {trackingResult.resolvedDate && (
                            <div>
                              <span className="text-sm text-gray-500">Resolved Date</span>
                              <p className="font-medium text-green-600">{trackingResult.resolvedDate}</p>
                            </div>
                          )}
                        </div>

                        {trackingResult.status !== 'resolved' && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                              Your complaint is currently being reviewed. We appreciate your patience.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#1E293B] mb-4">Complaint Process</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-sm">Submit Complaint</div>
                    <div className="text-xs text-gray-500">Fill out the complaint form</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-sm">Review</div>
                    <div className="text-xs text-gray-500">We review your complaint</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-sm">Investigation</div>
                    <div className="text-xs text-gray-500">We investigate the issue</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-sm">Resolution</div>
                    <div className="text-xs text-gray-500">We provide a resolution</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-[#1E293B] mb-3">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} className="text-[#002B7F]" />
                  <span>+267 368 5100</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} className="text-[#002B7F]" />
                  <span>complaints@bocra.bw</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 size={16} className="text-[#002B7F]" />
                  <span>Mon-Fri 7:30 AM - 4:30 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F97316]/10 rounded-xl p-6">
              <h4 className="font-semibold text-[#1E293B] mb-2">Emergency Hotline</h4>
              <p className="text-sm text-gray-600 mb-3">
                For urgent communications emergencies outside business hours.
              </p>
              <p className="text-xl font-bold text-[#F97316]">+267 368 5199</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
