// src/data/user.ts
export type OrderItem = {
  id: string
  name: string
  qty: number
  price: number
}

export type Order = {
  id: string
  createdAt: string // ISO date
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  branch: string
}

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  joinedAt: string
  orders: Order[]
  favorites?: string[]
}

export const user: User = {
  id: 'u_001',
  name: 'Muhammed Ali',
  email: 'mohamed@example.com',
  phone: '+20 100 123 4567',
  avatar: '/avatars/sample-avatar.png', // ضع صورة في public/avatars/ أو استخدم placeholder
  joinedAt: '2024-06-15T09:30:00.000Z',
  favorites: ['Latte', 'Croissant'],
  orders: [
    {
      id: 'ORD-1001',
      createdAt: '2025-01-10T11:20:00.000Z',
      status: 'delivered',
      total: 150.5,
      branch: 'RIVO Zamalek',
      items: [
        { id: 'i1', name: 'Latte', qty: 1, price: 45.5 },
        { id: 'i2', name: 'Chocolate Cake', qty: 1, price: 105.0 },
      ],
    },
    {
      id: 'ORD-1002',
      createdAt: '2025-02-03T09:15:00.000Z',
      status: 'confirmed',
      total: 80,
      branch: 'RIVO Maadi',
      items: [
        { id: 'i3', name: 'Espresso', qty: 2, price: 40 },
      ],
    },
    {
      id: 'ORD-1003',
      createdAt: '2025-02-20T18:40:00.000Z',
      status: 'pending',
      total: 230,
      branch: 'RIVO Nasr City',
      items: [
        { id: 'i4', name: 'Cappuccino', qty: 2, price: 90 },
        { id: 'i5', name: 'Bagel', qty: 1, price: 50 },
      ],
    },
  ],
}
