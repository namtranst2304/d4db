'use client'

import Link from 'next/link'
import { useState } from 'react'

const DATABASE_CATEGORIES = {
  items: {
    title: 'Items',
    icon: '⚔️',
    subcategories: [
      { name: 'Mythic Uniques', href: '/database/items?rarity=Mythic', count: 7 },
      { name: 'Unique Items', href: '/database/items?rarity=Unique', count: 11 },
      { name: 'Weapons', href: '/database/items?category=Weapons', count: 6 },
      { name: 'Armor', href: '/database/items?category=Armor', count: 12 },
      { name: 'All Items', href: '/database/items', count: 18 },
    ],
  },
  skills: {
    title: 'Skills',
    icon: '✨',
    subcategories: [
      { name: 'Barbarian', href: '/database/skills?class=Barbarian', count: 3 },
      { name: 'Druid', href: '/database/skills?class=Druid', count: 2 },
      { name: 'Necromancer', href: '/database/skills?class=Necromancer', count: 2 },
      { name: 'Paladin', href: '/database/skills?class=Paladin', count: 1 },
      { name: 'Rogue', href: '/database/skills?class=Rogue', count: 2 },
      { name: 'Sorcerer', href: '/database/skills?class=Sorcerer', count: 2 },
      { name: 'Spiritborn', href: '/database/skills?class=Spiritborn', count: 1 },
    ],
  },
  aspects: {
    title: 'Aspects',
    icon: '🔮',
    subcategories: [
      { name: 'Offensive', href: '/database/aspects?type=Offensive', count: 9 },
      { name: 'Defensive', href: '/database/aspects?type=Defensive', count: 3 },
      { name: 'Utility', href: '/database/aspects?type=Utility', count: 1 },
      { name: 'Mobility', href: '/database/aspects?type=Mobility', count: 1 },
      { name: 'Resource', href: '/database/aspects?type=Resource', count: 2 },
      { name: 'All Aspects', href: '/database/aspects', count: 16 },
    ],
  },
  bosses: {
    title: 'Bosses',
    icon: '👹',
    subcategories: [
      { name: 'Lair Bosses', href: '/database/bosses?type=Lair Boss', count: 9 },
      { name: 'World Bosses', href: '/database/bosses?type=World Boss', count: 3 },
      { name: 'Pinnacle Boss', href: '/database/bosses?type=Pinnacle Boss', count: 1 },
      { name: 'All Bosses', href: '/database/bosses', count: 13 },
    ],
  },
}

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mb-4">
            Diablo 4 Database
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Welcome to the comprehensive Diablo 4 database! Explore items, skills, aspects, and builds.
            Filter and search through our extensive collection to find exactly what you need for your build.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items, skills, aspects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Database Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(DATABASE_CATEGORIES).map(([key, category]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>

              {/* Subcategories */}
              <div className="space-y-2">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="flex items-center justify-between px-4 py-3 bg-gray-800/50 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
                  >
                    <span className="text-gray-300 group-hover:text-white font-medium">
                      {sub.name}
                    </span>
                    <span className="text-gray-500 text-sm bg-gray-900 px-3 py-1 rounded-full">
                      {sub.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-lg p-6 text-center border border-red-700/50">
              <div className="text-3xl font-bold text-red-400 mb-2">18</div>
              <div className="text-gray-400 text-sm">Total Items</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg p-6 text-center border border-purple-700/50">
              <div className="text-3xl font-bold text-purple-400 mb-2">7</div>
              <div className="text-gray-400 text-sm">Mythic Uniques</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg p-6 text-center border border-blue-700/50">
              <div className="text-3xl font-bold text-blue-400 mb-2">13</div>
              <div className="text-gray-400 text-sm">Skills</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-lg p-6 text-center border border-orange-700/50">
              <div className="text-3xl font-bold text-orange-400 mb-2">16</div>
              <div className="text-gray-400 text-sm">Aspects</div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">🎮 About the Database</h3>
          <div className="text-gray-300 space-y-3">
            <p>
              Our Diablo 4 database is constantly updated with the latest information from the game.
              We provide detailed information about items, skills, aspects, and more to help you
              optimize your builds and gameplay.
            </p>
            <p>
              Use the categories above to browse specific types of content, or use the search bar
              to quickly find what you&apos;re looking for. Each entry includes detailed stats, descriptions,
              and relevant information to help you make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
