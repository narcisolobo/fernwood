import { describe, expect, it, vi } from "vitest";

const rpc = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  supabaseServerClient: vi.fn(async () => ({ rpc })),
}));

import { getMyStudentName } from "./student";

describe("getMyStudentName", () => {
  it("returns the student's name when one is found", async () => {
    rpc.mockResolvedValueOnce({ data: "Jane Doe", error: null });
    expect(await getMyStudentName()).toBe("Jane Doe");
  });

  it("returns null when there is no matching student", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: null });
    expect(await getMyStudentName()).toBeNull();
  });

  it("returns null when the RPC call errors", async () => {
    rpc.mockResolvedValueOnce({
      data: null,
      error: new Error("boom"),
    });
    expect(await getMyStudentName()).toBeNull();
  });
});
