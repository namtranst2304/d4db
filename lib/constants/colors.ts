// Centralized color definitions for the D4DB application

import type { D4Rarity, D4BossType, D4BossTier, D4AspectType, D4Class } from '@/types'

// ============================================
// Color Configuration Type
// ============================================

export interface ColorConfig {
    text: string
    border: string
    bg: string
}

// ============================================
// Item Rarity Colors
// ============================================

export const RARITY_COLORS: Record<D4Rarity, ColorConfig> = {
    Common: {
        text: 'text-gray-400',
        border: 'border-gray-500',
        bg: 'bg-gray-500/10',
    },
    Magic: {
        text: 'text-blue-400',
        border: 'border-blue-500',
        bg: 'bg-blue-500/10',
    },
    Rare: {
        text: 'text-yellow-400',
        border: 'border-yellow-500',
        bg: 'bg-yellow-500/10',
    },
    Legendary: {
        text: 'text-orange-400',
        border: 'border-orange-500',
        bg: 'bg-orange-500/10',
    },
    Unique: {
        text: 'text-purple-400',
        border: 'border-purple-500',
        bg: 'bg-purple-500/10',
    },
    Mythic: {
        text: 'text-red-400',
        border: 'border-red-500',
        bg: 'bg-red-500/10',
    },
}

// ============================================
// Boss Type Colors
// ============================================

export const BOSS_TYPE_COLORS: Record<D4BossType, ColorConfig> = {
    'World Boss': {
        text: 'text-yellow-400',
        border: 'border-yellow-500',
        bg: 'bg-yellow-500/10',
    },
    'Lair Boss': {
        text: 'text-orange-400',
        border: 'border-orange-500',
        bg: 'bg-orange-500/10',
    },
    'Pinnacle Boss': {
        text: 'text-red-500',
        border: 'border-red-600',
        bg: 'bg-red-500/10',
    },
}

// ============================================
// Boss Tier Colors
// ============================================

export const BOSS_TIER_COLORS: Record<D4BossTier, ColorConfig> = {
    Initiate: {
        text: 'text-green-400',
        border: 'border-green-500',
        bg: 'bg-green-500/10',
    },
    Greater: {
        text: 'text-purple-400',
        border: 'border-purple-500',
        bg: 'bg-purple-500/10',
    },
    Exalted: {
        text: 'text-red-400',
        border: 'border-red-500',
        bg: 'bg-red-500/10',
    },
}

// ============================================
// Aspect Type Colors
// ============================================

export const ASPECT_TYPE_COLORS: Record<D4AspectType, ColorConfig> = {
    Offensive: {
        text: 'text-red-400',
        border: 'border-red-500',
        bg: 'bg-red-500/10',
    },
    Defensive: {
        text: 'text-blue-400',
        border: 'border-blue-500',
        bg: 'bg-blue-500/10',
    },
    Utility: {
        text: 'text-green-400',
        border: 'border-green-500',
        bg: 'bg-green-500/10',
    },
    Mobility: {
        text: 'text-cyan-400',
        border: 'border-cyan-500',
        bg: 'bg-cyan-500/10',
    },
    Resource: {
        text: 'text-purple-400',
        border: 'border-purple-500',
        bg: 'bg-purple-500/10',
    },
}

// ============================================
// Class Colors
// ============================================

export const CLASS_COLORS: Record<D4Class, string> = {
    Barbarian: 'text-red-400',
    Druid: 'text-green-400',
    Necromancer: 'text-purple-400',
    Paladin: 'text-yellow-400',
    Rogue: 'text-cyan-400',
    Sorcerer: 'text-blue-400',
    Spiritborn: 'text-orange-400',
}

// ============================================
// Utility Functions
// ============================================

export function getRarityColorClasses(rarity: D4Rarity): string {
    const colors = RARITY_COLORS[rarity]
    return `${colors.text} ${colors.border} ${colors.bg}`
}

export function getBossTierColorClasses(tier: D4BossTier): string {
    const colors = BOSS_TIER_COLORS[tier]
    return `${colors.text} ${colors.border} ${colors.bg}`
}

export function getBossTypeColorClasses(type: D4BossType): string {
    const colors = BOSS_TYPE_COLORS[type]
    return `${colors.text} ${colors.border} ${colors.bg}`
}

export function getAspectTypeColorClasses(type: D4AspectType): string {
    const colors = ASPECT_TYPE_COLORS[type]
    return `${colors.text} ${colors.border} ${colors.bg}`
}

export function getClassColor(className: D4Class): string {
    return CLASS_COLORS[className]
}
