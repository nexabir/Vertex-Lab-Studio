"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Inbox,
  Boxes,
  Layers,
  Newspaper,
  Settings,
  Target,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { RaysMark } from "@/components/RaysMark";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Requests", icon: Inbox },
  { href: "/admin/problem-tracker", label: "Tracker Leads", icon: Target },
  { href: "/admin/services", label: "Services", icon: Boxes },
  { href: "/admin/combos", label: "Combos", icon: Layers },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  adminEmail,
}: {
  children: React.ReactNode;
  adminEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="w-[260px] shrink-0 bg-ink text-cream flex flex-col fixed inset-y-0">
        <div className="h-[70px] flex items-center gap-2.5 px-6 border-b border-cream/10">
          <RaysMark size={26} hubColor="#F5F3EE" />
          <span className="font-display text-[14px] font-semibold">VLS Admin</span>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          {nav.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-[13.5px] font-medium transition-colors",
                  active ? "bg-cream/10 text-cream" : "text-cream/55 hover:text-cream hover:bg-cream/5"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-cream/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-[13px] text-cream/55 hover:text-cream hover:bg-cream/5"
          >
            <ExternalLink size={15} /> View site
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-[13px] text-cream/55 hover:text-cream hover:bg-cream/5"
          >
            <LogOut size={15} /> Sign out
          </button>
          <p className="px-3 pt-2 font-body text-[11px] text-cream/30 truncate">{adminEmail}</p>
        </div>
      </aside>
      <div className="flex-1 ml-[260px]">
        <div className="max-w-[1100px] mx-auto px-8 py-10">{children}</div>
      </div>
    </div>
  );
}
