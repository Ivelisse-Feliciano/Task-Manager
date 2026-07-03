// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE: This section is where it shows live task counts and the button that
// clears all completed tasks.
// TYPE: Client Component — uses a button click event.
// PROPS: total, active, completed, onClearCompleted
// ══════════════════════════════════════════════════════

'use client';

export default function TaskStats({ total, active, completed, onClearCompleted }) {
  return (
    <aside className="rounded-3xl bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-bold">Dashboard</h2>

      <div className="grid gap-3">
        <div className="rounded-2xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Total Tasks Left</p>
          <p className="text-3xl font-bold text-white">{total}</p>
        </div>

        <div className="rounded-2xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Active Tasks</p>
          <p className="text-3xl font-bold text-amber-300">{active}</p>
        </div>

        <div className="rounded-2xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="text-3xl font-bold text-emerald-300">{completed}</p>
        </div>
      </div>

      {/* Conditional behavior: the button is disabled when completed is 0
          because there is nothing completed to clear. */}
      <button
        onClick={onClearCompleted}
        disabled={completed === 0}
        className="mt-6 w-full rounded-xl bg-rose-500 px-4 py-3 font-bold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        Clear Completed
      </button>
    </aside>
  );
}