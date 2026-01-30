// src/components/clientComponents/UserProfileClient.tsx
'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Order } from '@/data/user'
import { Clock, User as UserIcon, CreditCard, Truck, Eye } from 'lucide-react'
import OrderCard from '../OrderCard'
import Avatar from '../../../public/avatar.png'
import Image from 'next/image'

type Props = {
  user: User
}

export default function UserProfileClient({ user }: Props) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const totals = useMemo(() => {
    const ordersCount = user.orders.length
    const spent = user.orders.reduce((s, o) => s + o.total, 0)
    const lastOrder = user.orders.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0]
    return { ordersCount, spent, lastOrder }
  }, [user])

  const filtered = useMemo(() => {
    if (filter === 'all') return user.orders
    return user.orders.filter((o) => {
      if (filter === 'pending') return o.status === 'pending'
      if (filter === 'confirmed') return o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
      if (filter === 'delivered') return o.status === 'delivered'
      if (filter === 'cancelled') return o.status === 'cancelled'
      return true
    })
  }, [user.orders, filter])

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="col-span-1 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-4">
            <Image
              width={500}
              height={500}
              src={Avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="font-medium text-sm">{new Date(user.joinedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Orders</p>
                <p className="font-medium">{totals.ordersCount}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total spent</p>
                  <p className="font-medium">{totals.spent.toFixed(2)} EGP</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last order</p>
                <p className="font-medium">{totals.lastOrder ? new Date(totals.lastOrder.createdAt).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Favorites</h3>
            <div className="flex flex-wrap gap-2">
              {user.favorites?.length ? user.favorites.map((f) => (
                <span key={f} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{f}</span>
              )) : <p className="text-sm text-muted-foreground">No favorites yet</p>}
            </div>
          </div>
        </div>

        {/* Orders + actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Your Orders</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground">Filter</span>
                <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="rounded-xl border px-3 py-2 bg-card">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders list */}
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className="bg-card p-6 rounded-2xl border border-border text-center text-muted-foreground">No orders to show</div>
            ) : filtered.map((o) => (
              <OrderCard key={o.id} order={o} onView={() => setSelectedOrder(o)} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Order detail modal (simple) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card w-full max-w-2xl rounded-2xl border border-border p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Order {selectedOrder.id}</h3>
                <p className="text-sm text-muted-foreground">{selectedOrder.branch} • {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">{selectedOrder.status}</span>
                <button onClick={() => setSelectedOrder(null)} className="text-sm underline text-muted-foreground">Close</button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Items</h4>
              <ul className="space-y-2">
                {selectedOrder.items.map((it) => (
                  <li key={it.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{it.name}</p>
                      <p className="text-xs text-muted-foreground">x{it.qty}</p>
                    </div>
                    <div className="text-sm font-medium">{(it.price * it.qty).toFixed(2)} EGP</div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-lg font-semibold">{selectedOrder.total.toFixed(2)} EGP</div>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-xl bg-primary text-white">Reorder</button>
                <button className="px-4 py-2 rounded-xl border border-border">Receipt</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
