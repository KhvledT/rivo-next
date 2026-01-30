// src/app/profile/page.tsx
import UserProfileClient from '@/components/clientComponents/UserProfileClient'
import { user } from '@/data/user'

export default function ProfilePage() {
  return <UserProfileClient user={user} />
}
