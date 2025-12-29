'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { D4Aspect } from '@/types'
import { useDataFetch } from '@/lib/hooks/useDataFetch'
import { useFilters } from '@/lib/hooks/useFilters'
import { getAspectTypeColor as getTypeColor } from '@/lib/utils/d4'

export default function AspectsPage() {
  const { data: aspects, isLoading } = useDataFetch<D4Aspect[]>('/data/aspects.json')

  const filterFn = useMemo(() => (aspect: D4Aspect, filters: any) => {
    if (filters.type !== 'All' && aspect.type !== filters.type) return false
    if (filters.class !== 'All' && 
        !aspect.class?.includes(filters.class) && 
        !aspect.class?.includes('All Classes')) return false
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!aspect.name.toLowerCase().includes(searchLower) &&
          !aspect.description.toLowerCase().includes(searchLower)) return false
    }
    return true
  }, [])

  const { filters, setFilters, filteredItems: filteredAspects, resetFilters } = useFilters(
    aspects || [],
    { type: 'All', class: 'All', search: '' },
    filterFn
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/database" className="text-red-400 hover:text-red-300 mb-4 inline-block">
            ← Back to Database
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
            Aspects Database
          </h1>
          <p className="text-gray-400">
            {isLoading ? 'Loading...' : `Showing ${filteredAspects.length} of ${aspects?.length || 0} aspects`}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search aspects..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Type */}
            <select
              aria-label="Filter by aspect type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Types</option>
              <option value="Offensive">Offensive</option>
              <option value="Defensive">Defensive</option>
              <option value="Utility">Utility</option>
              <option value="Mobility">Mobility</option>
              <option value="Resource">Resource</option>
            </select>

            {/* Class */}
            <select
              aria-label="Filter by class"
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Aspects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAspects.map((aspect) => (
            <div
              key={aspect.id}
              className={`rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${getTypeColor(aspect.type)}`}
            >
              {/* Aspect Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${getTypeColor(aspect.type)}`}>
                    {aspect.name}
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full border ${getTypeColor(aspect.type)}`}>
                    {aspect.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {aspect.description}
              </p>

              {/* Class Info */}
              <div className="mb-4">
                <span className="text-gray-400 text-xs">Available for: </span>
                <span className="text-white font-semibold text-sm">
                  {aspect.class?.join(', ') || 'All Classes'}
                </span>
              </div>

              {/* Dungeon Location */}
              {aspect.dungeonLocation && (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-xs">📍</span>
                    <div>
                      <p className="text-xs text-gray-500">Found in:</p>
                      <p className="text-sm text-yellow-400 font-medium">
                        {aspect.dungeonLocation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAspects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No aspects found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
