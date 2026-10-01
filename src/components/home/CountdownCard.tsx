"use client";

import { useEffect, useState } from "react";

interface CountdownCardProps {
  targetDate: string; // ISO string format: "2026-10-30T23:59:59"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownCard({ targetDate }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
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

      {/* Bottom light bar countdown */}
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