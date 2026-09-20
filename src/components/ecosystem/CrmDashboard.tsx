"use client";

import { useEffect, useState } from "react";
import type { InvestorRecord } from "@/ecosystem/types";
import { INTERNAL_AGENTS } from "@/ecosystem/data/agents";
import Link from "next/link";

export function CrmDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [investors, setInvestors] = useState<InvestorRecord[]>([]);
  const [accommodationLeads, setAccommodationLeads] = useState<InvestorRecord[]>([]);
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"all" | "accommodation">("all");
  const [delivery, setDelivery] = useState<{
    smtpConfigured: boolean;
    recipient: string;
    recipientIsFallback: boolean;
    status: {
      lastSentAt: string | null;
      lastSentTo: string | null;
      lastErrorAt: string | null;
      lastErrorMessage: string | null;
      totalSent: number;
      totalFailed: number;
    };
  } | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("zb_admin_key");
    if (saved) {
      setApiKey(saved);
      fetchData(saved);
    }
  }, []);

  async function fetchData(key: string) {
    setError("");
    const [invRes, accRes, delRes] = await Promise.all([
      fetch("/api/ecosystem/investors", { headers: { "x-admin-key": key } }),
      fetch("/api/ecosystem/accommodation-leads", { headers: { "x-admin-key": key } }),
      fetch("/api/ecosystem/delivery-status", { headers: { "x-admin-key": key } }),
    ]);
    if (!invRes.ok || !accRes.ok) {
      setError("Invalid admin key");
      setAuthed(false);
      return;
    }
    const invData = await invRes.json();
    const accData = await accRes.json();
    setInvestors(invData.investors);
    setAccommodationLeads(accData.leads);
    setStats(invData.stats);
    if (delRes.ok) {
      const delData = await delRes.json();
      setDelivery(delData);
    }
    setAuthed(true);
    sessionStorage.setItem("zb_admin_key", key);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(apiKey);
  }

  const displayedLeads = tab === "accommodation" ? accommodationLeads : investors;

  if (!authed) {
    return (
      <form onSubmit={handleLogin} className="mx-auto max-w-md luxury-card p-6">
        <h2 className="font-serif text-xl font-semibold text-navy-heading">Investor CRM</h2>
        <p className="mt-2 text-[14px] text-body">Enter admin API key to access the investor pipeline.</p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Admin API key"
          className="mt-4 w-full rounded-luxury border border-border px-4 py-3 text-[15px]"
        />
        {error && <p className="mt-2 text-[14px] text-red-600">{error}</p>}
        <button type="submit" className="mt-4 w-full rounded-luxury bg-gold py-3 text-[15px] font-semibold text-white">
          Access CRM
        </button>
        <p className="mt-3 text-[12px] text-muted">Set ADMIN_API_KEY in .env.local</p>
      </form>
    );
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("all")}
          className={`rounded-full px-4 py-2 text-[14px] font-medium ${tab === "all" ? "bg-navy text-white" : "border border-border bg-white"}`}
        >
          All Leads ({investors.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("accommodation")}
          className={`rounded-full px-4 py-2 text-[14px] font-medium ${tab === "accommodation" ? "bg-gold text-white" : "border border-border bg-white"}`}
        >
          Stays ({accommodationLeads.length})
        </button>
      </div>

      {delivery && <DeliveryDiagnosticsPanel delivery={delivery} />}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads" value={String((stats as { total?: number })?.total ?? 0)} />
        <StatCard label="Accommodation" value={String((stats as { accommodationLeads?: number })?.accommodationLeads ?? 0)} accent="gold" />
        <StatCard label="Critical priority" value={String((stats as { byPriority?: { critical?: number } })?.byPriority?.critical ?? 0)} />
        <StatCard label="High priority" value={String((stats as { byPriority?: { high?: number } })?.byPriority?.high ?? 0)} />
        <StatCard label="Qualified" value={String((stats as { byStage?: { qualified?: number } })?.byStage?.qualified ?? 0)} />
      </div>

      <div className="overflow-x-auto rounded-luxury-lg border border-border bg-white">
        <table className="w-full min-w-[720px] text-left text-[14px]">
          <thead className="border-b border-border bg-surface text-[12px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Persona</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  {tab === "accommodation" ? "No accommodation enquiries yet." : "No investors yet — leads appear when forms are submitted."}
                </td>
              </tr>
            ) : (
              displayedLeads.map((inv) => (
                <tr key={inv.id} className="border-b border-border/60 hover:bg-surface/50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-heading">{inv.name || "—"}</p>
                    <p className="text-[12px] text-muted">{inv.email}</p>
                    <p className="text-[12px] text-muted">{inv.source}</p>
                    {inv.leadType === "accommodation" && (
                      <p className="mt-1 text-[11px] font-medium text-gold">Stays enquiry</p>
                    )}
                  </td>
                  <td className="px-4 py-3 capitalize">{inv.persona}</td>
                  <td className="px-4 py-3 font-semibold">{inv.leadScore}</td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={inv.priority} />
                  </td>
                  <td className="px-4 py-3 capitalize">{inv.funnelStage}</td>
                  <td className="px-4 py-3 text-[13px]">
                    {INTERNAL_AGENTS.find((a) => a.id === inv.assignedAgent)?.name ?? inv.assignedAgent}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted">
                    {inv.followUpAt ? new Date(inv.followUpAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center">
        <a
          href="/api/ecosystem/leads-export?type=all"
          className="mr-4 text-[14px] font-semibold text-gold hover:underline"
          download
        >
          Export All Leads (CSV)
        </a>
        <a
          href="/api/ecosystem/leads-export?type=accommodation"
          className="text-[14px] font-semibold text-gold hover:underline"
          download
        >
          Export Stays Leads (CSV)
        </a>
        <span className="mx-4 text-muted">|</span>
        <Link href="/" className="text-[14px] font-semibold text-gold hover:underline">
          ← Back to platform
        </Link>
      </p>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: "gold" | "navy" }) {
  const textColor = accent === "gold" ? "text-gold" : accent === "navy" ? "text-navy" : "text-navy-heading";
  return (
    <div className="luxury-card p-4 text-center">
      <p className={`font-serif text-2xl font-semibold ${textColor}`}>{value}</p>
      <p className="mt-1 text-[13px] text-muted">{label}</p>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-gold/20 text-gold",
    medium: "bg-blue-100 text-blue-800",
    low: "bg-surface text-muted",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${colors[priority] ?? colors.low}`}>
      {priority}
    </span>
  );
}

function DeliveryDiagnosticsPanel({
  delivery,
}: {
  delivery: {
    smtpConfigured: boolean;
    recipient: string;
    recipientIsFallback: boolean;
    status: {
      lastSentAt: string | null;
      lastSentTo: string | null;
      lastErrorAt: string | null;
      lastErrorMessage: string | null;
      totalSent: number;
      totalFailed: number;
    };
  };
}) {
  const { smtpConfigured, recipient, recipientIsFallback, status } = delivery;
  const health: "ok" | "warn" | "error" = !smtpConfigured
    ? "warn"
    : status.lastErrorAt &&
      (!status.lastSentAt || status.lastErrorAt > status.lastSentAt)
    ? "error"
    : "ok";

  const healthStyles: Record<typeof health, string> = {
    ok: "border-green-200 bg-green-50",
    warn: "border-amber-200 bg-amber-50",
    error: "border-red-200 bg-red-50",
  };
  const healthLabel: Record<typeof health, string> = {
    ok: "Operational",
    warn: "SMTP not configured — leads saved only",
    error: "Last delivery failed",
  };

  return (
    <div className={`mb-6 rounded-luxury-lg border p-4 ${healthStyles[health]}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-serif text-base font-semibold text-navy-heading">
          Lead Delivery
        </h3>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
            health === "ok"
              ? "bg-green-100 text-green-800"
              : health === "warn"
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {healthLabel[health]}
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-[13px]">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">SMTP</p>
          <p className="font-semibold text-navy-heading">
            {smtpConfigured ? "Configured" : "Not configured"}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">Recipient</p>
          <p className="font-semibold text-navy-heading">
            {recipient}
            {recipientIsFallback && (
              <span className="ml-1 text-[11px] font-normal text-amber-700">
                (fallback)
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">Last sent</p>
          <p className="font-semibold text-navy-heading">
            {status.lastSentAt ? new Date(status.lastSentAt).toLocaleString() : "Never"}
          </p>
          {status.lastSentTo && (
            <p className="text-[11px] text-muted">to {status.lastSentTo}</p>
          )}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">Last error</p>
          <p className="font-semibold text-navy-heading">
            {status.lastErrorAt ? new Date(status.lastErrorAt).toLocaleString() : "None"}
          </p>
          {status.lastErrorMessage && (
            <p className="truncate text-[11px] text-red-700" title={status.lastErrorMessage}>
              {status.lastErrorMessage}
            </p>
          )}
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted">
        Sent: {status.totalSent} · Failed: {status.totalFailed}
      </p>
    </div>
  );
}
