// app/branches/page.tsx
import BranchesClient from '@/components/clientComponents/BranchesClient'
import { branches } from '@/data/branches'

export default function BranchesPage() {
  return <BranchesClient branches={branches} />
}
