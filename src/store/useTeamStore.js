import { create } from 'zustand';

const initialChats = [
  { id: 'c1', name: 'General', type: 'group', members: ['demo-admin-01', 'demo-pm-02', 'demo-creative-03', 'demo-finance-04', 'demo-hr-05'] },
  { id: 'c2', name: 'Project Alpha', type: 'group', members: ['demo-admin-01', 'demo-pm-02', 'demo-creative-03'] },
  { id: 'd1', name: 'Bob Lead', type: 'direct', partnerUid: 'demo-pm-02', members: ['demo-admin-01', 'demo-pm-02'] },
  { id: 'd2', name: 'David Editor', type: 'direct', partnerUid: 'demo-creative-03', members: ['demo-admin-01', 'demo-creative-03'] },
  { id: 'd3', name: 'Fiona Accountant', type: 'direct', partnerUid: 'demo-finance-04', members: ['demo-admin-01', 'demo-finance-04'] },
  { id: 'd4', name: 'Hannah HR', type: 'direct', partnerUid: 'demo-hr-05', members: ['demo-admin-01', 'demo-hr-05'] }
];

const initialMessages = {
  'c1': [
    { id: 'm1', senderId: 'demo-pm-02', senderName: 'Bob Lead', senderRole: 'Project Manager', text: 'Hey team, the Q3 financial report is ready for review.', timestamp: '10:30 AM', isUrgent: false },
    { id: 'm2', senderId: 'demo-admin-01', senderName: 'Alice Founder', senderRole: 'Agency Admin', text: 'Great, I will take a look.', timestamp: '10:32 AM', isUrgent: true }
  ],
  'c2': [
    { id: 'm3', senderId: 'demo-creative-03', senderName: 'David Editor', senderRole: 'Creative Member', text: 'Alpha campaign video deployment successful.', timestamp: '09:00 AM', isUrgent: false }
  ],
  'd1': [
    { id: 'm4', senderId: 'demo-pm-02', senderName: 'Bob Lead', senderRole: 'Project Manager', text: 'Can we discuss the production timeline for next sprint?', timestamp: '11:00 AM', isUrgent: false }
  ]
};

export const useTeamStore = create((set) => ({
  currentUser: {
    id: 'demo-admin-01',
    name: 'Alice Founder',
    role: 'admin',
    roleTier: 'Agency Admin',
    email: 'admin@glitchcloud.com',
    department: 'Leadership'
  },

  presenceMap: {},
  
  setCurrentUser: (user) => set({ currentUser: user }),
  setPresenceMap: (map) => set({ presenceMap: map }),

  chats: initialChats,
  activeChatId: 'c1',
  messages: initialMessages,
  
  activeDrawer: null,
  activeProfileMember: null,
  viewMode: 'chat',

  setViewMode: (mode, member = null) => set({ 
    viewMode: mode, 
    activeProfileMember: member || null,
    activeDrawer: null
  }),

  setOpenDrawer: (drawerName, member = null) => set((state) => ({
    activeDrawer: state.activeDrawer === drawerName && state.activeProfileMember?.id === member?.id ? null : drawerName,
    activeProfileMember: member || state.activeProfileMember
  })),

  setActiveChat: (chatId) => set({ activeChatId: chatId }),

  createChat: (newChat) => set((state) => ({
    chats: [...state.chats, { id: `c_${Date.now()}`, members: [state.currentUser.id], ...newChat }]
  })),

  setMessagesForChat: (chatId, chatMessages) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: chatMessages
    }
  })),

  sendMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  }))
}));
