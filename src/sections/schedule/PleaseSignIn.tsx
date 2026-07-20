"use client";

import { supabaseBrowserClient } from "@/lib/supabase/client";
import { type Session } from "@supabase/supabase-js";
import { IconAlertSquareRounded } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function PleaseSignIn() {
  const supabase = supabaseBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session),
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading || session) return null;

  return (
    <div role="alert" className="alert alert-info alert-soft border-info mt-4">
      <IconAlertSquareRounded />
      <span>
        Please{" "}
        <Link href="/auth/sign-in" className="link">
          sign in
        </Link>{" "}
        to join a class or view your bookings.
      </span>
    </div>
  );
}

export default PleaseSignIn;
