import { useTeamStore } from '../../store/useTeamStore';
import { Users, Folder, UserPlus } from 'lucide-react';

export function TopActionBar() {
  const { currentUser, activeDrawer, setOpenDrawer, chats, activeChatId, setViewMode, presenceMap } = useTeamStore();
  const isExecutive = currentUser.roleTier === 'Executive' || currentUser.role === 'admin';
  
  const activeChat = chats.find(c => c.id === activeChatId) || { name: 'General', members: [] };
  const isDM = activeChat.type === 'direct';

  const onlineCount = Object.values(presenceMap || {}).filter(Boolean).length || 5;

  const handleTitleClick = () => {
    if (isDM) {
      const member = {
        id: activeChat.partnerUid || activeChat.id,
        name: activeChat.name,
        email: `${activeChat.name.toLowerCase().replace(' ', '.')}@glitchcloud.com`,
        dept: 'Operations',
        roleTier: 'Director'
      };
      setViewMode('profile', member);
    }
  };

  return (
    <div className="h-16 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-6 z-20 shrink-0">
      <div className="flex items-center gap-4">
        <h2 
          onClick={handleTitleClick}
          className={`text-lg font-semibold tracking-wide text-white ${isDM ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
        >
          {activeChat.name}
        </h2>
        {!isDM && (
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral rounded-md border border-white/5">
            {activeChat.members?.length || 5} {activeChat.members?.length === 1 ? 'Member' : 'Members'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Action Buttons */}
        {!isDM && (
          <button 
            onClick={() => setOpenDrawer('Details')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeDrawer === 'Details' 
                ? 'bg-primary/20 text-primary border border-primary/50' 
                : 'bg-white/5 text-neutral hover:bg-white/10 hover:text-white border border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Details</span>
          </button>
        )}

        <button 
          onClick={() => setOpenDrawer('Files')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeDrawer === 'Files' 
              ? 'bg-primary/20 text-primary border border-primary/50' 
              : 'bg-white/5 text-neutral hover:bg-white/10 hover:text-white border border-transparent'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>Files</span>
        </button>

        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-neutral hover:bg-white/10 hover:text-white border border-white/5 transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live Attendance ({onlineCount} Active)</span>
        </button>

        {/* Executive / Admin Only Button */}
        {isExecutive && !isDM && (
          <button className="ml-2 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-indigo-600 shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all border border-white/10">
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        )}
      </div>
    </div>
  );
}
