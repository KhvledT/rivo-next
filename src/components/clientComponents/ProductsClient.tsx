"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

import { CategoryFilter } from "@/components/CategoryFilter";
import { SkeletonCard } from "../SkeletonCard";

import {
  Product,
  ProductCategory,
  getProductsByCategory,
} from "@/data/products";

import { Input } from "@/components/ui/input";
import ProductCard from "../ProductCard";

type Props = {
  initialProducts: Product[];
};

export default function ProductsClient({ initialProducts }: Props) {
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "hot-drinks"
  >("hot-drinks");

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let result = getProductsByCategory(activeCategory);

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        );
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Our Menu
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our handcrafted selection of beverages and treats
        </p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-secondary border-0 focus-visible:ring-primary"
          />
        </div>

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-y-15 pt-10"
          >
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-y-15 pt-10"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-muted-foreground text-sm mt-2">
              Try adjusting your search or filter
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
