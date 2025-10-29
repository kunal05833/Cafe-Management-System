import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);
  
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return {
    items,
    isOpen,
    cartCount,
    cartTotal,
    addItem: (item) => dispatch(addToCart(item)),
    removeItem: (id) => dispatch(removeFromCart(id)),
    updateItemQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    clearAllItems: () => dispatch(clearCart())
  };
};