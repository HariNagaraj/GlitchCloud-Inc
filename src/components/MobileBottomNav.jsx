import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Wallet, Users, Calendar, Settings, MessageSquare, Activity, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'team', icon: MessageSquare, label: 'Team' },
  { id: 'analytics', icon: Activity, label: 'Analytics' },
  { id: 'worklogs', icon: Activity, label: 'Logs' },
  { id: 'financials', icon: Wallet, label: 'Finance' },
  { id: 'admin', icon: Settings, label: 'Admin' },
];

export const MobileBottomNav = React.memo(({ currentPage, onNavigate }) => {
  const { canAccessNav } = useAuth();
  const visibleNavItems = NAV_ITEMS.filter(item => canAccessNav(item.id));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#0a0a0f]/80 backdrop-blur-2xl border-t border-white/5 z-[100] flex items-center justify-around px-2 pb-safe">
      {visibleNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center justify-center gap-1.5 flex-1 relative py-2"
          >
            {isActive && (
              <motion.div 
                layoutId="activeNav"
                className="absolute inset-x-1 inset-y-0.5 bg-primary/10 rounded-[20px]"
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />
            )}
            <Icon 
              className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-neutral opacity-50'}`} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-primary' : 'text-neutral/40'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});
