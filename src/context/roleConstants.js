export const CORPORATE_ROLES_LIST = [
  "Founder",
  "CEO",
  "CFO",
  "COO",
  "Creative Head",
  "Social Media Manager",
  "Senior Video Editor",
  "Junior Video Editor",
  "Senior Graphic Designer",
  "Junior Graphic Designer",
  "Senior Cinematographer",
  "Junior Cinematographer",
  "Senior VFX Artist",
  "Junior VFX Artist",
  "Senior HR",
  "Junior HR",
  "Senior Accountant",
  "Junior Accountant",
  "Business Development Agent",
  "Senior Photographer",
  "Junior Photographer",
  "Ads Manager"
];

export const ROLES = {
  FOUNDER: 'Founder',
  CEO: 'CEO',
  CFO: 'CFO',
  COO: 'COO',
  CREATIVE_HEAD: 'Creative Head',
  SOCIAL_MEDIA_MANAGER: 'Social Media Manager',
  SENIOR_VIDEO_EDITOR: 'Senior Video Editor',
  JUNIOR_VIDEO_EDITOR: 'Junior Video Editor',
  SENIOR_GRAPHIC_DESIGNER: 'Senior Graphic Designer',
  JUNIOR_GRAPHIC_DESIGNER: 'Junior Graphic Designer',
  SENIOR_CINEMATOGRAPHER: 'Senior Cinematographer',
  JUNIOR_CINEMATOGRAPHER: 'Junior Cinematographer',
  SENIOR_VFX_ARTIST: 'Senior VFX Artist',
  JUNIOR_VFX_ARTIST: 'Junior VFX Artist',
  SENIOR_HR: 'Senior HR',
  JUNIOR_HR: 'Junior HR',
  SENIOR_ACCOUNTANT: 'Senior Accountant',
  JUNIOR_ACCOUNTANT: 'Junior Accountant',
  BUSINESS_DEVELOPMENT: 'Business Development Agent',
  SENIOR_PHOTOGRAPHER: 'Senior Photographer',
  JUNIOR_PHOTOGRAPHER: 'Junior Photographer',
  ADS_MANAGER: 'Ads Manager',
  
  // Legacy alias mapping
  ADMIN: 'Founder',
  PROJECT_MANAGER: 'Creative Head',
  CREATIVE_MEMBER: 'Senior Video Editor',
  FINANCE: 'Senior Accountant',
  HR: 'Senior HR',
};

// Numerical hierarchy ranking (Higher number = Higher corporate level)
export const ROLE_HIERARCHY = {
  "Founder": 100,
  "CEO": 95,
  "CFO": 90,
  "COO": 90,
  "Creative Head": 85,
  "Senior HR": 80,
  "Senior Accountant": 75,
  "Social Media Manager": 60,
  "Senior Video Editor": 60,
  "Senior Graphic Designer": 60,
  "Senior Cinematographer": 60,
  "Senior VFX Artist": 60,
  "Senior Photographer": 60,
  "Ads Manager": 60,
  "Business Development Agent": 60,
  "Junior HR": 40,
  "Junior Accountant": 40,
  "Junior Video Editor": 40,
  "Junior Graphic Designer": 40,
  "Junior Cinematographer": 40,
  "Junior VFX Artist": 40,
  "Junior Photographer": 40,
  
  // Legacy aliases
  admin: 100,
  project_manager: 80,
  hr: 70,
  finance: 60,
  creative_member: 40
};

export const ROLE_DETAILS = {
  "Founder": {
    id: "Founder",
    title: "Founder",
    scope: "Full global system administration & corporate ownership.",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  "CEO": {
    id: "CEO",
    title: "Chief Executive Officer",
    scope: "Executive management, strategic direction, and operations.",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  "CFO": {
    id: "CFO",
    title: "Chief Financial Officer",
    scope: "Financial strategy, budgets, retainers, and accounting telemetry.",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  "COO": {
    id: "COO",
    title: "Chief Operating Officer",
    scope: "Operations, project management, and creative delivery pipeline.",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  "Creative Head": {
    id: "Creative Head",
    title: "Creative Head",
    scope: "Agency creative direction, production leads, and review pipelines.",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  "Senior HR": {
    id: "Senior HR",
    title: "Senior HR",
    scope: "Personnel management, employee onboarding, recruitment, and admin control.",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
  "Junior HR": {
    id: "Junior HR",
    title: "Junior HR",
    scope: "Talent acquisition support and team directory records.",
    badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },
  "Senior Accountant": {
    id: "Senior Accountant",
    title: "Senior Accountant",
    scope: "Financial operations, client invoicing, and expense ledgers.",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  "Senior Video Editor": {
    id: "Senior Video Editor",
    title: "Senior Video Editor",
    scope: "Post-production, video editing, and campaign asset delivery.",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
};

export const DEPARTMENT_TAGS = {
  ADMIN_ONLY: 'admin_only',
  OPERATIONS_CREATIVE: 'operations_creative',
  FINANCE_BILLING: 'finance_billing',
  HR_PERSONNEL: 'hr_personnel',
};

export const ROLE_FOLDER_PERMISSIONS = {
  "Founder": {
    [DEPARTMENT_TAGS.ADMIN_ONLY]: 'full',
    [DEPARTMENT_TAGS.OPERATIONS_CREATIVE]: 'full',
    [DEPARTMENT_TAGS.FINANCE_BILLING]: 'full',
    [DEPARTMENT_TAGS.HR_PERSONNEL]: 'full',
  },
  "CEO": {
    [DEPARTMENT_TAGS.ADMIN_ONLY]: 'full',
    [DEPARTMENT_TAGS.OPERATIONS_CREATIVE]: 'full',
    [DEPARTMENT_TAGS.FINANCE_BILLING]: 'full',
    [DEPARTMENT_TAGS.HR_PERSONNEL]: 'full',
  },
  "Creative Head": {
    [DEPARTMENT_TAGS.ADMIN_ONLY]: 'none',
    [DEPARTMENT_TAGS.OPERATIONS_CREATIVE]: 'full',
    [DEPARTMENT_TAGS.FINANCE_BILLING]: 'none',
    [DEPARTMENT_TAGS.HR_PERSONNEL]: 'none',
  },
  "Senior Accountant": {
    [DEPARTMENT_TAGS.ADMIN_ONLY]: 'none',
    [DEPARTMENT_TAGS.OPERATIONS_CREATIVE]: 'read_only',
    [DEPARTMENT_TAGS.FINANCE_BILLING]: 'full',
    [DEPARTMENT_TAGS.HR_PERSONNEL]: 'none',
  },
  "Senior HR": {
    [DEPARTMENT_TAGS.ADMIN_ONLY]: 'full',
    [DEPARTMENT_TAGS.OPERATIONS_CREATIVE]: 'none',
    [DEPARTMENT_TAGS.FINANCE_BILLING]: 'partial',
    [DEPARTMENT_TAGS.HR_PERSONNEL]: 'full',
  },
  admin: {
    [DEPARTMENT_TAGS.ADMIN_ONLY]: 'full',
    [DEPARTMENT_TAGS.OPERATIONS_CREATIVE]: 'full',
    [DEPARTMENT_TAGS.FINANCE_BILLING]: 'full',
    [DEPARTMENT_TAGS.HR_PERSONNEL]: 'full',
  }
};

export const DEFAULT_ROLE_DEPARTMENTS = {
  "Founder": "Leadership & Executive",
  "CEO": "Leadership & Executive",
  "CFO": "Finance & Accounting",
  "COO": "Operations & Delivery",
  "Creative Head": "Creative & Media Production",
  "Social Media Manager": "Marketing & Growth",
  "Senior Video Editor": "Post-Production & VFX",
  "Junior Video Editor": "Post-Production & VFX",
  "Senior Graphic Designer": "Creative & Media Production",
  "Junior Graphic Designer": "Creative & Media Production",
  "Senior Cinematographer": "Creative & Media Production",
  "Junior Cinematographer": "Creative & Media Production",
  "Senior VFX Artist": "Post-Production & VFX",
  "Junior VFX Artist": "Post-Production & VFX",
  "Senior HR": "Human Resources & Talent",
  "Junior HR": "Human Resources & Talent",
  "Senior Accountant": "Finance & Accounting",
  "Junior Accountant": "Finance & Accounting",
  "Business Development Agent": "Marketing & Growth",
  "Senior Photographer": "Creative & Media Production",
  "Junior Photographer": "Creative & Media Production",
  "Ads Manager": "Marketing & Growth"
};

export const ROLE_NAV_PERMISSIONS = {
  "Founder": ['dashboard', 'analytics', 'team', 'calendar', 'clients', 'financials', 'worklogs', 'admin'],
  "CEO": ['dashboard', 'analytics', 'team', 'calendar', 'clients', 'financials', 'worklogs', 'admin'],
  "COO": ['dashboard', 'analytics', 'team', 'calendar', 'clients', 'worklogs', 'admin'],
  "CFO": ['dashboard', 'analytics', 'team', 'clients', 'financials', 'admin'],
  "Creative Head": ['dashboard', 'analytics', 'team', 'calendar', 'clients', 'worklogs'],
  "Senior HR": ['dashboard', 'analytics', 'team', 'admin'],
  "Junior HR": ['dashboard', 'analytics', 'team'],
  "Senior Accountant": ['dashboard', 'analytics', 'team', 'clients', 'financials'],
  "Junior Accountant": ['dashboard', 'analytics', 'team', 'clients', 'financials'],
  "Senior Video Editor": ['dashboard', 'analytics', 'team', 'calendar', 'worklogs'],
  "Junior Video Editor": ['dashboard', 'analytics', 'team', 'calendar', 'worklogs'],
  "Senior VFX Artist": ['dashboard', 'analytics', 'team', 'calendar', 'worklogs'],
  
  // Legacy aliases
  admin: ['dashboard', 'analytics', 'team', 'calendar', 'clients', 'financials', 'worklogs', 'admin'],
  project_manager: ['dashboard', 'analytics', 'team', 'calendar', 'clients', 'worklogs'],
  creative_member: ['dashboard', 'analytics', 'team', 'calendar', 'worklogs'],
  finance: ['dashboard', 'analytics', 'team', 'clients', 'financials'],
  hr: ['dashboard', 'analytics', 'team', 'admin'],
};

export function canUserModifyTargetRole(actorRole, targetRole) {
  if (!actorRole || !targetRole) return false;
  const actorRank = ROLE_HIERARCHY[actorRole] || 0;
  const targetRank = ROLE_HIERARCHY[targetRole] || 0;

  if (actorRole === 'Founder' || actorRole === 'admin') return true;

  const allowedControlRoles = ['Founder', 'CEO', 'Senior HR', 'admin', 'hr'];
  if (!allowedControlRoles.includes(actorRole)) return false;

  return actorRank > targetRank;
}

export const MOCK_FIRESTORE_USERS = [
  { 
    uid: 'demo-founder-01', 
    name: 'Alice Founder', 
    email: 'founder@glitchcloud.in', 
    role: 'Founder', 
    department: 'Leadership & Executive',
    isFirstLogin: false,
    assignedProjects: ['GlitchCloud Core', 'Alpha Brand', 'Beta Tech', 'Zeta Fashion']
  },
  { 
    uid: 'demo-creative-02', 
    name: 'Bob Lead', 
    email: 'bob@glitchcloud.in', 
    role: 'Creative Head', 
    department: 'Operations & Production',
    isFirstLogin: false,
    assignedProjects: ['Alpha Brand Summer Teaser', 'Beta Tech Wrap-up']
  },
  { 
    uid: 'demo-editor-03', 
    name: 'Charlie Editor', 
    email: 'charlie@glitchcloud.in', 
    role: 'Senior Video Editor', 
    department: 'Post-Production & VFX',
    isFirstLogin: false,
    assignedProjects: ['Summer Collection Teaser', 'Midnight VFX Cut']
  },
  { 
    uid: 'demo-hr-04', 
    name: 'Diana People', 
    email: 'diana@glitchcloud.in', 
    role: 'Senior HR', 
    department: 'Human Resources & Talent',
    isFirstLogin: false,
    assignedProjects: ['Engineering Recruitment', 'Performance Reviews']
  },
  { 
    uid: 'demo-vfx-05', 
    name: 'Evan VFX', 
    email: 'evan@glitchcloud.in', 
    role: 'Senior VFX Artist', 
    department: 'Post-Production & VFX',
    isFirstLogin: false,
    assignedProjects: ['3D CGI Teaser', 'Visual Effects Cut']
  },
  { 
    uid: 'demo-finance-06', 
    name: 'Fiona Finance', 
    email: 'fiona@glitchcloud.in', 
    role: 'Senior Accountant', 
    department: 'Finance & Accounting',
    isFirstLogin: false,
    assignedProjects: ['Q2 Client Billing Audit', 'Retainer Ledger']
  },
];
