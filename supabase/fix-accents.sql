-- Vertex Lab Studio — fix accent-to-category mapping
-- Run this ONCE if you already ran the original seed.sql (i.e. your site
-- is live and showing services). If you haven't seeded yet, skip this —
-- the corrected colors are already in seed.sql.
--
-- Before: accent cycled every 4 services regardless of category, so two
-- services in the same category (e.g. Business Dashboards and Business
-- Analysis, both "Insights") could show different colors.
-- After: every category maps to exactly one accent, consistently.
--   Insights -> cyan | Presence -> coral | Strategy -> violet | Systems -> lime

update services set accent = 'coral' where slug = 'presentations';
update services set accent = 'violet' where slug = 'business-consultancy';
update services set accent = 'violet' where slug = 'business-documents';
update services set accent = 'cyanx' where slug = 'business-analysis';
update services set accent = 'lime' where slug = 'business-apps';
-- websites (coral), business-dashboards (cyanx), marketing-sales-strategy (violet),
-- and erp-development (lime) were already correct — no change needed.
