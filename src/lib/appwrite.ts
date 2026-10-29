import { Client, Account, Databases, Storage, ID } from 'appwrite';

/**
 * @file appwrite.ts
 * @description Central Appwrite Web SDK client configuration and global service instances.
 * Configures database, storage, and authentication clients targeting Appwrite Cloud.
 */

// Initialize primary Appwrite client instance
export const client = new Client();

// Bind API endpoint and Project ID from environment variables
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); 

// Instantiate modular Appwrite service interfaces bound to the configured client
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
/**
 * Verifies whether the actively logged-in user possesses admin authorization.
 * Inspects user preferences for `isAdmin`, handling both boolean and stringified representations.
 *
 * @returns {Promise<boolean>} True if user is logged in and has admin privileges; otherwise false.
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    // Retrieve current session user record from Appwrite
    const user = await account.get();
    console.log("SUCCESS - Logged in user:", user.name, user.email);
    console.log("SUCCESS - User preferences:", user.prefs);

    // Validate admin flag; supports both boolean true and string "true" from Appwrite console inputs
    const isAdmin = Boolean(user.prefs && (user.prefs.isAdmin === true || user.prefs.isAdmin === "true"));
    console.log("Is Admin evaluated to:", isAdmin);
    
    return isAdmin;
  } catch (error) {
    // Fails safely if user is unauthenticated or session has expired
    console.error("Auth check failed with error:", error);
    return false;
  }
}