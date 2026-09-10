import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  time: string;
  area: string;
  done: boolean;
  priority: "focus" | "normal";
};

type Routine = {
  id: string;
  title: string;
  detail: string;
  streak: number;
  completed: boolean;
};

type DayflowState = {
  tasks: Task[];
  routines: Routine[];
  isHydrated: boolean;
  toggleTask: (id: string) => void;
  addTask: (title: string) => void;
  toggleRoutine: (id: string) => void;
  addRoutine: (title: string) => void;
};

const STORAGE_KEY = "dayflow-state-v1";

const starterTasks: Task[] = [
  { id: "t1", title: "Review product brief", time: "09:00", area: "Deep work", done: true, priority: "focus" },
  { id: "t2", title: "Send the launch notes", time: "11:30", area: "Work", done: false, priority: "normal" },
  { id: "t3", title: "15-minute reset walk", time: "13:00", area: "Wellbeing", done: false, priority: "normal" },
  { id: "t4", title: "Plan tomorrow's first move", time: "18:30", area: "Personal", done: false, priority: "normal" },
];

const starterRoutines: Routine[] = [
  { id: "r1", title: "Morning light", detail: "10 min outside before screens", streak: 8, completed: true },
  { id: "r2", title: "Water check-in", detail: "Finish 2 glasses by noon", streak: 5, completed: false },
  { id: "r3", title: "Evening reset", detail: "Clear desk + set tomorrow's cue", streak: 12, completed: false },
];

const DayflowContext = createContext<DayflowState | null>(null);

export function DayflowProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(starterTasks);
  const [routines, setRoutines] = useState<Routine[]>(starterRoutines);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as { tasks?: Task[]; routines?: Routine[] };
        if (saved.tasks) setTasks(saved.tasks);
        if (saved.routines) setRoutines(saved.routines);
      })
      .catch(() => undefined)
      .finally(() => setIsHydrated(true));
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, routines })).catch(() => undefined);
  }, [tasks, routines, isHydrated]);

  const value = useMemo<DayflowState>(() => ({
    tasks,
    routines,
    isHydrated,
    toggleTask: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task)),
    addTask: (title) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      setTasks((current) => [
        ...current,
        { id: `t-${Date.now()}`, title: trimmed, time: "Anytime", area: "Inbox", done: false, priority: "normal" },
      ]);
    },
    toggleRoutine: (id) => setRoutines((current) => current.map((routine) => routine.id === id ? { ...routine, completed: !routine.completed, streak: routine.completed ? Math.max(0, routine.streak - 1) : routine.streak + 1 } : routine)),
    addRoutine: (title) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      setRoutines((current) => [...current, { id: `r-${Date.now()}`, title: trimmed, detail: "New routine", streak: 0, completed: false }]);
    },
  }), [tasks, routines, isHydrated]);

  return <DayflowContext.Provider value={value}>{children}</DayflowContext.Provider>;
}

export function useDayflow() {
  const context = useContext(DayflowContext);
  if (!context) throw new Error("useDayflow must be used inside DayflowProvider");
  return context;
}

export type { Task, Routine };
