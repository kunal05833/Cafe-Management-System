<<<<<<< HEAD
// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
=======
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
>>>>>>> 6428b2e (Updated UI and fixed bugs)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
<<<<<<< HEAD
    isOpen: false
=======
    isOpen: false,
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
<<<<<<< HEAD
        existingItem.quantity += 1;
        toast.success(`${action.payload.name} quantity updated!`);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.name} added to cart!`);
=======
        existingItem.quantity += action.payload.quantity || 1;
        toast.success(`Updated ${action.payload.name} quantity`);
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
        toast.success(`${action.payload.name} added to cart`);
>>>>>>> 6428b2e (Updated UI and fixed bugs)
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
<<<<<<< HEAD
      toast.success('Item removed from cart');
=======
      toast.info('Item removed from cart');
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity === 0) {
          state.items = state.items.filter(item => item.id !== id);
<<<<<<< HEAD
          toast.success('Item removed from cart');
=======
          toast.info('Item removed from cart');
>>>>>>> 6428b2e (Updated UI and fixed bugs)
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
<<<<<<< HEAD
    }
  }
=======
    },
  },
>>>>>>> 6428b2e (Updated UI and fixed bugs)
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;