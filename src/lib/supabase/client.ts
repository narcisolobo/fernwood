import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "@/lib/supabase/database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

function supabaseBrowserClient() {
  return createBrowserClient<Database>(SUPABASE_URL, PUBLISHABLE_KEY);
}

export { supabaseBrowserClient };
