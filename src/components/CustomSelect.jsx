import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';

/**
 * CustomSelect - A premium glassmorphic dropdown component.
 * Used as the project-wide standard for all selection inputs.
 */
export const CustomSelect = React.memo(({ label, value, options, onChange, placeholder = "Select...", required, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMobile && containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const selectedOption = useMemo(() => {
    return options.find(opt => {
      const optValue = typeof opt === 'string' ? opt : opt.value;
      return optValue === value;
    });
  }, [options, value]);

  const displayLabel = useMemo(() => {
    if (!value) return placeholder;
    if (typeof selectedOption === 'string') return selectedOption;
    return selectedOption?.label || value;
  }, [value, selectedOption, placeholder]);

  const handleSelect = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const OptionsList = ({ mobile = false }) => (
    <div className={`${mobile ? 'space-y-2' : 'max-h-[240px] overflow-y-auto custom-scrollbar p-2'}`}>
      {options.map((opt, i) => {
        const optValue = typeof opt === 'string' ? opt : opt.value;
        const optLabel = typeof opt === 'string' ? opt : opt.label;
        const isSelected = optValue === value;

        return (
          <motion.div
            key={optValue}
            initial={mobile ? { opacity: 0, y: 10 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => handleSelect(optValue)}
            className={`px-5 py-4 rounded-2xl cursor-pointer text-sm font-bold transition-all flex items-center justify-between group ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-neutral hover:bg-white/10 hover:text-white border border-white/5'}`}
          >
            {optLabel}
            {isSelected && <Check className="w-4 h-4" />}
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className={`flex-1 relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-neutral/40 mb-2 ml-1">
          {label}
        </label>
      )}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border rounded-2xl py-3.5 px-5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] ${isOpen ? 'border-primary shadow-[0_0_20px_rgba(124,58,237,0.3)] bg-white/10' : 'border-white/10 hover:border-white/20'}`}
      >
        <span className={`text-sm font-bold ${!value ? 'text-neutral/40' : 'text-white'}`}>
          {displayLabel}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          <ChevronLeft className="w-4 h-4 text-neutral rotate-[-90deg]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          isMobile ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000]"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 bg-[#0a0a0f] border-t border-white/10 rounded-t-[32px] z-[1001] max-h-[70vh] overflow-hidden flex flex-col pb-safe p-6"
              >
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">{label || 'Select Option'}</h3>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral" onClick={() => setIsOpen(false)}>
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <OptionsList mobile />
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#0F0F1A] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-[20px] overflow-hidden z-[9999]"
            >
              <OptionsList />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
});
