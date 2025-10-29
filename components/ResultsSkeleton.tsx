/**
 * Loading skeleton untuk results section
 * Provides instant visual feedback saat processing
 */

export default function ResultsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">
      {/* Success Badge Skeleton */}
      <div className="text-center px-4">
        <div className="inline-block mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-shark-200 rounded-full">
          <div className="h-4 w-32 bg-shark-300 rounded"></div>
        </div>
        <div className="h-8 sm:h-10 lg:h-12 bg-shark-200 rounded-lg mb-2 max-w-md mx-auto"></div>
        <div className="h-4 sm:h-5 bg-shark-200 rounded-lg max-w-lg mx-auto"></div>
      </div>

      {/* Stats Summary Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-shark-300 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-shark-200 rounded-lg"></div>
              <div className="h-4 w-20 bg-shark-200 rounded"></div>
            </div>
            <div className="h-8 sm:h-10 w-16 bg-shark-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator Skeleton */}
      <div className="flex flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6 px-4">
        <div className="bg-shark-100 border-2 border-shark-300 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-sm w-full max-w-md">
          <div className="h-4 bg-shark-200 rounded"></div>
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-shark-200 rounded"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 sm:h-12 w-32 sm:w-40 bg-shark-200 rounded-xl"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-4">
        {/* Search and Download */}
        <div className="flex gap-3 sm:gap-4">
          <div className="flex-1 h-10 sm:h-12 bg-shark-200 rounded-xl"></div>
          <div className="h-10 sm:h-12 w-32 bg-shark-200 rounded-xl"></div>
        </div>

        {/* Results Count */}
        <div className="h-8 bg-shark-100 rounded-lg"></div>

        {/* Table */}
        <div className="border-2 border-shark-300 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-shark-950 p-4 sm:p-6">
            <div className="h-5 w-24 bg-shark-700 rounded"></div>
          </div>
          {/* Rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-b border-shark-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-shark-200 rounded-lg"></div>
                <div className="h-4 w-32 sm:w-48 bg-shark-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-shark-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl">
          <div className="h-4 w-24 bg-shark-200 rounded"></div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-shark-200 rounded-xl"></div>
            <div className="h-10 w-24 bg-shark-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
