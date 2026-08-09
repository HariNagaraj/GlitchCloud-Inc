import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';

export const CustomSelect = React.memo(({ label, value, options, onChange, placeholder, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => 
    (typeof opt === 'string' ? opt : opt.value) === value
  );

  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 min-w-[200px] relative" ref={containerRef}>
      <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">{label}</label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border rounded-2xl py-4 px-6 flex items-center justify-between cursor-pointer transition-all ${isOpen ? 'border-primary shadow-[0_0_15px_rgba(124,58,237,0.3)] bg-white/10' : 'border-white/10 hover:border-white/20'}`}
      >
        <span className={`font-medium ${!selectedOption ? 'text-neutral-600' : 'text-white'}`}>
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
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#0F0F1A] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-[20px] overflow-hidden z-[150]"
          >
            <div className="max-h-[240px] overflow-y-auto custom-scrollbar p-2">
              {options.map((opt, i) => {
                const optValue = typeof opt === 'string' ? opt : opt.value;
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const isSelected = optValue === value;

                return (
                  <motion.div
                    key={optValue}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all flex items-center justify-between group ${isSelected ? 'bg-primary text-white' : 'text-neutral hover:bg-primary/20 hover:text-white'}`}
                  >
                    {optLabel}
                    {isSelected && <Check className="w-4 h-4" />}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
