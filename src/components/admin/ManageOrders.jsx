// src/components/admin/ManageOrders.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../features/orders/ordersSlice';
import { Clock, Coffee, Package, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '../common/LoadingSpinner';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const getStatusOptions = (currentStatus) => {
    const statusFlow = {
      pending: ['preparing', 'completed'],
      preparing: ['ready', 'completed'],
      ready: ['completed'],
      completed: []
    };
    return statusFlow[currentStatus] || [];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'preparing':
        return <Coffee className="w-5 h-5 text-blue-500" />;
      case 'ready':
        return <Package className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.id.slice(-6).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-600">
                  Customer: {order.customerName} ({order.customerEmail})
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(order.createdAt), 'PPp')}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize font-medium">{order.status}</span>
                </div>
                
                {order.status !== 'completed' && (
                  <select
                    value=""
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="" disabled>Update Status</option>
                    {getStatusOptions(order.status).map(status => (
                      <option key={status} value={status} className="capitalize">
                        {status}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">Payment: </span>
                <span className="text-sm font-medium capitalize">
                  {order.paymentType === 'udhari' ? 'Udhari (Credit)' : 'Cash'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-bold text-primary-600">₹{order.totalAmount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;