import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// 1. TYPESCRIPT INTERFACES
// ============================================================================
// We define the shape of the data coming from the Henrik API.
// This prevents the ESLint "Unexpected any" error and gives us proper autocomplete.
interface MatchItem {
  stats?: {
    kills?: number;
    deaths?: number;
    character?: {
      name?: string;
    };
    team?: string;
  };
  teams?: Record<string, { has_won?: boolean }>;
}

// ============================================================================
// 2. IN-MEMORY RATE LIMITER
// ============================================================================
// This Map stores the IP addresses of users hitting this API.
// If a single IP makes more than 20 requests within 1 minute, they get blocked.
// This prevents someone from writing a script to spam your endpoint and burn your API quota.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 20; // Maximum requests allowed per time window
const WINDOW_MS = 60 * 1000; // Time window (1 minute in milliseconds)

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  // If the user is new, or their 1-minute timeout has expired, reset their count
  if (!userLimit || now - userLimit.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  // If they have made 20 or more requests inside the 1-minute window, block them
  if (userLimit.count >= RATE_LIMIT) {
    return false; 
  }

  // Otherwise, increase their request count and let them through
  userLimit.count += 1;
  return true;
}

// ============================================================================
// 3. MAIN GET REQUEST HANDLER
// ============================================================================
export async function GET(request: NextRequest) {
  
  // --- A. Rate Limit Execution ---
  // We grab the user's IP address (from headers if deployed on Vercel/Render, or fallback to 'anonymous')
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!checkRateLimit(ip)) {
    // Return a 429 Too Many Requests status if they are spamming
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // --- B. API Key Verification ---
  // Ensure we actually have the secret key loaded from our .env file to talk to Henrik API
  const apiKey = process.env.HENRIK_VALORANT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API Key configuration" }, { status: 500 });
  }

  // --- C. URL Parameter Parsing ---
  // Extract the ?name=...&tag=... variables from the URL the frontend sent us
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const tag = searchParams.get("tag");
  const region = searchParams.get("region") || "eu"; // Default to EU if no region is provided

  // --- D. Input Validation ---
  // If the frontend didn't send a name or tag, stop here.
  if (!name || !tag) {
    return NextResponse.json(
      { error: "Player name and tag are required." },
      { status: 400 }
    );
  }

  try {
    const headers = { Authorization: apiKey };

    // --- E. Fetching Data with CACHING ---
    // We fetch both MMR (rank) and Recent Matches at the exact same time using Promise.all
    // The `next: { revalidate: 3600 }` tells Next.js to save this exact response for 1 Hour.
    // If someone clicks this same player again in the next hour, Next.js serves the saved copy instantly.
    const [mmrRes, matchesRes] = await Promise.all([
      fetch(
        `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
        { headers, next: { revalidate: 3600 } } 
      ),
      fetch(
        `https://api.henrikdev.xyz/valorant/v1/stored-matches/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?mode=competitive&size=10`,
        { headers, next: { revalidate: 3600 } } 
      ),
    ]);

    // Parse the JSON coming back from Henrik
    const mmrData = await mmrRes.json();
    const matchesData = await matchesRes.json();

    // --- F. Rank Data Extraction ---
    // Safely pull out the rank name, icon URL, and RR (Rank Rating). Fallback to "Unrated" if null.
    const rankName = mmrData.data?.currenttierpatched ?? "Unrated";
    const rankIcon = mmrData.data?.images?.large ?? null;
    const rankingInTier = mmrData.data?.ranking_in_tier ?? 0;

    // --- G. Match Statistics Aggregation ---
    // We loop through the last 10 competitive matches to calculate K/D, winrate, and most played agent
    const matches = matchesData.data ?? [];
    let totalKills = 0;
    let totalDeaths = 0;
    let wins = 0;
    const agentCounts: Record<string, number> = {};

    matches.forEach((item: MatchItem) => {
      const stats = item.stats;
      const teams = item.teams;

      if (stats) {
        // Add up all kills and deaths
        totalKills += stats.kills || 0;
        totalDeaths += stats.deaths || 0;

        // Count how many times they played each agent
        const agent = stats.character?.name || "Unknown";
        agentCounts[agent] = (agentCounts[agent] || 0) + 1;

        // Check if the team they were on won the match
        const playerTeam = stats.team?.toLowerCase();
        if (teams && playerTeam && teams[playerTeam]?.has_won) {
          wins += 1;
        }
      }
    });

    // --- H. Final Math & Formatting ---
    const totalMatches = matches.length;
    // Calculate K/D (preventing division by zero)
    const kdRatio = totalDeaths > 0 ? (totalKills / totalDeaths).toFixed(2) : totalKills.toFixed(2);
    // Calculate winrate percentage
    const winrate = totalMatches > 0 ? `${Math.round((wins / totalMatches) * 100)}%` : "N/A";
    // Sort agents by how many times they were played, and pick the top one
    const mostPlayedAgent = Object.entries(agentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

    // --- I. Return Clean Data to Frontend ---
    // We package everything up into a clean, predictable object for the frontend to consume
    return NextResponse.json({
      name,
      tag,
      riotId: `${name}#${tag}`,
      rank: {
        name: rankName,
        icon: rankIcon,
        rr: rankingInTier,
      },
      stats: {
        kd: kdRatio,
        winrate,
        totalMatchesAnalyzed: totalMatches,
        mostPlayedAgent,
      },
    });

  } catch (error) {
    // --- J. Error Handling ---
    // If anything fails (network error, API down, etc.), catch it and return a 500 error
    return NextResponse.json({ error: "Failed to fetch player stats" }, { status: 500 });
  }
}