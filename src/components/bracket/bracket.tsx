"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Match } from "@/types/bracket";
import { initialMatches } from "@/data/bracketMatches";
import { fetchBracketData } from "@/lib/bracketService";
import { useBracketScale } from "@/hooks/useBracketScale";
import CanvasControls from "@/components/bracket/CanvasControls";
import MatchCard from "@/components/bracket/MatchCard";

export default function BracketPage() {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const minScale = useBracketScale();

  useEffect(() => {
    async function loadBracket() {
      const data = await fetchBracketData();
      setMatches(data);
    }
    loadBracket();
  }, []);

  const getMatches = (round: Match["round"], side?: "left" | "right") =>
    matches.filter((m) => m.round === round && (!side || m.side === side));

  const grandFinal = matches.find((m) => m.round === "final");
  const championName = grandFinal?.team1.isWinner 
    ? grandFinal.team1.name 
    : grandFinal?.team2.isWinner 
    ? grandFinal.team2.name 
    : "TBD";

  const renderRound = (title: string, roundMatches: Match[]) => (
    <div className="flex flex-col justify-center gap-10">
      <h3 className="font-bebas text-xl text-center text-brand-light uppercase">{title}</h3>
      {roundMatches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );

  return (
    <main className="relative w-full h-[calc(100vh-100px)] overflow-hidden bg-brand-cards select-none">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image src="/images/bracketpics/VALORANT_logo4.jpg" alt="Background" fill priority className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-brand-dark/40" />
      </div>

      <TransformWrapper key={minScale} initialScale={minScale} minScale={minScale} maxScale={1.5} centerOnInit limitToBounds panning={{ velocityDisabled: true }} wheel={{ step: 0.02 }}>
        {() => (
          <>
            <CanvasControls />
            <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing z-10" contentClass="!w-fit !h-fit">
              <div className="w-[4400px] h-[2200px] flex items-center justify-between gap-12 px-20 select-none">
                
                {/* Left Side */}
                {renderRound("Round of 64", getMatches("r64", "left"))}
                {renderRound("Round of 32", getMatches("r32", "left"))}
                {renderRound("Round of 16", getMatches("r16", "left"))}
                {renderRound("Quarterfinals", getMatches("qf", "left"))}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Semifinal A</h3>
                  <MatchCard match={matches.find((m) => m.round === "sf" && m.side === "left")} />
                </div>

                {/* Center Grand Final */}
                <div className="flex flex-col justify-center items-center gap-10 px-8 pt-20">
                  <div className="text-center">
                    <span className="text-brand-red font-bebas text-lg tracking-widest uppercase">Championship</span>
                    <h2 className="font-bebas text-5xl text-brand-light tracking-wide uppercase">Grand Final</h2>
                  </div>
                  <div className="scale-125 border-2 border-brand-red shadow-[0_0_50px_rgba(255,70,85,0.25)]">
                    <MatchCard match={grandFinal} />
                  </div>
                  <div className="flex flex-col items-center bg-brand-bg text-brand-dark px-10 py-5 font-bebas text-3xl tracking-wider">
                    <span className="text-xs font-sans font-bold text-brand-dark uppercase tracking-widest">Champion</span>
                    {championName}
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Semifinal B</h3>
                  <MatchCard match={matches.find((m) => m.round === "sf" && m.side === "right")} />
                </div>
                {renderRound("Quarterfinals", getMatches("qf", "right"))}
                {renderRound("Round of 16", getMatches("r16", "right"))}
                {renderRound("Round of 32", getMatches("r32", "right"))}
                {renderRound("Round of 64", getMatches("r64", "right"))}

              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </main>
  );
}