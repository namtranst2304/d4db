'use client'

import { useAuth } from '@/lib/hooks/useAuth.tsx'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="border-b bg-white dark:border-dark-300 dark:bg-dark-100">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-900">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-heading">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-muted">
              {user?.email}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
