import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

export const menuService = {
  async getAllItems() {
    try {
      const querySnapshot = await getDocs(collection(db, 'menu'));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addItem(itemData) {
    try {
      let imageURL = '';
      
      if (itemData.imageFile) {
        const storageRef = ref(storage, `menu-images/${Date.now()}_${itemData.imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, itemData.imageFile);
        imageURL = await getDownloadURL(snapshot.ref);
      }
      
      const newItem = {
        name: itemData.name,
        description: itemData.description,
        price: itemData.price,
        category: itemData.category,
        imageURL,
        isAvailable: true,
        createdAt: new Date().toISOString(),
      };
      
      const docRef = await addDoc(collection(db, 'menu'), newItem);
      return { id: docRef.id, ...newItem };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateItem(id, data) {
    try {
      await updateDoc(doc(db, 'menu', id), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      return { id, ...data };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteItem(id) {
    try {
      await deleteDoc(doc(db, 'menu', id));
    } catch (error) {
      throw new Error(error.message);
    }
  }
};