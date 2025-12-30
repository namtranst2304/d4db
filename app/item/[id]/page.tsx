'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getRarityColor } from '@/lib/utils/d4'
import type { D4Item } from '@/types'

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const itemId = params.id as string
  const [item, setItem] = useState<D4Item | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/items.json')

        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }

        const items: D4Item[] = await response.json()
        const foundItem = items.find(i => i.id === itemId && i.name)

        if (foundItem) {
          setItem(foundItem)
          setError(null)
        } else {
          setError('Item not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load item')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [itemId])

  // Colors are now provided by getRarityColor utility

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="container-custom py-16">
        <div className="card max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-900">
            {error || 'Item not found'}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-dark-700">
            The item you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <div className="mt-6">
            <Button onClick={() => router.back()} variant="primary">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-dark-700">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-dark-900">{item.name}</span>
      </nav>

      {/* Item Details */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </span>
                <h1 className="mt-4 text-4xl font-bold text-heading">
                  {item.name}
                </h1>
                <p className="mt-2 text-xl text-muted">
                  {item.type}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-6 dark:border-dark-300">
              <h2 className="text-xl font-bold text-heading">
                Description
              </h2>
              <p className="mt-2 text-body">
                {item.description}
              </p>
            </div>

            {/* Affixes */}
            {item.affixes && item.affixes.length > 0 && (
              <div className="mt-6 border-t pt-6 dark:border-dark-300">
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-900">
                  Affixes
                </h2>
                <div className="mt-4 space-y-3">
                  {item.affixes.map((affix, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-gray-50 p-4 dark:bg-dark-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-dark-900">
                            {affix.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-dark-700">
                            {affix.description}
                          </p>
                        </div>
                        <span className="ml-4 font-bold text-primary-600 dark:text-primary-500">
                          {affix.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-900">
              Item Stats
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between border-b pb-3 dark:border-dark-300">
                <span className="text-gray-600 dark:text-dark-700">
                  Item Power
                </span>
                <span className="font-bold text-gray-900 dark:text-dark-900">
                  {item.itemPower}
                </span>
              </div>
              <div className="flex justify-between border-b pb-3 dark:border-dark-300">
                <span className="text-gray-600 dark:text-dark-700">
                  Required Level
                </span>
                <span className="font-bold text-gray-900 dark:text-dark-900">
                  {item.requiredLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-dark-700">
                  Rarity
                </span>
                <span className={`font-bold ${getRarityColor(item.rarity).split(' ')[0]}`}>
                  {item.rarity}
                </span>
              </div>
            </div>
          </div>

          {/* Class Restrictions */}
          {item.class && item.class.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-900">
                Class Restrictions
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.class.map((className) => (
                  <span key={className} className="badge-primary">
                    {className}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card space-y-3">
            <Button variant="primary" className="w-full">
              Add to Collection
            </Button>
            <Button variant="outline" className="w-full">
              Add to Build
            </Button>
            <Button variant="ghost" className="w-full">
              Share Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
