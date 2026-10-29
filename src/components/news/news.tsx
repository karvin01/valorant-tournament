import React from 'react';
import Image from 'next/image';

export default function NewsUpdates() {
  const newsItems = [
    {
      id: 1,
      date: "October 12, 2026",
      title: "Roster Lock Deadline Extended",
      description: "Due to high demand and server scheduling adjustments, the final roster lock deadline has been extended by 48 hours. Ensure all team members have completed their Discord verification.",
      image: "/images/tournamentpics/MapPool-final.webp"
    },
    {
      id: 2,
      date: "October 05, 2026",
      title: "Server Configuration Update",
      description: "All tournament matches will run on the latest patch build. Custom lobby parameters have been updated to reflect standard competitive rulesets for overtime and tactical timeouts.",
      image: "/images/tournamentpics/VALORANT_logo4_copy.jpg"
    },
    {
      id: 3,
      date: "September 28, 2026",
      title: "Prize Pool Distribution Announced",
      description: "Details regarding the total prize pool breakdown and regional seedings have been officially published. Check the tournament rulebook for full tier allocations.",
      image: "/images/tournamentpics/MapPool-final.webp"
    }
  ];

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-16 xl:py-24">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col">
        
        <h1 className="font-bebas text-brand-light text-button-lg tracking-wide mb-12">
          NEWS & UPDATES
        </h1>

        <div className="flex flex-col gap-6">
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-light text-brand-dark rounded-none shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch transition-transform hover:translate-x-1"
            >
              <div className="md:w-[300px] lg:w-[360px] h-48 md:h-auto relative flex-shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-center flex-grow gap-3">
                <span className="font-inter text-xs text-brand-red uppercase tracking-widest font-semibold">
                  {item.date}
                </span>
                <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide font-medium text-brand-dark">
                  {item.title}
                </h2>
                <p className="font-inter text-base sm:text-lg font-light text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}