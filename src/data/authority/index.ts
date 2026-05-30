export { TOPIC_CLUSTERS, type TopicClusterId } from "./topic-clusters";
export { WHY_ZANZIBAR } from "./why-zanzibar";
export { INVESTMENT_OPPORTUNITIES } from "./investment-opportunities";
export { AREA_GUIDES, type AreaGuide } from "./area-guides";
export { TOURISM_LIFESTYLE } from "./tourism-lifestyle";
export { EXPAT_NOMAD_HUB } from "./expat-hub";
export { BUSINESS_DEVELOPMENT } from "./business-development";
export { CONTENT_HUB, AUTHORITY_FAQ } from "./content-hub";

import { FAQ_ITEMS } from "../seo-content";
import { AUTHORITY_FAQ } from "./content-hub";

/** Combined FAQ for schema + accordion */
export const ALL_FAQ_ITEMS = [...FAQ_ITEMS, ...AUTHORITY_FAQ] as const;
