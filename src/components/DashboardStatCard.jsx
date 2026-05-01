import React from 'react';
import { motion } from 'framer-motion';

export function DashboardStatCard({ title, value, icon: Icon, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-7 flex flex-col justify-between h-[220px] overflow-hidden border border-t-white/10 border-l-white/10 shadow-[0_0_40px_rgba(187,134,252,0.12),0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-start justify-between relative z-10">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-[inset_0_1px_4px_rgba(187,134,252,0.2)]">
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="mt-1 flex items-center gap-2 text-[13px] font-semibold tracking-wide">
          {trend.includes('%') ? (
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_1px_2px_rgba(187,134,252,0.2)]">
              {trend}
            </span>
          ) : (
            <div className="flex items-center gap-2 text-neutral/60">
              <span className="w-2 h-2 rounded-full bg-neutral/40 shadow-[0_0_8px_rgba(148,163,184,0.4)]"></span>
              {trend}
            </div>
          )}
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-neutral text-[15px] font-medium mb-1.5">{title}</h3>
        <div className="text-[38px] font-bold text-white tracking-tight leading-none">
          {value}
        </div>
      </div>
    </motion.div>
  );
}
