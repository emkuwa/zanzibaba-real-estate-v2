import { createInvestorInquiry } from "@/lib/ecosystem/investor-crm";

export type LeadRecord = Awaited<ReturnType<typeof createInvestorInquiry>>;
export type InvestorInquiryInput = Parameters<typeof createInvestorInquiry>[0];

export { createInvestorInquiry, getAllInvestors as getAllLeads } from "@/lib/ecosystem/investor-crm";
