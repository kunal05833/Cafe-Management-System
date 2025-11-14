import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ThumbsUp, MessageCircle, Filter, 
  Search, Image, X, Send, TrendingUp 
} from 'lucide-react';

const Reviews = () => {
  const [filter, setFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    photos: []
  });

  const overallRating = {
    average: 4.6,
    total: 1248,
    distribution: {
      5: 820,
      4: 285,
      3: 98,
      2: 32,
      1: 13
    }
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: 'Priya Sharma',
        avatar: 'P',
        verified: true
      },
      rating: 5,
      title: 'Amazing Coffee & Great Service!',
      comment: 'The cappuccino here is absolutely delicious! The staff is very friendly and the ambiance is perfect for working. Will definitely come back!',
      date: '2024-01-15',
      helpful: 45,
      photos: ['☕', '🍰', '🏪'],
      orderItems: ['Cappuccino', 'Chocolate Cake']
    },
    {
      id: 2,
      user: {
        name: 'Rahul Kumar',
        avatar: 'R',
        verified: true
      },
      rating: 4,
      title: 'Good food, quick delivery',
      comment: 'Ordered a veggie sandwich and cold coffee. Both were really good and arrived hot! Just wish the packaging was more eco-friendly.',
      date: '2024-01-14',
      helpful: 32,
      photos: ['🥪', '🥤'],
      orderItems: ['Veggie Sandwich', 'Cold Coffee']
    },
    {
      id: 3,
      user: {
        name: 'Sneha Patel',
        avatar: 'S',
        verified: false
      },
      rating: 5,
      title: 'Best cafe in town! ⭐',
      comment: 'I absolutely love this place! The espresso is strong and perfectly brewed. The desserts are to die for. Highly recommended!',
      date: '2024-01-13',
      helpful: 67,
      photos: ['☕', '🍰', '🧁'],
      orderItems: ['Espresso', 'Red Velvet Cake']
    },
    {
      id: 4,
      user: {
        name: 'Amit Singh',
        avatar: 'A',
        verified: true
      },
      rating: 3,
      title: 'Decent but can improve',
      comment: 'The food was okay. Coffee was good but took a while to arrive. Service could be faster.',
      date: '2024-01-12',
      helpful: 12,
      photos: [],
      orderItems: ['Latte', 'Club Sandwich']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Reviews', count: 1248 },
    { id: '5', label: '5 Stars', count: 820 },
    { id: '4', label: '4 Stars', count: 285 },
    { id: '3', label: '3 Stars', count: 98 },
    { id: 'photos', label: 'With Photos', count: 456 },
    { id: 'verified', label: 'Verified', count: 892 }
  ];

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    // Submit review logic
    alert('Review submitted successfully! 🎉');
    setShowReviewModal(false);
    setNewReview({ rating: 0, title: '', comment: '', photos: [] });
  };

  const RatingDistribution = () => (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map(star => {
        const count = overallRating.distribution[star];
        const percentage = (count / overallRating.total) * 100;
        
        return (
          <div key={star} className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-8">
              {star} ⭐
            </span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: star * 0.1 }}
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );

  const StarRating = ({ rating, onRatingChange, interactive = false }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <motion.button
          key={star}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={() => interactive && onRatingChange(star)}
          disabled={!interactive}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-amber-500 text-amber-500'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );

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
            Reviews & Ratings ⭐
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            See what our customers are saying
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Overall Rating Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                  {overallRating.average}
                </div>
                <div className="flex justify-center mb-2">
                  <StarRating rating={Math.round(overallRating.average)} />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on {overallRating.total.toLocaleString()} reviews
                </p>
              </div>

              <RatingDistribution />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReviewModal(true)}
                className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Write a Review
              </motion.button>

              {/* Top Reviewer Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Top Reviewer
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Write 5 reviews to earn special badges and rewards!
                </p>
              </div>
            </motion.div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
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
                    {f.label} ({f.count})
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* User Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {review.user.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {review.user.name}
                          </h3>
                          {review.user.verified && (
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {review.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {/* Order Items */}
                  {review.orderItems.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {review.orderItems.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-semibold rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Photos */}
                  {review.photos.length > 0 && (
                    <div className="mb-4 flex gap-3">
                      {review.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center text-3xl"
                        >
                          {photo}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 font-semibold text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Reply
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Load More Reviews
            </motion.button>
          </div>
        </div>

        {/* Write Review Modal */}
        <AnimatePresence>
          {showReviewModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowReviewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Write a Review
                  </h2>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Your Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setNewReview({...newReview, rating: star})}
                        >
                          <Star
                            className={`w-10 h-10 ${
                              star <= newReview.rating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Review Title
                    </label>
                    <input
                      type="text"
                      placeholder="Sum up your experience"
                      value={newReview.title}
                      onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-500 outline-none text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      rows="5"
                      placeholder="Share your experience with us..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-500 outline-none text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  {/* Photos */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Add Photos (Optional)
                    </label>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-amber-500 transition-all"
                      >
                        <Image className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500">Add Photo</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitReview}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Review
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;