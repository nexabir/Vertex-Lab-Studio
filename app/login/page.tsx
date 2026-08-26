"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(params.get("next") || "/");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Couldn't sign in — check your details.");
    }
  }

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <div className="max-w-[420px] mx-auto">
        <Eyebrow>Welcome back</Eyebrow>
        <h1 className="font-display text-[32px] font-medium text-ink mb-9">Log in</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
            />
          </div>
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
            />
          </div>
          {status === "error" && <p className="font-body text-[13px] text-coral">{errorMsg}</p>}
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Signing in…" : "Log in"}
          </Button>
        </form>
        <p className="font-body text-[13px] text-muted mt-6 text-center">
          No account yet?{" "}
          <Link href="/signup" className="text-ink underline underline-offset-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
