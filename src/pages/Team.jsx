import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTeamStore } from '../store/useTeamStore';
import { TopActionBar } from '../components/Team/TopActionBar';
import { ChatSidebar } from '../components/Team/ChatSidebar';
import { ChatBubble } from '../components/Team/ChatBubble';
import { SidePanels } from '../components/Team/SidePanels';
import { EmployeeProfile } from '../components/Team/EmployeeProfile';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROLE_DETAILS } from '../context/roleConstants';
import { 
  subscribeToChannelMessages, 
  subscribeToDmMessages, 
  sendChannelMessage, 
  sendDmMessage,
  subscribeToUserPresence,
  setUserOnlinePresence 
} from '../api/firestoreService';
import { 
  Paperclip, Send, Smile, Search, Camera, MoreVertical, 
  ChevronLeft, Phone, Video, Plus, CheckCheck, Lock 
} from 'lucide-react';

const EMPTY_ARRAY = [];

export const Team = React.memo(function Team() {
  const { userProfile, role } = useAuth();
  const { 
    currentUser, activeDrawer, activeChatId, messages, setMessagesForChat,
    viewMode, setViewMode, activeProfileMember, chats, setActiveChat, setPresenceMap
  } = useTeamStore();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('list');
  const [inputText, setInputText] = useState('');
  const [accessRestricted, setAccessRestricted] = useState(false);

  const chatEndRef = useRef(null);

  // Sync current user details from AuthContext
  const currentUid = userProfile?.uid || currentUser.id || 'demo-admin-01';
  const currentName = userProfile?.name || currentUser.name || 'Alice Founder';
  const currentRoleTitle = ROLE_DETAILS[role || userProfile?.role]?.title || currentUser.roleTier || 'Employee';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set user online presence in Firestore
  useEffect(() => {
    setUserOnlinePresence(currentUid, true);
    
    const unsubscribePresence = subscribeToUserPresence((presenceMap) => {
      setPresenceMap(presenceMap);
    });

    const handleBeforeUnload = () => {
      setUserOnlinePresence(currentUid, false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      setUserOnlinePresence(currentUid, false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (unsubscribePresence) unsubscribePresence();
    };
  }, [currentUid, setPresenceMap]);

  // Sync mobile view with activeChatId
  useEffect(() => {
    if (isMobile && activeChatId) {
      setMobileView('chat');
    } else if (isMobile && !activeChatId) {
      setMobileView('list');
    }
  }, [activeChatId, isMobile]);

  // REAL-TIME CONVERSATION SWITCHING & SUBSCRIBING
  useEffect(() => {
    setAccessRestricted(false);
    const activeChat = chats.find(c => c.id === activeChatId);
    if (!activeChat) return;

    let unsubscribe = () => {};

    if (activeChat.type === 'group') {
      // Channel Security Rule Check
      if (activeChat.name === 'Executive' && role !== ROLES.ADMIN && role !== ROLES.PROJECT_MANAGER) {
        setAccessRestricted(true);
        return;
      }
      
      unsubscribe = subscribeToChannelMessages(activeChat.id, (realtimeMsgs) => {
        setMessagesForChat(activeChat.id, realtimeMsgs);
      });
    } else if (activeChat.type === 'direct') {
      const partnerUid = activeChat.partnerUid || activeChat.id;
      unsubscribe = subscribeToDmMessages(currentUid, partnerUid, (realtimeMsgs) => {
        setMessagesForChat(activeChat.id, realtimeMsgs);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [activeChatId, chats, currentUid, role, setMessagesForChat]);

  const currentMessages = messages[activeChatId] || EMPTY_ARRAY;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // REAL-TIME MESSAGE SENDING
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || accessRestricted) return;

    const textToSend = inputText.trim();
    setInputText('');

    const activeChat = chats.find(c => c.id === activeChatId);
    const messagePayload = {
      senderId: currentUid,
      senderUid: currentUid,
      senderName: currentName,
      senderRole: currentRoleTitle,
      text: textToSend,
      isUrgent: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (activeChat?.type === 'group') {
      await sendChannelMessage(activeChat.id, messagePayload);
    } else if (activeChat?.type === 'direct') {
      const partnerUid = activeChat.partnerUid || activeChat.id;
      await sendDmMessage(currentUid, partnerUid, messagePayload);
    }
  };

  const handleBackToList = () => {
    setActiveChat(null);
    setMobileView('list');
  };

  if (isMobile) {
    const groups = chats.filter(c => c.type === 'group');
    const dms = chats.filter(c => c.type === 'direct');

    return (
      <div className="flex-1 bg-black text-white flex flex-col h-full overflow-hidden font-urbanist">
        {mobileView === 'list' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Header */}
            <div className="p-6 pb-4 flex items-center justify-between">
              <h1 className="text-3xl font-black tracking-tight uppercase">Messages</h1>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral hover:text-white transition-all active:scale-95">
                  <Search className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Group Channels Section */}
              <div className="px-6 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40 mb-4 px-2">Channels</h3>
                <div className="space-y-2">
                  {groups.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-black text-primary shadow-inner">
                        #
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white tracking-tight">{chat.name}</h4>
                          <span className="text-[9px] font-black uppercase text-neutral/40 tracking-tighter">Live</span>
                        </div>
                        <p className="text-xs text-neutral/60 truncate opacity-80">Real-time team channel...</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Messages Section */}
              <div className="px-6 pb-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40 mb-4 px-2">Direct Messages</h3>
                <div className="space-y-2">
                  {dms.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setActiveChat(chat.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all active:scale-[0.98]"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white shadow-xl">
                          {chat.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white tracking-tight">{chat.name}</h4>
                          <span className="text-[9px] font-black uppercase text-neutral/40 tracking-tighter">Active</span>
                        </div>
                        <p className="text-xs text-neutral/60 truncate opacity-80">Direct Message</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Chat Detail */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#050508]">
            {/* Chat Header */}
            <div className="p-4 py-3 flex items-center justify-between border-b border-white/5 backdrop-blur-3xl bg-black/40 relative z-20">
              <div className="flex items-center gap-3">
                <button onClick={handleBackToList} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-all active:scale-90"><ChevronLeft className="w-6 h-6 text-neutral" /></button>
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl shadow-xl">
                    {chats.find(c => c.id === activeChatId)?.name.charAt(0)}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#050508]" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight mb-0.5">{chats.find(c => c.id === activeChatId)?.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <p className="text-[10px] text-neutral/60 font-black uppercase tracking-widest">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
              {currentMessages.map((msg) => {
                const isOwn = msg.senderId === currentUid;
                return (
                  <div key={msg.id} className={`flex items-end gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
                    {!isOwn && (
                      <div className="w-9 h-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black shrink-0 shadow-lg">
                        {msg.senderName.charAt(0)}
                      </div>
                    )}
                    <div className={`max-w-[80%] space-y-1.5`}>
                      <div className={`px-5 py-3.5 rounded-[28px] text-[14px] leading-relaxed shadow-2xl ${isOwn ? 'bg-primary text-white rounded-br-lg shadow-primary/20' : 'bg-white/5 text-neutral border border-white/5 rounded-bl-lg'}`}>
                        {!isOwn && <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{msg.senderName}</p>}
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1.5 ${isOwn ? 'justify-end' : ''}`}>
                        <span className="text-[9px] font-black text-neutral/30 uppercase tracking-tighter">{msg.timestamp}</span>
                        {isOwn && <CheckCheck className="w-3 h-3 text-primary" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Mobile Input Area */}
            <div className="p-4 pb-6 bg-black/40 backdrop-blur-3xl border-t border-white/5">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-[28px] p-1.5 px-5 focus-within:border-primary/50 transition-all focus-within:bg-white/[0.06]">
                  <input 
                    type="text" 
                    placeholder="Type here..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-neutral/30 py-3"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  className={`w-14 h-14 rounded-[24px] flex items-center justify-center transition-all ${inputText.trim() ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-100' : 'bg-white/5 text-neutral scale-95 opacity-50'}`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex-1 bg-[#030305] text-white flex relative overflow-hidden h-full">
      <ChatSidebar />
      <div className="flex-1 flex flex-col relative min-h-0">
        {viewMode === 'profile' ? (
          <EmployeeProfile member={activeProfileMember} onBack={() => setViewMode('chat')} />
        ) : (
          <>
            <TopActionBar />
            <div className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${activeDrawer ? 'mr-80' : ''}`}>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="text-center text-xs text-neutral mb-8 font-black uppercase tracking-[0.2em] opacity-40">Today</div>
                
                {accessRestricted ? (
                  <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/20 max-w-md mx-auto my-12 text-center space-y-3">
                    <Lock className="w-8 h-8 text-amber-400 mx-auto" />
                    <h3 className="text-lg font-bold text-amber-300">Restricted Channel Access</h3>
                    <p className="text-xs text-amber-200/80">Corporate Security Policy: You do not have permission to view messages in this restricted channel.</p>
                  </div>
                ) : (
                  <>
                    {currentMessages.length === 0 && (
                      <div className="text-center text-neutral/50 text-sm mt-20 italic font-medium">No messages yet. Start the conversation!</div>
                    )}
                    {currentMessages.map((msg, index) => {
                      const prevMsg = currentMessages[index - 1];
                      const isSameSender = prevMsg && prevMsg.senderId === msg.senderId;
                      const isSameTime = prevMsg && prevMsg.timestamp === msg.timestamp;
                      const hideHeader = isSameSender && isSameTime;
                      return (
                        <ChatBubble 
                          key={msg.id || index} 
                          message={msg} 
                          isOwn={msg.senderId === currentUid} 
                          hideHeader={hideHeader} 
                        />
                      );
                    })}
                  </>
                )}
                <div ref={chatEndRef} />
              </div>

              {!accessRestricted && (
                <div className="p-4 border-t border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl z-10">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 px-4 transition-colors focus-within:border-primary/50">
                    <button type="button" className="text-neutral hover:text-white transition-colors p-1" title="Attach file"><Paperclip className="w-5 h-5" /></button>
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-neutral/40 py-2" 
                      value={inputText} 
                      onChange={(e) => setInputText(e.target.value)} 
                    />
                    <button type="button" className="text-neutral hover:text-white transition-colors p-1"><Smile className="w-5 h-5" /></button>
                    <button 
                      type="submit" 
                      disabled={!inputText.trim()}
                      className={`group p-2.5 rounded-xl transition-all duration-300 ${inputText.trim() ? 'bg-primary text-white scale-100 shadow-[0_0_20px_rgba(124,58,237,0.4)]' : 'bg-white/5 text-neutral scale-90 opacity-50'}`}
                    >
                      <Send className={`w-4 h-4 transition-transform duration-300 ${inputText.trim() ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''}`} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {viewMode === 'chat' && <SidePanels />}
    </div>
  );
});
