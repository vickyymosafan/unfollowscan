import { useState, useMemo } from 'react';

interface UseTableSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getFilteredData: (data: string[]) => string[];
}

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
