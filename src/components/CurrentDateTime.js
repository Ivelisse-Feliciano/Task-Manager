// ══════════════════════════════════════════════════════
// COMPONENT: CurrentDateTime
// PURPOSE: Displays the current date and time.
// TYPE: Client Component — updates every second.
// ══════════════════════════════════════════════════════

'use client';

import { useEffect, useState } from "react";

export default function CurrentDateTime() {
  // Stores the current date/time.
  const [currentTime, setCurrentTime] = useState(new Date());

  // Updates the clock every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const date = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-rose-300/20 bg-slate-900 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-rose-300">
        Welcome Back, Ivelisse 👋
      </h3>

      <p className="mt-2 text-slate-300">{date}</p>

      <p className="mt-3 text-4xl font-bold text-white">
        {time}
      </p>
    </div>
  );
}