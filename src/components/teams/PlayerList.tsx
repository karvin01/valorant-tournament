"use client";

import { Player } from "@/types/teams";

interface PlayerListProps {
  players: Player[];
  selectedPlayer: Player | null;
  onSelectPlayer: (player: Player) => void;
  showCaptainLabel?: boolean;
}

export default function PlayerList({
  players,
  selectedPlayer,
  onSelectPlayer,
  showCaptainLabel = true,
}: PlayerListProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {players.map((player, index) => {
        const isSelected = selectedPlayer?.id === player.id;
        return (
          <button
            key={player.id}
            type="button"
            onClick={() => onSelectPlayer(player)}
            className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 text-left transition-all cursor-pointer border ${
              isSelected
                ? "bg-brand-red/10 border-brand-red text-brand-light shadow-[0_0_15px_rgba(255,70,85,0.15)]"
                : "bg-brand-light/[0.02] border-brand-light/5 text-brand-light/80 hover:border-brand-light/20 hover:text-brand-light"
            }`}
          >
            <div className="flex flex-col truncate">
              {showCaptainLabel && (
                <span className="text-xs font-bebas tracking-wide text-brand-red mb-0.5">
                  {index === 0 ? 'CAPTAIN' : `PLAYER ${index + 1}`}
                </span>
              )}
              <span className="text-sm font-semibold truncate">
                {player.name}
              </span>
            </div>
            <span className="text-xs text-brand-light/40 font-mono">
              #{player.tag}
            </span>
          </button>
        );
      })}
    </div>
  );
}