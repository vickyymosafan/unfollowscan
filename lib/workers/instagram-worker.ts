/**
 * Web Worker untuk Instagram file processing
 * Offload heavy computation dari main thread untuk non-blocking UI
 */

import { parseInstagramFile } from '@/lib/parser/instagram-parser';
import { analyzeFollowers } from '@/lib/analysis/follower-analyzer';

export interface WorkerMessage {
  type: 'PROCESS_FILES';
  payload: {
    followersContents: string[];
    followingContents: string[];
  };
}

export interface WorkerResponse {
  type: 'PROCESSING_COMPLETE' | 'PROCESSING_ERROR';
  payload?: any;
  error?: string;
}

// Worker message handler
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, payload } = event.data;

  if (type === 'PROCESS_FILES') {
    try {
      const { followersContents, followingContents } = payload;

      // Step 1: Parse all files
      const followersParsed = followersContents.flatMap((content) =>
        parseInstagramFile(content, 'auto')
      );
      const followingParsed = followingContents.flatMap((content) =>
        parseInstagramFile(content, 'auto')
      );

      // Step 2: Extract usernames
      const followersUsernames = followersParsed.map((user) => user.username);
      const followingUsernames = followingParsed.map((user) => user.username);

      // Step 3: Analyze
      const analysisResults = analyzeFollowers(
        followersUsernames,
        followingUsernames
      );

      // Send results back to main thread
      const response: WorkerResponse = {
        type: 'PROCESSING_COMPLETE',
        payload: analysisResults,
      };
      self.postMessage(response);
    } catch (error) {
      // Send error back to main thread
      const response: WorkerResponse = {
        type: 'PROCESSING_ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      self.postMessage(response);
    }
  }
};
