import { account, databases, DB_ID, TEAMS_TABLE_ID, ID } from "@/lib/appwrite";
import { Query } from "appwrite";

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

  if (response.documents.length === 0) {
    throw new Error("Account found, but team roster is missing. Please complete your registration.");
  }

  return { redirectPath: "/" };
}

// --- REGISTRATION & ROSTER SERVICES ---
export async function registerUser(email: string, pass: string, name: string): Promise<string> {
  const cleanName = name.trim();
  const newAccount = await account.create(ID.unique(), email, pass, cleanName);
  await account.createEmailPasswordSession(email, pass);
  return newAccount.$id;
}

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

export async function checkUserTeamExists(userId: string): Promise<boolean> {
  const response = await databases.listDocuments(
    DB_ID,
    TEAMS_TABLE_ID,
    [Query.equal("userId", userId)]
  );
  return response.documents.length > 0;
}