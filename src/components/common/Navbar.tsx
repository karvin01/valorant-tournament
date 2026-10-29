"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DiscordIcon from "@/components/icons/DiscordIcon";
import { useAuthSession } from "@/hooks/useAuthSession";

export default function Navbar() {
  const router = useRouter();

  // --- GLOBAL AUTH STATE ---
  // Subscribes to reactive session status, role privileges, and sign-out handler
  const { isLoggedIn, isAdmin, loadingAuth, logout } = useAuthSession();
  
  // --- UI NAVIGATION STATE ---
  // Mobile drawer collapse toggle
  const [isOpen, setIsOpen] = useState(false);
  // Admin navigation dropdown menu visibility toggle
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  // DOM anchor reference to capture clicks outside the admin dropdown container
  const adminMenuRef = useRef<HTMLDivElement>(null);

  // Close admin dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setAdminMenuOpen(false);
      }
    }
    // Bind global mousedown listener to track backdrop and external clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup listener on unmount to prevent memory leaks
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGOUT HANDLER ---
  // Terminates the Appwrite session, reroutes the client to the homepage, and purges router cache
  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  // Resets all modal and drawer toggles when a destination link is clicked
  const closeMenu = () => {
    setIsOpen(false);
    setAdminMenuOpen(false);
  };

  return (
    <header className="w-full bg-brand-dark sticky top-0 z-50 border-b border-brand-light/10">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex items-center justify-between h-[80px] xl:h-[100px]">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0">
          <Image src="/images/Header_logo_valo_small.png" alt="Valorant Tournament" height={100} width={250} priority className="h-10 sm:h-12 xl:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 text-sm xl:text-xl text-brand-light font-inter">
          <Link href="/tournament" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">Tournament</Link>
          <Link href="/teams" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">Teams</Link>
          <Link href="/bracket" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">Bracket</Link>
          <Link href="/news" className="transition-all duration-200 hover:text-brand-red whitespace-nowrap">News</Link>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord" className="text-brand-light hover:text-brand-red transition-all flex items-center ml-1">
            <DiscordIcon className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </a>
        </nav>

        {/* Action Buttons (Desktop) */}
        {/* Conditionally rendered based on session authentication and role resolution */}
        <div className="hidden xl:flex gap-3 2xl:gap-4 items-center shrink-0">
          {/* Prevent layout shift while the Appwrite auth session is being validated */}
          {!loadingAuth && (
            isLoggedIn ? (
              <>
                {/* Standard Competitor Link: Hidden for Admins who do not manage a roster */}
                {!isAdmin && (
                  <Link href="/myTeam" className="flex items-center justify-center bg-brand-dark border border-brand-red font-bebas text-base 2xl:text-button-sm hover:bg-brand-red/10 transition-all cursor-pointer w-[110px] 2xl:w-[140px] h-[42px] 2xl:h-[48px] text-brand-light tracking-wider">
                    My Team
                  </Link>
                )}

                {/* Admin Role Dropdown: Grants access to bracket seeding and management tools */}
                {isAdmin && (
                  <div className="relative" ref={adminMenuRef}>
                    <button 
                      type="button"
                      onClick={() => setAdminMenuOpen(!adminMenuOpen)} 
                      className="flex items-center justify-center gap-2 bg-brand-dark border border-brand-red font-bebas text-base 2xl:text-button-sm hover:bg-brand-red/10 transition-all cursor-pointer px-4 h-[42px] 2xl:h-[48px] text-brand-light tracking-wider"
                    >
                      <span>Admin Menu</span>
                      {/* Dropdown indicator rotates 180deg when active */}
                      <svg className={`w-4 h-4 transition-transform duration-200 ${adminMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Collapsible Admin Links */}
                    {adminMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-brand-dark border border-brand-light/20 shadow-xl py-2 flex flex-col z-50">
                        <Link href="/admin/bracket" onClick={() => setAdminMenuOpen(false)} className="px-4 py-2 text-sm font-inter text-brand-light hover:bg-brand-red/20 hover:text-brand-red transition-colors text-left">
                          Update Bracket
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Global Sign Out Button */}
                <button 
                  type="button"
                  onClick={handleLogout} 
                  className="flex items-center justify-center bg-brand-red font-bebas text-base 2xl:text-button-sm hover:opacity-90 transition-all cursor-pointer w-[110px] 2xl:w-[140px] h-[42px] 2xl:h-[48px] text-brand-light tracking-wider"
                >
                  Logout
                </button>
              </>
            ) : (
              /* Public / Unauthenticated Navigation State */
              <>
                <Link href="/register" className="flex items-center justify-center bg-brand-red font-bebas text-base 2xl:text-button-sm hover:opacity-90 transition-all cursor-pointer w-[110px] 2xl:w-[140px] h-[42px] 2xl:h-[48px] text-brand-light tracking-wider">
                  Register
                </Link>
                <Link href="/login" className="flex items-center justify-center bg-brand-dark border border-brand-red font-bebas text-base 2xl:text-button-sm hover:opacity-90 transition-all cursor-pointer w-[110px] 2xl:w-[140px] h-[42px] 2xl:h-[48px] text-brand-light tracking-wider">
                  Login
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-3">
          <a href="https://discord.com/invite/valorant" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord" className="text-brand-light hover:text-brand-red transition-all p-2">
            <DiscordIcon className="w-5 h-5" />
          </a>
          {/* Hamburger / Close Icon Toggle */}
          <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu" className="p-2 text-brand-light hover:text-brand-red transition-colors focus:outline-none cursor-pointer">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-brand-dark/95 backdrop-blur-md border-b border-brand-light/10 px-6 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4 text-base font-inter font-medium text-brand-light">
            <Link href="/tournament" onClick={closeMenu} className="hover:text-brand-red transition-colors">Tournament</Link>
            <Link href="/teams" onClick={closeMenu} className="hover:text-brand-red transition-colors">Teams</Link>
            <Link href="/bracket" onClick={closeMenu} className="hover:text-brand-red transition-colors">Bracket</Link>
            <Link href="/news" onClick={closeMenu} className="hover:text-brand-red transition-colors">News</Link>
            {/* Mobile Admin Link Shortcut */}
            {isAdmin && (
              <Link href="/admin/bracket" onClick={closeMenu} className="text-brand-red font-semibold transition-colors">
                Admin: Update Bracket
              </Link>
            )}
          </nav>

          {/* Mobile Auth Actions */}
          <div className="flex gap-4 pt-4 border-t border-brand-light/10">
            {!loadingAuth && (
              isLoggedIn ? (
                <>
                  {!isAdmin && (
                    <Link href="/myTeam" onClick={closeMenu} className="flex-1 py-3 bg-brand-dark border border-brand-red font-bebas text-base text-brand-light tracking-wider hover:bg-brand-red/10 transition-all cursor-pointer rounded text-center">
                      My Team
                    </Link>
                  )}
                  <button 
                    type="button"
                    onClick={() => { closeMenu(); handleLogout(); }} 
                    className="flex-1 py-3 bg-brand-red font-bebas text-base text-brand-light tracking-wider hover:opacity-90 transition-all cursor-pointer rounded text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register" onClick={closeMenu} className="flex-1 py-3 bg-brand-red font-bebas text-lg text-brand-light tracking-wider hover:opacity-90 transition-all cursor-pointer rounded text-center">
                    Register
                  </Link>
                  <Link href="/login" onClick={closeMenu} className="flex-1 py-3 bg-brand-dark border border-brand-red font-bebas text-lg text-brand-light tracking-wider hover:opacity-90 transition-all cursor-pointer rounded text-center">
                    Login
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}