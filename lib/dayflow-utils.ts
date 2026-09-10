import type { Routine, Task } from "./dayflow-store";

export function buildTask(title: string, id = `t-${Date.now()}`): Task | null {
  const trimmed = title.trim();
  if (!trimmed) return null;
  return { id, title: trimmed, time: "Anytime", area: "Inbox", done: false, priority: "normal" };
}

export function buildRoutine(title: string, id = `r-${Date.now()}`): Routine | null {
  const trimmed = title.trim();
  if (!trimmed) return null;
  return { id, title: trimmed, detail: "New routine", streak: 0, completed: false };
}

export function completionRatio(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, done / total));
}
