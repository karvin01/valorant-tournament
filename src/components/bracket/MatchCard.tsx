"use client";

import { Match } from "@/types/bracket";

export default function MatchCard({ match }: { match?: Match }) {
  const team1 = match?.team1 ?? { name: "TBD", score: 0 };
  const team2 = match?.team2 ?? { name: "TBD", score: 0 };

  return (
    <div className="w-56 bg-brand-dark/95 border border-white/15 p-2.5 flex flex-col gap-1.5 shadow-2xl select-none">
      <div className={`flex justify-between items-center text-xs font-semibold ${team1.isWinner ? "text-brand-light font-bold" : "text-brand-light/70"}`}>
        <span className="truncate">{team1.name}</span>
        <span className="text-brand-red font-bebas text-base">{team1.score ?? 0}</span>
      </div>
      <div className="h-[1px] bg-white/10 w-full" />
      <div className={`flex justify-between items-center text-xs font-semibold ${team2.isWinner ? "text-brand-light font-bold" : "text-brand-light/70"}`}>
        <span className="truncate">{team2.name}</span>
        <span className="font-bebas text-base">{team2.score ?? 0}</span>
      </div>
    </div>
  );
}