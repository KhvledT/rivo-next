"use client";

import React, { useMemo, useState } from "react";
import { Product, ProductSize, ProductAddon } from "@/data/products";
import { useCart } from "@/context/CartContext";
import productImage from "@/assets/imgs/product1.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {
  product: Product;
  className?: string;
  // لو عايز تبدّل الصورة مؤقتًا ممكن تبعت imageOverride
  imageOverride?: string;
  index?: number;
};

export default function ProductCard({
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

  function handleAddToCart(e?: React.MouseEvent) {
    e?.preventDefault();
    
    // display tooster from sonner

    toast.success("Item added to cart!", { position: "top-left" });
    const selectedAddon = addons.find((a) => a.id === selectedAddonId);
    // addItem(product, size?, addons?)
    addItem(product, selectedSize, selectedAddon ? [selectedAddon] : []);
    // لو عايز تعمل redirect للكارت هنا، اعمل: router.push('/cart')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index ? index * 0.1 : 0 }}
      className=" pt-10 md:pt-0"
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className={`relative w-full h-full rounded-2xl overflow-visible ${className}`}
          aria-label={`${product.name} — ${visiblePrice}`}
        >
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#5c1cff] via-[#6f29ff] to-[#3b12f3] shadow-xl" />

          <div className="relative z-10 px-6 pb-6 flex flex-col gap-10 h-full">
            {/* image overflow */}
            <div className="relative left-1/2 top-0 -translate-x-1/2 w-40 sm:w-64 pointer-events-none">
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
            <div className="flex items-end justify-between gap-2 sm:mb-6 sm:pt-10">
              <h3 className="text-white text-md sm:text-4xl font-medium leading-tight">
                {product.name}
              </h3>

              <div className="text-white font-semibold text-md sm:text-4xl md:text-5xl text-center">
                EGP {visiblePrice}
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              variant="outline"
                    className="
                    mt-auto
                      uppercase
                      relative
                      w-full sm:w-auto
                      rounded-full
                      border border-white/30
                      bg-white/5
                      backdrop-blur-2xl
                      text-white font-medium
                      hover:text-white

                      shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                      hover:bg-white/30
                      transition-all duration-200

                      before:absolute
                      before:inset-0
                      before:rounded-full
                      before:bg-linear-to-b
                      before:from-white/40
                      before:to-transparent
                      before:opacity-70
                      before:pointer-events-none

                      after:absolute
                      after:inset-0
                      after:rounded-full
                      after:ring-1
                      after:ring-white/20
                      after:pointer-events-none

                      active:scale-95"
                  >
              add to cart
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
      </Link>
    </motion.div>
  );
}
