'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InfoBanner from '@/components/InfoBanner';
import FileUploadCard from '@/components/FileUploadCard';
import StatsSummary from '@/components/StatsSummary';
import ResultTabs from '@/components/ResultTabs';
import ResultTable from '@/components/ResultTable';
import Footer from '@/components/Footer';
import PageWithBackground from '@/components/PageWithBackground';
import { useInstagramAnalysis } from '@/lib/hooks/useInstagramAnalysis';
import { SuccessIcon, EyeIcon, ArrowDownIcon, AlertIcon } from '@/lib/icons';

export default function Home() {
  const {
    results,
    error,
    isProcessing,
    activeTab,
    resultsRef,
    processFiles,
    reset,
    changeTab,
    getCurrentTabData,
  } = useInstagramAnalysis();

  return (
    <PageWithBackground>
      <Header />

      <main className="container mx-auto px-4 py-6 sm:py-8 lg:py-10 space-y-8 sm:space-y-10 lg:space-y-12 max-w-6xl">
        <Hero />

        <InfoBanner />

        {error && (
          <div className="bg-shark-100 border-2 border-shark-300 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertIcon className="w-5 h-5 sm:w-6 sm:h-6 text-shark-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-shark-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        <FileUploadCard
          onProcess={processFiles}
          onReset={reset}
          isProcessing={isProcessing}
        />

        {results && (
          <div ref={resultsRef} className="space-y-6 sm:space-y-8 scroll-mt-24">
            <div className="text-center animate-fade-in px-4">
              <div className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-shark-200 border-2 border-shark-400 rounded-full">
                <span className="text-shark-900 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <SuccessIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Proses Selesai!
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-shark-950 mb-2">📊 Hasil Analisis</h2>
              <p className="text-sm sm:text-base text-shark-700">Berikut adalah ringkasan analisis followers dan following Kamu</p>
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
            <div className="flex flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6 animate-fade-in px-4">
              <div className="bg-shark-100 border-2 border-shark-300 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-sm">
                <p className="text-center text-shark-800 font-medium flex items-center gap-2 text-xs sm:text-sm lg:text-base">
                  <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-shark-700 flex-shrink-0" />
                  Scroll ke bawah untuk melihat siapa saja yang tidak follow balik
                </p>
              </div>
              <div className="animate-bounce-slow">
                <ArrowDownIcon className="w-6 h-6 sm:w-8 sm:h-8 text-shark-700" />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <ResultTabs
                activeTab={activeTab}
                onTabChange={changeTab}
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
    </PageWithBackground>
  );
}
