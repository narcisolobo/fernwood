import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import ClassFilterButtons from "./ClassFilterButtons";

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
  setSearch("");
});

describe("ClassFilterButtons", () => {
  it("highlights 'All Classes' when no type filter is active", () => {
    render(<ClassFilterButtons />);
    expect(screen.getByRole("button", { name: "All Classes" })).toHaveClass(
      "btn-primary",
    );
    expect(screen.getByRole("button", { name: "Reformer" })).not.toHaveClass(
      "btn-primary",
    );
  });

  it("highlights the active type from the URL", () => {
    setSearch("type=reformer");
    render(<ClassFilterButtons />);
    expect(screen.getByRole("button", { name: "Reformer" })).toHaveClass(
      "btn-primary",
    );
    expect(
      screen.getByRole("button", { name: "All Classes" }),
    ).not.toHaveClass("btn-primary");
  });

  it("pushes a type param when a filter is clicked", () => {
    render(<ClassFilterButtons />);
    fireEvent.click(screen.getByRole("button", { name: "Mat" }));
    expect(push).toHaveBeenCalledWith("?type=mat");
  });

  it("clears the type param when 'All Classes' is clicked", () => {
    setSearch("type=mat");
    render(<ClassFilterButtons />);
    fireEvent.click(screen.getByRole("button", { name: "All Classes" }));
    expect(push).toHaveBeenCalledWith("?");
  });
});
