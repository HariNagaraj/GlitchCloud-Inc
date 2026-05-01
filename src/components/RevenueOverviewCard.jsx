import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

export function RevenueOverviewCard() {
  const bars = [30, 45, 60, 100];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-7 flex flex-col justify-between h-[220px] overflow-hidden border border-t-white/10 border-l-white/10 shadow-[0_0_40px_rgba(187,134,252,0.12),0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-start justify-between relative z-10">
        <div>
          <h3 className="text-[15px] font-medium text-neutral tracking-wide">Revenue Overview</h3>
          <p className="text-white text-xs font-semibold mt-1 uppercase tracking-widest opacity-80">Q3 Performance</p>
        </div>
        <button className="text-neutral hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-end justify-between gap-3 relative z-10">
        <div className="text-[32px] font-bold text-white tracking-tight leading-none">
          $428.5k
        </div>
        <div className="flex items-end gap-1.5 h-12 w-24">
          {bars.map((height, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-sm relative overflow-hidden transition-all duration-500 ${i === 3 ? 'bg-[#BB86FC] shadow-[0_0_15px_rgba(187,134,252,0.4)]' : 'bg-white/5'}`}
              style={{ height: `${height}%` }}
            >
              {i === 3 && (
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
