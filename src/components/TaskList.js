// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Displays the list of tasks that should be visible
// based on the selected filter. This component does not own
// the task data; it simply renders each task using TaskCard.
// TYPE: Client Component — renders child components and
// passes callback props.
// PROPS:
//   tasks - the filtered list of tasks to display
//   filter - current filter (all, active, or done)
//   onToggle - callback passed down from TaskBoard
//   onDelete - callback passed down from TaskBoard
// ══════════════════════════════════════════════════════

'use client';

import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
  filter,
  onToggle,
  onDelete,
}) {
  return (
    <div className="space-y-4">
      {/* Conditional rendering:
          If there are no tasks after filtering, display a helpful
          message instead of rendering an empty list. */}
      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-300">
            No {filter} tasks found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add a new task or choose another filter.
          </p>
        </div>
      ) : (
        // map() creates a brand-new array of TaskCard components.
        // React prefers immutable rendering because it can efficiently
        // compare the new virtual DOM with the previous one.
        tasks.map((task) => (
          <TaskCard
  key={task.id}
  id={task.id}
  title={task.title}
  category={task.category}
   dueDate={task.dueDate}
  done={task.done}
  onToggle={onToggle}
  onDelete={onDelete}
/>
        ))
      )}
    </div>
  );
}