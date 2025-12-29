import { useState, useEffect } from 'react'

interface UseDataFetchResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useDataFetch<T>(url: string): UseDataFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        console.error(`Error fetching ${url}:`, err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, isLoading, error }
}

interface UseMultiDataFetchResult<T> {
  data: T[]
  isLoading: boolean
  error: string | null
}

export function useMultiDataFetch<T>(urls: string[]): UseMultiDataFetchResult<T> {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const responses = await Promise.all(
          urls.map(url => fetch(url))
        )

        const results = await Promise.all(
          responses.map(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`)
            }
            return res.json()
          })
        )

        setData(results)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        console.error('Error fetching multiple URLs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (urls.length > 0) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.length])

  return { data, isLoading, error }
}
