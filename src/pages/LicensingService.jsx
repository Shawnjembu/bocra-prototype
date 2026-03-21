import { useState } from 'react';
import { 
  FileText, Upload, CreditCard, CheckCircle, ChevronRight, ChevronLeft,
  Building2, Phone, Mail, File, ArrowRight
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Application', icon: FileText },
  { id: 2, title: 'Documents', icon: Upload },
  { id: 3, title: 'Payment', icon: CreditCard },
  { id: 4, title: 'Approval', icon: CheckCircle },
];

const licenseCategories = [
  { id: 'telecom', name: 'Telecommunications Service', description: 'Voice and data services' },
  { id: 'isp', name: 'Internet Service Provider (ISP)', description: 'Broadband and internet access' },
  { id: 'vas', name: 'Value Added Services', description: 'Premium content and services' },
  { id: 'broadcast', name: 'Broadcasting', description: 'Radio and television broadcasting' },
];

export default function LicensingService({ setCurrentPage }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    category: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.registrationNumber && formData.category;
      case 2:
        return formData.documents.length > 0;
      case 3:
        return true;
      default:
        return true;
    }
  };

  if (isComplete) {
    return (
      <div className="animate-fade-in py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Your application has been successfully submitted. You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2">Application Reference</p>
            <p className="text-2xl font-bold text-[#002B7F]">2024-BOCRA-LIC-001</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 bg-[#002B7F] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors"
            >
              Return to Home
            </button>
            <button 
              onClick={() => setCurrentPage('licensee')}
              className="px-6 py-3 border border-[#002B7F] text-[#002B7F] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View My Applications
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
          <h1 className="text-3xl font-bold mb-2">Online Licensing Service</h1>
          <p className="text-white/90">Apply for a new communications license or renew existing licenses</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-3 ${currentStep >= step.id ? 'text-[#002B7F]' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-[#002B7F] text-white' 
                        : 'bg-gray-100'
                  }`}>
                    {currentStep > step.id ? <CheckCircle size={20} /> : <step.icon size={20} />}
                  </div>
                  <span className="font-medium hidden sm:block">{step.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <ChevronRight size={24} className="mx-4 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Step 1: Application */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-[#1E293B] mb-6">Application Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                        placeholder="Enter company registered name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Registration Number *
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                        placeholder="e.g., CO2024/001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Category *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {licenseCategories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategorySelect(category.id)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              formData.category === category.id
                                ? 'border-[#2DD4BF] bg-[#2DD4BF]/10'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-[#1E293B]">{category.name}</div>
                            <div className="text-sm text-gray-500">{category.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20"
                          placeholder="email@company.bw"
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
                  </div>
                </div>
              )}

              {/* Step 2: Documents */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-[#1E293B] mb-6">Document Upload</h2>
                  
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#2DD4BF] transition-colors">
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-sm text-gray-400">Supported: PDF, DOC, JPG (Max 10MB each)</p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block mt-4 px-6 py-2 bg-[#002B7F] text-white rounded-lg font-medium cursor-pointer hover:bg-[#1a4a9e] transition-colors"
                      >
                        Select Files
                      </label>
                    </div>

                    {formData.documents.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-700">Uploaded Documents:</h3>
                        {formData.documents.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <File size={20} className="text-[#002B7F]" />
                            <span className="flex-1 text-sm">{file.name}</span>
                            <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Required Documents:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Company Registration Certificate</li>
                        <li>• Tax Clearance Certificate</li>
                        <li>• Proof of Address</li>
                        <li>• Technical Infrastructure Plan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-[#1E293B] mb-6">Payment Details</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-[#1E293B] mb-4">Application Fee Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">License Application Fee</span>
                          <span className="font-medium">P 2,500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Fee</span>
                          <span className="font-medium">P 500.00</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-[#002B7F]">P 3,000.00</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 border-2 border-[#002B7F] rounded-lg bg-[#002B7F]/5">
                          <CreditCard size={24} className="mx-auto text-[#002B7F]" />
                          <div className="text-sm font-medium mt-2">Credit/Debit Card</div>
                        </button>
                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300">
                          <Building2 size={24} className="mx-auto text-gray-400" />
                          <div className="text-sm font-medium mt-2 text-gray-600">Bank Transfer</div>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        💳 This is a demo. Click "Submit Application" to simulate the payment process.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Approval */}
              {currentStep === 4 && (
                <div className="animate-fade-in text-center py-8">
                  <div className="w-20 h-20 bg-[#2DD4BF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-[#2DD4BF]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Ready to Submit</h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Your application is ready. Click the button below to submit your license application. 
                    You will receive a confirmation email with your application reference number.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                    <h3 className="font-semibold mb-4">Application Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Company:</span>
                        <span className="font-medium">{formData.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium">{formData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Documents:</span>
                        <span className="font-medium">{formData.documents.length} files</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center gap-2 px-6 py-2 bg-[#F97316] text-white rounded-lg font-medium hover:bg-[#ea580c] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#1E293B] mb-4">Application Guide</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-sm">Application</div>
                    <div className="text-xs text-gray-500">Fill in company details</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-sm">Documents</div>
                    <div className="text-xs text-gray-500">Upload required files</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-sm">Payment</div>
                    <div className="text-xs text-gray-500">Pay application fee</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-[#002B7F] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-sm">Approval</div>
                    <div className="text-xs text-gray-500">Submit and wait</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-[#1E293B] mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Contact our licensing team for assistance.
              </p>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#002B7F]" />
                  <span>+267 368 5100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#002B7F]" />
                  <span>licensing@bocra.bw</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
