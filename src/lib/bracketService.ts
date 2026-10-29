import { databases, DB_ID, TEAMS_TABLE_ID } from "@/lib/appwrite";
import { initialMatches } from "@/data/bracketMatches";
import { Match } from "@/types/bracket";

/**
 * @file bracketService.ts
 * @description Database service layer responsible for loading registered squads,
 * fetching live bracket tournament states, and persisting admin updates to Appwrite.
 */

/**
 * Fetches the names of all registered teams from the database to seed initial matches.
 *
 * @returns Array of unique team name strings
 */
export async function fetchRegisteredTeams(): Promise<string[]> {
  const response = await databases.listDocuments(DB_ID, TEAMS_TABLE_ID);
  return response.documents
    .map((doc: unknown) => (doc as { teamName?: string }).teamName)
    .filter(Boolean) as string[];
}

/**
 * Retrieves the current tournament bracket layout and match progress from Appwrite.
 * Falls back to the default `initialMatches` scaffold if no document exists yet.
 *
 * @returns Array of Match objects representing all tournament rounds
 */
export async function fetchBracketData(): Promise<Match[]> {
  try {
    const response = await databases.listDocuments(DB_ID, "brackets");
    if (response.documents.length > 0) {
      const doc = response.documents[0];
      // Bracket tree is stored as a serialized JSON string in Appwrite
      if (doc && typeof doc.bracketData === "string") {
        return JSON.parse(doc.bracketData);
      }
    }
  } catch (error) {
    console.error("No existing bracket found, using defaults.", error);
  }
  return initialMatches;
}

/**
 * Saves the tournament bracket tree to Appwrite.
 * Updates the existing record if one exists, or creates a single document scaffold.
 *
 * @param matches Array of current Match records with scores and winner tags
 */
export async function saveBracketData(matches: Match[]): Promise<void> {
  const payload = { bracketData: JSON.stringify(matches) };
  const existingDocs = await databases.listDocuments(DB_ID, "brackets");

  if (existingDocs.documents.length > 0) {
    // Update existing tournament document
    await databases.updateDocument(DB_ID, "brackets", existingDocs.documents[0].$id, payload);
  } else {
    // Create new tournament root record if it doesn't exist
    await databases.createDocument(DB_ID, "brackets", "unique()", payload);
  }
}