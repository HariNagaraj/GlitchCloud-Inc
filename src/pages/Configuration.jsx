import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Briefcase, Shield, Layers, DollarSign, Database, 
  Plus, Search, Edit2, Trash2, CheckCircle2, ChevronRight,
  Sparkles, Lock, ShieldAlert, Sliders, ChevronLeft, ArrowRight, UserPlus
} from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import { BottomSheet } from '../components/BottomSheet';
import { CustomSelect } from '../components/CustomSelect';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROLE_HIERARCHY, ROLE_DETAILS, canUserModifyTargetRole } from '../context/roleConstants';

import { UserManagement } from '../components/UserManagement';

// === CONFIG SCHEMAS ===
const TOPIC_SCHEMAS = {
  employees: { 
    title: 'Employee', 
    fields: [
      { name: 'name', label: 'Full Name', type: 'text' },
      { name: 'role', label: 'Corporate Role', type: 'select', options: ['Founder', 'CEO', 'CFO', 'COO', 'Creative Head', 'Senior HR', 'Senior Video Editor', 'Senior Graphic Designer', 'Senior VFX Artist', 'Senior Accountant'] },
      { name: 'department', label: 'Department', type: 'text' },
      { name: 'isClockedIn', label: 'Attendance Telemetry', type: 'checkbox' }
    ]
  },
  clients: { 
    title: 'Client', 
    fields: [
      { name: 'name', label: 'Client Brand Name', type: 'text' },
      { name: 'tier', label: 'Service Level Tier', type: 'select', options: ['Standard Retainer', 'Premium Agency', 'Enterprise Dedicated'] },
      { name: 'retainerValue', label: 'Monthly Retainer (₹)', type: 'number' },
      { name: 'status', label: 'Contract Status', type: 'select', options: ['Active', 'Paused', 'Archived'] }
    ]
  },
  departments: { 
    title: 'Department', 
    fields: [
      { name: 'name', label: 'Department Title', type: 'text' },
      { name: 'lead', label: 'Department Head Lead', type: 'text' },
      { name: 'quota', label: 'Monthly Quota Allocation', type: 'number' }
    ]
  },
  roles: { 
    title: 'Role Tier', 
    fields: [
      { name: 'tierName', label: 'Role Title', type: 'text' },
      { name: 'scope', label: 'Access Control Scope', type: 'text' }
    ]
  }
};

// === MANAGE TOPIC VIEW ===
const ManageTopicView = React.memo(function ManageTopicView({ topic, onBack, config, currentActorRole, onOpenOnboarding }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [securityNotice, setSecurityNotice] = useState('');

  const schema = TOPIC_SCHEMAS[topic];
  
  const getItems = () => {
    switch(topic) {
      case 'employees': return config.employees;
      case 'clients': return config.clients;
      case 'departments': return config.departments;
      case 'roles': return config.roles;
      default: return [];
    }
  };

  const items = getItems();

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const val = (item.name || item.tierName || '').toLowerCase();
      return val.includes(searchTerm.toLowerCase());
    });
  }, [items, searchTerm]);

  const handleCreate = () => {
    if (topic === 'employees') {
      onOpenOnboarding();
      return;
    }
    setSecurityNotice('');
    setModalMode('create');
    setActiveItem(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (item) => {
    if (topic === 'employees' && item.role) {
      const actorRank = ROLE_HIERARCHY[currentActorRole] || 0;
      const targetRank = ROLE_HIERARCHY[item.role] || 0;

      if (targetRank >= actorRank && currentActorRole !== 'Founder' && currentActorRole !== 'admin') {
        setSecurityNotice(`Security Enforcement: You are not authorized to edit ${item.name} (${ROLE_DETAILS[item.role]?.title || item.role}). Higher role details are locked.`);
        return;
      }
    }
    setSecurityNotice('');
    setModalMode('edit');
    setActiveItem(item);
    setIsSheetOpen(true);
  };

  const handleDelete = (id) => {
    const item = items.find(i => i.id === id);
    if (topic === 'employees' && item && item.role) {
      const actorRank = ROLE_HIERARCHY[currentActorRole] || 0;
      const targetRank = ROLE_HIERARCHY[item.role] || 0;

      if (targetRank >= actorRank && currentActorRole !== 'Founder' && currentActorRole !== 'admin') {
        setSecurityNotice(`Security Enforcement: Cannot edit member with equal or higher role rank (${item.name}).`);
        return;
      }
    }

    const actionName = `delete${schema.title}`;
    if (typeof config[actionName] === 'function') {
      config[actionName](id);
    }
  };

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const actionName = `add${schema.title}`;
      if (typeof config[actionName] === 'function') {
        config[actionName](formData);
      }
    } else if (modalMode === 'edit') {
      const actionName = `update${schema.title}`;
      if (typeof config[actionName] === 'function') {
        config[actionName](activeItem.id, formData);
      }
    }
    setIsSheetOpen(false);
  };

  return (
    <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#030305] font-urbanist custom-scrollbar pb-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-8 md:gap-0">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
            <button onClick={onBack} className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-neutral hover:text-white transition-all active:scale-90 shrink-0">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-fluid-3xl font-black tracking-tighter text-white leading-[1.1] truncate">{schema.title}s Management</h1>
              <p className="text-neutral text-fluid-sm font-medium opacity-60">Admin Control Panel • Corporate Governance Mode.</p>
            </div>
          </div>
          <button onClick={handleCreate} className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl text-sm font-black shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 whitespace-nowrap">
            <Plus className="w-5 h-5" />
            Add New {schema.title}
          </button>
        </div>

        {securityNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{securityNotice}</span>
          </div>
        )}

        <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl">
           <div className="p-6 sm:p-8 border-b border-white/5">
              <div className="relative max-w-md">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
                <input 
                  type="text" 
                  placeholder={`Search ${topic}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-white placeholder:text-neutral/40 outline-none focus:border-primary/50 transition-all"
                />
              </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/5 bg-white/[0.01]">
                   <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Entity Record</th>
                   <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Role / Tier Scope</th>
                   <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Status Telemetry</th>
                   <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm">
                 {filteredItems.map(item => {
                   const titleVal = item.name || item.tierName || 'Unnamed Record';
                   const roleVal = item.role || item.tier || item.lead || 'N/A';
                   const statusVal = item.isClockedIn !== undefined ? (item.isClockedIn ? 'Online' : 'Offline') : (item.status || 'Active');
                   const targetRank = item.role ? (ROLE_HIERARCHY[item.role] || 0) : 0;
                   const actorRank = ROLE_HIERARCHY[currentActorRole] || 0;
                   const isLocked = topic === 'employees' && targetRank >= actorRank && currentActorRole !== 'Founder' && currentActorRole !== 'admin';

                   return (
                     <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="p-6 font-bold text-white flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black text-xs">
                           {titleVal.charAt(0)}
                         </div>
                         <span>{titleVal}</span>
                       </td>
                       <td className="p-6">
                         <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral">
                           {roleVal}
                         </span>
                       </td>
                       <td className="p-6">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                           statusVal === 'Online' || statusVal === 'Active' 
                             ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                             : 'bg-white/5 text-neutral/60 border border-white/10'
                         }`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${statusVal === 'Online' || statusVal === 'Active' ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
                           {statusVal}
                         </span>
                       </td>
                       <td className="p-6 text-right space-x-2">
                         {isLocked ? (
                           <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                             Locked Higher Role
                           </span>
                         ) : (
                           <>
                             <button onClick={() => handleEdit(item)} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-neutral hover:text-white transition-all">
                               <Edit2 className="w-4 h-4" />
                             </button>
                             <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-400 transition-all">
                               <Trash2 className="w-4 h-4" />
                             </button>
                           </>
                         )}
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </main>
  );
});

// === MAIN CONFIGURATION EXPORT ===
export function Configuration({ initialTopic = null }) {
  const { role } = useAuth();
  const config = useConfigStore();
  const [activeTopic, setActiveTopic] = useState(initialTopic);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useEffect(() => {
    setActiveTopic(initialTopic);
  }, [initialTopic]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  if (activeTopic) {
    return (
      <>
        <UserManagement isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />
        <ManageTopicView 
          topic={activeTopic} 
          onBack={() => setActiveTopic(null)} 
          config={config} 
          currentActorRole={role} 
          onOpenOnboarding={() => setIsUserModalOpen(true)}
        />
      </>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#030305] font-urbanist custom-scrollbar pb-32 select-none">
      <UserManagement isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-[1200px] mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-fluid-3xl font-black tracking-tighter leading-none">Admin Control Panel</h1>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold">
                Admin Exclusive
              </span>
            </div>
            <p className="text-neutral text-fluid-sm font-medium opacity-60">Manage employee accounts, client retainers, departmental structures, and role permissions.</p>
          </div>

          {(role === 'Founder' || role === 'CEO' || role === 'Senior HR' || role === 'admin') && (
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-neon-purple hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <UserPlus className="w-4 h-4" />
              <span>Onboard New Employee</span>
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ConfigCard 
            title="Employee Directory" desc="Manage staff, roles, and status." icon={Users} count={config.employees.length}
            onClick={() => setActiveTopic('employees')} active={config.configToggles.employees} onToggle={() => config.toggleConfig('employees')}
          />
          <ConfigCard 
            title="Client Portfolio" desc="Define quotas and financial retainers." icon={Briefcase} count={config.clients.length}
            onClick={() => setActiveTopic('clients')} active={config.configToggles.clients} onToggle={() => config.toggleConfig('clients')}
          />
          <ConfigCard 
            title="Departmental Hierarchy" desc="Organize agency teams and structures." icon={Layers} count={config.departments.length}
            onClick={() => setActiveTopic('departments')} active={config.configToggles.departments} onToggle={() => config.toggleConfig('departments')}
          />
          <ConfigCard 
            title="Role & Permissions" desc="Configure security tiers and access levels." icon={Shield} count={config.roles.length}
            onClick={() => setActiveTopic('roles')} active={config.configToggles.roles} onToggle={() => config.toggleConfig('roles')}
          />
          <ConfigCard title="Financial Settings" desc="Global billing and retainer rules." icon={DollarSign} onClick={() => {}} active={config.configToggles.finance} onToggle={() => config.toggleConfig('finance')} />
          <ConfigCard title="System Operations" desc="Configure global automation and rules." icon={Database} onClick={() => {}} active={config.configToggles.systemRules} onToggle={() => config.toggleConfig('systemRules')} />
        </div>
      </motion.div>
    </main>
  );
}

function ConfigCard({ title, desc, icon: Icon, count, onClick, active, onToggle }) {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className={`group relative p-8 rounded-[32px] border transition-all duration-500 cursor-pointer overflow-hidden ${active ? 'bg-[#0a0a0f]/50 border-white/5 hover:border-primary/50 hover:bg-[#0a0a0f]' : 'bg-black/20 border-white/5 opacity-60 grayscale'}`}
      onClick={active ? onClick : undefined}
    >
      <div className="absolute top-0 right-0 p-6" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
        <div className={`w-10 h-5 rounded-full transition-colors relative ${active ? 'bg-primary' : 'bg-white/10'}`}>
           <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${active ? 'left-6' : 'left-1'}`} />
        </div>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${active ? 'bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white' : 'bg-white/5 text-neutral'}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">{title} {count !== undefined && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-neutral-400">{count}</span>}</h3>
      <p className="text-sm text-neutral leading-relaxed">{desc}</p>
      {active && <div className="mt-8 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">MANAGE STRUCTURE <ChevronRight className="w-4 h-4 ml-1" /></div>}
    </motion.div>
  );
}
