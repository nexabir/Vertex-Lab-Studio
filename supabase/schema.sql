-- Vertex Lab Studio — database schema
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).

create extension if not exists "pgcrypto";

-- ============================================================
-- PROFILES  (one row per auth user; role drives admin access)
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever someone signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- SERVICES / COMBOS / QUESTIONS  (the catalog, admin-editable)
-- ============================================================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null,
  name text not null,
  tagline text not null,
  description text not null,
  accent text not null default 'violet' check (accent in ('violet','cyanx','coral','lime')),
  icon text not null default 'Globe',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  label text not null,
  type text not null check (type in ('text','textarea','select')),
  options jsonb,
  placeholder text,
  sort_order int not null default 0
);

create table if not exists combos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  summary text not null,
  accent text not null default 'violet' check (accent in ('violet','cyanx','coral','lime')),
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists combo_services (
  combo_id uuid not null references combos(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  primary key (combo_id, service_id)
);

-- ============================================================
-- REQUESTS  (submitted from the guided request flow)
-- ============================================================
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  company text,
  service_ids text[] not null default '{}', -- service slugs, matching the site's service ids
  answers jsonb not null default '{}',
  status text not null default 'new' check (status in ('new','reviewed','proposal_sent','won','lost')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- ACTIVITY LOG  (drives the admin trend chart)
-- ============================================================
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  event_type text not null, -- 'signup' | 'login' | 'request_submitted' | 'contact_submitted' | 'service_viewed'
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ============================================================
-- BLOG
-- ============================================================
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null default '',
  cover_image_url text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published')),
  author_id uuid references profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- SITE SETTINGS  (key/value store for contact info, SEO defaults, etc.)
-- ============================================================
create table if not exists site_settings (
  key text primary key,
  value jsonb not null
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table profiles enable row level security;
alter table services enable row level security;
alter table questions enable row level security;
alter table combos enable row level security;
alter table combo_services enable row level security;
alter table requests enable row level security;
alter table activity_log enable row level security;
alter table blog_posts enable row level security;
alter table site_settings enable row level security;

-- helper: is the current user an admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- profiles: users read/update their own row; admins read everything
create policy "profiles_select_own" on profiles for select using (auth.uid() = id or is_admin());
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- services/questions/combos/combo_services: public reads active rows, admin manages everything
create policy "services_public_read" on services for select using (active = true or is_admin());
create policy "services_admin_write" on services for insert with check (is_admin());
create policy "services_admin_update" on services for update using (is_admin());
create policy "services_admin_delete" on services for delete using (is_admin());

create policy "questions_public_read" on questions for select using (true);
create policy "questions_admin_write" on questions for insert with check (is_admin());
create policy "questions_admin_update" on questions for update using (is_admin());
create policy "questions_admin_delete" on questions for delete using (is_admin());

create policy "combos_public_read" on combos for select using (active = true or is_admin());
create policy "combos_admin_write" on combos for insert with check (is_admin());
create policy "combos_admin_update" on combos for update using (is_admin());
create policy "combos_admin_delete" on combos for delete using (is_admin());

create policy "combo_services_public_read" on combo_services for select using (true);
create policy "combo_services_admin_write" on combo_services for insert with check (is_admin());
create policy "combo_services_admin_delete" on combo_services for delete using (is_admin());

-- requests: anyone (incl. anonymous visitors) can submit; only the owner or an admin can read
create policy "requests_insert_anyone" on requests for insert with check (true);
create policy "requests_select_own_or_admin" on requests for select using (auth.uid() = user_id or is_admin());
create policy "requests_admin_update" on requests for update using (is_admin());

-- activity_log: anyone can insert an event; only admins can read the log
create policy "activity_insert_anyone" on activity_log for insert with check (true);
create policy "activity_select_admin" on activity_log for select using (is_admin());

-- blog_posts: public reads published posts; admin manages everything
create policy "blog_public_read_published" on blog_posts for select using (status = 'published' or is_admin());
create policy "blog_admin_write" on blog_posts for insert with check (is_admin());
create policy "blog_admin_update" on blog_posts for update using (is_admin());
create policy "blog_admin_delete" on blog_posts for delete using (is_admin());

-- site_settings: public read, admin write
create policy "settings_public_read" on site_settings for select using (true);
create policy "settings_admin_write" on site_settings for insert with check (is_admin());
create policy "settings_admin_update" on site_settings for update using (is_admin());
