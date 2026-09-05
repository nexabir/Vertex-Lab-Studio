-- Vertex Lab Studio — Business Problem Tracker leads table
-- Run this once, in addition to schema.sql. Deliberately a SEPARATE table
-- from `requests` — tracker leads are top-of-funnel and shouldn't mix with
-- actual service requests in the admin's main queue.

create table if not exists problem_tracker_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  selected_problems text[] not null default '{}',
  free_text text,
  recommended_services text[] not null default '{}',
  matched_combo text,
  created_at timestamptz not null default now()
);

alter table problem_tracker_leads enable row level security;

-- Anyone (including anonymous visitors) can submit their info to get a report.
create policy "tracker_leads_insert_anyone" on problem_tracker_leads
  for insert with check (true);

-- Only admins can read the leads.
create policy "tracker_leads_select_admin" on problem_tracker_leads
  for select using (is_admin());
