import React from 'react';
import Link from 'next/link';
import TeamCounterCard from '@/components/common/TeamCounterCard';

/**
 * @file TournamentHero.tsx
 * @description Tournament format breakdown and rulebook download hero module.
 */
export default function TournamentHero() {
  return (
    <div className="w-full py-12 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('images/tournamentpics/VALORANT_logo4_copy.jpg')` }}>
      {/* container matching navbar layout setup */}
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 py-12 flex flex-col justify-center">
        
        {/* Main Heading */}
        <h1 className="font-bebas text-brand-light text-button-lg tracking-wide mb-8">
          TOURNAMENT STRUCTURE AND RULES
        </h1>

        {/* Responsive 2-Column Split: Format & Counter on Left, Official Rulebook on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column Stack */}
          <div className="flex flex-col gap-8">
            {/* Live registered teams counter fetched directly from Appwrite database */}
            <div className="w-full shadow-lg">
              <TeamCounterCard />
            </div>

            {/* tournament structure container */}
            <div className="bg-brand-light text-brand-dark font-inter p-6 sm:p-8 shadow-lg flex flex-col justify-between gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  
                  {/* Single-elimination qualifier rounds (Best of 1) */}
                  <div className="flex flex-col items-center text-center">
                      <h3 className="font-bebas text-3xl tracking-wide font-medium mb-3">Qualifiers - BO1</h3>
                      <div className="flex gap-4 font-bebas font-medium text-xl tracking-wider text-brand-dark mb-2">
                          <span>R64</span>
                          <span>·</span>
                          <span>R32</span>
                          <span>·</span>
                          <span>R16</span>
                      </div>
                      <p className="font-inter text-sm italic text-brand-dark">single map knockout</p>
                  </div>

                  {/* Top-8 championship bracket series formats (Best of 3 & Best of 5) */}
                  <div className="flex flex-col justify-center items-center text-center">
                      <h3 className="font-bebas text-3xl tracking-wide font-medium mb-3">Playoffs (TOP8)</h3>
                      <div className="font-bebas font-medium text-xl tracking-wider flex flex-col gap-1 text-brand-dark items-center">
                          <span>Quarterfinals BO3</span>
                          <span>Semifinals BO3</span>
                          <span>Finals BO5</span>
                      </div>
                  </div>

              </div>

              {/* Direct call-to-action button linking into team registration flow */}
              <div className="flex justify-center items-center text-center">
                <Link href="/register" className="bg-brand-red hover:opacity-90 text-brand-light font-bebas text-button-sm tracking-wider px-6 sm:px-20 py-3 transition-all cursor-pointer uppercase">
                  REGISTER YOUR TEAM NOW
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column Box: Official PDF Rulebook and Competitive Integrity Policy */}
          <div className="bg-brand-light text-brand-dark font-inter p-6 sm:p-8 shadow-lg flex flex-col justify-between gap-8">
            <div>
              <h3 className="font-bebas text-4xl font-medium tracking-wide text-center mt-6 mb-6">OFFICIAL TOURNAMENT RULES</h3>

              {/* Rules document download trigger button */}
              <div className="mb-6 flex flex-col items-center">
                <button type="button" className="w-full sm:w-auto bg-brand-red hover:opacity-90 text-brand-light font-bebas text-button-sm tracking-wider px-8 py-3 sm:px-20 sm:py-10 transition-all cursor-pointer uppercase">
                  DOWNLOAD PDF
                </button>
              </div>

              {/* Anti-cheat and fair-play compliance disclaimer */}
              <p className="font-inter text-hero sm:text-base italic leading-relaxed text-brand-dark sm:px-15">
                NOTICE // ZERO TOLERANCE: All participants are bound by the official rulebook upon bracket check-in. Any breach-including exploitation, toxic behavior, unauthorized roster swaps, or third-party software-will result in immediate disqualification and forfeiture of all prizing.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}