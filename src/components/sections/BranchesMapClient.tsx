'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import { Branch } from '@/data/branches'

// ⛔ امنع أي تنفيذ قبل ما window يبقى موجود
export default function BranchesMapClient({ branches }: { branches: Branch[] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || branches.length === 0) return null

  // ✅ icon ثابت – بدون Default نهائيًا
  const icon = new L.DivIcon({
  className: '',
  html: `
    <div style="
      width: 14px;
      height: 14px;
      background: #2563eb;
      border: 2px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(37,99,235,0.25);
    "></div>
  `,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

  const center: [number, number] = [
    branches[0].coordinates.lat,
    branches[0].coordinates.lng,
  ]

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      className="w-full h-full rounded-2xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={[
            branch.coordinates.lat,
            branch.coordinates.lng,
          ]}
          icon={icon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{branch.name}</p>
              <p className="text-xs opacity-70">
                {branch.address}, {branch.city}
              </p>
              <Link
                href={`/branches/${branch.slug}`}
                className="text-primary text-xs underline"
              >
                View branch
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
