'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Phone, Users, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Branch } from '@/data/branches'
import { PlaceCard } from '../PlaceCard'

const SingleBranchMap = dynamic(
  () => import('@/components/sections/SingleBranchMap'),
  { ssr: false }
)

type Props = {
  branch: Branch
  availablePlaces: number
  totalPlaces: number
}

export default function BranchDetailsClient({
  branch,
  availablePlaces,
  totalPlaces,
}: Props) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      <div className="grid lg:grid-cols-3 gap-8 pb-20">
        {/* Left */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">{branch.name}</h1>
          <p className="text-muted-foreground mb-6">{branch.city}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <InfoCard icon={<MapPin />} label="Address" value={branch.address} />
            <InfoCard icon={<Clock />} label="Opening Hours" value={branch.openingHours} />
            <InfoCard icon={<Phone />} label="Phone" value={branch.phone} />
            <InfoCard
              icon={<Users />}
              label="Capacity"
              value={`${totalPlaces} seats`}
            />
          </div>

          <h2 className="text-xl font-bold mb-4">Available Seats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {branch.places.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="h-64 rounded-2xl overflow-hidden border border-border">
            <SingleBranchMap branch={branch} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <Button
              className="w-full"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`,
                  '_blank'
                )
              }
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>

            <Link href="/products">
              <Button variant="outline" className="w-full">
                Order from this branch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* helpers */
function InfoCard({ icon, label, value }: any) {
  return (
    <div className="bg-secondary/50 p-4 rounded-xl flex gap-3 items-center">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
