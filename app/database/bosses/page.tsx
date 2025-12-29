'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { D4Boss } from '@/types'
import { useDataFetch } from '@/lib/hooks/useDataFetch'
import BossCard from '@/components/BossCard'

type BossType = 'All' | 'World Boss' | 'Lair Boss' | 'Pinnacle Boss'
type BossTier = 'All' | 'Initiate' | 'Greater' | 'Exalted'

export default function BossesPage() {
    const { data: bosses, isLoading } = useDataFetch<D4Boss[]>('/data/bosses-scraped.json')
    const [typeFilter, setTypeFilter] = useState<BossType>('All')
    const [tierFilter, setTierFilter] = useState<BossTier>('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBosses = useMemo(() => {
        if (!bosses) return []

        return bosses.filter(boss => {
            // Type filter
            if (typeFilter !== 'All' && boss.type !== typeFilter) return false

            // Tier filter (only applies to Lair Bosses)
            if (tierFilter !== 'All' && boss.tier !== tierFilter) return false

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const nameMatch = boss.name.toLowerCase().includes(query)
                const locationMatch = boss.location?.toLowerCase().includes(query)
                const dropsMatch = boss.drops?.some(d => d.name.toLowerCase().includes(query))
                if (!nameMatch && !locationMatch && !dropsMatch) return false
            }

            return true
        })
    }, [bosses, typeFilter, tierFilter, searchQuery])

    // Group bosses by type
    const groupedBosses = useMemo(() => {
        const groups: Record<string, D4Boss[]> = {
            'Lair Boss - Initiate': [],
            'Lair Boss - Greater': [],
            'Lair Boss - Exalted': [],
            'Pinnacle Boss': [],
            'World Boss': [],
        }

        filteredBosses.forEach(boss => {
            if (boss.type === 'Lair Boss' && boss.tier) {
                groups[`Lair Boss - ${boss.tier}`].push(boss)
            } else {
                groups[boss.type].push(boss)
            }
        })

        return groups
    }, [filteredBosses])

    const resetFilters = () => {
        setTypeFilter('All')
        setTierFilter('All')
        setSearchQuery('')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/database" className="text-red-400 hover:text-red-300 mb-4 inline-block">
                        ← Back to Database
                    </Link>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2">
                        Bosses Database
                    </h1>
                    <p className="text-gray-400">
                        {isLoading ? 'Loading...' : `Showing ${filteredBosses.length} of ${bosses?.length || 0} bosses`}
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search bosses or drops..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        {/* Type Filter */}
                        <select
                            aria-label="Filter by type"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as BossType)}
                            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="All">All Types</option>
                            <option value="Lair Boss">Lair Bosses</option>
                            <option value="World Boss">World Bosses</option>
                            <option value="Pinnacle Boss">Pinnacle Boss</option>
                        </select>

                        {/* Tier Filter */}
                        <select
                            aria-label="Filter by tier"
                            value={tierFilter}
                            onChange={(e) => setTierFilter(e.target.value as BossTier)}
                            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="All">All Tiers</option>
                            <option value="Initiate">Initiate</option>
                            <option value="Greater">Greater</option>
                            <option value="Exalted">Exalted</option>
                        </select>

                        {/* Reset Button */}
                        <button
                            onClick={resetFilters}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Boss Categories */}
                {Object.entries(groupedBosses).map(([category, categoryBosses]) => {
                    if (categoryBosses.length === 0) return null

                    const getCategoryStyles = (cat: string) => {
                        if (cat.includes('Initiate')) return 'from-green-500 to-emerald-500'
                        if (cat.includes('Greater')) return 'from-purple-500 to-violet-500'
                        if (cat.includes('Exalted')) return 'from-red-500 to-rose-500'
                        if (cat.includes('Pinnacle')) return 'from-red-600 to-orange-500'
                        if (cat.includes('World')) return 'from-yellow-500 to-amber-500'
                        return 'from-gray-500 to-gray-600'
                    }

                    return (
                        <div key={category} className="mb-10">
                            <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getCategoryStyles(category)} mb-6`}>
                                {category}
                                <span className="text-gray-500 text-lg ml-2">({categoryBosses.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryBosses.map((boss) => (
                                    <BossCard key={boss.id} boss={boss} />
                                ))}
                            </div>
                        </div>
                    )
                })}

                {/* No Results */}
                {filteredBosses.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No bosses found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
