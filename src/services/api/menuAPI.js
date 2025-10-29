// src/services/api/menuAPI.js
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';

export const menuAPI = {
  // Get a single item by id
  async getItem(itemId) {
    try {
      const snap = await getDoc(doc(db, 'menu', itemId));
      if (!snap.exists()) throw new Error('Menu item not found');
      return { id: snap.id, ...snap.data() };
    } catch (error) {
      console.error('menuAPI.getItem:', error);
      throw new Error(error.message);
    }
  },

  // Get all items (ordered by name by default)
  async getAllItems({ sortBy = 'name', direction = 'asc' } = {}) {
    try {
      const q = query(collection(db, 'menu'), orderBy(sortBy, direction));
      const qs = await getDocs(q);
      const items = [];
      qs.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return items;
    } catch (error) {
      console.error('menuAPI.getAllItems:', error);
      throw new Error(error.message);
    }
  },

  // Get items by category (returns all if category === 'all')
  async getItemsByCategory(category, { sortBy = 'name', direction = 'asc' } = {}) {
    try {
      if (!category || category === 'all') return this.getAllItems({ sortBy, direction });

      const q = query(
        collection(db, 'menu'),
        where('category', '==', category),
        orderBy(sortBy, direction)
      );
      const qs = await getDocs(q);
      const items = [];
      qs.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return items;
    } catch (error) {
      console.error('menuAPI.getItemsByCategory:', error);
      throw new Error(error.message);
    }
  },

  // Add new menu item
  // itemData: { name, description, price, category, imageURL? }
  // imageFile: optional File to upload to Firebase Storage
  async addItem(itemData, imageFile) {
    try {
      let imageURL = itemData?.imageURL || '';

      // If file provided, upload and set imageURL
      if (imageFile) {
        const filePath = `menu-images/${Date.now()}_${imageFile.name}`;
        const sref = ref(storage, filePath);
        const snap = await uploadBytes(sref, imageFile);
        imageURL = await getDownloadURL(snap.ref);
      }

      const payload = {
        name: itemData.name,
        description: itemData.description || '',
        price: Number(itemData.price) || 0,
        category: itemData.category || 'coffee',
        imageURL,
        isAvailable: itemData?.isAvailable ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const dr = await addDoc(collection(db, 'menu'), payload);
      return { id: dr.id, ...payload };
    } catch (error) {
      console.error('menuAPI.addItem:', error);
      throw new Error(error.message);
    }
  },

  // Update existing item
  // updates: fields to update; if newImageFile provided, replaces image
  async updateItem(itemId, updates = {}, newImageFile) {
    try {
      let finalImageURL = updates?.imageURL || '';

      // If a new file is provided, upload & optionally delete old
      if (newImageFile) {
        const filePath = `menu-images/${Date.now()}_${newImageFile.name}`;
        const sref = ref(storage, filePath);
        const snap = await uploadBytes(sref, newImageFile);
        const newURL = await getDownloadURL(snap.ref);

        // Attempt to delete old image if provided
        if (updates?.imageURL) {
          try {
            const oldRef = ref(storage, updates.imageURL);
            await deleteObject(oldRef);
          } catch (e) {
            // Non-fatal: old URL might be external or already removed
            console.warn('menuAPI.updateItem: old image delete skipped', e?.message);
          }
        }

        finalImageURL = newURL;
      }

      // Build clean payload
      const { imageFile: _, ...rest } = updates || {};
      const payload = {
        ...rest,
        imageURL: finalImageURL,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(doc(db, 'menu', itemId), payload);
      return { id: itemId, ...payload };
    } catch (error) {
      console.error('menuAPI.updateItem:', error);
      throw new Error(error.message);
    }
  },

  // Delete item (and image if provided)
  async deleteItem(itemId, imageURL) {
    try {
      // Best-effort image delete
      if (imageURL) {
        try {
          const fileRef = ref(storage, imageURL);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn('menuAPI.deleteItem: image delete skipped', e?.message);
        }
      }

      await deleteDoc(doc(db, 'menu', itemId));
      return true;
    } catch (error) {
      console.error('menuAPI.deleteItem:', error);
      throw new Error(error.message);
    }
  },

  // Toggle availability status
  async toggleAvailability(itemId, isAvailable) {
    try {
      await updateDoc(doc(db, 'menu', itemId), {
        isAvailable: !!isAvailable,
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('menuAPI.toggleAvailability:', error);
      throw new Error(error.message);
    }
  },

  // Simple client-side search (fetches all then filters)
  async search(term) {
    try {
      const all = await this.getAllItems();
      const q = (term || '').toLowerCase();
      return all.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.category?.toLowerCase().includes(q)
      );
    } catch (error) {
      console.error('menuAPI.search:', error);
      throw new Error(error.message);
    }
  },
};

export default menuAPI;