import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Calendar, 
  Activity, 
  HeadphonesIcon, 
  LogOut, 
  MessageSquare, 
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen, 
  ShieldCheck, 
  UserCheck, 
  FileText,
  Lock,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';

const ALL_NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'team', icon: MessageSquare, label: 'Team Directory' },
  { id: 'analytics', icon: Activity, label: 'Analytics' },
  { id: 'calendar', icon: Calendar, label: 'Production Schedule' },
  { id: 'clients', icon: Users, label: 'Client Accounts' },
  { id: 'worklogs', icon: Activity, label: 'Worklogs & Sprint' },
  { id: 'financials', icon: Wallet, label: 'Financials' },
  { id: 'admin', icon: Settings, label: 'Admin Control' },
];

export const Sidebar = React.memo(function Sidebar({ currentPage = 'dashboard', onNavigate, isCollapsed, onToggle, isMobile }) {
  const { userProfile, roleDetails, canAccessNav, logout } = useAuth();

  // Dynamically filter tabs based on locked role permissions
  const visibleNavItems = ALL_NAV_ITEMS.filter(item => canAccessNav(item.id));

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobile && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[55]"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={isMobile ? { x: -280 } : false}
        animate={isMobile 
          ? { x: isCollapsed ? -280 : 0, width: 280 } 
          : { width: isCollapsed ? 100 : 280, x: 0 }
        }
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="h-screen fixed left-0 top-0 border-r border-white/5 bg-[#0a0a0f] flex flex-col py-8 px-4 z-[60] font-urbanist group pb-safe"
      >
        {/* Logo & Toggle Header */}
        <div className={`flex items-center mb-6 px-2 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-4 relative">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-black p-2 shrink-0">
              <img src={logo} alt="GlitchCloud Logo" className="w-full h-full object-contain" />
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col whitespace-nowrap"
                >
                  <h1 className="text-[22px] font-bold tracking-tight text-white leading-tight font-urbanist">GlitchCloud</h1>
                  <p className="text-[10px] text-neutral/60 font-black uppercase tracking-[0.2em]">Platform OS</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={onToggle}
              className={`p-1.5 rounded-lg border border-white/10 bg-[#12121A] hover:bg-white/10 text-neutral hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                isCollapsed 
                  ? 'absolute left-[calc(100%+12px)] translate-x-[-10px] group-hover:translate-x-0' 
                  : 'ml-4 translate-x-[-5px] group-hover:translate-x-0'
              }`}
            >
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`flex items-center py-3 transition-all text-sm font-medium relative group/item ${
                  isCollapsed ? 'rounded-xl justify-center w-12 mx-auto' : 'rounded-full px-4 gap-4'
                } ${
                  isActive 
                    ? 'bg-primary/20 text-white shadow-inner-purple' 
                    : 'text-neutral hover:text-white hover:bg-surface-hover'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-neutral group-hover/item:text-white'}`} strokeWidth={1.5} />
                
                <motion.span
                  animate={{ 
                    opacity: isCollapsed ? 0 : 1,
                    width: isCollapsed ? 0 : 'auto',
                    marginLeft: isCollapsed ? 0 : 16
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden whitespace-nowrap text-sm font-medium"
                >
                  {item.label}
                </motion.span>

                {isCollapsed && (
                  <div className="absolute left-[calc(100%+20px)] px-3 py-2 bg-[#12121A] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-x-0 translate-x-[-10px] transition-all duration-300 border border-white/10 whitespace-nowrap z-[100] shadow-2xl">
                    {item.label}
                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#12121A] border-l border-b border-white/10 rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Area with Profile & Logout */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* User Profile Summary */}
          <div 
            onClick={() => onNavigate && onNavigate('profile')}
            className={`rounded-full flex items-center group/item transition-all cursor-pointer ${
              isCollapsed ? 'justify-center w-12 h-12 mx-auto' : 'px-2 py-2 gap-3 border border-white/5 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className={`rounded-full flex items-center justify-center font-bold transition-all shrink-0 ${
              isCollapsed ? 'w-10 h-10 text-xs' : 'w-10 h-10 text-sm'
            } bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-primary`}>
              {(userProfile?.name || 'U').charAt(0)}
            </div>
            <motion.div 
              animate={{ 
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
                marginLeft: isCollapsed ? 0 : 12
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 min-w-0 pr-2 overflow-hidden whitespace-nowrap"
            >
              <p className="text-sm font-bold truncate text-white">
                {userProfile?.name || 'Employee User'}
              </p>
              <p className="text-[10px] text-neutral/60 font-medium uppercase tracking-widest truncate">
                {userProfile?.department || 'GlitchCloud Team'}
              </p>
            </motion.div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={logout}
            className={`flex items-center py-3 rounded-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-sm font-medium border border-transparent group/item relative ${
              isCollapsed ? 'justify-center w-12 mx-auto' : 'px-4 gap-4'
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <motion.span
              animate={{ 
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
                marginLeft: isCollapsed ? 0 : 16
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap text-sm font-medium"
            >
              Sign Out
            </motion.span>
          </button>
        </div>
      </motion.aside>
    </>
  );
});
