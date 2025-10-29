import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import BottomSheet from "../sheet/BottomSheet";

const MenuCardV2 = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const add = () => {
    dispatch(addToCart({ ...item, quantity: qty }));
    setOpen(false); setQty(1);
  };

  return (
    <>
      <motion.div whileHover={{ y: -3 }} className="bg-card rounded-xl shadow-sm overflow-hidden border">
        <div className="relative h-40 overflow-hidden">
          <img src={item.imageURL || "https://via.placeholder.com/600x400?text=Coffee"} alt={item.name} className="w-full h-full object-cover" />
          <motion.button onClick={() => setOpen(true)} whileTap={{ scale: 0.95 }} className="absolute bottom-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded-lg text-sm flex items-center gap-1 border">
            <Eye className="w-4 h-4" /> View
          </motion.button>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold line-clamp-1">{item.name}</h4>
            <span className="text-primary font-bold">₹{item.price}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))} className="mt-3 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98]">
            <Plus className="w-4 h-4" /> Add to Cart
          </motion.button>
        </div>
      </motion.div>

      <BottomSheet open={open} onOpenChange={setOpen} title="Quick View" footer={
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="py-3 rounded-lg bg-muted">-</button>
          <div className="py-3 rounded-lg border grid place-items-center">{qty}</div>
          <button onClick={() => setQty(qty + 1)} className="py-3 rounded-lg bg-muted">+</button>
          <button onClick={add} className="col-span-3 mt-2 py-3 rounded-lg bg-primary text-white font-medium">Add ₹{item.price * qty}</button>
        </div>
      }>
        <div className="flex gap-3">
          <img src={item.imageURL || "https://via.placeholder.com/120?text=Coffee"} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
          <div className="flex-1">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            <div className="mt-2 text-primary font-bold">₹{item.price}</div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
export default MenuCardV2;