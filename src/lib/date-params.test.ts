import { describe, expect, it } from "vitest";
import { fromDateParam, toDateParam } from "./date-params";

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
