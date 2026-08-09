import initializeAdmin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!initializeAdmin.apps.length) {
  initializeAdmin.initializeApp({
    projectId: 'glitchcloud-in'
  });
}

const db = initializeAdmin.firestore();

const SEED_USERS = [
  { 
    uid: 'demo-admin-01', 
    name: 'Alice Founder', 
    email: 'admin@glitchcloud.com', 
    role: 'admin', 
    department: 'Leadership & Executive',
    assignedProjects: ['GlitchCloud Core', 'Alpha Brand', 'Beta Tech', 'Zeta Fashion']
  },
  { 
    uid: 'demo-pm-02', 
    name: 'Bob Lead', 
    email: 'pm@glitchcloud.com', 
    role: 'project_manager', 
    department: 'Operations & Delivery',
    assignedProjects: ['Alpha Brand Summer Teaser', 'Beta Tech Wrap-up', 'Zeta Poster Series']
  },
  { 
    uid: 'demo-creative-03', 
    name: 'David Editor', 
    email: 'creative@glitchcloud.com', 
    role: 'creative_member', 
    department: 'Post-Production & VFX',
    assignedProjects: ['Summer Collection Teaser', 'Midnight VFX Cut']
  },
  { 
    uid: 'demo-finance-04', 
    name: 'Fiona Accountant', 
    email: 'finance@glitchcloud.com', 
    role: 'finance', 
    department: 'Finance & Accounting',
    assignedProjects: ['Q2 Client Billing Audit', 'Retainer Ledger 2024']
  },
  { 
    uid: 'demo-hr-05', 
    name: 'Hannah HR', 
    email: 'hr@glitchcloud.com', 
    role: 'hr', 
    department: 'Human Resources & Talent',
    assignedProjects: ['Engineering Recruitment', 'Q3 Performance Appraisals']
  },
];

const SEED_PROJECTS = [
  { id: 'proj-101', name: 'Alpha Brand - Summer Campaign', client: 'Alpha Brand', format: 'Video & Poster', status: 'Active', retainerValue: 50000, lead: 'David Editor' },
  { id: 'proj-102', name: 'Beta Tech - Q2 Product Launch', client: 'Beta Tech', format: 'Video', status: 'Active', retainerValue: 35000, lead: 'Alice Founder' },
  { id: 'proj-103', name: 'Zeta Fashion - Poster Series', client: 'Zeta Fashion', format: 'Poster', status: 'Active', retainerValue: 65000, lead: 'Eve Designer' },
  { id: 'proj-104', name: 'Gamma Corp - Platform Reveal', client: 'Gamma Corp', format: 'Video', status: 'Inactive', retainerValue: 80000, lead: 'Bob Lead' }
];

const SEED_WORKLOGS = [
  { id: 't101', key: 'GC-101', title: 'Render Neon Campaign Teaser Video', client: 'Alpha Brand', status: 'Backlog', priority: 'High', type: 'Task', assignee: { id: 'demo-creative-03', name: 'David Editor' } },
  { id: 't102', key: 'GC-102', title: 'Client Review: Obsidian Project Cut', client: 'Beta Tech', status: 'In Progress', priority: 'Urgent', type: 'Task', assignee: { id: 'demo-pm-02', name: 'Bob Lead' } },
  { id: 't103', key: 'GC-103', title: "Approve 'Midnight' VFX Sequence", client: 'Zeta Fashion', status: 'Review', priority: 'Urgent', type: 'Bug', assignee: { id: 'demo-admin-01', name: 'Alice Founder' } },
  { id: 't104', key: 'GC-104', title: 'Finalize Q3 Budget & Retainer Allocation', client: 'Gamma Corp', status: 'Done', priority: 'Medium', type: 'Task', assignee: { id: 'demo-finance-04', name: 'Fiona Accountant' } }
];

const SEED_FINANCIALS = [
  { id: 'fin-01', title: 'Total Revenue', value: '₹2,84,500', subValue: 'YTD Performance', change: '+14.2%', isPositive: true },
  { id: 'fin-02', title: 'Total Expenses', value: '₹92,140', subValue: 'Operating Costs', change: '-2.4%', isPositive: false },
  { id: 'fin-03', title: 'Pending Receivables', value: '₹45,800', subValue: '12 Unpaid Invoices', change: '12 Awaiting', isPositive: true },
  { id: 'fin-04', title: 'Monthly Payroll Budget', value: '₹1,45,000', subValue: 'Staff Disbursements', change: '+5.0%', isPositive: true }
];

async function seedServerAdmin() {
  console.log('🌱 [Admin Seed] Seeding server Firestore on `glitchcloud-in`...');

  for (const u of SEED_USERS) {
    await db.collection('users').doc(u.uid).set(u, { merge: true });
    console.log(`  ✓ Seeded User: ${u.name} (${u.role})`);
  }

  for (const p of SEED_PROJECTS) {
    await db.collection('projects').doc(p.id).set(p, { merge: true });
    console.log(`  ✓ Seeded Project: ${p.name}`);
  }

  for (const w of SEED_WORKLOGS) {
    await db.collection('worklogs').doc(w.id).set(w, { merge: true });
    console.log(`  ✓ Seeded Worklog: ${w.key} - ${w.title}`);
  }

  for (const f of SEED_FINANCIALS) {
    await db.collection('financials').doc(f.id).set(f, { merge: true });
    console.log(`  ✓ Seeded Financial: ${f.title}`);
  }

  console.log('🎉 [Admin Seed] All server dummy data seeded successfully!');
}

seedServerAdmin().catch(err => console.error('❌ Admin Seed Error:', err.message));
