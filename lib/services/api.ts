import type { D4Item, PaginatedResponse, ApiResponse } from '@/types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
const USE_LOCAL_DATA = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true'

// Generic fetcher with error handling
export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Diablo 4 Items API
export async function getItems(params?: {
  page?: number
  limit?: number
  type?: string
  rarity?: string
  search?: string
}): Promise<PaginatedResponse<D4Item>> {
  if (USE_LOCAL_DATA) {
    // Fetch from local JSON file
    try {
      const response = await fetch('/data/items.json')
      const allItems: D4Item[] = await response.json()

      // Apply filters
      let filtered = allItems
      if (params?.type) {
        filtered = filtered.filter((item) => item.type === params.type)
      }
      if (params?.rarity) {
        filtered = filtered.filter((item) => item.rarity === params.rarity)
      }
      if (params?.search) {
        const searchLower = params.search.toLowerCase()
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchLower)
        )
      }

      // Pagination
      const page = params?.page || 1
      const limit = params?.limit || 20
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedItems = filtered.slice(start, end)

      return {
        data: paginatedItems,
        page,
        limit,
        total: filtered.length,
        hasMore: end < filtered.length,
      }
    } catch (error) {
      console.error('Error loading local items:', error)
      return { data: [], page: 1, limit: 20, total: 0, hasMore: false }
    }
  }

  // Fetch from external API
  const queryParams = new URLSearchParams()
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())
  if (params?.type) queryParams.append('type', params.type)
  if (params?.rarity) queryParams.append('rarity', params.rarity)
  if (params?.search) queryParams.append('search', params.search)

  return fetcher<PaginatedResponse<D4Item>>(
    `/data/items?${queryParams.toString()}`
  )
}

export async function getItemById(id: string): Promise<D4Item | null> {
  if (USE_LOCAL_DATA) {
    try {
      const response = await fetch('/data/items.json')
      const allItems: D4Item[] = await response.json()
      return allItems.find((item) => item.id === id) || null
    } catch (error) {
      console.error('Error loading item:', error)
      return null
    }
  }

  try {
    const response = await fetcher<ApiResponse<D4Item>>(`/data/items/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching item:', error)
    return null
  }
}

// Mock authentication API (replace with real implementation)
export async function login(email: string, password: string) {
  return fetcher('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function register(
  email: string,
  username: string,
  password: string
) {
  return fetcher('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  })
}

export async function logout() {
  return fetcher('/auth/logout', { method: 'POST' })
}
