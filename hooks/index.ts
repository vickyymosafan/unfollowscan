/**
 * Custom Hooks Index
 * Centralized exports untuk easier imports
 * 
 * @example
 * ```tsx
 * import { useFileUpload, useInstagramAnalysis } from '@/lib/hooks';
 * ```
 */

export { useFileUpload } from './useFileUpload';
export { useTableSearch } from './useTableSearch';
export { useTablePagination } from './useTablePagination';
export { useTextPressure } from './useTextPressure';
export { useInstagramAnalysis } from './useInstagramAnalysis';

// Re-export types untuk convenience
export type {
  UseFileUploadReturn,
  UseTableSearchReturn,
  UseTablePaginationProps,
  UseTablePaginationReturn,
  UseTextPressureProps,
  UseTextPressureReturn,
  UseInstagramAnalysisReturn,
  FileType,
  AnalysisTab,
} from '@/types/hooks';
