import { Team } from "@/types/teams";

/**
 * @file mockTeams.ts
 * @description Static mock roster fixtures used for offline testing, UI styling, and development previews.
 * Mirrors the structure returned by the live Appwrite database teams collection.
 */
export const MOCK_TEAMS: Team[] = [
  // --- SEED 1 ---
  {
    id: "team-1",
    name: "Fnatic",
    seed: 1,
    logo: "/logos/fnc.png", // optional: can be omitted or left blank
    players: [
      { id: "p1", name: "Eldest", tag: "3738" }, // Captain
      { id: "p2", name: "peanits", tag: "huge" },
      { id: "p3", name: "Alfajer", tag: "FNC" },
      { id: "p4", name: "Chronicle", tag: "FNC" },
      { id: "p5", name: "crashies", tag: "NA" },
    ],
  },
  // --- SEED 2 ---
  {
    id: "team-2",
    name: "Team Liquid",
    seed: 2,
    logo: "/logos/tl.png",
    players: [
      { id: "p6", name: "Jamppi", tag: "TL" }, // Captain
      { id: "p7", name: "nAts", tag: "TL" },
      { id: "p8", name: "kamo", tag: "EU" },
      { id: "p9", name: "Keiko", tag: "TL" },
      { id: "p10", name: "patitek", tag: "EU" },
    ],
  },
  // --- SEED 3 ---
  {
    id: "team-3",
    name: "Karmine Corp",
    seed: 3,
    logo: "/logos/kc.png",
    players: [
      { id: "p11", name: "Shin", tag: "KC" }, // Captain
      { id: "p12", name: "marteen", tag: "KC" },
      { id: "p13", name: "tomaszy", tag: "KC" },
      { id: "p14", name: "saadhak", tag: "EU" },
      { id: "p15", name: "Avez", tag: "KC" },
    ],
  },
];