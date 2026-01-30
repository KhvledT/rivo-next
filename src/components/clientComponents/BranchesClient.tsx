// src/components/Sections/Branches/BranchesClient.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Branch } from "@/data/branches";
import { BranchCard } from "../BranchCard";
import BranchesMap from "../sections/BranchesWrapper";
import { SkeletonBranchCard } from "../SkeletonCard";

type Props = {
  branches: Branch[];
};

export default function BranchesClient({ branches }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // debounce بسيط 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // استخدم useMemo لتقليل الحسابات
  const filteredBranches = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return branches;
    return branches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        (b.address || "").toLowerCase().includes(q),
    );
  }, [branches, debouncedQuery]);

  
    useEffect(() => {
      setIsLoading(true);
  
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Our Branches
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find your nearest RIVO café and check seat availability
        </p>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-border"
      >
        <BranchesMap branches={filteredBranches} />
      </motion.div>

      {/* Branches Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[...Array(2)].map((_, i) => (
              <SkeletonBranchCard key={i} />
            ))}
          </motion.div>
        ) : filteredBranches.length > 0 ? (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredBranches.map((branch, index) => (
              <BranchCard key={branch.id} branch={branch} index={index} />
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
