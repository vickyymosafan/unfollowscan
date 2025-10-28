import { InstagramJSONData, ParsedUser } from '@/lib/types';
import { normalizeUsername } from '@/lib/utils/username-normalizer';

/**
 * Parse JSON format dari Instagram export
 * 
 * Mencari key: followers, relationships_following, following, list
 * Ekstrak username dari string_list_data[0].value atau string_list_data[0].href
 * 
 * @param content - String JSON dari file Instagram
 * @returns Array of ParsedUser dengan username yang sudah dinormalisasi
 */
export function parseJSON(content: string): ParsedUser[] {
  const users: ParsedUser[] = [];
  
  try {
    const data: InstagramJSONData = JSON.parse(content);
    
    // Coba berbagai key yang mungkin ada di Instagram export
    const possibleKeys: (keyof InstagramJSONData)[] = [
      'followers',
      'relationships_following',
      'following',
      'list'
    ];
    
    for (const key of possibleKeys) {
      const entries = data[key];
      
      if (Array.isArray(entries)) {
        for (const entry of entries) {
          // Instagram export biasanya punya struktur string_list_data
          if (entry.string_list_data && Array.isArray(entry.string_list_data)) {
            for (const item of entry.string_list_data) {
              // Prioritas: value > href
              const rawValue = item.value || item.href;
              
              if (rawValue) {
                const username = normalizeUsername(rawValue);
                
                if (username) {
                  users.push({
                    username,
                    originalValue: rawValue
                  });
                }
              }
            }
          }
        }
      }
    }
    
  } catch (error) {
    // Jika JSON.parse gagal atau struktur tidak sesuai, return empty array
    console.error('Error parsing JSON:', error);
  }
  
  return users;
}
