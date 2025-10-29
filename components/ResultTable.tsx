'use client';

import { useState, useMemo, useEffect } from 'react';
import { ResultTableProps } from '@/lib/types';
import { generateCSV, downloadCSV } from '@/lib/utils/csv-generator';
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
    <div className="space-y-6">
      {/* Top Section: Search and CSV Download */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari username..."
        />

        {/* CSV Download Button */}
        <DownloadButton onClick={handleDownloadCSV} ariaLabel="Unduh CSV" />
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-shark-700 bg-shark-100 px-4 py-2 rounded-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>
          Menampilkan <span className="font-semibold text-shark-950">{filteredData.length}</span> hasil
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
          <div className="overflow-hidden border-2 border-shark-300 rounded-2xl shadow-sm bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="lg:sticky lg:top-0 bg-shark-950 text-shark-50 text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
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
                    <td className="px-6 py-4">
                      <a
                        href={`https://instagram.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-shark-800 group-hover:text-shark-950 font-medium transition-colors"
                      >
                        <div className="w-8 h-8 bg-shark-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-sm font-bold text-shark-800">@</span>
                        </div>
                        <span className="group-hover:underline">{username}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-shark-100 px-6 py-4 rounded-xl">
              <div className="text-sm text-shark-700 font-medium">
                Halaman <span className="text-shark-950 font-bold">{currentPage}</span> dari <span className="text-shark-950 font-bold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-shark-300 rounded-xl hover:border-shark-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-shark-700 focus:ring-offset-2 font-medium transition-all"
                  aria-label="Halaman sebelumnya"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-shark-300 rounded-xl hover:border-shark-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-shark-700 focus:ring-offset-2 font-medium transition-all"
                  aria-label="Halaman selanjutnya"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
