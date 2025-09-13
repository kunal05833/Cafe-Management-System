// src/features/orders/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

// Create new order
export const createOrder = createAsyncThunk(
  'orders/create',
  async ({ orderData, userId }) => {
    try {
      const newOrder = {
        ...orderData,
        userId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'orders'), newOrder);
      
      // If payment type is udhari, update user's udhari balance
      if (orderData.paymentType === 'udhari') {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        
        await updateDoc(userRef, {
          udhariBalance: userData.udhariBalance + orderData.totalAmount,
          transactions: [...userData.transactions, {
            orderId: docRef.id,
            amount: orderData.totalAmount,
            type: 'debit',
            date: new Date().toISOString(),
            description: `Order #${docRef.id.slice(-6)}`
          }]
        });
      }
      
      return { id: docRef.id, ...newOrder };
    } catch (error) {
      throw error.message;
    }
  }
);

// Fetch user orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId) => {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  }
);

// Fetch all orders (admin)
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }) => {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString()
    });
    
    return { orderId, status };
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
    filter: 'all' // all, pending, preparing, ready, completed
  },
  reducers: {
    setOrderFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearOrdersError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        toast.success('Order placed successfully!');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error('Failed to place order');
      })
      // Fetch orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = state.orders.find(o => o.id === action.payload.orderId);
        if (order) {
          order.status = action.payload.status;
          order.updatedAt = new Date().toISOString();
        }
        toast.success('Order status updated!');
      });
  }
});

export const { setOrderFilter, clearOrdersError } = ordersSlice.actions;
export default ordersSlice.reducer;