import { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// ==================== CREATE CONTEXT ====================
export const AuthContext = createContext();

// ==================== CUSTOM HOOK ====================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ==================== PROVIDER COMPONENT ====================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==================== AUTH STATE LISTENER ====================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed:', currentUser?.email);
      
      if (currentUser) {
        try {
          // Fetch user role from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data loaded:', userData.role);
            setUser(currentUser);
            setUserRole(userData.role);
          } else {
            console.warn('User document not found in Firestore');
            setUser(null);
            setUserRole(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          setUserRole(null);
        }
      } else {
        console.log('No user logged in');
        setUser(null);
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ==================== SIGNUP FUNCTION ====================
  const signup = async (email, password, displayName, role = 'customer') => {
    try {
      console.log('Signing up user:', email, 'as', role);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName });

      const userDocRef = doc(db, 'users', newUser.uid);
      await setDoc(userDocRef, {
        uid: newUser.uid,
        email: email,
        displayName: displayName,
        role: role,
        createdAt: new Date(),
        phoneNumber: '',
        address: '',
        photoURL: '',
        status: 'active'
      });

      console.log('User created successfully');
      setUserRole(role);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Signup error:', error);
      
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // ==================== LOGIN FUNCTION ====================
  const login = async (email, password, expectedRole = null) => {
    try {
      console.log('Logging in user:', email, 'Expected role:', expectedRole);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      const userDocRef = doc(db, 'users', loggedInUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        console.error('User document not found');
        await signOut(auth);
        return { 
          success: false, 
          error: 'User data not found. Please contact support.' 
        };
      }

      const userData = userDoc.data();
      console.log('User logged in with role:', userData.role);
      
      if (expectedRole && userData.role !== expectedRole) {
        console.warn('Role mismatch:', userData.role, 'vs', expectedRole);
        await signOut(auth);
        return { 
          success: false, 
          error: `Access denied. This is ${expectedRole} login only.` 
        };
      }

      setUserRole(userData.role);
      
      return { 
        success: true, 
        role: userData.role,
        user: loggedInUser 
      };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // ==================== LOGOUT FUNCTION ====================
  const logout = async () => {
    try {
      console.log('Logging out user');
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      localStorage.removeItem('cart');
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        error: 'Failed to logout. Please try again.' 
      };
    }
  };

  // ==================== PASSWORD RESET ====================
  const resetPassword = async (email) => {
    try {
      console.log('Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      
      return { 
        success: true,
        message: 'Password reset email sent. Please check your inbox.' 
      };
    } catch (error) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // ==================== UPDATE USER PROFILE ====================
  const updateUserProfile = async (updates) => {
    try {
      if (!user) return { success: false, error: 'No user logged in' };

      if (updates.displayName) {
        await updateProfile(user, { displayName: updates.displayName });
      }

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, updates, { merge: true });

      console.log('Profile updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { 
        success: false, 
        error: 'Failed to update profile.' 
      };
    }
  };

  // ==================== CHECK IF USER IS ADMIN ====================
  const isAdmin = () => {
    return userRole === 'admin';
  };

  // ==================== CHECK IF USER IS CUSTOMER ====================
  const isCustomer = () => {
    return userRole === 'customer';
  };

  // ==================== GET USER DATA ====================
  const getUserData = async () => {
    try {
      if (!user) return null;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // ==================== CONTEXT VALUE ====================
  const value = {
    user,
    userRole,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    isAdmin,
    isCustomer,
    getUserData
  };

  // ==================== RENDER PROVIDER ====================
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;