import { Settings, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export function TopNav({ currentPage, onNavigate }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'team', label: 'Team' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'configuration', label: 'Configuration' },
  ];

  return (
    <div className="w-full fixed top-0 left-0 pt-6 px-6 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/10 rounded-full h-16 flex items-center justify-between px-6 shadow-2xl pointer-events-auto"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-3 w-48">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-900 to-primary flex items-center justify-center p-[1px]">
             <div className="w-full h-full bg-[#0a0a0f] rounded-full overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/30 to-transparent" />
             </div>
          </div>
          <h1 className="text-base font-bold tracking-wide text-white leading-tight">GlitchCloud</h1>
        </div>

        {/* Center: Navigation Pills */}
        <div className="flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#1a1a24] text-white shadow-inner' 
                    : 'text-neutral hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Utility Icons */}
        <div className="flex items-center justify-end gap-3 w-48">
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-neutral hover:text-white flex items-center justify-center transition-colors border border-transparent">
            <Settings className="w-4 h-4" />
          </button>
          
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-neutral hover:text-white flex items-center justify-center transition-colors border border-transparent relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </button>
          
          <div className="w-9 h-9 rounded-full ml-1 overflow-hidden border border-white/10 cursor-pointer hover:opacity-80 transition-opacity bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            {/* Fallback to initials if no image */}
            <span className="text-xs font-bold text-white">GC</span>
          </div>
        </div>

      </motion.nav>
    </div>
  );
}
