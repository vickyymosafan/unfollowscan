/**
 * Optimized Instagram Analysis Hook dengan Web Worker
 * 
 * Features:
 * - Web Worker untuk non-blocking processing
 * - React Transitions untuk smooth updates
 * - Optimistic UI updates
 * - Better error handling
 * 
 * @returns {UseInstagramAnalysisReturn} Analysis state dan functions
 */

import { useState, useRef, useTransition, useCallback } from 'react';
import { readMultipleFiles } from '@/lib/utils/file-reader';
import { smoothScrollToElement } from '@/lib/utils/scroll';
import { AnalysisResults, ERROR_MESSAGES } from '@/types';
import { UseInstagramAnalysisReturn, AnalysisTab } from '@/types/hooks';
import { useWebWorker } from './useWebWorker';
import type { WorkerMessage, WorkerResponse } from '@/lib/workers/instagram-worker';

export function useInstagramAnalysisOptimized(): UseInstagramAnalysisReturn {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AnalysisTab>('tidak-follow-balik');
  
  // React Transition untuk smooth, non-blocking updates
  const [isPending, startTransition] = useTransition();

  /**
   * Handle worker response
   */
  const handleWorkerResponse = useCallback((response: WorkerResponse) => {
    if (response.type === 'PROCESSING_COMPLETE') {
      // Use transition untuk smooth update
      startTransition(() => {
        setResults(response.payload);
        setIsProcessing(false);
      });

      // Smooth scroll to results
      setTimeout(() => {
        smoothScrollToElement(resultsRef.current, 100, 1200);
      }, 400);
    } else if (response.type === 'PROCESSING_ERROR') {
      setError(response.error || ERROR_MESSAGES.PARSE_ERROR);
      setIsProcessing(false);
    }
  }, []);

  /**
   * Initialize Web Worker
   */
  const { postMessage: postWorkerMessage, isReady: isWorkerReady, error: workerError } = useWebWorker<WorkerMessage, WorkerResponse>(
    '/workers/instagram-worker.js',
    handleWorkerResponse
  );

  /**
   * Process Instagram files dengan Web Worker
   * 
   * @param followersFiles - Array of followers files
   * @param followingFiles - Array of following files
   */
  const processFiles = useCallback(async (followersFiles: File[], followingFiles: File[]) => {
    // Validation
    if (followersFiles.length === 0 || followingFiles.length === 0) {
      setError(ERROR_MESSAGES.MISSING_FILES);
      return;
    }

    // Check if worker is ready
    if (!isWorkerReady) {
      setError('Processing engine not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Read all files (main thread - fast operation)
      const followersContents = await readMultipleFiles(followersFiles);
      const followingContents = await readMultipleFiles(followingFiles);

      // Validation: Check if we got any data
      if (followersContents.length === 0 && followingContents.length === 0) {
        setError(ERROR_MESSAGES.NO_DATA_FOUND);
        setIsProcessing(false);
        return;
      }

      // Step 2: Offload heavy processing to Web Worker
      postWorkerMessage({
        type: 'PROCESS_FILES',
        payload: {
          followersContents,
          followingContents,
        },
      });

      // Worker will handle parsing and analysis
      // Response will be handled by handleWorkerResponse
    } catch (err) {
      // Error handling dengan detailed logging
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error processing files:', errorMessage, err);
      setError(ERROR_MESSAGES.PARSE_ERROR);
      setIsProcessing(false);
    }
  }, [isWorkerReady, postWorkerMessage]);

  /**
   * Reset semua state ke initial values
   */
  const reset = useCallback(() => {
    startTransition(() => {
      setResults(null);
      setError(null);
      setIsProcessing(false);
      setActiveTab('tidak-follow-balik');
    });
  }, []);

  /**
   * Change active tab dengan React Transition untuk smooth updates
   * 
   * @param tab - Tab to switch to
   */
  const changeTab = useCallback((tab: AnalysisTab) => {
    // Use startTransition untuk non-blocking tab switch
    startTransition(() => {
      setActiveTab(tab);
    });
  }, []);

  /**
   * Get data untuk current active tab
   * 
   * @returns Array of usernames untuk active tab
   */
  const getCurrentTabData = useCallback((): string[] => {
    if (!results) return [];

    // Simplified mapping menggunakan object lookup
    const tabDataMap: Record<AnalysisTab, string[]> = {
      'tidak-follow-balik': results.tidakFollowBalik,
      'fans': results.fans,
      'mutual': results.mutual,
    };

    return tabDataMap[activeTab] || [];
  }, [results, activeTab]);

  return {
    results,
    error: error || workerError,
    isProcessing: isProcessing || isPending,
    activeTab,
    resultsRef,
    processFiles,
    reset,
    changeTab,
    getCurrentTabData,
  };
}
