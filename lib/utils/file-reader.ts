import { FileValidation } from '@/types';

/**
 * Baca file sebagai text menggunakan FileReader API
 * 
 * @param file - File object dari input
 * @returns Promise yang resolve dengan file content sebagai string
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result;

      if (typeof content === 'string') {
        resolve(content);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };

    reader.onerror = () => {
      reject(new Error(`Error reading file: ${file.name}`));
    };

    reader.readAsText(file);
  });
}

/**
 * Validasi file type berdasarkan extension dan MIME type
 * 
 * @param file - File object untuk divalidasi
 * @returns FileValidation object dengan isValid, fileType, dan optional error
 */
export function validateFileType(file: File): FileValidation {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  // Check extension
  const isJSON = fileName.endsWith('.json');
  const isHTML = fileName.endsWith('.html') || fileName.endsWith('.htm');

  // Check MIME type jika ada
  const hasJSONMime = fileType.includes('json');
  const hasHTMLMime = fileType.includes('html');

  if (isJSON || hasJSONMime) {
    return {
      isValid: true,
      fileType: 'json'
    };
  }

  if (isHTML || hasHTMLMime) {
    return {
      isValid: true,
      fileType: 'html'
    };
  }

  // File type tidak dikenali
  return {
    isValid: false,
    fileType: 'unknown',
    error: 'Format tidak dikenali. Unggah file JSON atau HTML dari Instagram export.'
  };
}

/**
 * Baca multiple files dan gabungkan content-nya
 * 
 * @param files - Array of File objects
 * @returns Promise yang resolve dengan array of file contents
 */
export function readMultipleFiles(files: File[]): Promise<string[]> {
  // Baca semua files secara concurrent menggunakan Promise.all
  const readPromises = files.map(file => readFileAsText(file));

  return Promise.all(readPromises);
}
