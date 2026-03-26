import { useState, useEffect, useRef } from 'react';
import { mockData } from '../context/AuthContext';
import {
  Users, Shield, BarChart2, ClipboardList, Activity,
  CheckCircle, XCircle, Pencil, Plus, Download,
  Server, Clock, Database, AlertTriangle, MessageCircle, Send, X,
  Headphones, Inbox, Eye, ArrowUpCircle, FileText, Bell
} from 'lucide-react';

const SA_NOTIFICATIONS = [
  { id: 1, title: 'Admin Account Created', body: 'New admin account for Lorato Dube is pending activation.', time: '3 min ago', read: false, type: 'admin' },
  { id: 2, title: 'Security Alert', body: '3 failed login attempts on admin@bocra.bw from IP 196.x.x.x.', time: '18 min ago', read: false, type: 'security' },
  { id: 3, title: 'System Backup Complete', body: 'Daily database backup completed successfully — 2.3 GB.', time: '1 hr ago', read: false, type: 'system' },
  { id: 4, title: 'Audit Log: Role Changed', body: 'Admin Kgosi Tiro role updated from viewer to editor.', time: '4 hrs ago', read: true, type: 'audit' },
  { id: 5, title: 'Server Uptime: 30 days', body: 'All primary servers have maintained 99.9% uptime this month.', time: 'Yesterday', read: true, type: 'system' },
];

function SANotificationDropdown({ notifications, onClose, onMarkAll }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  const typeColor = { admin: 'bg-blue-100 text-blue-700', security: 'bg-red-100 text-red-700', system: 'bg-green-100 text-green-700', audit: 'bg-yellow-100 text-yellow-700' };
  return (
    <div ref={ref} className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-w-[calc(100vw-2rem)]">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <span className="font-bold text-gray-800 text-sm">System Notifications</span>
        <button onClick={onMarkAll} className="text-xs text-[#002B7F] font-medium hover:underline">Mark all read</button>
      </div>
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
        {notifications.map(n => (
          <div key={n.id} className={`px-4 py-3 sm:py-3 flex gap-3 min-h-[44px] ${n.read ? 'opacity-60' : 'bg-blue-50/40'}`}>
            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-gray-300' : 'bg-red-500'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{n.title}</p>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{n.body}</p>
              <span className={`text-xs font-medium mt-1 inline-block px-1.5 py-0.5 rounded ${typeColor[n.type] || 'bg-gray-100 text-gray-600'}`}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t text-center">
        <button className="text-xs text-[#002B7F] font-medium hover:underline">View full audit log</button>
      </div>
    </div>
  );
}

const AI_SA_RESPONSES = {
  'System health status': 'All core systems are operational. Email notifications show minor degradation (98.1% uptime). No critical incidents in the last 24 hours.',
  'Active admin accounts': 'You have 4 admin accounts. 3 are active, 1 is inactive. Go to Admin Accounts tab to manage roles and access.',
  'Recent audit events': 'The Audit Log shows recent actions across all modules. Filter by module or export to CSV from the Audit Log tab.',
  'Export system report': 'Use the System Analytics tab to view charts and export a full system report. The Export button is in the Audit Log tab.',
};

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

  const activeUsersByHour = [142, 198, 231, 187, 265, 312, 287, 344, 401, 378, 356, 298];
  const maxActive = Math.max(...activeUsersByHour);
  const hours = ['8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

  return (
    <div className="space-y-8">
      <SectionHeader title="System Analytics" />

      {/* Active Users Now */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Right Now', value: '312', sub: '↑ 18 from last hour', color: 'bg-green-500' },
          { label: 'Today\'s Logins', value: '1,847', sub: 'Across all roles', color: 'bg-blue-500' },
          { label: 'Avg Session', value: '6m 42s', sub: 'Per user today', color: 'bg-purple-500' },
          { label: 'Peak Today', value: '401', sub: 'At 4:00 PM', color: 'bg-orange-500' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className={`w-8 h-1.5 ${card.color} rounded-full mb-3`} />
            <p className="text-2xl font-black text-gray-800">{card.value}</p>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">{card.label}</p>
            <p className="text-xs text-green-600 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Active Users by Hour */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base font-bold text-gray-800 mb-5">Active Users — Today by Hour</h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="flex items-end gap-1 sm:gap-2 h-32 min-w-[600px] px-4 sm:px-0">
            {activeUsersByHour.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-gray-500">{v}</span>
                <div className="w-full rounded-t-lg bg-[#002B7F]"
                  style={{ height: `${(v / maxActive) * 96}px`, opacity: i === 8 ? 1 : 0.55 }} />
                <span className="text-xs text-gray-400">{hours[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Highlighted bar = peak hour today</p>
      </div>

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

// ─── Tech Requests Data ───────────────────────────────────────────────────────
const INITIAL_TECH_REQUESTS = [
  {
    id: 'TSR-2024-001', title: 'Database Migration Failure on Licensing Module',
    category: 'Database', priority: 'high', status: 'in_progress',
    description: 'The production database failed during a migration for the licensing module. Records from 2024-03-10 to 2024-03-15 may be affected. Need immediate investigation and rollback procedure.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-18',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: 'Our team is investigating the migration logs. Please do not run further migrations until resolved. ETA for fix: 24 hours.',
    resolvedDate: null, escalated: false,
  },
  {
    id: 'TSR-2024-002', title: 'User Role Permissions Not Propagating',
    category: 'Access Control', priority: 'medium', status: 'open',
    description: 'When an admin updates a user\'s role from "viewer" to "editor", the permissions do not take effect until the user logs out and back in. This is causing confusion for licensees using the portal.',
    submittedBy: 'ADM-002', submittedByName: 'Phenyo Ditshebo', submittedDate: '2024-03-20',
    assignedTo: null, assignedToName: null, response: null, resolvedDate: null, escalated: false,
  },
  {
    id: 'TSR-2024-003', title: 'Email Notification System Offline',
    category: 'Email / Notifications', priority: 'high', status: 'resolved',
    description: 'Automated email notifications for license approvals, rejections, and complaint updates stopped sending after the server restart on 2024-03-09.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-10',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: 'Root cause identified: SMTP configuration was reset during the server update. Credentials restored. Email notifications are now fully operational. Verified with test sends across all notification types.',
    resolvedDate: '2024-03-12', escalated: false,
  },
  {
    id: 'TSR-2024-004', title: 'Large Report Exports Return 500 Error',
    category: 'Reports', priority: 'low', status: 'open',
    description: 'Exporting reports larger than 5 MB triggers a 500 Internal Server Error. Smaller exports work fine. This is blocking quarterly statistical report generation.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-21',
    assignedTo: null, assignedToName: null, response: null, resolvedDate: null, escalated: false,
  },
  {
    id: 'TSR-2024-005', title: 'Two-Factor Authentication Configuration',
    category: 'Security', priority: 'medium', status: 'pending',
    description: 'We need 2FA enabled for all admin accounts as per the new security policy directive. Please advise on setup procedure, system requirements, and impact on existing sessions.',
    submittedBy: 'ADM-002', submittedByName: 'Phenyo Ditshebo', submittedDate: '2024-03-22',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: null, resolvedDate: null, escalated: false,
  },
  {
    id: 'TSR-2024-006', title: 'Complaint Module Date Filter Bug',
    category: 'Bug Report', priority: 'medium', status: 'resolved',
    description: 'The date range filter in the complaints module only returns results for the current month regardless of the selected date range. Tested on Chrome, Firefox, and Edge.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-05',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: 'Bug confirmed and patched in version 1.4.2. The date filter was using local timezone offset instead of UTC. Deployed 2024-03-07 at 14:00.',
    resolvedDate: '2024-03-07', escalated: false,
  },
];

// ─── TAB 6: Tech Requests ─────────────────────────────────────────────────────
function TechRequestsTab({ techRequests, setTechRequests, showToast }) {
  const [filter,      setFilter]      = useState('all');
  const [viewReq,     setViewReq]     = useState(null);
  const [respondId,   setRespondId]   = useState(null);
  const [responseText,setResponseText]= useState('');
  const [closeId,     setCloseId]     = useState(null);

  const statuses = ['all', 'open', 'pending', 'in_progress', 'resolved', 'cancelled'];
  const visible  = filter === 'all' ? techRequests : techRequests.filter(r => r.status === filter);

  const priorityColor = {
    high:   'text-red-700 bg-red-50 border-red-200',
    medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    low:    'text-gray-600 bg-gray-100 border-gray-200',
  };
  const statusColor = {
    open:        'bg-blue-100 text-blue-800',
    pending:     'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-purple-100 text-purple-800',
    resolved:    'bg-green-100 text-green-800',
    cancelled:   'bg-gray-100 text-gray-500',
  };

  const assignToSelf = (id) => {
    setTechRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'in_progress', assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems' } : r
    ));
    showToast('Request assigned to you and marked In Progress.');
  };

  const submitResponse = () => {
    if (!responseText.trim()) return;
    setTechRequests(prev => prev.map(r =>
      r.id === respondId ? { ...r, response: responseText, status: 'in_progress', assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems' } : r
    ));
    if (viewReq?.id === respondId) setViewReq(prev => ({ ...prev, response: responseText }));
    setRespondId(null);
    setResponseText('');
    showToast('Response sent to admin.');
  };

  const markResolved = (id) => {
    setTechRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'resolved', resolvedDate: new Date().toISOString().slice(0, 10) } : r
    ));
    setCloseId(null);
    showToast('Request marked as resolved.');
  };

  const openCount   = techRequests.filter(r => r.status === 'open').length;
  const urgentCount = techRequests.filter(r => r.priority === 'high' && r.status !== 'resolved' && r.status !== 'cancelled').length;
  const escalated   = techRequests.filter(r => r.escalated && r.status !== 'resolved').length;

  return (
    <div>
      <SectionHeader title="Tech Support Requests" />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Open Requests',    value: openCount,   color: 'bg-blue-50 text-blue-700',   icon: Inbox        },
          { label: 'High Priority',    value: urgentCount, color: 'bg-red-50 text-red-700',     icon: AlertTriangle},
          { label: 'Escalated',        value: escalated,   color: 'bg-orange-50 text-orange-700',icon: ArrowUpCircle},
        ].map(c => (
          <div key={c.label} className={`rounded-2xl p-4 flex items-center gap-4 ${c.color} shadow-sm`}>
            <c.icon size={28} />
            <div>
              <p className="text-2xl font-extrabold">{c.value}</p>
              <p className="text-xs font-semibold opacity-80">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filter === s ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
            style={filter === s ? { backgroundColor: PRIMARY } : {}}>
            {s === 'all' ? `All (${techRequests.length})` : s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Request cards */}
      <div className="space-y-3">
        {visible.map(req => (
          <div key={req.id} className={`bg-white rounded-2xl shadow-sm border px-5 py-4 ${req.escalated && req.status !== 'resolved' ? 'border-red-300' : 'border-gray-100'}`}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: PRIMARY }}>
                <Headphones size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-mono text-xs text-gray-400">{req.id}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[req.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {req.status.replace(/_/g, ' ')}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${priorityColor[req.priority]}`}>
                    {req.priority}
                  </span>
                  {req.escalated && req.status !== 'resolved' && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                      <ArrowUpCircle size={11} /> Escalated
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-800">{req.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {req.category} · {req.submittedDate} · From {req.submittedByName}
                  {req.assignedToName ? ` · Assigned to ${req.assignedToName}` : ' · Unassigned'}
                </p>
                {req.response && (
                  <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-green-700 mb-0.5">Your Response</p>
                    <p className="text-xs text-green-800 line-clamp-2">{req.response}</p>
                  </div>
                )}
              </div>
              {/* Actions */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <Btn variant="ghost" onClick={() => setViewReq(req)}>
                  <Eye size={12} /> View
                </Btn>
                {!req.assignedTo && req.status === 'open' && (
                  <Btn variant="outline" onClick={() => assignToSelf(req.id)}>
                    <Users size={12} /> Assign to Me
                  </Btn>
                )}
                {req.status !== 'resolved' && req.status !== 'cancelled' && (
                  <Btn variant="primary" onClick={() => { setRespondId(req.id); setResponseText(req.response ?? ''); }}>
                    <Send size={12} /> Respond
                  </Btn>
                )}
                {['in_progress', 'open', 'pending'].includes(req.status) && (
                  <Btn variant="teal" onClick={() => setCloseId(req.id)}>
                    <CheckCircle size={12} /> Resolve
                  </Btn>
                )}
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-12 text-center text-gray-400">
            No requests match this filter.
          </div>
        )}
      </div>

      {/* ── View Detail Modal ── */}
      {viewReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
              <div>
                <h3 className="text-white font-bold text-lg">Request Details</h3>
                <p className="text-white/70 text-xs mt-0.5">{viewReq.id}</p>
              </div>
              <button onClick={() => setViewReq(null)} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[viewReq.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {viewReq.status.replace(/_/g, ' ')}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${priorityColor[viewReq.priority]}`}>
                  {viewReq.priority} priority
                </span>
                {viewReq.escalated && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                    <ArrowUpCircle size={11} /> Escalated
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Title</p>
                <p className="text-base font-bold text-gray-800">{viewReq.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  ['Category',       viewReq.category],
                  ['Submitted By',   viewReq.submittedByName],
                  ['Submitted Date', viewReq.submittedDate],
                  ['Assigned To',    viewReq.assignedToName ?? 'Unassigned'],
                  ['Resolved Date',  viewReq.resolvedDate ?? '—'],
                ].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Description</p>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed border border-gray-100">
                  {viewReq.description}
                </div>
              </div>
              {viewReq.escalationNote && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Escalation Note</p>
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    {viewReq.escalationNote}
                  </div>
                </div>
              )}
              {viewReq.response ? (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Your Response</p>
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800 leading-relaxed">
                    {viewReq.response}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-yellow-700">
                  <Clock size={15} className="shrink-0" /> No response sent yet.
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">
              {viewReq.status !== 'resolved' && viewReq.status !== 'cancelled' && (
                <Btn variant="primary" onClick={() => { setRespondId(viewReq.id); setResponseText(viewReq.response ?? ''); setViewReq(null); }}>
                  <Send size={13} /> Respond
                </Btn>
              )}
              <Btn variant="ghost" onClick={() => setViewReq(null)}>Close</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── Respond Modal ── */}
      {respondId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
              <div>
                <h3 className="text-white font-bold text-lg">Send Response</h3>
                <p className="text-white/70 text-xs mt-0.5">{respondId}</p>
              </div>
              <button onClick={() => setRespondId(null)} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-gray-500">Your response will be visible to the admin who submitted this request.</p>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Response <span className="text-red-500">*</span></label>
                <textarea rows={6} value={responseText} onChange={e => setResponseText(e.target.value)}
                  placeholder="Describe the resolution, steps taken, or further information required…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">
              <Btn variant="ghost" onClick={() => setRespondId(null)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={submitResponse}>
                <Send size={13} /> Send Response
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── Resolve Confirm Modal ── */}
      {closeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
              <h3 className="text-white font-bold text-lg">Mark as Resolved</h3>
              <button onClick={() => setCloseId(null)} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-1">Mark this request as resolved?</p>
              <p className="text-xs text-gray-400">The submitting admin will be notified that the issue has been closed.</p>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">
              <Btn variant="ghost" onClick={() => setCloseId(null)}>Cancel</Btn>
              <Btn variant="teal" onClick={() => markResolved(closeId)}>
                <CheckCircle size={13} /> Confirm Resolve
              </Btn>
            </div>
          </div>
        </div>
      )}
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
    { id: 'tech',       label: 'Tech Requests',    icon: Inbox         },
  ];

  const [activeTab,    setActiveTab]    = useState('overview');
  const [admins,       setAdmins]       = useState(mockData.adminUsers);
  const [techRequests, setTechRequests] = useState(INITIAL_TECH_REQUESTS);
  const [toast,        setToast]        = useState(null);
  const [showChat,          setShowChat]          = useState(false);
  const [chatInput,         setChatInput]         = useState('');
  const [chatMessages,      setChatMessages]      = useState([{ type: 'bot', text: "Hi! I'm BOTSI. I can give you a quick system overview or help you navigate." }]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications,     setNotifications]     = useState(SA_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const sendChat = (text) => {
    const q = text || chatInput;
    if (!q.trim()) return;
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'user', text: q }]);
    const reply = AI_SA_RESPONSES[q] || "For detailed information, navigate to the relevant tab or contact the IT support team.";
    setTimeout(() => setChatMessages(prev => [...prev, { type: 'bot', text: reply }]), 600);
  };

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
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowNotifications(v => !v)}
                className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">{unreadCount}</span>
                )}
              </button>
              {showNotifications && (
                <SANotificationDropdown
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onMarkAll={() => setNotifications(n => n.map(x => ({ ...x, read: true })))}
                />
              )}
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
        {activeTab === 'tech'      && <TechRequestsTab techRequests={techRequests} setTechRequests={setTechRequests} showToast={showToast} />}
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      {/* BOTSI Floating Chat */}
      <div className="fixed bottom-6 right-6 z-40">
        {!showChat ? (
          <button onClick={() => setShowChat(true)}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PRIMARY }}>
            <MessageCircle size={26} className="text-white" />
          </button>
        ) : (
          <div className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
            <div className="text-white p-4 flex items-center justify-between" style={{ backgroundColor: PRIMARY }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div><div className="font-semibold text-sm">BOTSI</div><div className="text-xs text-white/70">BOCRA Assistant · Online</div></div>
              </div>
              <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.type === 'user' ? 'bg-[#002B7F] text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-3 pt-2 border-t space-y-2">
              <div className="flex flex-wrap gap-1">
                {['System health status', 'Active admin accounts', 'Recent audit events'].map(p => (
                  <button key={p} onClick={() => sendChat(p)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-teal-50 hover:text-teal-700 transition-colors">
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
                <button onClick={() => sendChat()} className="p-2 text-white rounded-lg" style={{ backgroundColor: PRIMARY }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
