import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  supabaseServerClient: vi.fn(),
}));

import { joinClass } from "./join-class-action";

function buildFormData(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

describe("joinClass validation", () => {
  it("requires a classId", async () => {
    const result = await joinClass(null, buildFormData({ name: "Jane" }));
    expect(result).toEqual({ error: "Missing class." });
  });

  it("requires a name", async () => {
    const result = await joinClass(null, buildFormData({ classId: "1" }));
    expect(result).toEqual({ error: "Name is required." });
  });

  it("rejects an empty name", async () => {
    const result = await joinClass(
      null,
      buildFormData({ classId: "1", name: "" }),
    );
    expect(result).toEqual({ error: "Name is required." });
  });

  it("rejects a whitespace-only name", async () => {
    const result = await joinClass(
      null,
      buildFormData({ classId: "1", name: "   " }),
    );
    expect(result).toEqual({ error: "Name is required." });
  });
});
