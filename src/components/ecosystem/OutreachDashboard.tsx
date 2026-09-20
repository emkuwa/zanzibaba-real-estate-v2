"use client";

import { useEffect, useState } from "react";

type OutreachStatus =
  | "Discovered"
  | "Not Contacted"
  | "Contacted"
  | "Interested"
  | "Trial"
  | "Subscriber"
  | "Rejected";

type OutreachRow = {
  id: string;
  name: string;
  area: string;
  website: string;
  phone: string;
  rating: string;
  reviewsCount?: string;
  discoveryDate: string;
  contactStatus: OutreachStatus;
  lastContactDate: string;
  source: string;
  notes: string;
  score?: number;
  tier?: string;
};

type ViewName = "all" | "top50" | "not_contacted" | "contacted" | "interested" | "trial" | "subscriber";

const VIEWS: { id: ViewName; label: string }[] = [
  { id: "all", label: "All" },
  { id: "top50", label: "Top 50 by Score" },
  { id: "not_contacted", label: "Not Contacted" },
  { id: "contacted", label: "Contacted" },
  { id: "interested", label: "Interested" },
  { id: "trial", label: "Trial" },
  { id: "subscriber", label: "Subscribers" },
];

const QUICK_ACTIONS: { status: OutreachStatus; label: string; color: string }[] = [
  { status: "Contacted", label: "Contacted", color: "bg-amber-500" },
  { status: "Interested", label: "Interested", color: "bg-gold" },
  { status: "Trial", label: "Trial", color: "bg-purple-600" },
  { status: "Subscriber", label: "Subscriber", color: "bg-green-600" },
];

export function OutreachDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [hotels, setHotels] = useState<OutreachRow[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    contacted: number;
    interested: number;
    subscribers: number;
  } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<ViewName>("all");
  const [area, setArea] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("zb_admin_key");
    if (saved) {
      setApiKey(saved);
      fetchList(saved);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchList(apiKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, area]);

  async function fetchList(key: string) {
    setError("");
    const params = new URLSearchParams();
    if (view) params.set("view", view);
    if (area) params.set("area", area);
    const res = await fetch(`/api/ecosystem/outreach?${params}`, { headers: { "x-admin-key": key } });
    if (!res.ok) {
      setError("Invalid admin key");
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setHotels(data.hotels ?? []);
    setStats(data.stats ?? null);
    setAuthed(true);
    sessionStorage.setItem("zb_admin_key", key);
    setSelected(new Set());
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchList(apiKey);
  }

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === hotels.length) setSelected(new Set());
    else setSelected(new Set(hotels.map((h) => h.id)));
  }

  async function setStatus(ids: string[], status: OutreachStatus) {
    if (ids.length === 0) return;
    setBusy(true);
    setMsg("");
    setError("");
    try {
      const res = await fetch("/api/ecosystem/outreach", {
        method: "PATCH",
        headers: { "x-admin-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ ids, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setMsg(`Updated ${data.updatedCount} hotel(s) → ${status}`);
      setSelected(new Set());
      await fetchList(apiKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function setSingleStatus(id: string, status: OutreachStatus) {
    try {
      const res = await fetch(`/api/ecosystem/outreach/${id}`, {
        method: "PATCH",
        headers: { "x-admin-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) await fetchList(apiKey);
    } catch {
      /* ignore */
    }
  }

  if (!authed) {
    return (
      <form onSubmit={handleLogin} className="mx-auto max-w-md luxury-card p-6">
        <h2 className="font-serif text-xl font-semibold text-navy-heading">Hotel Outreach CRM</h2>
        <p className="mt-2 text-[14px] text-body">Enter admin API key to access outreach pipeline.</p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Admin API key"
          className="mt-4 w-full rounded-luxury border border-border px-4 py-3 text-[15px]"
        />
        {error && <p className="mt-2 text-[14px] text-red-600">{error}</p>}
        <button type="submit" className="mt-4 w-full rounded-luxury bg-gold py-3 text-[15px] font-semibold text-white">
          Access Outreach
        </button>
      </form>
    );
  }

  const areas = Array.from(new Set(hotels.map((h) => h.area).filter(Boolean))).sort();
  const exportUrl = `/api/ecosystem/outreach/export?view=${view}${area ? `&area=${encodeURIComponent(area)}` : ""}`;

  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Hotels" value={stats?.total ?? hotels.length} />
        <MetricCard label="Contacted" value={stats?.contacted ?? 0} accent="amber" />
        <MetricCard label="Interested" value={stats?.interested ?? 0} accent="gold" />
        <MetricCard label="Subscribers" value={stats?.subscribers ?? 0} accent="green" />
      </div>

      <div className="luxury-card mb-4 flex flex-wrap items-center gap-2 p-3">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${
              view === v.id ? "bg-navy text-white" : "border border-border bg-white text-navy-heading"
            }`}
          >
            {v.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="text-[11px] uppercase tracking-wide text-muted">Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="rounded border border-border bg-white px-2 py-1 text-[12px]"
          >
            <option value="">All areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <a
            href={exportUrl}
            className="rounded border border-gold bg-white px-3 py-1.5 text-[12px] font-semibold text-gold hover:bg-gold hover:text-white"
            download
          >
            Export CSV
          </a>
        </div>
      </div>

      {view !== "top50" && (
        <div className="luxury-card mb-3 flex flex-wrap items-center gap-2 p-3">
          <span className="text-[12px] font-semibold text-navy-heading">
            {selected.size} selected
          </span>
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.status}
              type="button"
              onClick={() => setStatus(Array.from(selected), a.status)}
              disabled={busy || selected.size === 0}
              className={`rounded px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-40 ${a.color}`}
            >
              Mark {a.label}
            </button>
          ))}
        </div>
      )}

      {msg && <p className="mb-3 rounded-luxury border border-green-200 bg-green-50 px-4 py-2 text-[13px] text-green-800">{msg}</p>}
      {error && <p className="mb-3 rounded-luxury border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-800">{error}</p>}

      <div className="overflow-x-auto rounded-luxury-lg border border-border bg-white">
        <table className="w-full min-w-[1100px] text-left text-[13px]">
          <thead className="border-b border-border bg-surface text-[11px] uppercase tracking-wide text-muted">
            <tr>
              {view !== "top50" && (
                <th className="px-3 py-2 w-8">
                  <input
                    type="checkbox"
                    checked={hotels.length > 0 && selected.size === hotels.length}
                    onChange={toggleAll}
                  />
                </th>
              )}
              <th className="px-3 py-2">Hotel</th>
              <th className="px-3 py-2">Area</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">{view === "top50" ? "Score" : "Rating"}</th>
              <th className="px-3 py-2">Status</th>
              {view === "top50" && <th className="px-3 py-2">Reviews</th>}
              <th className="px-3 py-2">Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 ? (
              <tr>
                <td colSpan={view === "top50" ? 7 : 7} className="px-3 py-8 text-center text-muted">
                  No hotels in this view.
                </td>
              </tr>
            ) : (
              hotels.map((h) => (
                <tr key={h.id} className="border-b border-border/60 hover:bg-surface/50">
                  {view !== "top50" && (
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selected.has(h.id)}
                        onChange={() => toggle(h.id)}
                      />
                    </td>
                  )}
                  <td className="px-3 py-2">
                    <p className="font-semibold text-navy-heading">{h.name}</p>
                    {h.website && (
                      <a href={h.website} target="_blank" rel="noreferrer" className="text-[11px] text-gold hover:underline">
                        {h.website}
                      </a>
                    )}
                  </td>
                  <td className="px-3 py-2">{h.area}</td>
                  <td className="px-3 py-2 text-[12px]">
                    {h.phone && <p>{h.phone}</p>}
                    {h.notes && view === "top50" === false && (
                      <p className="text-[11px] text-muted">{h.notes.slice(0, 60)}</p>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {view === "top50" ? (
                      <span className="font-semibold text-navy-heading">{h.score}</span>
                    ) : (
                      h.rating || "—"
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        h.tier === "high"
                          ? "bg-green-100 text-green-800"
                          : h.tier === "medium"
                          ? "bg-gold/20 text-gold"
                          : "bg-surface text-muted"
                      }`}
                    >
                      {view === "top50" ? h.tier : h.contactStatus}
                    </span>
                  </td>
                  {view === "top50" && <td className="px-3 py-2 text-[12px]">{h.reviewsCount || "—"}</td>}
                  <td className="px-3 py-2">
                    {view !== "top50" && (
                      <div className="flex flex-wrap gap-1">
                        {QUICK_ACTIONS.map((a) => (
                          <button
                            key={a.status}
                            type="button"
                            onClick={() => setSingleStatus(h.id, a.status)}
                            disabled={h.contactStatus === a.status}
                            className={`rounded px-2 py-0.5 text-[10px] font-semibold text-white disabled:opacity-30 ${a.color}`}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "gold" | "amber" | "green";
}) {
  const text =
    accent === "gold" ? "text-gold" : accent === "amber" ? "text-amber-600" : accent === "green" ? "text-green-600" : "text-navy-heading";
  return (
    <div className="luxury-card p-4 text-center">
      <p className={`font-serif text-2xl font-semibold ${text}`}>{value}</p>
      <p className="mt-1 text-[13px] text-muted">{label}</p>
    </div>
  );
}
