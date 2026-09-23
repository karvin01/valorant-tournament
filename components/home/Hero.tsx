import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[650px] 2xl:min-h-[750px] 3xl:min-h-[850px] 4k:min-h-[1000px] flex items-center justify-center overflow-hidden">
        <Image
            src="/images/HeroHomepage.jpeg"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-[center_25%]"
        />

        {/* Center 40% Dark Gradient Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,transparent_0%,rgba(17,17,17,0.85)_30%,rgba(17,17,17,0.85)_70%,transparent_100%)]" />

        {/*logo and button to register*/}
        <div className="relative z-20 flex flex-col items-center justify-center gap-25">
            <Image
                src="/images/HeroLogo.png"
                alt="Hero tournament logo"
                priority
                width={600}
                height={400}
                className="w-auto h-[300px] md:h-[350px] 2xl:h-[400px] object-contain"
            />

            {/*hero button to register*/}
            <button className="bg-brand-red mb-10 font-bebas text-button-lg text-brand-light leading-none flex items-center justify-center tracking-wider w-[550px] h-[100px] hover:opacity-90 transition-all cursor-pointer">
                REGISTER YOUR TEAM NOW
            </button>
        </div>
    </section>
  );
}
