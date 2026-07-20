"use server";

import { supabaseServerClient } from "@/lib/supabase/server";

export interface JoinClassState {
  error?: string;
  status?: "booked" | "waitlisted";
}

export async function joinClass(
  _prevState: JoinClassState | null,
  formData: FormData,
): Promise<JoinClassState> {
  const classId = formData.get("classId") as string;
  const name = formData.get("name") as string;

  if (!classId) {
    return { error: "Missing class." };
  }
  if (!name || name.trim() === "") {
    return { error: "Name is required." };
  }

  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.rpc("book_class", {
    p_class_id: classId,
    p_student_name: name,
  });

  if (error) {
    console.error("book_class failed:", error);
    return { error: "Something went wrong — please try again." };
  }

  const status = data?.[0]?.enrollment_status as
    "booked" | "waitlisted" | undefined;

  if (!status) {
    return { error: "Something went wrong — please try again." };
  }

  return { status };
}
