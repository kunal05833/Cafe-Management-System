import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, Clock, CheckCircle, Package, 
  Truck, User, Star, MessageCircle, ArrowLeft, Navigation 
} from 'lucide-react';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [currentStatus, setCurrentStatus] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [deliveryPerson, setDeliveryPerson] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    rating: 4.8,
    totalDeliveries: 1250,
    vehicleNumber: 'MP 04 AB 1234'
  });

  // Simulate real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const trackingSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been confirmed',
      icon: CheckCircle,
      time: '10:30 AM',
      completed: true
    },
    {
      id: 2,
      title: 'Preparing Your Order',
      description: 'Our chef is preparing your delicious meal',
      icon: Package,
      time: '10:35 AM',
      completed: currentStatus >= 2
    },
    {
      id: 3,
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      icon: Truck,
      time: '10:45 AM',
      completed: currentStatus >= 3
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: CheckCircle,
      time: 'Expected: 11:00 AM',
      completed: currentStatus >= 4
    }
  ];

  // Simulate status progression
  useEffect(() => {
    const statusTimer = setTimeout(() => {
      if (currentStatus < 4) {
        setCurrentStatus(prev => prev + 1);
      }
    }, 5000); // Progress every 5 seconds for demo

    return () => clearTimeout(statusTimer);
  }, [currentStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Track Your Order 📍
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Order #{orderId || 'ORD-001'}
          </p>
        </motion.div>

        {/* Estimated Time Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 shadow-2xl mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 mb-2">Estimated Delivery Time</p>
              <h2 className="text-5xl font-bold mb-2">
                {estimatedTime} mins
              </h2>
              <p className="text-amber-100">
                Your order will arrive soon!
              </p>
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Truck className="w-12 h-12" />
            </motion.div>
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl mb-8"
        >
          <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 relative flex items-center justify-center">
            {/* Animated delivery marker */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <Truck className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            {/* Map UI Elements */}
            <div className="absolute top-4 right-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center"
              >
                <Navigation className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                🗺️ Live Map View
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Order Timeline
              </h2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${((currentStatus - 1) / (trackingSteps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-gradient-to-b from-amber-600 to-orange-600"
                  />
                </div>

                {/* Timeline Steps */}
                <div className="space-y-8">
                  {trackingSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative flex items-start gap-6"
                    >
                      {/* Icon */}
                      <motion.div
                        animate={step.completed ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          step.completed
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}
                      >
                        <step.icon className="w-6 h-6" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-bold ${
                            step.completed 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-400'
                          }`}>
                            {step.title}
                          </h3>
                          <span className={`text-sm font-semibold ${
                            step.completed
                              ? 'text-amber-600'
                              : 'text-gray-400'
                          }`}>
                            {step.time}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>

                        {/* Special content for active step */}
                        {currentStatus === step.id && step.id === 3 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800"
                          >
                            <p className="text-sm text-amber-800 dark:text-amber-200 font-semibold flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Your delivery partner is {estimatedTime} minutes away
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Delivery Person Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Delivery Partner
              </h3>

              {/* Profile */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl">
                  {deliveryPerson.name.charAt(0)}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {deliveryPerson.name}
                </h4>
                <div className="flex items-center justify-center gap-1 text-amber-600 mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{deliveryPerson.rating}</span>
                  <span className="text-gray-500 text-sm">
                    ({deliveryPerson.totalDeliveries} deliveries)
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🏍️ {deliveryPerson.vehicleNumber}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.a
                  href={`tel:${deliveryPerson.phone}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Driver
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </motion.button>
              </div>

              {/* Delivery Instructions */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Delivery Address
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  123 Main Street, Apartment 4B<br />
                  Near City Mall, Bhopal<br />
                  MP - 462001
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Need Help? 🤝
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Having issues with your order? Our support team is here to help!
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Report Issue
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;