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

  const visibleTasks =
    filter === 'all'
      ? tasks
      : filter === 'done'
      ? tasks.filter((task) => task.done)
      : tasks.filter((task) => !task.done);

  // These must be above the return statement.
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

  function handleAddTask(title, category) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      category,
      done: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function handleToggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function handleClearCompleted() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.done)
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
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
          A personalized workspace for organizing priorities,
          tracking progress, and staying focused.
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
          <AddTaskForm onAdd={handleAddTask} />

          <div className="mb-5 flex flex-wrap gap-2">
            {['all', 'active', 'done'].map((option) => {
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
          </div>

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
        </div>
      </div>
    </section>
  );
}