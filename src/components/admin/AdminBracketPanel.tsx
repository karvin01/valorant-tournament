"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkIsAdmin } from "@/lib/appwrite";
import { initialMatches } from "@/data/bracketMatches";
import { Match } from "@/types/bracket";
import { SERIES_CONFIG, propagateWinners } from "@/lib/bracketUtils";
import { fetchRegisteredTeams, fetchBracketData, saveBracketData } from "@/lib/bracketService";
import MatchEditorRow from "@/components/admin/MatchEditorRow";

export default function AdminBracketPanel() {
  const router = useRouter();

  // --- COMPONENT STATE ---
  // Tracks client-side verification and data loading state
  const [loading, setLoading] = useState(true);
  // Authorization flag confirming user has admin privileges
  const [isAdmin, setIsAdmin] = useState(false);
  // Full tournament match tree stored in local memory during editing
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  // Array of registered team names retrieved from Appwrite to populate initial R64 slots
  const [registeredTeams, setRegisteredTeams] = useState<string[]>([]);
  // Active round tab filter (r64, r32, r16, qf, sf, final)
  const [selectedRound, setSelectedRound] = useState<Match["round"]>("r64");
  // Bracket side filter to divide large views (left vs right bracket halves, center for final)
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | "center">("left");
  // Loading flag for network mutations (save / reset)
  const [saving, setSaving] = useState(false);

  // --- AUTH CHECK & DATA PREFETCH ---
  // Verifies admin permissions via Appwrite and concurrently loads initial team and bracket records
  useEffect(() => {
    async function verifyAndLoad() {
      try {
        // Enforce admin permission; kick unauthenticated or unauthorized users to home
        if (!(await checkIsAdmin())) {
          router.push("/");
          return;
        }
        setIsAdmin(true);

        // Concurrently fetch registered teams and saved bracket state to minimize initial load time
        const [teams, bracket] = await Promise.all([
          fetchRegisteredTeams(),
          fetchBracketData(),
        ]);

        setRegisteredTeams(teams);
        setMatches(bracket);
      } catch (err) {
        console.error("Failed to load admin panel data:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    verifyAndLoad();
  }, [router]);

  // --- MATCH UPDATE & SCORE VALIDATION ---
  // Updates team names or scores and cascades winning team advancements to subsequent rounds
  const handleMatchUpdate = (matchId: string, teamNum: 1 | 2, field: "name" | "score", value: string | number) => {
    setMatches((prev) => {
      const nextMatches = prev.map((match) => {
        if (match.id !== matchId) return match;

        let processedValue = value;
        const config = SERIES_CONFIG[match.round];

        // Ensure score input obeys match format bounds (BO1, BO3, BO5)
        if (field === "score" && typeof value === "number") {
          // Clamp score to non-negative value within series max win threshold
          processedValue = Math.max(0, Math.min(value, config.maxScore));
          const otherKey = teamNum === 1 ? "team2" : "team1";
          const otherScore = typeof match[otherKey].score === "number" ? match[otherKey].score : 0;

          // Prevent total played games from exceeding max possible matches in the series
          if (Number(processedValue) + otherScore > config.maxTotalSum) {
            processedValue = Math.max(0, config.maxTotalSum - otherScore);
          }
        }

        // Apply updated field to targeted team object
        const targetKey = teamNum === 1 ? "team1" : "team2";
        const updatedMatch = {
          ...match,
          [targetKey]: { ...match[targetKey], [field]: processedValue },
        };

        const s1 = targetKey === "team1" ? Number(processedValue) : match.team1.score;
        const s2 = targetKey === "team2" ? Number(processedValue) : match.team2.score;

        // Evaluate win conditions: a team wins when hitting maxScore while opponent has strictly fewer wins
        if (s1 !== undefined && s2 !== undefined) {
          const winScore = config.maxScore;
          updatedMatch.team1.isWinner = s1 === winScore && s2 < winScore;
          updatedMatch.team2.isWinner = s2 === winScore && s1 < winScore;
        } else {
          updatedMatch.team1.isWinner = false;
          updatedMatch.team2.isWinner = false;
        }

        return updatedMatch;
      });

      // Automatically propagate declared winners forward into their downstream bracket slots
      return propagateWinners(nextMatches);
    });
  };

  // --- DATABASE OPERATIONS ---
  // Resets bracket to blank seed template and persists the change to Appwrite
  const handleResetBracket = async () => {
    if (!window.confirm("Are you sure you want to reset the entire bracket?")) return;
    setSaving(true);
    try {
      setMatches(initialMatches);
      await saveBracketData(initialMatches);
      router.refresh();
      alert("Bracket successfully reset and saved!");
    } catch (err) {
      alert("Failed to reset bracket in database.");
    } finally {
      setSaving(false);
    }
  };

  // Persists current bracket state and scores to Appwrite database
  const handleSaveBracket = async () => {
    setSaving(true);
    try {
      await saveBracketData(matches);
      router.refresh();
      alert("Bracket saved to Appwrite successfully!");
    } catch (err) {
      alert("Error saving bracket.");
    } finally {
      setSaving(false);
    }
  };

  // Render auth verification placeholder while Appwrite checks user session
  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-100px)] bg-brand-cards flex items-center justify-center">
        <span className="font-bebas text-2xl text-brand-light tracking-wider">VERIFYING ADMIN PRIVILEGES...</span>
      </div>
    );
  }

  // Prevent flash of admin interface if session check fails
  if (!isAdmin) return null;

  // Filter visible matches based on currently active round tab and bracket half
  const filteredMatches = matches.filter((m) => m.round === selectedRound && (selectedRound === "final" || m.side === selectedSide));
  const config = SERIES_CONFIG[selectedRound];
  const seriesType = config.maxScore === 1 ? "Best-of-1 (Scores 0-1)" : config.maxScore === 2 ? "Best-of-3 (Scores 0-2)" : "Best-of-5 (Scores 0-3)";

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-dark border border-brand-light/10 p-6 shadow-xl">
        <div>
          <span className="text-brand-red font-bebas text-sm tracking-widest uppercase">Admin Control Panel</span>
          <h1 className="font-bebas text-3xl sm:text-4xl text-brand-light tracking-wide uppercase">Bracket Management</h1>
          <span className="text-xs text-brand-light/60 font-inter">{selectedRound.toUpperCase()} Round: {seriesType}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleResetBracket} type="button" className="px-5 py-2.5 bg-brand-cards border border-brand-light/20 font-bebas text-base text-brand-light/80 hover:text-brand-light cursor-pointer">RESET</button>
          <button onClick={handleSaveBracket} disabled={saving} className="px-6 py-2.5 bg-brand-red font-bebas text-base text-brand-light tracking-wider hover:opacity-90 cursor-pointer">{saving ? "SAVING..." : "SAVE"}</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-brand-dark/50 p-3 border border-brand-light/10">
        {(["r64", "r32", "r16", "qf", "sf", "final"] as Match["round"][]).map((round) => (
          <button 
            key={round} 
            onClick={() => { 
              setSelectedRound(round); 
              // Finals match resides in the center rather than left or right bracket trees
              if (round === "final") setSelectedSide("center"); 
            }} 
            className={`px-4 py-2 font-bebas text-sm cursor-pointer ${selectedRound === round ? "bg-brand-red text-brand-light" : "bg-brand-cards text-brand-light/70 hover:text-brand-light"}`}
          >
            {round.toUpperCase()}
          </button>
        ))}
        {/* Bracket Side Toggle (Left vs Right half of tree) */}
        {selectedRound !== "final" && (
          <div className="ml-auto flex gap-2">
            {(["left", "right"] as const).map((side) => (
              <button key={side} onClick={() => setSelectedSide(side)} className={`px-3 py-2 font-inter text-xs font-semibold cursor-pointer ${selectedSide === side ? "bg-brand-light text-brand-dark" : "bg-brand-cards text-brand-light/70"}`}>
                {side.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Match List */}
      <div className="flex flex-col gap-4">
        {filteredMatches.map((match) => (
          <MatchEditorRow
            key={match.id}
            match={match}
            maxScore={config.maxScore}
            maxTotalSum={config.maxTotalSum}
            registeredTeams={registeredTeams}
            onUpdate={handleMatchUpdate}
          />
        ))}
      </div>
    </div>
  );
}