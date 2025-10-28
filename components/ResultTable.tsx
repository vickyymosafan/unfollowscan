'use client';

import { useState, useMemo, useEffect } from 'react';
import { ResultTableProps } from '@/lib/types';
import { generateCSV, downloadCSV } from '@/lib/utils/csv-generator';

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
        <p className="text-gray-600">
          Belum ada data. Unggah file terlebih dahulu.
        </p>
      </div>
    );
  }

  // Empty state: no search results
  const showNoResults = filteredData.length === 0 && searchQuery.trim();

  return (
    <div className="space-y-4">
      {/* Top Section: Search and CSV Download */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <div className="w-full sm:w-auto sm:flex-1 max-w-md">
          <label htmlFor="search-username" className="sr-only">
            Cari username
          </label>
          <input
            id="search-username"
            type="text"
            placeholder="Cari username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#DADDE1] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#111315] focus:border-transparent"
            aria-label="Cari username"
          />
        </div>

        {/* CSV Download Button */}
        <button
          onClick={handleDownloadCSV}
          className="px-6 py-2 bg-[#111315] text-[#F7F7F8] rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2 whitespace-nowrap"
          aria-label="Unduh CSV"
        >
          Unduh CSV
        </button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Menampilkan {filteredData.length} hasil
        {searchQuery && ` untuk "${searchQuery}"`}
      </div>

      {/* No Search Results */}
      {showNoResults ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Tidak ada hasil. Coba ubah kata kunci.
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto border border-[#DADDE1] rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="lg:sticky lg:top-0 bg-[#111315] text-[#F7F7F8] text-left px-4 py-3 font-medium">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((username, index) => (
                  <tr
                    key={`${username}-${index}`}
                    className="border-b border-[#DADDE1] hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={`https://instagram.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#111315] underline hover:no-underline"
                      >
                        {username}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Halaman {currentPage} dari {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-[#DADDE1] rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2"
                  aria-label="Halaman sebelumnya"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-[#DADDE1] rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2"
                  aria-label="Halaman selanjutnya"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
