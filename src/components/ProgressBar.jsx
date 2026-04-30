import React from 'react';

export function ProgressBar({ progress = 0, className = '' }) {
  return (
    <div className={`w-full bg-surface-container-high rounded-full h-1 ${className}`}>
      <div 
        className="bg-gradient-to-r from-primary to-[#8A6AE8] h-1 rounded-full relative"
        style={{ width: `${progress}%` }}
      >
        {/* Leading edge glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary/40 rounded-full blur-[4px]" />
      </div>
    </div>
  );
}
