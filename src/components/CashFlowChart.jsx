import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export function CashFlowChart() {
  const data = [
    { height: '40%', active: false },
    { height: '60%', active: false },
    { height: '35%', active: false },
    { height: '80%', active: false },
    { height: '70%', active: false },
    { height: '95%', active: true },
  ];

  return (
    <div className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-8 border border-t-white/10 border-l-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] h-[400px] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-xl font-bold tracking-wide text-white">Cash Flow Overview</h2>
        <button className="text-neutral hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative border border-surface-border rounded-2xl overflow-hidden p-6 flex items-end justify-around">
        {/* Fake Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-20">
           <div className="border-b border-surface-border w-full h-0"></div>
           <div className="border-b border-surface-border w-full h-0"></div>
           <div className="border-b border-surface-border w-full h-0"></div>
           <div className="border-b border-surface-border w-full h-0"></div>
        </div>

        {/* Fake Line Chart */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path 
            d="M 5 85 L 20 75 L 35 85 L 50 55 L 65 65 L 85 60" 
            fill="none" 
            stroke="#475569" 
            strokeWidth="1" 
            vectorEffect="non-scaling-stroke" 
          />
        </svg>

        {/* Bars */}
        {data.map((bar, i) => (
          <div key={i} className="relative w-12 flex flex-col justify-end group z-10" style={{ height: bar.height }}>
            <div className={`w-full h-full rounded-t-sm transition-all duration-500 relative
              ${bar.active 
                ? 'bg-gradient-to-b from-primary to-primary/10 shadow-[0_-5px_15px_rgba(187,134,252,0.3)]' 
                : 'bg-gradient-to-b from-primary/30 to-primary/5 hover:from-primary/50'
              }`}
            >
              {bar.active && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#E9D5FF] rounded-t-sm shadow-neon-purple-strong"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
