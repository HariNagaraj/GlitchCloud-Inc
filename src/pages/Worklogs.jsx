import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ROLES, DEPARTMENT_TAGS } from '../context/roleConstants';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  MoreHorizontal, 
  AlertCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  Users,
  Tag,
  Hash,
  LayoutGrid,
  List,
  Layers,
  Bug,
  CheckSquare,
  ChevronRight,
  History,
  MessageCircle,
  Paperclip,
  Maximize2,
  X,
  ChevronLeft,
  ArrowRightCircle,
  UserCheck,
  MessageSquare
} from 'lucide-react';
import { useTeamStore } from '../store/useTeamStore';
import { CustomSelect } from '../components/CustomSelect';

const ISSUE_TYPES = {
  Task: { icon: CheckSquare, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Task' },
  Bug: { icon: Bug, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Bug/Revision' },
  Subtask: { icon: Layers, color: 'text-neutral-400', bg: 'bg-neutral-400/10', label: 'Sub-task' },
  Epic: { icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Epic' }
};

const COLUMNS = [
  { id: 'Backlog', label: 'Backlog', color: 'text-neutral' },
  { id: 'In Progress', label: 'In Progress', color: 'text-blue-400' },
  { id: 'Review', label: 'Review', color: 'text-amber-400' },
  { id: 'Done', label: 'Done', color: 'text-green-400' }
];

const EMPLOYEES = [
  { name: 'Alice CEO', id: '1', role: 'Executive' },
  { name: 'Bob Director', id: '2', role: 'Director' },
  { name: 'Charlie Dev', id: '3', role: 'Associate' },
  { name: 'Dana Editor', id: '4', role: 'Associate' }
];

const INITIAL_TASKS = [
  {
    id: 't1',
    key: 'GC-101',
    title: 'Q3 Financial Report Design',
    client: 'Starlight Media',
    assignee: { name: 'Charlie Dev', id: '3', role: 'Associate' },
    reporter: { name: 'Bob Director', id: '2', role: 'Director' },
    priority: 'Urgent',
    status: 'In Progress',
    type: 'Task',
    tags: ['#Design', '#Financials'],
    timeSpent: 120,
    epic: 'Summer Campaign',
    activity: [
      { user: 'Bob Director', action: 'created issue', time: '2 days ago', remark: 'Initial task creation' },
      { user: 'Charlie Dev', action: 'moved to In Progress', time: '5 hours ago', remark: 'Starting work on the layout' }
    ]
  },
  {
    id: 't2',
    key: 'GC-102',
    title: 'Color Grading Glitch',
    client: 'Nexus Tech',
    assignee: { name: 'Charlie Dev', id: '3', role: 'Associate' },
    reporter: { name: 'Bob Director', id: '2', role: 'Director' },
    priority: 'High',
    status: 'Review',
    type: 'Bug',
    tags: ['#VFX', '#Revision'],
    timeSpent: 30,
    epic: null,
    activity: [
      { user: 'Charlie Dev', action: 'submitted for Review', time: '1 hour ago', remark: 'Colors fixed, please check the saturation levels.' }
    ]
  }
];

// --- Sub-components ---

const TransitionModal = ({ task, nextStatus, onClose, onConfirm, currentUser }) => {
  const [remark, setRemark] = useState('');
  const [renderUrl, setRenderUrl] = useState(task.renderUrl || '');
  const [newAssignee, setNewAssignee] = useState(currentUser || task.assignee);
  
  const colOrder = ['Backlog', 'In Progress', 'Review', 'Done'];
  const currentIndex = colOrder.indexOf(task.status);
  const nextIndex = colOrder.indexOf(nextStatus);
  const isRegressive = nextIndex < currentIndex;
  const isRemarkRequired = isRegressive;
  const isReviewSubmission = nextStatus === 'Review';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[600] flex items-center justify-center p-6 font-urbanist select-none">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#0a0a0f] border border-white/10 w-full max-w-lg rounded-[40px] p-8 shadow-3xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <h3 className="text-xl font-bold mb-6">Transition Task: {nextStatus}</h3>
        <div className="space-y-4">
          {isReviewSubmission && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                Render / Draft Review Stream URL (Required for Review)
              </label>
              <input
                type="text"
                required
                placeholder="https://frame.io/review/cut-v2 or Drive link"
                className="w-full bg-white/5 border border-primary/40 rounded-2xl p-4 text-xs font-medium text-white outline-none focus:border-primary"
                value={renderUrl}
                onChange={(e) => setRenderUrl(e.target.value)}
              />
            </div>
          )}

          <CustomSelect label="Assign Lead Reviewer" value={newAssignee?.name} options={EMPLOYEES.map(e => e.name)} onChange={(name) => {
            const emp = EMPLOYEES.find(e => e.name === name);
            setNewAssignee({ name: emp.name, id: emp.id, role: emp.role });
          }} />
          <textarea 
            placeholder={isRemarkRequired ? "Remark is required for backward moves..." : "Remark (optional)..."}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm h-28 resize-none outline-none focus:border-primary"
            value={remark} onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="flex-1 py-4 text-xs font-black uppercase text-neutral">Cancel</button>
          <button 
            onClick={() => onConfirm(nextStatus, remark, newAssignee, renderUrl)}
            disabled={(isRemarkRequired && !remark) || (isReviewSubmission && !renderUrl.trim())}
            className="flex-1 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase disabled:opacity-30 shadow-neon-purple"
          >
            Confirm Transition
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LogWorkModal = ({ task, onClose, onLog }) => {
  const [minutes, setMinutes] = useState('');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[550] flex items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0a0a0f] border border-white/10 w-full max-w-sm rounded-[32px] p-8 shadow-2xl">
        <h3 className="text-xl font-bold mb-6 tracking-tight">Log Time: {task.key}</h3>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral/60 ml-1">Minutes</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:border-primary" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          <div className="flex gap-4 mt-8">
            <button onClick={onClose} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-neutral">Cancel</button>
            <button onClick={() => onLog(parseInt(minutes))} className="flex-1 py-4 bg-primary rounded-2xl text-xs font-black uppercase tracking-widest">Log</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NewTaskModal = ({ onClose, onSubmit, currentUser }) => {
  const [formData, setFormData] = useState({ title: '', client: 'Starlight Media', assignee: { name: currentUser?.name || 'Charlie Dev', id: currentUser?.id || '3', role: currentUser?.roleTier || 'Associate' }, priority: 'Medium', type: 'Task', epic: '', tags: [] });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[500] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#0a0a0f] border border-white/10 w-full max-w-2xl rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <h2 className="text-2xl font-black mb-8">Initialize Issue</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <CustomSelect label="Issue Type" value={formData.type} options={Object.keys(ISSUE_TYPES)} onChange={(val) => setFormData({...formData, type: val})} />
            <CustomSelect label="Priority" value={formData.priority} options={['Low', 'Medium', 'High', 'Urgent']} onChange={(val) => setFormData({...formData, priority: val})} />
          </div>
          <input type="text" placeholder="Summary" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-primary" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="flex gap-4 mt-10">
          <button onClick={onClose} className="flex-1 py-4 text-xs font-black uppercase text-neutral">Cancel</button>
          <button onClick={() => onSubmit(formData)} disabled={!formData.title} className="flex-1 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase">Create</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TaskDetailModal = ({ task, onClose, onStatusChange, onLogWork, onReopen, currentUser }) => {
  if (!task) return null;
  const TypeInfo = ISSUE_TYPES[task.type] || ISSUE_TYPES.Task;
  const Icon = TypeInfo.icon;
  const isDirectorPlus = ['Executive', 'Director'].includes(currentUser?.roleTier);
  const isAssignee = task.assignee?.id === currentUser?.id;
  const isFrozen = task.status === 'Review' && !isDirectorPlus;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-4 sm:p-6">
      <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-[#0a0a0f] border border-white/10 w-full max-w-5xl h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-[40px] flex flex-col overflow-hidden shadow-3xl relative">
        <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${TypeInfo.bg}`}><Icon className={`w-5 h-5 ${TypeInfo.color}`} /></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-primary tracking-widest">{task.key}</span>
                {isFrozen && <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1"><Clock className="w-2 h-2" /> Pending Approval</span>}
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">{task.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-neutral"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          <div className="flex-1 p-6 sm:p-8 space-y-8 border-r border-white/5">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Description</h3>
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-sm leading-relaxed text-neutral/80 min-h-[120px]">
                {task.title} for {task.client}. Responsibility: {task.assignee?.name || 'Unassigned'}. Reported by: {task.reporter?.name || 'System'}.
              </div>
            </section>

            {task.renderUrl && (
              <section className="bg-primary/10 border border-primary/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-primary flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span>Render / Draft Review Stream</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-purple-300 text-[9px] font-black uppercase">Review Required</span>
                </div>
                <p className="text-xs text-neutral/70 font-mono truncate">{task.renderUrl}</p>
                <a
                  href={task.renderUrl.startsWith('http') ? task.renderUrl : `https://${task.renderUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-neon-purple hover:opacity-90 transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Render Review Stream</span>
                </a>
              </section>
            )}

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center justify-between">Audit Trail <History className="w-3 h-3 opacity-40" /></h3>
              <div className="space-y-4">
                {task.activity?.map((act, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white/[0.01] rounded-[24px] border border-white/5 items-start">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[11px] font-black border border-white/10 shadow-lg shrink-0">{act.user.charAt(0)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-white/90">{act.user} <span className="text-primary font-black ml-1 uppercase text-[9px] tracking-widest">{act.action}</span></p>
                        <p className="text-[9px] text-neutral/30 font-bold uppercase tracking-widest">{act.time}</p>
                      </div>
                      {act.remark && (
                        <div className="mt-2 p-3 bg-white/5 rounded-xl border-l-2 border-primary/40 text-[11px] text-neutral/70 italic font-medium">
                          <MessageSquare className="w-3 h-3 mb-1 opacity-30" />
                          "{act.remark}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="w-full lg:w-80 bg-white/[0.01] p-6 sm:p-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral/40 ml-1">Current State</label>
                <div className={`p-4 rounded-2xl border bg-white/5 font-bold text-sm ${COLUMNS.find(c => c.id === task.status)?.color || 'text-neutral'}`}>
                  {task.status}
                </div>
              </div>
              {isDirectorPlus && task.status === 'Done' && (
                <button onClick={() => onReopen(task.id)} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary transition-all flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Reopen Issue
                </button>
              )}
              {((task.status === 'Review' && isDirectorPlus) || (task.status === 'In Progress' && (isAssignee || isDirectorPlus)) || (task.status === 'Backlog')) && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-neutral/40">Transition to:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {COLUMNS.map(col => {
                        const canMove = (task.status === 'Backlog' && col.id === 'In Progress') || (task.status === 'In Progress' && (col.id === 'Review' || col.id === 'Backlog')) || (task.status === 'Review' && isDirectorPlus && (col.id === 'Done' || col.id === 'In Progress'));
                        if (!canMove) return null;
                        return (
                          <button key={col.id} onClick={() => onStatusChange(task.id, col.id)} className={`p-4 rounded-2xl border border-white/10 font-bold text-xs hover:border-primary transition-all flex items-center justify-between ${col.color}`}>
                            {col.label} <ArrowRightCircle className="w-4 h-4" />
                          </button>
                        );
                    })}
                  </div>
                </div>
              )}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral/40 mb-2">Assignee</p>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary">{task.assignee?.name.charAt(0) || '?'}</div>
                  <p className="text-sm font-bold">{task.assignee?.name || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TaskCard = ({ task, isCompact, onClick, currentUser }) => {
  const isUrgent = task.priority === 'Urgent';
  const TypeInfo = ISSUE_TYPES[task.type] || ISSUE_TYPES.Task;
  const Icon = TypeInfo.icon;
  const isFrozen = task.status === 'Review' && currentUser?.roleTier === 'Associate';
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -4, border: '1px solid rgba(187, 134, 252, 0.3)' }} onClick={onClick} className={`bg-[#0a0a0f] border rounded-2xl cursor-pointer group transition-all duration-300 p-4 ${isUrgent ? 'border-red-500/20' : 'border-white/5'} ${isFrozen ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${TypeInfo.bg}`}><Icon className={`w-3 h-3 ${TypeInfo.color}`} /></div>
          <span className="text-[10px] font-black text-primary tracking-tighter">{task.key}</span>
        </div>
      </div>
      <h4 className="font-bold leading-snug group-hover:text-primary transition-colors text-sm mb-4">{task.title}</h4>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-black border border-white/10">{task.assignee?.name.charAt(0) || '?'}</div><span className="text-[9px] font-bold text-neutral/60">{task.assignee?.name || 'Unassigned'}</span></div>
        <span className={`text-[10px] font-black ${isUrgent ? 'text-red-400' : 'text-neutral/30'}`}>{isUrgent ? '!' : task.priority?.charAt(0) || 'M'}</span>
      </div>
    </motion.div>
  );
};

export const Worklogs = React.memo(function Worklogs() {
  const { role, roleDetails, canEditDepartment } = useAuth();
  const { currentUser } = useTeamStore();
  const isPM = role === ROLES.PROJECT_MANAGER;
  const canCreate = canEditDepartment(DEPARTMENT_TAGS.OPERATIONS_CREATIVE) && !isPM;

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [viewMode, setViewMode] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [loggingTask, setLoggingTask] = useState(null);
  const [transitioningTask, setTransitioningTask] = useState(null);

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.key.toLowerCase().includes(searchQuery.toLowerCase()) || task.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterMode === 'all' || (filterMode === 'mine' && task.assignee?.id === currentUser?.id) || (filterMode === 'urgent' && task.priority === 'Urgent');
    return matchesSearch && matchesFilter;
  }), [tasks, searchQuery, filterMode, currentUser]);

  const handleStatusChangeInitiated = (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) setTransitioningTask({ task, nextStatus: newStatus });
  };

  const handleTransitionConfirm = (nextStatus, remark, newAssignee, renderUrl) => {
    if (!transitioningTask) return;
    const taskId = transitioningTask.task.id;
    const activityEntry = { 
      user: currentUser?.name || 'Unknown', 
      action: `transitioned to ${nextStatus}`, 
      time: 'Just now', 
      remark: remark || null,
      renderUrl: renderUrl || null
    };
    setTasks(prev => prev.map(t => t.id === taskId ? { 
      ...t, 
      status: nextStatus, 
      assignee: newAssignee, 
      renderUrl: renderUrl || t.renderUrl,
      activity: [activityEntry, ...(t.activity || [])] 
    } : t));
    
    setTransitioningTask(null);
    setSelectedTask(null);
  };

  const handleReopen = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) setTransitioningTask({ task, nextStatus: 'In Progress' });
  };

  const handleLogTime = (taskId, minutes) => {
    const activityEntry = { user: currentUser?.name || 'Unknown', action: `logged ${minutes}m of work`, time: 'Just now' };
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, timeSpent: (t.timeSpent || 0) + minutes, activity: [activityEntry, ...(t.activity || [])] } : t));
    if (selectedTask?.id === taskId) setSelectedTask(prev => ({ ...prev, timeSpent: (prev.timeSpent || 0) + minutes, activity: [activityEntry, ...(prev.activity || [])] }));
    setLoggingTask(null);
  };

  const handleCreateTask = (newTask) => {
    const nextId = `GC-${100 + tasks.length + 1}`;
    setTasks(prev => [{ ...newTask, id: `t${Date.now()}`, key: nextId, status: 'Backlog', timeSpent: 0, reporter: { name: currentUser?.name || 'System', id: currentUser?.id, role: currentUser?.roleTier }, activity: [{ user: currentUser?.name || 'System', action: 'created issue', time: 'Just now' }] }, ...prev]);
    setIsNewTaskModalOpen(false);
  };

  const isRestrictedRole = role === 'Senior HR' || role === 'Junior HR' || role === 'Senior Accountant' || role === 'Junior Accountant';

  if (isRestrictedRole) {
    return (
      <div className="flex-1 bg-[#030305] text-white p-8 flex items-center justify-center font-urbanist select-none">
        <div className="max-w-md p-8 rounded-[36px] bg-[#0a0a0f] border border-white/10 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold">Access Restricted</h2>
          <p className="text-xs text-neutral/60">
            Worklog Kanban telemetry is restricted to creative, technical, and executive production teams. HR and Finance personnel should use Admin Control or Financials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#030305] text-white p-6 sm:p-10 font-urbanist overflow-hidden flex flex-col h-full relative">
      <AnimatePresence mode="wait">
        {isNewTaskModalOpen && <NewTaskModal key="new-task" onClose={() => setIsNewTaskModalOpen(false)} onSubmit={handleCreateTask} currentUser={currentUser} />}
        {selectedTask && <TaskDetailModal key="detail" task={selectedTask} onClose={() => setSelectedTask(null)} onStatusChange={handleStatusChangeInitiated} onLogWork={setLoggingTask} onReopen={handleReopen} currentUser={currentUser} />}
        {loggingTask && <LogWorkModal key="log-work" task={loggingTask} onClose={() => setLoggingTask(null)} onLog={(m) => handleLogTime(loggingTask.id, m)} />}
        {transitioningTask && <TransitionModal key="transition" task={transitioningTask.task} nextStatus={transitioningTask.nextStatus} onClose={() => setTransitioningTask(null)} onConfirm={handleTransitionConfirm} currentUser={currentUser} />}
      </AnimatePresence>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-fluid-3xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Worklogs</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleDetails?.badgeBg}`}>
              {isPM ? 'PM Scorecard Audit (Read-Only)' : 'Accountability Engine'}
            </span>
          </div>
          <p className="text-neutral text-xs font-bold uppercase tracking-widest opacity-60">
            {isPM ? 'Read-only departmental accountability & milestone telemetry' : 'Real-time production velocity & sprint logging'}
          </p>
        </div>
        {canCreate ? (
          <button onClick={() => setIsNewTaskModalOpen(true)} className="bg-primary text-white p-3 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20"><Plus className="w-4 h-4" /> <span>Create</span></button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-neutral/60 text-xs font-bold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{isPM ? 'PM Scorecard Mode' : 'View Only'}</span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar h-full">
          {COLUMNS.map(col => (
            <div key={col.id} className="w-80 flex flex-col h-full bg-white/[0.02] rounded-[32px] border border-white/5 p-4 shrink-0 transition-all">
              <div className="flex items-center justify-between mb-4 px-2"><h3 className="font-black text-[10px] uppercase tracking-widest text-neutral/40">{col.label}</h3><span className="bg-white/5 px-2 py-0.5 rounded-md text-[10px] text-primary font-black">{filteredTasks.filter(t => t.status === col.id).length}</span></div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">{filteredTasks.filter(t => t.status === col.id).map(task => (<TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} currentUser={currentUser} />))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
