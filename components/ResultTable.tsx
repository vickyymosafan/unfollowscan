'use client';

import { useState, useMemo, useEffect } from 'react';
import { ResultTableProps } from '@/lib/types';
import { generateCSV, downloadCSV } from '@/lib/utils/csv-generator';
import { formatNumber } from '@/lib/utils/format';
import { UserIcon, ClipboardIcon, ExternalLinkIcon, ArrowLeftIcon, ArrowRightIcon } from '@/lib/icons';
import DownloadButton from './DownloadButton';
import SearchInput from './SearchInput';

export default function ResultTable({ data, category }: ResultTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // CSV filename mapping
  const csvFilenames: Record<string, string> = {
    'tidak-follow-balik': 'tidak-follow-balik.csv',
    'fans': 'fans.csv',
    'mutual': 'mutual.csv',
  };

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    const query = searchQuery.toLowerCase();
    return data.filter((username) => username.toLowerCase().includes(query));
  }, [data, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Handle CSV download
  const handleDownloadCSV = () => {
    const csvContent = generateCSV(filteredData);
    const filename = csvFilenames[category] || 'export.csv';
    downloadCSV(csvContent, filename);
  };

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Empty state: no data at all
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-shark-700">
          Belum ada data. Unggah file terlebih dahulu.
        </p>
      </div>
    );
  }

  // Empty state: no search results
  const showNoResults = filteredData.length === 0 && searchQuery.trim();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Section: Search and CSV Download */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 sm:flex-initial">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari username..."
          />
        </div>

        {/* CSV Download Button */}
        <div className="flex justify-center sm:justify-start">
          <DownloadButton onClick={handleDownloadCSV} ariaLabel="Unduh CSV" />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-shark-700 bg-shark-100 px-3 sm:px-4 py-2 rounded-lg">
        <ClipboardIcon className="w-4 h-4 flex-shrink-0" />
        <span>
          Menampilkan <span className="font-semibold text-shark-950">{formatNumber(filteredData.length)}</span> hasil
          {searchQuery && <span> untuk "<span className="font-medium text-shark-950">{searchQuery}</span>"</span>}
        </span>
      </div>

      {/* No Search Results */}
      {showNoResults ? (
        <div className="text-center py-12">
          <p className="text-shark-700">
            Tidak ada hasil. Coba ubah kata kunci.
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden border-2 border-shark-300 rounded-xl sm:rounded-2xl shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[300px]">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-shark-950 text-shark-50 text-left px-4 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm uppercase tracking-wider z-10">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      Username
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((username, index) => (
                  <tr
                    key={`${username}-${index}`}
                    className="border-b border-shark-200 hover:bg-shark-100 transition-all duration-200 group"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <a
                        href={`https://instagram.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 sm:gap-3 text-shark-800 group-hover:text-shark-950 font-medium transition-colors text-sm sm:text-base"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-shark-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-shark-800">@</span>
                        </div>
                        <span className="group-hover:underline break-all">{username}</span>
                        <ExternalLinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-shark-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl">
              <div className="text-xs sm:text-sm text-shark-700 font-medium">
                Halaman <span className="text-shark-950 font-bold">{currentPage}</span> dari <span className="text-shark-950 font-bold">{totalPages}</span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 border-2 border-shark-300 rounded-xl hover:border-shark-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-shark-700 focus:ring-offset-2 font-medium transition-all text-sm"
                  aria-label="Halaman sebelumnya"
                >
                  <ArrowLeftIcon />
                  <span className="sm:inline">Sebelumnya</span>
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 border-2 border-shark-300 rounded-xl hover:border-shark-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-shark-700 focus:ring-offset-2 font-medium transition-all text-sm"
                  aria-label="Halaman selanjutnya"
                >
                  <span className="sm:inline">Selanjutnya</span>
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
