import { Match } from "@/types/bracket";

/**
 * @file bracketMatches.ts
 * @description Generates the baseline 64-team single-elimination tournament bracket scaffold.
 * Contains 63 total matches organized into symmetrical left and right wings converging on the Grand Final.
 */

//loop to generate the actual starting array of all 63 placeholder match objects so it renders on screen
// Generates placeholder matches for any round
/**
 * Factory helper function generating placeholder Match records with consistent ID formatting.
 *
 * @param count Number of matches to generate for the round/side
 * @param round Bracket stage (r64, r32, r16, qf, sf, final)
 * @param side Spatial wing positioning (left, right, center)
 * @param prefix Unique identifier prefix used for match ID keying
 */
function createMatches(
  count: number,
  round: Match["round"],
  side: Match["side"],
  prefix: string
): Match[] {
  return Array.from({ length: count }, (_, idx) => ({
    // Format: prefix-1, prefix-2, etc. (e.g. l-64-1, r-32-4)
    id: `${prefix}-${idx + 1}`,
    round,
    side,
    status: "upcoming",
    // Unseeded initial slots default to TBD
    team1: { name: "TBD" },
    team2: { name: "TBD" },
  }));
}

// Generate the 63-match scaffold
/**
 * Default tournament structure containing all 63 match nodes across both bracket halves:
 * - Left Wing: 16 (R64) + 8 (R32) + 4 (R16) + 2 (QF) + 1 (SF) = 31 matches
 * - Center: 1 (Grand Final) = 1 match
 * - Right Wing: 1 (SF) + 2 (QF) + 4 (R16) + 8 (R32) + 16 (R64) = 31 matches
 * Total: 63 matches for a full 64-team single-elimination bracket.
 */
export const initialMatches: Match[] = [
  // --- LEFT BRACKET WING ---
  ...createMatches(16, "r64", "left", "l-64"),
  ...createMatches(8, "r32", "left", "l-32"),
  ...createMatches(4, "r16", "left", "l-16"),
  ...createMatches(2, "qf", "left", "l-qf"),
  ...createMatches(1, "sf", "left", "l-sf"),

  // --- CENTER GRAND FINAL ---
  {
    id: "final-1",
    round: "final",
    side: "center",
    status: "upcoming",
    team1: { name: "TBD" },
    team2: { name: "TBD" },
  },

  // --- RIGHT BRACKET WING ---
  ...createMatches(1, "sf", "right", "r-sf"),
  ...createMatches(2, "qf", "right", "r-qf"),
  ...createMatches(4, "r16", "right", "r-16"),
  ...createMatches(8, "r32", "right", "r-32"),
  ...createMatches(16, "r64", "right", "r-64"),
];