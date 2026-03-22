import { useState } from 'react';
import { CheckSquare, BarChart2, Plus, Users, Clock, CheckCircle, X, ChevronRight, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const initialPolls = [
  {
    id: 'VOTE-001',
    title: 'Q2 2024 Strategic Priority Vote',
    description: "Select the department's top priority for Q2 2024. Results will inform the Director's quarterly planning session.",
    type: 'single',
    status: 'active',
    deadline: '2024-04-15',
    createdBy: 'Director of IT Systems',
    anonymous: false,
    options: [
      { id: 'a', text: 'Digital Transformation Initiative', votes: 8 },
      { id: 'b', text: 'Cybersecurity Enhancement Program', votes: 5 },
      { id: 'c', text: 'Consumer Protection Framework', votes: 3 },
      { id: 'd', text: 'Spectrum Refarming Project', votes: 4 },
    ],
    totalEligible: 20,
    votedCount: 20,
    myVote: null,
  },
  {
    id: 'VOTE-002',
    title: 'Office Renovation Contractor Selection',
    description: 'Select preferred contractor for the 2024 head office renovation project from the shortlisted bids.',
    type: 'single',
    status: 'active',
    deadline: '2024-04-20',
    createdBy: 'Tshegofatso Kgatlhe',
    anonymous: true,
    options: [
      { id: 'a', text: 'Pula Construction & Design Ltd', votes: 3 },
      { id: 'b', text: 'Kgosi Builders (Pty) Ltd', votes: 7 },
      { id: 'c', text: 'Botswana Premier Contractors', votes: 4 },
    ],
    totalEligible: 15,
    votedCount: 14,
    myVote: null,
  },
  {
    id: 'VOTE-003',
    title: 'Staff Welfare Committee Election 2024',
    description: 'Elect two representatives to the Staff Welfare Committee for the 2024–2025 term.',
    type: 'multi',
    maxChoices: 2,
    status: 'active',
    deadline: '2024-04-30',
    createdBy: 'HR Division',
    anonymous: true,
    options: [
      { id: 'a', text: 'Kabo Mosimanegape — ICT Division', votes: 11 },
      { id: 'b', text: 'Onalenna Segaetsho — Legal Division', votes: 9 },
      { id: 'c', text: 'Lorato Dikgole — Finance Division', votes: 13 },
      { id: 'd', text: 'Phenyo Moalosi — Licensing Division', votes: 6 },
      { id: 'e', text: 'Boitumelo Setlhare — Admin Division', votes: 8 },
    ],
    totalEligible: 45,
    votedCount: 38,
    myVote: null,
  },
  {
    id: 'VOTE-004',
    title: 'Annual Staff Satisfaction Survey 2023',
    description: "Rate your overall satisfaction with BOCRA's work environment and management.",
    type: 'single',
    status: 'closed',
    deadline: '2023-12-20',
    createdBy: 'HR Division',
    anonymous: true,
    options: [
      { id: 'a', text: 'Very Satisfied', votes: 18 },
      { id: 'b', text: 'Satisfied', votes: 22 },
      { id: 'c', text: 'Neutral', votes: 8 },
      { id: 'd', text: 'Dissatisfied', votes: 4 },
      { id: 'e', text: 'Very Dissatisfied', votes: 1 },
    ],
    totalEligible: 55,
    votedCount: 53,
    myVote: 'b',
  },
  {
    id: 'VOTE-005',
    title: 'Q4 2023 Budget Allocation Priority',
    description: 'Which area should receive the largest share of the Q4 supplementary budget?',
    type: 'single',
    status: 'closed',
    deadline: '2023-10-05',
    createdBy: 'Director of IT Systems',
    anonymous: false,
    options: [
      { id: 'a', text: 'IT Infrastructure Upgrade', votes: 14 },
      { id: 'b', text: 'Staff Training & Development', votes: 19 },
      { id: 'c', text: 'Public Awareness Campaigns', votes: 9 },
      { id: 'd', text: 'Equipment Procurement', votes: 7 },
    ],
    totalEligible: 50,
    votedCount: 49,
    myVote: 'b',
  },
];

const TABS = ['Active Votes', 'Create Vote', 'Results', 'History'];

function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
      {status === 'active' ? 'Active' : 'Closed'}
    </span>
  );
}

function ResultBar({ option, total }) {
  const pct = total > 0 ? Math.round((option.votes / total) * 100) : 0;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">{option.text}</span>
        <span className="text-gray-500 font-semibold">{option.votes} votes ({pct}%)</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div className="h-2.5 rounded-full bg-[#002B7F] transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function VotingSystem({ setCurrentPage }) {
  const { user, userType } = useAuth();
  const [tab, setTab] = useState('Active Votes');
  const [polls, setPolls] = useState(initialPolls);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [myChoices, setMyChoices] = useState([]);
  const [toast, setToast] = useState('');
  const [newPoll, setNewPoll] = useState({
    title: '', description: '', type: 'single', maxChoices: 2,
    deadline: '', anonymous: false, options: ['', ''],
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const isStaff = ['admin', 'superadmin'].includes(userType);

  if (!isStaff) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
          <Shield size={48} className="text-[#002B7F] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#002B7F] mb-2">Restricted Access</h2>
          <p className="text-gray-500 text-sm mb-6">The Internal Voting System is accessible to BOCRA staff only. Please sign in with an admin account.</p>
          <button onClick={() => setCurrentPage('login-admin')}
            className="px-6 py-2.5 bg-[#002B7F] text-white rounded-lg font-medium text-sm hover:bg-[#1a4a9e] transition-colors">
            Admin Sign In
          </button>
        </div>
      </div>
    );
  }

  const activePolls = polls.filter(p => p.status === 'active');
  const closedPolls = polls.filter(p => p.status === 'closed');

  const handleVote = (poll) => {
    if (myChoices.length === 0) { showToast('Please select an option before submitting.'); return; }
    setPolls(prev => prev.map(p => {
      if (p.id !== poll.id) return p;
      const updatedOptions = p.options.map(o =>
        myChoices.includes(o.id) ? { ...o, votes: o.votes + 1 } : o
      );
      return { ...p, options: updatedOptions, votedCount: p.votedCount + 1, myVote: myChoices[0] };
    }));
    setSelectedPoll(null);
    setMyChoices([]);
    showToast('Your vote has been recorded. Thank you!');
  };

  const toggleChoice = (id, type, maxChoices) => {
    if (type === 'single') {
      setMyChoices([id]);
    } else {
      setMyChoices(prev =>
        prev.includes(id)
          ? prev.filter(x => x !== id)
          : prev.length < maxChoices ? [...prev, id] : prev
      );
    }
  };

  const addOption = () => setNewPoll(p => ({ ...p, options: [...p.options, ''] }));
  const removeOption = (i) => setNewPoll(p => ({ ...p, options: p.options.filter((_, idx) => idx !== i) }));
  const updateOption = (i, val) => setNewPoll(p => ({ ...p, options: p.options.map((o, idx) => idx === i ? val : o) }));

  const submitNewPoll = () => {
    if (!newPoll.title || !newPoll.deadline || newPoll.options.filter(Boolean).length < 2) {
      showToast('Please fill in title, deadline, and at least 2 options.'); return;
    }
    const poll = {
      id: `VOTE-00${polls.length + 1}`,
      title: newPoll.title,
      description: newPoll.description,
      type: newPoll.type,
      maxChoices: newPoll.maxChoices,
      status: 'active',
      deadline: newPoll.deadline,
      createdBy: user?.name || 'Admin',
      anonymous: newPoll.anonymous,
      options: newPoll.options.filter(Boolean).map((t, i) => ({ id: String.fromCharCode(97 + i), text: t, votes: 0 })),
      totalEligible: 50,
      votedCount: 0,
      myVote: null,
    };
    setPolls(prev => [poll, ...prev]);
    setNewPoll({ title: '', description: '', type: 'single', maxChoices: 2, deadline: '', anonymous: false, options: ['', ''] });
    setTab('Active Votes');
    showToast(`Poll "${poll.title}" created successfully.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#002B7F] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle size={18} className="text-[#2DD4BF]" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Vote Modal */}
      {selectedPoll && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#002B7F] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold">{selectedPoll.title}</h3>
              <button onClick={() => { setSelectedPoll(null); setMyChoices([]); }}><X size={20} className="text-white/70 hover:text-white" /></button>
            </div>
            <div className="p-6">
              {selectedPoll.anonymous && (
                <div className="flex items-center gap-2 text-xs text-teal-700 bg-teal-50 rounded-lg px-3 py-2 mb-4">
                  <Shield size={14} /> This is an anonymous vote — your identity will not be recorded.
                </div>
              )}
              <p className="text-gray-600 text-sm mb-5">{selectedPoll.description}</p>
              {selectedPoll.type === 'multi' && (
                <p className="text-xs text-gray-400 mb-3">Select up to {selectedPoll.maxChoices} options.</p>
              )}
              <div className="space-y-2 mb-6">
                {selectedPoll.options.map(opt => (
                  <label key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${myChoices.includes(opt.id) ? 'border-[#002B7F] bg-[#002B7F]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input
                      type={selectedPoll.type === 'single' ? 'radio' : 'checkbox'}
                      name={selectedPoll.id}
                      checked={myChoices.includes(opt.id)}
                      onChange={() => toggleChoice(opt.id, selectedPoll.type, selectedPoll.maxChoices)}
                      className="accent-[#002B7F]"
                    />
                    <span className="text-sm font-medium text-gray-700">{opt.text}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleVote(selectedPoll)}
                  className="flex-1 py-2.5 bg-[#002B7F] text-white rounded-lg font-medium text-sm hover:bg-[#1a4a9e] transition-colors">
                  Submit Vote
                </button>
                <button onClick={() => { setSelectedPoll(null); setMyChoices([]); }}
                  className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#002B7F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2DD4BF] rounded-xl flex items-center justify-center">
                <CheckSquare size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">BOCRA Internal Voting System</h1>
                <p className="text-blue-300 text-sm">Staff-only platform for internal polls and elections</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage('home')}
              className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
              ← Home
            </button>
          </div>
          <div className="flex gap-1 mt-6 overflow-x-auto">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${tab === t ? 'bg-white text-[#002B7F]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── ACTIVE VOTES ── */}
        {tab === 'Active Votes' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#002B7F]">Active Polls ({activePolls.length})</h2>
              {userType === 'superadmin' && (
                <button onClick={() => setTab('Create Vote')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] transition-colors">
                  <Plus size={16} /> Create Poll
                </button>
              )}
            </div>
            {activePolls.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <CheckSquare size={40} className="mx-auto mb-3 opacity-30" />
                <p>No active polls at the moment.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {activePolls.map(poll => {
                  const participation = poll.totalEligible > 0
                    ? Math.round((poll.votedCount / poll.totalEligible) * 100) : 0;
                  const hasVoted = poll.myVote !== null;
                  return (
                    <div key={poll.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <StatusBadge status={poll.status} />
                            {poll.anonymous && <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Anonymous</span>}
                            <span className="text-xs text-gray-400">{poll.type === 'multi' ? `Multi-choice (max ${poll.maxChoices})` : 'Single choice'}</span>
                          </div>
                          <h3 className="text-lg font-bold text-[#1E293B] mb-1">{poll.title}</h3>
                          <p className="text-sm text-gray-500 mb-3">{poll.description}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Clock size={12} /> Closes: {poll.deadline}</span>
                            <span className="flex items-center gap-1"><Users size={12} /> {poll.votedCount}/{poll.totalEligible} voted ({participation}%)</span>
                            <span>Created by: {poll.createdBy}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          {hasVoted ? (
                            <span className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                              <CheckCircle size={14} /> Voted
                            </span>
                          ) : (
                            <button onClick={() => { setSelectedPoll(poll); setMyChoices([]); }}
                              className="flex items-center gap-2 px-4 py-2 bg-[#002B7F] text-white rounded-lg text-sm font-medium hover:bg-[#1a4a9e] transition-colors">
                              Cast Vote <ChevronRight size={14} />
                            </button>
                          )}
                          <button onClick={() => setTab('Results')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            <BarChart2 size={14} /> Results
                          </button>
                        </div>
                      </div>
                      {/* Participation bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Participation</span><span>{participation}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-[#2DD4BF] transition-all" style={{ width: `${participation}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── CREATE VOTE ── */}
        {tab === 'Create Vote' && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-[#002B7F] mb-6">Create New Poll</h2>
            {userType !== 'superadmin' && (
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-6 text-sm text-yellow-700">
                <AlertTriangle size={16} /> Only Super Admins can create new polls.
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Poll Title <span className="text-red-400">*</span></label>
                <input value={newPoll.title} onChange={e => setNewPoll(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Q3 Strategic Priority Vote"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={newPoll.description} onChange={e => setNewPoll(p => ({ ...p, description: e.target.value }))}
                  rows={3} placeholder="Brief context about this poll..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vote Type</label>
                  <select value={newPoll.type} onChange={e => setNewPoll(p => ({ ...p, type: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm">
                    <option value="single">Single Choice</option>
                    <option value="multi">Multi Choice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Deadline <span className="text-red-400">*</span></label>
                  <input type="date" value={newPoll.deadline} onChange={e => setNewPoll(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
                </div>
              </div>
              {newPoll.type === 'multi' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Max Choices Allowed</label>
                  <input type="number" min={2} max={10} value={newPoll.maxChoices}
                    onChange={e => setNewPoll(p => ({ ...p, maxChoices: parseInt(e.target.value) }))}
                    className="w-32 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Options <span className="text-red-400">*</span></label>
                  <button onClick={addOption} className="text-xs text-[#002B7F] hover:underline flex items-center gap-1">
                    <Plus size={12} /> Add option
                  </button>
                </div>
                <div className="space-y-2">
                  {newPoll.options.map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={opt} onChange={e => updateOption(i, e.target.value)}
                        placeholder={`Option ${i + 1}`}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2DD4BF] text-sm" />
                      {newPoll.options.length > 2 && (
                        <button onClick={() => removeOption(i)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={newPoll.anonymous} onChange={e => setNewPoll(p => ({ ...p, anonymous: e.target.checked }))}
                  className="w-4 h-4 accent-[#002B7F]" />
                <span className="text-sm text-gray-700">Anonymous voting (voter identities will not be stored)</span>
              </label>
              <button onClick={submitNewPoll} disabled={userType !== 'superadmin'}
                className="w-full py-3 bg-[#002B7F] text-white rounded-xl font-semibold text-sm hover:bg-[#1a4a9e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Create Poll
              </button>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {tab === 'Results' && (
          <div>
            <h2 className="text-xl font-bold text-[#002B7F] mb-6">Poll Results</h2>
            <div className="space-y-6">
              {polls.map(poll => {
                const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
                const winner = [...poll.options].sort((a, b) => b.votes - a.votes)[0];
                return (
                  <div key={poll.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={poll.status} />
                          {poll.anonymous && <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Anonymous</span>}
                        </div>
                        <h3 className="text-lg font-bold text-[#1E293B]">{poll.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{poll.votedCount} / {poll.totalEligible} eligible voters participated</p>
                      </div>
                      {poll.status === 'closed' && (
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Leading / Winner</p>
                          <p className="text-sm font-bold text-[#002B7F]">{winner.text}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      {poll.options.map(opt => (
                        <ResultBar key={opt.id} option={opt} total={totalVotes} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── HISTORY ── */}
        {tab === 'History' && (
          <div>
            <h2 className="text-xl font-bold text-[#002B7F] mb-6">Closed Polls ({closedPolls.length})</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-bold text-gray-500 border-b bg-gray-50">
                    <th className="px-5 py-3">Poll</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Deadline</th>
                    <th className="px-5 py-3">Participation</th>
                    <th className="px-5 py-3">My Vote</th>
                  </tr>
                </thead>
                <tbody>
                  {closedPolls.map(poll => {
                    const participation = poll.totalEligible > 0
                      ? Math.round((poll.votedCount / poll.totalEligible) * 100) : 0;
                    const myOpt = poll.myVote ? poll.options.find(o => o.id === poll.myVote) : null;
                    return (
                      <tr key={poll.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="px-5 py-3 font-medium text-gray-800">{poll.title}</td>
                        <td className="px-5 py-3 capitalize text-gray-500">{poll.type}</td>
                        <td className="px-5 py-3 text-gray-500">{poll.deadline}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div className="h-1.5 rounded-full bg-[#2DD4BF]" style={{ width: `${participation}%` }} />
                            </div>
                            <span className="text-gray-500">{participation}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-500 text-xs">{myOpt ? myOpt.text : <span className="text-gray-300">—</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
