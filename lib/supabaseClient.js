import { createBrowserClient } from '@supabase/ssr';

// One shared client for the whole app. Reads the two env vars you set
// in .env.local (see .env.local.example) or in Vercel's Environment
// Variables settings once deployed.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
