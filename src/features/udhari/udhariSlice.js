<<<<<<< HEAD
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
    
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { udhariService } from '../../services/api/udhariService';

export const fetchUdhariData = createAsyncThunk(
  'udhari/fetchData',
  async (userId) => {
    const data = await udhariService.getUserUdhariData(userId);
    return data;
  }
);

export const fetchAllUdhariCustomers = createAsyncThunk(
  'udhari/fetchAllCustomers',
  async () => {
    const customers = await udhariService.getAllUdhariCustomers();
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    return customers;
  }
);

<<<<<<< HEAD
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
=======
export const recordPayment = createAsyncThunk(
  'udhari/recordPayment',
  async ({ userId, amount, description }) => {
    const result = await udhariService.recordPayment(userId, amount, description);
    return result;
  }
);

export const updateCreditLimit = createAsyncThunk(
  'udhari/updateLimit',
  async ({ userId, limit }) => {
    const result = await udhariService.updateCreditLimit(userId, limit);
    return result;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  }
);

const udhariSlice = createSlice({
  name: 'udhari',
  initialState: {
<<<<<<< HEAD
    customers: [],
    isLoading: false,
    error: null,
    selectedCustomer: null
=======
    balance: 0,
    creditLimit: 5000,
    transactions: [],
    customers: [],
    selectedCustomer: null,
    isLoading: false,
    error: null,
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  },
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
<<<<<<< HEAD
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
=======
  },
  extraReducers: (builder) => {
    builder
      // Fetch user data
      .addCase(fetchUdhariData.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.creditLimit = action.payload.creditLimit;
        state.transactions = action.payload.transactions;
      })
      // Fetch all customers
      .addCase(fetchAllUdhariCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
      })
      // Record payment
      .addCase(recordPayment.fulfilled, (state, action) => {
        if (state.selectedCustomer?.id === action.payload.userId) {
          state.selectedCustomer.balance = action.payload.newBalance;
        }
      })
      // Update limit
      .addCase(updateCreditLimit.fulfilled, (state, action) => {
        if (state.selectedCustomer?.id === action.payload.userId) {
          state.selectedCustomer.creditLimit = action.payload.newLimit;
        }
      });
  },
});

export const { setSelectedCustomer } = udhariSlice.actions;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
export default udhariSlice.reducer;