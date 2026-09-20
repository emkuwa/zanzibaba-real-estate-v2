import { NextRequest, NextResponse } from "next/server";
import { listDiscovered, saveDiscoveredBatch, SUPPORTED_AREAS } from "@/lib/ecosystem/discovery-store";
import { DISCOVERY_SOURCES, isAreaSupported } from "@/lib/discovery/sources";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const hotels = await listDiscovered();
  return NextResponse.json({
    hotels,
    count: hotels.length,
    areas: SUPPORTED_AREAS,
  });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const area = String(body.area ?? "").trim();
    if (!isAreaSupported(area)) {
      return NextResponse.json(
        { error: `Unsupported area. Supported: ${SUPPORTED_AREAS.join(", ")}` },
        { status: 400 }
      );
    }

    const allResults = [];
    const sourceStatus: Array<{ source: string; count: number; live: boolean }> = [];

    for (const source of DISCOVERY_SOURCES) {
      try {
        const r = await source.search(area);
        allResults.push(...r);
        sourceStatus.push({
          source: source.name,
          count: r.length,
          live: source.name === "google_places" && Boolean(process.env.GOOGLE_PLACES_API_KEY),
        });
      } catch (e) {
        console.error(
          `[discovery] Source ${source.name} failed for ${area}: ${e instanceof Error ? e.message : String(e)}`
        );
        sourceStatus.push({ source: source.name, count: 0, live: false });
      }
    }

    const { saved, duplicates } = await saveDiscoveredBatch(allResults);

    return NextResponse.json({
      ok: true,
      area,
      discovered: allResults.length,
      saved,
      duplicates,
      sources: sourceStatus,
    });
  } catch (e) {
    console.error("[discovery] Search failed", e);
    return NextResponse.json({ error: "Discovery failed" }, { status: 500 });
  }
}
