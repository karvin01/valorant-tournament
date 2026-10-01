"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DiscordIcon from "@/components/icons/DiscordIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full bg-brand-dark sticky top-0 z-50 border-b border-brand-light/10">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex items-center justify-between h-[80px] xl:h-[100px]">
        {/* Logo */}
        <Link 
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
        >
          <Image
            src="/images/Header_logo_valo_small.png"
            alt="Valorant Tournament"
            height={100}
            width={250}
            priority
            className="h-10 sm:h-12 xl:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop / Large Screen Navigation Links (Hidden on iPad & Mobile, Visible on xl+) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 text-sm xl:text-xl text-brand-light font-inter">
          <Link href="/tournament" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">
            Tournament
          </Link>
          <Link href="/teams" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">
            Teams
          </Link>
          <Link href="/bracket" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">
            Bracket
          </Link>
          <Link href="/news" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">
            News
          </Link>
          <Link href="/faq" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">
            FAQ
          </Link>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className="text-brand-light hover:text-brand-red transition-all flex items-center ml-1"
          >
            <DiscordIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </a>
        </nav>

        {/* Action Buttons (Desktop / Large Screen) */}
        <div className="hidden xl:flex gap-3 2xl:gap-4 items-center shrink-0">
          <button className="flex items-center justify-center bg-brand-red font-bebas text-base 2xl:text-button-sm hover:opacity-90 transition-all cursor-pointer w-[110px] 2xl:w-[140px] h-[42px] 2xl:h-[48px] text-brand-light tracking-wider">
            Register
          </button>
          <button className="flex items-center justify-center bg-brand-dark border border-brand-red font-bebas text-base 2xl:text-button-sm hover:opacity-90 transition-all cursor-pointer w-[110px] 2xl:w-[140px] h-[42px] 2xl:h-[48px] text-brand-light tracking-wider">
            Login
          </button>
        </div>

        {/* Tablet & Mobile Hamburger Button (Visible on anything below xl) */}
        <div className="flex xl:hidden items-center gap-3">
          {/* Quick Discord icon accessible right on header */}
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className="text-brand-light hover:text-brand-red transition-all p-2"
          >
            <DiscordIcon className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-brand-light hover:text-brand-red transition-colors focus:outline-none cursor-pointer"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-down drawer for mobile & tablet (iPad Pro, iPad Air, phones) */}
      {isOpen && (
        <div className="xl:hidden bg-brand-dark/95 backdrop-blur-md border-b border-brand-light/10 px-6 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4 text-base font-inter font-medium text-brand-light">
            <Link href="/tournament" onClick={closeMenu} className="hover:text-brand-red transition-colors">
              Tournament
            </Link>
            <Link href="/teams" onClick={closeMenu} className="hover:text-brand-red transition-colors">
              Teams
            </Link>
            <Link href="/bracket" onClick={closeMenu} className="hover:text-brand-red transition-colors">
              Bracket
            </Link>
            <Link href="/news" onClick={closeMenu} className="hover:text-brand-red transition-colors">
              News
            </Link>
            <Link href="/faq" onClick={closeMenu} className="hover:text-brand-red transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex gap-4 pt-4 border-t border-brand-light/10">
            <button className="flex-1 py-3 bg-brand-red font-bebas text-lg text-brand-light tracking-wider hover:opacity-90 transition-all cursor-pointer rounded">
              Register
            </button>
            <button className="flex-1 py-3 bg-brand-dark border border-brand-red font-bebas text-lg text-brand-light tracking-wider hover:opacity-90 transition-all cursor-pointer rounded">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}