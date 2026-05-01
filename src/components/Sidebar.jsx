import React from 'react';
import { LayoutDashboard, Wallet, Users, Calendar, Video, Activity, HeadphonesIcon, LogOut, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export function Sidebar({ currentPage = 'financials', onNavigate }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'financials', icon: Wallet, label: 'Financials' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'production', icon: Video, label: 'Production' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'team', icon: MessageSquare, label: 'Team' },
  ];

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-[260px] h-screen fixed left-0 top-0 border-r border-surface-border bg-[#0a0a0f] flex flex-col py-8 px-6 z-50"
    >
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-900 to-primary flex items-center justify-center p-[1px]">
           <div className="w-full h-full bg-[#0a0a0f] rounded-full overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/30 to-transparent" />
           </div>
        </div>
        <div>
          <h1 className="text-[16px] font-bold tracking-wide text-white leading-tight">GlitchCloud</h1>
          <p className="text-[10px] text-neutral">Management Suite</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={index}
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all text-sm font-medium ${
                isActive 
                  ? 'bg-primary-dim border border-primary/50 text-white shadow-inner-purple' 
                  : 'text-neutral hover:text-white hover:bg-surface-hover border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-neutral'}`} strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 mt-auto">
        <button className="flex items-center gap-4 px-4 py-3 rounded-full text-neutral hover:text-white hover:bg-surface-hover transition-all text-sm font-medium border border-transparent">
          <HeadphonesIcon className="w-5 h-5" strokeWidth={1.5} />
          <span>Support</span>
        </button>
        <button className="flex items-center gap-4 px-4 py-3 rounded-full text-neutral hover:text-white hover:bg-surface-hover transition-all text-sm font-medium border border-transparent">
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
