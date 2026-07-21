import { supabaseServerClient } from "@/lib/supabase/server";

async function getMyStudentName(): Promise<string | null> {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.rpc("get_my_student_name");

  if (error) {
    console.error("Failed to load student name:", error);
    return null;
  }

  return data;
}

export { getMyStudentName };
