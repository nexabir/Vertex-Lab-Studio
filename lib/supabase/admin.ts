import { createClient } from "@supabase/supabase-js";

/**
 * Creates an elevated Supabase client for server-side operations
 * (API route handlers, background tasks) that need to bypass RLS
 * or insert inbound submissions safely.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY if set in environment variables,
 * and falls back to NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
