'use client'

import React, { JSX, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Apple,
  Check
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// delivery fee constant (tweakable)
const DELIVERY_FEE = 25

const paymentMethods = [
  { id: 'instapay', name: 'InstaPay', icon: Smartphone },
  { id: 'visa', name: 'Visa / Mastercard', icon: CreditCard },
  { id: 'apple', name: 'Apple Pay', icon: Apple },
]

export default function CheckoutClient(): JSX.Element {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  })

  const grandTotal = totalPrice + DELIVERY_FEE

  /* redirect to cart if cart is empty (protects from showing checkout with no data) */
  useEffect(() => {
    if ((!items || items.length === 0) && step !== 'success') {
      router.push('/cart')
    }
  }, [items, step, router])

  /* generate order number once on success */
  useEffect(() => {
    if (step === 'success' && !orderNumber) {
      setOrderNumber(
        `#RIVO${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')}`
      )
    }
  }, [step, orderNumber])

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault()
    // basic client-side validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      // TODO: replace with UI toast feedback if you have sonner/toast
      return
    }
    setStep('payment')
  }

  const handlePayment = async () => {
    if (!selectedPayment) return
    setIsProcessingPayment(true)

    // simulate payment delay (replace with real payment integration)
    await new Promise((res) => setTimeout(res, 900))

    // clear cart and show success
    clearCart()
    setIsProcessingPayment(false)
    setStep('success')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <AnimatePresence mode="wait">
        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <button
              onClick={() => router.push('/cart')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
              aria-label="Back to cart"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>

            <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

            <div className="bg-secondary/50 rounded-2xl p-4 mb-8">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span>EGP {item.totalPrice}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total (incl. delivery)</span>
                <span className="text-primary">EGP {grandTotal}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitDetails} className="space-y-6" noValidate>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full h-14 btn-primary">
                Continue to Payment
              </Button>
            </form>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => setStep('details')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
              aria-label="Back to details"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Details
            </button>

            <h1 className="text-3xl font-bold mb-6">Payment Method</h1>

            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                const selected = selectedPayment === method.id
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-4 mb-3 rounded-xl border-2 ${
                      selected ? 'border-primary bg-accent' : 'border-border'
                    }`}
                    aria-pressed={selected}
                    aria-label={`Select payment method ${method.name}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{method.name}</span>
                    {selected && <Check className="ml-auto" />}
                  </button>
                )
              })}
            </div>

            <Button
              onClick={handlePayment}
              disabled={!selectedPayment || isProcessingPayment}
              className="w-full h-14 mt-6 btn-primary"
              aria-busy={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" className="text-center py-16">
            <Check className="w-16 h-16 mx-auto mb-4 text-success" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>
            <p className="mb-6">Order Number</p>
            <p className="text-2xl font-bold">{orderNumber}</p>

            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => router.push('/')}>Back to Home</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
