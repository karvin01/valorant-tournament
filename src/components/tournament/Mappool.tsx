import React from 'react';
import Image from 'next/image';

export default function MapPool() {
  return (
    <div 
      className="w-full py-12 relative overflow-hidden bg-cover bg-center flex flex-col justify-center" 
      style={{ backgroundImage: `url('/images/tournamentpics/VALORANT_logo4_copy.jpg')` }}
    >
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 py-12 flex flex-col">
        
        <h1 className="font-bebas text-brand-light text-button-lg tracking-wide mb-8">
          MAP POOL
        </h1>

        <div className="w-full flex justify-center items-center overflow-hidden shadow-2xl">
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