"use client";

import { useControls } from "react-zoom-pan-pinch";

export default function CanvasControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-brand-red border border-white/10 p-2 backdrop-blur select-none">
      <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center text-brand-light hover:bg-white/10 font-bold text-xl transition">+</button>
      <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center text-brand-light hover:bg-white/10 font-bold text-xl transition">-</button>
      <button onClick={() => resetTransform(250)} className="px-3 h-9 flex items-center justify-center text-lg font-semibold uppercase tracking-wider text-brand-light font-bebas hover:bg-white/10 transition">Reset</button>
    </div>
  );
}