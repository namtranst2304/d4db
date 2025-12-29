'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { D4Skill } from '@/types'
import { useDataFetch } from '@/lib/hooks/useDataFetch'
import { useFilters } from '@/lib/hooks/useFilters'
import { getSkillCategoryColor as getCategoryColor, getClassColor } from '@/lib/utils/d4'

export default function SkillsPage() {
  const { data: skills, isLoading } = useDataFetch<D4Skill[]>('/data/skills.json')

  const filterFn = useMemo(() => (skill: D4Skill, filters: any) => {
    if (filters.class !== 'All' && skill.class !== filters.class) return false
    if (filters.category !== 'All' && skill.category !== filters.category) return false
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!skill.name.toLowerCase().includes(searchLower) &&
          !skill.description.toLowerCase().includes(searchLower)) return false
    }
    return true
  }, [])

  const { filters, setFilters, filteredItems: filteredSkills, resetFilters } = useFilters(
    skills || [],
    { class: 'All', category: 'All', search: '' },
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-2">
            Skills Database
          </h1>
          <p className="text-gray-400">
            {isLoading ? 'Loading...' : `Showing ${filteredSkills.length} of ${skills?.length || 0} skills`}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search skills..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Class */}
            <select
              aria-label="Filter by class"
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Category */}
            <select
              aria-label="Filter by skill category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Basic">Basic</option>
              <option value="Core">Core</option>
              <option value="Defensive">Defensive</option>
              <option value="Ultimate">Ultimate</option>
              <option value="Key Passive">Key Passive</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${getCategoryColor(skill.category)}`}
            >
              {/* Skill Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${getCategoryColor(skill.category)}`}>
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold ${getClassColor(skill.class)}`}>
                      {skill.class}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(skill.category)}`}>
                      {skill.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {skill.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {skill.damage && (
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Damage</p>
                    <p className="text-lg font-bold text-red-400">{skill.damage}</p>
                  </div>
                )}
                {skill.cooldown !== undefined && (
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Cooldown</p>
                    <p className="text-lg font-bold text-blue-400">
                      {skill.cooldown > 0 ? `${skill.cooldown}s` : 'None'}
                    </p>
                  </div>
                )}
                {skill.resourceCost !== undefined && (
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{skill.resourceType} Cost</p>
                    <p className="text-lg font-bold text-yellow-400">{skill.resourceCost}</p>
                  </div>
                )}
              </div>

              {/* Enhancements */}
              {skill.enhancements && skill.enhancements.length > 0 && (
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm font-semibold text-gray-400 mb-2">Enhancements:</p>
                  <div className="space-y-2">
                    {skill.enhancements.map((enhancement, idx) => (
                      <div key={idx} className="bg-gray-900/30 rounded-lg p-3">
                        <p className="text-xs font-bold text-cyan-400 mb-1">
                          {enhancement.name}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {enhancement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No skills found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
