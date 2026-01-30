'use client'

import dynamic from 'next/dynamic'
import { Branch } from '@/data/branches'

const Map = dynamic(() => import('./BranchesMapClient'), {
  ssr: false,
})

export default function BranchesMap({ branches }: { branches: Branch[] }) {
  return <Map branches={branches} />
}

