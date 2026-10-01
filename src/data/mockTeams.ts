import { Team } from "@/types/teams";

export const MOCK_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "Fnatic",
    seed: 1,
    logo: "/logos/fnc.png", // optional: can be omitted or left blank
    players: [
      { id: "p1", name: "Eldest", tag: "3738" },
      { id: "p2", name: "Derke", tag: "FNC" },
      { id: "p3", name: "Alfajer", tag: "FNC" },
      { id: "p4", name: "Chronicle", tag: "FNC" },
      { id: "p5", name: "crashies", tag: "NA" },
    ],
  },
  {
    id: "team-2",
    name: "Team Liquid",
    seed: 2,
    logo: "/logos/tl.png",
    players: [
      { id: "p6", name: "Jamppi", tag: "TL" },
      { id: "p7", name: "nAts", tag: "TL" },
      { id: "p8", name: "kamo", tag: "EU" },
      { id: "p9", name: "Keiko", tag: "TL" },
      { id: "p10", name: "patitek", tag: "EU" },
    ],
  },
  {
    id: "team-3",
    name: "Karmine Corp",
    seed: 3,
    logo: "/logos/kc.png",
    players: [
      { id: "p11", name: "Shin", tag: "KC" },
      { id: "p12", name: "marteen", tag: "KC" },
      { id: "p13", name: "tomaszy", tag: "KC" },
      { id: "p14", name: "saadhak", tag: "EU" },
      { id: "p15", name: "Avez", tag: "KC" },
    ],
  },
];