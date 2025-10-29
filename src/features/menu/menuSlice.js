<<<<<<< HEAD
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
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuService } from '../../services/api/menuService';

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchItems',
  async () => {
    const items = await menuService.getAllItems();
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    return items;
  }
);

<<<<<<< HEAD
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
=======
export const addMenuItem = createAsyncThunk(
  'menu/addItem',
  async (itemData) => {
    const newItem = await menuService.addItem(itemData);
    return newItem;
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateItem',
  async ({ id, data }) => {
    const updatedItem = await menuService.updateItem(id, data);
    return updatedItem;
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteItem',
  async (id) => {
    await menuService.deleteItem(id);
>>>>>>> 6428b2e (Updated UI and fixed bugs)
    return id;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
<<<<<<< HEAD
    isLoading: false,
    error: null,
    selectedCategory: 'all'
=======
    filteredItems: [],
    categories: ['all', 'coffee', 'snacks', 'desserts'],
    selectedCategory: 'all',
    searchQuery: '',
    isLoading: false,
    error: null,
>>>>>>> 6428b2e (Updated UI and fixed bugs)
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
<<<<<<< HEAD
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
=======
      state.filteredItems = state.items.filter(item => 
        action.payload === 'all' || item.category === action.payload
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter(item =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        item.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchMenuItems.pending, (state) => {
        state.isLoading = true;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
<<<<<<< HEAD
=======
        state.filteredItems = action.payload;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
<<<<<<< HEAD
      // Add menu item
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success('Menu item added successfully!');
      })
      // Update menu item
=======
      // Add item
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems.push(action.payload);
      })
      // Update item
>>>>>>> 6428b2e (Updated UI and fixed bugs)
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
<<<<<<< HEAD
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
=======
          state.filteredItems = [...state.items];
        }
      })
      // Delete item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.filteredItems = state.filteredItems.filter(item => item.id !== action.payload);
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = menuSlice.actions;
>>>>>>> 6428b2e (Updated UI and fixed bugs)
export default menuSlice.reducer;