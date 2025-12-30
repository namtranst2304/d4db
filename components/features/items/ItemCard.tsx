'use client'

import Link from 'next/link'
import type { D4Item, D4Rarity } from '@/types'
import { RARITY_COLORS } from '@/lib/constants/colors'
import { ROUTES } from '@/lib/constants/routes'

interface ItemCardProps {
    item: D4Item
}

export default function ItemCard({ item }: ItemCardProps) {
    const colors = RARITY_COLORS[item.rarity as D4Rarity] || RARITY_COLORS.Common

    return (
        <Link href={ROUTES.ITEM_DETAIL(item.id)}>
            <div
                className={`card-hover border-l-4 ${colors.border} cursor-pointer`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className={`text-lg font-bold ${colors.text}`}>
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
                    <span className={`font-semibold ${colors.text}`}>
                        {item.rarity}
                    </span>
                </div>
            </div>
        </Link>
    )
}
