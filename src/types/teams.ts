/**
 * @file teams.ts
 * @description Type definitions for competitor entities, Riot ID profiles, and registered team rosters.
 */

export interface Player {
  /** Unique composite identifier (e.g., `${docId}-p${index}`) */
  id: string;
  /** In-game summoner / player handle parsed before the '#' symbol */
  name: string;        // Riot Name (e.g. "Boaster")
  /** Numerical or regional tagline parsed after the '#' symbol */
  tag: string;         // Tagline (e.g. "FNC")
}

export interface Team {
  /** Unique Appwrite document identifier */
  id: string;
  /** Squad organization or team roster title */
  name: string;
  /** Initial seeding rank within the tournament structure */
  seed: number;
  /** Optional shorthand squad tag or initials */
  tag?: string;         // Short acronym (e.g. "FNC", "SEN")
  /** Storage bucket URL or fallback asset path for the team emblem */
  logo?: string;
  /** Exactly 5 parsed player profiles composing the competitive roster */
  players: Player[];
}