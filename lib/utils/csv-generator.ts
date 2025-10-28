/**
 * Generate CSV content dari array of usernames
 * 
 * Format CSV:
 * username
 * user1
 * user2
 * user3
 * 
 * @param usernames - Array of usernames untuk di-export
 * @returns CSV content sebagai string
 */
export function generateCSV(usernames: string[]): string {
  // Header row
  const header = 'username';
  
  // Data rows - satu username per baris
  const rows = usernames.map(username => username);
  
  // Gabung header dan rows dengan newline
  const csvContent = [header, ...rows].join('\n');
  
  return csvContent;
}

/**
 * Trigger download CSV file di browser
 * 
 * @param content - CSV content sebagai string
 * @param filename - Nama file untuk download (e.g., "tidak-follow-balik.csv")
 */
export function downloadCSV(content: string, filename: string): void {
  // Create Blob dengan CSV content
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  
  // Create object URL dari Blob
  const url = URL.createObjectURL(blob);
  
  // Create temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append ke body (required untuk Firefox)
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
