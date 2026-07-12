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
import Image from 'next/image';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import CurrentDateTime from './CurrentDateTime';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

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

  function handleAddTask(title, category) {
   const newTask = {
  id: crypto.randomUUID(),
  title,
  category,
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
      {/* <div className="mb-8 rounded-3xl bg-slate-900 p-6 shadow-xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-400">
          Project and Homework Task Manager
        </p>

        <h1 className="text-4xl font-bold">Ivy’s Daily Task Manager</h1>

        <p className="mt-3 text-slate-300">
          This task Manager is to help me organize tasks, track progress, and keep everything saved in one place.
        </p>
      </div> */}
    <div className="mb-8 overflow-hidden rounded-3xl border border-rose-300/20 bg-slate-900 shadow-2xl shadow-black/40">
  <Image
    src="/header-dashboard.png"
    alt="Personal Project Task Manager dashboard banner"
    width={1600}
    height={900}
    priority
    className="h-auto w-full object-cover"
  />
</div>

<CurrentDateTime />
<div className="mb-8 rounded-3xl border border-rose-300/20 bg-slate-900/90 p-6 shadow-xl">
  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-300">
    Plan. Focus. Track. Accomplish.
  </p>

  <h1 className="mt-3 text-4xl font-bold text-white">
    Project Task Manager
  </h1>

  <p className="mt-3 text-slate-300">
    A personalized workspace for organizing priorities, tracking progress, and staying focused.
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
                      ? 'rounded-full bg-rose-400 px-4 py-2 font-bold text-slate-950'
                      : 'rounded-full bg-rose-800 px-4 py-2 font-bold text-slate-300 hover:bg-slate-700'
                  }
                >
                  {option.toUpperCase()}
                </button>
              );
            })}
          <div className="grid gap-5 md:grid-cols-2">
  <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">
        💼 Work
      </h2>

      <span className="rounded-full bg-rose-300 px-3 py-1 text-sm font-bold text-slate-950">
        {workTasks.length}
      </span>
    </div>

    <TaskList
      tasks={workTasks}
      filter={filter}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  </div>

  <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">
        📚 School
      </h2>

      <span className="rounded-full bg-rose-300 px-3 py-1 text-sm font-bold text-slate-950">
        {schoolTasks.length}
      </span>
    </div>

    <TaskList
      tasks={schoolTasks}
      filter={filter}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  </div>

  <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">
        ⛪ Church
      </h2>

      <span className="rounded-full bg-rose-300 px-3 py-1 text-sm font-bold text-slate-950">
        {churchTasks.length}
      </span>
    </div>

    <TaskList
      tasks={churchTasks}
      filter={filter}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  </div>

  <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">
        🏠 Personal
      </h2>

      <span className="rounded-full bg-rose-300 px-3 py-1 text-sm font-bold text-slate-950">
        {personalTasks.length}
      </span>
    </div>

    <TaskList
      tasks={personalTasks}
      filter={filter}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  </div>
</div>

const workTasks = visibleTasks.filter(
  (task) => task.category === 'Work'
);

const schoolTasks = visibleTasks.filter(
  (task) => task.category === 'School'
);

const churchTasks = visibleTasks.filter(
  (task) => task.category === 'Church'
);

const personalTasks = visibleTasks.filter(
  (task) => task.category === 'Personal'
);

      </div>
    </section>
  );
}