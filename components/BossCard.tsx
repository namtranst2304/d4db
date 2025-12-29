'use client'

import type { D4Boss } from '@/types'

interface BossCardProps {
    boss: D4Boss
}

export default function BossCard({ boss }: BossCardProps) {
    const tierColors = {
        Initiate: 'text-green-400 border-green-500 bg-green-500/10',
        Greater: 'text-purple-400 border-purple-500 bg-purple-500/10',
        Exalted: 'text-red-400 border-red-500 bg-red-500/10',
    }

    const typeColors = {
        'World Boss': 'text-yellow-400 border-yellow-500 bg-yellow-500/10',
        'Lair Boss': 'text-orange-400 border-orange-500 bg-orange-500/10',
        'Pinnacle Boss': 'text-red-500 border-red-600 bg-red-500/10',
    }

    const tierColor = boss.tier ? tierColors[boss.tier] : typeColors[boss.type]

    return (
        <a
            href={boss.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 hover:scale-105 transition-all duration-300 cursor-pointer ${tierColor.split(' ')[1]}`}
        >
            {/* Boss Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 ${tierColor.split(' ')[0]}`}>
                        {boss.name}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full border ${typeColors[boss.type]}`}>
                            {boss.type}
                        </span>
                        {boss.tier && (
                            <span className={`text-xs px-2 py-1 rounded-full border ${tierColors[boss.tier]}`}>
                                {boss.tier}
                            </span>
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
                            <span
                                key={i}
                                className="text-xs px-2 py-1 bg-purple-900/30 border border-purple-700/50 rounded text-purple-300"
                            >
                                {drop.name}
                            </span>
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
