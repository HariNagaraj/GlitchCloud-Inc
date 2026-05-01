import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export function TeamVelocityCard() {
  const teams = [
    { name: 'Design Team', velocity: 92, color: 'bg-warning shadow-[0_0_15px_rgba(245,158,11,0.5)]', trail: 'bg-warning/20', textCol: 'text-warning' },
    { name: 'Engineering', velocity: 85, color: 'bg-[#D0BCFF] shadow-[0_0_15px_rgba(208,188,255,0.5)]', trail: 'bg-primary/20', textCol: 'text-white' },
    { name: 'Strategy', velocity: 78, color: 'bg-[#D0BCFF] shadow-[0_0_15px_rgba(208,188,255,0.5)]', trail: 'bg-primary/20', textCol: 'text-white' },
  ];

  return (
    <div className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-8 border border-t-white/10 border-l-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col h-[280px]">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-2xl font-semibold text-white tracking-wide">Team Velocity</h3>
        <button className="text-neutral hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col justify-between flex-1 relative z-10">
        {teams.map((team, idx) => (
          <div key={idx} className="mb-4 last:mb-0">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-white/90">{team.name}</span>
              <span className={`font-bold ${team.textCol}`}>{team.velocity}%</span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${team.trail}`}>
              <div 
                className={`h-full rounded-full ${team.color}`} 
                style={{ width: `${team.velocity}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
