"use client";

import { supabaseBrowserClient } from "@/lib/supabase/client";
import { type Session } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";

function AuthProvider({ children }: { children: ReactNode }) {
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

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
