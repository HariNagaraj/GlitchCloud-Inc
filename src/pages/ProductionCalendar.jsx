import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, Circle, MoreHorizontal } from 'lucide-react';

export function ProductionCalendar() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generating a 5x7 grid (35 cells)
  const gridCells = [];
  let dayCounter = 1;
  let nextMonthCounter = 1;
  for (let i = 0; i < 35; i++) {
    if (i < 31) {
      gridCells.push({ date: dayCounter++, isCurrentMonth: true });
    } else {
      gridCells.push({ date: nextMonthCounter++, isCurrentMonth: false });
    }
  }

  // Adding specific events based on the image
  gridCells[3].events = [{ label: 'Neon C...', type: 'purple' }];
  gridCells[9].isToday = true;
  gridCells[9].events = [{ label: 'Client R...', type: 'blue' }];
  gridCells[10].events = [
    { label: 'Final D...', type: 'red', icon: true },
    { label: 'Budget: ₹4,50,000', type: 'grey' }
  ];
  gridCells[11].events = [{ label: 'Launc...', type: 'red', icon: true }];

  return (
    <main className="flex-1 p-8 overflow-y-auto min-h-screen">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-[1500px] mx-auto flex gap-8 h-full"
      >
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col h-full min-h-[800px]">
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="text-[40px] font-bold tracking-tight text-white mb-2 leading-none">Production Calendar</h2>
              <p className="text-neutral text-[15px] font-medium leading-relaxed">
                October 2023 • Managed timeline for 12 active productions.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-[#12121A] border border-surface-border flex items-center justify-center text-neutral hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-6 py-2 h-10 rounded-full bg-[#12121A] border border-surface-border text-white text-sm font-semibold hover:bg-surface-hover transition-colors">
                Today
              </button>
              <button className="w-10 h-10 rounded-full bg-[#12121A] border border-surface-border flex items-center justify-center text-neutral hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid Container */}
          <div className="flex-1 bg-[#12121A] border border-surface-border rounded-3xl overflow-hidden flex flex-col">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-surface-border">
              {days.map(day => (
                <div key={day} className="text-center py-6 text-sm font-medium text-neutral">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-surface-border gap-[1px]">
              {gridCells.map((cell, i) => (
                <div 
                  key={i} 
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
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[380px] flex flex-col gap-6 h-full pt-14">
          
          {/* Pending Tasks */}
          <motion.div variants={itemVariants} className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-8 border border-t-white/10 border-l-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-lg font-semibold text-white tracking-wide">Pending Tasks</h3>
              <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold shadow-[0_0_10px_rgba(239,68,68,0.15)]">
                3 Urgent
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-red-500/20 bg-[#151114]">
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

          {/* Active Productions */}
          <motion.div variants={itemVariants} className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-8 border border-t-white/10 border-l-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex-1 overflow-hidden">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-lg font-semibold text-white tracking-wide">Active Productions</h3>
              <button className="text-neutral hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Production 1 */}
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

              {/* Production 2 */}
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

        </div>
      </motion.div>
    </main>
  );
}
