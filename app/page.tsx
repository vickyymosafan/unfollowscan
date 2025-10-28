'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InfoBanner from '@/components/InfoBanner';
import FileUploadCard from '@/components/FileUploadCard';
import StatsSummary from '@/components/StatsSummary';
import ResultTabs from '@/components/ResultTabs';
import ResultTable from '@/components/ResultTable';
import Footer from '@/components/Footer';
import { readMultipleFiles } from '@/lib/utils/file-reader';
import { parseInstagramFile } from '@/lib/parser/instagram-parser';
import { analyzeFollowers } from '@/lib/analysis/follower-analyzer';
import { AnalysisResults, ERROR_MESSAGES } from '@/lib/types';

export default function Home() {
  // State management
  const [followersFiles, setFollowersFiles] = useState<File[]>([]);
  const [followingFiles, setFollowingFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tidak-follow-balik' | 'fans' | 'mutual'>('tidak-follow-balik');

  // Handler: File selection
  const handleFilesSelected = (followers: File[], following: File[]) => {
    setFollowersFiles(followers);
    setFollowingFiles(following);
    setError(null);
  };

  // Handler: Process files
  const handleProcess = async () => {
    // Validate that both files are uploaded
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
    } catch (err) {
      console.error('Error processing files:', err);
      setError(ERROR_MESSAGES.PARSE_ERROR);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler: Reset
  const handleReset = () => {
    setFollowersFiles([]);
    setFollowingFiles([]);
    setResults(null);
    setError(null);
    setIsProcessing(false);
    setActiveTab('tidak-follow-balik');
  };

  // Handler: Swap files
  const handleSwap = () => {
    const tempFollowers = followersFiles;
    setFollowersFiles(followingFiles);
    setFollowingFiles(tempFollowers);
  };

  // Handler: Tab change
  const handleTabChange = (tab: 'tidak-follow-balik' | 'fans' | 'mutual') => {
    setActiveTab(tab);
  };

  // Get data for current tab
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

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
        <Hero />
        
        <InfoBanner />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <FileUploadCard
          onFilesSelected={handleFilesSelected}
          onProcess={handleProcess}
          onReset={handleReset}
          onSwap={handleSwap}
          isProcessing={isProcessing}
          followersFiles={followersFiles}
          followingFiles={followingFiles}
        />
        
        {results && (
          <>
            <StatsSummary
              stats={{
                totalFollowers: results.stats.totalFollowers,
                totalFollowing: results.stats.totalFollowing,
                mutual: results.mutual.length,
                tidakFollowBalik: results.tidakFollowBalik.length,
                fans: results.fans.length,
              }}
            />
            
            <div className="space-y-4">
              <ResultTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                counts={{
                  tidakFollowBalik: results.tidakFollowBalik.length,
                  fans: results.fans.length,
                  mutual: results.mutual.length,
                }}
              />
              
              <ResultTable
                data={getCurrentTabData()}
                category={activeTab}
              />
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
