"use client";

import { useAuth } from "@/hooks/useAuth";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";

function SessionStatus() {
  const supabase = supabaseBrowserClient();
  const { session } = useAuth();

  return session ? (
    <button className="link link-hover" onClick={() => supabase.auth.signOut()}>
      Sign out
    </button>
  ) : (
    <Link className="link link-hover" href="/auth/sign-in">
      Sign in
    </Link>
  );
}

export default SessionStatus;
