// src/features/udhari/udhariSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

// Fetch all customers with udhari (admin)
export const fetchUdhariCustomers = createAsyncThunk(
  'udhari/fetchCustomers',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const customers = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.role === 'customer' && data.udhariBalance > 0) {
        customers.push({ id: doc.id, ...data });
      }
    });
    
    return customers;
  }
);

// Update udhari payment
export const recordUdhariPayment = createAsyncThunk(
  'udhari/recordPayment',
  async ({ userId, amount, description }) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const newBalance = Math.max(0, userData.udhariBalance - amount);
      
      await updateDoc(userRef, {
        udhariBalance: newBalance,
        transactions: [...userData.transactions, {
          amount,
          type: 'credit',
          date: new Date().toISOString(),
          description: description || 'Payment received'
        }]
      });
      
      return { userId, newBalance };
    } catch (error) {
      throw error.message;
    }
  }
);

// Update udhari limit
export const updateUdhariLimit = createAsyncThunk(
  'udhari/updateLimit',
  async ({ userId, limit }) => {
    await updateDoc(doc(db, 'users', userId), {
      udhariLimit: limit
    });
    
    return { userId, limit };
  }
);

const udhariSlice = createSlice({
  name: 'udhari',
  initialState: {
    customers: [],
    isLoading: false,
    error: null,
    selectedCustomer: null
  },
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearUdhariError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch udhari customers
      .addCase(fetchUdhariCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUdhariCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      // Record payment
      .addCase(recordUdhariPayment.fulfilled, (state, action) => {
        const customer = state.customers.find(c => c.id === action.payload.userId);
        if (customer) {
          customer.udhariBalance = action.payload.newBalance;
        }
        toast.success('Payment recorded successfully!');
      })
      // Update limit
      .addCase(updateUdhariLimit.fulfilled, (state, action) => {
        const customer = state.customers.find(c => c.id === action.payload.userId);
        if (customer) {
          customer.udhariLimit = action.payload.limit;
        }
        toast.success('Udhari limit updated!');
      });
  }
});

export const { setSelectedCustomer, clearUdhariError } = udhariSlice.actions;
export default udhariSlice.reducer;