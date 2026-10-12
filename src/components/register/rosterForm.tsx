'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { databases, ID, DB_ID, TEAMS_TABLE_ID, account } from '@/lib/appwrite';

export default function CompleteRosterForm() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [player5, setPlayer5] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveRoster = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const currentUser = await account.get();

      await databases.createDocument(
        DB_ID,
        TEAMS_TABLE_ID,
        ID.unique(),
        {
          userId: currentUser.$id,
          teamName: teamName,
          player1: player1,
          player2: player2,
          player3: player3,
          player4: player4,
          player5: player5,
        }
      );
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save team roster.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bebas text-4xl text-brand-dark tracking-wide mb-2 text-center">
        COMPLETE YOUR TEAM ROSTER
      </h1>
      <p className="font-inter text-sm text-gray-600 text-center mb-8">
        Enter your team name and all 5 player Riot IDs (with tags, e.g., Tenz#0001).
      </p>

      <form onSubmit={handleSaveRoster} className="flex flex-col gap-6">
        {error && (
          <div className="bg-[#ff4655]/10 border border-[#ff4655] text-[#ff4655] p-3 font-inter text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-bebas tracking-wider text-brand-dark text-sm">Team Name</label>
          <input 
            type="text" 
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]"
            placeholder="e.g. Sentinels"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bebas tracking-wider text-brand-dark text-sm">Player 1 (Captain) Riot ID</label>
            <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} required placeholder="Name#Tag" className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bebas tracking-wider text-brand-dark text-sm">Player 2 Riot ID</label>
            <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} required placeholder="Name#Tag" className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bebas tracking-wider text-brand-dark text-sm">Player 3 Riot ID</label>
            <input type="text" value={player3} onChange={(e) => setPlayer3(e.target.value)} required placeholder="Name#Tag" className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bebas tracking-wider text-brand-dark text-sm">Player 4 Riot ID</label>
            <input type="text" value={player4} onChange={(e) => setPlayer4(e.target.value)} required placeholder="Name#Tag" className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bebas tracking-wider text-brand-dark text-sm">Player 5 Riot ID</label>
          <input type="text" value={player5} onChange={(e) => setPlayer5(e.target.value)} required placeholder="Name#Tag" className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[#ff4655]" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 bg-[#ff4655] hover:bg-[#e03846] text-brand-light font-bebas text-lg tracking-widest py-3.5 transition-all uppercase cursor-pointer disabled:opacity-50"
        >
          {loading ? 'SAVING ROSTER...' : 'FINISH REGISTRATION'}
        </button>
      </form>
    </div>
  );
}