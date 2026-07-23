import { describe, expect, it } from "vitest";
import {
  fromDateParam,
  getStudioToday,
  isSameLocalDate,
  toDateParam,
} from "./date-params";

describe("toDateParam", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(toDateParam(new Date(2026, 6, 20))).toBe("2026-07-20");
  });

  it("zero-pads single-digit months and days", () => {
    expect(toDateParam(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("fromDateParam", () => {
  it("parses to local midnight on the given day", () => {
    const date = fromDateParam("2026-07-20");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(6);
    expect(date.getDate()).toBe(20);
    expect(date.getHours()).toBe(0);
  });
});

describe("toDateParam + fromDateParam", () => {
  it("round-trips without shifting a day", () => {
    const dateStr = "2026-12-31";
    expect(toDateParam(fromDateParam(dateStr))).toBe(dateStr);
  });
});

describe("getStudioToday", () => {
  it("returns the Pacific calendar date for an instant during the Pacific business day", () => {
    // 2026-07-20T15:00:00-07:00 is 3pm PDT, still July 20 everywhere.
    const now = new Date("2026-07-20T15:00:00-07:00");
    const today = getStudioToday(now);
    expect(today.getFullYear()).toBe(2026);
    expect(today.getMonth()).toBe(6);
    expect(today.getDate()).toBe(20);
  });

  it("stays on the Pacific date even when UTC has already rolled over", () => {
    // 2026-07-20T22:00:00-07:00 (10pm PDT) is 2026-07-21T05:00:00Z —
    // already the next day in UTC, but still July 20 in Pacific time.
    // This is exactly the window a UTC-based server would get wrong.
    const now = new Date("2026-07-20T22:00:00-07:00");
    const today = getStudioToday(now);
    expect(today.getFullYear()).toBe(2026);
    expect(today.getMonth()).toBe(6);
    expect(today.getDate()).toBe(20);
  });

  it("rolls over at Pacific midnight, not UTC midnight", () => {
    const justBefore = getStudioToday(new Date("2026-07-20T23:59:59-07:00"));
    const justAfter = getStudioToday(new Date("2026-07-21T00:00:01-07:00"));
    expect(justBefore.getDate()).toBe(20);
    expect(justAfter.getDate()).toBe(21);
  });
});

describe("isSameLocalDate", () => {
  it("treats different times on the same day as the same date", () => {
    const morning = new Date(2026, 6, 20, 6, 0);
    const night = new Date(2026, 6, 20, 23, 30);
    expect(isSameLocalDate(morning, night)).toBe(true);
  });

  it("treats adjacent days as different dates", () => {
    const today = new Date(2026, 6, 20);
    const tomorrow = new Date(2026, 6, 21);
    expect(isSameLocalDate(today, tomorrow)).toBe(false);
  });

  it("handles month and year rollover", () => {
    const newYearsEve = new Date(2026, 11, 31);
    const newYearsDay = new Date(2027, 0, 1);
    expect(isSameLocalDate(newYearsEve, newYearsDay)).toBe(false);
  });
});
