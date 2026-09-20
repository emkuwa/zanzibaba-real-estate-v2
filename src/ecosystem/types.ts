/** Zanzibar Investment Ecosystem — core domain types */

export type PersonaType =
  | "investor"
  | "buyer"
  | "developer"
  | "renter"
  | "tourist"
  | "expat"
  | "nomad"
  | "entrepreneur";

export type FunnelStage =
  | "new"
  | "qualified"
  | "matched"
  | "contacted"
  | "nurturing"
  | "converted"
  | "archived";

export type LeadPriority = "critical" | "high" | "medium" | "low";

export type OpportunityTag =
  | "Luxury"
  | "ROI"
  | "Airbnb"
  | "Beachfront"
  | "Foreign Buyer"
  | "Off-Plan"
  | "Hospitality"
  | "Commercial";

export type OpportunityType =
  | "land"
  | "villa"
  | "hotel"
  | "resort"
  | "commercial"
  | "apartment";

export type IntelligenceCategory =
  | "investment-news"
  | "infrastructure"
  | "market-report"
  | "area-growth";

export type InternalAgentId =
  | "investor-relations"
  | "developer-partnerships"
  | "seo-intelligence"
  | "zanzibar-research"
  | "concierge";

export type EcosystemModuleId =
  | "investor-crm"
  | "developer-portal"
  | "opportunity-database"
  | "intelligence-hub"
  | "ai-concierge"
  | "acquisition-system"
  | "rentals-relocation"
  | "seo-authority"
  | "internal-agents";

export type InvestorRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  source: string;
  persona: PersonaType;
  intent?: string;
  budget?: string;
  leadType?: "accommodation" | "investment";
  qualification?: Record<string, string>;
  funnelStage: FunnelStage;
  leadScore: number;
  priority: LeadPriority;
  assignedAgent: InternalAgentId;
  followUpAt?: string;
  notes?: string;
  tags?: string[];
};

export type DeveloperProfile = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo?: string;
  website?: string;
  verified: boolean;
  specialties: string[];
  areas: string[];
};

export type DeveloperProject = {
  id: string;
  developerId: string;
  slug: string;
  title: string;
  type: OpportunityType;
  location: string;
  area: string;
  status: "planning" | "off-plan" | "construction" | "completed";
  roiEstimate?: string;
  priceFrom: string;
  investorFit: string[];
  gallery: string[];
  tags: OpportunityTag[];
  description: string;
  highlights: string[];
};

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  type: OpportunityType;
  location: string;
  area: string;
  priceFrom: string;
  roiEstimate?: string;
  tags: OpportunityTag[];
  description: string;
  highlights: string[];
  imageKey: string;
  status: "available" | "reserved" | "under-offer";
  developerId?: string;
};

export type IntelligenceItem = {
  id: string;
  slug: string;
  category: IntelligenceCategory;
  title: string;
  excerpt: string;
  publishedAt: string;
  area?: string;
  href: string;
};

export type InternalAgent = {
  id: InternalAgentId;
  name: string;
  role: string;
  responsibilities: string[];
  handlesPersonas: PersonaType[];
};

export type EcosystemModule = {
  id: EcosystemModuleId;
  number: number;
  title: string;
  description: string;
  href: string;
  features: string[];
};
