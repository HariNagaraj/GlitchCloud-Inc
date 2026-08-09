import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium StatCard - Unified across the entire platform.
 * Follows the high-fidelity Dashboard design system.
 */
export const StatCard = React.memo(function StatCard({ 
  title, 
  value, 
  subValue, 
  icon: Icon, 
  isFeatured = false,
  decimal = "",
  change = "",
  isPositive = null
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className={`relative p-7 rounded-[32px] border border-white/5 backdrop-blur-xl flex flex-col h-auto min-h-[160px] overflow-hidden group transition-all hover:scale-[1.02] ${isFeatured ? 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] border-primary/20 shadow-[0_20px_50px_rgba(124,58,237,0.2)]' : 'bg-[#0a0a0f]/50'}`}
    >
      {!isFeatured && (
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${isFeatured ? 'bg-white/20' : 'bg-white/5 border border-white/10'}`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isFeatured ? 'text-white' : 'text-primary'}`} />
        </div>
        
        {isFeatured && (
          <div className="text-[9px] sm:text-[10px] font-black uppercase text-white/40 tracking-[0.3em] bg-white/5 px-3 py-1 rounded-full border border-white/5">Featured</div>
        )}
        
        {!isFeatured && change && (
          <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
            isPositive === true ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
            isPositive === false ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
            'bg-white/5 text-neutral/60 border-white/10'
          }`}>
            {isPositive === true && '↑ '}
            {isPositive === false && '↓ '}
            {change}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5 ${isFeatured ? 'text-white/60' : 'text-neutral'}`}>
          {title}
        </div>
        <div className="text-fluid-2xl sm:text-fluid-3xl font-black tracking-tight leading-none text-white flex items-baseline gap-0.5">
          {value}
          {decimal && <span className="text-[0.5em] opacity-40 font-bold">{decimal}</span>}
        </div>
      </div>

      {subValue && (
        <div className={`flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-4 ${isFeatured ? 'text-white/40' : 'text-white/20'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isFeatured ? 'bg-white' : 'bg-primary shadow-[0_0_8px_rgba(124,58,237,0.5)]'}`} />
          {subValue}
        </div>
      )}
    </motion.div>
  );
});
