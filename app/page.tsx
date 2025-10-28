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

      console.log('Parsed followers:', followersUsernames.length);
      console.log('Parsed following:', followingUsernames.length);
      console.log('Sample followers:', followersUsernames.slice(0, 5));
      console.log('Sample following:', followingUsernames.slice(0, 5));

      // Check if we got any data
      if (followersUsernames.length === 0 && followingUsernames.length === 0) {
        setError(ERROR_MESSAGES.NO_DATA_FOUND);
        return;
      }

      // Step 4: Analyze
      console.log('🔥 Calling analyzeFollowers with:', {
        followersCount: followersUsernames.length,
        followingCount: followingUsernames.length
      });
      
      const analysisResults = analyzeFollowers(
        followersUsernames,
        followingUsernames
      );
      
      console.log('🔥 analyzeFollowers returned:', {
        followersSetSize: analysisResults.followers.size,
        followingSetSize: analysisResults.following.size,
        tidakFollowBalikLength: analysisResults.tidakFollowBalik.length,
        mutualLength: analysisResults.mutual.length,
        fansLength: analysisResults.fans.length
      });

      console.log('Analysis results:', {
        followers: analysisResults.stats.totalFollowers,
        following: analysisResults.stats.totalFollowing,
        tidakFollowBalik: analysisResults.tidakFollowBalik.length,
        mutual: analysisResults.mutual.length,
        fans: analysisResults.fans.length,
      });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12 max-w-6xl">
        <Hero />
        
        <InfoBanner />
        
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#111315] mb-2">📊 Hasil Analisis</h2>
              <p className="text-gray-600">Berikut adalah ringkasan analisis followers dan following Kamu</p>
            </div>
            
            <StatsSummary
              stats={{
                totalFollowers: results.stats.totalFollowers,
                totalFollowing: results.stats.totalFollowing,
                mutual: results.mutual.length,
                tidakFollowBalik: results.tidakFollowBalik.length,
                fans: results.fans.length,
              }}
            />
            
            <div className="space-y-6">
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
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
