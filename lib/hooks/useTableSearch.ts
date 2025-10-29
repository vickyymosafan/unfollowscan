import { useState, useMemo } from 'react';
import { UseTableSearchReturn } from '@/lib/types/hooks';

/**
 * Custom hook untuk mengelola table search logic
 * 
 * Features:
 * - Case-insensitive search
 * - Memoized filtering untuk performance
 * - Generic data type support
 * 
 * @returns {UseTableSearchReturn} Search state dan filter function
 * 
 * @example
 * ```tsx
 * const { searchQuery, setSearchQuery, getFilteredData } = useTableSearch();
 * const filtered = getFilteredData(data);
 * ```
 */
export function useTableSearch(): UseTableSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredData = useMemo(() => {
    return (data: string[]) => {
      if (!searchQuery.trim()) return data;
      
      const query = searchQuery.toLowerCase();
      return data.filter((username) => username.toLowerCase().includes(query));
    };
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    getFilteredData,
  };
}
