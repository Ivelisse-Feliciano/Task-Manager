// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Displays one task row with its title, status,
// toggle button, and delete button.
// TYPE: Client Component — uses click events.
// PROPS:
//   id - unique task id
//   title - task text
//   done - boolean showing complete or incomplete
//   onToggle - callback from TaskBoard to change done status
//   onDelete - callback from TaskBoard to remove the task
// ══════════════════════════════════════════════════════

'use client';

export default function TaskCard({ id, title, category, done, onToggle, onDelete }) {
  // These class names are derived from done instead of stored in state.
  // The visual design should always match the real task status.
  const cardClass = done
    ? 'rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4'
    : 'rounded-2xl border border-slate-700 bg-slate-950 p-4';

  const titleClass = done
    ? 'text-slate-400 line-through'
    : 'text-white';

  return (
    <article className={cardClass}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={titleClass}>{title}</p>
          <span
  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${
    category === 'Work'
      ? 'bg-blue-500'
      : category === 'Church'
      ? 'bg-purple-500'
      : category === 'School'
      ? 'bg-green-500'
      : 'bg-rose-500'
  }`}
>
  {category || 'Personal'}
</span>

          {/* Conditional render:
              The badge text and color change based on done so the user
              can quickly see whether the task is active or completed. */}
          <span
            className={
              done
                ? 'mt-2 inline-block rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-slate-950'
                : 'mt-2 inline-block rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-950'
            }
          >
            {done ? 'Done' : 'Active'}
          </span>
        </div>

        <div className="flex gap-2">
          {/* TaskBoard owns the task state. This button sends the task id
              upward so TaskBoard can toggle from done to undone the correct item with map(). */}
         <button
  onClick={() => onToggle(id)}
  className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-700"
>
  {done ? "Undo" : "Done"}
</button>

          {/* Delete works the same way: this child does not remove the task
              directly. It asks TaskBoard to remove this id from state. */}
          <button
            onClick={() => onDelete(id)}
            className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-bold text-white hover:bg-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}