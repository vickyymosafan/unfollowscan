import { useState, useRef, useTransition, useCallback } from 'react';
import { readMultipleFiles } from '@/lib/utils/file-reader';
import { parseInstagramFile } from '@/lib/parser/instagram-parser';
import { analyzeFollowers } from '@/lib/analysis/follower-analyzer';
import { smoothScrollToElement } from '@/lib/utils/scroll';
import { AnalysisResults, ERROR_MESSAGES } from '@/types';
import { UseInstagramAnalysisReturn, AnalysisTab } from '@/types/hooks';

/**
 * Custom hook untuk mengelola Instagram analysis logic
 * 
 * Features:
 * - File processing orchestration
 * - Analysis state management
 * - Tab navigation
 * - Error handling
 * - Auto scroll to results
 * 
 * @returns {UseInstagramAnalysisReturn} Analysis state dan functions
 * 
 * @example
 * ```tsx
 * const { results, processFiles, activeTab, changeTab } = useInstagramAnalysis();
 * 
 * // Process files
 * await processFiles(followersFiles, followingFiles);
 * 
 * // Change tab
 * changeTab('fans');
 * ```
 */
export function useInstagramAnalysis(): UseInstagramAnalysisReturn {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AnalysisTab>('tidak-follow-balik');
  
  // React Transition untuk smooth, non-blocking updates
  const [isPending, startTransition] = useTransition();

  /**
   * Process Instagram files dan analyze followers/following
   * 
   * @param followersFiles - Array of followers files
   * @param followingFiles - Array of following files
   */
  const processFiles = async (followersFiles: File[], followingFiles: File[]) => {
    // Validation
    if (followersFiles.length === 0 || followingFiles.length === 0) {
      setError(ERROR_MESSAGES.MISSING_FILES);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Read all files
      const followersContents = await readMultipleFiles(followersFiles);
      const followingContents = await readMultipleFiles(followingFiles);

      // Step 2: Parse all files
      const followersParsed = followersContents.flatMap((content) =>
        parseInstagramFile(content, 'auto')
      );
      const followingParsed = followingContents.flatMap((content) =>
        parseInstagramFile(content, 'auto')
      );

      // Step 3: Extract usernames
      const followersUsernames = followersParsed.map((user) => user.username);
      const followingUsernames = followingParsed.map((user) => user.username);

      // Validation: Check if we got any data
      if (followersUsernames.length === 0 && followingUsernames.length === 0) {
        setError(ERROR_MESSAGES.NO_DATA_FOUND);
        return;
      }

      // Step 4: Analyze followers/following
      const analysisResults = analyzeFollowers(
        followersUsernames,
        followingUsernames
      );

      // Step 5: Update results
      setResults(analysisResults);

      // Step 6: Smooth scroll to results
      setTimeout(() => {
        smoothScrollToElement(resultsRef.current, 100, 1200);
      }, 400);
    } catch (err) {
      // Error handling dengan detailed logging
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error processing files:', errorMessage, err);
      setError(ERROR_MESSAGES.PARSE_ERROR);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Reset semua state ke initial values
   */
  const reset = () => {
    setResults(null);
    setError(null);
    setIsProcessing(false);
    setActiveTab('tidak-follow-balik');
  };

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
  const getCurrentTabData = (): string[] => {
    if (!results) return [];

    // Simplified mapping menggunakan object lookup
    const tabDataMap: Record<AnalysisTab, string[]> = {
      'tidak-follow-balik': results.tidakFollowBalik,
      'fans': results.fans,
      'mutual': results.mutual,
    };

    return tabDataMap[activeTab] || [];
  };

  return {
    results,
    error,
    isProcessing,
    activeTab,
    resultsRef,
    processFiles,
    reset,
    changeTab,
    getCurrentTabData,
  };
}
