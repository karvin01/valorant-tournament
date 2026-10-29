/**
 * @file bracket.ts
 * @description Type definitions for tournament bracket nodes, series scoring, and team pairings.
 */

//defining what Match and Team must look like
// name isnt optional bcs there is TBD for the upcoming matches where we dont know who is gonna play them
export interface Team {
  /** Squad display name; defaults to "TBD" when the matchup is unseeded or waiting for prior round resolution */
  name: string;
  /** Series game wins accrued during the match (e.g., 0-1 for BO1, 0-2 for BO3, 0-3 for BO5) */
  score?: number;
  /** Boolean flag set when the squad reaches the required series threshold to advance */
  isWinner?: boolean;
}

//To target and filter specific cards in the tournament brackets
export interface Match {
  /** Deterministic match identifier (e.g., 'l-64-1', 'r-32-4', 'final-1') */
  id: string;
  /** Tournament stage filter specifying single-elimination tier */
  round: "r64" | "r32" | "r16" | "qf" | "sf" | "final";
  /** Spatial canvas positioning dividing bracket trees into left, right, and center championship columns */
  side: "left" | "right" | "center";
  /** Competitor in Slot 1 */
  team1: Team;
  /** Competitor in Slot 2 */
  team2: Team;
  /** Lifecycle progress state of the individual match */
  status: "upcoming" | "live" | "finished";
}