import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const BottomSheet = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Popup/Sheet Container */}
          <motion.div
            initial={{ y: '20%', opacity: 0, scale: 0.95 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                damping: 25,
                stiffness: 400,
                opacity: { duration: 0.2 }
              }
            }}
            exit={{
              y: '20%',
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2 }
            }}
            className="relative w-full sm:max-w-2xl bg-[#0a0a0f] sm:bg-[#0a0a0f]/80 sm:backdrop-blur-2xl border-t sm:border border-white/10 rounded-t-[32px] sm:rounded-[40px] z-[101] max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col pb-safe sm:pb-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]"
          >
            {/* Header Gradient Glow (Desktop Only) */}
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none hidden sm:block" />

            {/* Drag Handle (Mobile only) */}
            <div className="w-full flex justify-center p-4 sm:hidden relative z-10">
              <div className="w-12 h-1.5 bg-white/10 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-6 sm:pt-10 pb-6 relative z-10">
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-medium opacity-60">Enter the required organizational parameters.</p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral hover:text-white hover:bg-white/10 transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar relative z-10">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
