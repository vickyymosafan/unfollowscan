'use client';

import { useFileUpload } from '@/lib/hooks/useFileUpload';
import { UploadIcon, LightningIcon, SwapIcon, ArrowDownIcon } from '@/lib/icons';
import GlowButton from './GlowButton';
import SwapButton from './SwapButton';
import ResetButton from './ResetButton';

interface FileUploadCardProps {
  onProcess: (followersFiles: File[], followingFiles: File[]) => void;
  onReset: () => void;
  isProcessing: boolean;
}

export default function FileUploadCard({
  onProcess,
  onReset,
  isProcessing,
}: FileUploadCardProps) {
  const {
    followersFiles,
    followingFiles,
    errors,
    dragOverFollowers,
    dragOverFollowing,
    followersInputRef,
    followingInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    triggerFileInput,
    swapFiles,
    resetFiles,
  } = useFileUpload();

  const handleProcessClick = () => {
    onProcess(followersFiles, followingFiles);
  };

  const handleResetClick = () => {
    resetFiles();
    onReset();
  };

  const canProcess = followersFiles.length > 0 && followingFiles.length > 0 && !isProcessing;

  return (
    <div id="upload" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-shark-300 shadow-xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-shark-700 rounded-lg sm:rounded-xl flex items-center justify-center">
          <UploadIcon className="w-5 h-5 sm:w-6 sm:h-6 text-shark-50" />
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
              <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-shark-700" />
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
              <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-shark-700" />
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
              <ArrowDownIcon className="w-5 h-5 sm:w-6 sm:h-6 text-shark-700" />
              <span className="text-xs sm:text-sm text-shark-700 font-medium">Lihat hasil di bawah</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        <div className="w-full sm:w-auto">
          <GlowButton
            onClick={handleProcessClick}
            disabled={!canProcess}
            ariaLabel="Proses file"
          >
            <LightningIcon />
            Proses
          </GlowButton>
        </div>

        <div className="w-full sm:w-auto">
          <SwapButton
            onClick={swapFiles}
            disabled={followersFiles.length === 0 && followingFiles.length === 0}
            ariaLabel="Tukar posisi file"
          >
            <SwapIcon />
            Tukar
          </SwapButton>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <ResetButton
            onClick={handleResetClick}
            disabled={followersFiles.length === 0 && followingFiles.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
