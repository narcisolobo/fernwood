import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CancelBookingModal from "./CancelBookingModal";

// cancel-booking-action ultimately imports this — stub it out so the tests
// never touch cookies()/Supabase, matching join-class-action.test.ts.
vi.mock("@/lib/supabase/server", () => ({
  supabaseServerClient: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

const testDate = new Date(2026, 6, 20); // Monday, July 20 2026

function renderModal(myStatus: "booked" | "waitlisted") {
  const dialogRef = createRef<HTMLDialogElement>();
  const utils = render(
    <CancelBookingModal
      classId="1"
      name="Power Reformer"
      date={testDate}
      myStatus={myStatus}
      dialogRef={dialogRef}
    />,
  );
  dialogRef.current?.showModal();
  return utils;
}

describe("CancelBookingModal", () => {
  it("shows cancel-booking wording when already booked", () => {
    renderModal("booked");
    expect(
      screen.getByText(
        "Are you sure you want to cancel your booking for Power Reformer on Monday, July 20?",
      ),
    ).toBeInTheDocument();
  });

  it("shows leave-waitlist wording when waitlisted", () => {
    renderModal("waitlisted");
    expect(
      screen.getByText(
        "Are you sure you want to leave the waitlist for Power Reformer on Monday, July 20?",
      ),
    ).toBeInTheDocument();
  });

  it("renders Confirm and Cancel actions", () => {
    renderModal("booked");
    expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("closes the dialog when Cancel is clicked", () => {
    renderModal("booked");
    expect(document.querySelector("dialog")).toHaveAttribute("open");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
  });
});
