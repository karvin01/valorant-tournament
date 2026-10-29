/**
 * @file tournamentData.ts
 * @description Centralized configuration data for the tournament info page, containing
 * eligibility requirements, technical guidelines, and official stage scheduling dates.
 */

/**
 * Array of requirement categories rendered inside the TournamentRequirements component.
 * Configured with title headers, criteria checklists, and optional Discord integration badges.
 */
export const REQUIREMENT_CARDS = [
  // Competitive Rank & Account Integrity Requirements
  {
    title: "RANK REQUIREMENTS",
    items: ["Minimal rank: Ascendant 1", "Minimum of 50 games on the account", "No recent bans"],
  },
  // Age & Legal Consent Requirements
  {
    title: "AGE REQUIREMENTS",
    items: ["Minimal age of 16", "Players under 18 must have parental consent"],
  },
  // Regional Server & Latency Constraints
  {
    title: "REGION",
    items: ["Match server: EU Central 1 (Frankfurt)", "All team members must have under 100ping on tournament server"],
  },
  // Mandatory Check-in & Discord Automation
  {
    title: "DISCORD CHECK-IN",
    items: ["Every team member mandatory on Discord", "Complete VCS_Bot account verification before roster lock."],
    hasDiscordIcon: true,
  },
];

/**
 * Chronological timeline phases rendered in the TournamentSchedule component.
 * Maps out the tournament path from initial open qualifiers to the grand championship final.
 */
export const SCHEDULE_STAGES = [
  // Stage 1: Round of 64 Open Qualifiers
  {
    stage: "Stage 1",
    desc: "Open qualifiers BO1",
    date: "21st November",
  },
  // Stage 2: Round of 32 & Round of 16 Open Qualifiers
  {
    stage: "Stage 2",
    desc: "Open qualifiers BO1",
    date: "28th November",
  },
  // Stage 3: Top-8 Quarterfinal Series
  {
    stage: "Stage 3",
    desc: "Quarterfinals (TOP 16)",
    date: "4th December",
  },
  // Stage 4: Top-4 Semifinal Series
  {
    stage: "Stage 4",
    desc: "Semifinals (TOP 4)",
    date: "5th December",
  },
  // Stage 5: Grand Championship Final (Best of 5)
  {
    stage: "Stage 5",
    desc: "Finals BO5",
    date: "6th December",
  },
];