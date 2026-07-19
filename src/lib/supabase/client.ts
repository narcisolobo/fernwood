import {
  createClient,
  type SupabaseClientOptions,
} from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const options: SupabaseClientOptions<"fernwood"> = {
  db: {
    schema: "fernwood",
  },
};

function supabaseJsClient() {
  return createClient(SUPABASE_URL, PUBLISHABLE_KEY, options);
}

export { supabaseJsClient };
