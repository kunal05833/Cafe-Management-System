<<<<<<< HEAD
// src/app/store.js
=======
>>>>>>> 6428b2e (Updated UI and fixed bugs)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
import udhariReducer from '../features/udhari/udhariSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    cart: cartReducer,
    orders: ordersReducer,
    udhari: udhariReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
<<<<<<< HEAD
        // Ignore these action types
        ignoredActions: ['auth/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.createdAt'],
        // Ignore these paths in the state
=======
        ignoredActions: ['auth/setUser'],
        ignoredActionPaths: ['payload.user'],
>>>>>>> 6428b2e (Updated UI and fixed bugs)
        ignoredPaths: ['auth.user'],
      },
    }),
});