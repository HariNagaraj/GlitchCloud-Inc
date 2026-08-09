import { useTeamStore } from '../../store/useTeamStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, File, Lock } from 'lucide-react';
import { ProfilePanel } from './ProfilePanel';

export function SidePanels() {
  const { currentUser, activeDrawer, setOpenDrawer, activeProfileMember, chats, activeChatId } = useTeamStore();
  const isExecutive = currentUser.roleTier === 'Executive';
  const activeChat = chats.find(c => c.id === activeChatId);

  // Mock data
  const teamMembers = [
    { id: '1', name: 'Alice CEO', email: 'alice@glitchcloud.com', dept: 'Leadership', roleTier: 'Executive', salary: '$250,000', performance: 'Exceptional' },
    { id: '2', name: 'Bob Director', email: 'bob@glitchcloud.com', dept: 'Operations', roleTier: 'Director', salary: '$180,000', performance: 'Exceeds Expectations' },
    { id: '3', name: 'Charlie Dev', email: 'charlie@glitchcloud.com', dept: 'Engineering', roleTier: 'Associate', salary: '$120,000', performance: 'Meets Expectations' },
  ];

  const files = [
    { id: 1, name: 'Q3_Financial_Report.pdf', type: 'PDF', size: '2.4 MB', restricted: false },
    { id: 2, name: 'Merger_Details.docx', type: 'DOCX', size: '1.1 MB', restricted: true },
    { id: 3, name: 'Dashboard_V2_Mocks.fig', type: 'FIG', size: '15.6 MB', restricted: false },
  ];

  const getDrawerTitle = () => {
    if (activeDrawer === 'Details') return 'Team Details';
    if (activeDrawer === 'Files') return 'Shared Files';
    if (activeDrawer === 'Profile') return 'Member Profile';
    return '';
  };

  return (
    <AnimatePresence>
      {activeDrawer && (
        <motion.div
          initial={{ x: 350 }}
          animate={{ x: 0 }}
          exit={{ x: 350 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="absolute right-0 top-16 bottom-0 w-80 bg-[#0a0a0f] border-l border-white/5 shadow-2xl z-30 flex flex-col"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0f]/50 backdrop-blur-xl">
            <h3 className="font-semibold text-white tracking-wide">
              {getDrawerTitle()}
            </h3>
            <button 
              onClick={() => setOpenDrawer(null)}
              className="p-1.5 rounded-md hover:bg-white/5 text-neutral hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Content - Profile */}
          {activeDrawer === 'Profile' && (
            <ProfilePanel member={activeProfileMember} onClose={() => setOpenDrawer(null)} />
          )}

          {/* Drawer Content - Details (Team Channels only) */}
          {activeDrawer === 'Details' && activeChat?.type !== 'direct' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-[#1a1a24]/40 border border-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-surface-hover to-surface-border flex items-center justify-center font-bold text-white text-sm shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{member.name}</div>
                      <div className="text-xs text-neutral">{member.dept}</div>
                    </div>
                  </div>
                  
                  {/* Tier-Based Data Siloing */}
                  <div className="bg-[#030305] rounded-lg p-2.5 text-xs space-y-1.5 border border-white/5">
                    <div className="flex justify-between">
                      <span className="text-neutral/70">Role Tier:</span>
                      <span className="text-primary font-medium">{member.roleTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral/70">Email:</span>
                      <span className="text-white">{member.email}</span>
                    </div>
                    
                    {/* Executive Only Info */}
                    {isExecutive ? (
                       <>
                         <div className="flex justify-between">
                           <span className="text-neutral/70">Salary:</span>
                           <span className="text-green-400">{member.salary}</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-neutral/70">Performance:</span>
                           <span className="text-white">{member.performance}</span>
                         </div>
                       </>
                    ) : (
                      <div className="mt-2 text-[10px] text-neutral/50 italic text-center pt-2 border-t border-white/5">
                        Extended metrics hidden
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Drawer Content - Files */}
          {activeDrawer === 'Files' && (
            <div className="flex-1 overflow-y-auto p-4">
               <div className="grid grid-cols-2 gap-3">
                 {files.map(file => {
                   const canAccess = !file.restricted || isExecutive;
                   
                   return (
                     <div 
                        key={file.id} 
                        className={`
                          bg-[#1a1a24]/40 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square text-center relative transition-all
                          ${canAccess ? 'hover:bg-white/5 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                        `}
                      >
                       {file.restricted && (
                         <div className="absolute top-2 right-2 text-red-400">
                           <Lock className="w-3 h-3" />
                         </div>
                       )}
                       <div className={`p-3 rounded-lg ${canAccess ? 'bg-primary/20 text-primary' : 'bg-neutral/10 text-neutral'}`}>
                         <File className="w-6 h-6" />
                       </div>
                       <div className="w-full">
                         <div className="text-xs font-medium text-white truncate" title={file.name}>{file.name}</div>
                         <div className="text-[10px] text-neutral">{file.size}</div>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
