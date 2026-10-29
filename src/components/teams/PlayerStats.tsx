"use client";

import { useEffect, useState } from "react";
import { Player } from "@/types/teams";

// API contract returned from internal /api/player route wrapping Henrik's Valorant API
interface PlayerApiData {
  riotId: string;
  rank: {
    name: string;
    icon: string | null;
    rr: number;
  };
  stats: {
    kd: string;
    winrate: string;
    totalMatchesAnalyzed: number;
    mostPlayedAgent: string;
  };
}

interface PlayerStatsProps {
  player: Player | null;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  // Parsed API payload holding competitive rank, KD, winrate, and agent info
  const [data, setData] = useState<PlayerApiData | null>(null);
  // Async fetch indicator triggering spin animation
  const [loading, setLoading] = useState(false);
  // Error string if player tag is invalid or Riot servers return non-200
  const [error, setError] = useState<string | null>(null);

  // --- STATS DATA FETCHING ---
  // Re-runs on every player selection change; includes isMounted guard against race conditions
  useEffect(() => {
    if (!player) return;

    let isMounted = true;

    async function loadStats() {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        // Query server route with URL-encoded player credentials to shield API key
        const res = await fetch(
          `/api/player?name=${encodeURIComponent(player!.name)}&tag=${encodeURIComponent(player!.tag)}`
        );

        if (!res.ok) throw new Error("Failed to load player stats.");

        const json: PlayerApiData = await res.json();
        if (isMounted) setData(json);
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStats();

    // Cleanup: cancel state dispatch if user switches players before response finishes
    return () => {
      isMounted = false;
    };
  }, [player]);

  // Unselected Placeholder
  if (!player) {
    return (
      <div className="w-full min-h-[200px] sm:min-h-[260px] flex items-center justify-center p-6 border border-dashed border-brand-light/10 bg-brand-light/[0.01]">
        <p className="text-xs text-brand-light/40">Select a player to view stats</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[400px] bg-brand-dark/80 border border-brand-light/10 p-4 sm:p-5 text-brand-light flex flex-col justify-between">
      {/* Player Header */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight">{player.name}</h3>
        <span className="text-xs text-brand-light/40 font-mono">#{player.tag}</span>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="py-10 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-brand-light/50">Loading player stats...</p>
        </div>
      )}

      {/* Error & Inactivity State */}
      {error && !loading && (
        <div className="py-8 text-center">
          <p className="text-brand-red text-xs sm:text-sm font-semibold">{error}</p>
          <p className="text-[11px] text-brand-light/40 mt-1">Player unranked or inactive.</p>
        </div>
      )}

      {/* Populated Live Stats Grid */}
      {data && !loading && (
        <div className="space-y-3 sm:space-y-4">
          {/* Competitive Rank Badge & Tier Display */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 bg-brand-light/[0.03] border border-brand-light/10">
            {data.rank.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.rank.icon}
                alt={data.rank.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-light/10 flex items-center justify-center text-[10px] shrink-0">
                N/A
              </div>
            )}
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-light/40">Current Rank</p>
              <p className="text-sm sm:text-base font-bold text-brand-light">{data.rank.name}</p>
              <p className="text-[11px] text-brand-light/60">{data.rank.rr} RR</p>
            </div>
          </div>

          {/* Metric Grid: K/D, Win Rate, and Signature Agent */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
            {/* Kill / Death Ratio */}
            <div className="p-2.5 sm:p-3 bg-brand-light/[0.03] border border-brand-light/10">
              <span className="text-[10px] sm:text-xs text-brand-light/40 uppercase">K/D</span>
              <p className="text-base sm:text-lg font-bold text-brand-light mt-0.5">{data.stats.kd}</p>
            </div>

            {/* Competitive Win Rate % */}
            <div className="p-2.5 sm:p-3 bg-brand-light/[0.03] border border-brand-light/10 ">
              <span className="text-[10px] sm:text-xs text-brand-light/40 uppercase">Win Rate</span>
              <p className="text-base sm:text-lg font-bold text-brand-light mt-0.5">{data.stats.winrate}</p>
            </div>

            {/* Signature / Most Selected Agent */}
            <div className="p-2.5 sm:p-3 bg-brand-light/[0.03] border border-brand-light/10 col-span-2">
              <span className="text-[10px] sm:text-xs text-brand-light/40 uppercase">Most Played Agent</span>
              <p className="text-xs sm:text-sm font-semibold text-brand-red mt-0.5">
                {data.stats.mostPlayedAgent}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}