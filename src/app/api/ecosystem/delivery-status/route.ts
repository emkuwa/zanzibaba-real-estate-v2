import { NextRequest, NextResponse } from "next/server";
import {
  readDeliveryStatus,
  resolveLeadRecipient,
  smtpConfigured,
} from "@/lib/email-delivery-status";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = await readDeliveryStatus();
  const { to, isDefault } = resolveLeadRecipient();

  return NextResponse.json({
    smtpConfigured: smtpConfigured(),
    recipient: to,
    recipientIsFallback: isDefault,
    status,
  });
}
