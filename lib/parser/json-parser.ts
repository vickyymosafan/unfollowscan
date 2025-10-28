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
    const data = JSON.parse(content);

    // Helper function to extract users from an array of entries
    const extractUsersFromArray = (entries: any[]) => {
      let extracted = 0;
      
      for (const entry of entries) {
        // Instagram export biasanya punya struktur string_list_data
        if (entry.string_list_data && Array.isArray(entry.string_list_data)) {
          for (const item of entry.string_list_data) {
            // Prioritas: value > title > href
            // value: digunakan di followers_1.json
            // title: digunakan di following.json (relationships_following)
            // href: fallback untuk format lama
            const rawValue = item.value || item.title || item.href;

            if (rawValue) {
              const username = normalizeUsername(rawValue);

              if (username) {
                users.push({
                  username,
                  originalValue: rawValue
                });
                extracted++;
              }
            }
          }
        }
        // Juga cek jika username ada langsung di entry.title (untuk following.json)
        else if (entry.title) {
          const username = normalizeUsername(entry.title);
          if (username) {
            users.push({
              username,
              originalValue: entry.title
            });
            extracted++;
          }
        }
      }
    };

    // Case 1: Data adalah array langsung (format Instagram terbaru)
    if (Array.isArray(data)) {
      extractUsersFromArray(data);
    }
    // Case 2: Data adalah object dengan key
    else if (typeof data === 'object' && data !== null) {
      // Coba berbagai key yang mungkin ada di Instagram export
      const possibleKeys = [
        'followers',
        'relationships_following',
        'following',
        'list'
      ];

      for (const key of possibleKeys) {
        const entries = (data as any)[key];

        if (Array.isArray(entries)) {
          extractUsersFromArray(entries);
        }
      }
    }

  } catch (error) {
    // Jika JSON.parse gagal atau struktur tidak sesuai, return empty array
    console.error('Error parsing JSON:', error);
  }

  return users;
}
