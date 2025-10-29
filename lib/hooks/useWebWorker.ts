/**
 * Custom hook untuk Web Worker management
 * 
 * Features:
 * - Automatic worker initialization
 * - Type-safe messaging
 * - Cleanup on unmount
 * - Error handling
 * 
 * @example
 * ```tsx
 * const { postMessage, isReady } = useWebWorker<WorkerMessage, WorkerResponse>(
 *   '/workers/instagram-worker.js',
 *   (response) => {
 *     console.log('Worker response:', response);
 *   }
 * );
 * ```
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseWebWorkerReturn<TMessage, TResponse> {
  postMessage: (message: TMessage) => void;
  isReady: boolean;
  error: string | null;
}

export function useWebWorker<TMessage, TResponse>(
  workerUrl: string,
  onMessage: (response: TResponse) => void
): UseWebWorkerReturn<TMessage, TResponse> {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Worker is supported
    if (typeof Worker === 'undefined') {
      setError('Web Workers not supported in this browser');
      return;
    }

    try {
      // Initialize worker
      const worker = new Worker(workerUrl, { type: 'module' });
      workerRef.current = worker;

      // Handle messages from worker
      worker.onmessage = (event: MessageEvent<TResponse>) => {
        onMessage(event.data);
      };

      // Handle worker errors
      worker.onerror = (event) => {
        console.error('Worker error:', event);
        setError(event.message || 'Worker error occurred');
      };

      setIsReady(true);

      // Cleanup on unmount
      return () => {
        worker.terminate();
        workerRef.current = null;
        setIsReady(false);
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize worker';
      setError(errorMessage);
      console.error('Failed to initialize worker:', err);
    }
  }, [workerUrl, onMessage]);

  /**
   * Post message to worker
   */
  const postMessage = useCallback((message: TMessage) => {
    if (!workerRef.current) {
      console.error('Worker not initialized');
      return;
    }

    if (!isReady) {
      console.error('Worker not ready');
      return;
    }

    workerRef.current.postMessage(message);
  }, [isReady]);

  return {
    postMessage,
    isReady,
    error,
  };
}
