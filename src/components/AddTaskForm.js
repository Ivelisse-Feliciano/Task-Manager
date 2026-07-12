'use client';

// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: Provides a controlled form where the user types
// a new task and selects a category.
// TYPE: Client Component — uses useState and form events.
// PROPS: onAdd — callback from TaskBoard used to add a task.
// ══════════════════════════════════════════════════════

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), category);

    setTitle('');
    setCategory('Personal');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 sm:flex-row"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-rose-300"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      >
        <option value="Personal">🏠 Personal</option>
        <option value="Work">💼 Work</option>
        <option value="Church">⛪ Church</option>
        <option value="School">📚 School</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-rose-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-rose-200"
      >
        Add Task
      </button>
    </form>
  );
}