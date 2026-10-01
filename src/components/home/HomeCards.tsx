import CountdownCard from "@/components/home/CountdownCard";

export default function HomeCards() {
  return (
    <section className="bg-brand-red py-10 sm:py-14 w-full">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 items-stretch">
          
          {/* Card 1: Prize Pool */}
          <div className="flex flex-col w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden select-none shadow-md">
            <div className="bg-brand-dark py-2.5 sm:py-3 text-center">
              <span className="font-bebas text-xl sm:text-2xl lg:text-button-lg tracking-wider text-brand-light uppercase">
                PRIZE POOL
              </span>
            </div>
            <div className="bg-brand-bg flex-1 py-4 sm:py-6 px-4 flex flex-col items-center justify-center">
              <span className="font-bebas text-3xl sm:text-4xl lg:text-button-lg text-brand-dark tracking-tight">
                25,000€
              </span>
            </div>
          </div>

          {/* Card 2: Teams */}
          <div className="flex flex-col w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden select-none shadow-md">
            <div className="bg-brand-dark py-2.5 sm:py-3 text-center">
              <span className="font-bebas text-xl sm:text-2xl lg:text-button-lg tracking-wider text-brand-light uppercase">
                TEAMS
              </span>
            </div>
            <div className="bg-brand-bg flex-1 py-4 sm:py-6 px-4 flex flex-col items-center justify-center">
              <span className="font-bebas text-3xl sm:text-4xl lg:text-button-lg text-brand-dark tracking-tight">
                16 SLOTS
              </span>
            </div>
          </div>

          {/* Card 3: Entry Fee */}
          <div className="flex flex-col w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden select-none shadow-md">
            <div className="bg-brand-dark py-2.5 sm:py-3 text-center">
              <span className="font-bebas text-xl sm:text-2xl lg:text-button-lg tracking-wider text-brand-light uppercase">
                ENTRY FEE
              </span>
            </div>
            <div className="bg-brand-bg flex-1 py-4 sm:py-6 px-4 flex flex-col items-center justify-center">
              <span className="font-bebas text-3xl sm:text-4xl lg:text-button-lg text-brand-dark tracking-tight">
                FREE ENTRY
              </span>
            </div>
          </div>

          {/* Card 4: Countdown */}
          <CountdownCard targetDate="2026-10-30T23:59:59" />

        </div>
      </div>
    </section>
  );
}