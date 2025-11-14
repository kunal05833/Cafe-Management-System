import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CreditCard, AlertCircle, CheckCircle, Plus, Eye } from 'lucide-react';

const UdhariManagement = () => {
  const [customers] = useState([
    {
      id: '1',
      name: 'Rahul Sharma',
      phone: '+91 9876543210',
      totalCredit: 500,
      creditLimit: 5000,
      lastTransaction: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Amit Kumar',
      phone: '+91 9876543212',
      totalCredit: 750,
      creditLimit: 5000,
      lastTransaction: '2024-01-14',
      status: 'active'
    },
    {
      id: '3',
      name: 'Sneha Gupta',
      phone: '+91 9876543213',
      totalCredit: 250,
      creditLimit: 3000,
      lastTransaction: '2024-01-13',
      status: 'active'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      phone: '+91 9876543214',
      totalCredit: 1200,
      creditLimit: 2000,
      lastTransaction: '2024-01-12',
      status: 'warning'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const totalOutstanding = customers.reduce((sum, c) => sum + c.totalCredit, 0);
  const highRiskCustomers = customers.filter(c => (c.totalCredit / c.creditLimit) > 0.8).length;

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const getCreditPercentage = (credit, limit) => {
    return (credit / limit) * 100;
  };

  const getStatusColor = (customer) => {
    const percentage = getCreditPercentage(customer.totalCredit, customer.creditLimit);
    if (percentage > 80) return 'text-red-600 dark:text-red-400';
    if (percentage > 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
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
            Udhari Management 💳
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage customer credit accounts
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-3xl font-bold text-red-600 mb-1">
              ₹{totalOutstanding}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Total Outstanding
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-blue-600 mb-1">
              {customers.length}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Active Accounts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-amber-600 mb-1">
              {highRiskCustomers}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              High Risk Accounts
            </p>
          </motion.div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => {
            const creditPercentage = getCreditPercentage(customer.totalCredit, customer.creditLimit);
            return (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                {/* Customer Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {customer.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {customer.phone}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Credit Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Outstanding
                    </span>
                    <span className={`text-lg font-bold ${getStatusColor(customer)}`}>
                      ₹{customer.totalCredit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Credit Limit
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{customer.creditLimit}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Credit Usage
                      </span>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {creditPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${creditPercentage}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                        className={`h-full rounded-full ${
                          creditPercentage > 80
                            ? 'bg-gradient-to-r from-red-500 to-pink-600'
                            : creditPercentage > 50
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Last transaction</span>
                      <span>{new Date(customer.lastTransaction).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl font-semibold text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-all"
                  >
                    Add Payment
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                  >
                    View History
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UdhariManagement;