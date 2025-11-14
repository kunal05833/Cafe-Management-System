import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw, AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 max-w-2xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-32 h-32 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We encountered an unexpected error. Don't worry, we're working on it!
          </p>
        </motion.div>

        {/* Error Details (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 text-left max-w-md mx-auto"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            Error Code: 500<br />
            If this persists, please contact support.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;