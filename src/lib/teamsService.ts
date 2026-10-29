import { databases, storage, DB_ID, TEAMS_TABLE_ID, BUCKET_ID } from "@/lib/appwrite";
import { Team, Player } from "@/types/teams";
import { Models, Permission, Role, ID, Query } from "appwrite";


export interface TeamDocument extends Models.Document {
  teamName: string;
  userId: string;
  logoUrl?: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  player5: string;
}

export function parsePlayer(playerString: string, docId: string, index: number): Player {
  if (!playerString) return { id: `${docId}-p${index}`, name: 'Unknown', tag: '0000' };
  const parts = playerString.split('#');
  return {
    id: `${docId}-p${index}`,
    name: parts[0] || 'Unknown',
    tag: parts[1] || '0000',
  };
}

export async function fetchAllTeams(): Promise<Team[]> {
  const response = await databases.listDocuments(DB_ID, TEAMS_TABLE_ID);

  return response.documents.map((doc) => {
    const typedDoc = doc as unknown as TeamDocument;
    return {
      id: typedDoc.$id,
      name: typedDoc.teamName || 'Unnamed Team',
      logo: typedDoc.logoUrl || '/images/Header_logo_valo_small.png',
      seed: 1,
      players: [
        parsePlayer(typedDoc.player1, typedDoc.$id, 1),
        parsePlayer(typedDoc.player2, typedDoc.$id, 2),
        parsePlayer(typedDoc.player3, typedDoc.$id, 3),
        parsePlayer(typedDoc.player4, typedDoc.$id, 4),
        parsePlayer(typedDoc.player5, typedDoc.$id, 5),
      ],
    };
  });
}

export async function fetchUserTeam(userId: string): Promise<{ doc: TeamDocument; players: Player[] } | null> {
  const response = await databases.listDocuments(
    DB_ID,
    TEAMS_TABLE_ID,
    [Query.equal('userId', userId)]
  );

  if (response.documents.length === 0) return null;

  const doc = response.documents[0] as unknown as TeamDocument;
  const players: Player[] = [
    parsePlayer(doc.player1, doc.$id, 1),
    parsePlayer(doc.player2, doc.$id, 2),
    parsePlayer(doc.player3, doc.$id, 3),
    parsePlayer(doc.player4, doc.$id, 4),
    parsePlayer(doc.player5, doc.$id, 5),
  ];

  return { doc, players };
}

export async function uploadTeamLogo(teamId: string, file: File): Promise<string> {
  const uploadedFile = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    file,
    [Permission.read(Role.any())]
  );

  const fileUrl = storage.getFileView(BUCKET_ID, uploadedFile.$id);

  await databases.updateDocument(
    DB_ID,
    TEAMS_TABLE_ID,
    teamId,
    { logoUrl: fileUrl }
  );

  return fileUrl;
}