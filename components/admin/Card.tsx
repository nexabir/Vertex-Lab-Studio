export function AdminCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl2 border border-line bg-white p-6">
      <p className="font-body text-[12px] font-medium text-muted uppercase tracking-[0.08em] mb-3">
        {label}
      </p>
      <p className="font-display text-[28px] font-medium text-ink mb-1">{value}</p>
      {hint && <p className="font-body text-[12px] text-muted">{hint}</p>}
    </div>
  );
}

export function AdminPageHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="font-display text-[26px] font-medium text-ink">{title}</h1>
      {action}
    </div>
  );
}
