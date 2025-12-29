'use client'

import Link from 'next/link'
import type { D4Item } from '@/types'

interface ItemCardProps {
  item: D4Item
}

export default function ItemCard({ item }: ItemCardProps) {
  const rarityColors = {
    Common: 'text-gray-500 border-gray-400',
    Magic: 'text-blue-500 border-blue-400',
    Rare: 'text-yellow-500 border-yellow-400',
    Legendary: 'text-orange-500 border-orange-400',
    Unique: 'text-purple-500 border-purple-400',
    Mythic: 'text-red-500 border-red-400',
  }

  return (
    <Link href={`/item/${item.id}`}>
      <div
        className={`card-hover border-l-4 ${rarityColors[item.rarity]} cursor-pointer`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3
              className={`text-lg font-bold ${rarityColors[item.rarity].split(' ')[0]}`}
            >
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {item.type}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">
              Item Power
            </p>
            <p className="text-2xl font-bold text-heading">
              {item.itemPower}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-body line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">
            Required Level: {item.requiredLevel}
          </span>
          <span className={`font-semibold ${rarityColors[item.rarity].split(' ')[0]}`}>
            {item.rarity}
          </span>
        </div>
      </div>
    </Link>
  )
}
