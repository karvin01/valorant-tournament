"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Match } from "@/types/bracket";
import { initialMatches } from "@/data/bracketMatches";


// Bracket canvas dimensions
const BRACKET_WIDTH = 4400;
const BRACKET_HEIGHT = 2200;

//custom react hook to calculate the exact maximum zoomout factor needed, so the whole canvas with brackets fits on the screen completely
function useBracketScale() {
  const [minScale, setMinScale] = useState(0.45);

  useEffect(() => {
    function calculateScale() {
      // Get the available window dimensions minus the navbar (100px)
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - 100;

      // Find the scale that fits the bracket entirely inside the view
      const scaleX = availableWidth / BRACKET_WIDTH;
      const scaleY = availableHeight / BRACKET_HEIGHT;
      const fitScale = Math.min(scaleX, scaleY);

      // Add a small safety padding (+- 95% of full fit) so edges aren't touching
      //changed 0.1 to 0.02 so when you open it on mobile it shows the edge brackets bcs of paddings
      setMinScale(Math.max(fitScale * 0.95, 0.02));
    }

    //it is listener so it is waiting till you for example resize the indow/rotate phone or whatever and it rescales it aproximately to the new screen size
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return minScale;
}

// Navigation controls custom setting (zoom and reset button in the bottom right corner)
function CanvasControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-brand-red border border-white/10 p-2 rounded-lg backdrop-blur select-none">
      <button
        onClick={() => zoomIn()}
        className="w-10 h-10 flex items-center justify-center text-brand-light hover:bg-white/10 rounded font-bold text-xl transition"
        title="Zoom In"
      >
        +
      </button>
      <button
        onClick={() => zoomOut()}
        className="w-10 h-10 flex items-center justify-center text-brand-light hover:bg-white/10 rounded font-bold text-xl transition"
        title="Zoom Out"
      >
        -
      </button>
      <button
        onClick={() => resetTransform(250)}
        className="px-3 h-9 flex items-center justify-center text-lg font-semibold uppercase tracking-wider text-brand-light font-bebas hover:bg-white/10 rounded transition"
      >
        Reset
      </button>
    </div>
  );
}

// Single Match Card Component (Now receives real match data)
function MatchCard({ match }: { match?: Match }) {
  const team1 = match?.team1 ?? { name: "TBD" };
  const team2 = match?.team2 ?? { name: "TBD" };

  return (
    <div className="w-56 bg-brand-dark/95 border border-white/15 p-2.5 flex flex-col gap-1.5 rounded shadow-2xl select-none">
      <div
        className={`flex justify-between items-center text-xs font-semibold ${
          team1.isWinner ? "text-brand-light font-bold" : "text-brand-light/70"
        }`}
      >
        <span className="truncate">{team1.name}</span>
        <span className="text-brand-red font-bebas text-base">
          {team1.score !== undefined ? team1.score : "-"}
        </span>
      </div>
      <div className="h-[1px] bg-white/10 w-full" />
      <div
        className={`flex justify-between items-center text-xs font-semibold ${
          team2.isWinner ? "text-brand-light font-bold" : "text-brand-light/70"
        }`}
      >
        <span className="truncate">{team2.name}</span>
        <span className="font-bebas text-base">
          {team2.score !== undefined ? team2.score : "-"}
        </span>
      </div>
    </div>
  );
}

export default function BracketPage() {
  // Store matches in state (ready for Firebase replacement later)
  const [matches] = useState<Match[]>(initialMatches);

  // Left bracket matches
  const leftR64 = matches.filter((m) => m.round === "r64" && m.side === "left");
  const leftR32 = matches.filter((m) => m.round === "r32" && m.side === "left");
  const leftR16 = matches.filter((m) => m.round === "r16" && m.side === "left");
  const leftQF = matches.filter((m) => m.round === "qf" && m.side === "left");
  const leftSF = matches.find((m) => m.round === "sf" && m.side === "left");

  // Center Grand Final
  const grandFinal = matches.find((m) => m.round === "final");

  // Right bracket matches
  const rightSF = matches.find((m) => m.round === "sf" && m.side === "right");
  const rightQF = matches.filter((m) => m.round === "qf" && m.side === "right");
  const rightR16 = matches.filter((m) => m.round === "r16" && m.side === "right");
  const rightR32 = matches.filter((m) => m.round === "r32" && m.side === "right");
  const rightR64 = matches.filter((m) => m.round === "r64" && m.side === "right");

  const minScale = useBracketScale(); // Custom hook to calculate min scale so you cant zoom bigger than the bracket

  return (
    <main className="relative w-full h-[calc(100vh-100px)] overflow-hidden bg-brand-dark select-none">
      {/* 1. fixed background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/bracketpics/VALORANT_logo4.jpg"
          alt="Bracket Background"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-brand-dark/40" />
      </div>

      {/* 2. PAN/ZOOM CANVAS */}
      <TransformWrapper
        key={minScale} //initial zoom when the page loads so you see all brackets
        initialScale={minScale} //initial zoom when the page loads for the reset button(from the function at the beginning bcs I wanted so all the brackets are visible)
        minScale={minScale} //minimum zoomout limit (prevents zooming out smaller than the screen so you dont have the all the brackets on 10% of the screen in the middle)
        maxScale={1.5} //maximum zoom in limit => 150%
        centerOnInit={true} //centers the bracket in the middle of the screen on first load
        limitToBounds={true} //boundry fence, so you cant drag the bracket outside of the screen
        panning={{
          velocityDisabled: true,
        }} //prevents sliding so when you drag in some direction, it doesn't keep sliding, it stops where you stop
        wheel={{
          step: 0.02,
        }} //sets sensitivity for mouse wheel zoom
      >
        {() => (
          <>
            <CanvasControls />

            {/* wrapper is the screen Im looking through, content is like map in google maps when you zoom in(the 4400px canvas) */}
            <TransformComponent
              wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing z-10"
              contentClass="!w-fit !h-fit"
            >

              {/* 3. FULL CONVERGING 64-TEAM SPIDER TREE */}
              <div className="w-[4400px] h-[2200px] flex items-center justify-between gap-12 px-20 select-none">
                
                {/* ================= LEFT BRACKET (32 TEAMS) ================= */}
                {/* Round of 64 - Left */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Round of 64</h3>
                  {leftR64.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Round of 32 - Left */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Round of 32</h3>
                  {leftR32.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Round of 16 - Left */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Round of 16</h3>
                  {leftR16.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Quarterfinals - Left */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Quarterfinals</h3>
                  {leftQF.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Semifinal - Left */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Semifinal A</h3>
                  <MatchCard match={leftSF} />
                </div>

                {/* ================= CENTER: FINALS & CHAMPION ================= */}
                <div className="flex flex-col justify-center items-center gap-10 px-8 pt-20">
                  <div className="text-center">
                    <span className="text-brand-red font-bebas text-lg tracking-widest uppercase">Championship</span>
                    <h2 className="font-bebas text-5xl text-brand-light tracking-wide uppercase">Grand Final</h2>
                  </div>

                  <div className="scale-125 border-2 border-brand-red shadow-[0_0_50px_rgba(255,70,85,0.25)] rounded">
                    <MatchCard match={grandFinal} />
                  </div>

                  <div className="flex flex-col items-center bg-brand-bg text-brand-dark px-10 py-5 rounded font-bebas text-3xl tracking-wider">
                    <span className="text-xs font-sans font-bold text-brand-dark uppercase tracking-widest">Champion</span>
                    TBD
                  </div>
                </div>

                {/* ================= RIGHT BRACKET (32 TEAMS) ================= */}
                {/* Semifinal - Right */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Semifinal B</h3>
                  <MatchCard match={rightSF} />
                </div>

                {/* Quarterfinals - Right */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Quarterfinals</h3>
                  {rightQF.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Round of 16 - Right */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Round of 16</h3>
                  {rightR16.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Round of 32 - Right */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Round of 32</h3>
                  {rightR32.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

                {/* Round of 64 - Right */}
                <div className="flex flex-col justify-center gap-10">
                  <h3 className="font-bebas text-xl text-center text-brand-light uppercase">Round of 64</h3>
                  {rightR64.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>

              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </main>
  );
}