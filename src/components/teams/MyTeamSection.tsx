'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { account, databases, storage, DB_ID, TEAMS_TABLE_ID } from '@/lib/appwrite';
import { Query, Models, ID, Permission, Role } from 'appwrite';
import { Player } from '@/types/teams';
import PlayerStats from '@/components/teams/PlayerStats';

// Replace with your actual Appwrite Storage Bucket ID
const BUCKET_ID = '6acced290028b5998f9d'; 

interface TeamDocument extends Models.Document {
  teamName: string;
  userId: string;
  logoUrl?: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  player5: string;
}

export default function MyTeamSection() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [team, setTeam] = useState<TeamDocument | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchMyTeam() {
      try {
        const user = await account.get();
        if (!user || !user.$id) {
          router.push('/login');
          return;
        }

        const response = await databases.listDocuments(
          DB_ID,
          TEAMS_TABLE_ID,
          [Query.equal('userId', user.$id)]
        );

        if (response.documents.length > 0) {
          const doc = response.documents[0] as unknown as TeamDocument;
          setTeam(doc);

          const parsePlayer = (playerString: string, index: number): Player => {
            if (!playerString) return { id: `${doc.$id}-p${index}`, name: 'Unknown', tag: '0000' };
            const parts = playerString.split('#');
            return {
              id: `${doc.$id}-p${index}`,
              name: parts[0] || 'Unknown',
              tag: parts[1] || '0000',
            };
          };

          const mappedPlayers: Player[] = [
            parsePlayer(doc.player1, 1),
            parsePlayer(doc.player2, 2),
            parsePlayer(doc.player3, 3),
            parsePlayer(doc.player4, 4),
            parsePlayer(doc.player5, 5),
          ];

          setPlayers(mappedPlayers);
          setSelectedPlayer(mappedPlayers[0]);
        }
      } catch (error) {
        console.error('Failed to fetch user team:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyTeam();
  }, [router]);

  // Handle Logo Upload with Public Permission and 2MB Size Restriction
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !team) return;

    // 2MB limit in bytes (2 * 1024 * 1024)
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert('Logo file is too large! Please choose an image under 2MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    try {
      // 1. Upload file with public read access so everyone can see it on the teams page
      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );

      // 2. Get public file view URL
      const fileUrl = storage.getFileView(BUCKET_ID, uploadedFile.$id);

      // 3. Update the team document in the database with the new logo URL
      await databases.updateDocument(
        DB_ID,
        TEAMS_TABLE_ID,
        team.$id,
        { logoUrl: fileUrl }
      );

      // 4. Update local state
      setTeam({ ...team, logoUrl: fileUrl });
    } catch (error) {
      console.error('Failed to upload logo:', error);
      alert('Error uploading logo. Make sure your storage bucket permissions allow uploads.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-color-brand-cards py-12 xl:py-7 flex flex-col items-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        <h1 className="font-bebas text-4xl sm:text-5xl xl:text-6xl text-brand-light tracking-wide mb-3 text-center">
          YOUR TEAM
        </h1>

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
            
            {/* Team Header with Logo Upload */}
            <div className="w-full px-6 py-5 flex items-center justify-between border-b border-brand-light/10 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-12 h-12 bg-brand-dark border border-brand-light/20 flex items-center justify-center cursor-pointer relative group overflow-hidden shrink-0"
                  title="Click to upload team logo"
                >
                  {team.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={team.logoUrl} alt="Team Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bebas text-brand-light/50 text-xs text-center px-1">
                      {uploading ? '...' : 'LOGO'}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-inter text-brand-light">
                    Edit
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-brand-light tracking-wide text-lg sm:text-xl">
                      {team.teamName}
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-brand-light/50 hover:text-brand-red transition-colors font-inter mt-0.5 text-left block cursor-pointer"
                  >
                    {uploading ? 'Uploading logo...' : team.logoUrl ? 'Change team logo' : '+ Upload team logo'}
                  </button>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Split Layout Container */}
            <div className="p-4 sm:p-5 lg:p-6 bg-brand-dark/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
                
                {/* Left: Players list */}
                <div className="flex flex-col gap-2 lg:col-span-4 3xl:col-span-3 w-full">
                  {players.map((player, index) => {
                    const isSelected = selectedPlayer?.id === player.id;
                    return (
                      <button
                        key={player.id}
                        type="button"
                        onClick={() => setSelectedPlayer(player)}
                        className={`flex items-center justify-between px-3.5 sm:px-4 py-3 text-left transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-brand-red/10 border-brand-red text-brand-light shadow-[0_0_15px_rgba(255,70,85,0.15)]"
                            : "bg-brand-light/[0.02] border-brand-light/5 text-brand-light/80 hover:border-brand-light/20 hover:text-brand-light"
                        }`}
                      >
                        <div className="flex flex-col truncate">
                          <span className="text-xs font-bebas tracking-wide text-brand-red mb-0.5">
                            {index === 0 ? 'CAPTAIN' : `PLAYER ${index + 1}`}
                          </span>
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

                {/* Right: Info Panel */}
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