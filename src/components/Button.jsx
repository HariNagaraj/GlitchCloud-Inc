import React from 'react';
import { motion } from 'framer-motion';

export function Button({ children, className = '', variant = 'primary', ...props }) {
  const baseStyle = "relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-[#8A6AE8] text-white shadow-glass-inner glow-primary hover:brightness-110",
    secondary: "bg-surface-bright text-on-surface hover:bg-surface-container-highest border border-white/5",
    outline: "bg-transparent border border-outline text-on-surface hover:bg-surface-container-low"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
