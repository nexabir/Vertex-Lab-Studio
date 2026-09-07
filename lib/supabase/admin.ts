import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "./config";

/**
 * Creates an elevated Supabase client for server-side operations
 * (API route handlers, background tasks) that need to bypass RLS
 * or insert inbound submissions safely.
 *
 * Always uses the service-role key (with hardcoded fallback)
 * so inserts are never blocked by RLS policies.
 */
export function createAdminClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
