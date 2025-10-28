'use client';

import { useState, useRef } from 'react';
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
  // Refs
  const resultsRef = useRef<HTMLDivElement>(null);

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

      // Step 6: Ultra smooth scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          const targetPosition = resultsRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1200; // 1.2 detik untuk scroll yang sangat smooth
          let start: number | null = null;

          // Easing function untuk smooth scroll
          const easeInOutCubic = (t: number): number => {
            return t < 0.5 
              ? 4 * t * t * t 
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          };

          const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      }, 400);
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
          <div ref={resultsRef} className="space-y-8 scroll-mt-24">
            <div className="text-center animate-fade-in">
              <div className="inline-block mb-4 px-4 py-2 bg-green-100 border-2 border-green-300 rounded-full">
                <span className="text-green-700 font-semibold text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Proses Selesai!
                </span>
              </div>
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

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-3 py-6 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-center text-gray-700 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Scroll ke bawah untuk melihat siapa saja yang tidak follow balik
                </p>
              </div>
              <div className="animate-bounce-slow">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            
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
