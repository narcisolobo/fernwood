"use server";

import { headers } from "next/headers";
import { supabaseServerClient } from "@/lib/supabase/server";

type SignInState = {
  error?: string;
  success?: boolean;
};

async function signIn(
  _prevState: SignInState | null,
  formData: FormData,
): Promise<SignInState> {
  const email = formData.get("email");

  if (typeof email !== "string" || !email) {
    return { error: "Please enter a valid email address." };
  }

  const origin = (await headers()).get("origin");
  const supabase = await supabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export { signIn };
