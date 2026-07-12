'use client';

// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Displays one task row with its title, due date,
// category, status, toggle button, and delete button.
// TYPE: Client Component — uses click events.
// ══════════════════════════════════════════════════════

export default function TaskCard({
  id,
  title,
  category,
  dueDate,
  done,
  onToggle,
  onDelete,
}) {
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

          {dueDate && (
            <p className="mt-2 text-sm text-slate-400">
              📅 Due:{' '}
              {new Date(`${dueDate}T00:00:00`).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              )}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${
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

            <span
              className={
                done
                  ? 'inline-block rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-slate-950'
                  : 'inline-block rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-950'
              }
            >
              {done ? 'Done' : 'Active'}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggle(id)}
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-700"
          >
            {done ? 'Undo' : 'Done'}
          </button>

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