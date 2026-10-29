import React from 'react';
import Image from 'next/image';

/**
 * @file Mappool.tsx
 * @description Tournament map pool display component highlighting the active competitive map rotation.
 */
export default function MapPool() {
  return (
    // Outer full-width container styled with a centered repeating Valorant background graphic
    <div 
      className="w-full py-12 relative overflow-hidden bg-cover bg-center flex flex-col justify-center" 
      style={{ backgroundImage: `url('/images/tournamentpics/VALORANT_logo4_copy.jpg')` }}
    >
      {/* Centered responsive layout container matching global navbar and footer boundaries */}
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 py-12 flex flex-col">
        
        {/* Section Heading */}
        <h1 className="font-bebas text-brand-light text-button-lg tracking-wide mb-8">
          MAP POOL
        </h1>

        {/* High-resolution map graphic showcase container with elevation shadow */}
        <div className="w-full flex justify-center items-center overflow-hidden shadow-2xl">
          {/* Active 7-map pool infographic containing Abyss, Ascent, Haven, Lotus, Split, Summit, and Sunset */}
          <Image 
            src="/images/tournamentpics/MapPool-final.webp" 
            alt="Tournament Map Pool including Abyss, Ascent, Haven, Lotus, Split, Summit, and Sunset" 
            width={1920}
            height={1080}
            className="w-full h-auto max-h-[75vh] object-contain rounded-sm"
          />
        </div>

      </div>
    </div>
  );
}