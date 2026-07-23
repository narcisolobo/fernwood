import { describe, expect, it } from "vitest";
import {
  formatConfirmationDate,
  formatDayLabel,
  formatDuration,
  formatTime,
  hasClassEnded,
} from "./schedule-format";

describe("formatTime", () => {
  it("formats midnight as 12:00 am", () => {
    expect(formatTime("00:00:00")).toBe("12:00 am PDT");
  });

  it("formats noon as 12:00 pm", () => {
    expect(formatTime("12:00:00")).toBe("12:00 pm PDT");
  });

  it("formats a morning time", () => {
    expect(formatTime("09:30:00")).toBe("9:30 am PDT");
  });

  it("formats an afternoon time", () => {
    expect(formatTime("13:05:00")).toBe("1:05 pm PDT");
  });

  it("formats a time just before midnight", () => {
    expect(formatTime("23:59:00")).toBe("11:59 pm PDT");
  });
});

describe("formatDuration", () => {
  it("uses singular 'hour' for exactly 60 minutes", () => {
    expect(formatDuration(60)).toBe("1 hour");
  });

  it("uses plural 'hours' for multiples of 60", () => {
    expect(formatDuration(120)).toBe("2 hours");
  });

  it("falls back to minutes for non-hour durations", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(90)).toBe("90 min");
  });
});

describe("formatDayLabel", () => {
  it("splits weekday and date with a '|' separator", () => {
    // 2026-07-20 is a Monday.
    expect(formatDayLabel(new Date(2026, 6, 20))).toBe("Mon|July 20, 2026");
  });
});

describe("formatConfirmationDate", () => {
  it("formats with long weekday and month, numeric day, no year", () => {
    // 2026-07-20 is a Monday.
    expect(formatConfirmationDate(new Date(2026, 6, 20))).toBe(
      "Monday, July 20",
    );
  });
});

describe("hasClassEnded", () => {
  const day = new Date(2026, 6, 20); // Monday, July 20 2026 (PDT, UTC-7)

  it("is false while the start time is still in the future", () => {
    const now = new Date("2026-07-20T08:59:00-07:00");
    expect(hasClassEnded(day, "09:00:00", now)).toBe(false);
  });

  it("is true once the start time has passed", () => {
    const now = new Date("2026-07-20T09:00:01-07:00");
    expect(hasClassEnded(day, "09:00:00", now)).toBe(true);
  });

  it("is false at the exact start time (not yet past)", () => {
    const now = new Date("2026-07-20T09:00:00-07:00");
    expect(hasClassEnded(day, "09:00:00", now)).toBe(false);
  });

  it("is false for the same time on a future day", () => {
    const now = new Date("2026-07-20T09:00:01-07:00");
    const nextWeek = new Date(2026, 6, 27);
    expect(hasClassEnded(nextWeek, "09:00:00", now)).toBe(false);
  });

  it("treats start_time as Pacific wall-clock time regardless of server time zone", () => {
    // Regression test: a server running in UTC (the common deployed case)
    // must not interpret "18:30:00" as 18:30 UTC. 18:30 PDT on July 20 2026
    // is 01:30 UTC on July 21 — well before that instant, the class hasn't
    // started yet, even though naive UTC math would say it's long over.
    const now = new Date("2026-07-20T15:00:00-07:00"); // 3:00pm PDT, 22:00 UTC
    expect(hasClassEnded(day, "18:30:00", now)).toBe(false);
  });

  it("accounts for DST when the studio is on PST instead of PDT", () => {
    const januaryDay = new Date(2026, 0, 20); // PST, UTC-8
    const now = new Date("2026-01-20T08:59:00-08:00");
    expect(hasClassEnded(januaryDay, "09:00:00", now)).toBe(false);

    const later = new Date("2026-01-20T09:00:01-08:00");
    expect(hasClassEnded(januaryDay, "09:00:00", later)).toBe(true);
  });
});
