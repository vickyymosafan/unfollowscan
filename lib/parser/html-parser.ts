import { ParsedUser } from '@/types';
import { normalizeUsername } from '@/lib/utils/username-normalizer';

/**
 * Parse HTML format dari Instagram export
 * 
 * Menggunakan DOMParser untuk parse HTML
 * Cari semua anchor tags yang mengandung instagram.com
 * Ekstrak username dari href atau textContent
 * 
 * @param content - String HTML dari file Instagram
 * @returns Array of ParsedUser dengan username yang sudah dinormalisasi
 */
export function parseHTML(content: string): ParsedUser[] {
  const users: ParsedUser[] = [];
  
  try {
    // Parse HTML menggunakan DOMParser (browser API)
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Cari semua anchor tags
    const anchors = doc.querySelectorAll('a');
    
    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      const textContent = anchor.textContent || '';
      
      // Filter hanya yang mengandung instagram.com
      if (href.includes('instagram.com') || textContent.includes('instagram.com')) {
        // Prioritas: href > textContent
        const rawValue = href || textContent;
        
        if (rawValue) {
          const username = normalizeUsername(rawValue);
          
          if (username) {
            users.push({
              username,
              originalValue: rawValue
            });
          }
        }
      } else if (textContent.trim()) {
        // Jika tidak ada instagram.com, coba textContent langsung
        // (beberapa export mungkin hanya punya username tanpa URL)
        const username = normalizeUsername(textContent.trim());
        
        if (username) {
          users.push({
            username,
            originalValue: textContent.trim()
          });
        }
      }
    });
    
  } catch (error) {
    // Jika parsing gagal, return empty array
    console.error('Error parsing HTML:', error);
  }
  
  return users;
}
