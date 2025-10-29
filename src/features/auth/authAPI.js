import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

export const authAPI = {
  // Login with email and password
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      return {
        uid: user.uid,
        email: user.email,
        ...userData
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Register new user
  async register(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update display name
      await updateProfile(user, { displayName: name });
      
      // Create user document in Firestore
      const userData = {
        name,
        email: user.email,
        role: 'customer',
        udhariBalance: 0,
        creditLimit: 5000,
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      return {
        uid: user.uid,
        ...userData
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Google sign in
  async googleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        const userData = {
          name: user.displayName || 'Google User',
          email: user.email,
          role: 'customer',
          udhariBalance: 0,
          creditLimit: 5000,
          totalOrders: 0,
          totalSpent: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        
        return {
          uid: user.uid,
          ...userData
        };
      }
      
      return {
        uid: user.uid,
        ...userDoc.data()
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Logout
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get current user data
  async getCurrentUser() {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) return null;
      
      return {
        uid: user.uid,
        email: user.email,
        ...userDoc.data()
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};