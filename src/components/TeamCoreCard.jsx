import React from 'react';
import { motion } from 'framer-motion';

export function TeamCoreCard() {
  const members = [
    { name: 'Alex Chen', role: 'Lead Animator', status: 'online', initials: 'AC', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Sarah Jenkins', role: 'Art Director', status: 'online', initials: 'SJ', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Marcus Vance', role: 'VFX Supervisor', status: 'online', initials: 'M' },
    { name: 'Elena Rostova', role: 'Producer', status: 'offline', initials: 'E' },
  ];

  return (
    <div className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-7 border border-t-white/10 border-l-white/10 shadow-[0_0_30px_rgba(187,134,252,0.05),0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[17px] font-bold tracking-wide text-white">Team Core</h2>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-neutral uppercase tracking-widest">
          4 Online
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {members.map((member, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-white/5 overflow-hidden bg-surface-hover flex items-center justify-center text-sm font-bold text-neutral">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  member.initials
                )}
              </div>
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#12121A] ${member.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-neutral/40'}`} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-white leading-tight">{member.name}</h4>
              <p className="text-[11px] text-neutral mt-0.5 opacity-70">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2.5 rounded-xl border border-white/5 bg-white/5 text-neutral text-[12px] font-semibold mt-7 hover:bg-white/10 transition-all">
        View Directory
      </button>
    </div>
  );
}
