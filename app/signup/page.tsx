"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Couldn't sign up — please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="max-w-content mx-auto px-6 pt-[150px] pb-24 text-center">
        <div className="w-14 h-14 rounded-full bg-violet/10 text-violet flex items-center justify-center mx-auto mb-7">
          <CheckCircle2 size={28} />
        </div>
        <h1 className="font-display text-[28px] font-medium text-ink mb-4">Check your email</h1>
        <p className="font-body text-[15px] text-muted max-w-[400px] mx-auto">
          We sent a confirmation link to {email}. Click it to activate your account, then log in.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <div className="max-w-[420px] mx-auto">
        <Eyebrow>Create an account</Eyebrow>
        <h1 className="font-display text-[32px] font-medium text-ink mb-9">Sign up</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-2">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
            />
          </div>
          {status === "error" && <p className="font-body text-[13px] text-coral">{errorMsg}</p>}
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Creating account…" : "Sign up"}
          </Button>
        </form>
        <p className="font-body text-[13px] text-muted mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-ink underline underline-offset-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
