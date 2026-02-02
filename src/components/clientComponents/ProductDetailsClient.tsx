'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react'
import { Product, ProductSize, ProductAddon } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  product: Product
}

export default function ProductDetailsClient({ product }: Props) {
  const router = useRouter()
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    product.sizes?.[0]
  )
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([])
  const [quantity, setQuantity] = useState<number>(1)

  const toggleAddon = (addon: ProductAddon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === addon.id) ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    )
  }

  const calculateTotal = () => {
    let price = product.price ?? 0
    if (selectedSize) price += selectedSize.priceModifier ?? 0
    price += selectedAddons.reduce((sum, addon) => sum + (addon.price ?? 0), 0)
    return price * quantity
  }

  const handleAddToCart = () => {
    if (!product) return
    // add quantity times (current CartContext increments existing item).
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedAddons)
    }
    toast.success(`${product.name} added to cart` , { position: 'top-left' })
    router.push('/cart')
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-32 md:pb-6">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-secondary"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-3 text-muted-foreground text-lg">{product.description}</p>
          </div>

          {product.sizes?.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedSize?.id === size.id ? 'border-primary bg-accent text-primary' : 'border-border bg-card hover:border-primary/50'
                    }`}
                    aria-pressed={selectedSize?.id === size.id}
                  >
                    {size.name}
                    {size.priceModifier > 0 && <span className="ml-2 text-sm text-muted-foreground">+EGP {size.priceModifier}</span>}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {product.addons?.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Add-ons</h3>
              <div className="space-y-2">
                {product.addons.map((addon) => {
                  const isSelected = selectedAddons.some((a) => a.id === addon.id)
                  return (
                    <motion.button
                      key={addon.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        isSelected ? 'border-primary bg-accent' : 'border-border bg-card hover:border-primary/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <span className="text-muted-foreground">+EGP {addon.price}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors" aria-label="Decrease quantity">
                <Minus className="w-5 h-5" />
              </motion.button>
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity((q) => q + 1)} className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors" aria-label="Increase quantity">
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">EGP {calculateTotal()}</span>
            </div>
            <Button onClick={handleAddToCart} className="w-full h-14 btn-primary text-lg">Add to Cart</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
