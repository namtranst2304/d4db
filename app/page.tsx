'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ItemCard from '@/components/ItemCard'
import { getItems } from '@/lib/services/api'
import type { D4Item } from '@/types'
 
interface LairBoss {
  id: string
  name: string
  location?: string
  iconUrl?: string
  loot: string[]
}

export default function HomePage() {
  const [items, setItems] = useState<D4Item[]>([])
  const [lairBosses, setLairBosses] = useState<LairBoss[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [itemsRes, bossRes] = await Promise.all([
          fetch('/data/items.json'),
          fetch('/data/lair-bosses.json'),
        ])

        const allItems: D4Item[] = await itemsRes.json()
        const bosses: LairBoss[] = await bossRes.json()

        setItems(allItems)
        setLairBosses(bosses)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-dark-50 to-dark-100 py-20 text-white">
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-in text-5xl font-bold md:text-6xl lg:text-7xl">
              Diablo 4 Database
            </h1>
            <p className="mt-6 animate-slide-up text-xl text-gray-300 md:text-2xl">
              Your ultimate resource for items, builds, and strategies. Explore
              the vast collection of Diablo 4 gear.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/database">
                <Button variant="primary" size="lg">
                  🗄️ Explore Database
                </Button>
              </Link>
              <Link href="/database/items">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  ⚔️ Browse Items
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  📊 Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
      </section>

      {/* Lair Bosses Section */}
      <section id="lair-bosses" className="py-16 bg-gray-100 dark:bg-dark-100">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-heading">Lair Bosses</h2>
            <p className="mt-2 text-muted">Latest lair bosses and their loot pools.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {lairBosses.length === 0 ? (
              <div className="card text-center">
                <p className="text-muted">No lair bosses configured. See /public/data/lair-bosses.json</p>
              </div>
            ) : (
              lairBosses.map((boss) => (
                <div key={boss.id} className="card">
                  <div className="flex items-center gap-4">
                    {boss.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={boss.iconUrl} alt={boss.name} className="h-24 w-48 rounded object-cover" />
                    ) : (
                      <div className="h-24 w-48 rounded bg-gray-300" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{boss.name}</h3>
                      {boss.location && <p className="text-sm text-muted">{boss.location}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold">Loot Pool</h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {boss.loot.map((itemId) => {
                        const item = items.find((it) => it.id === itemId)
                        return item ? (
                          <ItemCard key={item.id} item={item} />
                        ) : (
                          <div key={itemId} className="card">
                            <p className="text-sm text-muted">Item {itemId} not found</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-100">
        <div className="container-custom">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-dark-900">
            Why Choose D4DB?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Comprehensive Database',
                description:
                  'Access detailed information about every item in Diablo 4, from common gear to legendary artifacts.',
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                ),
              },
              {
                title: 'Build Creator',
                description:
                  'Create, save, and share your optimal character builds with the community.',
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
              },
              {
                title: 'Real-time Updates',
                description:
                  'Stay up-to-date with the latest patches, balance changes, and new items.',
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={feature.title} className="card text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-dark-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-dark-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <Link href="/database/items" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2">
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
              {items.map((item) => (
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
      <section className="bg-primary-600 py-16 text-white dark:bg-primary-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Optimize Your Build?
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            Join thousands of players using D4DB to dominate Sanctuary
          </p>
          <div className="mt-8">
            <Link href="/auth/register">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
