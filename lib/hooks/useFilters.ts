import { useState, useEffect, useMemo } from 'react'

type FilterFn<T> = (item: T, filters: Record<string, any>) => boolean

export function useFilters<T>(
  items: T[],
  initialFilters: Record<string, any>,
  filterFn: FilterFn<T>
) {
  const [filters, setFilters] = useState(initialFilters)

  const filteredItems = useMemo(() => {
    return items.filter(item => filterFn(item, filters))
  }, [items, filters, filterFn])

  const resetFilters = () => setFilters(initialFilters)

  return {
    filters,
    setFilters,
    filteredItems,
    resetFilters,
  }
}
