import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.HENRIK_VALORANT_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  // Read ?name=...&tag=...&region=... from the URL
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const tag = searchParams.get("tag");
  const region = searchParams.get("region") || "eu";

  if (!name || !tag) {
    return NextResponse.json(
      { error: "Player name and tag are required." },
      { status: 400 }
    );
  }

  try {
    const headers = { Authorization: apiKey };

    // Fetch Rank and Stored/Lifetime Matches simultaneously
    const [mmrRes, matchesRes] = await Promise.all([
      fetch(
        `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
        { headers }
      ),
      fetch(
        `https://api.henrikdev.xyz/valorant/v1/stored-matches/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?mode=competitive&size=10`,
        { headers }
      ),
    ]);

    const mmrData = await mmrRes.json();
    const matchesData = await matchesRes.json();

    // 1. Current Rank & Badge
    const rankName = mmrData.data?.currenttierpatched ?? "Unrated";
    const rankIcon = mmrData.data?.images?.large ?? null;
    const rankingInTier = mmrData.data?.ranking_in_tier ?? 0;

    // 2. Aggregate Recent Stats
    const matches = matchesData.data ?? [];
    let totalKills = 0;
    let totalDeaths = 0;
    let wins = 0;
    const agentCounts: Record<string, number> = {};

    matches.forEach((item: any) => {
      const stats = item.stats;
      const teams = item.teams;

      if (stats) {
        totalKills += stats.kills || 0;
        totalDeaths += stats.deaths || 0;

        const agent = stats.character?.name || "Unknown";
        agentCounts[agent] = (agentCounts[agent] || 0) + 1;

        const playerTeam = stats.team?.toLowerCase();
        if (teams && playerTeam && teams[playerTeam]?.has_won) {
          wins += 1;
        }
      }
    });

    const totalMatches = matches.length;
    const kdRatio = totalDeaths > 0 ? (totalKills / totalDeaths).toFixed(2) : totalKills.toFixed(2);
    const winrate = totalMatches > 0 ? `${Math.round((wins / totalMatches) * 100)}%` : "N/A";
    const mostPlayedAgent = Object.entries(agentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

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
    return NextResponse.json({ error: "Failed to fetch player stats" }, { status: 500 });
  }
}