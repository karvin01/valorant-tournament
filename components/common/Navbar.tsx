import Link from "next/link";
// link doesnt destroy the page, it doesnt refresh the whole page
import Image from "next/image";
import DiscordIcon from "@/components/icons/DiscordIcon";

export default function Navbar() {
    return (
    <header className="w-full bg-brand-dark sticky top-0 z-50">
        <div className="3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-10 flex items-center justify-between h-[100px]">
            {/*logo*/}
            <Link 
                href="/"
                className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
                <Image
                    src="/images/Header_logo_valo_small.png"
                    alt="Valorant Tournament"
                    height={100}
                    width={250}
                    priority
                    className="h-16 w-auto object-contain"
                />
                {/* priority does that it loads with high priority (robot said it is good)*/}
            </Link>

            {/*nav links*/}
            <nav className="flex items-center gap-6 text-hero text-brand-light font-inter">
                <Link href="/tournament" className="transition-all duration-200 hover:text-brand-red">
                    Tournament
                </Link>
                <Link href="/bracket" className="transition-all duration-200 hover:text-brand-red">
                    Bracket
                </Link>
                <Link href="/news" className="transition-all duration-200 hover:text-brand-red">
                    News
                </Link>
                <Link href="/faq" className="transition-all duration-200 hover:text-brand-red">
                    FAQ
                </Link>
                <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our Discord"
                    className="text-brand-light hover:text-brand-red transition-all flex items-center"
                >
                    {/*
                    _blank opens in new tab;
                    noopener noreferrer are security stuff, the dc wont know what website the user came from;
                    aria-label is for screen readers like alt for pictures
                    */}
                    <DiscordIcon className="w-6 h-6" />
                </a>
            </nav>

            {/* Register Button */}
            <div className="flex gap-4 items-center">
                <button className="flex items-center justify-center bg-brand-red font-bebas text-button-sm hover:opacity-90 transition-all cursor-pointer w-[150px] h-[50px]">
                    Register
                </button>
                <button className="flex items-center justify-center bg-brand-dark border border-brand-red font-bebas text-button-sm hover:opacity-90 transition-all cursor-pointer w-[150px] h-[50px]">
                    login
                </button>
            </div>
        </div>

    </header>
    );
}
