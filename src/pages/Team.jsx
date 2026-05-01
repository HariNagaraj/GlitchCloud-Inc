import { useState, useRef, useEffect } from 'react';
import { useTeamStore } from '../store/useTeamStore';
import { TopActionBar } from '../components/Team/TopActionBar';
import { ChatSidebar } from '../components/Team/ChatSidebar';
import { ChatBubble } from '../components/Team/ChatBubble';
import { SidePanels } from '../components/Team/SidePanels';
import { Paperclip, Send, Smile } from 'lucide-react';

const EMPTY_ARRAY = [];

export function Team() {
  const { currentUser, activeDrawer, activeChatId, messages, sendMessage } = useTeamStore();
  const currentMessages = messages[activeChatId] || EMPTY_ARRAY;
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.roleTier,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUrgent: false
    };

    sendMessage(activeChatId, newMessage);
    setInputText('');
  };

  return (
    <div className="flex-1 bg-[#030305] text-white flex relative overflow-hidden h-screen">
      
      {/* Left Chat Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <TopActionBar />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${activeDrawer ? 'mr-80' : ''}`}>

        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center text-xs text-neutral mb-8">Today</div>
          {currentMessages.length === 0 && (
            <div className="text-center text-neutral/50 text-sm mt-20">No messages yet. Start the conversation!</div>
          )}
          {currentMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUser.id} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#0a0a0f]/50 backdrop-blur-md z-10">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2 px-4 focus-within:border-primary/50 transition-colors"
          >
            <button type="button" className="text-neutral hover:text-white transition-colors" title="Attach file">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Type a message or drag & drop files here..." 
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-neutral/70"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="button" className="text-neutral hover:text-white transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button 
              type="submit" 
              className={`p-2 rounded-lg transition-colors ${inputText.trim() ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-white/5 text-neutral'}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-neutral text-center mt-2">
             Security: Files inherit the permissions of the chat.
          </div>
        </div>
        </div>
      </div>

      {/* Side Panels Overlay */}
      <SidePanels />

    </div>
  );
}
