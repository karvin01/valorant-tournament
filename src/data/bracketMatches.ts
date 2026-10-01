import { Match } from "@/types/bracket";

//loop to generate the actual starting array of all 63 placeholder match objects so it renders on screen
// Generates placeholder matches for any round
function createMatches(
  count: number,
  round: Match["round"],
  side: Match["side"],
  prefix: string
): Match[] {
  return Array.from({ length: count }, (_, idx) => ({
    id: `${prefix}-${idx + 1}`,
    round,
    side,
    status: "upcoming",
    team1: { name: "TBD" },
    team2: { name: "TBD" },
  }));
}

// Generate the 63-match scaffold
export const initialMatches: Match[] = [
  ...createMatches(16, "r64", "left", "l-64"),
  ...createMatches(8, "r32", "left", "l-32"),
  ...createMatches(4, "r16", "left", "l-16"),
  ...createMatches(2, "qf", "left", "l-qf"),
  ...createMatches(1, "sf", "left", "l-sf"),
  {
    id: "final-1",
    round: "final",
    side: "center",
    status: "upcoming",
    team1: { name: "TBD" },
    team2: { name: "TBD" },
  },
  ...createMatches(1, "sf", "right", "r-sf"),
  ...createMatches(2, "qf", "right", "r-qf"),
  ...createMatches(4, "r16", "right", "r-16"),
  ...createMatches(8, "r32", "right", "r-32"),
  ...createMatches(16, "r64", "right", "r-64"),
];