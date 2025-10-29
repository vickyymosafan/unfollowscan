/**
 * Animation constants untuk TextPressure component
 * Centralized constants untuk consistency dan easy tuning
 */

/**
 * Mouse easing factor untuk smooth animation
 * Nilai lebih besar = animasi lebih lambat/smooth
 */
export const MOUSE_EASING_FACTOR = 15;

/**
 * Font variation settings ranges
 */
export const FONT_VARIATION = {
  /**
   * Font width range (wdth)
   * Min: 5, Max: 200
   */
  WIDTH: {
    MIN: 5,
    MAX: 200,
  },
  
  /**
   * Font weight range (wght)
   * Min: 100 (Thin), Max: 900 (Black)
   */
  WEIGHT: {
    MIN: 100,
    MAX: 900,
  },
  
  /**
   * Italic range (ital)
   * Min: 0 (Normal), Max: 1 (Full italic)
   */
  ITALIC: {
    MIN: 0,
    MAX: 1,
  },
  
  /**
   * Alpha/Opacity range
   * Min: 0 (Transparent), Max: 1 (Opaque)
   */
  ALPHA: {
    MIN: 0,
    MAX: 1,
  },
} as const;

/**
 * Default font variation values ketika tidak ada mouse interaction
 */
export const DEFAULT_FONT_VARIATION = {
  WIDTH: 100,
  WEIGHT: 400,
  ITALIC: 0,
  ALPHA: 1,
} as const;
