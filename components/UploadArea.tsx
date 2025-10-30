'use client';

import { ChangeEvent, DragEvent, RefObject } from 'react';
import { UploadIcon } from '@/components/icons';

interface UploadAreaProps {
    label: string;
    inputId: string;
    inputRef: RefObject<HTMLInputElement | null>;
    files: File[];
    errors: string[];
    isDragOver: boolean;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onAreaClick: () => void;
}

/**
 * Reusable upload area component
 * Menghilangkan duplikasi code di FileUploadCard
 */
export default function UploadArea({
    label,
    inputId,
    inputRef,
    files,
    errors,
    isDragOver,
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    onAreaClick,
}: UploadAreaProps) {
    return (
        <div>
            <label htmlFor={inputId} className="block text-sm font-medium text-shark-950 mb-2">
                {label}
            </label>
            <div
                className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center cursor-pointer transition-all duration-300 ${isDragOver
                    ? 'border-shark-600 bg-shark-100 scale-105 shadow-lg'
                    : 'border-shark-300 hover:border-shark-500 hover:bg-shark-50'
                    }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={onAreaClick}
            >
                <input
                    ref={inputRef}
                    id={inputId}
                    type="file"
                    accept=".json,.html,.htm"
                    multiple
                    className="hidden"
                    onChange={onInputChange}
                    aria-label={`Pilih ${label.toLowerCase()}`}
                />

                {/* Upload Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-shark-200 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                    <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-shark-700" />
                </div>

                <p className="text-sm sm:text-base lg:text-lg font-medium text-shark-800 mb-1">
                    Klik atau seret {label.toLowerCase()} ke sini
                </p>
                <p className="text-xs sm:text-sm text-shark-600">Format: JSON atau HTML</p>
            </div>

            {/* Display uploaded files */}
            {files.length > 0 && (
                <div className="mt-3 space-y-1">
                    {files.map((file, index) => (
                        <div key={index} className="text-sm text-shark-800 flex items-center gap-2">
                            <span className="text-shark-700">✓</span>
                            <span>{file.name}</span>
                            <span className="text-xs text-shark-600">(terbaca)</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Display errors */}
            {errors.length > 0 && (
                <div className="mt-3 space-y-1">
                    {errors.map((error, index) => (
                        <p key={index} className="text-sm text-shark-800">
                            {error}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
