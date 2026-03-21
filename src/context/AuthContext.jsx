import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('public'); // 'public', 'citizen', 'licensee', 'provider'

  const login = (type, userData = {}) => {
    setUserType(type);
    setUser({
      name: userData.name || getDefaultName(type),
      email: userData.email || 'user@bocra.bw',
      ...userData,
    });
  };

  const logout = () => {
    setUser(null);
    setUserType('public');
  };

  const getDefaultName = (type) => {
    switch (type) {
      case 'citizen':
        return 'John Moipolai';
      case 'licensee':
        return 'Botswana Telecom Solutions';
      case 'provider':
        return 'Service Provider Inc.';
      default:
        return 'Guest';
    }
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock Data for the application
export const mockData = {
  // Complaints data
  complaints: [
    {
      id: 'CMP-2024-001',
      category: 'Network Quality',
      provider: 'Botswana Telecommunications Corporation',
      status: 'resolved',
      submittedDate: '2024-01-15',
      resolvedDate: '2024-01-28',
      description: 'Poor network coverage in Gaborone North',
    },
    {
      id: 'CMP-2024-002',
      category: 'Billing Dispute',
      provider: 'Mascom Wireless',
      status: 'under_review',
      submittedDate: '2024-02-10',
      resolvedDate: null,
      description: 'Unexpected charges on monthly bill',
    },
    {
      id: 'CMP-2024-003',
      category: 'Customer Service',
      provider: 'Orange Botswana',
      status: 'submitted',
      submittedDate: '2024-03-01',
      resolvedDate: null,
      description: 'Delayed response to service request',
    },
  ],

  // Licenses data
  licenses: [
    {
      id: 'LIC-2024-001',
      name: 'Telecommunications Service License',
      category: 'Telecommunications',
      status: 'active',
      issuedDate: '2022-01-01',
      expiryDate: '2027-01-01',
      validUntil: '2027-01-01',
    },
    {
      id: 'LIC-2024-002',
      name: 'Internet Service Provider License',
      category: 'ISP',
      status: 'expiring_soon',
      issuedDate: '2021-06-15',
      expiryDate: '2024-06-15',
      validUntil: '2024-06-15',
    },
    {
      id: 'LIC-2024-003',
      name: 'Value Added Services License',
      category: 'VAS',
      status: 'expired',
      issuedDate: '2019-03-01',
      expiryDate: '2024-03-01',
      validUntil: '2024-03-01',
    },
  ],

  // Activity log
  activityLog: [
    {
      id: 1,
      action: 'License Renewal Submitted',
      reference: 'LIC-2024-001',
      date: '2024-02-15',
      status: 'approved',
    },
    {
      id: 2,
      action: 'Compliance Report Filed',
      reference: 'Q4-2023',
      date: '2024-01-30',
      status: 'approved',
    },
    {
      id: 3,
      action: 'Contact Details Updated',
      reference: 'Profile Update',
      date: '2024-01-25',
      status: 'completed',
    },
    {
      id: 4,
      action: 'Annual Fee Payment',
      reference: 'INV-2024-001',
      date: '2024-01-10',
      status: 'completed',
    },
  ],

  // Tenders data
  tenders: [
    {
      id: 'TND-2024-001',
      title: 'Supply and Installation of Network Monitoring Equipment',
      category: 'Procurement',
      status: 'open',
      closingDate: '2024-04-15',
      budget: 'P 5,000,000',
    },
    {
      id: 'TND-2024-002',
      title: 'Consultancy Services for Spectrum Audit',
      category: 'Services',
      status: 'open',
      closingDate: '2024-04-20',
      budget: 'P 2,500,000',
    },
    {
      id: 'TND-2024-003',
      title: 'Office Furniture Supply and Fit-out',
      category: 'Procurement',
      status: 'closed',
      closingDate: '2024-03-01',
      budget: 'P 1,200,000',
    },
    {
      id: 'TND-2024-004',
      title: 'Cybersecurity Training Program',
      category: 'Training',
      status: 'open',
      closingDate: '2024-04-30',
      budget: 'P 800,000',
    },
  ],

  // Sector statistics
  sectorStats: {
    internetPenetration: {
      title: 'Internet Penetration',
      total: 67.5,
      growth: 4.2,
      data: [
        { year: '2020', value: 41.2 },
        { year: '2021', value: 48.5 },
        { year: '2022', value: 54.8 },
        { year: '2023', value: 61.3 },
        { year: '2024', value: 67.5 },
      ],
    },
    complaintsByProvider: [
      { provider: 'Botswana Telecom', count: 342, percentage: 28 },
      { provider: 'Mascom', count: 285, percentage: 23 },
      { provider: 'Orange', count: 267, percentage: 22 },
      { provider: 'Other', count: 324, percentage: 27 },
    ],
    activeLicenses: {
      total: 1247,
      telecommunications: 45,
      isp: 156,
      vas: 342,
      broadcast: 89,
      other: 615,
    },
  },

  // Tariff plans
  tariffPlans: [
    {
      provider: 'Botswana Telecom',
      plan: 'BTTC Home 10',
      price: 299,
      data: '10GB',
      validity: '30 days',
      speed: '10Mbps',
    },
    {
      provider: 'Botswana Telecom',
      plan: 'BTTC Home 25',
      price: 499,
      data: '25GB',
      validity: '30 days',
      speed: '25Mbps',
    },
    {
      provider: 'Mascom',
      plan: 'Mascom Fiber 20',
      price: 399,
      data: '20GB',
      validity: '30 days',
      speed: '20Mbps',
    },
    {
      provider: 'Mascom',
      plan: 'Mascom Fiber 50',
      price: 699,
      data: '50GB',
      validity: '30 days',
      speed: '50Mbps',
    },
    {
      provider: 'Orange',
      plan: 'Orange Fiber Plus',
      price: 549,
      data: '30GB',
      validity: '30 days',
      speed: '30Mbps',
    },
  ],
};
