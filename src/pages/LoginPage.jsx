import { useState, useEffect } from 'react';
import { Shield, User, Building2, Lock, Eye, EyeOff, ArrowLeft, ChevronDown, RefreshCw, Mail, CheckCircle } from 'lucide-react';
import { useAuth, MOCK_CREDENTIALS } from '../context/AuthContext';

const ROLES = [
  { id: 'citizen', label: 'Citizen', icon: User, color: 'bg-[#2DD4BF]', description: 'File complaints, track applications, consumer tools', portal: 'citizen' },
  { id: 'licensee', label: 'Licensee', icon: Building2, color: 'bg-[#F97316]', description: 'Manage licences, submit compliance reports', portal: 'licensee' },
  { id: 'admin', label: 'Admin', icon: Shield, color: 'bg-[#002B7F]', description: 'Manage applications, complaints, content', portal: 'admin' },
  { id: 'superadmin', label: 'Super Admin', icon: Lock, color: 'bg-red-600', description: 'Full system control, user & role management', portal: 'superadmin' },
];

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b}`, answer: String(a + b) };
}

export default function LoginPage({ setCurrentPage, preselectedRole }) {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(preselectedRole || null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [emailConfirmScreen, setEmailConfirmScreen] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => { setCaptchaInput(''); setCaptcha(generateCaptcha()); }, [selectedRole]);

  const roleConfig = ROLES.find(r => r.id === selectedRole);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!selectedRole) { setError('Please select an account type.'); return; }
    if (captchaInput.trim() !== captcha.answer) {
      setError('Incorrect CAPTCHA answer. Please try again.');
      setCaptcha(generateCaptcha()); setCaptchaInput(''); return;
    }
    setLoading(true);
    setTimeout(() => {
      const creds = MOCK_CREDENTIALS[selectedRole];
      if (email === creds.email && password === creds.password) {
        if (selectedRole === 'citizen') {
          setEmailConfirmScreen(true);
          setTimeout(() => { login(selectedRole); setCurrentPage(roleConfig.portal); }, 3000);
        } else {
          login(selectedRole);
          setCurrentPage(roleConfig.portal);
        }
      } else {
        setError('Invalid email or password. Use the demo credentials shown below.');
        setCaptcha(generateCaptcha()); setCaptchaInput('');
      }
      setLoading(false);
    }, 800);
  };

  const handleDemoLogin = () => {
    if (!selectedRole) { setError('Please select an account type first.'); return; }
    if (captchaInput.trim() !== captcha.answer) {
      setError('Incorrect CAPTCHA answer. Please try again.');
      setCaptcha(generateCaptcha()); setCaptchaInput(''); return;
    }
    setLoading(true);
    setTimeout(() => {
      if (selectedRole === 'citizen') {
        setEmailConfirmScreen(true);
        setTimeout(() => { login(selectedRole); setCurrentPage(roleConfig.portal); }, 3000);
      } else {
        login(selectedRole);
        setCurrentPage(roleConfig.portal);
      }
    }, 600);
  };

  // Email confirmation screen
  if (emailConfirmScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002B7F] via-[#1a4a9e] to-[#2DD4BF] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={36} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-2">Check Your Email</h2>
          <p className="text-gray-500 text-sm mb-1">A confirmation link has been sent to</p>
          <p className="font-semibold text-gray-800 mb-6">{email || MOCK_CREDENTIALS.citizen.email}</p>
          <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
            <p className="text-xs text-blue-700">Click the link in your email to verify your account. You'll be redirected to your portal automatically…</p>
          </div>
          <div className="flex items-center gap-2 justify-center text-xs text-gray-400 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Redirecting to your portal in a moment…
          </div>
          {!resent ? (
            <button onClick={() => setResent(true)} className="text-[#002B7F] text-sm font-medium hover:underline flex items-center gap-1 mx-auto">
              <RefreshCw size={14} /> Resend confirmation email
            </button>
          ) : (
            <p className="text-green-600 text-sm font-medium">Email resent successfully!</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002B7F] via-[#1a4a9e] to-[#2DD4BF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Back button */}
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-[#002B7F] text-white p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                {roleConfig ? <roleConfig.icon size={32} className="text-white" /> : <Shield size={32} className="text-white" />}
              </div>
            </div>
            <h1 className="text-xl font-bold">BOCRA Portal Sign In</h1>
            <p className="text-blue-200 text-sm mt-1">Botswana Communications Regulatory Authority</p>
          </div>

          <div className="p-6 space-y-5">

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#002B7F] transition-colors"
                >
                  {selectedRole ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 ${roleConfig.color} rounded-full flex items-center justify-center`}>
                        <roleConfig.icon size={13} className="text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{roleConfig.label}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Select account type...</span>
                  )}
                  <ChevronDown size={18} className={`text-gray-400 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showRoleDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                    {ROLES.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => { setSelectedRole(role.id); setShowRoleDropdown(false); setError(''); setEmail(''); setPassword(''); }}
                        className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                      >
                        <div className={`w-8 h-8 ${role.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <role.icon size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{role.label}</p>
                          <p className="text-gray-500 text-xs">{role.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Login Form — shown after role selected */}
            {selectedRole && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={MOCK_CREDENTIALS[selectedRole].email}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#002B7F] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#002B7F] transition-colors"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* CAPTCHA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Security Check</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 bg-[#002B7F] text-white font-mono font-bold px-4 py-2.5 rounded-lg text-sm tracking-widest select-none">
                      {captcha.question} = ?
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      placeholder="Answer"
                      maxLength={2}
                      className="w-20 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#002B7F] transition-colors text-center font-bold"
                    />
                    <button type="button" onClick={() => { setCaptcha(generateCaptcha()); setCaptchaInput(''); }}
                      className="text-gray-400 hover:text-[#002B7F] transition-colors" title="New question">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>

                {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${roleConfig.color} hover:opacity-90 disabled:opacity-60`}
                >
                  {loading ? 'Signing in...' : `Sign In as ${roleConfig.label}`}
                </button>

                <button type="button" onClick={handleDemoLogin} disabled={loading} className="w-full py-3 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm disabled:opacity-60">
                  Demo Login (skip credentials)
                </button>

                {/* Demo credentials hint */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-1">DEMO CREDENTIALS</p>
                  <p className="text-xs text-gray-600 font-mono">{MOCK_CREDENTIALS[selectedRole].email}</p>
                  <p className="text-xs text-gray-600 font-mono">{MOCK_CREDENTIALS[selectedRole].password}</p>
                </div>
              </form>
            )}

            {/* Role cards if none selected */}
            {!selectedRole && (
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((role) => (
                  <button key={role.id} onClick={() => setSelectedRole(role.id)} className="flex flex-col items-center gap-2 p-4 border-2 border-gray-100 rounded-xl hover:border-[#002B7F] hover:shadow-sm transition-all">
                    <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center`}>
                      <role.icon size={20} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{role.label}</span>
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
