import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { validateFileType } from '@/lib/utils/file-reader';
import { UseFileUploadReturn, FileType, DragState, FileErrors } from '@/lib/types/hooks';

/**
 * Custom hook untuk mengelola file upload logic
 * 
 * Features:
 * - File validation
 * - Drag & drop support
 * - Multiple file support
 * - Error handling
 * - File swap functionality
 * 
 * @returns {UseFileUploadReturn} File upload state dan handlers
 * 
 * @example
 * ```tsx
 * const { followersFiles, handleFileSelection } = useFileUpload();
 * ```
 */
export function useFileUpload(): UseFileUploadReturn {
    const [followersFiles, setFollowersFiles] = useState<File[]>([]);
    const [followingFiles, setFollowingFiles] = useState<File[]>([]);
    const [dragState, setDragState] = useState<DragState>({
        followers: false,
        following: false,
    });
    const [errors, setErrors] = useState<FileErrors>({
        followers: [],
        following: [],
    });

    const followersInputRef = useRef<HTMLInputElement>(null);
    const followingInputRef = useRef<HTMLInputElement>(null);

    /**
     * Helper: Update drag state untuk specific file type
     */
    const updateDragState = (type: FileType, isOver: boolean) => {
        setDragState(prev => ({ ...prev, [type]: isOver }));
    };

    /**
     * Helper: Get files by type
     */
    const getFilesByType = (type: FileType): File[] => {
        return type === 'followers' ? followersFiles : followingFiles;
    };

    /**
     * Helper: Set files by type
     */
    const setFilesByType = (type: FileType, files: File[]) => {
        if (type === 'followers') {
            setFollowersFiles(files);
        } else {
            setFollowingFiles(files);
        }
    };

    /**
     * Handle file selection dan validation
     */
    const handleFileSelection = (files: FileList | null, type: FileType) => {
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
        const existingFiles = getFilesByType(type);
        const allFiles = [...existingFiles, ...validFiles];
        setFilesByType(type, allFiles);
    };

    /**
     * Handle drag over event
     */
    const handleDragOver = (e: DragEvent<HTMLDivElement>, type: FileType) => {
        e.preventDefault();
        e.stopPropagation();
        updateDragState(type, true);
    };

    /**
     * Handle drag leave event
     */
    const handleDragLeave = (e: DragEvent<HTMLDivElement>, type: FileType) => {
        e.preventDefault();
        e.stopPropagation();
        updateDragState(type, false);
    };

    /**
     * Handle drop event
     */
    const handleDrop = (e: DragEvent<HTMLDivElement>, type: FileType) => {
        e.preventDefault();
        e.stopPropagation();
        updateDragState(type, false);
        handleFileSelection(e.dataTransfer.files, type);
    };

    /**
     * Handle input change event
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: FileType) => {
        handleFileSelection(e.target.files, type);
    };

    /**
     * Trigger file input click programmatically
     */
    const triggerFileInput = (type: FileType) => {
        const ref = type === 'followers' ? followersInputRef : followingInputRef;
        ref.current?.click();
    };

    /**
     * Swap followers dan following files
     */
    const swapFiles = () => {
        const temp = followersFiles;
        setFollowersFiles(followingFiles);
        setFollowingFiles(temp);
    };

    /**
     * Reset semua files dan errors
     */
    const resetFiles = () => {
        setFollowersFiles([]);
        setFollowingFiles([]);
        setDragState({ followers: false, following: false });
        setErrors({ followers: [], following: [] });
    };

    return {
        followersFiles,
        followingFiles,
        errors,
        dragOverFollowers: dragState.followers,
        dragOverFollowing: dragState.following,
        followersInputRef,
        followingInputRef,
        handleFileSelection,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleInputChange,
        triggerFileInput,
        swapFiles,
        resetFiles,
    };
}
