import { databases, DB_ID, TEAMS_TABLE_ID } from "@/lib/appwrite";
import { initialMatches } from "@/data/bracketMatches";
import { Match } from "@/types/bracket";

export async function fetchRegisteredTeams(): Promise<string[]> {
  const response = await databases.listDocuments(DB_ID, TEAMS_TABLE_ID);
  return response.documents
    .map((doc: unknown) => (doc as { teamName?: string }).teamName)
    .filter(Boolean) as string[];
}

export async function fetchBracketData(): Promise<Match[]> {
  try {
    const response = await databases.listDocuments(DB_ID, "brackets");
    if (response.documents.length > 0) {
      const doc = response.documents[0];
      if (doc && typeof doc.bracketData === "string") {
        return JSON.parse(doc.bracketData);
      }
    }
  } catch (error) {
    console.error("No existing bracket found, using defaults.", error);
  }
  return initialMatches;
}

export async function saveBracketData(matches: Match[]): Promise<void> {
  const payload = { bracketData: JSON.stringify(matches) };
  const existingDocs = await databases.listDocuments(DB_ID, "brackets");

  if (existingDocs.documents.length > 0) {
    await databases.updateDocument(DB_ID, "brackets", existingDocs.documents[0].$id, payload);
  } else {
    await databases.createDocument(DB_ID, "brackets", "unique()", payload);
  }
}