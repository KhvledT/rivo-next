// app/branches/[id]/page.tsx
import { notFound } from 'next/navigation'
import {
  getBranchBySlug,
  getAvailablePlacesCount,
  getTotalPlacesCount,
} from '@/data/branches'
import BranchDetailsClient from '@/components/clientComponents/BranchDetailsClient'

type PageProps = {
  params: {
    id: string
  }
}

export default async function BranchDetailsPage({ params }: PageProps) {
  const { id } = await params

  const branch = getBranchBySlug(id)

  if (!branch) {
    notFound()
  }

  const availablePlaces = getAvailablePlacesCount(branch)
  const totalPlaces = getTotalPlacesCount(branch)

  return (
    <BranchDetailsClient
      branch={branch}
      availablePlaces={availablePlaces}
      totalPlaces={totalPlaces}
    />
  )
}
