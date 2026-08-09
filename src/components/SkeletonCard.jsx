import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between h-[220px]">
      <div className="flex items-start justify-between relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 animate-pulse" />
        <div className="w-20 h-6 rounded-full bg-white/5 animate-pulse" />
      </div>
      
      <div className="space-y-3">
        <div className="w-24 h-4 rounded-lg bg-white/5 animate-pulse" />
        <div className="w-40 h-10 rounded-xl bg-white/5 animate-pulse" />
      </div>

      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
      />
    </div>
  );
};
