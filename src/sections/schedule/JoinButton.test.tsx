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

const testDate = new Date(2026, 6, 20); // Monday, July 20 2026

function renderJoinButton({
  session = null as Session | null,
  loading = false,
  status = "open" as "open" | "full",
  myStatus = null as "booked" | "waitlisted" | null,
} = {}) {
  return render(
    <AuthContext.Provider value={{ session, loading }}>
      <JoinButton
        name="Power Reformer"
        classId="1"
        teacher="Simone Vega"
        status={status}
        myStatus={myStatus}
        date={testDate}
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

  it("shows 'Cancel Booking' when the user has already booked", () => {
    renderJoinButton({ session: fakeSession, myStatus: "booked" });
    expect(
      screen.getByRole("button", { name: "Cancel Booking" }),
    ).toBeInTheDocument();
  });

  it("shows 'Leave Waitlist' when the user is already waitlisted", () => {
    renderJoinButton({ session: fakeSession, myStatus: "waitlisted" });
    expect(
      screen.getByRole("button", { name: "Leave Waitlist" }),
    ).toBeInTheDocument();
  });

  it("opens the cancel confirmation modal when already booked", () => {
    renderJoinButton({ session: fakeSession, myStatus: "booked" });
    fireEvent.click(screen.getByRole("button", { name: "Cancel Booking" }));
    expect(document.querySelector("dialog")).toHaveAttribute("open");
    expect(
      screen.getByText(
        "Are you sure you want to cancel your booking for Power Reformer on Monday, July 20?",
      ),
    ).toBeInTheDocument();
  });
});
