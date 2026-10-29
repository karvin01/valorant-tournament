"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Caught by Error Boundary:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-6 text-center bg-brand-dark">
      <h2 className="font-bebas text-5xl text-brand-red tracking-wide mb-4">SYSTEM ERROR</h2>
      <p className="font-inter text-brand-light/70 mb-8 max-w-md">Something went wrong while loading this data. Please try again.</p>
      <button 
        onClick={() => reset()} 
        className="bg-brand-red text-brand-light font-bebas text-lg tracking-widest px-10 py-3 uppercase transition-all hover:bg-[#e03846]"
      >
        RETRY CONNECTION
      </button>
    </div>
  );
}