// src/components/customer/UdhariPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { CreditCard, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '../common/LoadingSpinner';

const UdhariPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user?.uid) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  const udhariBalance = userData?.udhariBalance || 0;
  const udhariLimit = userData?.udhariLimit || 5000;
  const transactions = userData?.transactions || [];
  const utilizationPercentage = (udhariBalance / udhariLimit) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Udhari Account</h1>

      {/* Udhari Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Balance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Current Balance</h3>
            <CreditCard className="w-8 h-8 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-primary-600">₹{udhariBalance}</p>
          <p className="text-sm text-gray-500 mt-2">Outstanding amount</p>
        </div>

        {/* Credit Limit */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Credit Limit</h3>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">₹{udhariLimit}</p>
          <p className="text-sm text-gray-500 mt-2">Maximum allowed credit</p>
        </div>

        {/* Available Credit */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Available Credit</h3>
            <TrendingDown className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">₹{udhariLimit - udhariBalance}</p>
          <p className="text-sm text-gray-500 mt-2">Remaining credit</p>
        </div>
      </div>

      {/* Credit Utilization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Credit Utilization</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-primary-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {utilizationPercentage.toFixed(1)}% of your credit limit used
        </p>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h3>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions
              .slice()
              .reverse()
              .map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === 'debit' ? 'bg-red-100' : 'bg-green-100'
                      }`}
                    >
                      {transaction.type === 'debit' ? (
                        <TrendingUp className="w-5 h-5 text-red-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {format(new Date(transaction.date), 'PPp')}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {transaction.type === 'debit' ? '+' : '-'}₹{transaction.amount}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UdhariPage;
