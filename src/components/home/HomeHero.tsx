import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] 2xl:min-h-[750px] 3xl:min-h-[850px] 4k:min-h-[1000px] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background Image */}
      <Image
        src="/images/homepics/HeroHomepage.jpeg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-[center_25%]"
      />

      {/* Dark Overlay: full vertical tint on mobile, horizontal center gradient on tablet & desktop */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-brand-dark/70 md:bg-[linear-gradient(to_right,transparent_0%,rgba(17,17,17,0.85)_30%,rgba(17,17,17,0.85)_70%,transparent_100%)]" />

      {/* Logo & Call to Action */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 py-12 md:py-16 w-full max-w-4xl mx-auto">
        {/* Tournament Hero Logo */}
        <div className="relative w-full flex justify-center">
          <Image
            src="/images/homepics/HeroLogo.png"
            alt="Hero tournament logo"
            priority
            width={600}
            height={400}
            className="w-auto max-w-[85vw] sm:max-w-none h-[180px] sm:h-[240px] md:h-[300px] 2xl:h-[400px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Hero Register Button */}
        <Link
          href="/register"
          className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[550px] h-[64px] sm:h-[80px] md:h-[90px] lg:h-[100px] bg-brand-red uppercase font-bebas text-2xl sm:text-3xl md:text-button-lg text-brand-light leading-none flex items-center justify-center tracking-wider hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-brand-red/20"
        >
          REGISTER YOUR TEAM NOW
        </Link>
      </div>
    </section>
  );
}