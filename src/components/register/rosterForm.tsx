'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTeamRoster } from '@/lib/authService';

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

  const riotIdRegex = /^[a-zA-Z0-9]{3,16}#[a-zA-Z0-9]{3,5}$/;

  const handleSaveRoster = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedTeam = teamName.trim();
    if (trimmedTeam.length < 2 || trimmedTeam.length > 30) {
      setError('Team name must be between 2 and 30 characters.');
      return;
    }

    const players = [player1, player2, player3, player4, player5];
    for (let i = 0; i < players.length; i++) {
      if (!riotIdRegex.test(players[i].trim())) {
        setError(`Player ${i + 1} Riot ID is invalid. Format must be Name#Tag (e.g., Tenz#0001).`);
        return;
      }
    }

    setLoading(true);

    try {
      await saveTeamRoster(trimmedTeam, players);
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
      <h1 className="font-bebas text-4xl text-brand-dark tracking-wide mb-2 text-center">COMPLETE YOUR TEAM ROSTER</h1>
      <p className="font-inter text-sm text-gray-600 text-center mb-8">Enter your team name and all 5 player Riot IDs (with tags, e.g., Tenz#0001).</p>

      <form onSubmit={handleSaveRoster} className="flex flex-col gap-6">
        {error && <div className="bg-[brand-red]/10 border border-[brand-red] text-[brand-red] p-3 font-inter text-sm">{error}</div>}

        <div className="flex flex-col gap-2">
          <label htmlFor="roster-team" className="font-bebas tracking-wider text-brand-dark text-sm">Team Name</label>
          <input
            id="roster-team"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            maxLength={30}
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[brand-red]"
            placeholder="e.g. Sentinels"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="roster-p1" className="font-bebas tracking-wider text-brand-dark text-sm">Player 1 (Captain) Riot ID</label>
            <input
              id="roster-p1"
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              required
              placeholder="Name#Tag"
              maxLength={40}
              className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[brand-red]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="roster-p2" className="font-bebas tracking-wider text-brand-dark text-sm">Player 2 Riot ID</label>
            <input
              id="roster-p2"
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              required
              placeholder="Name#Tag"
              maxLength={40}
              className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[brand-red]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="roster-p3" className="font-bebas tracking-wider text-brand-dark text-sm">Player 3 Riot ID</label>
            <input
              id="roster-p3"
              type="text"
              value={player3}
              onChange={(e) => setPlayer3(e.target.value)}
              required
              placeholder="Name#Tag"
              maxLength={40}
              className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[brand-red]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="roster-p4" className="font-bebas tracking-wider text-brand-dark text-sm">Player 4 Riot ID</label>
            <input
              id="roster-p4"
              type="text"
              value={player4}
              onChange={(e) => setPlayer4(e.target.value)}
              required
              placeholder="Name#Tag"
              maxLength={40}
              className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[brand-red]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roster-p5" className="font-bebas tracking-wider text-brand-dark text-sm">Player 5 Riot ID</label>
          <input
            id="roster-p5"
            type="text"
            value={player5}
            onChange={(e) => setPlayer5(e.target.value)}
            required
            placeholder="Name#Tag"
            maxLength={40}
            className="bg-white border border-gray-300 text-brand-dark px-4 py-3 font-inter text-sm focus:outline-none focus:border-[brand-red]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-[brand-red] hover:bg-[#e03846] text-brand-light font-bebas text-lg tracking-widest py-3.5 transition-all uppercase cursor-pointer disabled:opacity-50"
        >
          {loading ? 'SAVING ROSTER...' : 'FINISH REGISTRATION'}
        </button>
      </form>
    </div>
  );
}