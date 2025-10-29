import { useState, useEffect, useMemo } from 'react';

interface UseTablePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
}

interface UseTablePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetPage: () => void;
  getPaginatedData: <T>(data: T[]) => T[];
}

export function useTablePagination({
  totalItems,
  itemsPerPage = 20,
}: UseTablePaginationProps): UseTablePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
  };

  const getPaginatedData = useMemo(() => {
    return <T,>(data: T[]): T[] => {
      return data.slice(startIndex, endIndex);
    };
  }, [startIndex, endIndex]);

  // Reset to page 1 when totalItems changes
  useEffect(() => {
    setCurrentPage(1);
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
