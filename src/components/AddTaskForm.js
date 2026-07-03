// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: Provides a controlled form where the user types
// a new task. This component only manages the input text;
// TaskBoard owns the actual task list.
// TYPE: Client Component — uses useState and form events.
// PROPS: onAdd — callback from TaskBoard used to add a task.
// ══════════════════════════════════════════════════════

'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  // title is local state because only this form needs to know
  // what the user is typing before the task is submitted.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // This stops the browser from refreshing the page when the
    // form submits. React should handle the submit instead.
    e.preventDefault();

    // trim prevents blank tasks made only of spaces.
    if (!title.trim()) return;

    // TaskBoard owns the task list, so this sends the cleaned task
    // title upward instead of trying to change the list here.
    onAdd(title.trim());

    // Clears the input after adding a task so the form is ready again.
    setTitle('');
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
    className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
  />

  {/* Controlled select menu. The selected category lives in state
      until the user submits the form. */}
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
    className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
  >
    Add Task
  </button>
</form>