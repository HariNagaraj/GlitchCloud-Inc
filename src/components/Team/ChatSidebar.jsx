import { useState } from 'react';
import { useTeamStore } from '../../store/useTeamStore';
import { Hash, Plus, Search } from 'lucide-react';

export function ChatSidebar() {
  const { chats, activeChatId, setActiveChat, createChat } = useTeamStore();
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState('group');

  const groups = chats.filter(c => c.type === 'group');
  const dms = chats.filter(c => c.type === 'direct');

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!newChatName.trim()) return;
    createChat({ name: newChatName, type: newChatType });
    setNewChatName('');
    setShowNewChat(false);
  };

  return (
    <div className="w-[280px] h-screen bg-[#060608] border-r border-white/5 flex flex-col flex-shrink-0 z-40 relative">
      
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
        <h2 className="font-semibold tracking-wide text-white">Messages</h2>
        <button 
          onClick={() => setShowNewChat(true)}
          className="w-8 h-8 rounded-full bg-white/5 text-neutral hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          title="New Chat"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Search (Visual Only) */}
      <div className="p-4">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-neutral" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder:text-neutral/70 focus:border-primary/50 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-6 pb-4">
        
        {/* Group Channels */}
        <div>
          <div className="px-2 mb-2 text-xs font-semibold text-neutral/70 uppercase tracking-wider">Channels</div>
          <div className="space-y-0.5">
            {groups.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                  activeChatId === chat.id 
                    ? 'bg-primary/20 text-white font-medium' 
                    : 'text-neutral hover:bg-white/5 hover:text-white'
                }`}
              >
                <Hash className="w-4 h-4 text-neutral/70" />
                <span className="truncate">{chat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        <div>
          <div className="px-2 mb-2 text-xs font-semibold text-neutral/70 uppercase tracking-wider">Direct Messages</div>
          <div className="space-y-0.5">
            {dms.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                  activeChatId === chat.id 
                    ? 'bg-primary/20 text-white font-medium' 
                    : 'text-neutral hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-surface-hover to-surface-border flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#060608] rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  </div>
                </div>
                <span className="truncate">{chat.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* New Chat Modal (Mock Inline UI) */}
      {showNewChat && (
        <div className="absolute inset-0 bg-[#060608]/95 backdrop-blur-sm flex flex-col p-4 z-50">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-semibold text-white">Create New Chat</h3>
             <button onClick={() => setShowNewChat(false)} className="text-neutral hover:text-white text-sm">Cancel</button>
          </div>
          
          <form onSubmit={handleCreateChat} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-neutral mb-1 block">Chat Type</label>
              <select 
                value={newChatType} 
                onChange={(e) => setNewChatType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary/50 text-white"
              >
                <option value="group">Group Channel</option>
                <option value="direct">Direct Message</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-neutral mb-1 block">Name</label>
              <input 
                type="text" 
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="e.g. Marketing Team"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary/50 text-white"
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              disabled={!newChatName.trim()}
              className="mt-2 w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Chat
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
