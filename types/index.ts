// TypeScript types for the application

// ============================================
// Common Union Types
// ============================================

// Diablo 4 Classes
export type D4Class = 'Barbarian' | 'Druid' | 'Necromancer' | 'Paladin' | 'Rogue' | 'Sorcerer' | 'Spiritborn'

// Item Rarities
export type D4Rarity = 'Common' | 'Magic' | 'Rare' | 'Legendary' | 'Unique' | 'Mythic'

// Item Categories
export type D4ItemCategory = 'Weapons' | 'Armor' | 'Socketable' | 'Consumable' | 'Material'

// Boss Types and Tiers
export type D4BossType = 'World Boss' | 'Lair Boss' | 'Pinnacle Boss'
export type D4BossTier = 'Initiate' | 'Greater' | 'Exalted'

// Aspect Types
export type D4AspectType = 'Offensive' | 'Defensive' | 'Utility' | 'Mobility' | 'Resource'

// Skill Categories
export type D4SkillCategory = 'Basic' | 'Core' | 'Defensive' | 'Brawling' | 'Weapon Mastery' | 'Ultimate' | 'Key Passive' | 'Spirit' | 'Companion' | 'Wrath'

// ============================================
// User Types
// ============================================

export interface User {
  id: string
  email: string
  username: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Diablo 4 Item types
export interface D4Item {
  id: string
  name: string
  type: string
  category: 'Weapons' | 'Armor' | 'Socketable' | 'Consumable' | 'Material'
  rarity: 'Common' | 'Magic' | 'Rare' | 'Legendary' | 'Unique' | 'Mythic'
  requiredLevel: number
  itemPower: number
  description: string
  affixes: D4Affix[]
  iconUrl?: string
  class?: string[]
  slot?: string // e.g., 'Helm', 'Chest Armor', 'Ring', 'Amulet'
}

export interface D4Affix {
  name: string
  value: string
  description: string
  type?: 'Offensive' | 'Defensive' | 'Utility' | 'Resource'
}

// Diablo 4 Aspect types
export interface D4Aspect {
  id: string
  name: string
  type: 'Offensive' | 'Defensive' | 'Utility' | 'Mobility' | 'Resource'
  description: string
  class: string[] // ['Barbarian', 'Druid', etc.] or ['All Classes']
  dungeonLocation?: string
  iconUrl?: string
}

// Diablo 4 Boss types
export interface D4Boss {
  id: string
  name: string
  type: 'World Boss' | 'Lair Boss' | 'Pinnacle Boss'
  tier?: 'Initiate' | 'Greater' | 'Exalted' // For Lair Bosses
  location?: string
  summoningMaterials?: D4SummoningMaterial[]
  drops?: D4BossDrop[]
  description?: string
  iconUrl?: string
  guideUrl?: string
}

export interface D4SummoningMaterial {
  name: string
  quantity: number
  source?: string
}

export interface D4BossDrop {
  name: string
  type: 'Unique' | 'Mythic' | 'Rune' | 'Material' | 'Other'
  class?: string[]
}

// Diablo 4 Skill types
export interface D4Skill {
  id: string
  name: string
  class: 'Barbarian' | 'Druid' | 'Necromancer' | 'Paladin' | 'Rogue' | 'Sorcerer' | 'Spiritborn'
  category: 'Basic' | 'Core' | 'Defensive' | 'Brawling' | 'Weapon Mastery' | 'Ultimate' | 'Key Passive' | 'Spirit' | 'Companion' | 'Wrath'
  description: string
  damage?: string
  cooldown?: number
  resourceCost?: number
  resourceType?: string
  enhancements?: D4SkillEnhancement[]
  iconUrl?: string
}

export interface D4SkillEnhancement {
  name: string
  description: string
}

// Diablo 4 Paragon Node types
export interface D4ParagonNode {
  id: string
  name: string
  board: string
  type: 'Normal' | 'Magic' | 'Rare' | 'Legendary' | 'Glyph Socket'
  bonuses: D4ParagonBonus[]
  position?: { x: number; y: number }
}

export interface D4ParagonBonus {
  stat: string
  value: string
}

// Diablo 4 Build types
export interface D4Build {
  id: string
  name: string
  class: 'Barbarian' | 'Druid' | 'Necromancer' | 'Paladin' | 'Rogue' | 'Sorcerer' | 'Spiritborn'
  season?: number
  description: string
  skills: string[] // skill IDs
  aspects: string[] // aspect IDs
  playstyle: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  author?: string
  rating?: number
  updatedAt: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  hasMore: boolean
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  username: string
  password: string
  confirmPassword: string
}

// Theme types
export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
