import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', noPadding = false, ...props }) {
  return (
    <motion.div
      className={`glass-panel rounded-2xl ${noPadding ? '' : 'p-[24px]'} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
