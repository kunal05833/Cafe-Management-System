import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace these with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA_32PqATbpRxzuWu2FQ3wr4LK8CK6cCWU",
  authDomain: "cafe-management-e0d1f.firebaseapp.com",
  projectId: "cafe-management-e0d1f",
  storageBucket: "cafe-management-e0d1f.firebasestorage.app",
  messagingSenderId: "562574328019",
  appId: "1:562574328019:web:a256b5e11d84bb3f2a1426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;