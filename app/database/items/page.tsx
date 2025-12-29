'use client'

import { useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { D4Item } from '@/types'
import { useDataFetch } from '@/lib/hooks/useDataFetch'
import { useFilters } from '@/lib/hooks/useFilters'
import { getRarityColor } from '@/lib/utils/d4'

export default function ItemsPage() {
  const searchParams = useSearchParams()
  const { data: rawItems, isLoading } = useDataFetch<D4Item[]>('/data/items.json')
  
  // Filter out items without name (section headers)
  const items = useMemo(() => {
    return rawItems?.filter(item => item.name) || []
  }, [rawItems])

  const filterFn = useMemo(() => (item: D4Item, filters: any) => {
    if (filters.category !== 'All' && item.category !== filters.category) return false
    if (filters.rarity !== 'All' && item.rarity !== filters.rarity) return false
    if (filters.class !== 'All' && 
        !item.class?.includes(filters.class) && 
        !item.class?.includes('All Classes')) return false
    if (filters.minLevel > 0 && item.requiredLevel < filters.minLevel) return false
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!item.name?.toLowerCase().includes(searchLower) &&
          !item.description?.toLowerCase().includes(searchLower) &&
          !item.type?.toLowerCase().includes(searchLower)) return false
    }
    return true
  }, [])

  const { filters, setFilters, filteredItems, resetFilters } = useFilters(
    items,
    { category: 'All', rarity: 'All', class: 'All', minLevel: 0, search: '' },
    filterFn
  )

  // Apply URL parameters after items are loaded
  useEffect(() => {
    if (items.length === 0) return
    
    const categoryParam = searchParams.get('category')
    const rarityParam = searchParams.get('rarity')
    const classParam = searchParams.get('class')
    
    if (categoryParam || rarityParam || classParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam || 'All',
        rarity: rarityParam || 'All',
        class: classParam || 'All',
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/database" className="text-red-400 hover:text-red-300 mb-4 inline-block">
            ← Back to Database
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
            Items Database
          </h1>
          <p className="text-gray-400">
            {isLoading ? 'Loading...' : `Showing ${filteredItems.length} of ${items.length} items`}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search items..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {/* Category */}
            <select
              aria-label="Filter by category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="All">All Categories</option>
              <option value="Weapons">Weapons</option>
              <option value="Armor">Armor</option>
              <option value="Socketable">Socketable</option>
            </select>

            {/* Rarity */}
            <select
              aria-label="Filter by rarity"
              value={filters.rarity}
              onChange={(e) => setFilters({ ...filters, rarity: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="All">All Rarities</option>
              <option value="Mythic">Mythic</option>
              <option value="Unique">Unique</option>
              <option value="Legendary">Legendary</option>
              <option value="Rare">Rare</option>
              <option value="Magic">Magic</option>
            </select>

            {/* Class */}
            <select
              aria-label="Filter by class"
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="All">All Classes</option>
              <option value="Barbarian">Barbarian</option>
              <option value="Druid">Druid</option>
              <option value="Necromancer">Necromancer</option>
              <option value="Paladin">Paladin</option>
              <option value="Rogue">Rogue</option>
              <option value="Sorcerer">Sorcerer</option>
              <option value="Spiritborn">Spiritborn</option>
            </select>

            {/* Level */}
            <input
              type="number"
              placeholder="Min Level"
              value={filters.minLevel || ''}
              onChange={(e) => setFilters({ ...filters, minLevel: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 hover:scale-105 transition-all duration-300 ${getRarityColor(item.rarity)}`}
            >
              {/* Item Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-1 ${getRarityColor(item.rarity)}`}>
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{item.itemPower}</div>
                  <div className="text-xs text-gray-500">Power</div>
                </div>
              </div>

              {/* Item Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Level</span>
                  <span className="text-white font-semibold">{item.requiredLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white font-semibold">{item.category}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Class: </span>
                  <span className="text-white font-semibold">
                    {item.class?.join(', ') || 'Any'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm line-clamp-3 italic border-t border-gray-700 pt-4">
                {item.description}
              </p>

              {/* Affixes Count */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-xs text-gray-500">
                  {item.affixes.length} Affixes
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No items found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
