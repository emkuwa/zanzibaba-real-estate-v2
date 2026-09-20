import { appendRow, readSheet, sheetsConfigured, warnOnSheetsMisconfig } from "./sheets-store";

warnOnSheetsMisconfig();

export const HOTEL_COLUMNS = [
  "Hotel ID",
  "Date Added",
  "Name",
  "Area",
  "Contact Person",
  "Email",
  "WhatsApp",
  "Partner Status",
  "Notes",
] as const;

export const ASSIGNMENT_COLUMNS = [
  "Assignment ID",
  "Lead ID",
  "Hotel ID",
  "Assigned Date",
  "Status",
  "Notes",
] as const;

export const HOTEL_SHEET = "Hotels";
export const ASSIGNMENT_SHEET = "Assignments";

export const HOTEL_STATUSES = ["active", "paused", "onboarding", "inactive"] as const;
export const ASSIGNMENT_STATUSES = [
  "new",
  "contacted",
  "interested",
  "booked",
  "lost",
] as const;
export type HotelStatus = (typeof HOTEL_STATUSES)[number];
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export type Hotel = {
  id: string;
  dateAdded: string;
  name: string;
  area: string;
  contactPerson: string;
  email: string;
  whatsapp: string;
  status: HotelStatus;
  notes: string;
};

export type Assignment = {
  id: string;
  leadId: string;
  hotelId: string;
  assignedAt: string;
  status: AssignmentStatus;
  notes: string;
};

function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function parseHotel(row: string[]): Hotel {
  const get = (i: number) => row[i] ?? "";
  return {
    id: get(0),
    dateAdded: get(1),
    name: get(2),
    area: get(3),
    contactPerson: get(4),
    email: get(5),
    whatsapp: get(6),
    status: (get(7) as HotelStatus) || "active",
    notes: get(8),
  };
}

function parseAssignment(row: string[]): Assignment {
  const get = (i: number) => row[i] ?? "";
  return {
    id: get(0),
    leadId: get(1),
    hotelId: get(2),
    assignedAt: get(3),
    status: (get(4) as AssignmentStatus) || "new",
    notes: get(5),
  };
}

export async function listHotels(): Promise<Hotel[]> {
  if (!sheetsConfigured()) return [];
  try {
    const rows = await readSheet(HOTEL_SHEET, HOTEL_COLUMNS);
    return rows.map(parseHotel);
  } catch (e) {
    console.error(
      `[partners] Failed to read Hotels sheet: ${e instanceof Error ? e.message : String(e)}`
    );
    return [];
  }
}

export async function createHotel(input: Omit<Hotel, "id" | "dateAdded">): Promise<Hotel> {
  const hotel: Hotel = {
    ...input,
    id: generateId("hot"),
    dateAdded: new Date().toISOString(),
  };
  if (!sheetsConfigured()) {
    console.warn(`[partners] Sheets not configured — hotel ${hotel.name} will not be persisted.`);
    return hotel;
  }
  try {
    await appendRow(
      HOTEL_SHEET,
      HOTEL_COLUMNS,
      [
        hotel.id,
        hotel.dateAdded,
        hotel.name,
        hotel.area,
        hotel.contactPerson,
        hotel.email,
        hotel.whatsapp,
        hotel.status,
        hotel.notes,
      ]
    );
  } catch (e) {
    console.error(
      `[partners] Failed to persist hotel ${hotel.id}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
  return hotel;
}

export async function listAssignments(): Promise<Assignment[]> {
  if (!sheetsConfigured()) return [];
  try {
    const rows = await readSheet(ASSIGNMENT_SHEET, ASSIGNMENT_COLUMNS);
    return rows.map(parseAssignment);
  } catch (e) {
    console.error(
      `[partners] Failed to read Assignments sheet: ${e instanceof Error ? e.message : String(e)}`
    );
    return [];
  }
}

export async function createAssignments(
  leadId: string,
  hotelIds: string[],
  notes = ""
): Promise<Assignment[]> {
  const assignedAt = new Date().toISOString();
  const created: Assignment[] = hotelIds.map((hotelId) => ({
    id: generateId("asg"),
    leadId,
    hotelId,
    assignedAt,
    status: "new",
    notes,
  }));
  if (!sheetsConfigured()) {
    console.warn(
      `[partners] Sheets not configured — ${created.length} assignment(s) for lead ${leadId} not persisted.`
    );
    return created;
  }
  for (const a of created) {
    try {
      await appendRow(ASSIGNMENT_SHEET, ASSIGNMENT_COLUMNS, [
        a.id,
        a.leadId,
        a.hotelId,
        a.assignedAt,
        a.status,
        a.notes,
      ]);
    } catch (e) {
      console.error(
        `[partners] Failed to persist assignment ${a.id}: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }
  return created;
}
