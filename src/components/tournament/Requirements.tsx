import React from 'react';
import { REQUIREMENT_CARDS } from '@/data/tournamentData';

export default function TournamentRequirements() {
  return (
    <div className="w-full relative overflow-hidden bg-repeat bg-top py-12 xl:py-24" style={{ backgroundImage: `url('images/tournamentpics/valo-bg-light.webp')` }}>
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col">
        <h1 className="font-bebas text-brand-dark text-button-lg tracking-wide mb-12">
          ELIGIBILITY AND ROSTER REQUIREMENTS
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {REQUIREMENT_CARDS.map((card, idx) => (
            <div key={idx} className="bg-brand-dark text-brand-light p-8 sm:p-10 rounded-none shadow-xl flex flex-col justify-between gap-6">
              <h2 className="font-bebas text-4xl tracking-wide font-medium flex items-center gap-3">
                {card.title}
                {card.hasDiscordIcon && (
                  <svg className="w-7 h-7 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </h2>
              <div className="flex flex-col gap-4 font-inter text-2xl font-light">
                {card.items.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}