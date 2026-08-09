import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs 
} from 'firebase/firestore';

// Environment or default demo configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoConfigKeyForGlitchCloudApp12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "glitchcloud-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "glitchcloud-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "glitchcloud-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456789"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Fetch employee user profile document from Firestore (`/users/{uid}`)
 */
export async function fetchUserProfileFromFirestore(uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
  } catch (err) {
    console.warn('[Firebase] Firestore fetch failed or unconfigured, using fallback:', err.message);
  }
  return null;
}

/**
 * Create or update user profile document in Firestore (`/users/{uid}`)
 */
export async function saveUserProfileToFirestore(uid, profileData) {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      uid,
      name: profileData.name || 'GlitchCloud Employee',
      email: profileData.email || '',
      role: profileData.role || 'Senior Video Editor',
      department: profileData.department || 'Post-Production & VFX',
      status: profileData.status || 'Active',
      isFirstLogin: profileData.isFirstLogin !== undefined ? profileData.isFirstLogin : true,
      assignedProjects: profileData.assignedProjects || ['Summer Teaser', 'Posters Series'],
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase] Firestore save failed:', err.message);
    return false;
  }
}

/**
 * Admin action: Update an employee's assigned role in Firestore (`/users/{uid}`)
 */
export async function adminUpdateUserRoleInFirestore(uid, newRole) {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { role: newRole });
    return true;
  } catch (err) {
    console.warn('[Firebase] Admin role update failed:', err.message);
    return false;
  }
}
