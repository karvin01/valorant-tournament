import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite API Endpoint
    .setProject('6acccd7500222ca47334'); // Project ID from the Appwrite dashboard

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';

// Table & Database configuration constants
export const DB_ID = '6accd37d00265e8e3afd';
export const TEAMS_TABLE_ID = '6accd3a5002a4ed4b00e';


// admin checks
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const user = await account.get();
    // Check if the user's prefs contain isAdmin: true
    return user.prefs && user.prefs.isAdmin === true;
  } catch (error) {
    // If not logged in or an error occurs, they are not an admin
    return false;
  }
}