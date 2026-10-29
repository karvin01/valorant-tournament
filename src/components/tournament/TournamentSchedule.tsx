import React from 'react';
import { SCHEDULE_STAGES } from '@/data/tournamentData';

export default function TimeSchedule() {
  const [stage1, stage2, stage3, stage4, stage5] = SCHEDULE_STAGES;

  return (
    <div className="w-full py-12 relative overflow-hidden bg-repeat bg-top" style={{ backgroundImage: `url('images/tournamentpics/valo-bg-light.webp')` }}>
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 py-12 flex flex-col">
        
        <h1 className="font-bebas text-brand-dark text-button-lg tracking-wide mb-12">
          TIME SCHEDULE
        </h1>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 my-8 min-h-[450px]">
          
          {/* Left Stack */}
          <div className="flex flex-col gap-16 w-full lg:w-auto">
            {[stage1, stage2].map((s, idx) => (
              <div key={idx} className="bg-brand-cards text-brand-light p-8 rounded-none shadow-xl w-full sm:w-[360px]">
                <h2 className="font-bebas text-2xl font-medium tracking-wide">{s.stage}</h2>
                <p className="font-bebas text-2xl font-light tracking-wide mb-4">{s.desc}</p>
                <p className="font-inter text-sm text-gray-300 mt-2">{s.date}</p>
              </div>
            ))}
          </div>

          {/* Middle Card */}
          <div className="w-full lg:w-auto flex justify-center">
            <div className="bg-brand-cards text-brand-light p-8 rounded-none shadow-xl w-full sm:w-[380px]">
              <h2 className="font-bebas text-2xl font-medium tracking-wide">{stage3.stage}</h2>
              <p className="font-bebas text-2xl font-light tracking-wide mb-4">{stage3.desc}</p>
              <p className="font-inter text-sm text-gray-300 mt-2">{stage3.date}</p>
            </div>
          </div>

          {/* Right Stack */}
          <div className="flex flex-col gap-8 w-full lg:w-auto">
            <div className="bg-brand-cards text-brand-light p-8 rounded-none shadow-xl w-full sm:w-[380px]">
              <div className="mb-6">
                <h2 className="font-bebas text-2xl font-medium tracking-wide">{stage4.stage}</h2>
                <p className="font-bebas text-2xl font-light tracking-wide">{stage4.desc}</p>
                <p className="font-inter text-sm text-gray-300 mt-2">{stage4.date}</p>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h2 className="font-bebas text-2xl font-medium tracking-wide">{stage5.stage}</h2>
                <p className="font-bebas text-2xl font-light tracking-wide">{stage5.desc}</p>
                <p className="font-inter text-sm text-gray-300 mt-2">{stage5.date}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Rules & Information Text Section */}
        <div className="mt-16 text-brand-dark flex flex-col gap-8 max-w-4xl">
          <div>
            <h3 className="font-bebas text-hero font-bold tracking-wide">Overtime Format (Win by 2):</h3>
            <p className="font-inter text-base mt-1">In the event of a 12–12 round tie in regulation, the match automatically enters custom tournament overtime. To secure the map, a team must gain a consecutive two-round lead (e.g., 14–12, 15–13).</p>
          </div>
          <div>
            <h3 className="font-bebas text-hero font-bold tracking-wide">Side Swapping & Economy:</h3>
            <p className="font-inter text-base mt-1">Teams play sets of two rounds, automatically alternating between Attack and Defense every round. All players start each overtime round with fixed economic parameters: 5,000 Credits and fully replenished standard ability charges (ultimate points are retained based on earned progress).</p>
          </div>
          <div>
            <h3 className="font-bebas text-hero font-bold tracking-wide">Tactical Timeouts in Overtime:</h3>
            <p className="font-inter text-base mt-1">Each squad receives one (2) tactical timeout (60 seconds) per set of overtime rounds. Unused timeouts from regulation play do not carry over. Timeouts must be called via the in-game menu during the buy phase.</p>
          </div>
          <div>
            <h3 className="font-bebas text-hero font-bold tracking-wide">Tiebreak Hierarchy (Group / Seeding Stages):</h3>
            <p className="font-inter text-base mt-1 mb-2">If two or more teams end a preliminary phase with an identical win-loss record, tiebreakers are resolved in the following priority:</p>
            <ol className="font-inter text-base list-decimal list-inside space-y-1 pl-2">
              <li>Head-to-Head Result: Match outcome between the tied squads.</li>
              <li>Map Differential: Total maps won minus total maps lost across all stage matches.</li>
              <li>Round Differential: Total rounds won minus total rounds lost across all completed maps.</li>
              <li>Sudden-Death Decider: A Best-of-1 map decider if differential remains tied.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}