/**
 * Easing functions untuk smooth animations
 * Centralized untuk menghindari duplikasi
 */

/**
 * Cubic easing in-out function
 * Smooth acceleration and deceleration
 * 
 * @param t - Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Linear easing (no easing)
 * @param t - Progress value between 0 and 1
 * @returns Same value (no transformation)
 */
export const linear = (t: number): number => {
  return t;
};

/**
 * Quadratic easing in-out
 * @param t - Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};
