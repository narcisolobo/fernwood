import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

function supabaseJsClient() {
  return createBrowserClient(SUPABASE_URL, PUBLISHABLE_KEY);
}

export { supabaseJsClient };
