// ══════════════════════════════════════════════════════
// COMPONENT: HomePage
// PURPOSE: This is the main route for the app. It keeps
// the page simple and only renders the TaskBoard component.
// The actual task logic is kept inside TaskBoard so this
// page stays clean and follows App Router structure.
// TYPE: Server Component — no useState, useEffect, or
// browser events are needed in this file.
// PROPS: None
// ══════════════════════════════════════════════════════

import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-8 text-white">
      <TaskBoard />
    </main>
  );
}