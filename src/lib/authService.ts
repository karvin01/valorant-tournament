import { account, databases, DB_ID, TEAMS_TABLE_ID, ID } from "@/lib/appwrite";
import { Query } from "appwrite";

/**
 * @file authService.ts
 * @description Handles user authentication lifecycle, registration, and roster management with Appwrite.
 */

/**
 * Authenticates a user with email and password, checks for admin privileges,
 * and determines the proper redirection path based on team registration status.
 *
 * @param email User's login email
 * @param pass User's account password
 * @returns Object containing the destination route path
 */
export async function loginUser(email: string, pass: string): Promise<{ redirectPath: string }> {
  // 0. Delete existing session if any to avoid collision errors
  try {
    await account.deleteSession("current");
  } catch {
    // No active session found, proceed
  }

  // 1. Create email/password session
  await account.createEmailPasswordSession(email, pass);

  // 2. Get user details
  const user = await account.get();

  // 3. ADMIN BYPASS: If admin, skip team roster check and go straight to admin panel
  const isAdmin = Boolean(
    user.prefs && (user.prefs.isAdmin === true || user.prefs.isAdmin === "true")
  );

  if (isAdmin) {
    return { redirectPath: "/admin/bracket" };
  }

  // 4. Regular players: Check if team roster exists in database
  const response = await databases.listDocuments(
    DB_ID,
    TEAMS_TABLE_ID,
    [Query.equal("userId", user.$id)]
  );

  // If a standard player has no associated squad document, require roster completion
  if (response.documents.length === 0) {
    throw new Error("Account found, but team roster is missing. Please complete your registration.");
  }

  return { redirectPath: "/" };
}

// --- REGISTRATION & ROSTER SERVICES ---

/**
 * Registers a new Appwrite account and immediately creates an active login session.
 *
 * @param email User email address
 * @param pass User chosen password
 * @param name User display name
 * @returns Newly created user ID string
 */
export async function registerUser(email: string, pass: string, name: string): Promise<string> {
  const cleanName = name.trim();
  // Create account record in Appwrite Auth
  const newAccount = await account.create(ID.unique(), email, pass, cleanName);
  // Automatically sign in to establish an active session token
  await account.createEmailPasswordSession(email, pass);
  return newAccount.$id;
}

/**
 * Persists a new team roster document linked to the authenticated user's ID.
 *
 * @param teamName The registered squad name
 * @param players Array of 5 player Riot ID strings (Format: Name#Tag)
 */
export async function saveTeamRoster(teamName: string, players: string[]): Promise<void> {
  const currentUser = await account.get();

  await databases.createDocument(
    DB_ID,
    TEAMS_TABLE_ID,
    ID.unique(),
    {
      userId: currentUser.$id,
      teamName: teamName.trim(),
      player1: players[0].trim(),
      player2: players[1].trim(),
      player3: players[2].trim(),
      player4: players[3].trim(),
      player5: players[4].trim(),
    }
  );
}

/**
 * Verifies whether a team document is already registered under the given user ID.
 *
 * @param userId Unique Appwrite user account ID
 * @returns True if a team record exists, otherwise false
 */
export async function checkUserTeamExists(userId: string): Promise<boolean> {
  const response = await databases.listDocuments(
    DB_ID,
    TEAMS_TABLE_ID,
    [Query.equal("userId", userId)]
  );
  return response.documents.length > 0;
}