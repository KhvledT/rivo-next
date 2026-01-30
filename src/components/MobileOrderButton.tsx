"use client"
import  Link  from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';



export const MobileOrderButton = () => {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50"
    >
      <Link href="/cart">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-primary-foreground rounded-2xl p-4 flex items-center justify-between shadow-brand"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-semibold">{totalItems} items</span>
          </div>
          <span className="font-bold text-lg">EGP {totalPrice}</span>
        </motion.button>
      </Link>
    </motion.div>
  );
};
