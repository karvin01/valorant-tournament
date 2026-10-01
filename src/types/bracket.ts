//defining what Match and Team must look like
// name isnt optional bcs there is TBD for the upcoming matches where we dont know who is gonna play them
export interface Team {
  name: string;
  score?: number;
  isWinner?: boolean;
}

//To target and filter specific cards in the tournament brackets
export interface Match {
  id: string;
  round: "r64" | "r32" | "r16" | "qf" | "sf" | "final";
  side: "left" | "right" | "center";
  team1: Team;
  team2: Team;
  status: "upcoming" | "live" | "finished";
}