import { Match } from "@/types/bracket";

export const SERIES_CONFIG: Record<Match["round"], { maxScore: number; maxTotalSum: number }> = {
  r64: { maxScore: 1, maxTotalSum: 1 },
  r32: { maxScore: 1, maxTotalSum: 1 },
  r16: { maxScore: 1, maxTotalSum: 1 },
  qf: { maxScore: 2, maxTotalSum: 3 },
  sf: { maxScore: 2, maxTotalSum: 3 },
  final: { maxScore: 3, maxTotalSum: 5 },
};

// Automated winner propagation down the bracket tree
export const propagateWinners = (currentMatches: Match[]): Match[] => {
  const updated = [...currentMatches];
  const getWinnerName = (m?: Match) => 
    m?.team1.isWinner ? m.team1.name : m?.team2.isWinner ? m.team2.name : "TBD";

  ["left", "right"].forEach((sideVal) => {
    const side = sideVal as "left" | "right";
    const getByRound = (round: Match["round"]) => updated.filter(m => m.round === round && m.side === side);

    const r64 = getByRound("r64");
    getByRound("r32").forEach((target, i) => {
      target.team1.name = getWinnerName(r64[i * 2]);
      target.team2.name = getWinnerName(r64[i * 2 + 1]);
    });

    const r32 = getByRound("r32");
    getByRound("r16").forEach((target, i) => {
      target.team1.name = getWinnerName(r32[i * 2]);
      target.team2.name = getWinnerName(r32[i * 2 + 1]);
    });

    const r16 = getByRound("r16");
    getByRound("qf").forEach((target, i) => {
      target.team1.name = getWinnerName(r16[i * 2]);
      target.team2.name = getWinnerName(r16[i * 2 + 1]);
    });

    const qf = getByRound("qf");
    const sf = updated.find(m => m.round === "sf" && m.side === side);
    if (sf) {
      sf.team1.name = getWinnerName(qf[0]);
      sf.team2.name = getWinnerName(qf[1]);
    }
  });

  const finalMatch = updated.find(m => m.round === "final");
  const leftSF = updated.find(m => m.round === "sf" && m.side === "left");
  const rightSF = updated.find(m => m.round === "sf" && m.side === "right");
  if (finalMatch) {
    finalMatch.team1.name = getWinnerName(leftSF);
    finalMatch.team2.name = getWinnerName(rightSF);
  }

  return updated;
};