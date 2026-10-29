'use client';

import { useState, useEffect } from 'react';
import { Team, Player } from '@/types/teams';
import { fetchAllTeams } from '@/lib/teamsService';
import SearchBar from './SearchBar';
import TeamAccordionItem from './TeamAccordionItem';

/**
 * @file TeamsSection.tsx
 * @description Public tournament directory component. Fetches all registered squads from Appwrite
 * and allows users to search by team title or player Riot handle.
 */
export default function TeamsSection() {
  // Full list of teams fetched from Appwrite database
  const [teams, setTeams] = useState<Team[]>([]);
  // Initial database query loading flag
  const [loading, setLoading] = useState(true);
  // Real-time search query bound to SearchBar input
  const [searchQuery, setSearchQuery] = useState('');
  // Globally tracked selected player for stat rendering
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // --- DATA FETCHING ---
  // Queries all registered teams on component mount
  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchAllTeams();
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTeams();
  }, []);

  // --- FILTER LOGIC ---
  // Matches search queries against either the squad name or individual player Riot names/tags
  const filteredTeams = teams.filter((team) => {
    const query = searchQuery.toLowerCase();
    const matchesTeamName = team.name.toLowerCase().includes(query);
    const matchesPlayer = team.players.some(
      (p) => p.name.toLowerCase().includes(query) || p.tag.toLowerCase().includes(query)
    );
    return matchesTeamName || matchesPlayer;
  });

  return (
    <div className="w-full relative overflow-hidden bg-brand-cards py-12 xl:py-20 flex flex-col items-center min-h-[calc(100vh-100px)]">
      <div className="w-full 3xl:max-w-[1800px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 xl:px-10 flex flex-col items-center">
        
        {/* Section Heading */}
        <h1 className="font-bebas text-4xl sm:text-5xl xl:text-6xl text-brand-light tracking-wide mb-3 text-center">
          TOURNAMENT TEAMS
        </h1>
        <p className="font-inter text-sm sm:text-base text-gray-400 text-center mb-10 max-w-xl">
          Browse rosters and select a player to view live competitive statistics.
        </p>

        {/* Live Filter Search Input */}
        <div className="w-full max-w-4xl mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Teams List / Accordion Group */}
        <div className="w-full max-w-4xl flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-16 font-bebas text-xl text-gray-400 tracking-wider">
              LOADING TOURNAMENT TEAMS...
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="text-center py-16 font-bebas text-xl text-gray-400 tracking-wider bg-white/[0.02] border border-brand-light/10 text-brand-light/60">
              NO REGISTERED TEAMS FOUND.
            </div>
          ) : (
            filteredTeams.map((team) => (
              <TeamAccordionItem
                key={team.id}
                team={team}
                selectedPlayer={selectedPlayer}
                onSelectPlayer={setSelectedPlayer}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}