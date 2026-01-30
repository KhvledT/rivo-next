'use client'

import { motion } from 'framer-motion';
import { categories, ProductCategory } from '@/data/products';

interface CategoryFilterProps {
  activeCategory: ProductCategory | 'hot-drinks';
  onCategoryChange: (category: ProductCategory | 'hot-drinks') => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id as ProductCategory | 'hot-drinks')}
          className={`relative px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === category.id
              ? 'text-primary-foreground'
              : 'text-foreground bg-secondary hover:bg-secondary/80'
          }`}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-primary rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};
