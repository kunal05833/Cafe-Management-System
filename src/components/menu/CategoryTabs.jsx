import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
import { Coffee, Cookie, Cake, Droplets } from 'lucide-react';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryConfig = {
    all: { label: 'All Items', icon: Coffee },
    coffee: { label: 'Coffee', icon: Coffee },
    snacks: { label: 'Snacks', icon: Cookie },
    desserts: { label: 'Desserts', icon: Cake },
    beverages: { label: 'Beverages', icon: Droplets }
  };

  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <TabsList className="grid grid-cols-5 w-full">
        {categories.map((category) => {
          const config = categoryConfig[category] || { label: category, icon: Coffee };
          const Icon = config.icon;

          return (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{config.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;