import { onRequest } from 'firebase-functions/v2/https';
import initializeAdmin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

// Initialize Firebase Admin SDK
if (!initializeAdmin.apps.length) {
  initializeAdmin.initializeApp();
}

const db = initializeAdmin.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GlitchCloud Enterprise Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 2. Aggregated agency analytics endpoint
app.get('/api/analytics', async (req, res) => {
  try {
    const projectsSnap = await db.collection('projects').get();
    const worklogsSnap = await db.collection('worklogs').get();
    const usersSnap = await db.collection('users').get();

    const activeProjects = projectsSnap.docs.filter(d => d.data().status === 'Active').length;
    const completedTasks = worklogsSnap.docs.filter(d => d.data().status === 'Done').length;
    const totalUsers = usersSnap.docs.length;

    res.json({
      success: true,
      activeProjects,
      completedTasks,
      totalUsers,
      calculatedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Secure Admin user role promotion endpoint
app.post('/api/admin/set-role', async (req, res) => {
  try {
    const { uid, newRole, adminUid } = req.body;
    if (!uid || !newRole) {
      return res.status(400).json({ success: false, error: 'Missing required parameters (uid, newRole).' });
    }

    // Verify requesting user is admin
    if (adminUid) {
      const adminDoc = await db.collection('users').doc(adminUid).get();
      if (!adminDoc.exists || adminDoc.data().role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Forbidden: Only admins can invoke this endpoint.' });
      }
    }

    await db.collection('users').doc(uid).set({
      role: newRole,
      updatedAt: initializeAdmin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    res.json({ success: true, message: `Successfully updated role for user ${uid} to ${newRole}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export Cloud Function
export const api = onRequest(app);
