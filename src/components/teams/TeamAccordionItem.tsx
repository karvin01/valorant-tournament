"use client";

import { useState } from "react";
import { Team, Player } from "@/types/teams";
import PlayerStats from "./PlayerStats";
import PlayerList from "./PlayerList";

interface TeamAccordionItemProps {
  team: Team;
  selectedPlayer: Player | null;
  onSelectPlayer: (player: Player) => void;
}

export default function TeamAccordionItem({
  team,
  selectedPlayer,
  onSelectPlayer,
}: TeamAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const teamLogo = team.logo || "/images/Header_logo_valo_small.png";

  return (
    <div className="w-full bg-white/[0.03] border border-brand-light/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 relative shrink-0 flex items-center justify-center bg-brand-dark border border-brand-light/20 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={teamLogo} alt={`${team.name} logo`} className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-brand-light tracking-wide text-sm sm:text-base">
            {team.name}
          </span>
        </div>

        <svg
          className={`w-4 h-4 text-brand-light/50 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-brand-light/10 p-4 sm:p-5 lg:p-6 bg-brand-dark/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            <div className="lg:col-span-4 3xl:col-span-3 w-full">
              <PlayerList
                players={team.players}
                selectedPlayer={selectedPlayer}
                onSelectPlayer={onSelectPlayer}
                showCaptainLabel={false}
              />
            </div>
            <div className="w-full lg:col-span-8 3xl:col-span-9">
              <PlayerStats
                player={
                  team.players.some((p) => p.id === selectedPlayer?.id)
                    ? selectedPlayer
                    : null
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}