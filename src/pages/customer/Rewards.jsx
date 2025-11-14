import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, Star, Trophy, Zap, Crown, Coffee, 
  TrendingUp, Award, Sparkles, ChevronRight 
} from 'lucide-react';

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(420);
  const [currentTier, setCurrentTier] = useState('Gold');
  const [nextTierPoints, setNextTierPoints] = useState(580);

  const tiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      color: 'from-orange-700 to-amber-600',
      icon: '🥉',
      benefits: [
        '5% discount on all orders',
        'Birthday special offer',
        'Early access to new items'
      ]
    },
    {
      name: 'Silver',
      minPoints: 200,
      color: 'from-gray-400 to-gray-500',
      icon: '🥈',
      benefits: [
        '10% discount on all orders',
        'Free delivery on orders above ₹300',
        'Priority customer support',
        'Exclusive member offers'
      ]
    },
    {
      name: 'Gold',
      minPoints: 500,
      color: 'from-yellow-400 to-amber-500',
      icon: '🥇',
      benefits: [
        '15% discount on all orders',
        'Free delivery on all orders',
        '2x points on weekends',
        'Complimentary dessert every month',
        'VIP customer support'
      ]
    },
    {
      name: 'Platinum',
      minPoints: 1000,
      color: 'from-purple-400 to-indigo-500',
      icon: '💎',
      benefits: [
        '20% discount on all orders',
        'Free delivery + priority delivery',
        '3x points on all orders',
        'Complimentary beverage weekly',
        'Exclusive tasting events',
        'Personal menu recommendations'
      ]
    }
  ];

  const rewardItems = [
    {
      id: 1,
      name: 'Free Cappuccino',
      points: 100,
      icon: '☕',
      category: 'Beverages',
      saved: 120
    },
    {
      id: 2,
      name: 'Free Sandwich',
      points: 150,
      icon: '🥪',
      category: 'Food',
      saved: 100
    },
    {
      id: 3,
      name: 'Free Dessert',
      points: 120,
      icon: '🍰',
      category: 'Desserts',
      saved: 180
    },
    {
      id: 4,
      name: '20% Off Next Order',
      points: 200,
      icon: '🎫',
      category: 'Discounts',
      saved: 150
    },
    {
      id: 5,
      name: 'Free Cold Coffee',
      points: 130,
      icon: '🥤',
      category: 'Beverages',
      saved: 150
    },
    {
      id: 6,
      name: 'Combo Meal Deal',
      points: 250,
      icon: '🍔',
      category: 'Combos',
      saved: 200
    }
  ];

  const pointsHistory = [
    { 
      id: 1, 
      action: 'Order #ORD-001', 
      points: +50, 
      date: '2024-01-15',
      type: 'earned'
    },
    { 
      id: 2, 
      action: 'Weekend Bonus', 
      points: +20, 
      date: '2024-01-14',
      type: 'bonus'
    },
    { 
      id: 3, 
      action: 'Redeemed Free Coffee', 
      points: -100, 
      date: '2024-01-13',
      type: 'redeemed'
    },
    { 
      id: 4, 
      action: 'Order #ORD-002', 
      points: +75, 
      date: '2024-01-12',
      type: 'earned'
    }
  ];

  const progressPercentage = (userPoints / nextTierPoints) * 100;

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      alert(`${reward.name} redeemed successfully! ✨`);
    } else {
      alert(`You need ${reward.points - userPoints} more points to redeem this reward.`);
    }
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
            Rewards Program 🎁
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Earn points with every order and unlock exclusive rewards
          </p>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl mb-8 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-8xl">⭐</div>
            <div className="absolute bottom-10 left-10 text-6xl">🎁</div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-purple-200 mb-2">Your Balance</p>
                <h2 className="text-5xl font-bold flex items-center gap-3">
                  <Sparkles className="w-10 h-10" />
                  {userPoints} Points
                </h2>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl mb-2">
                  {tiers.find(t => t.name === currentTier)?.icon}
                </div>
                <p className="text-sm font-semibold">{currentTier} Member</p>
              </div>
            </div>

            {/* Progress to Next Tier */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-200">Next tier: {tiers[tiers.findIndex(t => t.name === currentTier) + 1]?.name || 'Max Level'}</span>
                <span className="font-semibold">{userPoints} / {nextTierPoints} pts</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Membership Tiers
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl ${
                  tier.name === currentTier ? 'ring-4 ring-amber-500' : ''
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {tier.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {tier.minPoints} points required
                </p>

                <ul className="space-y-2">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {tier.name === currentTier && (
                  <div className="mt-4 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-center">
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                      Current Tier
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rewards Catalog */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Redeem Rewards
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {rewardItems.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center text-4xl">
                          {reward.icon}
                        </div>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">
                          {reward.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {reward.name}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-1 text-amber-600 font-bold">
                            <Sparkles className="w-4 h-4" />
                            {reward.points} Points
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Worth ₹{reward.saved}
                          </p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRedeemReward(reward)}
                        disabled={userPoints < reward.points}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          userPoints >= reward.points
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {userPoints >= reward.points ? 'Redeem Now' : `Need ${reward.points - userPoints} more points`}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Points History */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl sticky top-24"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Points History
              </h3>

              <div className="space-y-4">
                {pointsHistory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.type === 'earned' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : item.type === 'bonus'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {item.type === 'earned' ? <TrendingUp className="w-5 h-5" /> :
                       item.type === 'bonus' ? <Gift className="w-5 h-5" /> :
                       <Star className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {item.action}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>

                    <span className={`font-bold ${
                      item.points > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {item.points > 0 ? '+' : ''}{item.points}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                View All History
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* How to Earn Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">How to Earn Points? 💡</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Place Orders</h3>
                <p className="text-blue-100">Earn 1 point for every ₹10 spent</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Leave Reviews</h3>
                <p className="text-blue-100">Get 10 bonus points for each review</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Refer Friends</h3>
                <p className="text-blue-100">Earn 50 points per successful referral</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default Rewards;