import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RoleGuard = ({ navId, children, onNavigate }) => {
  const { role, roleDetails, canAccessNav } = useAuth();

  if (canAccessNav(navId)) {
    return children;
  }

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center text-center font-urbanist h-full bg-[#050508]">
      <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 shadow-neon-pink/20 shadow-2xl">
        <Lock className="w-10 h-10 text-rose-400" />
      </div>

      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-4">
        Restricted Corporate Content
      </span>

      <h2 className="text-3xl font-extrabold text-white mb-2">Access Restricted</h2>

      <p className="text-neutral/70 max-w-md text-sm mb-6 leading-relaxed">
        Your current role <strong className="text-white">({roleDetails?.title})</strong> does not have authorization to view the <strong className="text-primary uppercase tracking-wider">{navId}</strong> section.
      </p>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md w-full mb-8 text-left text-xs space-y-2">
        <p className="font-bold text-white uppercase tracking-wider">Departmental Governance Policy:</p>
        <p className="text-neutral/60">{roleDetails?.scope}</p>
      </div>

      <button
        onClick={() => onNavigate && onNavigate('dashboard')}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-sm shadow-neon-purple flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Dashboard
      </button>
    </div>
  );
};
