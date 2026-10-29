"use client";

import { useControls } from "react-zoom-pan-pinch";

/**
 * @file CanvasControls.tsx
 * @description Floating viewport controller for zooming and panning the bracket canvas.
 */
export default function CanvasControls() {
  // Hook from react-zoom-pan-pinch exposing transformation dispatcher methods
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-brand-red border border-white/10 p-2 backdrop-blur select-none">
      {/* Zoom In: incrementally scales viewport canvas forward */}
      <button 
        onClick={() => zoomIn()} 
        type="button"
        className="w-10 h-10 flex items-center justify-center text-brand-light hover:bg-white/10 font-bold text-xl transition cursor-pointer"
      >
        +
      </button>

      {/* Zoom Out: incrementally scales viewport canvas backward */}
      <button 
        onClick={() => zoomOut()} 
        type="button"
        className="w-10 h-10 flex items-center justify-center text-brand-light hover:bg-white/10 font-bold text-xl transition cursor-pointer"
      >
        -
      </button>

      {/* Reset Transform: animates scale and canvas position back to default centered fit over 250ms */}
      <button 
        onClick={() => resetTransform(250)} 
        type="button"
        className="px-3 h-9 flex items-center justify-center text-lg font-semibold uppercase tracking-wider text-brand-light font-bebas hover:bg-white/10 transition cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
}