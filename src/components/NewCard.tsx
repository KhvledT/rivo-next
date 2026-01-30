"use client";

import React, { useMemo, useState } from "react";
import { Product, ProductSize, ProductAddon } from "@/data/products";
import { useCart } from "@/context/CartContext";
import productImage from "@/assets/imgs/product1.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  product: Product;
  className?: string;
  // لو عايز تبدّل الصورة مؤقتًا ممكن تبعت imageOverride
  imageOverride?: string;
  index?: number;
};

export default function NewCard({
  product,
  className = "",
  index,
}: Props) {
  const { addItem } = useCart();

  // sizes from product (may be empty)
  const sizes = product.sizes ?? [];
  const addons = product.addons ?? [];

  // default size: prefer 'large' or 'Large' or the middle one
  const defaultSize = useMemo<ProductSize | undefined>(() => {
    if (!sizes || sizes.length === 0) return undefined;
    const large = sizes.find(
      (s) =>
        s.id.toLowerCase().includes("large") ||
        s.name.toLowerCase() === "large",
    );
    if (large) return large;
    return sizes[Math.floor(sizes.length / 2)] ?? sizes[0];
  }, [sizes]);

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    defaultSize,
  );
  const [selectedAddonId, setSelectedAddonId] = useState<string | "">(
    addons[0]?.id ?? "",
  );

  // compute visible price (base + modifiers/addon)
  const visiblePrice = useMemo(() => {
    let p = product.price;
    if (selectedSize) p += selectedSize.priceModifier ?? 0;
    if (selectedAddonId) {
      const a = addons.find((x) => x.id === selectedAddonId);
      if (a) p += a.price ?? 0;
    }
    return p;
  }, [product.price, selectedSize, selectedAddonId, addons]);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index ? index * 0.1 : 0 }}
      className=" pt-10 md:pt-0"
    >
        <div
          className={`relative w-full rounded-2xl overflow-visible ${className}`}
          aria-label={`${product.name} — ${visiblePrice}`}
        >
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#5c1cff] via-[#6f29ff] to-[#3b12f3] shadow-xl" />

          <div className="relative z-10 px-6 pb-6 flex flex-col gap-10 min-h-full">
            {/* image overflow */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-64 pointer-events-none">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  filter: "blur(48px)",
                  background: "rgba(255,255,255,0.95)",
                  transform: "translateY(100%)",
                }}
              />
              <div className="relative w-full h-full">
                <Image
                  src={productImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-auto translate-y-0 scale-160"
                />
              </div>
            </div>
            {/* title + price */}
            <div className="flex items-end justify-between gap-4 mb-6 h-85">
              <h3 className="text-white text-3xl md:text-4xl font-medium leading-tight">
                {product.name}
              </h3>

              <div className="text-white font-semibold text-4xl md:text-5xl text-center">
                EGP {visiblePrice}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
    </motion.div>
  );
}
