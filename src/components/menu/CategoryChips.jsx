import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const CategoryChips = ({ categories, selected, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-1">
      {categories.map((c) => (
        <motion.button
          key={c}
          onClick={() => onChange(c)}
          whileTap={{ scale: 0.95 }}
          className={cn("px-3 py-2 rounded-full text-sm whitespace-nowrap",
            selected === c ? "bg-primary text-white shadow" : "bg-muted text-foreground")}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};
export default CategoryChips;