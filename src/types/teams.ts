export interface Player {
  id: string;
  name: string;        // Riot Name (e.g. "Boaster")
  tag: string;         // Tagline (e.g. "FNC")
}

export interface Team {
  id: string;
  name: string;
  seed: number;
  tag?: string;         // Short acronym (e.g. "FNC", "SEN")
  logo?: string;
  players: Player[];
}