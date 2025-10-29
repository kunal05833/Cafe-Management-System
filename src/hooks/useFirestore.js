import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase/config';

export const useFirestore = (collectionName, conditions = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      let q = collection(db, collectionName);
      
      // Apply conditions
      conditions.forEach(condition => {
        if (condition.type === 'where') {
          q = query(q, where(condition.field, condition.operator, condition.value));
        } else if (condition.type === 'orderBy') {
          q = query(q, orderBy(condition.field, condition.direction));
        }
      });
            const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
          });
          setData(documents);
          setLoading(false);
        },
        (err) => {
          console.error('Firestore error:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Query setup error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(conditions)]);

  return { data, loading, error };
};