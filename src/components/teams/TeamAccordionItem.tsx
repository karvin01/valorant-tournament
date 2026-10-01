"use client";

import { useState } from "react";
import { Team, Player } from "@/types/teams";
import PlayerStats from "./PlayerStats";

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

  return (
    <div className="w-full bg-white/[0.03] border border-brand-light/10 rounded overflow-hidden">
      {/* Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {team.logo && (
            <div className="w-7 h-7 sm:w-8 sm:h-8 relative shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          )}
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expanded Split Layout */}
      {isOpen && (
        <div className="border-t border-brand-light/10 p-4 sm:p-5 lg:p-6 bg-brand-dark/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            
            {/* Left: Players list */}
            {/* On mobile: 1 column list or optional horizontal scroll/grid */}
            <div className="flex flex-col gap-2 lg:col-span-4 3xl:col-span-3 w-full">
              {team.players.map((player) => {
                const isSelected = selectedPlayer?.id === player.id;
                return (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => onSelectPlayer(player)}
                    className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-brand-red/10 border-brand-red text-brand-light shadow-[0_0_15px_rgba(255,70,85,0.15)]"
                        : "bg-brand-light/[0.02] border-brand-light/5 text-brand-light/80 hover:border-brand-light/20 hover:text-brand-light"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {player.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-brand-light/40 font-mono">
                      #{player.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Info Panel */}
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