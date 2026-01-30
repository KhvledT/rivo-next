'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import {
  Menu,
  X,
  ShoppingBag,
  MapPin,
  User,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Menu' },
  { href: '/branches', label: 'Branches' },
  { href: '/social', label: 'Social' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)

  const { totalItems } = useCart()
  const pathname = usePathname()

  const { scrollY } = useScroll()

  // Detect scroll direction + top
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0

    // top of page
    if (latest <= 10) {
      setAtTop(true)
      setHidden(false)
      return
    } else {
      setAtTop(false)
    }

    // scrolling down -> hide
    if (latest > previous && latest > 80) {
      setHidden(true)
    }

    // scrolling up -> show
    if (latest < previous) {
      setHidden(false)
    }
  })

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`
        fixed top-0 z-1500 w-full py-2
        bg-primary backdrop-blur-md
        ${atTop ? 'border-b border-transparent' : 'border-b border-border'}
      `}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-white">
            RIVO
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-white/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5 text-white" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-card text-card-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-white" />
            </Button>
          </Link>

          <Link href="/products">
            <Button className="rounded-xl bg-card text-card-foreground hover:bg-card/90 font-semibold">
              Order Now
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/cart" className="relative p-2">
            <ShoppingBag className="h-5 w-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-card text-card-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-white" />
            </Button>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium py-2 ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/products" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-primary">
                  Order Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
