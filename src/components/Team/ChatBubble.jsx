import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatBubble({ message, isOwn }) {
  const [showMiniCard, setShowMiniCard] = useState(false);

  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-4 relative`}>
      <div className="flex items-end gap-2 max-w-[70%] relative">
        
        {/* Avatar - Clickable for Mini-Detail Card */}
        {!isOwn && (
          <div className="relative">
            <button 
              onClick={() => setShowMiniCard(!showMiniCard)}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg overflow-hidden shrink-0 border border-white/10 relative z-10"
            >
              {message.senderName.charAt(0)}
            </button>

            {/* Mini Detail Card Popover */}
            <AnimatePresence>
              {showMiniCard && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-10 left-0 w-48 bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl z-50"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                      {message.senderName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">{message.senderName}</h4>
                      <p className="text-[10px] text-primary">{message.senderRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral mt-2 pt-2 border-t border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Online</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Message Bubble Container */}
        <div className="flex flex-col gap-1">
          <div className={`flex items-center gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
             {!isOwn && <span className="text-xs text-neutral/70 font-medium">{message.senderName}</span>}
             <span className="text-[10px] text-neutral/50">{message.timestamp}</span>
          </div>
          
          <div 
            className={`
              relative px-4 py-2.5 text-sm leading-relaxed rounded-2xl
              ${isOwn 
                ? 'bg-gradient-to-br from-[#7C3AED] to-indigo-600 text-white rounded-br-sm shadow-[0_4px_15px_rgba(124,58,237,0.2)]' 
                : 'bg-[#1a1a24]/60 backdrop-blur-md text-neutral border border-white/10 rounded-bl-sm'}
            `}
          >
            {/* 2-Day Pulse Notification Style for Urgent */}
            {message.isUrgent && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse border border-[#030305]" />
            )}
            
            {message.text}
          </div>
        </div>

      </div>
    </div>
  );
}
