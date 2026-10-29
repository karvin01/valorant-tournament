import { Match } from "@/types/bracket";

/**
 * @file bracketUtils.ts
 * @description Tournament rules configuration and automatic winner advancement algorithm.
 */

/**
 * Series scoring configuration map enforcing score caps per round:
 * - r64, r32, r16: Best-of-1 (first to 1 win)
 * - qf, sf: Best-of-3 (first to 2 wins, max 3 games played)
 * - final: Best-of-5 (first to 3 wins, max 5 games played)
 */
export const SERIES_CONFIG: Record<Match["round"], { maxScore: number; maxTotalSum: number }> = {
  r64: { maxScore: 1, maxTotalSum: 1 },
  r32: { maxScore: 1, maxTotalSum: 1 },
  r16: { maxScore: 1, maxTotalSum: 1 },
  qf: { maxScore: 2, maxTotalSum: 3 },
  sf: { maxScore: 2, maxTotalSum: 3 },
  final: { maxScore: 3, maxTotalSum: 5 },
};

// Automated winner propagation down the bracket tree
/**
 * Cascades match winners forward into downstream rounds across both bracket wings.
 * Every two adjacent matches in a round feed their winners into Team 1 and Team 2 of the next round.
 *
 * @param currentMatches Current array of matches with latest scores
 * @returns A new array of matches with updated team progressions
 */
export const propagateWinners = (currentMatches: Match[]): Match[] => {
  const updated = [...currentMatches];

  // Helper resolving winner team name, defaulting to "TBD" if unplayed or tied
  const getWinnerName = (m?: Match) => 
    m?.team1.isWinner ? m.team1.name : m?.team2.isWinner ? m.team2.name : "TBD";

  // Process left and right bracket trees independently
  ["left", "right"].forEach((sideVal) => {
    const side = sideVal as "left" | "right";
    const getByRound = (round: Match["round"]) => updated.filter(m => m.round === round && m.side === side);

    // Propagate Round of 64 winners into Round of 32
    const r64 = getByRound("r64");
    getByRound("r32").forEach((target, i) => {
      target.team1.name = getWinnerName(r64[i * 2]);
      target.team2.name = getWinnerName(r64[i * 2 + 1]);
    });

    // Propagate Round of 32 winners into Round of 16
    const r32 = getByRound("r32");
    getByRound("r16").forEach((target, i) => {
      target.team1.name = getWinnerName(r32[i * 2]);
      target.team2.name = getWinnerName(r32[i * 2 + 1]);
    });

    // Propagate Round of 16 winners into Quarterfinals
    const r16 = getByRound("r16");
    getByRound("qf").forEach((target, i) => {
      target.team1.name = getWinnerName(r16[i * 2]);
      target.team2.name = getWinnerName(r16[i * 2 + 1]);
    });

    // Propagate Quarterfinal winners into Semifinals
    const qf = getByRound("qf");
    const sf = updated.find(m => m.round === "sf" && m.side === side);
    if (sf) {
      sf.team1.name = getWinnerName(qf[0]);
      sf.team2.name = getWinnerName(qf[1]);
    }
  });

  // Advance Semifinal A (left) and Semifinal B (right) winners into the Grand Final match
  const finalMatch = updated.find(m => m.round === "final");
  const leftSF = updated.find(m => m.round === "sf" && m.side === "left");
  const rightSF = updated.find(m => m.round === "sf" && m.side === "right");
  if (finalMatch) {
    finalMatch.team1.name = getWinnerName(leftSF);
    finalMatch.team2.name = getWinnerName(rightSF);
  }

  return updated;
};