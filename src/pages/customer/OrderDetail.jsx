import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Clock, CheckCircle, Package, Truck } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy order data
  const order = {
    id: id || 'ORD-001',
    items: [
      { name: 'Cappuccino', quantity: 2, price: 120, image: '☕' },
      { name: 'Veggie Sandwich', quantity: 1, price: 100, image: '🥪' }
    ],
    subtotal: 340,
    deliveryFee: 30,
    tax: 17,
    total: 387,
    status: 'Processing',
    orderDate: '2024-01-16T10:30:00',
    estimatedDelivery: '2024-01-16T11:30:00',
    deliveryAddress: '123 Main Street, Apartment 4B, City, State - 123456',
    phone: '+91 9876543210',
    paymentMethod: 'Cash on Delivery',
    orderNotes: 'Please ring the doorbell twice'
  };

  const statusSteps = [
    { name: 'Order Placed', icon: CheckCircle, completed: true },
    { name: 'Preparing', icon: Package, completed: true },
    { name: 'Out for Delivery', icon: Truck, completed: false },
    { name: 'Delivered', icon: CheckCircle, completed: false }
  ];

  const getStatusIndex = (status) => {
    const statusMap = {
      'Pending': 0,
      'Processing': 1,
      'Out for Delivery': 2,
      'Completed': 3
    };
    return statusMap[status] || 0;
  };

  const currentStep = getStatusIndex(order.status);

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
            Order Details
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Order {order.id}
          </p>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Order Status
          </h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 dark:bg-gray-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-amber-600 to-orange-600"
              />
            </div>

            {/* Status Steps */}
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg mb-3 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                  <p className={`text-sm font-semibold text-center ${
                    index <= currentStep
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Items
              </h2>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center text-3xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      ₹{item.quantity * item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span>₹{order.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>₹{order.tax}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-amber-600">₹{order.total}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Delivery Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      Delivery Address
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      Phone Number
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      Estimated Delivery
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.estimatedDelivery).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Payment Method
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {order.paymentMethod}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;