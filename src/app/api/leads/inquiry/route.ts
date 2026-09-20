import { NextRequest, NextResponse } from "next/server";
import { createInvestorInquiry } from "@/lib/leads-store";
import { sendInquiryEmail } from "@/lib/send-inquiry-email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const country = String(body.country ?? "").trim();
    const source = String(body.source ?? "website").trim();
    const qualification =
      body.qualification && typeof body.qualification === "object"
        ? (body.qualification as Record<string, string>)
        : undefined;

    if (!email && !phone) {
      return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
    }

    let investor: Awaited<ReturnType<typeof createInvestorInquiry>>;
    try {
      investor = await createInvestorInquiry({ name, email, phone, country, source, qualification });
    } catch (e) {
      // Storage failure must NOT block email delivery or the user's submission.
      console.error("[leads] Lead storage failed; proceeding with email delivery only.", e);
      investor = {
        id: `inv_pending_${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name,
        email,
        phone,
        country,
        source,
        persona: "investor",
        intent: qualification?.intent ?? qualification?.lookingFor,
        leadType:
          (qualification?.intent === "Find Accommodation" ? "accommodation" : "investment") as
            | "accommodation"
            | "investment",
        qualification,
        funnelStage: "new",
        leadScore: 0,
        priority: "medium",
        assignedAgent: "zanzibar-research",
        followUpAt: new Date(Date.now() + 24 * 3600000).toISOString(),
        tags: [],
      } as Awaited<ReturnType<typeof createInvestorInquiry>>;
    }

    const emailResult = await sendInquiryEmail({
      name,
      email,
      phone,
      country,
      source,
      qualification,
    });

    return NextResponse.json({
      ok: true,
      emailSent: emailResult.sent,
      leadId: investor.id,
      leadScore: investor.leadScore,
      priority: investor.priority,
      assignedAgent: investor.assignedAgent,
    });
  } catch (e) {
    console.error("Investor inquiry failed", e);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
