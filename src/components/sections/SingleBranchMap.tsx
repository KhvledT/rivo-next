'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Branch } from '@/data/branches'

export default function SingleBranchMap({ branch }: { branch: Branch }) {
  const icon = new L.DivIcon({
    className: '',
    html: `<div style="
      width: 14px;
      height: 14px;
      background: #2563eb;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })

  return (
    <MapContainer
      center={[branch.coordinates.lat, branch.coordinates.lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full rounded-2xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        position={[branch.coordinates.lat, branch.coordinates.lng]}
        icon={icon}
      />
    </MapContainer>
  )
}
