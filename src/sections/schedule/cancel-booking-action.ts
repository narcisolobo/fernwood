"use server";

import { revalidatePath } from "next/cache";
import { supabaseServerClient } from "@/lib/supabase/server";

export interface CancelBookingState {
  error?: string;
  success?: boolean;
}

export async function cancelBooking(
  _prevState: CancelBookingState | null,
  formData: FormData,
): Promise<CancelBookingState> {
  const classId = formData.get("classId") as string;

  if (!classId) {
    return { error: "Missing class." };
  }

  const supabase = await supabaseServerClient();

  const { error } = await supabase.rpc("cancel_booking", {
    p_class_id: classId,
  });

  if (error) {
    console.error("cancel_booking failed:", error);
    return { error: "Something went wrong — please try again." };
  }

  revalidatePath("/schedule");

  return { success: true };
}
