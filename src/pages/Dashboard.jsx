import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigStore } from '../store/useConfigStore';
import { useTeamStore } from '../store/useTeamStore';
import { useAuth } from '../context/AuthContext';
import { ROLES, MOCK_FIRESTORE_USERS } from '../context/roleConstants';
import {
  Target, Users, AlertCircle, TrendingUp,
  Video, Layers, Calendar, User, Clock, Plus, CheckCircle2, 
  FolderGit2, FileText, Sparkles, ShieldCheck, DollarSign, 
  CheckSquare, Activity, Award, ExternalLink, RotateCcw, ThumbsUp, ChevronDown, ChevronUp
} from 'lucide-react';
import { SkeletonCard } from '../components/SkeletonCard';
import { BottomSheet } from '../components/BottomSheet';
import { CustomSelect } from '../components/CustomSelect';
import { StatCard } from '../components/StatCard';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const Dashboard = React.memo(function Dashboard({ onNavigate }) {
  const { userProfile, role } = useAuth();
  const { clients, employees, productionStats } = useConfigStore();
  const [loading, setLoading] = useState(true);
  const [isTaskSheetOpen, setIsTaskSheetOpen] = useState(false);
  const [expandedEmployeeUid, setExpandedEmployeeUid] = useState(null);

  // Executive Role Security Access Check
  const isExecutive = role === 'Founder' || role === 'CEO' || role === 'COO' || role === 'Creative Head' || role === 'admin';
  const canViewFinancials = role === 'Founder' || role === 'CEO' || role === 'CFO' || role === 'admin' || role === 'finance';

  // Real-time task items & deliverables telemetry
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Color Grade & Export Summer Campaign Reel', status: 'In Progress', priority: 'High', date: 'Today, 5:00 PM', assignee: 'Charlie Editor' },
    { id: 't2', title: 'Review CGI 3D Pass for Beta Tech Teaser', status: 'Pending Review', priority: 'Medium', date: 'Tomorrow, 12:00 PM', assignee: 'Evan VFX' },
    { id: 't3', title: 'Sound Design & Audio Mix for Client Pitch', status: 'Completed', priority: 'Normal', date: 'Yesterday', assignee: 'Charlie Editor' },
  ]);

  // Employee Performance & Deliverable Data Collection
  const [performanceData, setPerformanceData] = useState([
    {
      uid: 'demo-editor-03',
      name: 'Charlie Editor',
      role: 'Senior Video Editor',
      department: 'Post-Production & VFX',
      assignedTasks: 20,
      completedTasks: 18,
      successRate: '90%',
      revisionRatio: '1.2 / project',
      velocityStatus: 'Ahead of Schedule',
      velocityColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      hoursLogged: 142,
      deliverables: [
        { id: 'd1', title: 'Summer Campaign Cut v3', format: '4K ProRes 422', status: 'Approved', renderUrl: 'https://frame.io/review/cut-v3', dept: 'Post-Production & VFX' },
        { id: 'd2', title: 'Midnight VFX Teaser Cut', format: 'MP4 H.265 1080p', status: 'In Review', renderUrl: 'https://drive.google.com/render-pass.mp4', dept: 'Post-Production & VFX' }
      ]
    },
    {
      uid: 'demo-vfx-05',
      name: 'Evan VFX',
      role: 'Senior VFX Artist',
      department: 'Post-Production & VFX',
      assignedTasks: 15,
      completedTasks: 14,
      successRate: '93%',
      revisionRatio: '0.8 / project',
      velocityStatus: 'On Track',
      velocityColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      hoursLogged: 156,
      deliverables: [
        { id: 'd3', title: '3D CGI Product Explosion Pass', format: 'EXR Sequence 8K', status: 'Approved', renderUrl: 'https://frame.io/review/cgi-v5', dept: 'Post-Production & VFX' }
      ]
    },
    {
      uid: 'demo-creative-02',
      name: 'Bob Lead',
      role: 'Creative Head',
      department: 'Operations & Production',
      assignedTasks: 18,
      completedTasks: 17,
      successRate: '94%',
      revisionRatio: '0.5 / project',
      velocityStatus: 'Ahead of Schedule',
      velocityColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      hoursLogged: 168,
      deliverables: [
        { id: 'd4', title: 'Brand Package Concept Deck', format: 'PDF Presentation', status: 'Approved', renderUrl: 'https://figma.com/deck-v1', dept: 'Creative Direction' }
      ]
    }
  ]);

  const [taskForm, setTaskForm] = useState({
    title: '',
    priority: 'High',
    date: '',
    assignedTo: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Toggle Task Status with Firestore sync fallback
  const handleToggleTaskStatus = async (taskId) => {
    const nextStatusMap = {
      'In Progress': 'Pending Review',
      'Pending Review': 'Completed',
      'Completed': 'In Progress'
    };

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: nextStatusMap[t.status] || 'Completed' };
      }
      return t;
    }));

    try {
      const taskRef = doc(db, 'worklogs', taskId);
      await updateDoc(taskRef, { updatedAt: new Date().toISOString() });
    } catch (e) {
      // Graceful fallback
    }
  };

  // Executive Action: Approve or Request Revision on Deliverable
  const handleDeliverableAction = (empUid, delivId, newStatus) => {
    setPerformanceData(prev => prev.map(emp => {
      if (emp.uid === empUid) {
        return {
          ...emp,
          deliverables: emp.deliverables.map(d => d.id === delivId ? { ...d, status: newStatus } : d)
        };
      }
      return emp;
    }));
  };

  // Calculate Global Executive & Regular Telemetry Metrics
  const metrics = useMemo(() => {
    if (canViewFinancials) {
      const totalProductionGoal = clients.reduce((acc, c) => acc + c.videosRequired + c.postersRequired, 0);
      const clockedIn = employees.filter(e => e.isClockedIn).length;
      const totalTeam = employees.length;
      const completedThisMonth = productionStats.monthlyHistory[productionStats.monthlyHistory.length - 1].completed;
      const productionGap = totalProductionGoal - completedThisMonth;
      const projectedRevenue = clients.reduce((acc, c) => acc + (c.status === 'Active' ? c.retainerValue : 0), 0);
      const completionPercentage = Math.round((completedThisMonth / totalProductionGoal) * 100);

      return {
        isFinancial: true,
        totalProductionGoal,
        clockedIn,
        totalTeam,
        productionGap,
        projectedRevenue,
        completionPercentage
      };
    } else {
      const assignedProjectsCount = userProfile?.assignedProjects?.length || 3;
      const myPendingTasks = tasks.filter(t => t.status !== 'Completed').length;
      const myCompletedItems = 14;
      const myProductivityScore = '96%';

      return {
        isFinancial: false,
        assignedProjectsCount,
        myPendingTasks,
        myCompletedItems,
        myProductivityScore
      };
    }
  }, [canViewFinancials, clients, employees, productionStats, userProfile, tasks]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="h-20 bg-white/5 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 lg:p-8 font-urbanist select-none">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a0f]/60 border border-white/5 p-6 rounded-[32px] backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome back, {userProfile?.name || 'Team Member'}
              </h1>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                {role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral/60 font-medium">
              {canViewFinancials
                ? 'Executive Agency Telemetry & Team Delivery Performance'
                : `Assigned Department: ${userProfile?.department || 'Operations'}`}
            </p>
          </div>

          <button
            onClick={() => setIsTaskSheetOpen(true)}
            className="px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-neon-purple hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        </header>

        {/* Telemetry Stat Cards */}
        {metrics.isFinancial ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              title="Monthly Projected Revenue"
              value={`₹${(metrics.projectedRevenue / 100000).toFixed(2)}L`}
              icon={DollarSign}
              trend="+14.2% vs last month"
              color="emerald"
            />
            <StatCard
              title="Monthly Production Target"
              value={`${metrics.totalProductionGoal}`}
              icon={Target}
              trend={`${metrics.completionPercentage}% Target Met`}
              color="purple"
            />
            <StatCard
              title="Team Attendance Telemetry"
              value={`${metrics.clockedIn} / ${metrics.totalTeam}`}
              icon={Users}
              trend="Live Presence Active"
              color="blue"
            />
            <StatCard
              title="Deliverable Production Gap"
              value={`${metrics.productionGap}`}
              icon={AlertCircle}
              trend="On Track for Monthly Goal"
              color="amber"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              title="Assigned Client Campaigns"
              value={`${metrics.assignedProjectsCount}`}
              icon={FolderGit2}
              trend="Assigned to your queue"
              color="purple"
            />
            <StatCard
              title="Pending Production Tasks"
              value={`${metrics.myPendingTasks}`}
              icon={Clock}
              trend="Sprint deliverables"
              color="amber"
            />
            <StatCard
              title="Completed Monthly Deliverables"
              value={`${metrics.myCompletedItems}`}
              icon={CheckCircle2}
              trend="Approved by Lead"
              color="emerald"
            />
            <StatCard
              title="Personal Productivity Score"
              value={metrics.myProductivityScore}
              icon={TrendingUp}
              trend="Top 5% Velocity"
              color="blue"
            />
          </div>
        )}

        {/* EXECUTIVE MODULE: Employee Performance & Deliverable Telemetry */}
        {isExecutive && (
          <section className="bg-[#0a0a0f]/60 border border-white/5 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>Employee Performance & Deliverable Telemetry</span>
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                    Executive Suite
                  </span>
                </div>
                <p className="text-xs text-neutral/50">
                  Granular deliverable success rates, revision ratios, on-time velocity, and billable production hours.
                </p>
              </div>
            </div>

            {/* Performance Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {performanceData.map((emp) => (
                <div
                  key={emp.uid}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">{emp.name}</h3>
                      <p className="text-[11px] text-primary font-medium">{emp.role}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${emp.velocityColor}`}>
                      {emp.velocityStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-[10px] font-black uppercase text-neutral/50 mb-1">Completion Rate</div>
                      <div className="text-sm font-bold text-emerald-400">{emp.completedTasks}/{emp.assignedTasks} ({emp.successRate})</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-[10px] font-black uppercase text-neutral/50 mb-1">Revision Ratio</div>
                      <div className="text-sm font-bold text-purple-300">{emp.revisionRatio}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 col-span-2 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase text-neutral/50 mb-1">Billable Hours Logged</div>
                        <div className="text-sm font-bold text-white">{emp.hoursLogged} hrs this month</div>
                      </div>
                      <Clock className="w-4 h-4 text-neutral/40" />
                    </div>
                  </div>

                  {/* Expand Deliverable Outcome Log Button */}
                  <button
                    onClick={() => setExpandedEmployeeUid(expandedEmployeeUid === emp.uid ? null : emp.uid)}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-neutral hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{expandedEmployeeUid === emp.uid ? 'Hide Deliverable Logs' : 'View Deliverables Log'}</span>
                    {expandedEmployeeUid === emp.uid ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Expandable Deliverables Log */}
                  <AnimatePresence>
                    {expandedEmployeeUid === emp.uid && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-3 border-t border-white/10"
                      >
                        {emp.deliverables.map((deliv) => (
                          <div key={deliv.id} className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-white">{deliv.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                deliv.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                              }`}>
                                {deliv.status}
                              </span>
                            </div>
                            <div className="text-[10px] text-neutral/50 font-mono">{deliv.format} • {deliv.dept}</div>

                            <div className="flex items-center justify-between pt-1">
                              <a
                                href={deliv.renderUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" /> Open Render
                              </a>

                              <div className="flex gap-1">
                                {deliv.status !== 'Approved' && (
                                  <button
                                    onClick={() => handleDeliverableAction(emp.uid, deliv.id, 'Approved')}
                                    className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                                  >
                                    <ThumbsUp className="w-2.5 h-2.5" /> Approve
                                  </button>
                                )}
                                {deliv.status !== 'Revision Requested' && (
                                  <button
                                    onClick={() => handleDeliverableAction(emp.uid, deliv.id, 'Revision Requested')}
                                    className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold hover:bg-rose-500/30 transition-all flex items-center gap-1"
                                  >
                                    <RotateCcw className="w-2.5 h-2.5" /> Request Revision
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Worklog & Tasks Real-Time Pipeline */}
        <section className="bg-[#0a0a0f]/60 border border-white/5 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                <span>Active Worklog Tasks & Sprint Status</span>
              </h2>
              <p className="text-xs text-neutral/50">Click any task badge to cycle status in real-time.</p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('worklogs')}
                className="text-xs font-bold text-primary hover:underline"
              >
                View Full Worklogs →
              </button>
            )}
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <motion.div
                key={task.id}
                variants={itemVariants}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-all"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{task.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-neutral/50 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {task.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">{task.priority} Priority</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleTaskStatus(task.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all self-start sm:self-auto ${
                    task.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                      : task.status === 'Pending Review'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20'
                  }`}
                >
                  {task.status}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Create Task Bottom Sheet Modal */}
        <BottomSheet
          isOpen={isTaskSheetOpen}
          onClose={() => setIsTaskSheetOpen(false)}
          title="Create New Sprint Task"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (taskForm.title) {
                setTasks(prev => [{ id: `t_${Date.now()}`, title: taskForm.title, status: 'In Progress', priority: taskForm.priority, date: 'Today' }, ...prev]);
                setTaskForm({ title: '', priority: 'High', date: '', assignedTo: '' });
                setIsTaskSheetOpen(false);
              }
            }}
            className="space-y-4 pt-2"
          >
            <div>
              <label className="block text-[10px] font-black uppercase text-neutral/60 mb-2">Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Render 4K Visual Effects Sequence"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary"
              />
            </div>
            <div>
              <CustomSelect
                label="Priority Level"
                value={taskForm.priority}
                options={['High', 'Medium', 'Normal']}
                onChange={(val) => setTaskForm({ ...taskForm, priority: val })}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-neon-purple mt-4 hover:opacity-90 transition-all"
            >
              Add Task to Sprint
            </button>
          </form>
        </BottomSheet>

      </motion.div>
    </main>
  );
});
