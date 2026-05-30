import { NextResponse } from "next/server";
import { DEVELOPERS, DEVELOPER_PROJECTS } from "@/ecosystem/data/developers";

export async function GET() {
  return NextResponse.json({
    developers: DEVELOPERS,
    projects: DEVELOPER_PROJECTS,
  });
}
