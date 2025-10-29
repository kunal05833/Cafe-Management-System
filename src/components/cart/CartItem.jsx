import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';

const CartItem = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm"
    >
      <img
        src={item.imageURL || 'https://via.placeholder.com/80'}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <p className="text-primary font-semibold mt-1">₹{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="h-8 w-8"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="h-8 w-8"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-semibold">₹{item.price * item.quantity}</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-destructive hover:text-destructive/90 h-8 w-8"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;