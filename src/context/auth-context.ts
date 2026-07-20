import { type Session } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export { AuthContext, type AuthContextValue };
