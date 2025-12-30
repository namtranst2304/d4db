'use client'

import DashboardHeader from './_components/DashboardHeader'
import DashboardSidebar from './_components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-dark-50">
          {children}
        </main>
      </div>
    </div>
  )
}

