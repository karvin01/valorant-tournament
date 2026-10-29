"use client";

import { useEffect, useState } from "react";

interface CountdownCardProps {
  // Target deadline timestamp passed in ISO format (e.g. "2026-10-30T23:59:59")
  targetDate: string; // ISO string format: "2026-10-30T23:59:59"
}

// Structured remaining time broken down into human-readable units
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownCard({ targetDate }: CountdownCardProps) {
  // Local state tracking time remaining until registration closes; null on initial server render
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // --- COUNTDOWN TIMER EFFECT ---
  // Calculates remaining time in milliseconds and sets up a 1-second interval loop
  useEffect(() => {
    const calculateTime = () => {
      // Calculate delta between target epoch and current client epoch
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      // Once the target deadline has elapsed, zero out all units and halt further calculation
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Convert millisecond delta into discrete time units
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    // Run initial calculation immediately to populate state before the first interval tick
    calculateTime();
    // Re-evaluate remaining time every 1,000 milliseconds
    const interval = setInterval(calculateTime, 1000);
    // Clear active interval timer when component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden select-none shadow-md">
      {/* Top dark bar countdown */}
      <div className="bg-brand-dark py-2.5 sm:py-3 text-center">
        <span className="font-bebas text-xl sm:text-2xl lg:text-button-lg tracking-wider text-brand-light uppercase">
          CLOSES IN
        </span>
      </div>

      {/* Bottom light bar countdown: renders placeholder dashes while timer initializes on client */}
      <div className="bg-brand-bg flex-1 py-4 sm:py-6 px-3 flex items-center justify-center text-center">
        <span className="font-bebas text-2xl sm:text-3xl lg:text-4xl xl:text-button-lg text-brand-dark tracking-tight whitespace-nowrap">
          {timeLeft ? (
            `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`
          ) : (
            "--D --H --M --S"
          )}
        </span>
      </div>
    </div>
  );
}