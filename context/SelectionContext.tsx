"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { services as staticServices, Service } from "@/data/services";
import { questionsByService as staticQuestions, Question } from "@/data/questions";

interface SelectionContextValue {
  selected: string[];
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  setAll: (ids: string[]) => void;
  clear: () => void;
  has: (id: string) => boolean;
  services: Service[];
  questions: Record<string, Question[]>;
  getService: (id: string) => Service | undefined;
  catalogLoading: boolean;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);
const STORAGE_KEY = "vls-selected-services";

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [services, setServices] = useState<Service[]>(staticServices);
  const [questions, setQuestions] = useState<Record<string, Question[]>>(staticQuestions);
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSelected(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      // ignore
    }
  }, [selected, hydrated]);

  // Pull the live catalog (Supabase-backed if configured, static otherwise)
  // once per session so client-only screens like the request flow reflect
  // whatever the admin has published.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        if (Array.isArray(data.services) && data.services.length > 0) setServices(data.services);
        if (data.questions && Object.keys(data.questions).length > 0) setQuestions(data.questions);
      })
      .catch(() => {
        // Fall back silently to the static catalog already in state.
      })
      .finally(() => {
        if (!cancelled) setCatalogLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<SelectionContextValue>(
    () => ({
      selected,
      toggle: (id: string) =>
        setSelected((prev) =>
          prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        ),
      add: (id: string) =>
        setSelected((prev) => (prev.includes(id) ? prev : [...prev, id])),
      remove: (id: string) =>
        setSelected((prev) => prev.filter((s) => s !== id)),
      setAll: (ids: string[]) => setSelected(ids),
      clear: () => setSelected([]),
      has: (id: string) => selected.includes(id),
      services,
      questions,
      getService: (id: string) => services.find((s) => s.id === id),
      catalogLoading,
    }),
    [selected, services, questions, catalogLoading]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used within SelectionProvider");
  return ctx;
}
