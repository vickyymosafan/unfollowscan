/**
 * Set operations untuk analisis follower
 * Menggunakan JavaScript Set untuk O(n) performance
 */

/**
 * Hitung selisih set A - B
 * Returns elements yang ada di setA tapi tidak ada di setB
 * 
 * @param setA - Set pertama
 * @param setB - Set kedua
 * @returns Array sorted dari elemen yang ada di A tapi tidak di B
 */
export function setDifference(setA: Set<string>, setB: Set<string>): string[] {
  const result = new Set<string>();
  
  // Iterate through setA dan tambahkan jika tidak ada di setB
  for (const item of setA) {
    if (!setB.has(item)) {
      result.add(item);
    }
  }
  
  // Convert ke array dan sort alfabetis
  return Array.from(result).sort();
}

/**
 * Hitung irisan set A ∩ B
 * Returns elements yang ada di kedua set
 * 
 * @param setA - Set pertama
 * @param setB - Set kedua
 * @returns Array sorted dari elemen yang ada di kedua set
 */
export function setIntersection(setA: Set<string>, setB: Set<string>): string[] {
  const result = new Set<string>();
  
  // Iterate through set yang lebih kecil untuk efisiensi
  const smallerSet = setA.size <= setB.size ? setA : setB;
  const largerSet = setA.size <= setB.size ? setB : setA;
  
  for (const item of smallerSet) {
    if (largerSet.has(item)) {
      result.add(item);
    }
  }
  
  // Convert ke array dan sort alfabetis
  return Array.from(result).sort();
}

/**
 * Gabung multiple arrays dan deduplikasi
 * 
 * @param arrays - Array of string arrays untuk digabung
 * @returns Object dengan merged array (sorted) dan jumlah duplikasi yang dihapus
 */
export function mergeAndDeduplicate(arrays: string[][]): {
  merged: string[];
  duplicatesRemoved: number;
} {
  const uniqueSet = new Set<string>();
  let totalCount = 0;
  
  // Iterate through semua arrays
  for (const arr of arrays) {
    for (const item of arr) {
      if (item) { // Skip empty strings
        uniqueSet.add(item);
        totalCount++;
      }
    }
  }
  
  const uniqueCount = uniqueSet.size;
  const duplicatesRemoved = totalCount - uniqueCount;
  
  // Convert ke array dan sort alfabetis
  const merged = Array.from(uniqueSet).sort();
  
  return {
    merged,
    duplicatesRemoved
  };
}
