import React from 'react';
import { MoreHorizontal, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function ImpendingCard({ type = 'upcoming', title, time }) {
  const isUrgent = type === 'urgent';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-[#12121A] rounded-2xl p-5 border flex flex-col relative overflow-hidden ${
        isUrgent ? 'border-red-900/30' : 'border-surface-border'
      }`}
    >
      {/* Left glowing edge for urgent */}
      {isUrgent && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_20px_4px_rgba(220,38,38,0.6)] rounded-l-2xl" />
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
          isUrgent 
            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
            : 'bg-warning-dim text-warning border-warning/20'
        }`}>
          {isUrgent ? 'DUE IN 24H' : 'UPCOMING'}
        </div>
        <button className="text-neutral hover:text-white transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="text-white font-semibold text-base mb-3 leading-tight pr-4">
        {title}
      </h3>
      
      <div className="flex items-center gap-2 text-neutral text-xs font-medium">
        <Clock className="w-3.5 h-3.5" />
        <span>{time}</span>
      </div>
    </motion.div>
  );
}
