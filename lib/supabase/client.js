import { createBrowserClient } from "@supabase/ssr";

let client = null;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url === "your-supabase-url") {
    return null;
  }

  if (!client) {
    client = createBrowserClient(url, key);
  }
  return client;
}
