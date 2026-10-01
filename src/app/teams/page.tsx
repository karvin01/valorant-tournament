"use client";

import { useState } from "react";
import { MOCK_TEAMS } from "@/data/mockTeams";
import { Player } from "@/types/teams";
import SearchBar from "@/components/teams/SearchBar";
import TeamAccordionItem from "@/components/teams/TeamAccordionItem";
import PlayerStats from "@/components/teams/PlayerStats";

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Filter teams by team name OR player name
  const filteredTeams = MOCK_TEAMS.filter((team) => {
    const query = searchQuery.toLowerCase().trim();

    // 1. Does the team name match?
    const matchesTeam = team.name.toLowerCase().includes(query);

    // 2. Does any player inside this team match?
    const matchesPlayer = team.players.some((player) =>
      player.name.toLowerCase().includes(query)
    );

    return matchesTeam || matchesPlayer;
  });

  console.log("Mock teams loaded:", MOCK_TEAMS);
  console.log("Filtered teams:", filteredTeams);

  return (
    <main className="w-full min-h-[calc(100vh-100px)] bg-brand-dark text-brand-light py-8 md:py-12">
        <div className="w-full max-w-7xl 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-10">
            {/* Page Header */}
            <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-bebas text-brand-light">
                Tournament Teams
            </h1>
            <p className="text-brand-light/50 text-sm mt-2">
                Browse rosters and select a player to view live competitive statistics.
            </p>
            </div>

            {/* Search & Accordions */}
            <div className="flex flex-col gap-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="flex flex-col gap-3">
                {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                    <TeamAccordionItem
                    key={team.id}
                    team={team}
                    selectedPlayer={selectedPlayer}
                    onSelectPlayer={(player) => setSelectedPlayer(player)}
                    />
                ))
                ) : (
                <div className="text-center py-12 border border-brand-light/10 rounded">
                    <p className="text-brand-light/40 text-sm">
                    No teams or players found matching &quot;{searchQuery}&quot;
                    </p>
                </div>
                )}
            </div>
            </div>
        </div>
    </main>
  );
}