'use client'

import { useAuth } from '@/lib/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      label: 'Items Collected',
      value: '142',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      label: 'Legendary Items',
      value: '23',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      color: 'bg-orange-500',
    },
    {
      label: 'Unique Items',
      value: '8',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      color: 'bg-purple-500',
    },
    {
      label: 'Builds Created',
      value: '5',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: 'bg-green-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading">
          Welcome back, {user?.username}!
        </h2>
        <p className="mt-1 text-muted">
          Here&apos;s an overview of your Diablo 4 collection
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-heading">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} flex h-12 w-12 items-center justify-center rounded-lg text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-bold text-heading">
          Recent Activity
        </h3>
        <div className="mt-4 space-y-4">
          {[
            {
              action: 'Found Legendary Item',
              item: "Harlequin Crest (Shako)",
              time: '2 hours ago',
            },
            {
              action: 'Created New Build',
              item: 'Whirlwind Barbarian',
              time: '1 day ago',
            },
            {
              action: 'Updated Build',
              item: 'Bone Spear Necromancer',
              time: '2 days ago',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between divider-last"
            >
              <div>
                <p className="font-medium text-heading">
                  {activity.action}
                </p>
                <p className="text-sm text-muted">
                  {activity.item}
                </p>
              </div>
              <span className="text-sm text-subtle">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
