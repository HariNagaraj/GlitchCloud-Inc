import React from 'react';

export function ClientAcquisitionChart() {
  const data = [
    { label: 'Q1', value: 30 },
    { label: 'Q2', value: 45 },
    { label: 'Q3', value: 38 },
    { label: 'Q4', value: 85, isHighlight: true, textValue: '36' },
    { label: 'Q1', value: 55 },
  ];

  return (
    <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[300px]">
      <h3 className="text-[22px] font-semibold text-white tracking-wide mb-6 relative z-10">Client Acquisition</h3>
      
      <div className="flex-1 flex flex-col justify-end relative z-10 mt-auto">
        
        {/* Bars Container with Baseline */}
        <div className="flex items-end justify-between gap-3 h-[160px] border-b border-white/5 pb-0">
          {data.map((item, idx) => (
            <div key={idx} className="relative flex-1 h-full group">
              {item.isHighlight && (
                <div 
                  className="absolute w-full text-center text-[13px] font-medium text-[#EADDFF] transition-all duration-500"
                  style={{ bottom: `calc(${item.value}% + 8px)` }}
                >
                  {item.textValue}
                </div>
              )}
              <div 
                className={`absolute bottom-0 left-0 w-full rounded-t-[4px] transition-all duration-500 ${
                  item.isHighlight 
                    ? 'bg-[#D0BCFF] shadow-[0_0_20px_rgba(208,188,255,0.15)]' 
                    : 'bg-[#31313A]'
                }`}
                style={{ height: `${item.value}%` }}
              />
            </div>
          ))}
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between gap-3 mt-4">
          {data.map((item, idx) => (
            <span key={idx} className={`flex-1 text-center text-[12px] font-medium tracking-wide ${item.isHighlight ? 'text-[#EADDFF]' : 'text-neutral/70'}`}>
              {item.label}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
