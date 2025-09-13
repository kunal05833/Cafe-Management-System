// src/features/menu/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import toast from 'react-hot-toast';

// Fetch all menu items
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchItems',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'menu'));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  }
);

// Add new menu item
export const addMenuItem = createAsyncThunk(
  'menu/addItem',
  async ({ itemData, imageFile }) => {
    try {
      let imageURL = '';
      
      // Upload image if provided
      if (imageFile) {
        const storageRef = ref(storage, `menu-images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageURL = await getDownloadURL(snapshot.ref);
      }
      
      const newItem = {
        ...itemData,
        imageURL,
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'menu'), newItem);
      return { id: docRef.id, ...newItem };
    } catch (error) {
      throw error.message;
    }
  }
);

// Update menu item
export const updateMenuItem = createAsyncThunk(
  'menu/updateItem',
  async ({ id, updates, imageFile }) => {
    try {
      let imageURL = updates.imageURL;
      
      // Upload new image if provided
      if (imageFile) {
        const storageRef = ref(storage, `menu-images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageURL// src/features/menu/menuSlice.js (continued)
        imageURL = await getDownloadURL(snapshot.ref);
      }
      
      const updatedData = {
        ...updates,
        imageURL,
        updatedAt: new Date().toISOString()
      };
      
      await updateDoc(doc(db, 'menu', id), updatedData);
      return { id, ...updatedData };
    } catch (error) {
      throw error.message;
    }
  }
);

// Delete menu item
export const deleteMenuItem = createAsyncThunk(
  'menu/deleteItem',
  async (id) => {
    await deleteDoc(doc(db, 'menu', id));
    return id;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    selectedCategory: 'all'
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearMenuError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch menu items
      .addCase(fetchMenuItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add menu item
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success('Menu item added successfully!');
      })
      // Update menu item
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        toast.success('Menu item updated successfully!');
      })
      // Delete menu item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        toast.success('Menu item deleted successfully!');
      });
  }
});

export const { setSelectedCategory, clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;