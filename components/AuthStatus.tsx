"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { clsx } from "clsx";

interface AuthState {
  email: string;
  role: "customer" | "admin";
}

export function AuthStatus({ dark }: { dark?: boolean }) {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoaded(true);
      return;
    }
    const supabase = createClient();
    let cancelled = false;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) {
          setAuth(null);
          setLoaded(true);
        }
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (!cancelled) {
        setAuth({ email: user.email ?? "", role: (profile?.role as "customer" | "admin") ?? "customer" });
        setLoaded(true);
      }
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!isSupabaseConfigured() || !loaded) return null;

  const linkClass = clsx(
    "font-body text-[14px] font-medium transition-colors inline-flex items-center gap-1.5",
    dark ? "text-cream/80 hover:text-cream" : "text-ink-soft hover:text-ink"
  );

  if (!auth) {
    return (
      <Link href="/login" className={linkClass}>
        <User size={15} /> Log in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-5">
      {auth.role === "admin" && (
        <Link href="/admin" className={linkClass}>
          <LayoutDashboard size={15} /> Admin
        </Link>
      )}
      <button onClick={handleSignOut} className={linkClass}>
        <LogOut size={15} /> Sign out
      </button>
    </div>
  );
}
