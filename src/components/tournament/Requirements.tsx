import React from 'react';

export default function TournamentRequirements() {
  return (
    <div 
      className="w-full relative overflow-hidden bg-repeat bg-top py-12 xl:py-24" 
      style={{ backgroundImage: `url('images/tournamentpics/valo-bg-light.webp')` }}
    >
      {/* container matching your navbar layout setup */}
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col">
        
        {/* Main Heading */}
        <h1 className="font-bebas text-brand-dark text-button-lg tracking-wide mb-12">
          ELIGIBILITY AND ROSTER REQUIREMENTS
        </h1>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Rank Requirements */}
          <div className="bg-brand-dark text-brand-light p-8 sm:p-10 rounded-none shadow-xl flex flex-col justify-between gap-6">
            <h2 className="font-bebas text-4xl tracking-wide font-medium">RANK REQUIREMENTS</h2>
            <div className="flex flex-col gap-4 font-inter text-2xl font-light">
              <p>Minimal rank: Ascendant 1</p>
              <p>Minimum of 50 games on the account</p>
              <p>No recent bans</p>
            </div>
          </div>

          {/* Card 2: Age Requirements */}
          <div className="bg-brand-dark text-brand-light p-8 sm:p-10 rounded-none shadow-xl flex flex-col justify-between gap-6">
            <h2 className="font-bebas text-4xl tracking-wide font-medium">AGE REQUIREMENTS</h2>
            <div className="flex flex-col gap-4 font-inter text-2xl font-light">
              <p>Minimal age of 16</p>
              <p>Players under 18 must have parental consent</p>
            </div>
          </div>

          {/* Card 3: Region */}
          <div className="bg-brand-dark text-brand-light p-8 sm:p-10 rounded-none shadow-xl flex flex-col justify-between gap-6">
            <h2 className="font-bebas text-4xl tracking-wide font-medium">REGION</h2>
            <div className="flex flex-col gap-4 font-inter text-2xl font-light">
              <p>Match server: EU Central 1 (Frankfurt)</p>
              <p>All team members must have under 100ping on tournament server</p>
            </div>
          </div>

          {/* Card 4: Discord Check-In */}
          <div className="bg-brand-dark text-brand-light p-8 sm:p-10 rounded-none shadow-xl flex flex-col justify-between gap-6">
            <h2 className="font-bebas text-4xl tracking-wide font-medium flex items-center gap-3">
              DISCORD CHECK-IN 
              <svg className="w-7 h-7 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </h2>
            <div className="flex flex-col gap-4 font-inter text-2xl font-light">
              <p>Every team member mandatory on Discord</p>
              <p>Complete VCS_Bot account verification before roster lock.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}