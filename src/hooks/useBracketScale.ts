import { useState, useEffect } from "react";

const BRACKET_WIDTH = 4400;
const BRACKET_HEIGHT = 2200;

export function useBracketScale() {
  const [minScale, setMinScale] = useState(0.45);

  useEffect(() => {
    const calculateScale = () => {
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - 100;
      const scaleX = availableWidth / BRACKET_WIDTH;
      const scaleY = availableHeight / BRACKET_HEIGHT;
      const fitScale = Math.min(scaleX, scaleY);

      setMinScale(Math.max(fitScale * 0.95, 0.02));
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return minScale;
}