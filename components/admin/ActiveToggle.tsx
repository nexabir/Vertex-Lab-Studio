"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { clsx } from "clsx";

export function ActiveToggle({ table, id, value }: { table: string; id: string; value: boolean }) {
  const [active, setActive] = useState(value);

  async function toggle() {
    const next = !active;
    setActive(next);
    const supabase = createClient();
    await supabase.from(table).update({ active: next }).eq("id", id);
  }

  return (
    <button
      onClick={toggle}
      className={clsx(
        "relative w-10 h-5.5 rounded-full transition-colors",
        active ? "bg-violet" : "bg-line"
      )}
      style={{ height: 22 }}
      aria-pressed={active}
    >
      <span
        className={clsx(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
          active ? "translate-x-[19px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
