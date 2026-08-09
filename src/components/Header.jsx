import React from 'react';
import { Share2, MoreVertical, Search, Bell } from 'lucide-react';
import { useTeamStore } from '../store/useTeamStore';

export function Header() {
  const { currentUser } = useTeamStore();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#030305]/80 backdrop-blur-md sticky top-0 z-40">
      {/* Left: Section Info (Minimalist) */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium text-neutral-400">GlitchCloud</h2>
        <span className="text-neutral-600">/</span>
        <h2 className="text-sm font-semibold text-white">OS</h2>
      </div>

      {/* Right: Actions (Gemini Style) */}
      <div className="flex items-center gap-4">
        {/* Share Button */}
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-white border border-white/5">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>

        {/* More Actions */}
        <button className="p-2 rounded-full hover:bg-white/5 text-neutral-400 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Profile with Branding Ring */}
        <div className="relative group cursor-pointer ml-2">
          {/* Multi-color Google-style Ring */}
          <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] opacity-80 blur-[2px] group-hover:opacity-100 transition-opacity" />
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05]" />
          
          <div className="relative w-8 h-8 rounded-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
             {/* Initials or Avatar */}
             <span className="text-xs font-black text-white">{currentUser.name.charAt(0)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
