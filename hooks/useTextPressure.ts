import { useEffect, useRef, useState } from 'react';
import { UseTextPressureProps, UseTextPressureReturn } from '@/types/hooks';
import { 
  MOUSE_EASING_FACTOR, 
  FONT_VARIATION, 
  DEFAULT_FONT_VARIATION 
} from '@/lib/constants/animation';

/**
 * Custom hook untuk mengelola text pressure animation logic
 * 
 * Features:
 * - Mouse-responsive variable font animation
 * - Touch support untuk mobile
 * - Auto font sizing berdasarkan container
 * - Smooth easing animation
 * 
 * @param {UseTextPressureProps} props - Animation configuration
 * @returns {UseTextPressureReturn} Refs dan animation state
 * 
 * @example
 * ```tsx
 * const { containerRef, titleRef, spansRef, fontSize } = useTextPressure({
 *   chars: text.split(''),
 *   width: true,
 *   weight: true
 * });
 * ```
 */
export function useTextPressure({
  chars,
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  scale = false,
  minFontSize = 24,
}: UseTextPressureProps): UseTextPressureReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  /**
   * Calculate Euclidean distance between two points
   * @param a - First point
   * @param b - Second point
   * @returns Distance between points
   */
  const calculateDistance = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Font sizing
  useEffect(() => {
    const setSize = () => {
      if (!containerRef.current || !titleRef.current) return;

      const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
      let newFontSize = containerW / (chars.length / 2);
      newFontSize = Math.max(newFontSize, minFontSize);

      setFontSize(newFontSize);
      setScaleY(1);
      setLineHeight(1);

      requestAnimationFrame(() => {
        if (!titleRef.current) return;
        const textRect = titleRef.current.getBoundingClientRect();
        if (scale && textRect.height > 0) {
          const yRatio = containerH / textRect.height;
          setScaleY(yRatio);
          setLineHeight(yRatio);
        }
      });
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [scale, chars.length, minFontSize]);

  // Animation loop
  useEffect(() => {
    let rafId: number;

    /**
     * Calculate font variation attribute based on distance
     * Closer to mouse = higher value, further = lower value
     * 
     * @param distance - Distance from mouse to character
     * @param minVal - Minimum attribute value
     * @param maxVal - Maximum attribute value
     * @returns Calculated attribute value
     */
    const calculateAttribute = (distance: number, minVal: number, maxVal: number, maxDistance: number): number => {
      const normalizedDistance = Math.abs((maxVal * distance) / maxDistance);
      const value = maxVal - normalizedDistance;
      return Math.max(minVal, value + minVal);
    };

    const animate = () => {
      // Smooth mouse tracking dengan easing
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / MOUSE_EASING_FACTOR;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / MOUSE_EASING_FACTOR;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDistance = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          // Get character center position
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          // Calculate distance from mouse to character
          const distance = calculateDistance(mouseRef.current, charCenter);

          // Calculate font variation values
          const wdth = width 
            ? Math.floor(calculateAttribute(distance, FONT_VARIATION.WIDTH.MIN, FONT_VARIATION.WIDTH.MAX, maxDistance))
            : DEFAULT_FONT_VARIATION.WIDTH;
            
          const wght = weight 
            ? Math.floor(calculateAttribute(distance, FONT_VARIATION.WEIGHT.MIN, FONT_VARIATION.WEIGHT.MAX, maxDistance))
            : DEFAULT_FONT_VARIATION.WEIGHT;
            
          const italVal = italic 
            ? calculateAttribute(distance, FONT_VARIATION.ITALIC.MIN, FONT_VARIATION.ITALIC.MAX, maxDistance).toFixed(2)
            : DEFAULT_FONT_VARIATION.ITALIC.toString();
            
          const alphaVal = alpha 
            ? calculateAttribute(distance, FONT_VARIATION.ALPHA.MIN, FONT_VARIATION.ALPHA.MAX, maxDistance).toFixed(2)
            : DEFAULT_FONT_VARIATION.ALPHA.toString();

          // Apply styles
          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length]);

  return {
    containerRef,
    titleRef,
    spansRef,
    fontSize,
    scaleY,
    lineHeight,
  };
}
