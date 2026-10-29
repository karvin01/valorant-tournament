import { useState, useEffect } from "react";

// Natural dimensions in pixels of the complete 64-team canvas grid
const BRACKET_WIDTH = 4400;
const BRACKET_HEIGHT = 2200;

/**
 * @file useBracketScale.ts
 * @description Viewport adaptation hook for the infinite zoom/pan bracket canvas.
 * Computes an initial and minimum scale factor so the entire 4400x2200px tournament bracket
 * fits within the visible browser window minus the header navigation offset.
 */
export function useBracketScale() {
  // Initial fallback zoom ratio prior to client dimension resolution
  const [minScale, setMinScale] = useState(0.45);

  useEffect(() => {
    // Calculates proportional scale factor based on active browser dimensions
    const calculateScale = () => {
      const availableWidth = window.innerWidth;
      // Subtract 100px navbar height allowance from available vertical viewport
      const availableHeight = window.innerHeight - 100;

      // Determine horizontal and vertical scale ratios
      const scaleX = availableWidth / BRACKET_WIDTH;
      const scaleY = availableHeight / BRACKET_HEIGHT;

      // Select smaller axis ratio to ensure the complete canvas is visible without initial clipping
      const fitScale = Math.min(scaleX, scaleY);

      // Apply a 5% margin buffer (* 0.95) and enforce a minimum floor of 0.02
      setMinScale(Math.max(fitScale * 0.95, 0.02));
    };

    // Calculate immediately on mount
    calculateScale();

    // Recompute scale whenever the user resizes the browser window
    window.addEventListener("resize", calculateScale);
    // Cleanup event listener on unmount to prevent leaks
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return minScale;
}