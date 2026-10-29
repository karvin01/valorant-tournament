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
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [registeredTeams, setRegisteredTeams] = useState<string[]>([]);
  const [selectedRound, setSelectedRound] = useState<Match["round"]>("r64");
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | "center">("left");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function verifyAndLoad() {
      try {
        if (!(await checkIsAdmin())) {
          router.push("/");
          return;
        }
        setIsAdmin(true);

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

  const handleMatchUpdate = (matchId: string, teamNum: 1 | 2, field: "name" | "score", value: string | number) => {
    setMatches((prev) => {
      const nextMatches = prev.map((match) => {
        if (match.id !== matchId) return match;

        let processedValue = value;
        const config = SERIES_CONFIG[match.round];

        if (field === "score" && typeof value === "number") {
          processedValue = Math.max(0, Math.min(value, config.maxScore));
          const otherKey = teamNum === 1 ? "team2" : "team1";
          const otherScore = typeof match[otherKey].score === "number" ? match[otherKey].score : 0;

          if (Number(processedValue) + otherScore > config.maxTotalSum) {
            processedValue = Math.max(0, config.maxTotalSum - otherScore);
          }
        }

        const targetKey = teamNum === 1 ? "team1" : "team2";
        const updatedMatch = {
          ...match,
          [targetKey]: { ...match[targetKey], [field]: processedValue },
        };

        const s1 = targetKey === "team1" ? Number(processedValue) : match.team1.score;
        const s2 = targetKey === "team2" ? Number(processedValue) : match.team2.score;

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

      return propagateWinners(nextMatches);
    });
  };

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

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-100px)] bg-brand-cards flex items-center justify-center">
        <span className="font-bebas text-2xl text-brand-light tracking-wider">VERIFYING ADMIN PRIVILEGES...</span>
      </div>
    );
  }

  if (!isAdmin) return null;

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
          <button key={round} onClick={() => { setSelectedRound(round); if (round === "final") setSelectedSide("center"); }} className={`px-4 py-2 font-bebas text-sm cursor-pointer ${selectedRound === round ? "bg-brand-red text-brand-light" : "bg-brand-cards text-brand-light/70 hover:text-brand-light"}`}>
            {round.toUpperCase()}
          </button>
        ))}
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