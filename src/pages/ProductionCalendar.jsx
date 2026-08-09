import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, Circle, MoreHorizontal, Plus, Lock, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENT_TAGS } from '../context/roleConstants';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export const ProductionCalendar = React.memo(function ProductionCalendar({ onNavigate }) {
  const { role, roleDetails, canEditDepartment } = useAuth();
  const canEdit = canEditDepartment(DEPARTMENT_TAGS.OPERATIONS_CREATIVE);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize grid cells to prevent regeneration on every render
  const gridCells = React.useMemo(() => {
    const cells = [];
    let dayCounter = 1;
    let nextMonthCounter = 1;
    for (let i = 0; i < 35; i++) {
      if (i < 31) {
        cells.push({ date: dayCounter++, isCurrentMonth: true });
      } else {
        cells.push({ date: nextMonthCounter++, isCurrentMonth: false });
      }
    }

    // Adding specific events
    cells[3].events = [{ label: 'Neon Campaign Edit', type: 'purple', time: '10:00 AM' }];
    cells[9].isToday = true;
    cells[9].events = [{ label: 'Client Review: Obsidian', type: 'blue', time: '2:30 PM' }];
    cells[10].events = [
      { label: 'Final Delivery: Midnight', type: 'red', icon: true, time: '11:00 AM' },
      { label: 'Budget Review', type: 'grey', time: '4:00 PM' }
    ];
    cells[11].events = [{ label: 'Launch Day', type: 'red', icon: true, time: '9:00 AM' }];

    return cells;
  }, []);

  // Extract all events for mobile agenda view
  const allEvents = React.useMemo(() => {
    return gridCells
      .filter(cell => cell.events && cell.events.length > 0)
      .map(cell => cell.events.map(evt => ({ ...evt, day: cell.date, isToday: cell.isToday })))
      .flat();
  }, [gridCells]);

  return (
    <main className="flex-1 p-6 sm:p-10 overflow-y-auto min-h-screen font-urbanist bg-[#030305] custom-scrollbar">
      <motion.div 
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 sm:gap-12"
      >
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6 md:gap-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-fluid-3xl font-black tracking-tighter text-white leading-[1.1]">Production Calendar</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleDetails?.badgeBg}`}>
                  {canEdit ? 'Full Edit Access' : 'Read-Only (Milestone Audit)'}
                </span>
              </div>
              <p className="text-neutral text-fluid-sm font-medium opacity-60">
                {canEdit 
                  ? 'October 2023 • Managed timeline for 12 active productions.' 
                  : 'Milestone completion logs for billing verification & accounting audit.'}
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral hover:text-white transition-all active:scale-95">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-4 sm:px-6 py-2.5 h-10 sm:h-11 rounded-2xl bg-white/5 border border-white/5 text-white text-xs sm:text-sm font-black hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap">
                Today
              </button>
              <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral hover:text-white transition-all active:scale-95">
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Add Event Button for Mobile/Tab Only */}
              {canEdit ? (
                <button 
                  onClick={() => console.log('[Calendar] Open Create Event Sheet')}
                  className="lg:hidden h-10 sm:h-11 px-4 sm:px-6 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 ml-1 flex-1"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-black whitespace-nowrap">Create Event</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-neutral/60 text-xs font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Read-Only</span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Calendar Grid */}
          {!isMobile ? (
            <div className="flex-1 bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] overflow-hidden flex flex-col backdrop-blur-xl shadow-2xl">
              {/* Days Header */}
              <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                {DAYS.map(day => (
                  <div key={day} className="text-center py-6 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-neutral/60">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Grid */}
              <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-white/5 gap-[1px]">
                {gridCells.map((cell, i) => (
                  <CalendarCell key={i} cell={cell} />
                ))}
              </div>
            </div>
          ) : (
            /* Mobile Agenda Card View */
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2 mb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral/60">October Agenda</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">4 Active Today</span>
              </div>
              
              <div className="space-y-4">
                {allEvents.map((evt, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`bg-white/[0.03] border border-white/5 rounded-[24px] p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-all active:scale-[0.98] ${evt.isToday ? 'border-primary/30 bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                        <span className="text-xs font-black text-neutral/40 uppercase">Oct</span>
                        <span className="text-lg font-black text-white leading-none">{evt.day}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            evt.type === 'purple' ? 'bg-primary' :
                            evt.type === 'blue' ? 'bg-blue-500' :
                            evt.type === 'red' ? 'bg-red-500' : 'bg-neutral-500'
                          } shadow-[0_0_8px_currentColor]`} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-neutral/40">{evt.time}</span>
                        </div>
                        <h4 className="font-bold text-white text-base tracking-tight">{evt.label}</h4>
                      </div>
                    </div>
                    
                    <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-neutral hover:text-white transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[400px] flex flex-col gap-8 lg:pt-24">
          <PendingTasks variants={ITEM_VARIANTS} />
          <ActiveProductions variants={ITEM_VARIANTS} />
        </div>
      </motion.div>
    </main>
  );
});

const CalendarCell = React.memo(function CalendarCell({ cell }) {
  return (
    <div 
      className={`bg-[#12121A] p-3 flex flex-col transition-colors relative ${
        cell.isToday ? 'bg-[#1E1E26]' : 'hover:bg-[#1A1A24]'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-sm font-medium ${cell.isToday ? 'text-white font-bold' : cell.isCurrentMonth ? 'text-white/80' : 'text-white/20'}`}>
          {cell.date}
        </span>
        {cell.isToday && (
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        )}
      </div>
      
      <div className="flex flex-col gap-1.5 mt-1">
        {cell.events && cell.events.map((evt, idx) => (
          <div 
            key={idx}
            className={`text-[10px] font-semibold tracking-wide px-2 py-1.5 rounded-full border flex items-center gap-1 w-max max-w-full overflow-hidden ${
              evt.type === 'purple' ? 'bg-primary/10 text-primary border-primary/30 shadow-[0_0_10px_rgba(187,134,252,0.15)]' :
              evt.type === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]' :
              evt.type === 'red' ? 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]' :
              'bg-white/5 text-neutral border-white/10'
            }`}
          >
            {evt.type === 'purple' && <div className="w-1 h-1 rounded-full bg-primary" />}
            {evt.type === 'blue' && <div className="w-1 h-1 rounded-full bg-blue-400" />}
            {evt.icon && evt.type === 'red' && <AlertCircle className="w-3 h-3 text-red-400" />}
            <span className="truncate">{evt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const PendingTasks = React.memo(function PendingTasks({ variants }) {
  return (
    <motion.div variants={variants} className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] p-7 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-lg font-semibold text-white tracking-wide">Pending Tasks</h3>
        <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold shadow-[0_0_10px_rgba(239,68,68,0.15)]">
          3 Urgent
        </div>
      </div>
      
      <div className="space-y-4">
        <div 
          onClick={() => onNavigate && onNavigate('configuration')}
          className="flex items-start gap-3 p-4 rounded-2xl border border-red-500/20 bg-[#151114] cursor-pointer hover:bg-red-500/10 transition-all"
        >
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shadow-neon-purple shrink-0" />
          <div>
            <h4 className="text-white text-sm font-semibold mb-1">Approve 'Midnight' VFX</h4>
            <p className="text-xs text-neutral">Due Today • ₹1,20,000 pending</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-surface-border hover:bg-surface-hover transition-colors cursor-pointer">
          <Circle className="w-5 h-5 text-neutral mt-0.5 shrink-0" />
          <div>
            <h4 className="text-white text-sm font-semibold mb-1">Scout location for Scene 4</h4>
            <p className="text-xs text-neutral">Due Tomorrow</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-2xl border border-surface-border hover:bg-surface-hover transition-colors cursor-pointer">
          <Circle className="w-5 h-5 text-neutral mt-0.5 shrink-0" />
          <div>
            <h4 className="text-white text-sm font-semibold mb-1">Finalize budget reallocation</h4>
            <p className="text-xs text-neutral">Due Oct 15 • ₹8,00,000 cap</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ActiveProductions = React.memo(function ActiveProductions({ variants }) {
  return (
    <motion.div variants={variants} className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] p-7 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex-1">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-lg font-semibold text-white tracking-wide">Active Productions</h3>
        <button className="text-neutral hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-primary text-[15px] font-semibold mb-1">Neon Genesis Campaign</h4>
          <div className="flex justify-between text-xs text-neutral mb-3">
            <span>Pre-production</span>
            <span className="text-white font-medium">45%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden mb-2">
            <div className="h-full w-[45%] bg-gradient-to-r from-primary to-purple-400 rounded-full shadow-[0_0_10px_rgba(187,134,252,0.5)]" />
          </div>
          <div className="flex justify-between text-[10px] text-neutral">
            <span>Est. Cost: ₹25,00,000</span>
            <span>End: Nov 12</span>
          </div>
        </div>

        <div>
          <h4 className="text-blue-400 text-[15px] font-semibold mb-1">Project Obsidian</h4>
          <div className="flex justify-between text-xs text-neutral mb-3">
            <span>Post-production</span>
            <span className="text-white font-medium">80%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden mb-2">
            <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
          <div className="flex justify-between text-[10px] text-neutral">
            <span>Est. Cost: ₹18,50,000</span>
            <span>End: Oct 18</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
