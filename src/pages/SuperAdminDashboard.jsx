import { useState, useEffect } from 'react';
import { mockData } from '../context/AuthContext';
import {
  Users, Shield, BarChart2, ClipboardList, Activity,
  CheckCircle, XCircle, Pencil, Plus, Download,
  Server, Clock, Database, AlertTriangle
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const PRIMARY = '#002B7F';
const ACCENT  = '#2DD4BF';

// ─── Reusable Helpers ─────────────────────────────────────────────────────────
function StatusBadge({ active }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
      <CheckCircle size={18} /> {msg}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', size = 'sm', className = '' }) {
  const base = 'inline-flex items-center gap-1 rounded-lg font-semibold transition-all focus:outline-none';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' };
  const variants = {
    primary: 'text-white',
    danger:  'bg-red-600 text-white hover:bg-red-700',
    ghost:   'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    teal:    'text-white',
  };
  const inlineStyle = variant === 'primary' ? { backgroundColor: PRIMARY }
    : variant === 'teal' ? { backgroundColor: ACCENT, color: '#fff' } : {};
  return (
    <button onClick={onClick} style={inlineStyle}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold" style={{ color: PRIMARY }}>{title}</h2>
      {action}
    </div>
  );
}

// ─── TAB 1: Overview ──────────────────────────────────────────────────────────
function OverviewTab({ admins, showToast }) {
  const totalUsers     = 4812;
  const totalAdmins    = admins.length;
  const totalComplaints = mockData.complaints.length;
  const totalLicenses  = mockData.licenseApplications.length;

  const statsCards = [
    { label: 'Total Registered Users', value: totalUsers.toLocaleString(), icon: Users,      color: 'bg-blue-50 text-blue-700',   border: 'border-blue-200'  },
    { label: 'Admin Accounts',          value: totalAdmins,                  icon: Shield,     color: 'bg-purple-50 text-purple-700', border: 'border-purple-200'},
    { label: 'Total Complaints',         value: totalComplaints,              icon: AlertTriangle, color: 'bg-orange-50 text-orange-700', border: 'border-orange-200'},
    { label: 'License Applications',     value: totalLicenses,                icon: ClipboardList, color: 'bg-teal-50 text-teal-700',  border: 'border-teal-200'  },
    { label: 'System Uptime',            value: '99.9%',                      icon: Server,     color: 'bg-green-50 text-green-700',  border: 'border-green-200' },
    { label: 'Last Backup',              value: '2024-03-20 02:00',           icon: Database,   color: 'bg-gray-50 text-gray-700',    border: 'border-gray-200'  },
  ];

  const quickActions = [
    { label: 'Add Admin Account', action: () => showToast('Navigate to Admin Accounts tab to add a new admin.'), icon: Plus,     color: PRIMARY },
    { label: 'View Audit Log',    action: () => showToast('Navigate to Audit Log tab.'),                         icon: ClipboardList, color: '#6D28D9' },
    { label: 'Export Reports',    action: () => alert('Export initiated'),                                        icon: Download,  color: '#F97316' },
    { label: 'System Health',     action: () => showToast('All systems operational.'),                            icon: Activity,  color: '#2DD4BF' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statsCards.map(c => (
          <div key={c.label} className={`rounded-2xl p-5 flex items-center gap-4 ${c.color} border ${c.border} shadow-sm`}>
            <c.icon size={30} className="shrink-0" />
            <div>
              <p className="text-2xl font-extrabold">{c.value}</p>
              <p className="text-xs font-semibold mt-0.5 opacity-75">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-4" style={{ color: PRIMARY }}>Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map(qa => (
          <button key={qa.label} onClick={qa.action}
            className="rounded-2xl p-5 text-left hover:shadow-md transition-all border border-gray-100 bg-white flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: qa.color }}>
              <qa.icon size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-700">{qa.label}</p>
          </button>
        ))}
      </div>

      <h3 className="text-lg font-bold mt-8 mb-4" style={{ color: PRIMARY }}>System Status</h3>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {[
          { service: 'Licensing Portal',    status: 'Operational', uptime: '99.97%' },
          { service: 'Complaints System',   status: 'Operational', uptime: '99.85%' },
          { service: 'News & Events CMS',   status: 'Operational', uptime: '100%'   },
          { service: 'Document Storage',    status: 'Operational', uptime: '99.92%' },
          { service: 'Email Notifications', status: 'Degraded',    uptime: '98.10%' },
          { service: 'bwCIRT Portal',       status: 'Operational', uptime: '99.99%' },
        ].map(s => (
          <div key={s.service} className="flex items-center justify-between px-5 py-3 border-b last:border-0 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${s.status === 'Operational' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm font-medium text-gray-700">{s.service}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold ${s.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'}`}>{s.status}</span>
              <span className="text-xs text-gray-400">{s.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAB 2: Admin Accounts ────────────────────────────────────────────────────
function AdminAccountsTab({ admins, setAdmins, showToast }) {
  const [showAdd, setShowAdd]   = useState(false);
  const [editId, setEditId]     = useState(null);
  const [editRole, setEditRole] = useState('');
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', department: '', role: 'admin', password: '' });

  const toggleStatus = (id) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a));
    showToast('Admin account status updated.');
  };

  const saveRole = (id) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, role: editRole } : a));
    setEditId(null);
    showToast('Role updated.');
  };

  const addAdmin = () => {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) return;
    const next = {
      id: `ADM-00${admins.length + 4}`,
      ...newAdmin,
      status: 'active',
      createdDate: new Date().toISOString().slice(0, 10),
      lastLogin: 'Never',
    };
    setAdmins(prev => [...prev, next]);
    setShowAdd(false);
    setNewAdmin({ name: '', email: '', department: '', role: 'admin', password: '' });
    showToast('New admin account created.');
  };

  return (
    <div>
      <SectionHeader title="Admin Accounts"
        action={<Btn variant="primary" size="md" onClick={() => setShowAdd(true)}><Plus size={14} /> Add New Admin</Btn>} />

      {showAdd && (
        <Modal title="Add New Admin Account" onClose={() => setShowAdd(false)}>
          <div className="space-y-3">
            {[['Full Name', 'name', 'text'], ['Email Address', 'email', 'email'], ['Department', 'department', 'text'], ['Password', 'password', 'password']].map(([label, key, type]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                <input type={type} value={newAdmin[key]}
                  onChange={e => setNewAdmin(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Role</label>
              <select value={newAdmin.role} onChange={e => setNewAdmin(p => ({ ...p, role: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Super Admin role can only be assigned via system configuration.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Btn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={addAdmin}>Create Account</Btn>
            </div>
          </div>
        </Modal>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-gray-500 border-b bg-gray-50">
              {['Name', 'Email', 'Department', 'Role', 'Status', 'Last Login', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <>
                <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                        style={{ backgroundColor: PRIMARY }}>
                        {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-800">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{a.email}</td>
                  <td className="px-4 py-3 text-gray-500">{a.department}</td>
                  <td className="px-4 py-3">
                    {editId === a.id ? (
                      <div className="flex items-center gap-1">
                        <select value={editRole} onChange={e => setEditRole(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-xs">
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                        <button onClick={() => saveRole(a.id)} className="text-green-600 hover:text-green-700"><CheckCircle size={14} /></button>
                        <button onClick={() => setEditId(null)} className="text-red-500 hover:text-red-600"><XCircle size={14} /></button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold capitalize text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">{a.role}</span>
                    )}
                  </td>
                  <td className="px-4 py-3"><StatusBadge active={a.status === 'active'} /></td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{a.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      <Btn variant={a.status === 'active' ? 'danger' : 'primary'}
                        onClick={() => toggleStatus(a.id)}>
                        {a.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Btn>
                      <Btn variant="outline" onClick={() => { setEditId(a.id); setEditRole(a.role); }}>
                        <Pencil size={12} /> Role
                      </Btn>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB 3: Role & Permissions ────────────────────────────────────────────────
function RolesTab() {
  const roles   = ['Citizen', 'Licensee', 'Admin', 'Super Admin'];
  const modules = [
    { name: 'File Complaints',       perms: [true,  true,  true,  true ] },
    { name: 'View Own Complaints',   perms: [true,  false, true,  true ] },
    { name: 'Manage All Complaints', perms: [false, false, true,  true ] },
    { name: 'Apply for License',     perms: [false, true,  false, false] },
    { name: 'Approve Licenses',      perms: [false, false, true,  true ] },
    { name: 'Publish News',          perms: [false, false, true,  true ] },
    { name: 'Manage Tenders',        perms: [false, false, true,  true ] },
    { name: 'Upload Reports',        perms: [false, false, true,  true ] },
    { name: 'Manage Admin Users',    perms: [false, false, false, true ] },
    { name: 'View Audit Log',        perms: [false, false, false, true ] },
    { name: 'System Configuration',  perms: [false, false, false, true ] },
    { name: 'Export Data',           perms: [false, false, true,  true ] },
  ];

  const roleColors = ['bg-gray-100 text-gray-700', 'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-yellow-100 text-yellow-800'];

  return (
    <div>
      <SectionHeader title="Role & Permissions Matrix" />
      <p className="text-sm text-gray-500 mb-5">Defines what each user role can access and perform across all modules.</p>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 w-48">Module / Permission</th>
              {roles.map((r, i) => (
                <th key={r} className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${roleColors[i]}`}>{r}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map(mod => (
              <tr key={mod.name} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 text-sm font-medium text-gray-700">{mod.name}</td>
                {mod.perms.map((allowed, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    {allowed
                      ? <CheckCircle size={18} className="inline text-green-500" />
                      : <XCircle    size={18} className="inline text-gray-300"  />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB 4: Audit Log ─────────────────────────────────────────────────────────
function AuditLogTab({ showToast }) {
  const [filter, setFilter] = useState('all');
  const modules = ['all', ...new Set(mockData.auditLog.map(l => l.module))];
  const visible = filter === 'all' ? mockData.auditLog : mockData.auditLog.filter(l => l.module === filter);

  return (
    <div>
      <SectionHeader title="Audit Log"
        action={
          <Btn variant="teal" size="md" onClick={() => { alert('Export initiated'); showToast('Audit log export initiated.'); }}>
            <Download size={14} /> Export
          </Btn>
        } />

      <div className="flex gap-2 mb-4 flex-wrap">
        {modules.map(m => (
          <button key={m} onClick={() => setFilter(m)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filter === m ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
            style={filter === m ? { backgroundColor: PRIMARY } : {}}>
            {m === 'all' ? 'All Modules' : m}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-gray-500 border-b bg-gray-50">
              {['Timestamp', 'User', 'Action', 'Module', 'IP Address'].map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(log => (
              <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 font-mono text-xs whitespace-nowrap">{log.timestamp}</td>
                <td className="px-4 py-3 font-medium text-gray-700">{log.userName}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{log.action}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{log.module}</span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-400">{log.ip}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No log entries for this module.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB 5: System Analytics ──────────────────────────────────────────────────
function AnalyticsTab() {
  const complaintsByMonth = [
    { month: 'Oct', count: 8  },
    { month: 'Nov', count: 12 },
    { month: 'Dec', count: 6  },
    { month: 'Jan', count: 15 },
    { month: 'Feb', count: 11 },
    { month: 'Mar', count: 9  },
  ];
  const maxComplaints = Math.max(...complaintsByMonth.map(d => d.count));

  const licensesByType = [
    { type: 'Telecommunications', count: 45,  color: 'bg-blue-500'   },
    { type: 'ISP',                count: 156, color: 'bg-teal-500'   },
    { type: 'Value Added Services', count: 342, color: 'bg-purple-500' },
    { type: 'Broadcasting',       count: 89,  color: 'bg-orange-500' },
  ];
  const maxLic = Math.max(...licensesByType.map(d => d.count));

  const activityByRole = [
    { role: 'Citizens',    sessions: 4200, actions: 12800, color: 'text-blue-600 bg-blue-50'    },
    { role: 'Licensees',   sessions: 890,  actions: 3400,  color: 'text-teal-600 bg-teal-50'    },
    { role: 'Admins',      sessions: 120,  actions: 5600,  color: 'text-purple-600 bg-purple-50' },
    { role: 'Super Admin', sessions: 15,   actions: 890,   color: 'text-yellow-700 bg-yellow-50' },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="System Analytics" />

      {/* Complaints by Month - Vertical Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">Complaints Received by Month</h3>
        <div className="flex items-end gap-4 h-40">
          {complaintsByMonth.map(d => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-gray-600">{d.count}</span>
              <div className="w-full rounded-t-lg transition-all"
                style={{ height: `${(d.count / maxComplaints) * 120}px`, backgroundColor: '#F97316' }} />
              <span className="text-xs text-gray-400 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Licenses by Type - Horizontal Bars */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">Active Licenses by Type</h3>
        <div className="space-y-4">
          {licensesByType.map(d => (
            <div key={d.type} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-40 shrink-0">{d.type}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className={`h-full rounded-full ${d.color} transition-all`}
                  style={{ width: `${(d.count / maxLic) * 100}%` }} />
              </div>
              <span className="text-sm font-bold text-gray-700 w-10 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity by Role */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">User Activity by Role (Last 30 Days)</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {activityByRole.map(r => (
            <div key={r.role} className={`rounded-2xl p-4 ${r.color}`}>
              <p className="text-sm font-bold mb-2">{r.role}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="opacity-70">Sessions</span>
                  <span className="font-bold">{r.sessions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="opacity-70">Actions</span>
                  <span className="font-bold">{r.actions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-gray-800 mb-4">Platform Summary</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Avg. Complaint Resolution', value: '6.4 days' },
            { label: 'License Approval Rate',     value: '72%'      },
            { label: 'Portal Availability',       value: '99.9%'    },
            { label: 'Active Tenders',            value: mockData.tenders.filter(t => t.status === 'open').length  },
            { label: 'Published Reports',         value: mockData.reports.filter(r => r.published).length         },
            { label: 'Pending Review',            value: mockData.licenseApplications.filter(a => a.status === 'under_review').length },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-2xl font-extrabold" style={{ color: PRIMARY }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SuperAdminDashboard({ setCurrentPage }) {
  const TABS = [
    { id: 'overview',   label: 'Overview',         icon: Activity      },
    { id: 'admins',     label: 'Admin Accounts',   icon: Users         },
    { id: 'roles',      label: 'Role & Permissions', icon: Shield      },
    { id: 'audit',      label: 'Audit Log',        icon: ClipboardList },
    { id: 'analytics',  label: 'System Analytics', icon: BarChart2     },
  ];

  const [activeTab, setActiveTab] = useState('overview');
  const [admins,    setAdmins]    = useState(mockData.adminUsers);
  const [toast,     setToast]     = useState(null);

  const showToast = (msg) => setToast(msg);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white px-6 py-5" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #1a3a8f 100%)` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={20} className="text-yellow-300" />
              <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">Super Admin</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">System Dashboard</h1>
            <p className="text-blue-200 text-sm mt-0.5">BOCRA Internal Administration — Full System Access</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-xs">Logged in as</p>
            <p className="text-white font-bold text-sm">Director of IT Systems</p>
            <button onClick={() => setCurrentPage && setCurrentPage('home')}
              className="text-xs text-blue-300 hover:text-white transition-colors mt-1 block">
              &larr; Back to Site
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${active ? 'border-current' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                style={active ? { color: PRIMARY, borderColor: PRIMARY } : {}}>
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview'  && <OverviewTab admins={admins} showToast={showToast} />}
        {activeTab === 'admins'    && <AdminAccountsTab admins={admins} setAdmins={setAdmins} showToast={showToast} />}
        {activeTab === 'roles'     && <RolesTab />}
        {activeTab === 'audit'     && <AuditLogTab showToast={showToast} />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
