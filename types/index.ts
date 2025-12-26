// TypeScript types for the application

// User types
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
  rarity: 'Common' | 'Magic' | 'Rare' | 'Legendary' | 'Unique'
  requiredLevel: number
  itemPower: number
  description: string
  affixes: D4Affix[]
  iconUrl?: string
  class?: string[]
}

export interface D4Affix {
  name: string
  value: string
  description: string
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
