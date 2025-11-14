import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Mail, Phone, ShoppingBag, CreditCard } from 'lucide-react';

const Customers = () => {
  const [customers] = useState([
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      totalOrders: 24,
      totalSpent: 8450,
      udhari: 500,
      joinDate: '2024-01-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      totalOrders: 18,
      totalSpent: 6240,
      udhari: 0,
      joinDate: '2024-01-05',
      status: 'active'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      totalOrders: 32,
      totalSpent: 12800,
      udhari: 750,
      joinDate: '2023-12-20',
      status: 'active'
    },
    {
      id: '4',
      name: 'Sneha Gupta',
      email: 'sneha@example.com',
      phone: '+91 9876543213',
      totalOrders: 15,
      totalSpent: 5200,
      udhari: 250,
      joinDate: '2024-01-10',
      status: 'active'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length,
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Customers',
      value: customers.filter(c => c.status === 'active').length,
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Revenue',
      value: `₹${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`,
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      title: 'Outstanding Credit',
      value: `₹${customers.reduce((sum, c) => sum + c.udhari, 0)}`,
      icon: CreditCard,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

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
            Customers 👥
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your customer database
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Customers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Orders
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Total Spent
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Udhari
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Join Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-green-600 dark:text-green-400">
                        ₹{customer.totalSpent.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-bold ${
                        customer.udhari > 0 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-400'
                      }`}>
                        ₹{customer.udhari}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(customer.joinDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        {customer.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Customers;