'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Feature components
import { HeroSection, FeaturesSection, CTASection } from '@/components/features/home'
import { ItemCard } from '@/components/features/items'

// Types
import type { D4Item } from '@/types'
import { ROUTES } from '@/lib/constants/routes'

export default function HomePage() {
  const [items, setItems] = useState<D4Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/items.json')
        if (!response.ok) throw new Error('Failed to fetch items')
        const itemsData: D4Item[] = await response.json()
        setItems(itemsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Items Section */}
      <section id="items" className="py-16 bg-white dark:bg-dark-100">
        <div className="container-custom">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-heading">
                Featured Items
              </h2>
              <p className="mt-2 text-muted">
                Explore mythic uniques and legendary items
              </p>
            </div>
            <Link href={ROUTES.DATABASE_ITEMS} className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2">
              View All Items
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="card h-48 animate-pulse bg-gray-200 dark:bg-dark-200"
                />
              ))}
            </div>
          ) : error ? (
            <div className="card bg-red-50 dark:bg-red-900/20">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <p className="mt-2 text-sm text-muted">
                Note: This is a demo project. To see items, add a sample
                items.json file to the /public/data/ directory or configure an
                external API endpoint.
              </p>
            </div>
          ) : items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, 6).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="card text-center">
              <p className="text-muted">
                No items found. Add sample data to /public/data/items.json to
                see items displayed here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

