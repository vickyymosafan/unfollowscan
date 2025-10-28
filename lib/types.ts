// File Upload Models
export interface UploadedFile {
  file: File;
  status: 'pending' | 'valid' | 'invalid';
  error?: string;
}

export interface FileValidation {
  isValid: boolean;
  fileType: 'json' | 'html' | 'unknown';
  error?: string;
}

// Instagram Data Models
export interface InstagramJSONFollower {
  string_list_data: Array<{
    href: string;
    value: string;
    timestamp: number;
  }>;
}

export interface InstagramJSONData {
  followers?: InstagramJSONFollower[];
  relationships_following?: InstagramJSONFollower[];
  following?: InstagramJSONFollower[];
  list?: InstagramJSONFollower[];
}

export interface ParsedUser {
  username: string;
  originalValue: string; // untuk debugging
}

// Analysis Models
export interface AnalysisResults {
  followers: Set<string>;
  following: Set<string>;
  tidakFollowBalik: string[]; // sorted
  mutual: string[]; // sorted
  fans: string[]; // sorted
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    duplicatesRemoved: number;
  };
}

// UI State Models
export interface ProcessingState {
  isProcessing: boolean;
  stage: 'idle' | 'reading' | 'parsing' | 'analyzing' | 'complete' | 'error';
  message: string;
  progress?: number; // optional untuk Web Worker
}

export interface PageState {
  followersFiles: File[];
  followingFiles: File[];
  isProcessing: boolean;
  results: AnalysisResults | null;
  error: string | null;
  activeTab: 'tidak-follow-balik' | 'fans' | 'mutual';
}

// Error Handling Models
export type ErrorType =
  | 'INVALID_FILE_FORMAT'
  | 'FILE_TOO_LARGE'
  | 'PARSE_ERROR'
  | 'NO_DATA_FOUND'
  | 'FILES_SWAPPED'
  | 'MISSING_FILES';

export interface AppError {
  type: ErrorType;
  message: string;
  details?: string;
}

export const ERROR_MESSAGES: Record<ErrorType, string> = {
  INVALID_FILE_FORMAT: 'Format tidak dikenali. Unggah file dari folder connections atau followers_and_following.',
  FILE_TOO_LARGE: 'File terlalu besar. Tunggu proses parsing selesai.',
  PARSE_ERROR: 'Gagal membaca file. Pastikan file dari Instagram export.',
  NO_DATA_FOUND: 'Tidak ada data ditemukan dalam file.',
  FILES_SWAPPED: 'File tertukar. Gunakan tombol Tukar file.',
  MISSING_FILES: 'Unggah kedua file (followers dan following) untuk melanjutkan.'
};

// Component Props Interfaces
export interface FileUploadCardProps {
  onFilesSelected: (followers: File[], following: File[]) => void;
  onProcess: () => void;
  onReset: () => void;
  onSwap: () => void;
  isProcessing: boolean;
  followersFiles: File[];
  followingFiles: File[];
}

export interface StatsSummaryProps {
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    mutual: number;
    tidakFollowBalik: number;
    fans: number;
  };
}

export interface ResultTabsProps {
  activeTab: 'tidak-follow-balik' | 'fans' | 'mutual';
  onTabChange: (tab: 'tidak-follow-balik' | 'fans' | 'mutual') => void;
  counts: {
    tidakFollowBalik: number;
    fans: number;
    mutual: number;
  };
}

export interface ResultTableProps {
  data: string[]; // array of usernames
  category: string; // untuk nama file CSV
}

export interface TableState {
  searchQuery: string;
  currentPage: number;
  itemsPerPage: 20;
}
