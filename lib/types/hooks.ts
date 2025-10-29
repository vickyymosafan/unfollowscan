/**
 * Type definitions for custom hooks
 * Centralized type definitions untuk consistency dan reusability
 */

import { ChangeEvent, DragEvent } from 'react';

// ============================================
// Common Types
// ============================================

/**
 * File type untuk Instagram data
 */
export type FileType = 'followers' | 'following';

/**
 * Tab type untuk hasil analisis
 */
export type AnalysisTab = 'tidak-follow-balik' | 'fans' | 'mutual';

/**
 * Drag state untuk file upload
 */
export interface DragState {
    followers: boolean;
    following: boolean;
}

/**
 * Error state untuk file upload
 */
export interface FileErrors {
    followers: string[];
    following: string[];
}

// ============================================
// Hook Return Types
// ============================================

/**
 * Return type untuk useFileUpload hook
 */
export interface UseFileUploadReturn {
    followersFiles: File[];
    followingFiles: File[];
    errors: FileErrors;
    dragOverFollowers: boolean;
    dragOverFollowing: boolean;
    followersInputRef: React.RefObject<HTMLInputElement | null>;
    followingInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileSelection: (files: FileList | null, type: FileType) => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>, type: FileType) => void;
    handleDragLeave: (e: DragEvent<HTMLDivElement>, type: FileType) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>, type: FileType) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, type: FileType) => void;
    triggerFileInput: (type: FileType) => void;
    swapFiles: () => void;
    resetFiles: () => void;
}

/**
 * Return type untuk useTableSearch hook
 */
export interface UseTableSearchReturn {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    getFilteredData: (data: string[]) => string[];
}

/**
 * Props untuk useTablePagination hook
 */
export interface UseTablePaginationProps {
    totalItems: number;
    itemsPerPage?: number;
}

/**
 * Return type untuk useTablePagination hook
 */
export interface UseTablePaginationReturn {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    resetPage: () => void;
    getPaginatedData: <T>(data: T[]) => T[];
}

/**
 * Props untuk useTextPressure hook
 */
export interface UseTextPressureProps {
    chars: string[];
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    scale?: boolean;
    minFontSize?: number;
}

/**
 * Return type untuk useTextPressure hook
 */
export interface UseTextPressureReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    titleRef: React.RefObject<HTMLHeadingElement | null>;
    spansRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
    fontSize: number;
    scaleY: number;
    lineHeight: number;
}

/**
 * Return type untuk useInstagramAnalysis hook
 */
export interface UseInstagramAnalysisReturn {
    results: import('@/lib/types').AnalysisResults | null;
    error: string | null;
    isProcessing: boolean;
    activeTab: AnalysisTab;
    resultsRef: React.RefObject<HTMLDivElement | null>;
    processFiles: (followersFiles: File[], followingFiles: File[]) => Promise<void>;
    reset: () => void;
    changeTab: (tab: AnalysisTab) => void;
    getCurrentTabData: () => string[];
}
