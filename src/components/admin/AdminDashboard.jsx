// src/components/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../features/orders/ordersSlice';
import { fetchMenuItems } from '../../features/menu/menuSlice';
import { fetchUdhariCustomers } from '../../features/udhari/udhariSlice';
import { DollarSign, ShoppingBag, Users, TrendingUp, Coffee, CreditCard } from 'lucide-react';
import { format, startOfDay, endOfDay, isToday } from 'date-fns';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { items: menuItems } = useSelector((state) => state.menu);
  const { customers: udhariCustomers } = useSelector((state) => state.udhari);
  const [stats, setStats] = useState({
    totalSales: 0,
    todayRevenue: 0,
    totalOrders: 0,
    pendingUdhari: 0,
    bestSellingItems: []
  });

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchMenuItems());
    dispatch(fetchUdhariCustomers());
  }, [dispatch]);

  useEffect(() => {
    calculateStats();
  }, [orders, udhariCustomers]);

  const calculateStats = () => {
    // Total sales
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Today's revenue
    const todayRevenue = orders
      .filter(order => isToday(new Date(order.createdAt)))
      .reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Total pending udhari
    const pendingUdhari = udhariCustomers.reduce((sum, customer) => sum + customer.udhariBalance, 0);
    
    // Best selling items
    const itemSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (itemSales[item.name]) {
          itemSales[item.name] += item.quantity;
        } else {
          itemSales[item.name] = item.quantity;
        }
      });
    });
    
    const bestSellingItems = Object.entries(itemSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }));

    setStats({
      totalSales,
      todayRevenue,
      totalOrders: orders.length,
      pendingUdhari,
      bestSellingItems
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{stats.totalSales}</p>
          <p className="text-sm text-gray-500 mt-2">All time revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Today's Revenue</h3>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{stats.todayRevenue}</p>
          <p className="text-sm text-gray-500 mt-2">{format(new Date(), 'PP')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <ShoppingBag className="w-8 h-8 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
          <p className="text-sm text-gray-500 mt-2">Orders processed</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Pending Udhari</h3>
            <CreditCard className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">₹{stats.pendingUdhari}</p>
          <p className="text-sm text-gray-500 mt-2">Total credit outstanding</p>
        </div>
      </div>

      {/* Best Selling Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Best Selling Items</h3>
          {stats.bestSellingItems.length === 0 ? (
            <p className="text-gray-500">No sales data yet</p>
          ) : (
            <div className="space-y-3">
              {stats.bestSellingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.quantity} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order #{order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm text-gray-600">{format(new Date(order.createdAt), 'p')}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.totalAmount}</p>
                  <p className={`text-sm capitalize ${
                    order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;