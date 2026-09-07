-- ============================================================
-- PORTFOLIO PROJECTS  (Admin-managed case studies)
-- Run this in Supabase SQL Editor to enable live portfolio management
-- ============================================================

create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Insights', 'Systems', 'Presence', 'Strategy')),
  client_name text not null,
  summary text not null,
  problem text not null,
  solution text not null,
  metrics jsonb not null default '[]', -- e.g. [{"label": "Decision Speed", "value": "+42%"}, {"label": "Manual Hours Saved", "value": "18 hrs/wk"}]
  tags text[] not null default '{}',
  live_url text,
  cover_image_url text,
  accent text not null default 'cyanx' check (accent in ('violet','cyanx','coral','lime')),
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table portfolio_projects enable row level security;

create policy "portfolio_public_read" on portfolio_projects 
  for select using (active = true or is_admin());

create policy "portfolio_admin_write" on portfolio_projects 
  for insert with check (is_admin());

create policy "portfolio_admin_update" on portfolio_projects 
  for update using (is_admin());

create policy "portfolio_admin_delete" on portfolio_projects 
  for delete using (is_admin());

-- Seed sample case studies
insert into portfolio_projects (slug, title, category, client_name, summary, problem, solution, metrics, tags, accent, sort_order, active)
values
(
  'executive-bi-revenue-dashboard',
  'Unified Executive Revenue & Performance Intelligence',
  'Insights',
  'Apex Logistics Group',
  'Consolidated 6 fragmented data streams into a single real-time executive dashboard for 50+ decision-makers.',
  'Executives were spending 12+ hours every Monday compiling disconnected reports from Stripe, QuickBooks, Excel, and custom warehouses, causing delayed operational decisions and missed margin leakages.',
  'Engineered an automated data ingestion pipeline connected to an interactive high-density BI dashboard with predictive margin alerts, departmental breakdowns, and instant PDF/Slack reporting.',
  '[{"label": "Report prep time", "value": "Zero manual hrs"}, {"label": "Margin recovery", "value": "+14.8%"}, {"label": "Daily active users", "value": "52 leaders"}]'::jsonb,
  ARRAY['Power BI / Supabase', 'PostgreSQL ETL', 'Real-time WebSockets', 'Automated Slack Webhooks'],
  'cyanx',
  1,
  true
),
(
  'multi-warehouse-inventory-erp',
  'Centralized Multi-Warehouse Supply Chain & ERP Platform',
  'Systems',
  'Nordic Gear Co.',
  'Custom-engineered enterprise resource planning platform unifying purchasing, stock forecasting, and order dispatching.',
  'Rapid omnichannel growth across 4 warehouses led to frequent stockouts, double-allocated inventory, and chaotic paper-based picking workflows costing an estimated $180k in annual delivery penalties.',
  'Built a unified web-first ERP system featuring live barcode scanning, automated PO generation based on seasonal sales velocity, and sub-second inventory sync across retail and wholesale channels.',
  '[{"label": "Stockout reduction", "value": "-86%"}, {"label": "Fulfillment speed", "value": "2.4x faster"}, {"label": "Annual cost saved", "value": "$165k"}]'::jsonb,
  ARRAY['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Hardware Scanner API', 'Role-Based Access'],
  'lime',
  2,
  true
),
(
  'fintech-customer-portal-presence',
  'High-Conversion Platform & Institutional Client Portal',
  'Presence',
  'Vanguard Capital Partners',
  'Complete digital repositioning, marketing engine, and authenticated customer onboarding portal.',
  'The firm was relying on a slow, outdated 2018 WordPress brochure site with a 1.2% inquiry rate and manual PDF email onboarding that scared away tier-1 institutional investors.',
  'Designed and developed a lightning-fast digital presence with interactive ROI calculators, bank-grade secure client document upload portal, and frictionless digital identity verification.',
  '[{"label": "Inquiry conversion", "value": "+185%"}, {"label": "Time to onboard", "value": "3 days to 14 mins"}, {"label": "Page speed score", "value": "99/100"}]'::jsonb,
  ARRAY['Next.js App Router', 'Tailwind CSS', 'Framer Motion', 'Supabase Auth & Storage'],
  'coral',
  3,
  true
)
on conflict (slug) do nothing;
