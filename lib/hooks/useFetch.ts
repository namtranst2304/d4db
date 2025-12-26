'use client'

import { useState, useEffect } from 'react'

interface UseFetchOptions {
  enabled?: boolean
}

interface UseFetchResult<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  refetch: () => Promise<void>
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = { enabled: true }
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    if (!options.enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled])

  return { data, error, isLoading, refetch: fetchData }
}
