# Vertex Lab Studio — Website + Admin Panel

A premium multi-page site for Vertex Lab Studio with customer accounts, a
guided multi-service request flow, a public blog, and an admin panel
(dashboard, requests log, and CMS for services/combos/blog/settings) — all
backed by Supabase.

## Architecture

- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind
- **Database/Auth:** Supabase (Postgres + Auth). RLS policies gate every
  table — admins (role = 'admin' in `profiles`) can write; everyone else
  gets read-only access to published/active content.
- **Fallback data:** `/data/*.ts` — if Supabase isn't configured yet, the
  public site reads from these static files instead, so it works with zero
  setup. Once you add Supabase env vars and run the seed script, it
  switches to live data automatically (no code changes needed).

## Public site

`/` `/services` `/combos` `/portfolio` `/blog` `/blog/[slug]` `/contact`
`/request` (guided multi-step service request) `/login` `/signup`

## Admin panel (`/admin`, requires role = 'admin')

- **Dashboard** — request volume, 30-day trend, most-requested service
- **Requests** — every submission with status tracking (new → reviewed →
  proposal sent → won/lost)
- **Services / Combos** — full CRUD, including which services belong to
  which combo
- **Blog** — Markdown editor with write/preview toggle, draft/publish,
  per-post SEO title + description
- **Settings** — contact info and default site SEO, editable without
  touching code

## SEO already wired up

`app/sitemap.ts` and `app/robots.ts` generate real, live `sitemap.xml` /
`robots.txt`. Every blog post carries its own meta title/description.

---

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier is enough to start).
2. Open **SQL Editor** → paste and run `supabase/schema.sql` (creates every
   table, RLS policy, and the auto-profile trigger).
3. Run `supabase/seed.sql` next — populates the 9 services, 4 combos, their
   questions, and your contact info as a starting point.
4. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep secret — only used server-side if you add
     admin scripts later; not required for the app to run)
5. Go to **Authentication → Providers** and confirm **Email** is enabled
   (it is by default).

## 2. Configure environment variables

Copy `.env.example` to `.env.local` for local dev:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Create your admin account

1. Run the site locally (`npm install && npm run dev`) or use it once
   deployed.
2. Go to `/signup` and create an account with **abirislam2020@gmail.com**.
3. In Supabase → **Table Editor → profiles**, find your row and change
   `role` from `customer` to `admin` — or run this in the SQL Editor:

   ```sql
   update profiles set role = 'admin' where email = 'abirislam2020@gmail.com';
   ```
4. Log in again — you'll see an **Admin** link in the header, and `/admin`
   will be reachable.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Vertex Lab Studio site"
gh repo create vertex-lab-studio --private --source=. --remote=origin
git push -u origin main
```

(No `gh` CLI? Create an empty repo on github.com, then
`git remote add origin <url> && git branch -M main && git push -u origin main`.)

## 5. Deploy to Vercel

1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo.
   Framework preset auto-detects Next.js.
2. Before the first deploy, add environment variables (Project Settings →
   Environment Variables): `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and optionally `NEXT_PUBLIC_SITE_URL`
   (your final domain, used in the sitemap).
3. Deploy. Every push to `main` redeploys automatically.
4. **Supabase auth redirect:** in Supabase → Authentication → URL
   Configuration, add your Vercel URL (and custom domain, once set) to
   **Site URL** and **Redirect URLs** — otherwise login/signup will
   silently fail on the live site.
5. Custom domain: Vercel project → Settings → Domains → add your domain
   and follow the DNS instructions it gives you.

## Local development

```bash
npm install
npm run dev
```

Without Supabase configured, everything works off the static catalog in
`/data` except login, the admin panel, and the blog (which needs a
database).

## What's intentionally out of scope for this pass

- Rich WYSIWYG blog editor (current editor is Markdown with live preview —
  solid for a single-author blog; upgrade later if multiple non-technical
  writers need it)
- Deep SEO tooling (keyword tracking, redirects manager, competitor
  analysis) — the catalog already has the SEO skills for this once the
  site has real traffic to analyze
- Granular analytics (page-view heatmaps, funnels) — the activity log
  currently tracks signups, logins, and submissions, which is what drives
  the dashboard's request trend
