export function Eyebrow({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <p
      className={`font-body text-[12px] font-semibold tracking-[0.18em] uppercase mb-4 ${
        dark ? "text-cream/50" : "text-muted"
      }`}
    >
      {children}
    </p>
  );
}
