import { useState, useRef } from 'react';
import { readMultipleFiles } from '@/lib/utils/file-reader';
import { parseInstagramFile } from '@/lib/parser/instagram-parser';
import { analyzeFollowers } from '@/lib/analysis/follower-analyzer';
import { smoothScrollToElement } from '@/lib/utils/scroll';
import { AnalysisResults, ERROR_MESSAGES } from '@/lib/types';

interface UseInstagramAnalysisReturn {
  results: AnalysisResults | null;
  error: string | null;
  isProcessing: boolean;
  activeTab: 'tidak-follow-balik' | 'fans' | 'mutual';
  resultsRef: React.RefObject<HTMLDivElement | null>;
  processFiles: (followersFiles: File[], followingFiles: File[]) => Promise<void>;
  reset: () => void;
  changeTab: (tab: 'tidak-follow-balik' | 'fans' | 'mutual') => void;
  getCurrentTabData: () => string[];
}

export function useInstagramAnalysis(): UseInstagramAnalysisReturn {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tidak-follow-balik' | 'fans' | 'mutual'>('tidak-follow-balik');

  const processFiles = async (followersFiles: File[], followingFiles: File[]) => {
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

      // Check if we got any data
      if (followersUsernames.length === 0 && followingUsernames.length === 0) {
        setError(ERROR_MESSAGES.NO_DATA_FOUND);
        return;
      }

      // Step 4: Analyze
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
      console.error('Error processing files:', err);
      setError(ERROR_MESSAGES.PARSE_ERROR);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setResults(null);
    setError(null);
    setIsProcessing(false);
    setActiveTab('tidak-follow-balik');
  };

  const changeTab = (tab: 'tidak-follow-balik' | 'fans' | 'mutual') => {
    setActiveTab(tab);
  };

  const getCurrentTabData = (): string[] => {
    if (!results) return [];

    switch (activeTab) {
      case 'tidak-follow-balik':
        return results.tidakFollowBalik;
      case 'fans':
        return results.fans;
      case 'mutual':
        return results.mutual;
      default:
        return [];
    }
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
