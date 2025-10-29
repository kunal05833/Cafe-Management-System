import { doc, getDoc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const udhariService = {
  async getUserUdhariData(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          balance: userData.udhariBalance || 0,
          creditLimit: userData.creditLimit || 5000,
          transactions: userData.transactions || []
        };
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAllUdhariCustomers() {
    try {
      const q = query(collection(db, 'users'), where('udhariBalance', '>', 0));
      const querySnapshot = await getDocs(q);
      const customers = [];
      
      querySnapshot.forEach((doc) => {
        customers.push({ id: doc.id, ...doc.data() });
      });
      
      return customers;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async recordPayment(userId, amount, description) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data();
      const currentBalance = userData.udhariBalance || 0;
      const newBalance = Math.max(0, currentBalance - amount);
      
      const transaction = {
        amount,
        type: 'credit',
        date: new Date().toISOString(),
        description: description || 'Payment received',
        balanceAfter: newBalance
      };
      
      await updateDoc(userRef, {
        udhariBalance: newBalance,
        transactions: [...(userData.transactions || []), transaction]
      });
      
      // Record in transactions collection
      await addDoc(collection(db, 'transactions'), {
        userId,
        ...transaction
      });
      
      return { userId, newBalance };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateCreditLimit(userId, newLimit) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        creditLimit: newLimit
      });
      
      return { userId, newLimit };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addUdhariCharge(userId, amount, orderId, description) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data();
      const currentBalance = userData.udhariBalance || 0;
      const creditLimit = userData.creditLimit || 5000;
      const newBalance = currentBalance + amount;
      
      if (newBalance > creditLimit) {
        throw new Error('Credit limit exceeded');
      }
      
      const transaction = {
        amount,
        type: 'debit',
        orderId,
        date: new Date().toISOString(),
        description: description || `Order #${orderId}`,
        balanceAfter: newBalance
      };
      
      await updateDoc(userRef, {
        udhariBalance: newBalance,
        transactions: [...(userData.transactions || []), transaction]
      });
      
      // Record in transactions collection
      await addDoc(collection(db, 'transactions'), {
        userId,
        ...transaction
      });
      
      return { userId, newBalance };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};