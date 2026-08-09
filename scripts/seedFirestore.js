import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, doc, setDoc, collection, getDocs 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemoConfigKeyForGlitchCloudApp12345",
  authDomain: "glitchcloud-in.firebaseapp.com",
  projectId: "glitchcloud-in",
  storageBucket: "glitchcloud-in.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

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

async function seedServer() {
  console.log('🌱 [Firestore Seed] Seeding server database collections on `glitchcloud-in`...');

  // Seed Users
  for (const user of SEED_USERS) {
    await setDoc(doc(db, 'users', user.uid), user, { merge: true });
    console.log(`  ✓ Seeded User: ${user.name} (${user.role})`);
  }

  // Seed Projects
  for (const proj of SEED_PROJECTS) {
    await setDoc(doc(db, 'projects', proj.id), proj, { merge: true });
    console.log(`  ✓ Seeded Project: ${proj.name}`);
  }

  // Seed Worklogs
  for (const task of SEED_WORKLOGS) {
    await setDoc(doc(db, 'worklogs', task.id), task, { merge: true });
    console.log(`  ✓ Seeded Worklog: ${task.key} - ${task.title}`);
  }

  // Seed Financials
  for (const fin of SEED_FINANCIALS) {
    await setDoc(doc(db, 'financials', fin.id), fin, { merge: true });
    console.log(`  ✓ Seeded Financial Record: ${fin.title}`);
  }

  console.log('🎉 [Firestore Seed] All server dummy data seeded successfully!');
}

seedServer().catch(err => console.error('❌ Seeding failed:', err));
