import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingBag, Users, Calendar, Download } from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('today');

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹45,230',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'New Customers',
      value: '23',
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Avg Order Value',
      value: '₹290',
      change: '+4.8%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const topProducts = [
    { name: 'Cappuccino', sales: 234, revenue: 28080, percentage: 25 },
    { name: 'Cold Coffee', sales: 189, revenue: 28350, percentage: 22 },
    { name: 'Veggie Sandwich', sales: 156, revenue: 15600, percentage: 18 },
    { name: 'Chocolate Cake', sales: 142, revenue: 25560, percentage: 15 },
    { name: 'Espresso', sales: 98, revenue: 7840, percentage: 10 }
  ];

  const revenueByCategory = [
    { category: 'Hot Coffee', revenue: 35200, percentage: 38 },
    { category: 'Cold Drinks', revenue: 28350, percentage: 30 },
    { category: 'Snacks', revenue: 18900, percentage: 20 },
    { category: 'Desserts', revenue: 11340, percentage: 12 }
  ];

  const getCategoryColor = (index) => {
    const colors = [
      'from-amber-500 to-orange-600',
      'from-blue-500 to-cyan-600',
      'from-green-500 to-emerald-600',
      'from-purple-500 to-pink-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Reports & Analytics 📊
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Track your business performance
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold outline-none"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Top Products
            </h2>

            <div className="space-y-5">
              {topProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {product.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${product.percentage}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {product.sales} sales
                    </span>
                    <span className="font-semibold text-amber-600">
                      ₹{product.revenue.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Revenue by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Revenue by Category
            </h2>

            <div className="space-y-5">
              {revenueByCategory.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.category}
                      </h3>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${getCategoryColor(index)} rounded-full`}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{item.revenue.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Total Revenue
                </span>
                <span className="text-2xl font-bold text-amber-600">
                  ₹{revenueByCategory.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl"
          >
            <Calendar className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Peak Hours</h3>
            <p className="text-3xl font-bold mb-1">2 PM - 5 PM</p>
            <p className="text-blue-100">Most orders during this time</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl"
          >
            <Users className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Repeat Customers</h3>
            <p className="text-3xl font-bold mb-1">68%</p>
            <p className="text-purple-100">Customer retention rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl"
          >
            <TrendingUp className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Growth Rate</h3>
            <p className="text-3xl font-bold mb-1">+24%</p>
            <p className="text-green-100">Month over month</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reports;