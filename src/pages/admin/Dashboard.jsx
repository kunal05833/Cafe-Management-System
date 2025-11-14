import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, DollarSign, ShoppingBag, Users, 
  Package, Clock, Star, ArrowUp, ArrowDown 
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 125430,
    totalOrders: 1248,
    activeUsers: 892,
    pendingOrders: 23
  });

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      change: '-3.1%',
      isPositive: false,
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Rahul Sharma', items: 3, amount: 450, status: 'Completed', time: '2 mins ago' },
    { id: '#ORD-002', customer: 'Priya Patel', items: 2, amount: 280, status: 'Pending', time: '5 mins ago' },
    { id: '#ORD-003', customer: 'Amit Kumar', items: 5, amount: 680, status: 'Processing', time: '8 mins ago' },
    { id: '#ORD-004', customer: 'Sneha Gupta', items: 1, amount: 120, status: 'Completed', time: '12 mins ago' },
    { id: '#ORD-005', customer: 'Vikram Singh', items: 4, amount: 520, status: 'Pending', time: '15 mins ago' }
  ];

  const topProducts = [
    { name: 'Cappuccino', sales: 234, revenue: 28080, icon: '☕', trend: 'up' },
    { name: 'Cold Coffee', sales: 189, revenue: 28350, icon: '🥤', trend: 'up' },
    { name: 'Veggie Sandwich', sales: 156, revenue: 15600, icon: '🥪', trend: 'down' },
    { name: 'Chocolate Cake', sales: 142, revenue: 25560, icon: '🍰', trend: 'up' },
    { name: 'Espresso', sales: 98, revenue: 7840, icon: '☕', trend: 'up' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'Pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard 📊
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Welcome back! Here's what's happening today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${stat.bgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Orders
                </h2>
                <button className="text-amber-600 hover:text-amber-700 font-semibold text-sm">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Items</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {order.id}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                          {order.customer}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                          {order.items}
                        </td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          ₹{order.amount}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {order.time}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Top Products
              </h2>

              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center text-2xl">
                      {product.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                        <span>{product.sales} sales</span>
                        <span className="font-semibold text-amber-600">₹{product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className={`${
                      product.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      <TrendingUp className={`w-5 h-5 ${product.trend === 'down' ? 'rotate-180' : ''}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;