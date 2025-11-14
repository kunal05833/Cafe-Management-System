import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, CheckCircle, AlertCircle, Plus, ArrowUp, ArrowDown } from 'lucide-react';

const Udhari = () => {
  const [transactions] = useState([
    {
      id: '1',
      type: 'credit',
      amount: 500,
      description: 'Order #ORD-001',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      type: 'payment',
      amount: 300,
      description: 'Payment received',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 250,
      description: 'Order #ORD-002',
      date: '2024-01-13',
      status: 'pending'
    },
    {
      id: '4',
      type: 'payment',
      amount: 450,
      description: 'Payment received',
      date: '2024-01-12',
      status: 'completed'
    }
  ]);

  const totalCredit = 450;
  const creditLimit = 5000;
  const availableCredit = creditLimit - totalCredit;
  const creditUsagePercent = (totalCredit / creditLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            My Udhari 💳
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your credit account
          </p>
        </motion.div>

        {/* Credit Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Credit */}
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
              ₹{totalCredit}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Total Outstanding
            </p>
          </motion.div>

          {/* Credit Limit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-blue-600 mb-1">
              ₹{creditLimit}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Credit Limit
            </p>
          </motion.div>

          {/* Available Credit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-green-600 mb-1">
              ₹{availableCredit}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Available Credit
            </p>
          </motion.div>
        </div>

        {/* Credit Usage Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Credit Usage
            </h3>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {creditUsagePercent.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${creditUsagePercent}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full ${
                creditUsagePercent > 80 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600'
                  : creditUsagePercent > 50
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}
            />
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Transaction History
          </h2>

          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  transaction.type === 'credit'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowUp className={`w-6 h-6 text-red-600 dark:text-red-400 rotate-45`} />
                  ) : (
                    <ArrowDown className={`w-6 h-6 text-green-600 dark:text-green-400 rotate-45`} />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {transaction.description}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className={`text-right font-bold text-lg ${
                  transaction.type === 'credit'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Udhari;