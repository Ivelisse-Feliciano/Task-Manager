// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard
// PURPOSE: This is the main area and face of the task manager.
// It owns the task list, filter choice, and all functions
// that change task data. Child components receive data
// and send user actions back up through callback props.
// TYPE: Client Component — this file uses useState,
// useEffect, browser events, and localStorage.
// PROPS: None
// ══════════════════════════════════════════════════════

'use client';

import { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export default function TaskBoard() {
  // tasks must be stored in state because the list changes when the
  // user adds, deletes, toggles, or clears tasks. React re-renders
  // the page when state changes, so the UI stays updated.
  const [tasks, setTasks] = useState(() => {
    // Next.js can render components before the browser is available.
    // localStorage only exists in the browser, so this guard prevents
    // errors during server-side rendering.
    if (typeof window === 'undefined') return [];

    const savedTasks = localStorage.getItem('tasks');

    // If saved tasks exist, restore them. Otherwise, start with
    // an empty array so the app has a safe default task list.
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // filter is state because the user can change it independently
  // from the task list. Changing the filter should not delete or
  // edit tasks; it only changes which tasks are displayed.
  const [filter, setFilter] = useState('all');

  // This effect syncs React state with localStorage, which is an
  // external browser system. The dependency array is [tasks] because
  // we only need to save again when the task list changes.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // These counts are derived values. They are calculated from tasks
  // instead of stored in separate state because storing them separately
  // could create bugs if the counts ever got out of sync with the list.
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;
  const activeTasks = tasks.filter((task) => !task.done).length;

  // visibleTasks is derived from tasks and filter. The real task list
  // stays untouched; this only decides what subset the user sees.
  const visibleTasks =
    filter === 'all'
      ? tasks
      : filter === 'done'
      ? tasks.filter((task) => task.done)
      : tasks.filter((task) => !task.done);

  function handleAddTask(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
    };

    // The spread operator creates a new array instead of changing
    // the existing tasks array. React depends on this new reference
    // to detect that state changed and re-render the UI.
    setTasks([...tasks, newTask]);
  }

  function handleToggleTask(id) {
    // map returns a new array. For the matching task, we create a
    // new object with the done value flipped. Directly mutating the
    // task object could cause React to miss the update.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDeleteTask(id) {
    // filter creates a new array without the selected task. This is
    // safer than mutating the original array because React can clearly
    // see the state was replaced.
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    // This keeps only unfinished tasks. It removes all completed tasks
    // at once while still using an immutable update.
    setTasks(tasks.filter((task) => !task.done));
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8 rounded-3xl bg-slate-900 p-6 shadow-xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-400">
          Project and Homework Task Manager
        </p>

        <h1 className="text-4xl font-bold">Ivy’s Daily Task Manager</h1>

        <p className="mt-3 text-slate-300">
          Organize tasks, track progress, and keep everything saved after refresh.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <TaskStats
          total={totalTasks}
          active={activeTasks}
          completed={completedTasks}
          onClearCompleted={handleClearCompleted}
        />

        <div className="rounded-3xl bg-slate-900 p-5">
          {/* The form does not own the task list. It sends the new title
              upward through onAdd so TaskBoard can update the main state. */}
          <AddTaskForm onAdd={handleAddTask} />

          <div className="mb-5 flex flex-wrap gap-2">
            {['all', 'active', 'done'].map((option) => {
              // isSelected is derived from filter. It is not state because
              // it can be recalculated during render from the current filter.
              const isSelected = filter === option;

              return (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={
                    isSelected
                      ? 'rounded-full bg-cyan-400 px-4 py-2 font-bold text-slate-950'
                      : 'rounded-full bg-slate-800 px-4 py-2 font-bold text-slate-300 hover:bg-slate-700'
                  }
                >
                  {option.toUpperCase()}
                </button>
              );
            })}
          </div>

          <TaskList
            tasks={visibleTasks}
            filter={filter}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </section>
  );
}