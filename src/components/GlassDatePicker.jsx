import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Premium Centered Glassmorphic Date Picker Component
 * Replaces default browser date pickers with a centered glassmorphic calendar popover overlay.
 */
export const GlassDatePicker = ({ label, value, onChange, placeholder = "Select Date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse existing date or default to current date
  const parsedDate = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState(isNaN(parsedDate.getTime()) ? new Date() : parsedDate);
  const modalRef = useRef(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Close calendar popover on outside click or ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const selectDate = (day) => {
    const selectedDate = new Date(year, month, day);
    // Format YYYY-MM-DD
    const formatted = selectedDate.toISOString().split('T')[0];
    onChange(formatted);
    setIsOpen(false);
  };

  const selectedDateObj = value ? new Date(value) : null;
  const isSelectedDay = (day) => {
    if (!selectedDateObj || isNaN(selectedDateObj.getTime())) return false;
    return (
      selectedDateObj.getDate() === day &&
      selectedDateObj.getMonth() === month &&
      selectedDateObj.getFullYear() === year
    );
  };

  const today = new Date();
  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  // Format display string e.g. "09 Aug 2026"
  const formattedDisplay = selectedDateObj && !isNaN(selectedDateObj.getTime())
    ? selectedDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : placeholder;

  return (
    <div className="font-urbanist">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">
          {label}
        </label>
      )}

      {/* Input Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm text-left outline-none hover:border-primary/50 focus:border-primary transition-all flex items-center justify-between group relative"
      >
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-4 h-4 text-neutral/40 group-hover:text-primary transition-colors absolute left-4" />
          <span className={value ? "text-white font-medium" : "text-neutral/40 font-medium"}>
            {formattedDisplay}
          </span>
        </div>
        {value && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className="p-1 rounded-full hover:bg-white/10 text-neutral/40 hover:text-white transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
      </button>

      {/* Glassmorphic Centered Dark Calendar Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#0a0a0f] border border-white/20 rounded-[32px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl w-80 text-white relative space-y-4"
            >
              {/* Header: Month & Navigation */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-white">{monthNames[month]}</span>
                  <span className="text-xs font-semibold text-primary">{year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral hover:text-white transition-all active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral hover:text-white transition-all active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-[10px] font-black uppercase text-neutral/40 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid Days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Empty leading slots */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const selected = isSelectedDay(day);
                  const todayCell = isToday(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => selectDate(day)}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        selected
                          ? 'bg-primary text-white shadow-neon-purple scale-105'
                          : todayCell
                          ? 'bg-white/10 text-primary border border-primary/40'
                          : 'text-neutral/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Footer Quick Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    const todayStr = new Date().toISOString().split('T')[0];
                    onChange(todayStr);
                    setIsOpen(false);
                  }}
                  className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline"
                >
                  Set Today
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-neutral/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
