import { createContext, useState, useEffect, useContext } from 'react';

// ==================== CREATE CONTEXT ====================
export const CartContext = createContext();

// ==================== CUSTOM HOOK ====================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// ==================== PROVIDER COMPONENT ====================
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // ==================== LOAD CART FROM LOCALSTORAGE ====================
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        console.log('Cart loaded from localStorage:', parsedCart.length, 'items');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem('cart');
    }
  }, []);

  // ==================== SAVE CART & CALCULATE TOTAL ====================
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      calculateTotal();
      console.log('Cart saved. Total items:', cartItems.length);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // ==================== CALCULATE TOTAL PRICE ====================
  const calculateTotal = () => {
    const sum = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotal(sum);
  };

  // ==================== ADD ITEM TO CART ====================
  const addToCart = (item) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    
    if (existingItem) {
      // Update quantity if item already exists
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
      console.log('Item quantity increased:', item.name);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      console.log('New item added to cart:', item.name);
    }
  };

  // ==================== REMOVE ITEM FROM CART ====================
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    console.log('Item removed from cart:', itemId);
  };

  // ==================== UPDATE ITEM QUANTITY ====================
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
    console.log('Item quantity updated:', itemId, 'to', quantity);
  };

  // ==================== CLEAR ENTIRE CART ====================
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    console.log('Cart cleared');
  };

  // ==================== GET CART ITEM COUNT ====================
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // ==================== CHECK IF ITEM IN CART ====================
  const isInCart = (itemId) => {
    return cartItems.some(item => item.id === itemId);
  };

  // ==================== GET ITEM QUANTITY ====================
  const getItemQuantity = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  // ==================== INCREASE QUANTITY ====================
  const increaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
//========================GET TOTAL==============================
  const getCartTotal = () => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

  // ==================== DECREASE QUANTITY ====================
  const decreaseQuantity = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      setCartItems(cartItems.map(i =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    } else {
      removeFromCart(itemId);
    }
  };

  // ==================== CONTEXT VALUE ====================
  const value = {
    // State
    cartItems,
    total,
    
    // Functions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    
    // Helpers
    getCartCount,
    isInCart,
    getCartTotal,
    getItemQuantity
  };

  // ==================== RENDER PROVIDER ====================
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;