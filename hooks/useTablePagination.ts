import { useState, useEffect, useMemo } from 'react';
import { UseTablePaginationProps, UseTablePaginationReturn } from '@/types/hooks';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_START_PAGE } from '@/lib/constants/pagination';

/**
 * Custom hook untuk mengelola table pagination logic
 * 
 * Features:
 * - Automatic page calculation
 * - Navigation functions (next/previous)
 * - Auto-reset ketika totalItems berubah
 * - Memoized pagination untuk performance
 * 
 * @param {UseTablePaginationProps} props - Pagination configuration
 * @returns {UseTablePaginationReturn} Pagination state dan functions
 * 
 * @example
 * ```tsx
 * const { currentPage, totalPages, getPaginatedData } = useTablePagination({
 *   totalItems: data.length,
 *   itemsPerPage: 20
 * });
 * const paginated = getPaginatedData(data);
 * ```
 */
export function useTablePagination({
  totalItems,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseTablePaginationProps): UseTablePaginationReturn {
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetPage = () => {
    setCurrentPage(DEFAULT_START_PAGE);
  };

  const getPaginatedData = useMemo(() => {
    return <T,>(data: T[]): T[] => {
      return data.slice(startIndex, endIndex);
    };
  }, [startIndex, endIndex]);

  // Reset to page 1 when totalItems changes
  useEffect(() => {
    setCurrentPage(DEFAULT_START_PAGE);
  }, [totalItems]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToNextPage,
    goToPreviousPage,
    resetPage,
    getPaginatedData,
  };
}
