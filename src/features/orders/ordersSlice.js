<<<<<<< HEAD
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
    
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/api/orderService';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData) => {
    const order = await orderService.createOrder(orderData);
    return order;
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId) => {
    const orders = await orderService.getUserOrders(userId);
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    return orders;
  }
);

<<<<<<< HEAD
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
    
=======
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => {
    const orders = await orderService.getAllOrders();
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    return orders;
  }
);

<<<<<<< HEAD
// Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }) => {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString()
    });
    
    return { orderId, status };
=======
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }) => {
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    return updatedOrder;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
<<<<<<< HEAD
    isLoading: false,
    error: null,
    filter: 'all' // all, pending, preparing, ready, completed
=======
    currentOrder: null,
    isLoading: false,
    error: null,
    filter: 'all',
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  },
  reducers: {
    setOrderFilter: (state, action) => {
      state.filter = action.payload;
    },
<<<<<<< HEAD
    clearOrdersError: (state) => {
      state.error = null;
    }
=======
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
>>>>>>> 6428b2e (Updated UI and fixed bugs)
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
<<<<<<< HEAD
        toast.success('Order placed successfully!');
=======
        state.currentOrder = action.payload;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
<<<<<<< HEAD
        toast.error('Failed to place order');
      })
      // Fetch orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
=======
      })
      // Fetch orders
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
>>>>>>> 6428b2e (Updated UI and fixed bugs)
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
<<<<<<< HEAD
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
=======
      // Update status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export const { setOrderFilter, setCurrentOrder } = ordersSlice.actions;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
export default ordersSlice.reducer;