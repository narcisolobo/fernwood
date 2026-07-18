import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const cookieStore = await cookies();
    const supabase = await supabaseServerClient(cookieStore);
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  // If something goes wrong, return the user to an error page or login
  redirectTo.pathname = "/login?error=auth-failed";
  return NextResponse.redirect(redirectTo);
}
