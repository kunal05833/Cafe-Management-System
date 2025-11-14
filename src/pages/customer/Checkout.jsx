import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, CreditCard, Wallet, Smartphone, 
  CheckCircle, ArrowRight, Plus, Edit2, Tag, AlertCircle 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Delivery Info
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Bhopal',
    pincode: ''
  });

  // Delivery Options
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const deliveryOptions = [
    { 
      id: 'express', 
      name: 'Express Delivery', 
      time: '20-30 mins', 
      price: 50,
      icon: '⚡'
    },
    { 
      id: 'standard', 
      name: 'Standard Delivery', 
      time: '40-50 mins', 
      price: 30,
      icon: '🚴'
    },
    { 
      id: 'scheduled', 
      name: 'Scheduled Delivery', 
      time: 'Choose time', 
      price: 30,
      icon: '📅'
    }
  ];

  // Schedule Time (for scheduled delivery)
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const paymentMethods = [
    { 
      id: 'cod', 
      name: 'Cash on Delivery', 
      icon: '💵',
      description: 'Pay when you receive'
    },
    { 
      id: 'upi', 
      name: 'UPI Payment', 
      icon: '📱',
      description: 'Google Pay, PhonePe, Paytm'
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: '💳',
      description: 'Visa, Mastercard, Rupay'
    },
    { 
      id: 'wallet', 
      name: 'Digital Wallet', 
      icon: '👛',
      description: 'Paytm, PhonePe, Amazon Pay'
    }
  ];

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Available Coupons
  const availableCoupons = [
    { code: 'FIRST50', discount: 50, type: 'flat', minOrder: 200, description: 'Flat ₹50 off on first order' },
    { code: 'SAVE10', discount: 10, type: 'percent', minOrder: 300, description: '10% off on orders above ₹300' },
    { code: 'COFFEE20', discount: 20, type: 'flat', minOrder: 150, description: '₹20 off on coffee orders' }
  ];

  // Calculate Pricing
  const subtotal = getCartTotal();
  const selectedDelivery = deliveryOptions.find(opt => opt.id === deliveryOption);
  const deliveryCharge = selectedDelivery?.price || 0;
  const platformFee = 5;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      discount = appliedCoupon.discount;
    } else {
      discount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
  }
  
  const taxableAmount = subtotal - discount + deliveryCharge + platformFee;
  const gst = Math.round(taxableAmount * 0.05);
  const total = taxableAmount + gst;

  // Apply Coupon
  const handleApplyCoupon = () => {
    setCouponError('');
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order value ₹${coupon.minOrder} required`);
      return;
    }
    
    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  // Place Order
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    clearCart();
    setOrderPlaced(true);
    setLoading(false);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  // Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center space-y-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Order Placed! 🎉
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your order will be delivered in {selectedDelivery?.time}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Redirecting to orders...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Steps */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Checkout 🛒
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl">
            {['Delivery', 'Payment', 'Review'].map((label, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    step > index + 1 
                      ? 'bg-green-500 text-white' 
                      : step === index + 1
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {step > index + 1 ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm font-semibold ${
                    step === index + 1 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-1 flex-1 mx-2 ${
                    step > index + 1 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Delivery Address */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-amber-600" />
                    Delivery Address
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
                      className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Address *"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                      className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Landmark"
                      value={deliveryInfo.landmark}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, landmark: e.target.value})}
                      className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      value={deliveryInfo.pincode}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, pincode: e.target.value})}
                      className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-amber-600" />
                    Delivery Time
                  </h2>
                  
                  <div className="space-y-3">
                    {deliveryOptions.map(option => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setDeliveryOption(option.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all ${
                          deliveryOption === option.id
                            ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600'
                            : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{option.icon}</span>
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white">
                                {option.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {option.time}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-amber-600">
                            ₹{option.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {deliveryOption === 'scheduled' && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                      />
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-amber-600" />
                    Payment Method
                  </h2>
                  
                  <div className="space-y-3">
                    {paymentMethods.map(method => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600'
                            : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{method.icon}</span>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                              {method.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Review Order
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Place Order */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center text-3xl">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Bill Details
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-amber-600">₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Apply Coupon
                  </h4>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-amber-600 text-white rounded-xl font-semibold text-sm"
                    >
                      Apply
                    </motion.button>
                  </div>
                  
                  {couponError && (
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {couponError}
                    </p>
                  )}
                  
                  {appliedCoupon && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {appliedCoupon.code} applied!
                      </p>
                    </div>
                  )}

                  {/* Available Coupons */}
                  <div className="mt-3 space-y-2">
                    {availableCoupons.map(coupon => (
                      <div 
                        key={coupon.code}
                        onClick={() => setCouponCode(coupon.code)}
                        className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all"
                      >
                        <p className="text-xs font-bold text-amber-600">{coupon.code}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{coupon.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;