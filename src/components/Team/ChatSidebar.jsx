import { useState } from 'react';
import { useTeamStore } from '../../store/useTeamStore';
import { useAuth } from '../../context/AuthContext';
import { Hash, Plus, Search, ShieldCheck } from 'lucide-react';
import { CustomSelect } from '../CustomSelect';

export function ChatSidebar() {
  const { userProfile, role } = useAuth();
  const { chats, activeChatId, setActiveChat, createChat, presenceMap } = useTeamStore();
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState('group');

  // Corporate Role Filter for Restricted Channels
  const groups = chats.filter(c => {
    if (c.type !== 'group') return false;
    const cleanName = c.name.toLowerCase();
    if (cleanName.includes('finance') || cleanName.includes('billing')) {
      return role === 'Founder' || role === 'CEO' || role === 'CFO' || role === 'Senior Accountant' || role === 'admin';
    }
    if (cleanName.includes('executive') || cleanName.includes('board')) {
      return role === 'Founder' || role === 'CEO' || role === 'COO' || role === 'admin';
    }
    return true;
  });

  const dms = chats.filter(c => c.type === 'direct');

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!newChatName.trim()) return;
    createChat({ name: newChatName, type: newChatType });
    setNewChatName('');
    setShowNewChat(false);
  };

  return (
    <div className="w-[280px] h-screen bg-[#060608] border-r border-white/5 flex flex-col flex-shrink-0 z-40 relative select-none">
      
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <h2 className="font-bold tracking-wide text-white text-sm">Teams Messaging</h2>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
            Live
          </span>
        </div>
        <button 
          onClick={() => setShowNewChat(true)}
          className="w-8 h-8 rounded-full bg-white/5 text-neutral hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          title="New Channel"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-neutral" />
          <input 
            type="text" 
            placeholder="Search channels..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder:text-neutral/70 focus:border-primary/50 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-6 pb-4 custom-scrollbar">
        
        {/* Group Channels */}
        <div>
          <div className="px-2 mb-2 text-[10px] font-black uppercase text-neutral/70 tracking-widest">
            Channels ({groups.length})
          </div>
          <div className="space-y-0.5">
            {groups.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all ${
                  activeChatId === chat.id 
                    ? 'bg-primary/20 text-white font-bold shadow-inner-purple' 
                    : 'text-neutral hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Hash className="w-3.5 h-3.5 text-neutral/70 shrink-0" />
                  <span className="truncate">{chat.name}</span>
                </div>
                {chat.name.toLowerCase().includes('finance') && (
                  <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" title="Restricted Channel" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        <div>
          <div className="px-2 mb-2 text-[10px] font-black uppercase text-neutral/70 tracking-widest">
            Direct Messages ({dms.length})
          </div>
          <div className="space-y-0.5">
            {dms.map(chat => {
              const partnerUid = chat.partnerUid || chat.id;
              const isOnline = presenceMap[partnerUid] !== undefined ? presenceMap[partnerUid] : true;
              return (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-all ${
                    activeChatId === chat.id 
                      ? 'bg-primary/20 text-white font-bold shadow-inner-purple' 
                      : 'text-neutral hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500/40 to-purple-500/40 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                      {chat.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#060608] rounded-full flex items-center justify-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-neutral-500'}`} />
                    </div>
                  </div>
                  <span className="truncate">{chat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121A] border border-white/10 rounded-2xl p-4 w-full space-y-4">
            <h3 className="text-sm font-bold text-white">Create Channel</h3>
            <form onSubmit={handleCreateChat} className="space-y-3">
              <input
                type="text"
                placeholder="Channel name (e.g. #vfx-sprint)"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewChat(false)}
                  className="flex-1 py-2 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-primary text-xs font-bold text-white hover:opacity-90"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
