import { useState, useEffect } from 'react';
import { mockData } from '../context/AuthContext';
import {
  LayoutDashboard, FileText, MessageSquare, Briefcase,
  Newspaper, BarChart2, CheckCircle, XCircle, Eye,
  ChevronDown, Plus, Upload, Pencil, Globe, GlobeLock,
  RefreshCw, Trash2, MessageCircle, Send, X,
  Headphones, HelpCircle, ShieldAlert, Database,
  Bug, ChevronRight
} from 'lucide-react';

const AI_ADMIN_RESPONSES = {
  'Pending applications summary': 'Check the License Applications tab. Filter by "pending" or "under_review" to see items awaiting action.',
  'Open complaints count': 'Go to the Complaints tab. Filter by status to see all unresolved complaints and assign them to team members.',
  'Draft tenders': 'Head to the Tenders tab — drafts are listed with a grey badge. Click Edit to update or Publish to make them live.',
  'Unpublished news': 'The News & Events tab shows all draft content. Review and click Publish when ready.',
};

// ─── Tech Support Dummy Data ──────────────────────────────────────────────────
const INITIAL_TECH_REQUESTS = [
  {
    id: 'TSR-2024-001', title: 'Database Migration Failure on Licensing Module',
    category: 'Database', priority: 'high', status: 'in_progress',
    description: 'The production database failed during a migration for the licensing module. Records from 2024-03-10 to 2024-03-15 may be affected. Need immediate investigation and rollback procedure.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-18',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: 'Our team is investigating the migration logs. Please do not run further migrations until this is resolved. ETA for fix: 24 hours.',
    resolvedDate: null,
  },
  {
    id: 'TSR-2024-002', title: 'User Role Permissions Not Propagating',
    category: 'Access Control', priority: 'medium', status: 'open',
    description: 'When an admin updates a user\'s role from "viewer" to "editor", the permissions do not take effect until the user logs out and back in. This is causing confusion for licensees using the portal.',
    submittedBy: 'ADM-002', submittedByName: 'Phenyo Ditshebo', submittedDate: '2024-03-20',
    assignedTo: null, assignedToName: null, response: null, resolvedDate: null,
  },
  {
    id: 'TSR-2024-003', title: 'Email Notification System Offline',
    category: 'Email / Notifications', priority: 'high', status: 'resolved',
    description: 'Automated email notifications for license approvals, rejections, and complaint updates stopped sending after the server restart on 2024-03-09.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-10',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: 'Root cause identified: SMTP configuration was reset during the server update. Credentials have been restored and email notifications are now fully operational. Verified with test sends across all notification types.',
    resolvedDate: '2024-03-12',
  },
  {
    id: 'TSR-2024-004', title: 'Large Report Exports Return 500 Error',
    category: 'Reports', priority: 'low', status: 'open',
    description: 'Exporting reports larger than 5 MB triggers a 500 Internal Server Error. Smaller exports work fine. This is blocking our quarterly statistical report generation.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-21',
    assignedTo: null, assignedToName: null, response: null, resolvedDate: null,
  },
  {
    id: 'TSR-2024-005', title: 'Two-Factor Authentication Configuration',
    category: 'Security', priority: 'medium', status: 'pending',
    description: 'We need 2FA enabled for all admin accounts as per the new security policy directive. Please advise on setup procedure, system requirements, and impact on existing sessions.',
    submittedBy: 'ADM-002', submittedByName: 'Phenyo Ditshebo', submittedDate: '2024-03-22',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: null, resolvedDate: null,
  },
  {
    id: 'TSR-2024-006', title: 'Complaint Module Date Filter Bug',
    category: 'Bug Report', priority: 'medium', status: 'resolved',
    description: 'The date range filter in the complaints module only returns results for the current month regardless of the selected date range. Tested on Chrome, Firefox, and Edge.',
    submittedBy: 'ADM-001', submittedByName: 'Tshegofatso Kgatlhe', submittedDate: '2024-03-05',
    assignedTo: 'SUP-001', assignedToName: 'Director of IT Systems',
    response: 'Bug confirmed and patched in version 1.4.2. The date filter was using local timezone offset instead of UTC. Deployed 2024-03-07 at 14:00.',
    resolvedDate: '2024-03-07',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRIMARY = '#002B7F';
const ACCENT  = '#2DD4BF';

function StatusBadge({ status }) {
  const map = {
    pending:           'bg-yellow-100 text-yellow-800',
    pending_documents: 'bg-yellow-100 text-yellow-800',
    submitted:         'bg-yellow-100 text-yellow-800',
    under_review:      'bg-blue-100 text-blue-800',
    approved:          'bg-green-100 text-green-800',
    resolved:          'bg-green-100 text-green-800',
    active:            'bg-green-100 text-green-800',
    rejected:          'bg-red-100 text-red-800',
    closed:            'bg-red-100 text-red-800',
    open:              'bg-teal-100 text-teal-800',
    draft:             'bg-gray-100 text-gray-700',
  };
  const cls = map[status] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const map = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-gray-100 text-gray-600' };
  const cls = map[priority] ?? 'bg-gray-100 text-gray-600';
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>{priority}</span>;
}

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce-once">
      <CheckCircle size={18} /> {msg}
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold" style={{ color: PRIMARY }}>{title}</h2>
      {action}
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', size = 'sm', className = '' }) {
  const base = 'inline-flex items-center gap-1 rounded-lg font-semibold transition-all focus:outline-none';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' };
  const variants = {
    primary: `text-white`,
    danger:  'bg-red-600 text-white hover:bg-red-700',
    ghost:   'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  const style = variant === 'primary' ? { backgroundColor: PRIMARY } : {};
  return (
    <button onClick={onClick} style={style}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
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

// ─── Dummy Image Upload ───────────────────────────────────────────────────────
function DummyImageUpload({ label = 'Cover Image' }) {
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="preview" className="w-full h-36 object-cover rounded-lg border border-gray-200" />
          <button type="button" onClick={() => setPreview(null)}
            className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-gray-500 hover:text-red-500">
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <Upload size={18} className="text-gray-400 mb-1" />
          <span className="text-xs text-gray-500">Click to upload or drag &amp; drop</span>
          <span className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5 MB</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
        </label>
      )}
    </div>
  );
}

// ─── TAB: Dashboard ──────────────────────────────────────────────────────────
function DashboardTab({ applications, complaints, tenders, news, events, toast }) {
  const pendingApps    = applications.filter(a => ['pending', 'under_review', 'pending_documents'].includes(a.status)).length;
  const openComplaints = complaints.filter(c => c.status !== 'resolved').length;
  const activeTenders  = tenders.filter(t => t.status === 'open').length;
  const draftNews      = [...news, ...events].filter(n => !n.published).length;

  const cards = [
    { label: 'Pending License Apps', value: pendingApps,    icon: FileText,       color: 'bg-blue-50 text-blue-700' },
    { label: 'Open Complaints',      value: openComplaints, icon: MessageSquare,  color: 'bg-orange-50 text-orange-700' },
    { label: 'Active Tenders',       value: activeTenders,  icon: Briefcase,      color: 'bg-teal-50 text-teal-700' },
    { label: 'Draft / Unpublished',  value: draftNews,      icon: Newspaper,      color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`rounded-2xl p-5 flex items-center gap-4 ${c.color} shadow-sm`}>
            <c.icon size={32} />
            <div>
              <p className="text-3xl font-extrabold">{c.value}</p>
              <p className="text-xs font-semibold mt-0.5 opacity-80">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-3" style={{ color: PRIMARY }}>Recent Activity</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {mockData.auditLog.map(log => (
          <div key={log.id} className="flex items-start gap-3 px-5 py-3 border-b last:border-0 hover:bg-gray-50">
            <RefreshCw size={16} className="mt-1 text-gray-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{log.action}</p>
              <p className="text-xs text-gray-400">{log.userName} · {log.module} · {log.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── License Application Detail Modal ────────────────────────────────────────
function LicenseDetailModal({ app, onClose }) {
  const fields = [
    { label: 'Application ID',    value: app.id },
    { label: 'Company Name',      value: app.companyName },
    { label: 'License Type',      value: app.licenseType },
    { label: 'Category',          value: app.category },
    { label: 'Registration No.',  value: app.regNumber },
    { label: 'Contact Email',     value: app.contactEmail },
    { label: 'Application Fee',   value: app.fee },
    { label: 'Submitted Date',    value: app.submittedDate },
    { label: 'Assigned To',       value: app.assignedTo ?? 'Unassigned' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
          <div>
            <h3 className="text-white font-bold text-lg">License Application Details</h3>
            <p className="text-white/70 text-xs mt-0.5">{app.id}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status banner */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <span className="text-sm font-semibold text-gray-500">Status</span>
            <StatusBadge status={app.status} />
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Submitted Documents */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Submitted Documents</p>
            <div className="flex flex-wrap gap-2">
              {app.documents.map(doc => (
                <span key={doc} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  <FileText size={11} /> {doc}
                </span>
              ))}
            </div>
          </div>

          {/* Rejection reason (if applicable) */}
          {app.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Rejection Reason</p>
              <p className="text-sm text-red-700">{app.rejectionReason}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <Btn variant="ghost" onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: License Applications ────────────────────────────────────────────────
function LicenseTab({ applications, setApplications, showToast }) {
  const [filter, setFilter]           = useState('all');
  const [rejectId, setRejectId]       = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [viewApp, setViewApp]         = useState(null);

  const visible = filter === 'all' ? applications : applications.filter(a => a.status === filter);

  const approve = (id) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
    showToast('Application approved successfully.');
  };

  const reject = (id) => {
    if (!rejectReason.trim()) return;
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected', rejectionReason: rejectReason } : a));
    setRejectId(null);
    setRejectReason('');
    showToast('Application rejected.');
  };

  const statuses = ['all', 'pending', 'under_review', 'pending_documents', 'approved', 'rejected'];

  return (
    <div>
      <SectionHeader title="License Applications" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filter === s ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
            style={filter === s ? { backgroundColor: PRIMARY } : {}}>
            {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-gray-500 border-b bg-gray-50">
              {['ID', 'Company', 'Type', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(app => (
              <>
                <tr key={app.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{app.id}</td>
                  <td className="px-4 py-3 font-medium">{app.companyName}</td>
                  <td className="px-4 py-3 text-gray-500">{app.licenseType}</td>
                  <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-4 py-3 text-gray-500">{app.submittedDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {app.status !== 'approved' && app.status !== 'rejected' && (
                        <Btn variant="primary" onClick={() => approve(app.id)}>
                          <CheckCircle size={12} /> Approve
                        </Btn>
                      )}
                      {app.status !== 'rejected' && (
                        <Btn variant="danger" onClick={() => { setRejectId(app.id); setRejectReason(''); }}>
                          <XCircle size={12} /> Reject
                        </Btn>
                      )}
                      <Btn variant="ghost" onClick={() => setViewApp(app)}>
                        <Eye size={12} /> View
                      </Btn>
                    </div>
                  </td>
                </tr>
                {rejectId === app.id && (
                  <tr key={`${app.id}-reject`}>
                    <td colSpan={6} className="px-4 pb-3 bg-red-50">
                      <div className="flex gap-2 items-center">
                        <input
                          className="flex-1 border border-red-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                          placeholder="Enter rejection reason..."
                          value={rejectReason}
                          onChange={e => setRejectReason(e.target.value)}
                        />
                        <Btn variant="danger" onClick={() => reject(app.id)}>Confirm Reject</Btn>
                        <Btn variant="ghost" onClick={() => setRejectId(null)}>Cancel</Btn>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No applications match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {viewApp && <LicenseDetailModal app={viewApp} onClose={() => setViewApp(null)} />}
    </div>
  );
}

// ─── Assign Complaint Modal ───────────────────────────────────────────────────
const EMPLOYEES = [
  { id: 'ADM-001', name: 'Tshegofatso Kgatlhe',  department: 'Compliance and Monitoring', role: 'Senior Compliance Officer',  activeComplaints: 3, avatar: 'TK' },
  { id: 'ADM-002', name: 'Phenyo Ditshebo',       department: 'Business Development',      role: 'Regulatory Affairs Officer', activeComplaints: 1, avatar: 'PD' },
  { id: 'ADM-004', name: 'Boitumelo Seretse',     department: 'Consumer Affairs',          role: 'Consumer Protection Officer',activeComplaints: 5, avatar: 'BS' },
  { id: 'ADM-005', name: 'Kabo Mosweu',           department: 'Technical Services',        role: 'Technical Analyst',          activeComplaints: 2, avatar: 'KM' },
  { id: 'ADM-006', name: 'Refilwe Molefhi',       department: 'Compliance and Monitoring', role: 'Compliance Officer',         activeComplaints: 0, avatar: 'RM' },
];

function AssignModal({ complaintId, onAssign, onClose }) {
  const [selected, setSelected] = useState(null);

  const confirm = () => {
    if (!selected) return;
    onAssign(complaintId, selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
          <div>
            <h3 className="text-white font-bold text-lg">Assign Complaint</h3>
            <p className="text-white/70 text-xs mt-0.5">Select an employee to handle this complaint</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Employee list */}
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {EMPLOYEES.map(emp => (
            <button
              key={emp.id}
              onClick={() => setSelected(emp)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all ${
                selected?.id === emp.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: PRIMARY }}>
                {emp.avatar}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{emp.name}</p>
                <p className="text-xs text-gray-500 truncate">{emp.role} · {emp.department}</p>
              </div>
              {/* Workload */}
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-gray-700">{emp.activeComplaints}</p>
                <p className="text-xs text-gray-400">active</p>
              </div>
              {/* Selected indicator */}
              {selected?.id === emp.id && (
                <CheckCircle size={18} className="text-blue-600 shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={confirm} className={!selected ? 'opacity-50 cursor-not-allowed' : ''}>
            <CheckCircle size={13} /> Assign
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: Complaints ─────────────────────────────────────────────────────────
function ComplaintsTab({ complaints, setComplaints, showToast }) {
  const [filter, setFilter]       = useState('all');
  const [assignId, setAssignId]   = useState(null);

  const visible = filter === 'all' ? complaints : complaints.filter(c => c.status === filter);

  const assign = (id, employee) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'under_review', assignedTo: employee.id } : c));
    showToast(`Complaint assigned to ${employee.name}.`);
  };
  const resolve = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved', resolvedDate: new Date().toISOString().slice(0, 10) } : c));
    showToast('Complaint marked as resolved.');
  };

  const statuses = ['all', 'submitted', 'under_review', 'resolved'];

  return (
    <div>
      <SectionHeader title="Complaints" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filter === s ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300'}`}
            style={filter === s ? { backgroundColor: PRIMARY } : {}}>
            {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-gray-500 border-b bg-gray-50">
              {['ID', 'Citizen', 'Category', 'Provider', 'Status', 'Priority', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(c => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.id}</td>
                <td className="px-4 py-3 font-medium">{c.citizenName}</td>
                <td className="px-4 py-3 text-gray-500">{c.category}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{c.provider}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                <td className="px-4 py-3 text-gray-500">{c.submittedDate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {!c.assignedTo && c.status === 'submitted' && (
                      <Btn variant="primary" onClick={() => setAssignId(c.id)}>Assign</Btn>
                    )}
                    {c.status !== 'resolved' && (
                      <Btn variant="ghost" onClick={() => resolve(c.id)}>
                        <CheckCircle size={12} /> Resolve
                      </Btn>
                    )}
                    {c.status === 'resolved' && <span className="text-green-600 text-xs font-semibold">Resolved</span>}
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No complaints match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {assignId && (
        <AssignModal
          complaintId={assignId}
          onAssign={assign}
          onClose={() => setAssignId(null)}
        />
      )}
    </div>
  );
}

// ─── TAB: Tenders ─────────────────────────────────────────────────────────────
function TendersTab({ tenders, setTenders, showToast }) {
  const [editId, setEditId]     = useState(null);
  const [editData, setEditData] = useState({});
  const [showNew, setShowNew]   = useState(false);
  const [newTender, setNewTender] = useState({ title: '', category: '', closingDate: '', description: '' });

  const startEdit = (t) => { setEditId(t.id); setEditData({ ...t }); };

  const saveEdit = () => {
    setTenders(prev => prev.map(t => t.id === editId ? { ...editData } : t));
    setEditId(null);
    showToast('Tender updated successfully.');
  };

  const togglePublish = (id) => {
    setTenders(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'open' ? 'closed' : 'open' } : t));
    showToast('Tender status updated.');
  };

  const addTender = () => {
    if (!newTender.title.trim()) return;
    const next = {
      id: `TND-2024-00${tenders.length + 1}`,
      ...newTender,
      status: 'open',
      publishedDate: new Date().toISOString().slice(0, 10),
      contact: 'procurement@bocra.bw',
    };
    setTenders(prev => [next, ...prev]);
    setShowNew(false);
    setNewTender({ title: '', category: '', closingDate: '', description: '' });
    showToast('New tender added successfully.');
  };

  return (
    <div>
      <SectionHeader title="Tenders"
        action={<Btn variant="primary" size="md" onClick={() => setShowNew(true)}><Plus size={14} /> Add New Tender</Btn>} />

      {showNew && (
        <Modal title="Add New Tender" onClose={() => setShowNew(false)}>
          <div className="space-y-3">
            {[['Title', 'title'], ['Category', 'category'], ['Closing Date', 'closingDate']].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                <input type={key === 'closingDate' ? 'date' : 'text'} value={newTender[key]}
                  onChange={e => setNewTender(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': ACCENT }} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea rows={3} value={newTender.description}
                onChange={e => setNewTender(p => ({ ...p, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <DummyImageUpload label="Tender Document / Cover Image" />
            <div className="flex justify-end gap-2 pt-2">
              <Btn variant="ghost" onClick={() => setShowNew(false)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={addTender}>Save Tender</Btn>
            </div>
          </div>
        </Modal>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-bold text-gray-500 border-b bg-gray-50">
              {['ID', 'Title', 'Category', 'Status', 'Closing Date', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tenders.map(t => (
              <>
                <tr key={t.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{t.id}</td>
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{t.title}</td>
                  <td className="px-4 py-3 text-gray-500">{t.category}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3 text-gray-500">{t.closingDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      <Btn variant="outline" onClick={() => startEdit(t)}><Pencil size={12} /> Edit</Btn>
                      <Btn variant={t.status === 'open' ? 'danger' : 'primary'} onClick={() => togglePublish(t.id)}>
                        {t.status === 'open' ? 'Unpublish' : 'Publish'}
                      </Btn>
                    </div>
                  </td>
                </tr>
                {editId === t.id && (
                  <tr key={`${t.id}-edit`}>
                    <td colSpan={6} className="px-4 pb-4 bg-blue-50">
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {[['Title', 'title'], ['Category', 'category'], ['Closing Date', 'closingDate']].map(([label, key]) => (
                          <div key={key}>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                            <input type={key === 'closingDate' ? 'date' : 'text'} value={editData[key] || ''}
                              onChange={e => setEditData(p => ({ ...p, [key]: e.target.value }))}
                              className="w-full border border-blue-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none" />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Btn variant="primary" size="md" onClick={saveEdit}>Save Changes</Btn>
                        <Btn variant="ghost" onClick={() => setEditId(null)}>Cancel</Btn>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB: News & Events ───────────────────────────────────────────────────────
function NewsTab({ news, setNews, events, setEvents, showToast }) {
  const [editItem, setEditItem]   = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', type: 'news', category: '', body: '', author: '' });

  const all = [
    ...news.map(n => ({ ...n, _source: 'news' })),
    ...events.map(e => ({ ...e, _source: 'events', type: 'event' })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const togglePublish = (id, source) => {
    if (source === 'news') setNews(prev => prev.map(n => n.id === id ? { ...n, published: !n.published } : n));
    else setEvents(prev => prev.map(e => e.id === id ? { ...e, published: !e.published } : e));
    showToast('Publish status updated.');
  };

  const saveEdit = () => {
    if (editItem._source === 'news') setNews(prev => prev.map(n => n.id === editItem.id ? { ...editItem } : n));
    else setEvents(prev => prev.map(e => e.id === editItem.id ? { ...editItem } : e));
    setEditItem(null);
    showToast('Article updated.');
  };

  const addArticle = () => {
    if (!newArticle.title.trim()) return;
    const next = { id: Date.now(), ...newArticle, date: new Date().toISOString().slice(0, 10), published: false, excerpt: newArticle.body.slice(0, 80) + '...' };
    setNews(prev => [next, ...prev]);
    setShowForm(false);
    setNewArticle({ title: '', type: 'news', category: '', body: '', author: '' });
    showToast('New article added.');
  };

  return (
    <div>
      <SectionHeader title="News & Events"
        action={<Btn variant="primary" size="md" onClick={() => setShowForm(true)}><Plus size={14} /> New Article</Btn>} />

      {showForm && (
        <Modal title="Add New Article" onClose={() => setShowForm(false)}>
          <div className="space-y-3">
            {[['Title', 'title', 'text'], ['Category', 'category', 'text'], ['Author', 'author', 'text']].map(([label, key, type]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                <input type={type} value={newArticle[key]}
                  onChange={e => setNewArticle(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Body</label>
              <textarea rows={4} value={newArticle.body}
                onChange={e => setNewArticle(p => ({ ...p, body: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <DummyImageUpload label="Article Cover Image" />
            <div className="flex justify-end gap-2 pt-2">
              <Btn variant="ghost" onClick={() => setShowForm(false)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={addArticle}>Publish</Btn>
            </div>
          </div>
        </Modal>
      )}

      {editItem && (
        <Modal title="Edit Article" onClose={() => setEditItem(null)}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
              <input value={editItem.title} onChange={e => setEditItem(p => ({ ...p, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Body / Description</label>
              <textarea rows={4} value={editItem.body || editItem.description || ''}
                onChange={e => setEditItem(p => ({ ...p, body: e.target.value, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Btn variant="ghost" onClick={() => setEditItem(null)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={saveEdit}>Save</Btn>
            </div>
          </div>
        </Modal>
      )}

      <div className="space-y-3">
        {all.map(item => (
          <div key={`${item._source}-${item.id}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4">
            {item.image && (
              <img src={item.image} alt={item.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase text-gray-400">{item.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {item.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="font-semibold text-gray-800 truncate">{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.date} {item.author ? `· ${item.author}` : ''}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn variant="outline" onClick={() => setEditItem(item)}><Pencil size={12} /> Edit</Btn>
              <Btn variant={item.published ? 'danger' : 'primary'}
                onClick={() => togglePublish(item.id, item._source)}>
                {item.published ? 'Unpublish' : 'Publish'}
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAB: Reports ─────────────────────────────────────────────────────────────
function ReportsTab({ reports, setReports, showToast }) {
  const [showUpload, setShowUpload] = useState(false);
  const [newReport, setNewReport]   = useState({ title: '', category: '', year: new Date().getFullYear() });

  const togglePublish = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, published: !r.published } : r));
    showToast('Report publish status updated.');
  };

  const deleteReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
    showToast('Report deleted.');
  };

  const uploadReport = () => {
    if (!newReport.title.trim()) return;
    const next = {
      id: Date.now(),
      ...newReport,
      fileSize: '0.0MB', fileType: 'PDF',
      published: false,
      uploadedDate: new Date().toISOString().slice(0, 10),
      uploadedBy: 'ADM-001',
    };
    setReports(prev => [next, ...prev]);
    setShowUpload(false);
    setNewReport({ title: '', category: '', year: new Date().getFullYear() });
    showToast('Report uploaded.');
  };

  return (
    <div>
      <SectionHeader title="Reports & Publications"
        action={<Btn variant="primary" size="md" onClick={() => setShowUpload(true)}><Upload size={14} /> Upload Report</Btn>} />

      {showUpload && (
        <Modal title="Upload New Report" onClose={() => setShowUpload(false)}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
              <input value={newReport.title} onChange={e => setNewReport(p => ({ ...p, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select value={newReport.category} onChange={e => setNewReport(p => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
                <option value="">Select category</option>
                {['Annual Reports', 'Market Analysis', 'Statistics', 'Industry Reports', 'Regulations'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Year</label>
              <input type="number" value={newReport.year} onChange={e => setNewReport(p => ({ ...p, year: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">File (demo)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 text-sm">
                Click to select PDF (simulated)
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Btn variant="ghost" onClick={() => setShowUpload(false)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={uploadReport}>Upload</Btn>
            </div>
          </div>
        </Modal>
      )}

      <div className="space-y-3">
        {reports.map(r => (
          <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: PRIMARY }}>PDF</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{r.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{r.category} · {r.year} · {r.fileSize}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${r.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {r.published ? 'Published' : 'Draft'}
            </span>
            <div className="flex gap-2 shrink-0">
              <Btn variant={r.published ? 'danger' : 'primary'} onClick={() => togglePublish(r.id)}>
                {r.published ? 'Unpublish' : 'Publish'}
              </Btn>
              <Btn variant="ghost" onClick={() => deleteReport(r.id)}><Trash2 size={12} /></Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAB: Request Tech Support ───────────────────────────────────────────────
const SUPPORT_CATEGORIES = [
  { label: 'Database',             icon: Database,    color: 'bg-blue-50 text-blue-700 border-blue-200'   },
  { label: 'Access Control',       icon: ShieldAlert, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { label: 'Email / Notifications',icon: MessageSquare, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { label: 'Reports',              icon: BarChart2,   color: 'bg-teal-50 text-teal-700 border-teal-200'   },
  { label: 'Security',             icon: ShieldAlert, color: 'bg-red-50 text-red-700 border-red-200'      },
  { label: 'Bug Report',           icon: Bug,         color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { label: 'Other',                icon: HelpCircle,  color: 'bg-gray-50 text-gray-700 border-gray-200'   },
];

function TechSupportRequestTab({ techRequests, setTechRequests, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', priority: 'medium', description: '' });
  const [attachPreview, setAttachPreview] = useState(null);

  const submit = () => {
    if (!form.title.trim() || !form.category || !form.description.trim()) return;
    const next = {
      id: `TSR-2024-00${techRequests.length + 1}`,
      ...form,
      status: 'open',
      submittedBy: 'ADM-001',
      submittedByName: 'Tshegofatso Kgatlhe',
      submittedDate: new Date().toISOString().slice(0, 10),
      assignedTo: null, assignedToName: null,
      response: null, resolvedDate: null,
    };
    setTechRequests(prev => [next, ...prev]);
    setShowForm(false);
    setForm({ title: '', category: '', priority: 'medium', description: '' });
    setAttachPreview(null);
    showToast('Tech support request submitted to Super Admin.');
  };

  const myRequests = techRequests.slice(0, 3);

  return (
    <div>
      <SectionHeader title="Request Technical Support"
        action={<Btn variant="primary" size="md" onClick={() => setShowForm(true)}><Plus size={14} /> New Request</Btn>} />

      {/* Submit dialog */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: PRIMARY }}>
              <div>
                <h3 className="text-white font-bold text-lg">Submit Support Request</h3>
                <p className="text-white/70 text-xs mt-0.5">Sent directly to the Super Admin</p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Request Title <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Email notifications not sending"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category <span className="text-red-500">*</span></label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option value="">Select…</option>
                    {SUPPORT_CATEGORIES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
                  <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea rows={5} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the issue in detail — include steps to reproduce, error messages, affected users…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
              </div>
              {/* Dummy attachment */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Attachment (optional)</label>
                {attachPreview ? (
                  <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <FileText size={16} className="text-blue-600 shrink-0" />
                    <span className="text-sm text-blue-700 flex-1 truncate">{attachPreview}</span>
                    <button onClick={() => setAttachPreview(null)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Upload size={16} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Click to attach a screenshot or log file</span>
                    <input type="file" className="hidden" onChange={e => e.target.files[0] && setAttachPreview(e.target.files[0].name)} />
                  </label>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">
              <Btn variant="ghost" onClick={() => setShowForm(false)}>Cancel</Btn>
              <Btn variant="primary" size="md" onClick={submit}>
                <Send size={13} /> Submit Request
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* Category quick-select cards */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 mb-3">Select a category to get started</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUPPORT_CATEGORIES.map(cat => (
            <button key={cat.label} onClick={() => { setForm(p => ({ ...p, category: cat.label })); setShowForm(true); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left font-medium text-sm transition-all hover:shadow-sm ${cat.color}`}>
              <cat.icon size={18} className="shrink-0" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent own submissions preview */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-3">Your Recent Submissions</p>
        <div className="space-y-2">
          {myRequests.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: PRIMARY }}>
                <Headphones size={15} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{r.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.id} · {r.submittedDate}</p>
              </div>
              <StatusBadge status={r.status} />
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminPortal({ setCurrentPage }) {
  const TABS = [
    { id: 'dashboard',      label: 'Dashboard',        icon: LayoutDashboard },
    { id: 'licenses',       label: 'License Apps',     icon: FileText        },
    { id: 'complaints',     label: 'Complaints',       icon: MessageSquare   },
    { id: 'tenders',        label: 'Tenders',          icon: Briefcase       },
    { id: 'news',           label: 'News & Events',    icon: Newspaper       },
    { id: 'reports',        label: 'Reports',          icon: BarChart2       },
    { id: 'tech-support',   label: 'Request Support',  icon: Headphones      },
  ];

  const [activeTab, setActiveTab]       = useState('dashboard');
  const [applications, setApplications] = useState(mockData.licenseApplications);
  const [complaints,   setComplaints]   = useState(mockData.complaints);
  const [tenders,      setTenders]      = useState(mockData.tenders);
  const [news,         setNews]         = useState(mockData.news);
  const [events,       setEvents]       = useState(mockData.events);
  const [reports,      setReports]      = useState(mockData.reports);
  const [techRequests, setTechRequests] = useState(INITIAL_TECH_REQUESTS);
  const [toast,        setToast]        = useState(null);
  const [showChat,     setShowChat]     = useState(false);
  const [chatInput,    setChatInput]    = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: "Hi! I'm BOTSI. Ask me about pending tasks or navigate to any section." }
  ]);

  const showToast = (msg) => setToast(msg);

  const sendChat = (text) => {
    const q = text || chatInput;
    if (!q.trim()) return;
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'user', text: q }]);
    const reply = AI_ADMIN_RESPONSES[q] || "I don't have a specific answer for that. Check the relevant tab or contact the Super Admin.";
    setTimeout(() => setChatMessages(prev => [...prev, { type: 'bot', text: reply }]), 600);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white px-6 py-5" style={{ backgroundColor: PRIMARY }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Portal</h1>
            <p className="text-blue-200 text-sm mt-0.5">BOCRA Internal Management System</p>
          </div>
          <button onClick={() => setCurrentPage && setCurrentPage('home')}
            className="text-sm text-blue-200 hover:text-white transition-colors">
            &larr; Back to Site
          </button>
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
        {activeTab === 'dashboard'  && <DashboardTab applications={applications} complaints={complaints} tenders={tenders} news={news} events={events} toast={toast} />}
        {activeTab === 'licenses'   && <LicenseTab applications={applications} setApplications={setApplications} showToast={showToast} />}
        {activeTab === 'complaints' && <ComplaintsTab complaints={complaints} setComplaints={setComplaints} showToast={showToast} />}
        {activeTab === 'tenders'    && <TendersTab tenders={tenders} setTenders={setTenders} showToast={showToast} />}
        {activeTab === 'news'       && <NewsTab news={news} setNews={setNews} events={events} setEvents={setEvents} showToast={showToast} />}
        {activeTab === 'reports'      && <ReportsTab reports={reports} setReports={setReports} showToast={showToast} />}
        {activeTab === 'tech-support' && <TechSupportRequestTab techRequests={techRequests} setTechRequests={setTechRequests} showToast={showToast} />}
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
                {['Pending applications summary', 'Open complaints count', 'Draft tenders'].map(p => (
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
