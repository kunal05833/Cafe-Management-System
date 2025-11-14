import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, ChevronRight, Search } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const { user } = useAuth();

  const filters = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

  // Dummy orders for demo
  const dummyOrders = [
    {
      id: 'ORD-001',
      items: [
        { name: 'Cappuccino', quantity: 2, price: 120, image: '☕' },
        { name: 'Veggie Sandwich', quantity: 1, price: 100, image: '🥪' }
      ],
      total: 340,
      status: 'Completed',
      date: '2024-01-15T10:30:00',
      deliveryAddress: '123 Main Street, City',
      paymentMethod: 'Online'
    },
    {
      id: 'ORD-002',
      items: [
        { name: 'Cold Coffee', quantity: 1, price: 150, image: '🥤' },
        { name: 'Chocolate Cake', quantity: 1, price: 180, image: '🍰' }
      ],
      total: 330,
      status: 'Processing',
      date: '2024-01-16T14:20:00',
      deliveryAddress: '456 Park Avenue, City',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-003',
      items: [
        { name: 'Espresso', quantity: 3, price: 80, image: '☕' }
      ],
      total: 240,
      status: 'Pending',
      date: '2024-01-16T16:45:00',
      deliveryAddress: '789 Lake Road, City',
      paymentMethod: 'Online'
    },
    {
      id: 'ORD-004',
      items: [
        { name: 'Iced Tea', quantity: 2, price: 90, image: '🍵' },
        { name: 'Veggie Sandwich', quantity: 2, price: 100, image: '🥪' }
      ],
      total: 380,
      status: 'Completed',
      date: '2024-01-14T12:15:00',
      deliveryAddress: '321 Beach Street, City',
      paymentMethod: 'Cash on Delivery'
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [activeFilter, orders]);

  const fetchOrders = async () => {
    try {
      // Try fetching from Firebase
      // const q = query(
      //   collection(db, 'orders'),
      //   where('userId', '==', user?.uid),
      //   orderBy('createdAt', 'desc')
      // );
      // const querySnapshot = await getDocs(q);
      // const ordersData = querySnapshot.docs.map(doc => ({
      //   id: doc.id,
      //   ...doc.data()
      // }));
      // setOrders(ordersData);
      
      // Using dummy data for demo
      setOrders(dummyOrders);
      setFilteredOrders(dummyOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders(dummyOrders);
      setFilteredOrders(dummyOrders);
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (activeFilter === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === activeFilter));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'Processing':
        return <Clock className="w-5 h-5" />;
      case 'Pending':
        return <Package className="w-5 h-5" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'Pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your orders...</p>
        </div>
      </div>
    );
  }

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
            My Orders 📦
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 overflow-x-auto pb-4"
        >
          <div className="flex gap-3 min-w-max">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No orders found in this category
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        Order {order.id}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Payment: {order.paymentMethod}</span>
                    <span className="text-lg font-bold text-amber-600">₹{order.total}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center text-2xl">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          ₹{item.quantity * item.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to={`/orders/${order.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                    >
                      View Details
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;