import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, toggleCart } from "../../features/cart/cartSlice";
import { motion } from "framer-motion";

const CartFab = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCartCount);
  return (
    <motion.button
      onClick={() => dispatch(toggleCart())}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed md:hidden bottom-20 right-4 z-40 rounded-full bg-primary text-white shadow-xl w-14 h-14 flex items-center justify-center"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-bold w-5 h-5 rounded-full grid place-items-center">
            {count}
          </span>
        )}
      </div>
    </motion.button>
  );
};
export default CartFab;