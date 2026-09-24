import CountdownCard from "@/components/home/CountdownCard"

export default function HomeCards() {
  return (
    <div className="bg-brand-red h-[300px] flex items-center justify-center">
        <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-10 lg:px-10 flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between gap-6 2xl:gap-8">
            <div className="flex flex-col w-[300px] h-[220px] overflow-hidden select-none">
                {/* Top dark bar prize pool */}
                <div className="bg-brand-dark py-3 text-center">
                    <span className="font-bebas text-button-lg tracking-wider text-brand-light uppercase">
                    PRIZE POOL
                    </span>
                </div>

                {/* Bottom light bar prize pool*/}
                <div className="bg-brand-bg flex-1 py-6 px-4 flex flex-col items-center justify-center">
                    <span className="font-bebas text-button-lg text-brand-dark tracking-tight">
                    25,000€
                    </span>
                </div>
            </div>

            <div className="flex flex-col w-[300px] h-[220px] overflow-hidden select-none">
                {/* Top dark bar teams */}
                <div className="bg-brand-dark py-3 text-center">
                    <span className="font-bebas text-button-lg tracking-wider text-brand-light uppercase">
                    TEAMS
                    </span>
                </div>

                {/* Bottom light bar teams */}
                <div className="bg-brand-bg flex-1 py-6 px-4 flex flex-col items-center justify-center">
                    <span>
                    
                    </span>
                </div>
            </div>

            <div className="flex flex-col w-[300px] h-[220px] overflow-hidden select-none">
                {/* Top dark bar entry */}
                <div className="bg-brand-dark py-3 text-center">
                    <span className="font-bebas text-button-lg tracking-wider text-brand-light uppercase">
                    ENTRY FEE
                    </span>
                </div>

                {/* Bottom light bar entry */}
                <div className="bg-brand-bg flex-1 py-6 px-4 flex flex-col items-center justify-center">
                    <span className="font-bebas text-button-lg text-brand-dark tracking-tight">
                    FREE ENTRY
                    </span>
                </div>
            </div>

            <CountdownCard targetDate="2026-11-28T10:00:00" />
        </div>
    </div>
  );
}