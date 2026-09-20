/**
 * Hotel discovery sources.
 *
 * Uses Google Places API (New) — POST /v1/places:searchText with FieldMask.
 * Auth: GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY env var.
 *
 * Live path:
 *   - searches "hotels in <area>, Zanzibar"
 *   - paginates nextPageToken up to 3 pages (60 results per area max)
 *   - filters businessStatus === "OPERATIONAL"
 *   - extracts: name, website, phone, rating, reviews count, address, lat/lng
 *
 * Sample data is no longer shipped — the source returns [] if no live key
 * or the API call fails. Operators will see an empty Discovery list until
 * GOOGLE_PLACES_API_KEY is configured and the API responds.
 */

import { SUPPORTED_AREAS } from "@/lib/ecosystem/discovery-store";

export type DiscoveredHotelRaw = {
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
};

export interface DiscoverySource {
  name: string;
  search(area: string): Promise<DiscoveredHotelRaw[]>;
}

function getApiKey(): string | null {
  return process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY || null;
}

type NewPlace = {
  id: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  primaryType?: string;
  types?: string[];
  businessStatus?: string;
  location?: { latitude: number; longitude: number };
};

type NewPlacesResponse = {
  places?: NewPlace[];
  nextPageToken?: string;
};

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.primaryType",
  "places.types",
  "places.businessStatus",
  "places.location",
  "nextPageToken",
].join(",");

const ENDPOINT = "https://places.googleapis.com/v1/places:searchText";

function placeToRaw(area: string, p: NewPlace): DiscoveredHotelRaw | null {
  if (p.businessStatus && p.businessStatus !== "OPERATIONAL") return null;
  const category =
    p.primaryType ||
    (p.types ?? []).find((t) => t !== "lodging" && t !== "establishment" && t !== "point_of_interest") ||
    "Hotel";
  const lat = p.location?.latitude;
  const lng = p.location?.longitude;
  return {
    name: p.displayName?.text ?? "",
    area,
    website: p.websiteUri ?? "",
    email: "", // Google Places does not return emails — enrichment out of scope.
    phone: p.internationalPhoneNumber ?? p.nationalPhoneNumber ?? "",
    category,
    address: p.formattedAddress ?? "",
    googleRating: p.rating ? String(p.rating) : "",
    reviewsCount: p.userRatingCount ? String(p.userRatingCount) : "",
    coordinates: lat != null && lng != null ? `${lat},${lng}` : "",
    source: "google_places",
  };
}

async function searchOnce(
  apiKey: string,
  textQuery: string,
  pageToken?: string
): Promise<NewPlacesResponse> {
  const body: Record<string, unknown> = { textQuery, maxResultCount: 20 };
  if (pageToken) body.pageToken = pageToken;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`places_new_http_${res.status}: ${text.slice(0, 200)}`);
  }
  return (await res.json()) as NewPlacesResponse;
}

const googlePlacesSource: DiscoverySource = {
  name: "google_places",
  async search(area: string): Promise<DiscoveredHotelRaw[]> {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn(
        `[discovery] GOOGLE_PLACES_API_KEY/GOOGLE_MAPS_API_KEY not set — ${area} returns 0 hotels.`
      );
      return [];
    }

    const allResults: DiscoveredHotelRaw[] = [];
    const seenIds = new Set<string>();
    const MAX_PAGES = 3;
    const textQuery = `hotels in ${area}, Zanzibar`;

    try {
      let pageToken: string | undefined;
      for (let page = 0; page < MAX_PAGES; page++) {
        const data = await searchOnce(apiKey, textQuery, pageToken);
        for (const place of data.places ?? []) {
          if (seenIds.has(place.id)) continue;
          seenIds.add(place.id);
          const raw = placeToRaw(area, place);
          if (raw) allResults.push(raw);
        }
        if (!data.nextPageToken) break;
        pageToken = data.nextPageToken;
      }
    } catch (e) {
      console.error(
        `[discovery] Google Places (New) failed for ${area}: ${e instanceof Error ? e.message : String(e)}`
      );
    }

    return allResults;
  },
};

const stubSource = (name: string): DiscoverySource => ({
  name,
  async search(_area: string): Promise<DiscoveredHotelRaw[]> {
    console.warn(
      `[discovery] Source "${name}" is a stub. Implement via SerpAPI / Outscraper for ToS-compliant access.`
    );
    return [];
  },
});

export const DISCOVERY_SOURCES: DiscoverySource[] = [
  googlePlacesSource,
  stubSource("booking_directory"),
  stubSource("tripadvisor"),
  stubSource("public_directory"),
];

export function isAreaSupported(area: string): boolean {
  return (SUPPORTED_AREAS as readonly string[]).includes(area);
}
