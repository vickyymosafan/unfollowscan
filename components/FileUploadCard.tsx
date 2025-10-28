'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { FileUploadCardProps } from '@/lib/types';
import { validateFileType } from '@/lib/utils/file-reader';

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
    <div className="bg-[#F7F7F8] rounded-2xl p-6 border border-[#DADDE1]">
      <h2 className="text-xl font-semibold text-[#111315] mb-6">Unggah File Instagram</h2>

      {/* Upload Areas */}
      <div className="space-y-6 mb-6">
        {/* Followers Upload */}
        <div>
          <label htmlFor="followers-input" className="block text-sm font-medium text-[#111315] mb-2">
            File Followers
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragOverFollowers
                ? 'border-[#111315] bg-gray-100'
                : 'border-[#DADDE1] hover:border-[#111315]'
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
            <p className="text-gray-600">
              Klik atau seret file followers ke sini
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Format: JSON atau HTML
            </p>
          </div>

          {/* Display uploaded followers files */}
          {followersFiles.length > 0 && (
            <div className="mt-3 space-y-1">
              {followersFiles.map((file, index) => (
                <div key={index} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{file.name}</span>
                  <span className="text-xs text-gray-500">(terbaca)</span>
                </div>
              ))}
            </div>
          )}

          {/* Display errors */}
          {errors.followers.length > 0 && (
            <div className="mt-3 space-y-1">
              {errors.followers.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Following Upload */}
        <div>
          <label htmlFor="following-input" className="block text-sm font-medium text-[#111315] mb-2">
            File Following
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragOverFollowing
                ? 'border-[#111315] bg-gray-100'
                : 'border-[#DADDE1] hover:border-[#111315]'
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
            <p className="text-gray-600">
              Klik atau seret file following ke sini
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Format: JSON atau HTML
            </p>
          </div>

          {/* Display uploaded following files */}
          {followingFiles.length > 0 && (
            <div className="mt-3 space-y-1">
              {followingFiles.map((file, index) => (
                <div key={index} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{file.name}</span>
                  <span className="text-xs text-gray-500">(terbaca)</span>
                </div>
              ))}
            </div>
          )}

          {/* Display errors */}
          {errors.following.length > 0 && (
            <div className="mt-3 space-y-1">
              {errors.following.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            Memproses file...
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onProcess}
          disabled={!canProcess}
          className={`px-6 py-2 rounded-lg font-medium transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            canProcess
              ? 'bg-[#111315] text-[#F7F7F8] hover:opacity-90 focus:ring-[#111315]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Proses file"
        >
          Proses
        </button>

        <button
          onClick={onSwap}
          disabled={followersFiles.length === 0 && followingFiles.length === 0}
          className="px-6 py-2 rounded-lg font-medium border border-[#DADDE1] text-[#111315] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2"
          aria-label="Tukar posisi file"
        >
          Tukar file
        </button>

        <button
          onClick={onReset}
          disabled={followersFiles.length === 0 && followingFiles.length === 0}
          className="px-6 py-2 rounded-lg font-medium border border-[#DADDE1] text-[#111315] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2"
          aria-label="Reset semua file"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
