"use client";

import { useEffect, useState } from "react";

interface CountdownCardProps {
  targetDate: string; // ISO string format: "2026-11-28T10:00:00"
}

interface TimeLeft {
  days: number;
  hours: number;
  seconds: number;
}

export default function CountdownCard({ targetDate }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    // Calculate immediately on mount
    calculateTime();

    // Update every second
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col w-[300px] h-[220px] overflow-hidden select-none">
      {/* Top dark bar countdown */}
      <div className="bg-brand-dark py-3 text-center">
        <span className="font-bebas text-button-lg tracking-wider text-brand-light uppercase">
          CLOSES IN
        </span>
      </div>

      {/* Bottom light bar countdown */}
      <div className="bg-brand-bg flex-1 py-6 px-4 flex items-center justify-center min-h-[96px]">
        <span className="font-bebas text-button-lg text-brand-dark tracking-tight">
          {timeLeft ? (
            `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.seconds}S`
          ) : (
            "--D --H --S"
          )}
        </span>
      </div>
    </div>
  );
}