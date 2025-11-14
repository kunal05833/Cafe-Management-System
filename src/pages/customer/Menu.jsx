import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Plus, Minus, Star, Flame, Coffee, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Menu = () => {
const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [error, setError] = useState("");

  const categories = ['All', 'Hot Coffee', 'Cold Drinks', 'Snacks', 'Desserts', 'Special'];

useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu:", error.message);
      setError("Failed to load menu. Please try again later.");
    } finally {
      setLoading(false); // ✅ important: stop loading even if there's an error
    }
  };

  fetchMenuItems();
}, []);





  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchQuery, menuItems]);

const fetchMenu = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    const menuData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(menuData); // check in console
    setMenu(menuData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
};

  const filterItems = () => {
    let filtered = menuItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const getCartQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleIncrement = (itemId) => {
    const quantity = getCartQuantity(itemId);
    updateQuantity(itemId, quantity + 1);
  };

  const handleDecrement = (itemId) => {
    const quantity = getCartQuantity(itemId);
    if (quantity > 1) {
      updateQuantity(itemId, quantity - 1);
    }
  };

  // Dummy data for testing
  const dummyMenuData = [
    {
      id: '1',
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk foam',
      price: 120,
      category: 'Hot Coffee',
      image: '☕',
      rating: 4.8,
      popular: true
    },
    {
      id: '2',
      name: 'Cold Coffee',
      description: 'Chilled coffee with ice cream',
      price: 150,
      category: 'Cold Drinks',
      image: '🥤',
      rating: 4.9,
      popular: true
    },
    {
      id: '3',
      name: 'Veggie Sandwich',
      description: 'Fresh vegetables with cheese',
      price: 100,
      category: 'Snacks',
      image: '🥪',
      rating: 4.5,
      popular: false
    },
    {
      id: '4',
      name: 'Chocolate Cake',
      description: 'Rich chocolate layered cake',
      price: 180,
      category: 'Desserts',
      image: '🍰',
      rating: 4.9,
      popular: true
    },
    {
      id: '5',
      name: 'Espresso',
      description: 'Strong and aromatic coffee shot',
      price: 80,
      category: 'Hot Coffee',
      image: '☕',
      rating: 4.7,
      popular: false
    },
    {
      id: '6',
      name: 'Iced Tea',
      description: 'Refreshing lemon iced tea',
      price: 90,
      category: 'Cold Drinks',
      image: '🍵',
      rating: 4.6,
      popular: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading delicious menu...</p>
        </div>
      </div>
    );
  }

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
            Our Menu ☕
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover our delicious offerings
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for coffee, snacks, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 overflow-x-auto pb-4"
        >
          <div className="flex gap-3 min-w-max">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Coffee className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No items found. Try a different search or category.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => {
                const quantity = getCartQuantity(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    {/* Item Image */}
                    <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                      <div className="text-7xl">{item.image}</div>
                      
                      {/* Popular Badge */}
                      {item.popular && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          Popular
                        </div>
                      )}

                      {/* Rating */}
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-amber-600">
                          ₹{item.price}
                        </div>

                        {/* Add to Cart / Quantity Controls */}
                        {quantity === 0 ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </motion.button>
                        ) : (
                          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl px-2 py-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDecrement(item.id)}
                              className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                              <Minus className="w-4 h-4 text-gray-700 dark:text-white" />
                            </motion.button>
                            
                            <span className="text-lg font-bold text-gray-900 dark:text-white min-w-[24px] text-center">
                              {quantity}
                            </span>
                            
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleIncrement(item.id)}
                              className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;