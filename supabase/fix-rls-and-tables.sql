-- ============================================================
-- Vertex Lab Studio — Fix Database RLS Policies & Missing Tables
-- Run this ONCE in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/swfyalqcopygvzpvlfcl/sql/new
-- ============================================================

-- 1. FIX REQUESTS TABLE RLS
-- Allows any visitor (anonymous or logged in) to submit a service request
alter table if exists requests enable row level security;

drop policy if exists "requests_insert_anyone" on requests;
drop policy if exists "Enable insert for authenticated users only" on requests;
drop policy if exists "Enable insert for all users" on requests;

create policy "requests_insert_anyone"
  on requests
  for insert
  to public
  with check (true);

-- Ensure select & update policies exist
drop policy if exists "requests_select_own_or_admin" on requests;
create policy "requests_select_own_or_admin"
  on requests
  for select
  to public
  using (auth.uid() = user_id or is_admin());

drop policy if exists "requests_admin_update" on requests;
create policy "requests_admin_update"
  on requests
  for update
  to authenticated
  using (is_admin());

-- 2. FIX ACTIVITY_LOG TABLE RLS
-- Allows any visitor event (e.g. request_submitted) to be logged
alter table if exists activity_log enable row level security;

drop policy if exists "activity_insert_anyone" on activity_log;
create policy "activity_insert_anyone"
  on activity_log
  for insert
  to public
  with check (true);

drop policy if exists "activity_select_admin" on activity_log;
create policy "activity_select_admin"
  on activity_log
  for select
  to authenticated
  using (is_admin());

-- 3. CREATE MISSING PROBLEM TRACKER LEADS TABLE
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

drop policy if exists "tracker_leads_insert_anyone" on problem_tracker_leads;
create policy "tracker_leads_insert_anyone"
  on problem_tracker_leads
  for insert
  to public
  with check (true);

drop policy if exists "tracker_leads_select_admin" on problem_tracker_leads;
create policy "tracker_leads_select_admin"
  on problem_tracker_leads
  for select
  to authenticated
  using (is_admin());

-- 4. ALIGN SERVICE ACCENTS WITH BRAND CATEGORY PALETTES
-- Insights -> cyan | Presence -> coral | Strategy -> violet | Systems -> lime
update services set accent = 'coral' where slug = 'presentations';
update services set accent = 'violet' where slug = 'business-consultancy';
update services set accent = 'violet' where slug = 'business-documents';
update services set accent = 'cyanx' where slug = 'business-analysis';
update services set accent = 'lime' where slug = 'business-apps';
