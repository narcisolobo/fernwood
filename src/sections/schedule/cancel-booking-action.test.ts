import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  supabaseServerClient: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { cancelBooking } from "./cancel-booking-action";

function buildFormData(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

describe("cancelBooking validation", () => {
  it("requires a classId", async () => {
    const result = await cancelBooking(null, buildFormData({}));
    expect(result).toEqual({ error: "Missing class." });
  });
});
