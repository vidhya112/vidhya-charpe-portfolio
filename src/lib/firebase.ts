import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getAnalytics, Analytics, logEvent, isSupported } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { ContactFormData } from '../types';

// Environment-based Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY'
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    isSupported().then((supported) => {
      if (supported && app) {
        analytics = getAnalytics(app);
      }
    });
  } catch (err) {
    console.warn('[Firebase] Initialization error, using fallback mode:', err);
  }
} else {
  console.info('[Firebase] Config keys not detected. Operating in resilient client demo mode.');
}

export { app, db, analytics, auth, isFirebaseConfigured };

// Secure Contact Form Processing
export async function submitContact(data: ContactFormData): Promise<{ success: boolean; id?: string; message: string }> {
  // Anti-spam honeypot check
  if (data.honeypot) {
    console.warn('[Anti-Spam] Honeypot triggered. Silently discarding.');
    return { success: true, message: 'Message received.' };
  }

  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    projectType: data.projectType,
    budgetRange: data.budgetRange || 'Not specified',
    message: data.message.trim(),
    source: 'portfolio_cinematic',
    submittedAt: db ? serverTimestamp() : new Date().toISOString(),
    status: 'new',
  };

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), payload);
      return { success: true, id: docRef.id, message: 'Your message has been sent successfully!' };
    } catch (error) {
      console.error('[Firebase] Firestore contact write error:', error);
      // Fall back to local simulation so user flow doesn't break
      saveFallbackContact(payload);
      return { success: true, id: 'fallback-' + Date.now(), message: 'Your message has been received!' };
    }
  } else {
    // Demo fallback mode (persists to localStorage for verification in admin demo)
    saveFallbackContact(payload);
    return { success: true, id: 'demo-' + Date.now(), message: 'Your message has been received! (Demo Mode)' };
  }
}

function saveFallbackContact(payload: Record<string, unknown>) {
  try {
    const existing = JSON.parse(localStorage.getItem('vidhya_portfolio_contacts') || '[]');
    existing.unshift({ ...payload, id: 'local_' + Date.now() });
    localStorage.setItem('vidhya_portfolio_contacts', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // localStorage silent catch
  }
}

export async function fetchRecentContacts() {
  if (db) {
    try {
      const q = query(collection(db, 'contacts'), orderBy('submittedAt', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn('[Firebase] Could not fetch remote contacts, falling back to local:', err);
    }
  }
  try {
    return JSON.parse(localStorage.getItem('vidhya_portfolio_contacts') || '[]');
  } catch {
    return [];
  }
}

export function logAnalyticsEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch (err) {
      console.debug('[Analytics] Failed to log event:', err);
    }
  }
}
