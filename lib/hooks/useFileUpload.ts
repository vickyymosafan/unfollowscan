import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { validateFileType } from '@/lib/utils/file-reader';

interface UseFileUploadReturn {
    followersFiles: File[];
    followingFiles: File[];
    errors: { followers: string[]; following: string[] };
    dragOverFollowers: boolean;
    dragOverFollowing: boolean;
    followersInputRef: React.RefObject<HTMLInputElement | null>;
    followingInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileSelection: (files: FileList | null, type: 'followers' | 'following') => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>, type: 'followers' | 'following') => void;
    handleDragLeave: (e: DragEvent<HTMLDivElement>, type: 'followers' | 'following') => void;
    handleDrop: (e: DragEvent<HTMLDivElement>, type: 'followers' | 'following') => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, type: 'followers' | 'following') => void;
    triggerFileInput: (type: 'followers' | 'following') => void;
    swapFiles: () => void;
    resetFiles: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
    const [followersFiles, setFollowersFiles] = useState<File[]>([]);
    const [followingFiles, setFollowingFiles] = useState<File[]>([]);
    const [dragOverFollowers, setDragOverFollowers] = useState(false);
    const [dragOverFollowing, setDragOverFollowing] = useState(false);
    const [errors, setErrors] = useState<{ followers: string[]; following: string[] }>({
        followers: [],
        following: [],
    });

    const followersInputRef = useRef<HTMLInputElement>(null);
    const followingInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelection = (files: FileList | null, type: 'followers' | 'following') => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        const validationErrors: string[] = [];
        const validFiles: File[] = [];

        fileArray.forEach((file) => {
            const validation = validateFileType(file);
            if (validation.isValid) {
                validFiles.push(file);
            } else {
                validationErrors.push(`${file.name}: ${validation.error}`);
            }
        });

        setErrors((prev) => ({
            ...prev,
            [type]: validationErrors,
        }));

        const existingFiles = type === 'followers' ? followersFiles : followingFiles;
        const allFiles = [...existingFiles, ...validFiles];

        if (type === 'followers') {
            setFollowersFiles(allFiles);
        } else {
            setFollowingFiles(allFiles);
        }
    };

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'followers' | 'following') => {
        handleFileSelection(e.target.files, type);
    };

    const triggerFileInput = (type: 'followers' | 'following') => {
        if (type === 'followers') {
            followersInputRef.current?.click();
        } else {
            followingInputRef.current?.click();
        }
    };

    const swapFiles = () => {
        const temp = followersFiles;
        setFollowersFiles(followingFiles);
        setFollowingFiles(temp);
    };

    const resetFiles = () => {
        setFollowersFiles([]);
        setFollowingFiles([]);
        setErrors({ followers: [], following: [] });
    };

    return {
        followersFiles,
        followingFiles,
        errors,
        dragOverFollowers,
        dragOverFollowing,
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
