"use client";

import { useState, FormEvent } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <div className="max-w-[560px]">
        <Eyebrow>Get in touch</Eyebrow>
        <h1 className="font-display text-[36px] sm:text-[44px] font-medium text-ink mb-5">
          Not sure where to start?
        </h1>
        <p className="font-body text-[15px] leading-relaxed text-muted mb-12">
          Send a general question here. If you already know which products you need, the{" "}
          <a href="/request" className="text-ink underline underline-offset-2">
            guided request
          </a>{" "}
          gets you a proposal faster.
        </p>

        {status === "sent" ? (
          <div className="rounded-xl2 border border-line bg-white p-8 flex items-start gap-4">
            <CheckCircle2 className="text-violet shrink-0 mt-0.5" size={22} />
            <div>
              <p className="font-display text-[17px] font-medium text-ink mb-1">Message sent</p>
              <p className="font-body text-[14px] text-muted">
                We'll get back to you at the email address you provided.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-[13px] font-medium text-ink mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
              />
            </div>
            <div>
              <label className="block font-body text-[13px] font-medium text-ink mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
              />
            </div>
            <div>
              <label className="block font-body text-[13px] font-medium text-ink mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none resize-none"
              />
            </div>
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
            {status === "error" && (
              <p className="font-body text-[13px] text-coral">
                Something went wrong — please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
