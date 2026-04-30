import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
        <input 
          type="text" 
          placeholder="Search projects, clients..." 
          className="w-full h-12 bg-surface-container-low border border-white/5 rounded-full pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:shadow-neon-primary transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-full bg-surface-container-low border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-neon-primary" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/5">
          <div className="text-right">
            <div className="text-sm font-bold tracking-wider text-on-surface">Alex Mercer</div>
            <div className="text-xs text-on-surface-variant">Producer</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-[#8A6AE8] p-[2px]">
            <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
