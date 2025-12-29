// Utility functions for Diablo 4 items and UI

/**
 * Get color classes for item rarity
 */
export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'Mythic':
      return 'text-purple-300 border-purple-400 bg-purple-900/30 shadow-lg shadow-purple-500/30'
    case 'Unique':
      return 'text-orange-400 border-orange-500 bg-orange-900/20'
    case 'Legendary':
      return 'text-yellow-400 border-yellow-500 bg-yellow-900/20'
    case 'Rare':
      return 'text-blue-400 border-blue-500 bg-blue-900/20'
    case 'Magic':
      return 'text-cyan-400 border-cyan-500 bg-cyan-900/20'
    default:
      return 'text-gray-400 border-gray-500'
  }
}

/**
 * Get color for aspect type
 */
export function getAspectTypeColor(type: string): string {
  switch (type) {
    case 'Offensive':
      return 'text-red-400 border-red-500 bg-red-900/20'
    case 'Defensive':
      return 'text-blue-400 border-blue-500 bg-blue-900/20'
    case 'Utility':
      return 'text-green-400 border-green-500 bg-green-900/20'
    case 'Mobility':
      return 'text-cyan-400 border-cyan-500 bg-cyan-900/20'
    case 'Resource':
      return 'text-purple-400 border-purple-500 bg-purple-900/20'
    default:
      return 'text-gray-400 border-gray-500 bg-gray-900/20'
  }
}

/**
 * Get color for skill category
 */
export function getSkillCategoryColor(category: string): string {
  switch (category) {
    case 'Basic':
      return 'text-gray-400 border-gray-500 bg-gray-900/20'
    case 'Core':
      return 'text-yellow-400 border-yellow-500 bg-yellow-900/20'
    case 'Defensive':
      return 'text-blue-400 border-blue-500 bg-blue-900/20'
    case 'Ultimate':
      return 'text-purple-400 border-purple-500 bg-purple-900/20'
    case 'Key Passive':
      return 'text-red-400 border-red-500 bg-red-900/20'
    default:
      return 'text-green-400 border-green-500 bg-green-900/20'
  }
}

/**
 * Get color for class
 */
export function getClassColor(className: string): string {
  switch (className) {
    case 'Barbarian':
      return 'text-red-400'
    case 'Druid':
      return 'text-green-400'
    case 'Necromancer':
      return 'text-purple-400'
    case 'Paladin':
      return 'text-yellow-400'
    case 'Rogue':
      return 'text-cyan-400'
    case 'Sorcerer':
      return 'text-blue-400'
    case 'Spiritborn':
      return 'text-orange-400'
    default:
      return 'text-gray-400'
  }
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
