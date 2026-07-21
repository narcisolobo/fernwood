"use client";

import { useAuth } from "@/hooks/useAuth";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useDrawer } from "@/hooks/useDrawer";

function SessionStatus() {
  const { closeDrawer } = useDrawer();
  const supabase = supabaseBrowserClient();
  const { session } = useAuth();

  const handleSignOut = () => {
    supabase.auth.signOut();
    closeDrawer();
  };

  return session ? (
    <button className="link link-hover" onClick={handleSignOut}>
      Sign out
    </button>
  ) : (
    <Link href="/auth/sign-in" onClick={closeDrawer}>
      Sign in
    </Link>
  );
}

export default SessionStatus;
