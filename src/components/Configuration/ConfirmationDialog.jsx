import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export const ConfirmationDialog = React.memo(({ title, message, onConfirm, onCancel }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-lg"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="w-full max-w-md bg-[#12121A] border border-red-500/20 rounded-[40px] p-10 text-center shadow-2xl"
    >
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-neutral mb-8">{message}</p>
      
      <div className="flex flex-col gap-3">
        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-red-500 text-white rounded-full text-sm font-bold tracking-widest uppercase shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all transform hover:scale-[1.02]"
        >
          Yes, Delete Record
        </button>
        <button 
          onClick={onCancel}
          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold tracking-widest uppercase transition-all"
        >
          Nevermind, Cancel
        </button>
      </div>
    </motion.div>
  </motion.div>
));
