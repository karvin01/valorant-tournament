import { Client, Account, Databases, Storage, ID } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

// Table, Database & Storage configuration constants
export const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const TEAMS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_TEAMS_TABLE_ID!;
export const BRACKETS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_BRACKETS_TABLE_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

// admin checks
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const user = await account.get();
    console.log("Current Logged In User:", user);
    console.log("User Preferences:", user.prefs);

    // Check if prefs exists and contains isAdmin as true or "true"
    return Boolean(user.prefs && (user.prefs.isAdmin === true || user.prefs.isAdmin === "true"));
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}