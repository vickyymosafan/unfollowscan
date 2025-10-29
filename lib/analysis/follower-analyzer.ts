import { AnalysisResults } from '@/types';
import { setDifference, setIntersection, mergeAndDeduplicate } from '@/lib/utils/set-operations';

/**
 * Analisis followers dan following untuk menghitung:
 * - Tidak follow balik (following - followers)
 * - Mutual (followers ∩ following)
 * - Fans (followers - following)
 * 
 * @param followersData - Array of usernames yang follow user
 * @param followingData - Array of usernames yang di-follow oleh user
 * @param currentUsername - Optional: username user sendiri untuk di-exclude dari hasil
 * @returns AnalysisResults dengan semua data dan statistik
 */
export function analyzeFollowers(
  followersData: string[],
  followingData: string[],
  currentUsername?: string
): AnalysisResults {
  // Step 1: Deduplikasi input arrays
  const followersDedup = mergeAndDeduplicate([followersData]);
  const followingDedup = mergeAndDeduplicate([followingData]);
  
  const totalDuplicatesRemoved = 
    followersDedup.duplicatesRemoved + followingDedup.duplicatesRemoved;
  
  // Step 2: Create Sets dari deduplicated arrays
  const followersSet = new Set(followersDedup.merged);
  const followingSet = new Set(followingDedup.merged);
  
  // Step 3: Remove current username jika ada
  if (currentUsername) {
    const normalizedCurrentUsername = currentUsername.toLowerCase().trim();
    followersSet.delete(normalizedCurrentUsername);
    followingSet.delete(normalizedCurrentUsername);
  }
  
  // Step 4: Calculate tidak follow balik (following - followers)
  // Orang yang kamu follow tapi tidak follow kamu balik
  let tidakFollowBalik = setDifference(followingSet, followersSet);
  
  // Step 5: Calculate mutual (followers ∩ following)
  // Orang yang saling follow
  let mutual = setIntersection(followersSet, followingSet);
  
  // Step 6: Calculate fans (followers - following)
  // Orang yang follow kamu tapi tidak kamu follow balik
  let fans = setDifference(followersSet, followingSet);
  
  // Step 7: Remove current username dari hasil jika masih ada
  if (currentUsername) {
    const normalizedCurrentUsername = currentUsername.toLowerCase().trim();
    tidakFollowBalik = tidakFollowBalik.filter(u => u !== normalizedCurrentUsername);
    mutual = mutual.filter(u => u !== normalizedCurrentUsername);
    fans = fans.filter(u => u !== normalizedCurrentUsername);
  }
  
  // Step 8: Return AnalysisResults
  return {
    followers: followersSet,
    following: followingSet,
    tidakFollowBalik,
    mutual,
    fans,
    stats: {
      totalFollowers: followersSet.size,
      totalFollowing: followingSet.size,
      duplicatesRemoved: totalDuplicatesRemoved
    }
  };
}
