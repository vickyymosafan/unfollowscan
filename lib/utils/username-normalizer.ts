/**
 * Normalisasi username Instagram untuk konsistensi
 * 
 * Rules:
 * 1. Convert to lowercase
 * 2. Trim whitespace
 * 3. Remove @ prefix
 * 4. If URL, extract path: instagram.com/username → username
 * 5. Remove query parameters: username?param=value → username
 * 6. Remove trailing slashes
 * 
 * @param input - Raw username atau URL dari Instagram
 * @returns Normalized username
 */
export function normalizeUsername(input: string): string {
  if (!input) return '';
  
  // Trim whitespace dan convert ke lowercase
  let normalized = input.trim().toLowerCase();
  
  // Check jika ini adalah URL Instagram
  if (normalized.includes('instagram.com')) {
    try {
      // Extract path dari URL
      // Handle berbagai format: https://instagram.com/username, instagram.com/username, dll
      const urlMatch = normalized.match(/instagram\.com\/([^/?#]+)/);
      if (urlMatch && urlMatch[1]) {
        normalized = urlMatch[1];
      }
    } catch (error) {
      // Jika gagal parse URL, lanjutkan dengan string processing
    }
  }
  
  // Remove @ prefix jika ada
  if (normalized.startsWith('@')) {
    normalized = normalized.substring(1);
  }
  
  // Remove query parameters (everything after ?)
  const queryIndex = normalized.indexOf('?');
  if (queryIndex !== -1) {
    normalized = normalized.substring(0, queryIndex);
  }
  
  // Remove hash fragments (everything after #)
  const hashIndex = normalized.indexOf('#');
  if (hashIndex !== -1) {
    normalized = normalized.substring(0, hashIndex);
  }
  
  // Remove trailing slashes
  normalized = normalized.replace(/\/+$/, '');
  
  // Remove leading slashes
  normalized = normalized.replace(/^\/+/, '');
  
  return normalized;
}
