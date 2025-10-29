import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll 
} from 'firebase/storage';
import { storage } from './config';

export const storageService = {
  async uploadFile(file, path) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  async uploadImage(file, folder = 'images') {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;
      const path = `${folder}/${filename}`;

      return await this.uploadFile(file, path);
    } catch (error) {
      console.error('Upload image error:', error);
      throw error;
    }
  },

  async deleteFile(url) {
    try {
      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },

  async listFiles(path) {
    try {
      const listRef = ref(storage, path);
      const result = await listAll(listRef);
      
      const files = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            url
          };
        })
      );
      
      return files;
    } catch (error) {
      console.error('List files error:', error);
      throw error;
    }
  }
};