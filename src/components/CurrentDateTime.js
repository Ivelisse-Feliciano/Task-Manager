// ══════════════════════════════════════════════════════
// COMPONENT: CurrentDateTime
// PURPOSE: Displays a personalized greeting, today’s date,
// and a live clock that updates every second.
// TYPE: Client Component — uses useState and useEffect.
// PROPS: None
// ══════════════════════════════════════════════════════

'use client';

import { useEffect, useState } from 'react';

export default function CurrentDateTime() {
  // currentTime is state because the clock changes every second.
  // React re-renders when this value updates.
  const [currentTime, setCurrentTime] = useState(null);

  // This effect connects the component to the browser timer system.
  // The empty dependency array means the timer starts once when the
  // component loads. The cleanup prevents memory leaks.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
if (!currentTime) {
  return (
    <section className="mb-8 rounded-3xl border border-rose-300/20 bg-slate-900/90 p-6 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
        Personal Dashboard
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        Welcome Back, Ivelisse 🤍
      </h2>

      <p className="mt-2 text-slate-300">Loading date and time...</p>
    </section>
  );
}
  // These values are derived from currentTime, so they do not need
  // separate state. This keeps the date/time consistent.
  const hour = currentTime.getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  const date = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const time = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <section className="mb-8 rounded-3xl border border-rose-300/20 bg-slate-900/90 p-6 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
        Personal Dashboard
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {greeting}, Ivelisse 🤍
      </h2>

      <p className="mt-2 text-slate-300">{date}</p>

      <p className="mt-4 text-4xl font-bold text-rose-200">
        {time}
      </p>

      <p className="mt-4 border-l-4 border-rose-300 pl-4 text-slate-300">
        “Plan with purpose. Focus with faith. Finish with excellence.”
      </p>
    </section>
  );
}