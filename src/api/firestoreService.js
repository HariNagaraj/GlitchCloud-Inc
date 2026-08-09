import { 
  db 
} from '../config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';

/**
 * ============================================================================
 * FIRESTORE SERVICE - SYMMETRIC REAL-TIME MESSAGING & PRESENCE PIPELINE
 * ============================================================================
 */

export const getDmRoomId = (uid1, uid2) => {
  if (!uid1 || !uid2) return 'general_dm';
  return [uid1, uid2].sort().join('_');
};

const SEED_USERS = [
  { 
    id: 'demo-admin-01',
    uid: 'demo-admin-01', 
    name: 'Alice Founder', 
    email: 'admin@glitchcloud.com', 
    role: 'admin', 
    department: 'Leadership & Executive',
    assignedProjects: ['GlitchCloud Core', 'Alpha Brand', 'Beta Tech', 'Zeta Fashion']
  },
  { 
    id: 'demo-pm-02',
    uid: 'demo-pm-02', 
    name: 'Bob Lead', 
    email: 'pm@glitchcloud.com', 
    role: 'project_manager', 
    department: 'Operations & Delivery',
    assignedProjects: ['Alpha Brand Summer Teaser', 'Beta Tech Wrap-up', 'Zeta Poster Series']
  },
  { 
    id: 'demo-creative-03',
    uid: 'demo-creative-03', 
    name: 'David Editor', 
    email: 'creative@glitchcloud.com', 
    role: 'creative_member', 
    department: 'Post-Production & VFX',
    assignedProjects: ['Summer Collection Teaser', 'Midnight VFX Cut']
  },
  { 
    id: 'demo-finance-04',
    uid: 'demo-finance-04', 
    name: 'Fiona Accountant', 
    email: 'finance@glitchcloud.com', 
    role: 'finance', 
    department: 'Finance & Accounting',
    assignedProjects: ['Q2 Client Billing Audit', 'Retainer Ledger 2024']
  },
  { 
    id: 'demo-hr-05',
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

// --- 1. USER PROFILES COLLECTION (`users/{uid}`) ---

export async function fetchAllUserProfiles() {
  try {
    const q = query(collection(db, 'users'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (docs.length > 0) return docs;
  } catch (err) {
    console.warn('[FirestoreService] fetchAllUserProfiles using seed fallback:', err.message);
  }
  return SEED_USERS;
}

export async function fetchUserProfile(uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (err) {
    console.warn('[FirestoreService] fetchUserProfile error:', err.message);
  }
  return SEED_USERS.find(u => u.uid === uid) || null;
}

export async function updateUserProfile(uid, profileData) {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('[FirestoreService] updateUserProfile error:', err.message);
    return false;
  }
}

// --- 2. REAL-TIME TEAMS MESSAGING & CHANNELS ---

export function subscribeToChannelMessages(channelId, callback) {
  try {
    const chatPath = `channels/${channelId}/messages`;
    console.log('[Firestore] Subscribed to path:', chatPath);

    const messagesRef = collection(db, 'channels', channelId, 'messages');
    
    // Direct collection query avoiding composite index requirements
    return onSnapshot(messagesRef, { includeMetadataChanges: true }, (snapshot) => {
      const msgs = snapshot.docs.map(d => {
        const data = d.data() || {};
        
        // Robust timestamp extraction handling optimistic nulls
        let formattedTime = "Sending...";
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          formattedTime = data.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (data.timestamp && typeof data.timestamp === 'string') {
          formattedTime = data.timestamp;
        } else if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          formattedTime = data.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        const rawTime = data.createdAt?.toMillis?.() || (data.createdAt?.seconds * 1000) || data.clientTimestamp || 0;

        return {
          id: d.id,
          senderId: data.senderUid || data.senderId || 'unknown',
          senderName: data.senderName || 'Team Member',
          senderRole: data.senderRole || 'Employee',
          text: data.text || '',
          isUrgent: !!data.isUrgent,
          timestamp: formattedTime,
          sortTime: rawTime,
          hasPendingWrites: !!d.metadata?.hasPendingWrites
        };
      });

      // Client-side sort safely by timestamp
      msgs.sort((a, b) => a.sortTime - b.sortTime);

      console.log(`[Firestore] New snapshot received for ${chatPath}, count:`, msgs.length);
      callback(msgs);
    }, (err) => {
      console.error('[Firestore Chat Error] Channel subscription error:', err);
      callback([]);
    });
  } catch (err) {
    console.error('[Firestore Chat Error] Channel subscription init error:', err);
    return () => {};
  }
}

export function subscribeToDmMessages(user1Uid, user2Uid, callback) {
  try {
    if (!user1Uid || !user2Uid) return () => {};
    const roomId = getDmRoomId(user1Uid, user2Uid);
    const chatPath = `direct_messages/${roomId}/messages`;
    console.log('[Firestore] Subscribed to path:', chatPath);

    const messagesRef = collection(db, 'direct_messages', roomId, 'messages');
    
    // Direct collection query avoiding composite index requirements
    return onSnapshot(messagesRef, { includeMetadataChanges: true }, (snapshot) => {
      const msgs = snapshot.docs.map(d => {
        const data = d.data() || {};
        
        // Robust timestamp extraction handling optimistic nulls
        let formattedTime = "Sending...";
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          formattedTime = data.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (data.timestamp && typeof data.timestamp === 'string') {
          formattedTime = data.timestamp;
        } else if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          formattedTime = data.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        const rawTime = data.createdAt?.toMillis?.() || (data.createdAt?.seconds * 1000) || data.clientTimestamp || 0;

        return {
          id: d.id,
          senderId: data.senderUid || data.senderId || 'unknown',
          senderName: data.senderName || 'Team Member',
          senderRole: data.senderRole || 'Employee',
          text: data.text || '',
          isUrgent: !!data.isUrgent,
          timestamp: formattedTime,
          sortTime: rawTime,
          hasPendingWrites: !!d.metadata?.hasPendingWrites
        };
      });

      // Client-side sort safely by timestamp
      msgs.sort((a, b) => a.sortTime - b.sortTime);

      console.log(`[Firestore] New snapshot received for ${chatPath}, count:`, msgs.length);
      callback(msgs);
    }, (err) => {
      console.error('[Firestore Chat Error] DM subscription error:', err);
      callback([]);
    });
  } catch (err) {
    console.error('[Firestore Chat Error] DM subscription init error:', err);
    return () => {};
  }
}

export async function sendChannelMessage(channelId, messageData) {
  try {
    const chatPath = `channels/${channelId}/messages`;
    const messagesRef = collection(db, 'channels', channelId, 'messages');
    await addDoc(messagesRef, {
      senderUid: messageData.senderId || messageData.senderUid,
      senderName: messageData.senderName,
      senderRole: messageData.senderRole,
      text: messageData.text,
      isUrgent: messageData.isUrgent || false,
      createdAt: serverTimestamp(),
      clientTimestamp: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    console.log('[Firestore] Message sent to:', chatPath);
    return true;
  } catch (err) {
    console.error('[Firestore Chat Error] sendChannelMessage error:', err);
    return false;
  }
}

export async function sendDmMessage(user1Uid, user2Uid, messageData) {
  try {
    const roomId = getDmRoomId(user1Uid, user2Uid);
    const chatPath = `direct_messages/${roomId}/messages`;
    const messagesRef = collection(db, 'direct_messages', roomId, 'messages');
    await addDoc(messagesRef, {
      senderUid: messageData.senderId || messageData.senderUid,
      senderName: messageData.senderName,
      senderRole: messageData.senderRole,
      text: messageData.text,
      isUrgent: messageData.isUrgent || false,
      createdAt: serverTimestamp(),
      clientTimestamp: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    console.log('[Firestore] DM Message sent to:', chatPath);
    return true;
  } catch (err) {
    console.error('[Firestore Chat Error] sendDmMessage error:', err);
    return false;
  }
}

// --- 3. TEAMS PRESENCE & ONLINE STATUS ---

export function subscribeToUserPresence(callback) {
  try {
    const presenceRef = collection(db, 'presence');
    return onSnapshot(presenceRef, (snapshot) => {
      const presenceMap = {};
      snapshot.docs.forEach(doc => {
        presenceMap[doc.id] = doc.data().online || false;
      });
      callback(presenceMap);
    }, (error) => {
      console.warn('[FirestoreService] presence listener error:', error.message);
      callback({});
    });
  } catch (err) {
    console.warn('[FirestoreService] presence listener init error:', err.message);
    return () => {};
  }
}

export async function setUserOnlinePresence(uid, isOnline = true) {
  if (!uid) return;
  try {
    const docRef = doc(db, 'presence', uid);
    await setDoc(docRef, {
      online: isOnline,
      lastSeen: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('[FirestoreService] setUserOnlinePresence error:', err.message);
  }
}

// --- 4. PROJECTS COLLECTION (`projects/{id}`) ---

export async function fetchProjects(userRole = 'admin', userId = null) {
  try {
    const q = query(collection(db, 'projects'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (docs.length > 0) return docs;
  } catch (err) {
    console.warn('[FirestoreService] fetchProjects using seed fallback:', err.message);
  }
  return SEED_PROJECTS;
}

export async function createProject(projectData) {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      status: projectData.status || 'Active'
    });
    return { id: docRef.id, ...projectData };
  } catch (err) {
    console.warn('[FirestoreService] createProject error:', err.message);
    return null;
  }
}

export async function updateProject(id, fields) {
  try {
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, {
      ...fields,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn('[FirestoreService] updateProject error:', err.message);
    return false;
  }
}

export async function deleteProject(id) {
  try {
    await deleteDoc(doc(db, 'projects', id));
    return true;
  } catch (err) {
    console.warn('[FirestoreService] deleteProject error:', err.message);
    return false;
  }
}

// --- 5. WORKLOGS COLLECTION (`worklogs/{id}`) ---

export async function fetchWorklogTasks() {
  try {
    const q = query(collection(db, 'worklogs'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (docs.length > 0) return docs;
  } catch (err) {
    console.warn('[FirestoreService] fetchWorklogTasks using seed fallback:', err.message);
  }
  return SEED_WORKLOGS;
}

export async function createWorklogTask(taskData) {
  try {
    const docRef = await addDoc(collection(db, 'worklogs'), {
      ...taskData,
      createdAt: serverTimestamp(),
      status: taskData.status || 'Backlog',
      timeSpent: 0
    });
    return { id: docRef.id, ...taskData };
  } catch (err) {
    console.warn('[FirestoreService] createWorklogTask error:', err.message);
    return null;
  }
}

export async function updateWorklogTaskStatus(id, newStatus, activityEntry) {
  try {
    const taskRef = doc(db, 'worklogs', id);
    const snap = await getDoc(taskRef);
    const currentData = snap.exists() ? snap.data() : {};
    const updatedActivity = [activityEntry, ...(currentData.activity || [])];

    await updateDoc(taskRef, {
      status: newStatus,
      activity: updatedActivity,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn('[FirestoreService] updateWorklogTaskStatus error:', err.message);
    return false;
  }
}

// --- 6. FINANCIALS COLLECTION (`financials/{id}`) ---

export async function fetchFinancialRecords() {
  try {
    const q = query(collection(db, 'financials'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (docs.length > 0) return docs;
  } catch (err) {
    console.warn('[FirestoreService] fetchFinancialRecords using seed fallback:', err.message);
  }
  return SEED_FINANCIALS;
}

export async function createFinancialRecord(record) {
  try {
    const docRef = await addDoc(collection(db, 'financials'), {
      ...record,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...record };
  } catch (err) {
    console.warn('[FirestoreService] createFinancialRecord error:', err.message);
    return null;
  }
}
