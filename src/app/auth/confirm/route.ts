import { supabaseServerClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo = request.nextUrl.clone();
  redirectTo.search = "";

  if (token_hash && type) {
    const supabase = await supabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirectTo.pathname = "/schedule";
      return NextResponse.redirect(redirectTo);
    }
  }

  // If something goes wrong, return the user to an error page or login
  redirectTo.pathname = "/auth/sign-in";
  redirectTo.searchParams.set("error", "auth-failed");
  return NextResponse.redirect(redirectTo);
}
