"use client";

import { Match } from "@/types/bracket";

interface MatchEditorRowProps {
  match: Match;
  maxScore: number;
  maxTotalSum: number;
  registeredTeams: string[];
  onUpdate: (matchId: string, teamNum: 1 | 2, field: "name" | "score", value: string | number) => void;
}

export default function MatchEditorRow({
  match,
  maxScore,
  maxTotalSum,
  registeredTeams,
  onUpdate,
}: MatchEditorRowProps) {
  const isR64 = match.round === "r64";

  const renderTeamControl = (teamNum: 1 | 2) => {
    const team = teamNum === 1 ? match.team1 : match.team2;
    const scoreColor = teamNum === 1 ? "text-brand-red" : "text-brand-light";

    return (
      <div className={`flex items-center gap-3 w-full md:w-5/12 ${teamNum === 1 ? "justify-end" : "justify-start"}`}>
        {teamNum === 2 && (
          <ScoreStepper
            score={team.score ?? 0}
            maxScore={maxScore}
            maxTotalSum={maxTotalSum}
            currentOtherScore={match.team1.score ?? 0}
            onScoreChange={(newVal) => onUpdate(match.id, 2, "score", newVal)}
          />
        )}

        {isR64 ? (
          <select
            value={team.name}
            onChange={(e) => onUpdate(match.id, teamNum, "name", e.target.value)}
            className="bg-brand-cards border border-brand-light/20 text-brand-light text-xs py-2 px-3 outline-none focus:border-brand-red w-full max-w-[200px] cursor-pointer"
          >
            <option value="TBD">TBD</option>
            {registeredTeams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        ) : (
          <div className="bg-brand-cards/50 border border-brand-light/10 text-brand-light/80 text-xs py-2 px-3 w-full max-w-[200px] truncate">
            {team.name}
          </div>
        )}

        {teamNum === 1 && (
          <ScoreStepper
            score={team.score ?? 0}
            maxScore={maxScore}
            maxTotalSum={maxTotalSum}
            currentOtherScore={match.team2.score ?? 0}
            onScoreChange={(newVal) => onUpdate(match.id, 1, "score", newVal)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-brand-dark border border-brand-light/10 p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
      <span className="font-mono text-xs text-brand-light/40 w-24">ID: {match.id}</span>
      {renderTeamControl(1)}
      <span className="font-bebas text-brand-light/30 text-xl">VS</span>
      {renderTeamControl(2)}
    </div>
  );
}

function ScoreStepper({
  score,
  maxScore,
  maxTotalSum,
  currentOtherScore,
  onScoreChange,
}: {
  score: number;
  maxScore: number;
  maxTotalSum: number;
  currentOtherScore: number;
  onScoreChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center bg-brand-cards border border-brand-light/20 overflow-hidden shrink-0">
      <button
        type="button"
        onClick={() => onScoreChange(Math.max(0, score - 1))}
        className="w-8 h-9 flex items-center justify-center text-brand-light/70 hover:text-brand-light hover:bg-white/15 transition cursor-pointer select-none font-bold"
      >
        -
      </button>
      <input
        type="number"
        value={score}
        onChange={(e) => onScoreChange(e.target.value === "" ? 0 : Number(e.target.value))}
        min={0}
        max={maxScore}
        className="w-12 bg-transparent text-brand-light font-bebas text-lg text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => {
          if (score < maxScore && score + currentOtherScore < maxTotalSum) {
            onScoreChange(score + 1);
          }
        }}
        className="w-8 h-9 flex items-center justify-center text-brand-light/70 hover:text-brand-light hover:bg-white/15 transition cursor-pointer select-none font-bold"
      >
        +
      </button>
    </div>
  );
}