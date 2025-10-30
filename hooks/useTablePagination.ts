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
  
  // Auto-reset to page 1 if current page exceeds total pages
  // This handles the case when totalItems changes
  const validCurrentPage = currentPage > totalPages && totalPages > 0 ? DEFAULT_START_PAGE : currentPage;
  
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToNextPage = () => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(validCurrentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (validCurrentPage > 1) {
      setCurrentPage(validCurrentPage - 1);
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

  // Reset to page 1 when totalItems changes (using derived state instead of effect)
  useEffect(() => {
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
  }, [validCurrentPage, currentPage]);

  return {
    currentPage: validCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    goToNextPage,
    goToPreviousPage,
    resetPage,
    getPaginatedData,
  };
}
