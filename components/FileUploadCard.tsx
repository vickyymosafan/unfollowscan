'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { FileUploadCardProps } from '@/lib/types';
import { validateFileType } from '@/lib/utils/file-reader';
import GlowButton from './GlowButton';
import SwapButton from './SwapButton';
import ResetButton from './ResetButton';

export default function FileUploadCard({
  onFilesSelected,
  onProcess,
  onReset,
  onSwap,
  isProcessing,
  followersFiles,
  followingFiles,
}: FileUploadCardProps) {
  const [dragOverFollowers, setDragOverFollowers] = useState(false);
  const [dragOverFollowing, setDragOverFollowing] = useState(false);
  const [errors, setErrors] = useState<{ followers: string[]; following: string[] }>({
    followers: [],
    following: [],
  });

  const followersInputRef = useRef<HTMLInputElement>(null);
  const followingInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection and validation
  const handleFileSelection = (files: FileList | null, type: 'followers' | 'following') => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    // Validate each file
    fileArray.forEach((file) => {
      const validation = validateFileType(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        validationErrors.push(`${file.name}: ${validation.error}`);
      }
    });

    // Update errors
    setErrors((prev) => ({
      ...prev,
      [type]: validationErrors,
    }));

    // Combine with existing files
    const existingFiles = type === 'followers' ? followersFiles : followingFiles;
    const allFiles = [...existingFiles, ...validFiles];

    // Call parent callback with updated files
    if (type === 'followers') {
      onFilesSelected(allFiles, followingFiles);
    } else {
      onFilesSelected(followersFiles, allFiles);
    }
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>, type: 'followers' | 'following') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'followers') {
      setDragOverFollowers(true);
    } else {
      setDragOverFollowing(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>, type: 'followers' | 'following') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'followers') {
      setDragOverFollowers(false);
    } else {
      setDragOverFollowing(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, type: 'followers' | 'following') => {
    e.preventDefault();
    e.stopPropagation();

    if (type === 'followers') {
      setDragOverFollowers(false);
    } else {
      setDragOverFollowing(false);
    }

    const files = e.dataTransfer.files;
    handleFileSelection(files, type);
  };

  // Handle file input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'followers' | 'following') => {
    handleFileSelection(e.target.files, type);
  };

  // Trigger file input click
  const triggerFileInput = (type: 'followers' | 'following') => {
    if (type === 'followers') {
      followersInputRef.current?.click();
    } else {
      followingInputRef.current?.click();
    }
  };

  // Check if can process
  const canProcess = followersFiles.length > 0 && followingFiles.length > 0 && !isProcessing;

  return (
    <div id="upload" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-shark-300 shadow-xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-shark-700 rounded-lg sm:rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-shark-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-shark-950">Unggah File Instagram</h2>
      </div>

      {/* Upload Areas */}
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 mb-4 sm:mb-6">
        {/* Followers Upload */}
        <div>
          <label htmlFor="followers-input" className="block text-sm font-medium text-shark-950 mb-2">
            File Followers
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center cursor-pointer transition-all duration-300 ${dragOverFollowers
              ? 'border-shark-600 bg-shark-100 scale-105 shadow-lg'
              : 'border-shark-300 hover:border-shark-500 hover:bg-shark-50'
              }`}
            onDragOver={(e) => handleDragOver(e, 'followers')}
            onDragLeave={(e) => handleDragLeave(e, 'followers')}
            onDrop={(e) => handleDrop(e, 'followers')}
            onClick={() => triggerFileInput('followers')}
          >
            <input
              ref={followersInputRef}
              id="followers-input"
              type="file"
              accept=".json,.html,.htm"
              multiple
              className="hidden"
              onChange={(e) => handleInputChange(e, 'followers')}
              aria-label="Pilih file followers"
            />

            {/* Upload Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-shark-200 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <p className="text-sm sm:text-base lg:text-lg font-medium text-shark-800 mb-1">
              Klik atau seret file followers ke sini
            </p>
            <p className="text-xs sm:text-sm text-shark-600">
              Format: JSON atau HTML
            </p>
          </div>

          {/* Display uploaded followers files */}
          {followersFiles.length > 0 && (
            <div className="mt-3 space-y-1">
              {followersFiles.map((file, index) => (
                <div key={index} className="text-sm text-shark-800 flex items-center gap-2">
                  <span className="text-shark-700">✓</span>
                  <span>{file.name}</span>
                  <span className="text-xs text-shark-600">(terbaca)</span>
                </div>
              ))}
            </div>
          )}

          {/* Display errors */}
          {errors.followers.length > 0 && (
            <div className="mt-3 space-y-1">
              {errors.followers.map((error, index) => (
                <p key={index} className="text-sm text-shark-800">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Following Upload */}
        <div>
          <label htmlFor="following-input" className="block text-sm font-medium text-shark-950 mb-2">
            File Following
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center cursor-pointer transition-all duration-300 ${dragOverFollowing
              ? 'border-shark-600 bg-shark-100 scale-105 shadow-lg'
              : 'border-shark-300 hover:border-shark-500 hover:bg-shark-50'
              }`}
            onDragOver={(e) => handleDragOver(e, 'following')}
            onDragLeave={(e) => handleDragLeave(e, 'following')}
            onDrop={(e) => handleDrop(e, 'following')}
            onClick={() => triggerFileInput('following')}
          >
            <input
              ref={followingInputRef}
              id="following-input"
              type="file"
              accept=".json,.html,.htm"
              multiple
              className="hidden"
              onChange={(e) => handleInputChange(e, 'following')}
              aria-label="Pilih file following"
            />

            {/* Upload Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-shark-200 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <p className="text-sm sm:text-base lg:text-lg font-medium text-shark-800 mb-1">
              Klik atau seret file following ke sini
            </p>
            <p className="text-xs sm:text-sm text-shark-600">
              Format: JSON atau HTML
            </p>
          </div>

          {/* Display uploaded following files */}
          {followingFiles.length > 0 && (
            <div className="mt-3 space-y-1">
              {followingFiles.map((file, index) => (
                <div key={index} className="text-sm text-shark-800 flex items-center gap-2">
                  <span className="text-shark-700">✓</span>
                  <span>{file.name}</span>
                  <span className="text-xs text-shark-600">(terbaca)</span>
                </div>
              ))}
            </div>
          )}

          {/* Display errors */}
          {errors.following.length > 0 && (
            <div className="mt-3 space-y-1">
              {errors.following.map((error, index) => (
                <p key={index} className="text-sm text-shark-800">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-shark-100 border-2 border-shark-300 rounded-xl sm:rounded-2xl shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-shark-300 border-t-shark-700 rounded-full animate-spin"></div>
              </div>
              <div className="text-left">
                <p className="text-sm sm:text-base font-semibold text-shark-900">
                  Sedang memproses file...
                </p>
                <p className="text-xs sm:text-sm text-shark-700 mt-1">
                  Hasil akan muncul di bawah setelah selesai
                </p>
              </div>
            </div>
            {/* Animated arrow pointing down */}
            <div className="flex flex-col items-center gap-1 animate-bounce mt-1 sm:mt-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs sm:text-sm text-shark-700 font-medium">Lihat hasil di bawah</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        <div className="w-full sm:w-auto">
          <GlowButton
            onClick={onProcess}
            disabled={!canProcess}
            ariaLabel="Proses file"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Proses
          </GlowButton>
        </div>

        <div className="w-full sm:w-auto">
          <SwapButton
            onClick={onSwap}
            disabled={followersFiles.length === 0 && followingFiles.length === 0}
            ariaLabel="Tukar posisi file"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Tukar
          </SwapButton>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <ResetButton
            onClick={onReset}
            disabled={followersFiles.length === 0 && followingFiles.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
