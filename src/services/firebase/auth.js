import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './config';

export const authService = {
  async login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const u = cred.user;
    const snap = await getDoc(doc(db, 'users', u.uid));
    return { uid: u.uid, email: u.email, ...(snap.exists() ? snap.data() : { role: 'customer' }) };
  },

  async signup(email, password, name) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const u = cred.user;
    if (name) await updateProfile(u, { displayName: name });
    const userData = {
      name: name || u.displayName || '',
      email: u.email,
      role: 'customer',
      udhariBalance: 0,
      creditLimit: 5000,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', u.uid), userData);
    return { uid: u.uid, ...userData };
  },

  async loginWithGoogle() {
    const res = await signInWithPopup(auth, googleProvider);
    const u = res.user;
    const ref = doc(db, 'users', u.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const userData = {
        name: u.displayName || 'Google User',
        email: u.email,
        role: 'customer',
        udhariBalance: 0,
        creditLimit: 5000,
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(ref, userData);
      return { uid: u.uid, ...userData };
    }
    return { uid: u.uid, ...snap.data() };
  },

  async logout() {
    await signOut(auth);
    return true;
  },

  onAuthStateChange(cb) {
    return onAuthStateChanged(auth, cb);
  },

  async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
    return true;
  },
};