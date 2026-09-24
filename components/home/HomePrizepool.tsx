import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-brand-dark py-10">
        <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-10">
            <h1 className="uppercase font-bebas text-brand-light text-button-lg mb-10">
                Prize pool
            </h1>

            {/* Podium Row */}
            <div className="flex items-end justify-center gap-8 lg:gap-12 max-w-5xl mx-auto pt-20">

            {/* 2nd place badge */}
            <div className="relative flex-1 max-w-[300px] bg-brand-bg flex flex-col items-center pt-10 pb-8 px-4 h-[380px]">
            {/* medal image */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[260px] h-[110px]">
                <Image
                src="/images/second.png"
                alt="2nd place medal"
                fill
                className="object-contain"
                />
            </div>

            {/* 2nd place card */}
            <div className="flex flex-col items-center text-center gap-5 w-full">
                <span className="font-bebas text-5xl text-brand-dark tracking-tight leading-none">
                7,500€
                </span>

                <span className="font-inter text-xs uppercase tracking-widest text-brand-dark font-semibold pt-4">
                Silver Medals & Hardware
                </span>

                {/* trophy image */}
                <div className="relative w-30 h-30 my-1">
                <Image
                    src="/images/2ndmedal.png"
                    alt="Silver Medal"
                    fill
                    className="object-contain"
                />
                </div>

                {/* Additional perk list */}
                <div className="text-center font-inter text-brand-dark flex flex-col gap-0.5">
                <p className="text-xs text-brand-dark">5x Pro Peripheral Kits</p>
                <p className="font-bold text-xs">EMEA Closed Qualifier Spot</p>
                </div>
            </div>
            </div>

            {/* CHAMPION CARD */}
            <div className="relative flex-1 max-w-[320px] bg-brand-red flex flex-col items-center pt-10 pb-8 px-4 h-[450px]">
                {/* Champion badge */}
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[326px] h-[135px]">
                <Image
                    src="/images/champion.png"
                    alt="Champion Badge"
                    fill
                    className="object-contain drop-shadow-lg"
                />
                </div>

                {/* Champion card */}
                <div className="flex flex-col items-center text-center gap-5 w-full">
                <span className="font-bebas text-6xl text-brand-dark tracking-tight leading-none">
                    15,000€
                </span>

                {/* subtitle */}
                <span className="font-inter text-xs uppercase tracking-widest text-brand-dark font-semibold pt-10">
                    Grand Trophy & Seeds
                </span>

                {/* trophy */}
                <div className="relative w-30 h-30 my-2">
                    <Image
                    src="/images/trophy.png"
                    alt="Champion Trophy"
                    fill
                    className="object-contain"
                    />
                </div>

                {/* Additional perk list*/}
                <div className="text-center font-inter text-sm text-brand-dark flex flex-col gap-1">
                    <p className="text-xs text-brand-dark ">Showmatch on VCT Finals</p>
                    <p className="font-bold">Guaranteed EMEA Masters Slot</p>
                </div>
                </div>
            </div>

            {/* 3RD PLACE CARD */}
            <div className="relative flex-1 max-w-[300px] bg-brand-bg flex flex-col items-center pt-10 pb-8 px-4 h-[380px]">
            {/* 3rd place badge */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[260px] h-[110px]">
                <Image
                src="/images/third.png"
                alt="3rd Place Badge"
                fill
                className="object-contain"
                />
            </div>

            {/* 3rd place card */}
            <div className="flex flex-col items-center text-center gap-5 w-full">
                <span className="font-bebas text-5xl text-brand-dark tracking-tight leading-none">
                2,500€
                </span>

                <span className="font-inter text-xs uppercase tracking-widest text-brand-dark font-semibold pt-4">
                Bronze Medals & VP
                </span>

                {/* medal image */}
                <div className="relative w-30 h-30 my-1">
                <Image
                    src="/images/3rdmedal.png"
                    alt="Bronze Medal"
                    fill
                    className="object-contain"
                />
                </div>

                {/* Additional perk list */}
                <div className="text-center font-inter text-brand-dark flex flex-col gap-0.5">
                <p className="font-bold">50,000 Valorant Points</p>
                </div>
            </div>
            </div>

            </div>
        </div>
    </section>
  );
}