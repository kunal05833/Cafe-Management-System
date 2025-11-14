import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Package, Percent, Gift, Star, 
  CheckCircle, Clock, Trash2, Settings 
} from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered Successfully',
      message: 'Your order #ORD-001 has been delivered. Enjoy your meal!',
      time: '5 mins ago',
      read: false,
      icon: Package,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      type: 'promotion',
      title: '50% OFF on Your Next Order! 🎉',
      message: 'Use code SAVE50 and get flat 50% discount on orders above ₹300',
      time: '1 hour ago',
      read: false,
      icon: Percent,
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 3,
      type: 'reward',
      title: 'You Earned 50 Reward Points!',
      message: 'Congratulations! Your recent order earned you 50 points. Redeem now!',
      time: '2 hours ago',
      read: true,
      icon: Gift,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Out for Delivery',
      message: 'Your order #ORD-002 is out for delivery. Expected arrival: 25 mins',
      time: '3 hours ago',
      read: true,
      icon: Package,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 5,
      type: 'review',
      title: 'Rate Your Recent Order',
      message: 'How was your experience? Share your feedback and earn 10 bonus points!',
      time: '1 day ago',
      read: true,
      icon: Star,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 6,
      type: 'promotion',
      title: 'New Menu Items Added! 🍕',
      message: 'Check out our latest pizzas and pastas. Order now for special launch prices!',
      time: '2 days ago',
      read: true,
      icon: Bell,
      color: 'from-orange-500 to-red-600'
    }
  ]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'promotion', label: 'Offers', count: notifications.filter(n => n.type === 'promotion').length },
    { id: 'reward', label: 'Rewards', count: notifications.filter(n => n.type === 'reward').length }
  ];

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Notifications 🔔
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMarkAllAsRead}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark All as Read
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <div className="mb-6 overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {filters.map(f => (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {f.label} {f.count > 0 && `(${f.count})`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're all caught up! Check back later for updates.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                    !notification.read ? 'ring-2 ring-amber-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 p-6">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${notification.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <notification.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0 mt-1"></span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                          <Clock className="w-4 h-4" />
                          {notification.time}
                        </div>

                        <div className="flex gap-2">
                          {!notification.read && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                            >
                              Mark as Read
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Notification Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-6 text-white"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Manage Notifications
          </h3>
          <p className="text-blue-100 mb-4">
            Customize your notification preferences to stay updated on what matters to you
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Notification Settings
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;