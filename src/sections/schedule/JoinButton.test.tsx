import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Session } from "@supabase/supabase-js";
import { AuthContext } from "@/context/auth-context";
import JoinButton from "./JoinButton";

// JoinButtonModal's form action ultimately imports this — stub it out so
// the tests never touch cookies()/Supabase, matching join-class-action.test.ts.
vi.mock("@/lib/supabase/server", () => ({
  supabaseServerClient: vi.fn(),
}));

const fakeSession = { user: { id: "u1" } } as unknown as Session;

function renderJoinButton({
  session = null as Session | null,
  loading = false,
  status = "open" as "open" | "full",
} = {}) {
  return render(
    <AuthContext.Provider value={{ session, loading }}>
      <JoinButton
        name="Power Reformer"
        classId="1"
        teacher="Simone Vega"
        status={status}
      />
    </AuthContext.Provider>,
  );
}

describe("JoinButton", () => {
  it("shows 'Join Class' for an open class", () => {
    renderJoinButton({ session: fakeSession, status: "open" });
    expect(
      screen.getByRole("button", { name: "Join Class" }),
    ).toBeInTheDocument();
  });

  it("shows 'Join Waitlist' for a full class", () => {
    renderJoinButton({ session: fakeSession, status: "full" });
    expect(
      screen.getByRole("button", { name: "Join Waitlist" }),
    ).toBeInTheDocument();
  });

  it("disables the button while auth is loading", () => {
    renderJoinButton({ loading: true });
    expect(screen.getByRole("button", { name: "Join Class" })).toBeDisabled();
  });

  it("disables the button when signed out", () => {
    renderJoinButton({ session: null, loading: false });
    expect(screen.getByRole("button", { name: "Join Class" })).toBeDisabled();
  });

  it("opens the modal dialog when clicked while signed in", () => {
    renderJoinButton({ session: fakeSession });
    fireEvent.click(screen.getByRole("button", { name: "Join Class" }));
    expect(document.querySelector("dialog")).toHaveAttribute("open");
  });

  it("does not open the modal when disabled (signed out)", () => {
    renderJoinButton({ session: null });
    fireEvent.click(screen.getByRole("button", { name: "Join Class" }));
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
  });
});
