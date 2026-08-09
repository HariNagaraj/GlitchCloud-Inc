import { create } from 'zustand';

export const useConfigStore = create((set) => ({
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

  upcomingSchedule: [
    { id: 1, client: 'Alpha Brand', title: 'Summer Collection Teaser', format: 'Video', date: '2024-05-02', status: 'Ready to Post', lead: 'David Editor' },
    { id: 2, client: 'Beta Tech', title: 'Q2 Tech Wrap-up', format: 'Video', date: '2024-05-03', status: 'Pending Review', lead: 'Alice CEO' },
    { id: 3, client: 'Zeta Fashion', title: 'Minimalist Poster Series', format: 'Poster', date: '2024-05-04', status: 'In Production', lead: 'Eve Designer' },
    { id: 4, client: 'Alpha Brand', title: 'Client Testimonial', format: 'Video', date: '2024-05-05', status: 'Pending Review', lead: 'Bob Director' },
    { id: 5, client: 'Beta Tech', title: 'New Feature Highlight', format: 'Poster', date: '2024-05-06', status: 'Ready to Post', lead: 'Eve Designer' },
  ],

  productionStats: {
    videosCompleted: 24,
    postersCompleted: 42,
    videosPosted: 18,
    postersPosted: 35,
    monthlyHistory: [
      { month: 'Jan', completed: 45, target: 50 },
      { month: 'Feb', completed: 52, target: 50 },
      { month: 'Mar', completed: 48, target: 55 },
      { month: 'Apr', completed: 60, target: 65 },
      { month: 'May', completed: 34, target: 70 },
    ]
  },

  departments: [
    { id: '1', name: 'Leadership', headId: '1' },
    { id: '2', name: 'Operations', headId: '2' },
    { id: '3', name: 'Engineering', headId: '3' },
    { id: '4', name: 'Video Production', headId: '2' },
    { id: '5', name: 'Marketing', headId: '2' },
  ],

  roles: [
    { id: '1', tierName: 'Executive', permissions: 'Full Access', color: 'from-blue-500 to-indigo-600' },
    { id: '2', tierName: 'Director', permissions: 'Management', color: 'from-purple-500 to-pink-600' },
    { id: '3', tierName: 'Associate', permissions: 'Standard', color: 'from-cyan-500 to-blue-600' },
    { id: '4', tierName: 'Contributor', permissions: 'Limited', color: 'from-orange-500 to-amber-600' },
  ],

  addClient: (client) => set((state) => ({
    clients: [...state.clients, { ...client, id: Date.now().toString(), status: client.status || 'Active', payment: client.payment || 'Pending', retainerValue: client.retainerValue || 0 }]
  })),
  updateClient: (id, updatedFields) => set((state) => ({
    clients: state.clients.map(c => c.id === id ? { ...c, ...updatedFields } : c)
  })),
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(c => c.id !== id)
  })),

  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, { ...employee, id: Date.now().toString(), status: employee.status || 'Active', isClockedIn: false }]
  })),
  updateEmployee: (id, updatedFields) => set((state) => ({
    employees: state.employees.map(e => e.id === id ? { ...e, ...updatedFields } : e)
  })),
  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(e => e.id !== id)
  })),

  addDepartment: (dept) => set((state) => ({
    departments: [...state.departments, { ...dept, id: Date.now().toString() }]
  })),
  updateDepartment: (id, updatedFields) => set((state) => ({
    departments: state.departments.map(d => d.id === id ? { ...d, ...updatedFields } : d)
  })),
  deleteDepartment: (id) => set((state) => ({
    departments: state.departments.filter(d => d.id !== id)
  })),

  addRole: (role) => set((state) => ({
    roles: [...state.roles, { ...role, id: Date.now().toString() }]
  })),
  updateRole: (id, updatedFields) => set((state) => ({
    roles: state.roles.map(r => r.id === id ? { ...r, ...updatedFields } : r)
  })),
  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter(r => r.id !== id)
  })),

  configToggles: {
    employees: true,
    roles: true,
    departments: true,
    clients: true,
    finance: true,
    systemRules: true,
  },
  toggleConfig: (key) => set((state) => ({
    configToggles: { ...state.configToggles, [key]: !state.configToggles[key] }
  }))
}));
