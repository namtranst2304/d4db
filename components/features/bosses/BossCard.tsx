'use client'

import type { D4Boss, D4BossTier, D4BossType } from '@/types'
import { BOSS_TIER_COLORS, BOSS_TYPE_COLORS } from '@/lib/constants/colors'
import { Badge } from '@/components/common'

interface BossCardProps {
    boss: D4Boss
}

export default function BossCard({ boss }: BossCardProps) {
    const tierColors = boss.tier ? BOSS_TIER_COLORS[boss.tier as D4BossTier] : null
    const typeColors = BOSS_TYPE_COLORS[boss.type as D4BossType]
    const primaryColors = tierColors || typeColors

    const getBadgeColor = (type: D4BossType): 'yellow' | 'orange' | 'red' => {
        switch (type) {
            case 'World Boss': return 'yellow'
            case 'Lair Boss': return 'orange'
            case 'Pinnacle Boss': return 'red'
        }
    }

    const getTierBadgeColor = (tier: D4BossTier): 'green' | 'purple' | 'red' => {
        switch (tier) {
            case 'Initiate': return 'green'
            case 'Greater': return 'purple'
            case 'Exalted': return 'red'
        }
    }

    return (
        <a
            href={boss.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 hover:scale-105 transition-all duration-300 cursor-pointer ${primaryColors.border}`}
        >
            {/* Boss Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 ${primaryColors.text}`}>
                        {boss.name}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        <Badge color={getBadgeColor(boss.type)} variant="outline">
                            {boss.type}
                        </Badge>
                        {boss.tier && (
                            <Badge color={getTierBadgeColor(boss.tier)} variant="outline">
                                {boss.tier}
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl">👹</div>
                </div>
            </div>

            {/* Location */}
            {boss.location && (
                <div className="mb-4">
                    <span className="text-gray-400 text-sm">📍 </span>
                    <span className="text-gray-300 text-sm line-clamp-2">
                        {boss.location.split(':')[0]}
                    </span>
                </div>
            )}

            {/* Summoning Materials */}
            {boss.summoningMaterials && boss.summoningMaterials.length > 0 && (
                <div className="mb-4 border-t border-gray-700 pt-4">
                    <h4 className="text-gray-400 text-xs uppercase mb-2">Summoning Materials</h4>
                    <div className="flex flex-wrap gap-2">
                        {boss.summoningMaterials.slice(0, 4).map((mat, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300"
                            >
                                {mat.quantity}x {mat.name}
                            </span>
                        ))}
                        {boss.summoningMaterials.length > 4 && (
                            <span className="text-xs px-2 py-1 text-gray-500">
                                +{boss.summoningMaterials.length - 4} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Drops Preview */}
            {boss.drops && boss.drops.length > 0 && (
                <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-gray-400 text-xs uppercase mb-2">Notable Drops</h4>
                    <div className="flex flex-wrap gap-1">
                        {boss.drops.slice(0, 5).map((drop, i) => (
                            <Badge key={i} color="purple" size="sm">
                                {drop.name}
                            </Badge>
                        ))}
                        {boss.drops.length > 5 && (
                            <span className="text-xs px-2 py-1 text-gray-500">
                                +{boss.drops.length - 5} more
                            </span>
                        )}
                    </div>
                </div>
            )}
        </a>
    )
}
