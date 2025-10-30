'use client';

import { useFileUpload } from '@/hooks/useFileUpload';
import { UploadIcon, LightningIcon, SwapIcon, ArrowDownIcon } from '@/components/icons';
import GlowButton from './GlowButton';
import SwapButton from './SwapButton';
import ResetButton from './ResetButton';
import UploadArea from './UploadArea';

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
        <UploadArea
          label="File Followers"
          inputId="followers-input"
          inputRef={followersInputRef}
          files={followersFiles}
          errors={errors.followers}
          isDragOver={dragOverFollowers}
          onDragOver={(e) => handleDragOver(e, 'followers')}
          onDragLeave={(e) => handleDragLeave(e, 'followers')}
          onDrop={(e) => handleDrop(e, 'followers')}
          onInputChange={(e) => handleInputChange(e, 'followers')}
          onAreaClick={() => triggerFileInput('followers')}
        />

        {/* Following Upload */}
        <UploadArea
          label="File Following"
          inputId="following-input"
          inputRef={followingInputRef}
          files={followingFiles}
          errors={errors.following}
          isDragOver={dragOverFollowing}
          onDragOver={(e) => handleDragOver(e, 'following')}
          onDragLeave={(e) => handleDragLeave(e, 'following')}
          onDrop={(e) => handleDrop(e, 'following')}
          onInputChange={(e) => handleInputChange(e, 'following')}
          onAreaClick={() => triggerFileInput('following')}
        />
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
