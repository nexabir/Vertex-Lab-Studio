"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ExternalLink, Filter, CheckCircle2, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface RequestItem {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string | null;
  company?: string | null;
  service_ids: string[];
  status: string;
  created_at: string;
}

const statusColor: Record<string, string> = {
  new: "bg-violet/10 text-violet border-violet/20",
  reviewed: "bg-cyanx/10 text-[#0B93AE] border-cyanx/20",
  proposal_sent: "bg-coral/10 text-coral border-coral/20",
  won: "bg-lime/20 text-[#7A9A0E] border-lime/30",
  lost: "bg-line text-muted border-line",
};

const statusTabs = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "reviewed", label: "In Review" },
  { id: "proposal_sent", label: "Proposal Sent" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Archived" },
];

export function AdminRequestsList({ initialRequests }: { initialRequests: RequestItem[] }) {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [activeTab, setActiveTab] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    if (activeTab === "all") return true;
    return r.status === activeTab;
  });

  async function handleStatusChange(id: string, nextStatus: string) {
    setUpdatingId(id);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r))
    );

    try {
      const supabase = createClient();
      await supabase.from("requests").update({ status: nextStatus }).eq("id", id);
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      {/* TABS HEADER */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-line">
          {statusTabs.map((tab) => {
            const count =
              tab.id === "all"
                ? requests.length
                : requests.filter((r) => r.status === tab.id).length;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-body text-[12.5px] font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-ink text-cream shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-cream/20 text-cream" : "bg-line text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="font-body text-[12.5px] text-muted">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> requests
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl2 border border-line bg-white overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-body text-[14px] text-muted mb-1">No requests found in this view.</p>
            <p className="font-body text-[12px] text-muted/70">
              New client submissions will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-cream/30">
                  <th className="px-6 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                    Contact & Client
                  </th>
                  <th className="px-6 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                    Services / Scope
                  </th>
                  <th className="px-6 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                    Pipeline Status
                  </th>
                  <th className="px-6 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((r) => {
                  const mailSubject = encodeURIComponent(
                    `Vertex Lab Studio — Discussion on your project`
                  );
                  const mailBody = encodeURIComponent(
                    `Hi ${r.contact_name},\n\nThank you for reaching out to Vertex Lab Studio regarding your inquiry.\n\nI reviewed your brief and would love to coordinate a 15-minute alignment call to walk through our proposed approach and deliverables.\n\nBest regards,\nVertex Lab Studio Team`
                  );
                  const mailtoUrl = `mailto:${r.contact_email}?subject=${mailSubject}&body=${mailBody}`;

                  return (
                    <tr key={r.id} className="hover:bg-cream/20 transition-colors">
                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <Link href={`/admin/requests/${r.id}`} className="group block">
                          <p className="font-body text-[14px] font-semibold text-ink group-hover:text-violet transition-colors">
                            {r.contact_name}
                          </p>
                          <p className="font-body text-[12px] text-muted">{r.contact_email}</p>
                          {(r.company || r.contact_phone) && (
                            <p className="font-body text-[11px] text-muted/80 mt-0.5">
                              {[r.company, r.contact_phone].filter(Boolean).join(" • ")}
                            </p>
                          )}
                        </Link>
                      </td>

                      {/* Scope / Services */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                          {(r.service_ids ?? []).length === 0 ? (
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-body bg-cream border border-line text-muted">
                              General Contact / Fast-Track
                            </span>
                          ) : (
                            r.service_ids.map((s) => (
                              <span
                                key={s}
                                className="inline-block px-2 py-0.5 rounded text-[11px] font-body bg-cream border border-line text-ink-soft capitalize"
                              >
                                {s.replace("-", " ")}
                              </span>
                            ))
                          )}
                        </div>
                        <p className="font-body text-[11px] text-muted mt-1.5 flex items-center gap-1">
                          <Clock size={11} /> {new Date(r.created_at).toLocaleDateString()}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-6 py-4">
                        <select
                          value={r.status}
                          disabled={updatingId === r.id}
                          onChange={(e) => handleStatusChange(r.id, e.target.value)}
                          className={`rounded-full border px-3 py-1 text-[11.5px] font-body font-medium capitalize outline-none cursor-pointer ${
                            statusColor[r.status] ?? "bg-line text-muted"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">In Review</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="won">Won / Closed</option>
                          <option value="lost">Archived</option>
                        </select>
                      </td>

                      {/* Quick Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-line text-[12px] font-body text-ink-soft hover:text-ink hover:border-ink transition-colors"
                            title="Open prefilled email response"
                          >
                            <Mail size={12} /> Reply
                          </a>
                          <Link
                            href={`/admin/requests/${r.id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cream/80 text-[12px] font-body text-ink hover:bg-cream transition-colors"
                          >
                            Brief <ExternalLink size={11} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
