'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { BUCKET_ID } from '@/lib/appwrite';
import { Player } from '@/types/teams';
import { fetchUserTeam, uploadTeamLogo, TeamDocument } from '@/lib/teamsService';
import PlayerStats from '@/components/teams/PlayerStats';
import TeamHeader from '@/components/teams/TeamHeader';
import PlayerList from '@/components/teams/PlayerList';

/**
 * @file MyTeamSection.tsx
 * @description Dedicated roster management dashboard for authenticated team captains.
 * Allows viewing roster members, uploading custom logos to Appwrite Storage, and inspecting live player stats.
 */
export default function MyTeamSection() {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  // Appwrite document representing the captain's registered squad record
  const [team, setTeam] = useState<TeamDocument | null>(null);
  // Array of 5 parsed Player objects (extracted from Appwrite JSON strings)
  const [players, setPlayers] = useState<Player[]>([]);
  // Currently active player selected for stats inspection in the right column
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  // Initial page load flag during Appwrite authentication and database fetch
  const [loading, setLoading] = useState(true);
  // Logo upload progress indicator
  const [uploading, setUploading] = useState(false);
  // Upload and validation error message banner string
  const [error, setError] = useState('');

  // --- AUTH VERIFICATION & TEAM RETRIEVAL ---
  // Ensures the visitor is logged in; redirects unauthenticated visitors to /login
  useEffect(() => {
    async function loadMyTeam() {
      try {
        const user = await account.get();
        if (!user || !user.$id) {
          router.push('/login');
          return;
        }

        // Fetch team document associated with current user's $id
        const result = await fetchUserTeam(user.$id);
        if (result) {
          setTeam(result.doc);
          setPlayers(result.players);
          // Default selection to team captain (Player 1)
          setSelectedPlayer(result.players[0]);
        }
      } catch (error) {
        console.error('Failed to fetch user team:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMyTeam();
  }, [router]);

  // --- LOGO UPLOAD HANDLER ---
  // Validates file size (max 2MB), uploads image to Appwrite Storage, and updates team record
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !team) return;

    setError(''); // Clear previous errors
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    
    // Client-side file size gatekeeper
    if (file.size > MAX_FILE_SIZE) {
      setError('Logo file is too large! Please choose an image under 2MB.');
      return;
    }

    setUploading(true);
    try {
      // Store in Appwrite Storage Bucket and patch document with direct URL
      const fileUrl = await uploadTeamLogo(team.$id, file);
      // Immediately reflect uploaded logo in local state
      setTeam({ ...team, logoUrl: fileUrl });
    } catch (err) {
      console.error('Failed to upload logo:', err);
      setError('Error uploading logo. Make sure your storage bucket permissions allow uploads.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-12 xl:py-7 flex flex-col items-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Section Title */}
        <h1 className="font-bebas text-4xl sm:text-5xl xl:text-6xl text-brand-light tracking-wide mb-3 text-center">
          YOUR TEAM
        </h1>

        {/* Dynamic State Views */}
        {loading ? (
          <div className="text-center py-16 font-bebas text-xl text-gray-400 tracking-wider">
            LOADING YOUR TEAM...
          </div>
        ) : !team ? (
          <div className="text-center py-16 font-bebas text-xl text-gray-400 tracking-wider bg-white/[0.03] border border-brand-light/10 w-full text-brand-light/60">
            NO TEAM FOUND.
          </div>
        ) : (
          <div className="w-full bg-white/[0.03] border border-brand-light/10 overflow-hidden">
            {/* Error Notification */}
            {error && (
              <div className="bg-brand-red/10 border border-brand-red text-brand-red p-3 font-inter text-sm m-4">
                {error}
              </div>
            )}

            {/* Team Identity Banner & Logo Upload Trigger */}
            <TeamHeader
              teamName={team.teamName}
              logoUrl={team.logoUrl}
              uploading={uploading}
              onLogoUpload={handleLogoUpload}
            />

            {/* Split Roster View: Player Selector on Left, Dynamic Henrik API Stats on Right */}
            <div className="p-4 sm:p-5 lg:p-6 bg-brand-dark/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
                {/* 5-Man Roster List Column */}
                <div className="lg:col-span-4 3xl:col-span-3 w-full">
                  <PlayerList
                    players={players}
                    selectedPlayer={selectedPlayer}
                    onSelectPlayer={setSelectedPlayer}
                  />
                </div>
                {/* Detailed Performance Metrics Column */}
                <div className="w-full lg:col-span-8 3xl:col-span-9">
                  <PlayerStats player={selectedPlayer} />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}