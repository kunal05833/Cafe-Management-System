<<<<<<< HEAD
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../../firebase/config';
import toast from 'react-hot-toast';

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      return {
        uid: user.uid,
        email: user.email,
        ...userData
      };
    } catch (error) {
      throw error.message;
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      const userData = {
        name,
        email: user.email,
        role: 'customer',
        udhariBalance: 0,
        udhariLimit: 5000,
        transactions: [],
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      return {
        uid: user.uid,
        ...userData
      };
    } catch (error) {
      throw error.message;
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/googleLogin',
  async () => {
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
          udhariLimit: 5000,
          transactions: [],
          createdAt: new Date().toISOString()
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
      throw error.message;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await signOut(auth);
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  },
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/firebase/auth';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const user = await authService.login(email, password);
  return user;
});

export const signupUser = createAsyncThunk('auth/signup', async ({ email, password, name }) => {
  const user = await authService.signup(email, password, name);
  return user;
});

export const loginWithGoogle = createAsyncThunk('auth/googleLogin', async () => {
  const user = await authService.loginWithGoogle();
  return user;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
<<<<<<< HEAD
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        toast.success('Logged in successfully!');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        toast.success('Account created successfully!');
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        toast.success('Logged in with Google!');
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        toast.success('Logged out successfully!');
      });
=======
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => { s.isLoading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => { s.isLoading = false; s.user = a.payload; s.isAuthenticated = true; })
      .addCase(loginUser.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message || 'Login failed'; })
      .addCase(signupUser.pending, (s) => { s.isLoading = true; s.error = null; })
      .addCase(signupUser.fulfilled, (s, a) => { s.isLoading = false; s.user = a.payload; s.isAuthenticated = true; })
      .addCase(signupUser.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message || 'Signup failed'; })
      .addCase(loginWithGoogle.pending, (s) => { s.isLoading = true; s.error = null; })
      .addCase(loginWithGoogle.fulfilled, (s, a) => { s.isLoading = false; s.user = a.payload; s.isAuthenticated = true; })
      .addCase(loginWithGoogle.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message || 'Google login failed'; })
      .addCase(logoutUser.pending, (s) => { s.isLoading = true; })
      .addCase(logoutUser.fulfilled, (s) => { s.isLoading = false; s.user = null; s.isAuthenticated = false; })
      .addCase(logoutUser.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message || 'Logout failed'; });
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  }
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;