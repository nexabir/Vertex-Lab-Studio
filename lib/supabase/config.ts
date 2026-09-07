// ── Supabase Configuration ──────────────────────────────────────────
// Centralised getters that sanitise and fall back to known-good values.
// This prevents "TypeError: fetch failed" on Vercel when env vars are
// missing, set to placeholder text, or have trailing whitespace.

const FALLBACK_URL = "https://swfyalqcopygvzpvlfcl.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZnlhbHFjb3B5Z3Z6cHZsZmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTU3MTYsImV4cCI6MjA5NDIzMTcxNn0.NNPYWO4bOBg46PQMCwux9VPu1AammfqrIXfXgraSAzk";
const FALLBACK_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZnlhbHFjb3B5Z3Z6cHZsZmNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODY1NTcxNiwiZXhwIjoyMDk0MjMxNzE2fQ.hphXY3GrbsFbvSrXePWcbbhP0T6KyTHQ8aiZD559doE";

/** Strings that indicate a value is still a placeholder, not a real credential. */
const PLACEHOLDER_PATTERNS = [
  "your-project",
  "your-anon",
  "your-service",
  "your-key",
  "your_project",
  "placeholder",
  "change-me",
  "CHANGE_ME",
  "xxx",
];

/** Returns true if the value looks like a placeholder from .env.example. */
function isPlaceholder(val: string): boolean {
  const lower = val.toLowerCase();
  return PLACEHOLDER_PATTERNS.some((p) => lower.includes(p.toLowerCase()));
}

/** Strip surrounding quotes and whitespace; ensure https:// prefix. */
function sanitiseUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let v = raw.trim().replace(/^["']+|["']+$/g, "").trim();
  if (!v || isPlaceholder(v)) return undefined;
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  return v;
}

/** Strip surrounding quotes and whitespace from a key value. */
function sanitiseKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const v = raw.trim().replace(/^["']+|["']+$/g, "").trim();
  if (!v || isPlaceholder(v)) return undefined;
  // Real Supabase JWTs are always longer than 100 chars
  if (v.length < 100) return undefined;
  return v;
}

// ── Public getters ──────────────────────────────────────────────────

export function getSupabaseUrl(): string {
  return sanitiseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) ?? FALLBACK_URL;
}

export function getSupabaseAnonKey(): string {
  return sanitiseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ?? FALLBACK_ANON_KEY;
}

export function getSupabaseServiceRoleKey(): string {
  return (
    sanitiseKey(process.env.SUPABASE_SERVICE_ROLE_KEY) ??
    FALLBACK_SERVICE_ROLE_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  return true;
}
