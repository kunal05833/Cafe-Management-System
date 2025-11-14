import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Users, MapPin, CheckCircle, 
  Coffee, X, ChevronRight, Phone, Mail 
} from 'lucide-react';

const TableReservation = () => {
  const [step, setStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    guests: 2,
    section: 'indoor',
    tableType: 'regular',
    specialRequest: '',
    name: '',
    phone: '',
    email: ''
  });

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const sections = [
    {
      id: 'indoor',
      name: 'Indoor Seating',
      icon: '🏠',
      description: 'Air-conditioned comfort',
      available: true
    },
    {
      id: 'outdoor',
      name: 'Outdoor Terrace',
      icon: '🌳',
      description: 'Fresh air & garden view',
      available: true
    },
    {
      id: 'private',
      name: 'Private Room',
      icon: '🚪',
      description: 'For special occasions',
      available: false
    },
    {
      id: 'window',
      name: 'Window Seats',
      icon: '🪟',
      description: 'Scenic street view',
      available: true
    }
  ];

  const tableTypes = [
    {
      id: 'regular',
      name: 'Regular Table',
      icon: '🪑',
      capacity: '2-4 persons',
      price: 'Free'
    },
    {
      id: 'family',
      name: 'Family Table',
      icon: '👨‍👩‍👧‍👦',
      capacity: '5-8 persons',
      price: 'Free'
    },
    {
      id: 'booth',
      name: 'Booth',
      icon: '🛋️',
      capacity: '4-6 persons',
      price: '₹100 reservation fee'
    },
    {
      id: 'vip',
      name: 'VIP Section',
      icon: '👑',
      capacity: '2-4 persons',
      price: '₹200 reservation fee'
    }
  ];

  const handleBooking = () => {
    // Validate
    if (!booking.date || !booking.time || !booking.name || !booking.phone) {
      alert('Please fill all required fields');
      return;
    }

    // Success
    setBookingSuccess(true);
  };

  if (bookingSuccess) {
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
            Reservation Confirmed! 🎉
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-left">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Booking Details:</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>📅 Date: {new Date(booking.date).toLocaleDateString('en-IN')}</p>
              <p>🕐 Time: {booking.time}</p>
              <p>👥 Guests: {booking.guests} persons</p>
              <p>📍 Section: {sections.find(s => s.id === booking.section)?.name}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            A confirmation has been sent to your email/phone
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold shadow-xl"
          >
            Back to Home
          </motion.button>
        </motion.div>
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
            Reserve a Table 🍽️
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Book your perfect spot at our cafe
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
          {['Select Date & Time', 'Choose Table', 'Contact Info'].map((label, index) => (
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
                <span className={`text-xs font-semibold text-center ${
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-amber-600" />
                      Select Date
                    </h2>
                    <input
                      type="date"
                      value={booking.date}
                      onChange={(e) => setBooking({...booking, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-amber-600" />
                      Select Time
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {timeSlots.map(time => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setBooking({...booking, time})}
                          className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                            booking.time === time
                              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Users className="w-6 h-6 text-amber-600" />
                      Number of Guests
                    </h2>
                    <div className="flex items-center justify-center gap-6">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setBooking({...booking, guests: Math.max(1, booking.guests - 1)})}
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        -
                      </motion.button>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white min-w-[60px] text-center">
                        {booking.guests}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setBooking({...booking, guests: Math.min(20, booking.guests + 1)})}
                        className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => booking.date && booking.time ? setStep(2) : alert('Please select date and time')}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Choose Table */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-amber-600" />
                      Choose Section
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {sections.map(section => (
                        <motion.button
                          key={section.id}
                          whileHover={{ scale: section.available ? 1.03 : 1 }}
                          whileTap={{ scale: section.available ? 0.97 : 1 }}
                          onClick={() => section.available && setBooking({...booking, section: section.id})}
                          disabled={!section.available}
                          className={`p-6 rounded-2xl text-left transition-all ${
                            booking.section === section.id
                              ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600'
                              : section.available
                              ? 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300'
                              : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-4xl mb-3">{section.icon}</div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                            {section.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {section.description}
                          </p>
                          {!section.available && (
                            <span className="text-xs text-red-600 dark:text-red-400 font-semibold mt-2 inline-block">
                              Not Available
                            </span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Table Type
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {tableTypes.map(table => (
                        <motion.button
                          key={table.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setBooking({...booking, tableType: table.id})}
                          className={`p-6 rounded-2xl text-left transition-all ${
                            booking.tableType === table.id
                              ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-600'
                              : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300'
                          }`}
                        >
                          <div className="text-4xl mb-3">{table.icon}</div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                            {table.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {table.capacity}
                          </p>
                          <span className="text-xs font-semibold text-amber-600">
                            {table.price}
                          </span>
                        </motion.button>
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
                      className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={booking.name}
                          onChange={(e) => setBooking({...booking, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={booking.phone}
                          onChange={(e) => setBooking({...booking, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={booking.email}
                          onChange={(e) => setBooking({...booking, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          rows="3"
                          value={booking.specialRequest}
                          onChange={(e) => setBooking({...booking, specialRequest: e.target.value})}
                          placeholder="Any dietary restrictions, celebration, etc."
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 outline-none text-gray-900 dark:text-white resize-none"
                        />
                      </div>
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
                      onClick={handleBooking}
                      className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-xl"
                    >
                      Confirm Reservation
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Booking Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {booking.date ? new Date(booking.date).toLocaleDateString('en-IN') : 'Not selected'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {booking.time || 'Not selected'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Users className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {booking.guests} persons
                    </p>
                  </div>
                </div>

                {booking.section && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Section</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {sections.find(s => s.id === booking.section)?.name}
                      </p>
                    </div>
                  </div>
                )}

                {booking.tableType && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Coffee className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Table Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {tableTypes.find(t => t.id === booking.tableType)?.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Pro Tip:</strong> Arrive 10 minutes early to enjoy our welcome drinks!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;