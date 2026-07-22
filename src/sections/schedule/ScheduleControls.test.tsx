import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toDateParam } from "@/lib/date-params";
import ScheduleControls from "./ScheduleControls";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const push = vi.fn();

function setSearch(search: string) {
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams(search) as unknown as ReturnType<
      typeof useSearchParams
    >,
  );
}

beforeEach(() => {
  push.mockClear();
  vi.mocked(useRouter).mockReturnValue({
    push,
  } as unknown as ReturnType<typeof useRouter>);
  setSearch("date=2026-07-20"); // a Monday
});

describe("ScheduleControls", () => {
  it("shows the date from the URL in the date input", () => {
    render(<ScheduleControls />);
    expect(screen.getByDisplayValue("2026-07-20")).toBeInTheDocument();
  });

  it("shifts forward a week", () => {
    render(<ScheduleControls />);
    fireEvent.click(screen.getByRole("button", { name: "Week ›" }));
    expect(push).toHaveBeenCalledWith("?date=2026-07-27");
  });

  it("shifts back a week", () => {
    render(<ScheduleControls />);
    fireEvent.click(screen.getByRole("button", { name: "‹ Week" }));
    expect(push).toHaveBeenCalledWith("?date=2026-07-13");
  });

  it("jumps to today", () => {
    render(<ScheduleControls />);
    fireEvent.click(screen.getByRole("button", { name: "Today" }));
    expect(push).toHaveBeenCalledWith(`?date=${toDateParam(new Date())}`);
  });

  it("navigates when a new date is picked", () => {
    render(<ScheduleControls />);
    fireEvent.change(screen.getByDisplayValue("2026-07-20"), {
      target: { value: "2026-08-01" },
    });
    expect(push).toHaveBeenCalledWith("?date=2026-08-01");
  });

  it("disables ‹ Week when the URL date is today", () => {
    setSearch(`date=${toDateParam(new Date())}`);
    render(<ScheduleControls />);
    const prevButton = screen.getByRole("button", { name: "‹ Week" });
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveAttribute("aria-disabled", "true");
  });

  it("leaves ‹ Week enabled when the URL date isn't today", () => {
    render(<ScheduleControls />);
    const prevButton = screen.getByRole("button", { name: "‹ Week" });
    expect(prevButton).not.toBeDisabled();
    expect(prevButton).toHaveAttribute("aria-disabled", "false");
  });
});
