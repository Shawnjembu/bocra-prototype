import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Mock credentials for demo logins
export const MOCK_CREDENTIALS = {
  citizen: { email: 'citizen@demo.bw', password: 'citizen123', name: 'Kabo Mosimanegape', id: 'CIT-001', idNumber: '820412345' },
  licensee: { email: 'licensee@demo.bw', password: 'licensee123', name: 'Botswana Telecom Solutions Ltd', id: 'LIC-001', regNumber: 'BW2015/001234' },
  admin: { email: 'admin@bocra.bw', password: 'admin123', name: 'Tshegofatso Kgatlhe', id: 'ADM-001', department: 'Compliance and Monitoring' },
  superadmin: { email: 'superadmin@bocra.bw', password: 'super123', name: 'Director of IT Systems', id: 'SUP-001', department: 'Corporate Support' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('public');

  const login = (type, userData = {}) => {
    setUserType(type);
    setUser({ ...MOCK_CREDENTIALS[type], role: type, ...userData });
  };

  const logout = () => {
    setUser(null);
    setUserType('public');
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

// ─── MOCK DATA ──────────────────────────────────────────────────────────────

export const mockData = {

  // ── Complaints ──────────────────────────────────────────────────────────
  complaints: [
    { id: 'CMP-2024-001', userId: 'CIT-001', citizenName: 'Kabo Mosimanegape', category: 'Network Quality', provider: 'Botswana Telecommunications Corporation', status: 'resolved', priority: 'medium', submittedDate: '2024-01-15', resolvedDate: '2024-01-28', description: 'Poor network coverage in Gaborone North, calls dropping frequently.', assignedTo: 'ADM-001', response: 'Issue escalated to BTCL. Network upgrades scheduled for Q2 2024.' },
    { id: 'CMP-2024-002', userId: 'CIT-001', citizenName: 'Kabo Mosimanegape', category: 'Billing Dispute', provider: 'Mascom Wireless', status: 'under_review', priority: 'high', submittedDate: '2024-02-10', resolvedDate: null, description: 'Charged P450 for data I did not use. Requesting refund.', assignedTo: 'ADM-001', response: null },
    { id: 'CMP-2024-003', userId: 'CIT-001', citizenName: 'Kabo Mosimanegape', category: 'Customer Service', provider: 'Orange Botswana', status: 'submitted', priority: 'low', submittedDate: '2024-03-01', resolvedDate: null, description: 'Waited 3 weeks for SIM replacement with no resolution.', assignedTo: null, response: null },
    { id: 'CMP-2024-004', userId: 'CIT-002', citizenName: 'Lesego Tshimologo', category: 'Service Interruption', provider: 'Botswana Telecommunications Corporation', status: 'under_review', priority: 'high', submittedDate: '2024-02-20', resolvedDate: null, description: 'Internet service down for 5 days with no communication from provider.', assignedTo: 'ADM-001', response: null },
    { id: 'CMP-2024-005', userId: 'CIT-003', citizenName: 'Goitse Ramogapi', category: 'Data Privacy', provider: 'Mascom Wireless', status: 'resolved', priority: 'high', submittedDate: '2024-01-05', resolvedDate: '2024-01-20', description: 'Received marketing calls after opting out. Possible data breach.', assignedTo: 'ADM-001', response: 'Provider investigated and confirmed opt-out list was not updated. Corrective action taken.' },
  ],

  // ── License Applications ─────────────────────────────────────────────────
  licenseApplications: [
    { id: 'APP-2024-001', userId: 'LIC-001', companyName: 'Botswana Telecom Solutions Ltd', licenseType: 'Telecommunications', category: 'SAP', status: 'under_review', submittedDate: '2024-01-10', regNumber: 'BW2015/001234', contactEmail: 'bts@demo.bw', fee: 'P 15,000', documents: ['Company Registration', 'Financial Statements', 'Technical Proposal'], assignedTo: 'ADM-001' },
    { id: 'APP-2024-002', userId: 'LIC-002', companyName: 'NetConnect Botswana (Pty) Ltd', licenseType: 'ISP', category: 'NFP', status: 'approved', submittedDate: '2024-01-05', regNumber: 'BW2018/005678', contactEmail: 'netconnect@demo.bw', fee: 'P 25,000', documents: ['Company Registration', 'Infrastructure Plan'], assignedTo: 'ADM-001' },
    { id: 'APP-2024-003', userId: 'LIC-003', companyName: 'MediaStream BW Ltd', licenseType: 'Broadcasting', category: 'CSP', status: 'pending_documents', submittedDate: '2024-02-14', regNumber: 'BW2020/009999', contactEmail: 'media@demo.bw', fee: 'P 10,000', documents: ['Company Registration'], assignedTo: null },
    { id: 'APP-2024-004', userId: 'LIC-004', companyName: 'VAS Technologies BW', licenseType: 'Value Added Services', category: 'SAP', status: 'rejected', submittedDate: '2024-01-20', regNumber: 'BW2021/007788', contactEmail: 'vas@demo.bw', fee: 'P 8,000', documents: ['Company Registration', 'Business Plan'], assignedTo: 'ADM-001', rejectionReason: 'Incomplete technical documentation. Resubmit with full spectrum proposal.' },
  ],

  // ── Active Licenses ──────────────────────────────────────────────────────
  licenses: [
    { id: 'LIC-2024-001', userId: 'LIC-001', companyName: 'Botswana Telecom Solutions Ltd', name: 'Telecommunications Service License', category: 'SAP', status: 'active', issuedDate: '2022-01-01', expiryDate: '2027-01-01' },
    { id: 'LIC-2024-002', userId: 'LIC-001', companyName: 'Botswana Telecom Solutions Ltd', name: 'Internet Service Provider License', category: 'NFP', status: 'expiring_soon', issuedDate: '2021-06-15', expiryDate: '2024-06-15' },
    { id: 'LIC-2024-003', userId: 'LIC-001', companyName: 'Botswana Telecom Solutions Ltd', name: 'Value Added Services License', category: 'SAP', status: 'expired', issuedDate: '2019-03-01', expiryDate: '2024-03-01' },
  ],

  // ── Admin Users ──────────────────────────────────────────────────────────
  adminUsers: [
    { id: 'ADM-001', name: 'Tshegofatso Kgatlhe', email: 'tkgatlhe@bocra.bw', role: 'admin', department: 'Compliance and Monitoring', status: 'active', createdDate: '2023-03-01', lastLogin: '2024-03-20' },
    { id: 'ADM-002', name: 'Phenyo Ditshebo', email: 'pditshebo@bocra.bw', role: 'admin', department: 'Business Development', status: 'active', createdDate: '2023-06-15', lastLogin: '2024-03-19' },
    { id: 'ADM-003', name: 'Oratile Mmolai', email: 'ommolai@bocra.bw', role: 'admin', department: 'Technical Services', status: 'inactive', createdDate: '2022-11-01', lastLogin: '2024-02-28' },
  ],

  // ── Tenders ──────────────────────────────────────────────────────────────
  tenders: [
    { id: 'TND-2024-001', title: 'Supply and Installation of Network Monitoring Equipment', category: 'Procurement', status: 'open', publishedDate: '2024-03-01', closingDate: '2024-04-15', budget: 'P 5,000,000', description: 'BOCRA invites tenders for supply and installation of QoS network monitoring equipment at designated sites across Botswana.', contact: 'procurement@bocra.bw' },
    { id: 'TND-2024-002', title: 'Consultancy Services for National Spectrum Audit', category: 'Services', status: 'open', publishedDate: '2024-03-05', closingDate: '2024-04-20', budget: 'P 2,500,000', description: 'BOCRA seeks a qualified consultant to conduct a comprehensive audit of the national radio frequency spectrum.', contact: 'procurement@bocra.bw' },
    { id: 'TND-2024-003', title: 'Office Furniture Supply and Fit-out', category: 'Procurement', status: 'closed', publishedDate: '2024-01-15', closingDate: '2024-03-01', budget: 'P 1,200,000', description: 'Supply and installation of office furniture for BOCRA headquarters.', contact: 'procurement@bocra.bw' },
    { id: 'TND-2024-004', title: 'Cybersecurity Awareness Training Program', category: 'Training', status: 'open', publishedDate: '2024-03-10', closingDate: '2024-04-30', budget: 'P 800,000', description: 'BOCRA requires a service provider to conduct cybersecurity training for staff and public institutions.', contact: 'procurement@bocra.bw' },
    { id: 'TND-2024-005', title: 'Website Redevelopment and Hosting Services', category: 'Consultancy', status: 'open', publishedDate: '2024-03-12', closingDate: '2024-05-10', budget: 'P 3,200,000', description: 'BOCRA invites proposals for the full redevelopment and hosting of its public-facing digital platforms.', contact: 'procurement@bocra.bw' },
  ],

  // ── News & Events ────────────────────────────────────────────────────────
  news: [
    { id: 1, type: 'news', category: 'regulatory', date: '2024-03-15', title: 'BOCRA Launches New Online Licensing Portal', excerpt: 'The new portal provides a streamlined experience for license applicants across all regulated sectors.', body: 'BOCRA today launched a new online licensing portal designed to simplify the application process for telecommunications, broadcasting, ISP and postal service licences. The portal features real-time application tracking, document upload, and integrated payment processing.', author: 'BOCRA Communications', published: true, image: '/images/news/635036951_1347279590770115_3603102997177699115_n.jpg' },
    { id: 2, type: 'speech', category: 'leadership', date: '2024-03-12', title: 'Keynote Address: Digital Transformation in Botswana', excerpt: 'CEO discusses the future of communications regulation and the path to a digitally driven society.', body: 'In a keynote address at the annual Communications Sector Forum, the BOCRA Chief Executive outlined the authority\'s five-year roadmap for regulatory reform.', author: 'Office of the CEO', published: true, image: '/images/news/647144726_1369366781894729_4830595175703378796_n.jpg' },
    { id: 3, type: 'statement', category: 'policy', date: '2024-03-10', title: 'Statement on National Spectrum Allocation', excerpt: 'BOCRA announces updated spectrum allocation guidelines for 5G deployment.', body: 'BOCRA has issued updated guidelines for the allocation of spectrum for 5G services. Licensed operators are required to submit spectrum utilisation plans by 30 June 2024.', author: 'BOCRA Regulatory Affairs', published: true, image: '/images/news/649328637_1370840881747319_2084495551010995861_n.jpg' },
    { id: 4, type: 'news', category: 'consumer', date: '2024-03-08', title: 'New Consumer Protection Guidelines Take Effect', excerpt: 'Updated guidelines strengthen consumer rights across all communications sectors.', body: 'The updated Consumer Protection Guidelines, effective 1 April 2024, introduce new obligations for service providers regarding billing transparency, complaint resolution timelines, and data handling.', author: 'BOCRA Communications', published: true, image: '/images/news/642800723_1356812449816829_990481576931445014_n.jpg' },
    { id: 5, type: 'news', category: 'statistics', date: '2024-03-05', title: 'Internet Penetration Reaches 67.5%', excerpt: 'Botswana achieves a significant milestone in digital connectivity.', body: 'BOCRA\'s latest sector statistics report confirms that internet penetration in Botswana has reached 67.5%, up from 61.3% in 2023. Mobile internet accounts for 89% of connections.', author: 'BOCRA Research', published: false, image: '/images/news/649848734_1371119421719465_1734732717675627285_n.jpg' },
    { id: 6, type: 'statement', category: 'policy', date: '2024-03-01', title: 'Regulatory Update on 5G Network Rollout', excerpt: 'Framework for 5G deployment published for public comment.', body: 'BOCRA has published a draft regulatory framework for 5G network deployment in Botswana. The public comment period closes on 30 April 2024.', author: 'BOCRA Technical Services', published: true, image: '/images/news/650228203_1368627048635369_4703481901894621783_n.jpg' },
  ],

  // ── Events ───────────────────────────────────────────────────────────────
  events: [
    { id: 1, title: 'Annual Communications Sector Forum', date: '2024-04-10', location: 'Gaborone International Conference Centre', type: 'Conference', description: 'Annual forum bringing together regulators, operators, and industry stakeholders.', published: true },
    { id: 2, title: 'Consumer Rights Awareness Workshop', date: '2024-04-18', location: 'BOCRA Training Room, Gaborone', type: 'Workshop', description: 'Public workshop on consumer rights in the communications sector.', published: true },
    { id: 3, title: '5G Spectrum Consultation Meeting', date: '2024-04-25', location: 'Cresta Lodge, Gaborone', type: 'Consultation', description: 'Stakeholder consultation on the 5G spectrum allocation framework.', published: false },
  ],

  // ── Reports ──────────────────────────────────────────────────────────────
  reports: [
    { id: 1, title: 'BOCRA Annual Report 2023', category: 'Annual Reports', year: 2023, fileSize: '4.2MB', fileType: 'PDF', published: true, uploadedDate: '2024-02-01', uploadedBy: 'ADM-002' },
    { id: 2, title: 'Telecommunications Market Survey Q4 2023', category: 'Market Analysis', year: 2023, fileSize: '2.1MB', fileType: 'PDF', published: true, uploadedDate: '2024-01-15', uploadedBy: 'ADM-001' },
    { id: 3, title: 'Internet Penetration Statistics 2023', category: 'Statistics', year: 2023, fileSize: '1.8MB', fileType: 'PDF', published: true, uploadedDate: '2024-01-20', uploadedBy: 'ADM-002' },
    { id: 4, title: 'Broadcasting Sector Report 2023', category: 'Industry Reports', year: 2023, fileSize: '3.5MB', fileType: 'PDF', published: false, uploadedDate: '2024-02-10', uploadedBy: 'ADM-001' },
    { id: 5, title: 'Draft Consumer Protection Guidelines 2024', category: 'Regulations', year: 2024, fileSize: '0.9MB', fileType: 'PDF', published: false, uploadedDate: '2024-03-01', uploadedBy: 'ADM-001' },
  ],

  // ── Audit Log ────────────────────────────────────────────────────────────
  auditLog: [
    { id: 1, userId: 'ADM-001', userName: 'Tshegofatso Kgatlhe', action: 'Approved license application APP-2024-002', timestamp: '2024-03-20 14:32:11', ip: '192.168.1.45', module: 'Licensing' },
    { id: 2, userId: 'SUP-001', userName: 'Director of IT Systems', action: 'Created admin account ADM-003', timestamp: '2024-03-19 09:15:04', ip: '192.168.1.2', module: 'User Management' },
    { id: 3, userId: 'ADM-002', userName: 'Phenyo Ditshebo', action: 'Published news article ID-1', timestamp: '2024-03-15 11:42:55', ip: '192.168.1.67', module: 'News & Events' },
    { id: 4, userId: 'ADM-001', userName: 'Tshegofatso Kgatlhe', action: 'Updated tender TND-2024-001', timestamp: '2024-03-14 16:08:30', ip: '192.168.1.45', module: 'Tenders' },
    { id: 5, userId: 'SUP-001', userName: 'Director of IT Systems', action: 'Deactivated admin account ADM-003', timestamp: '2024-03-13 10:00:00', ip: '192.168.1.2', module: 'User Management' },
    { id: 6, userId: 'ADM-001', userName: 'Tshegofatso Kgatlhe', action: 'Rejected license application APP-2024-004', timestamp: '2024-03-12 15:22:40', ip: '192.168.1.45', module: 'Licensing' },
  ],

  // ── Tariff Plans ─────────────────────────────────────────────────────────
  tariffPlans: [
    { id: 1, provider: 'Botswana Telecom (BTCL)', plan: 'BTTC Home 10', type: 'Fixed Broadband', price: 299, data: '10GB', speed: '10Mbps', validity: '30 days', features: ['Free evening calls', 'Basic TV streaming'] },
    { id: 2, provider: 'Botswana Telecom (BTCL)', plan: 'BTTC Home 25', type: 'Fixed Broadband', price: 499, data: '25GB', speed: '25Mbps', validity: '30 days', features: ['Unlimited evenings', 'HD streaming', 'Priority support'] },
    { id: 3, provider: 'Mascom Wireless', plan: 'Mascom Fiber 20', type: 'Fixed Broadband', price: 399, data: '20GB', speed: '20Mbps', validity: '30 days', features: ['Roaming data', 'Free SMS bundle'] },
    { id: 4, provider: 'Mascom Wireless', plan: 'Mascom Fiber 50', type: 'Fixed Broadband', price: 699, data: '50GB', speed: '50Mbps', validity: '30 days', features: ['Unlimited evenings', '4K streaming', 'Free router'] },
    { id: 5, provider: 'Orange Botswana', plan: 'Orange Fiber Plus', type: 'Fixed Broadband', price: 549, data: '30GB', speed: '30Mbps', validity: '30 days', features: ['Evening unlimited', 'Cloud storage 5GB'] },
    { id: 6, provider: 'Mascom Wireless', plan: 'Mascom Mobile 1GB', type: 'Mobile Data', price: 45, data: '1GB', speed: '4G LTE', validity: '7 days', features: ['WhatsApp free'] },
    { id: 7, provider: 'Orange Botswana', plan: 'Orange Smart 2GB', type: 'Mobile Data', price: 75, data: '2GB', speed: '4G LTE', validity: '30 days', features: ['Facebook free', 'Music streaming'] },
    { id: 8, provider: 'Botswana Telecom (BTCL)', plan: 'BTCL Mobile 5GB', type: 'Mobile Data', price: 150, data: '5GB', speed: '4G LTE', validity: '30 days', features: ['Hotspot included', 'Night data bonus'] },
  ],

  // ── Sector Statistics ────────────────────────────────────────────────────
  sectorStats: {
    internetPenetration: { total: 67.5, growth: 4.2, data: [{ year: '2020', value: 41.2 }, { year: '2021', value: 48.5 }, { year: '2022', value: 54.8 }, { year: '2023', value: 61.3 }, { year: '2024', value: 67.5 }] },
    activeLicenses: { total: 1247, telecommunications: 45, isp: 156, vas: 342, broadcast: 89, other: 615 },
    complaintsByProvider: [{ provider: 'Botswana Telecom', count: 342 }, { provider: 'Mascom', count: 285 }, { provider: 'Orange', count: 267 }, { provider: 'Other', count: 324 }],
  },

  // ── bwCIRT Incidents ─────────────────────────────────────────────────────
  incidents: [
    { id: 'INC-2024-001', type: 'Phishing', severity: 'high', status: 'investigating', reportedDate: '2024-03-18', description: 'Mass phishing campaign targeting .bw domain email users.', reportedBy: 'anonymous' },
    { id: 'INC-2024-002', type: 'Ransomware', severity: 'critical', status: 'resolved', reportedDate: '2024-03-10', description: 'Ransomware attack on a government department network.', reportedBy: 'govt_dept' },
    { id: 'INC-2024-003', type: 'DDoS', severity: 'medium', status: 'monitoring', reportedDate: '2024-03-20', description: 'Distributed denial-of-service attack on ISP infrastructure.', reportedBy: 'isp_user' },
  ],
};

// ─── Search Index ────────────────────────────────────────────────────────────
export const searchIndex = [
  { title: 'File a Complaint', page: 'complaints', category: 'Services', keywords: ['complaint', 'billing', 'service', 'dispute', 'network'] },
  { title: 'Apply for a License', page: 'licensing', category: 'Services', keywords: ['license', 'licence', 'apply', 'telecom', 'isp', 'broadcast'] },
  { title: 'QoS Monitoring', page: 'qos', category: 'Tools', keywords: ['quality', 'speed', 'network', 'qos', 'monitoring', 'coverage'] },
  { title: 'Sector Dashboard', page: 'sector', category: 'Data', keywords: ['statistics', 'data', 'sector', 'market', 'penetration'] },
  { title: 'Tenders', page: 'tenders', category: 'Procurement', keywords: ['tender', 'procurement', 'bid', 'supply', 'contract'] },
  { title: 'News & Events', page: 'news', category: 'Media', keywords: ['news', 'events', 'speech', 'statement', 'press'] },
  { title: 'Reports & Publications', page: 'reports', category: 'Documents', keywords: ['report', 'annual', 'publication', 'document', 'statistics'] },
  { title: 'bwCIRT Cybersecurity', page: 'bwcirt', category: 'Security', keywords: ['cyber', 'security', 'incident', 'phishing', 'ransomware', 'cirt'] },
  { title: 'Postal Services', page: 'postal', category: 'Services', keywords: ['postal', 'courier', 'mail', 'delivery'] },
  { title: 'Type Approval', page: 'type-approval', category: 'Technical', keywords: ['type approval', 'equipment', 'device', 'certification'] },
  { title: 'About BOCRA', page: 'about', category: 'About', keywords: ['about', 'profile', 'mission', 'vision', 'history'] },
  { title: 'Our Mandate', page: 'mandate', category: 'About', keywords: ['mandate', 'regulation', 'regulatory', 'authority'] },
  { title: 'Legislation', page: 'legislation', category: 'Legal', keywords: ['legislation', 'act', 'law', 'cra', 'electronic'] },
  { title: 'Telecommunications', page: 'telecom', category: 'Sectors', keywords: ['telecom', 'mobile', 'voice', 'data', 'btcl', 'mascom', 'orange'] },
  { title: 'Broadcasting', page: 'broadcasting', category: 'Sectors', keywords: ['broadcast', 'radio', 'tv', 'television', 'yarona', 'duma'] },
  { title: 'Internet & ICTs', page: 'internet', category: 'Sectors', keywords: ['internet', 'ict', 'bw domain', 'broadband'] },
  { title: 'Careers', page: 'careers', category: 'About', keywords: ['careers', 'jobs', 'vacancies', 'employment'] },
  { title: 'Organogram', page: 'organogram', category: 'About', keywords: ['organogram', 'structure', 'departments', 'management'] },
  { title: 'Projects', page: 'projects', category: 'About', keywords: ['projects', 'digital switchover', 'infrastructure sharing', 'bw domain'] },
  { title: 'Consumer Tariff Comparison', page: 'citizen', category: 'Consumer Tools', keywords: ['tariff', 'compare', 'plan', 'data', 'price'] },
  { title: 'Citizen Portal', page: 'citizen', category: 'Portals', keywords: ['citizen', 'portal', 'dashboard', 'account'] },
  { title: 'Licensee Portal', page: 'licensee', category: 'Portals', keywords: ['licensee', 'license', 'renewal', 'compliance'] },
];
