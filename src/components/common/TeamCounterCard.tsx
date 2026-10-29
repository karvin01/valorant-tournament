"use client";

import { useState, useEffect } from "react";
import { databases, DB_ID, TEAMS_TABLE_ID } from "@/lib/appwrite";

export default function TeamCounterCard() {
  const [teamCount, setTeamCount] = useState<number>(0);
  const maxTeams = 64;

  useEffect(() => {
    async function fetchTeamCount() {
      try {
        const response = await databases.listDocuments(DB_ID, TEAMS_TABLE_ID);
        setTeamCount(response.total); // Appwrite returns total count of documents automatically
      } catch (error) {
        console.error("Failed to fetch registered teams count:", error);
      }
    }

    fetchTeamCount();
  }, []);

  // Calculate progress percentage for the bar (capped at 100%)
  const progressPercent = Math.min((teamCount / maxTeams) * 100, 100);

  return (
    <div className="flex flex-col w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden select-none shadow-md bg-brand-light">
      <div className="bg-brand-dark py-2.5 sm:py-3 text-center">
        <span className="font-bebas text-xl sm:text-2xl lg:text-button-lg tracking-wider text-brand-light uppercase">
          TEAMS
        </span>
      </div>
      <div className="bg-brand-bg flex-1 py-4 sm:py-6 px-4 sm:px-6 flex flex-col items-center justify-center gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-bebas text-3xl sm:text-4xl lg:text-button-lg text-brand-dark tracking-tight">
            {teamCount}/{maxTeams}
          </span>
          <span className="font-bebas text-xl sm:text-2xl text-brand-dark uppercase tracking-wider">
            TEAMS REGISTERED
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-brand-dark h-3.5 sm:h-4 overflow-hidden p-0.5">
          <div 
            className="bg-brand-red h-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}