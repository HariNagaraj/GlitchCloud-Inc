const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

// === MOCK DATA SOURCE OF TRUTH ===
const mockData = {
  clients: [
    { id: '1', name: 'Alpha Brand', videosRequired: 6, postersRequired: 12, status: 'Active', payment: 'Paid', retainerValue: 5000 },
    { id: '2', name: 'Beta Tech', videosRequired: 4, postersRequired: 8, status: 'Active', payment: 'Pending', retainerValue: 3500 },
    { id: '3', name: 'Gamma Corp', videosRequired: 10, postersRequired: 20, status: 'Inactive', payment: 'Overdue', retainerValue: 8000 },
    { id: '4', name: 'Zeta Fashion', videosRequired: 8, postersRequired: 15, status: 'Active', payment: 'Paid', retainerValue: 6500 },
  ],
  employees: [
    { id: '1', name: 'Alice CEO', roleTier: 'Executive', deptId: '1', status: 'Active', isClockedIn: true },
    { id: '2', name: 'Bob Director', roleTier: 'Director', deptId: '2', status: 'Active', isClockedIn: true },
    { id: '3', name: 'Charlie Dev', roleTier: 'Associate', deptId: '3', status: 'On Leave', isClockedIn: false },
    { id: '4', name: 'David Editor', roleTier: 'Associate', deptId: '4', status: 'Active', isClockedIn: true },
    { id: '5', name: 'Eve Designer', roleTier: 'Associate', deptId: '5', status: 'Active', isClockedIn: false },
  ],
  chats: [
    { id: 'c1', name: 'General', type: 'group' },
    { id: 'c2', name: 'Project Alpha', type: 'group' }
  ],
  messages: {
    'c1': [{ id: 1, senderId: '2', senderName: 'Bob Director', senderRole: 'Director', text: 'DEMO MODE: Backend is simulated.', timestamp: '10:30 AM', isUrgent: false }]
  }
};

// === MOCK API ROUTES ===

app.get('/api/dashboard', (req, res) => {
  res.json({
    videosCompleted: 24,
    postersCompleted: 42,
    monthlyHistory: [
      { month: 'Jan', completed: 45, target: 50 },
      { month: 'Feb', completed: 52, target: 50 },
      { month: 'Mar', completed: 48, target: 55 },
      { month: 'Apr', completed: 60, target: 65 },
      { month: 'May', completed: 34, target: 70 },
    ],
    upcomingSchedule: [
      { id: 1, client: 'Alpha Brand', title: 'Summer Collection Teaser', format: 'Video', date: '2024-05-02', status: 'Ready to Post', lead: 'David Editor' },
      { id: 2, client: 'Beta Tech', title: 'Q2 Tech Wrap-up', format: 'Video', date: '2024-05-03', status: 'Pending Review', lead: 'Alice CEO' },
    ]
  });
});

app.get('/api/management/clients', (req, res) => res.json(mockData.clients));
app.get('/api/management/employees', (req, res) => res.json(mockData.employees));
app.get('/api/chat/list', (req, res) => res.json(mockData.chats));
app.get('/api/chat/:id/messages', (req, res) => res.json(mockData.messages[req.params.id] || []));

app.post('/api/auth/login', (req, res) => {
  res.json({ token: 'mock-jwt-token', user: mockData.employees[0] });
});

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'DEMO MODE: ACTIVE', engine: 'In-Memory Mock' }));

// Socket Logic
io.on('connection', (socket) => {
  socket.on('join_chat', (id) => socket.join(id));
  socket.on('send_message', (data) => io.to(data.chatId).emit('receive_message', data));
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`\x1b[33m[GLITCHCLOUD DEMO SERVER]\x1b[0m Running on port ${PORT}`);
  console.log('\x1b[36mNote:\x1b[0m This server uses in-memory data for showcasing. No Database required.');
});
