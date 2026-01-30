/* eslint-disable react-refresh/only-export-components */
'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

import { Product, ProductSize, ProductAddon } from '@/data/products'

/* ----------------------------- types & helpers ---------------------------- */

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize?: ProductSize
  selectedAddons: ProductAddon[]
  totalPrice: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size?: ProductSize, addons?: ProductAddon[]) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const calculateItemPrice = (
  product: Product,
  size?: ProductSize,
  addons: ProductAddon[] = []
): number => {
  let price = product.price
  if (size) price += size.priceModifier
  if (addons.length) price += addons.reduce((s, a) => s + a.price, 0)
  return price
}

/* ------------------------------ context value ----------------------------- */

// NOTE: we keep the context **inside** the same file (not exported separately)
// so other modules import the hook `useCart` from this file.
const CartContext = createContext<CartContextType | undefined>(undefined)

/* ------------------------------- Provider -------------------------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback(
    (product: Product, size?: ProductSize, addons: ProductAddon[] = []) => {
      const unitPrice = calculateItemPrice(product, size, addons)
      const itemId = `${product.id}-${size?.id ?? 'default'}-${addons.map(a => a.id).join('-')}`

      setItems(prev => {
        const existing = prev.find(i => i.id === itemId)
        if (existing) {
          return prev.map(i =>
            i.id === itemId
              ? { ...i, quantity: i.quantity + 1, totalPrice: unitPrice * (i.quantity + 1) }
              : i
          )
        }
        return [
          ...prev,
          {
            id: itemId,
            product,
            quantity: 1,
            selectedSize: size,
            selectedAddons: addons,
            totalPrice: unitPrice,
          },
        ]
      })
    },
    []
  )

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId))
  }, [])

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        // delete if zero or negative
        setItems(prev => prev.filter(i => i.id !== itemId))
        return
      }

      setItems(prev =>
        prev.map(i => {
          if (i.id !== itemId) return i
          const unitPrice = calculateItemPrice(i.product, i.selectedSize, i.selectedAddons)
          return { ...i, quantity, totalPrice: unitPrice * quantity }
        })
      )
    },
    []
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((s, it) => s + it.quantity, 0)
  const totalPrice = items.reduce((s, it) => s + it.totalPrice, 0)

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/* --------------------------------- Hook ---------------------------------- */

// Export hook from same file for convenience.
// (Because you requested one-file solution.)
export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
