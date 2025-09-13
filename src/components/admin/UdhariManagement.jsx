// src/components/admin/UdhariManagement.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchUdhariCustomers, 
  recordUdhariPayment, 
  updateUdhariLimit,
  setSelectedCustomer 
} from '../../features/udhari/udhariSlice';
import { CreditCard, User, DollarSign, Edit2, X } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '../common/LoadingSpinner';

const UdhariManagement = () => {
  const dispatch = useDispatch();
  const { customers, isLoading, selectedCustomer } = useSelector((state) => state.udhari);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [newLimit, setNewLimit] = useState('');

  useEffect(() => {
    dispatch(fetchUdhariCustomers());
  }, [dispatch]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || !paymentAmount) return;

    await dispatch(recordUdhariPayment({
      userId: selectedCustomer.id,
      amount: parseFloat(paymentAmount),
      description: `Payment received - ${format(new Date(), 'PP')}`
    }));

    setPaymentAmount('');
    setShowPaymentModal(false);
    dispatch(fetchUdhariCustomers());
  };

  const handleLimitUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || !newLimit) return;

    await dispatch(updateUdhariLimit({
      userId: selectedCustomer.id,
      limit: parseFloat(newLimit)
    }));

    setNewLimit('');
    setShowLimitModal(false);
  };

  const openPaymentModal = (customer) => {
    dispatch(setSelectedCustomer(customer));
    setPaymentAmount('');
    setShowPaymentModal(true);
  };

  const openLimitModal = (customer) => {
    dispatch(setSelectedCustomer(customer));
    setNewLimit(customer.udhariLimit.toString());
    setShowLimitModal(true);
  };

  if (isLoading) return <LoadingSpinner fullScreen />;

  const totalUdhari = customers.reduce((sum, customer) => sum + customer.udhariBalance, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Udhari Management</h1>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Pending Udhari</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">₹{totalUdhari}</p>
          </div>
          <CreditCard className="w-12 h-12 text-red-600" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Limit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilization
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          // src/components/admin/UdhariManagement.jsx (continued)
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => {
              const utilization = (customer.udhariBalance / customer.udhariLimit) * 100;
              return (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-8 h-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-semibold text-red-600">₹{customer.udhariBalance}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">₹{customer.udhariLimit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            utilization > 80 ? 'bg-red-600' : utilization > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{utilization.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openPaymentModal(customer)}
                      className="text-green-600 hover:text-green-900 mr-3"
                      title="Record Payment"
                    >
                      <DollarSign className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openLimitModal(customer)}
                      className="text-primary-600 hover:text-primary-900"
                      title="Update Limit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Record Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Customer: {selectedCustomer.name}</p>
              <p className="text-sm text-gray-600">Current Balance: ₹{selectedCustomer.udhariBalance}</p>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max={selectedCustomer.udhariBalance}
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Limit Modal */}
      {showLimitModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Update Credit Limit</h2>
              <button
                onClick={() => setShowLimitModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Customer: {selectedCustomer.name}</p>
              <p className="text-sm text-gray-600">Current Limit: ₹{selectedCustomer.udhariLimit}</p>
            </div>

            <form onSubmit={handleLimitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Credit Limit (₹)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="100"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowLimitModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Update Limit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UdhariManagement;