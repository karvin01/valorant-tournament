import Image from "next/image";

/**
 * @file HomePrizepool.tsx
 * @description Tournament podium showcase highlighting rewards, trophies, and tournament qualification seeds for 1st, 2nd, and 3rd place finishes.
 */
export default function PrizePool() {
  return (
    <section className="w-full bg-brand-dark py-12 md:py-16">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-10">
        <h2 className="uppercase font-bebas text-brand-light text-button-lg mb-10 text-center md:text-left">
          Prize pool
        </h2>

        {/* Podium Container:
            - Mobile: Stacked vertically with 1st place on top, separated by gap-16
            - PC (lg+): Side-by-side (2nd, 1st, 3rd) aligned to bottom with original gap
        */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-16 lg:gap-8 xl:gap-12 max-w-5xl mx-auto">

          {/* 1. CHAMPION UNIT (1st place) - prominent center podium placement on desktop (order-2) */}
          <div className="order-1 lg:order-2 flex flex-col items-center w-full max-w-[320px]">
            {/* Champion Badge (natural flow, no negative offset bugs) */}
            <div className="relative w-[280px] lg:w-[326px] h-[115px] lg:h-[135px] mb-6">
              <Image
                src="/images/homepics/championBadge.png"
                alt="Champion Badge"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Champion Card */}
            <div className="w-full bg-brand-red flex flex-col items-center pt-10 pb-8 px-4 h-[450px]">
              <div className="flex flex-col items-center text-center gap-5 w-full">
                <span className="font-bebas text-6xl text-brand-dark tracking-tight leading-none">
                  15,000€
                </span>

                <span className="font-inter text-xs uppercase tracking-widest text-brand-dark font-semibold pt-10">
                  Grand Trophy & Seeds
                </span>

                {/* Trophy */}
                <div className="relative w-28 h-28 my-2">
                  <Image
                    src="/images/homepics/trophy.png"
                    alt="Champion Trophy"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Perks */}
                <div className="text-center font-inter text-sm text-brand-dark flex flex-col gap-1">
                  <p className="text-xs text-brand-dark">Showmatch on VCT Finals</p>
                  <p className="font-bold">Guaranteed EMEA Masters Slot</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 2ND PLACE UNIT - positioned left of champion on desktop (order-1) */}
          <div className="order-2 lg:order-1 flex flex-col items-center w-full max-w-[300px]">
            {/* 2nd Place Badge */}
            <div className="relative w-[230px] lg:w-[260px] h-[95px] lg:h-[110px] mb-6">
              <Image
                src="/images/homepics/second.png"
                alt="2nd place medal"
                fill
                className="object-contain"
              />
            </div>

            {/* 2nd Place Card */}
            <div className="w-full bg-brand-bg flex flex-col items-center pt-10 pb-8 px-4 h-[380px]">
              <div className="flex flex-col items-center text-center gap-5 w-full">
                <span className="font-bebas text-5xl text-brand-dark tracking-tight leading-none">
                  7,500€
                </span>

                <span className="font-inter text-xs uppercase tracking-widest text-brand-dark font-semibold pt-4">
                  Silver Medals & Hardware
                </span>

                {/* Medal */}
                <div className="relative w-24 h-24 my-1">
                  <Image
                    src="/images/homepics/2ndmedal.png"
                    alt="Silver Medal"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Perks */}
                <div className="text-center font-inter text-brand-dark flex flex-col gap-0.5">
                  <p className="text-xs text-brand-dark">5x Pro Peripheral Kits</p>
                  <p className="font-bold text-xs">EMEA Closed Qualifier Spot</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 3RD PLACE UNIT - positioned right of champion on desktop (order-3) */}
          <div className="order-3 flex flex-col items-center w-full max-w-[300px]">
            {/* 3rd Place Badge */}
            <div className="relative w-[230px] lg:w-[260px] h-[95px] lg:h-[110px] mb-6">
              <Image
                src="/images/homepics/third.png"
                alt="3rd Place Badge"
                fill
                className="object-contain"
              />
            </div>

            {/* 3rd Place Card */}
            <div className="w-full bg-brand-bg flex flex-col items-center pt-10 pb-8 px-4 h-[380px]">
              <div className="flex flex-col items-center text-center gap-5 w-full">
                <span className="font-bebas text-5xl text-brand-dark tracking-tight leading-none">
                  2,500€
                </span>

                <span className="font-inter text-xs uppercase tracking-widest text-brand-dark font-semibold pt-4">
                  Bronze Medals & VP
                </span>

                {/* Medal */}
                <div className="relative w-24 h-24 my-1">
                  <Image
                    src="/images/homepics/3rdmedal.png"
                    alt="Bronze Medal"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Perks */}
                <div className="text-center font-inter text-brand-dark flex flex-col gap-0.5">
                  <p className="font-bold text-xs">50,000 Valorant Points</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}