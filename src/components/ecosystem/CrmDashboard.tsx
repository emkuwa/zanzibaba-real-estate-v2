"use client";

import { useEffect, useState } from "react";
import type { InvestorRecord } from "@/ecosystem/types";
import { INTERNAL_AGENTS } from "@/ecosystem/data/agents";
import Link from "next/link";

export function CrmDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [investors, setInvestors] = useState<InvestorRecord[]>([]);
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("zb_admin_key");
    if (saved) {
      setApiKey(saved);
      fetchData(saved);
    }
  }, []);

  async function fetchData(key: string) {
    setError("");
    const res = await fetch("/api/ecosystem/investors", {
      headers: { "x-admin-key": key },
    });
    if (!res.ok) {
      setError("Invalid admin key");
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setInvestors(data.investors);
    setStats(data.stats);
    setAuthed(true);
    sessionStorage.setItem("zb_admin_key", key);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(apiKey);
  }

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
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads" value={String((stats as { total?: number })?.total ?? 0)} />
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
            {investors.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No investors yet — leads appear when forms are submitted.
                </td>
              </tr>
            ) : (
              investors.map((inv) => (
                <tr key={inv.id} className="border-b border-border/60 hover:bg-surface/50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-heading">{inv.name || "—"}</p>
                    <p className="text-[12px] text-muted">{inv.email}</p>
                    <p className="text-[12px] text-muted">{inv.source}</p>
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
        <Link href="/" className="text-[14px] font-semibold text-gold hover:underline">
          ← Back to platform
        </Link>
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="luxury-card p-4 text-center">
      <p className="font-serif text-2xl font-semibold text-navy-heading">{value}</p>
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
