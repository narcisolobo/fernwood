import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import JoinButtonModal from "./JoinButtonModal";

// join-class-action ultimately imports this — stub it out so the tests
// never touch cookies()/Supabase, matching join-class-action.test.ts.
vi.mock("@/lib/supabase/server", () => ({
  supabaseServerClient: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

function renderModal(defaultName: string | null) {
  const dialogRef = createRef<HTMLDialogElement>();
  const utils = render(
    <JoinButtonModal
      classId="1"
      name="Power Reformer"
      teacher="Simone Vega"
      status="open"
      dialogRef={dialogRef}
      defaultName={defaultName}
    />,
  );
  dialogRef.current?.showModal();
  return utils;
}

describe("JoinButtonModal", () => {
  it("pre-fills the name field when a defaultName is provided", () => {
    renderModal("Jane Doe");
    expect(screen.getByPlaceholderText("Name")).toHaveValue("Jane Doe");
  });

  it("leaves the name field empty when defaultName is null", () => {
    renderModal(null);
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
  });
});
