"use client";

import { useEffect, useState } from "react";
import { type Session } from "@supabase/supabase-js";
import { supabaseJsClient } from "@/lib/supabase/client";
import Link from "next/link";

function SessionStatus() {
  const supabase = supabaseJsClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session),
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase.auth]);

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
