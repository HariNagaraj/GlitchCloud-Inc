import { create } from 'zustand';

// Initial Mock Data
const initialChats = [
  { id: 'c1', name: 'General', type: 'group', members: ['1', '2', '3'] },
  { id: 'c2', name: 'Project Alpha', type: 'group', members: ['1', '2'] },
  { id: 'd1', name: 'Bob Director', type: 'direct', members: ['1', '2'] }
];

const initialMessages = {
  'c1': [
    { id: 1, senderId: '2', senderName: 'Bob Director', senderRole: 'Director', text: 'Hey team, the Q3 financial report is ready for review.', timestamp: '10:30 AM', isUrgent: false },
    { id: 2, senderId: '1', senderName: 'Alice CEO', senderRole: 'Executive', text: 'Great, I will take a look.', timestamp: '10:32 AM', isUrgent: true }
  ],
  'c2': [
    { id: 3, senderId: '3', senderName: 'Charlie Dev', senderRole: 'Associate', text: 'Alpha deployment successful.', timestamp: '09:00 AM', isUrgent: false }
  ],
  'd1': [
    { id: 4, senderId: '2', senderName: 'Bob Director', senderRole: 'Director', text: 'Can we discuss my performance review?', timestamp: '11:00 AM', isUrgent: false }
  ]
};

export const useTeamStore = create((set) => ({
  currentUser: {
    id: '1',
    name: 'Alice CEO',
    roleTier: 'Executive',
    email: 'alice@glitchcloud.com',
    department: 'Leadership'
  },
  
  chats: initialChats,
  activeChatId: 'c1',
  messages: initialMessages,
  
  activeDrawer: null,

  setOpenDrawer: (drawerName) => set((state) => ({
    activeDrawer: state.activeDrawer === drawerName ? null : drawerName
  })),

  setCurrentUserRole: (roleTier) => set((state) => ({
    currentUser: { ...state.currentUser, roleTier }
  })),

  setActiveChat: (chatId) => set({ activeChatId: chatId }),

  createChat: (newChat) => set((state) => {
    const id = `c${Date.now()}`;
    const chat = { id, ...newChat, members: [state.currentUser.id, ...(newChat.members || [])] };
    return {
      chats: [...state.chats, chat],
      messages: { ...state.messages, [id]: [] },
      activeChatId: id
    };
  }),

  sendMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  }))
}));
