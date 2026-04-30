import React from 'react';
import { LayoutDashboard, Users, Calendar, BarChart3, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Client Management' },
  { icon: Calendar, label: 'Production Calendar' },
  { icon: BarChart3, label: 'Financials' },
];

export function Sidebar() {
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-[280px] h-screen fixed left-0 top-0 border-r border-white/5 bg-background flex flex-col p-6 z-50"
    >
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#8A6AE8] shadow-neon-primary flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <h1 className="text-xl font-bold tracking-heading">GlitchCloud</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-primary/10 text-primary shadow-glass-inner border border-primary/20' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50 transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-semibold text-sm">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-error hover:bg-error/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Log Out</span>
        </button>
      </div>
    </motion.aside>
  );
}
