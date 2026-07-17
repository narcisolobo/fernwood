import {
  createClient,
  type SupabaseClientOptions,
} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const options: SupabaseClientOptions<"fernwood"> = {
  db: {
    schema: "fernwood",
  },
};

const supabase = createClient(supabaseUrl, publishableKey, options);

export { supabase };
