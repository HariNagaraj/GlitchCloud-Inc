import React from 'react';
import { motion } from 'framer-motion';

export function StatCard({ title, value, decimal, change, changeType, icon: Icon, variant = 'default' }) {
  // Variants: primary (purple), default (grey), warning (yellow)
  
  const styles = {
    primary: {
      card: 'shadow-[0_0_40px_rgba(187,134,252,0.12)] border-primary/20',
      iconContainer: 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_1px_4px_rgba(187,134,252,0.2)]',
      badge: 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_1px_2px_rgba(187,134,252,0.2)]',
      badgeText: change
    },
    default: {
      card: 'border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]',
      iconContainer: 'bg-white/5 text-neutral border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]',
      badge: 'bg-white/5 text-neutral border border-white/10',
      badgeText: change
    },
    warning: {
      card: 'border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]',
      iconContainer: 'bg-warning/10 text-warning border border-warning/20 shadow-[inset_0_1px_4px_rgba(245,158,11,0.2)]',
      badge: 'bg-transparent text-warning text-sm font-semibold flex items-center gap-2',
      badgeText: (
        <>
          <span className="w-2 h-2 rounded-full bg-warning shadow-neon-yellow"></span>
          {change}
        </>
      ),
      leftGlow: true
    }
  };

  const currentStyle = styles[variant];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-7 flex flex-col justify-between h-[220px] overflow-hidden border border-t-white/10 border-l-white/10 ${currentStyle.card}`}
    >
      {currentStyle.leftGlow && (
        <div className="absolute left-0 top-6 bottom-6 w-1 bg-warning shadow-[0_0_20px_4px_rgba(245,158,11,0.5)] rounded-r-full" />
      )}
      
      <div className="flex items-start justify-between relative z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStyle.iconContainer}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        {variant === 'warning' ? (
          <div className={currentStyle.badge}>
            {currentStyle.badgeText}
          </div>
        ) : (
          <div className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${currentStyle.badge}`}>
            {currentStyle.badgeText}
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-neutral text-[15px] font-medium mb-1.5">{title}</h3>
        <div className="text-[38px] font-bold text-white flex items-baseline gap-1 tracking-tight">
          {value}
          <span className="text-neutral dark text-[22px] font-medium">{decimal}</span>
        </div>
      </div>
    </motion.div>
  );
}
