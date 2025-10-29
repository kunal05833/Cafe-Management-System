import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Cookie, Cake, Droplets } from 'lucide-react';
import { cn } from '../../utils/cn';

const MenuFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryIcons = {
    all: Coffee,
    coffee: Coffee,
    snacks: Cookie,
    desserts: Cake,
    beverages: Droplets
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Coffee;
        const isActive = selectedCategory === category;

        return (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium capitalize">{category}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MenuFilter;