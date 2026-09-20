"use client";

import { useEffect, useState } from "react";

type ApprovalStatus = "pending" | "approved" | "rejected" | "imported";
type ContactedStatus = "not_contacted" | "contacted" | "responded" | "no_response";

type DiscoveredHotel = {
  discoveryDate: string;
  id: string;
  name: string;
  area: string;
  website: string;
  email: string;
  phone: string;
  category: string;
  address: string;
  googleRating: string;
  reviewsCount: string;
  coordinates: string;
  source: string;
  approvalStatus: ApprovalStatus;
  contactedStatus: ContactedStatus;
};

export function DiscoveryDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [hotels, setHotels] = useState<DiscoveredHotel[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [area, setArea] = useState("Paje");
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

  async function fetchList(key: string) {
    setError("");
    const res = await fetch("/api/ecosystem/discovery", { headers: { "x-admin-key": key } });
    if (!res.ok) {
      setError("Invalid admin key");
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setHotels(data.hotels ?? []);
    setAreas(data.areas ?? []);
    setAuthed(true);
    sessionStorage.setItem("zb_admin_key", key);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchList(apiKey);
  }

  async function discover() {
    setBusy(true);
    setMsg("");
    setError("");
    try {
      const res = await fetch("/api/ecosystem/discovery", {
        method: "POST",
        headers: { "x-admin-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ area }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      const live = data.sources?.find((s: { source: string; live: boolean }) => s.source === "google_places")?.live;
      setMsg(
        `Discovered ${data.discovered} · Saved ${data.saved} · Duplicates ${data.duplicates}` +
          (live ? " (live Google Places)" : " (sample data — set GOOGLE_PLACES_API_KEY for live results)")
      );
      await fetchList(apiKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, patch: Partial<DiscoveredHotel>) {
    const res = await fetch(`/api/ecosystem/discovery/${id}`, {
      method: "PATCH",
      headers: { "x-admin-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) await fetchList(apiKey);
  }

  async function importApproved() {
    setBusy(true);
    setMsg("");
    setError("");
    try {
      const res = await fetch("/api/ecosystem/discovery/import", {
        method: "POST",
        headers: { "x-admin-key": apiKey },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setMsg(
        `Imported ${data.imported} of ${data.considered} approved hotel(s) into Partner Hotels.` +
          (data.errors?.length ? ` Errors: ${data.errors.join("; ")}` : "")
      );
      await fetchList(apiKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  if (!authed) {
    return (
      <form onSubmit={handleLogin} className="mx-auto max-w-md luxury-card p-6">
        <h2 className="font-serif text-xl font-semibold text-navy-heading">Hotel Discovery</h2>
        <p className="mt-2 text-[14px] text-body">Enter admin API key to access discovery.</p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Admin API key"
          className="mt-4 w-full rounded-luxury border border-border px-4 py-3 text-[15px]"
        />
        {error && <p className="mt-2 text-[14px] text-red-600">{error}</p>}
        <button type="submit" className="mt-4 w-full rounded-luxury bg-gold py-3 text-[15px] font-semibold text-white">
          Access Discovery
        </button>
      </form>
    );
  }

  const approvedCount = hotels.filter((h) => h.approvalStatus === "approved").length;

  return (
    <div>
      <div className="luxury-card mb-6 flex flex-wrap items-end gap-3 p-4">
        <div className="flex-1 min-w-[180px]">
          <label className="text-[11px] uppercase tracking-wide text-muted">Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="mt-1 w-full rounded-luxury border border-border bg-white px-3 py-2 text-[14px]"
          >
            {(areas.length ? areas : ["Paje", "Nungwi", "Kendwa", "Matemwe", "Kiwengwa", "Jambiani"]).map(
              (a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              )
            )}
          </select>
        </div>
        <button
          type="button"
          onClick={discover}
          disabled={busy}
          className="rounded-luxury bg-gold px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-50"
        >
          {busy ? "Searching…" : "Discover Hotels"}
        </button>
        <button
          type="button"
          onClick={importApproved}
          disabled={busy || approvedCount === 0}
          className="rounded-luxury border border-gold bg-white px-5 py-2.5 text-[14px] font-semibold text-gold disabled:opacity-50"
        >
          Import Approved ({approvedCount})
        </button>
      </div>

      {msg && <p className="mb-4 rounded-luxury border border-green-200 bg-green-50 px-4 py-2 text-[13px] text-green-800">{msg}</p>}
      {error && <p className="mb-4 rounded-luxury border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-800">{error}</p>}

      <div className="overflow-x-auto rounded-luxury-lg border border-border bg-white">
        <table className="w-full min-w-[960px] text-left text-[13px]">
          <thead className="border-b border-border bg-surface text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2">Hotel</th>
              <th className="px-3 py-2">Area</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Rating</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Approval</th>
              <th className="px-3 py-2">Contacted</th>
              <th className="px-3 py-2">Discovered</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-muted">
                  No discovered hotels yet. Pick an area and click <strong>Discover Hotels</strong>.
                </td>
              </tr>
            ) : (
              hotels.map((h) => (
                <tr key={h.id} className="border-b border-border/60 hover:bg-surface/50">
                  <td className="px-3 py-2">
                    <p className="font-semibold text-navy-heading">{h.name}</p>
                    {h.website && (
                      <a href={h.website} target="_blank" rel="noreferrer" className="text-[11px] text-gold hover:underline">
                        {h.website}
                      </a>
                    )}
                    {h.address && <p className="text-[11px] text-muted">{h.address}</p>}
                  </td>
                  <td className="px-3 py-2">{h.area}</td>
                  <td className="px-3 py-2">
                    {h.email && <p className="text-[11px]">{h.email}</p>}
                    {h.phone && <p className="text-[11px] text-muted">{h.phone}</p>}
                  </td>
                  <td className="px-3 py-2 text-[12px]">{h.category || "—"}</td>
                  <td className="px-3 py-2">
                    {h.googleRating || "—"}
                    {h.reviewsCount && <p className="text-[10px] text-muted">{h.reviewsCount} reviews</p>}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-muted">{h.source}</td>
                  <td className="px-3 py-2">
                    <select
                      value={h.approvalStatus}
                      onChange={(e) => setStatus(h.id, { approvalStatus: e.target.value as ApprovalStatus })}
                      className="rounded border border-border bg-white px-2 py-1 text-[12px]"
                    >
                      <option value="pending">pending</option>
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                      <option value="imported">imported</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={h.contactedStatus}
                      onChange={(e) => setStatus(h.id, { contactedStatus: e.target.value as ContactedStatus })}
                      className="rounded border border-border bg-white px-2 py-1 text-[12px]"
                    >
                      <option value="not_contacted">not contacted</option>
                      <option value="contacted">contacted</option>
                      <option value="responded">responded</option>
                      <option value="no_response">no response</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-muted">
                    {h.discoveryDate ? new Date(h.discoveryDate).toLocaleDateString() : "—"}
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
