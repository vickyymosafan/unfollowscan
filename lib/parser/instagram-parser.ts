import { ParsedUser } from '@/lib/types';
import { parseJSON } from './json-parser';
import { parseHTML } from './html-parser';

/**
 * Deteksi format file secara otomatis
 * 
 * @param content - String content dari file
 * @returns 'json' | 'html' | 'unknown'
 */
export function detectFileFormat(content: string): 'json' | 'html' | 'unknown' {
  if (!content || content.trim().length === 0) {
    return 'unknown';
  }
  
  const trimmed = content.trim();
  
  // Coba detect JSON
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      
      // Check jika ada key yang expected dari Instagram export
      if (typeof parsed === 'object' && parsed !== null) {
        const hasExpectedKeys = 
          'followers' in parsed ||
          'relationships_following' in parsed ||
          'following' in parsed ||
          'list' in parsed;
        
        if (hasExpectedKeys) {
          return 'json';
        }
      }
      
      // Valid JSON tapi tidak punya expected keys
      return 'json';
    } catch {
      // Bukan valid JSON
    }
  }
  
  // Coba detect HTML
  if (
    trimmed.includes('<html') ||
    trimmed.includes('<!DOCTYPE') ||
    trimmed.includes('<body') ||
    trimmed.includes('<a ') ||
    trimmed.includes('<div')
  ) {
    return 'html';
  }
  
  return 'unknown';
}

/**
 * Parse file Instagram dan ekstrak usernames
 * 
 * Auto-detect format (JSON atau HTML) dan gunakan parser yang sesuai
 * 
 * @param content - String content dari file Instagram
 * @param fileType - Optional: force specific file type, atau 'auto' untuk auto-detection
 * @returns Array of ParsedUser dengan username yang sudah dinormalisasi
 */
export function parseInstagramFile(
  content: string,
  fileType: 'json' | 'html' | 'auto' = 'auto'
): ParsedUser[] {
  if (!content || content.trim().length === 0) {
    return [];
  }
  
  // Auto-detect jika fileType adalah 'auto'
  let detectedType: 'json' | 'html' | 'unknown' = 
    fileType === 'auto' ? detectFileFormat(content) : fileType;
  
  // Parse berdasarkan detected type
  if (detectedType === 'json') {
    return parseJSON(content);
  } else if (detectedType === 'html') {
    return parseHTML(content);
  }
  
  // Jika unknown, coba JSON dulu, lalu HTML
  let users = parseJSON(content);
  
  if (users.length === 0) {
    users = parseHTML(content);
  }
  
  return users;
}
