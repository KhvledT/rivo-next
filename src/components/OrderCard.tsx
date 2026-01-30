// src/components/sections/OrderCard.tsx
'use client'

import React from 'react'
import { Order } from '@/data/user'
import { Clock, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  order: Order
  onView?: () => void
}

function statusColor(status: Order['status']) {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'confirmed': return 'bg-blue-100 text-blue-800'
    case 'preparing': return 'bg-orange-100 text-orange-800'
    case 'ready': return 'bg-teal-100 text-teal-800'
    case 'delivered': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-muted text-muted-foreground'
  }
}

export default function OrderCard({ order, onView }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h4 className="font-medium">#{order.id}</h4>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColor(order.status)}`}>{order.status}</span>
        </div>
        <p className="text-sm text-muted-foreground">{order.branch} • {new Date(order.createdAt).toLocaleDateString()}</p>
        <div className="text-sm mt-2 text-muted-foreground">
          {order.items.map((it, i) => (
            <span key={it.id}>
              {it.name} x{it.qty}{i < order.items.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="font-semibold">{order.total.toFixed(2)} EGP</div>
        </div>

        <button onClick={onView} className="px-3 py-2 rounded-xl border border-border flex items-center gap-2 text-sm">
          <Eye className="w-4 h-4" />
          View
        </button>
      </div>
    </motion.div>
  )
}
