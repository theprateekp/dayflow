import { describe, expect, it } from "vitest";
import { buildRoutine, buildTask, completionRatio } from "../lib/dayflow-utils";

describe("Dayflow capture helpers", () => {
  it("trims and creates a task in the inbox", () => {
    expect(buildTask("  Pay electricity bill  ", "task-1")).toEqual({
      id: "task-1",
      title: "Pay electricity bill",
      time: "Anytime",
      area: "Inbox",
      done: false,
      priority: "normal",
    });
  });

  it("rejects empty task and routine titles", () => {
    expect(buildTask("   ")).toBeNull();
    expect(buildRoutine("\n")).toBeNull();
  });

  it("starts new routines with a zero streak", () => {
    expect(buildRoutine("Read before bed", "routine-1")?.streak).toBe(0);
  });

  it("clamps completion progress to a usable ratio", () => {
    expect(completionRatio(2, 4)).toBe(0.5);
    expect(completionRatio(8, 4)).toBe(1);
    expect(completionRatio(1, 0)).toBe(0);
  });
});
