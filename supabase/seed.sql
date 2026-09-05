-- Vertex Lab Studio — seed data
-- Run this AFTER schema.sql, once, in the Supabase SQL Editor.
-- Populates the catalog that ships with the site by default so the
-- admin panel has real rows to edit from day one.

-- ---------- SERVICES ----------
insert into services (slug, category, name, tagline, description, accent, icon, sort_order) values
('presentations', 'Presence', 'Presentations', 'Decks built to be presented, not just read',
 'Pitch decks, sales presentations, and internal reports designed to carry an argument from open to close.', 'coral', 'Presentation', 1),
('business-dashboards', 'Insights', 'Business Dashboards', 'Power BI, Looker, Excel, or HTML',
 'Dashboards built on the platform that fits your team, hosted locally or published for the whole company to see.', 'cyanx', 'LayoutDashboard', 2),
('websites', 'Presence', 'Websites', 'Built, launched, and kept current',
 'Design and development for business websites, plus ongoing management once it''s live.', 'coral', 'Globe', 3),
('business-consultancy', 'Strategy', 'Business Consultancy', 'A second set of eyes on the hard calls',
 'Advisory support on operations and growth planning, brought in where you need outside judgment.', 'violet', 'Compass', 4),
('marketing-sales-strategy', 'Strategy', 'Marketing & Sales Strategy', 'A plan for reaching and closing',
 'Go-to-market and sales-process strategy shaped around your market, not a generic playbook.', 'violet', 'TrendingUp', 5),
('business-documents', 'Strategy', 'Business Documents', 'The paperwork that keeps a company running',
 'Creation and ongoing management of SOPs, policies, proposals, and other core documentation.', 'violet', 'FileText', 6),
('business-analysis', 'Insights', 'Business Analysis', 'Structured reads on process and performance',
 'A close look at how a process, team, or data set is actually performing, with findings you can act on.', 'cyanx', 'BarChart3', 7),
('erp-development', 'Systems', 'ERP Development', 'Odoo, or built from scratch',
 'ERP systems on Odoo or custom code, scoped to the business functions that actually need covering.', 'lime', 'Boxes', 8),
('business-apps', 'Systems', 'Business Apps', 'Software for one specific job',
 'Purpose-built apps for a business need that off-the-shelf software doesn''t quite solve.', 'lime', 'AppWindow', 9)
on conflict (slug) do nothing;

-- ---------- QUESTIONS ----------
insert into questions (service_id, label, type, options, placeholder, sort_order)
select id, q.label, q.type, q.options::jsonb, q.placeholder, q.sort_order
from services, (values
  ('presentations', 'What''s this presentation for?', 'text', null, 'Investor pitch, sales deck, internal report...', 1),
  ('presentations', 'How many slides do you expect, roughly?', 'text', null, 'e.g. 12–15', 2),
  ('presentations', 'Do you have existing brand guidelines to follow?', 'textarea', null, 'Logo, colors, fonts, or ''none yet''', 3),

  ('business-dashboards', 'Which platform do you prefer?', 'select', '["Power BI","Looker","Excel","HTML","Not sure"]', null, 1),
  ('business-dashboards', 'What data sources need to be connected?', 'textarea', null, 'e.g. Google Sheets, SQL database, CRM export', 2),
  ('business-dashboards', 'Who is the primary audience for this dashboard?', 'text', null, null, 3),

  ('websites', 'Is this a new website or a redesign?', 'select', '["New website","Redesign","Ongoing management only"]', null, 1),
  ('websites', 'What''s the main goal of the site?', 'text', null, 'Leads, sales, information, a portfolio...', 2),
  ('websites', 'Do you have existing branding ready to use?', 'textarea', null, 'Logo, colors, or ''none yet''', 3),

  ('business-consultancy', 'What business challenge do you want help with?', 'textarea', null, null, 1),
  ('business-consultancy', 'What have you already tried?', 'textarea', null, null, 2),
  ('business-consultancy', 'What timeframe are you working with?', 'text', null, null, 3),

  ('marketing-sales-strategy', 'What are you trying to promote or sell?', 'text', null, null, 1),
  ('marketing-sales-strategy', 'Who is your target audience?', 'textarea', null, null, 2),
  ('marketing-sales-strategy', 'What''s your current sales or marketing process, if any?', 'textarea', null, null, 3),

  ('business-documents', 'Which documents do you need?', 'textarea', null, 'SOPs, policies, proposals, contracts...', 1),
  ('business-documents', 'Starting from scratch or updating existing documents?', 'select', '["From scratch","Updating existing"]', null, 2),
  ('business-documents', 'Any specific format or template required?', 'text', null, null, 3),

  ('business-analysis', 'What process or area needs analysis?', 'textarea', null, null, 1),
  ('business-analysis', 'What data do you currently have access to?', 'textarea', null, null, 2),
  ('business-analysis', 'What decision will this analysis support?', 'text', null, null, 3),

  ('erp-development', 'Odoo, or custom-built?', 'select', '["Odoo","Custom code","Not sure"]', null, 1),
  ('erp-development', 'Which business functions need to be covered?', 'textarea', null, 'Inventory, sales, HR, accounting...', 2),
  ('erp-development', 'Do you have an existing system to migrate from?', 'text', null, null, 3),

  ('business-apps', 'What should this app do, in a sentence or two?', 'textarea', null, null, 1),
  ('business-apps', 'Who will use it?', 'select', '["Internal team","Customers","Both"]', null, 2),
  ('business-apps', 'Any platform preference?', 'text', null, 'Web, mobile, both, no preference', 3)
) as q(service_slug, label, type, options, placeholder, sort_order)
where services.slug = q.service_slug;

-- ---------- COMBOS ----------
insert into combos (slug, name, summary, accent, sort_order) values
('launch-kit', 'Launch Kit', 'Everything a new venture needs to show up ready: a site, a pitch deck, and the core paperwork.', 'violet', 1),
('insight-engine', 'Insight Engine', 'Turn scattered data into decisions, with a dashboard, the analysis behind it, and a consultant to interpret it.', 'cyanx', 2),
('operations-core', 'Operations Core', 'The systems layer: an ERP, the internal apps your team actually uses, and analysis to keep it tuned.', 'coral', 3),
('go-to-market', 'Go-To-Market', 'Position, publish, and pitch — the three things a market push needs in place before anything else.', 'lime', 4)
on conflict (slug) do nothing;

insert into combo_services (combo_id, service_id)
select c.id, s.id
from (values
  ('launch-kit', 'websites'), ('launch-kit', 'presentations'), ('launch-kit', 'business-documents'),
  ('insight-engine', 'business-dashboards'), ('insight-engine', 'business-analysis'), ('insight-engine', 'business-consultancy'),
  ('operations-core', 'erp-development'), ('operations-core', 'business-apps'), ('operations-core', 'business-analysis'),
  ('go-to-market', 'marketing-sales-strategy'), ('go-to-market', 'websites'), ('go-to-market', 'presentations')
) as pairing(combo_slug, service_slug)
join combos c on c.slug = pairing.combo_slug
join services s on s.slug = pairing.service_slug
on conflict do nothing;

-- ---------- SITE SETTINGS ----------
insert into site_settings (key, value) values
('contact', '{"email": "abirislam2020@gmail.com", "phone": "01797989412", "address": ""}'),
('seo_defaults', '{"title": "Vertex Lab Studio — Digital products for business development", "description": "Vertex Lab Studio turns business problems into engineered digital solutions — dashboards, ERP, websites, and strategy — built to your brief."}')
on conflict (key) do update set value = excluded.value;
