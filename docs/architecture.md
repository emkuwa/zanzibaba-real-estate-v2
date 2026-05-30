# Architecture — zanzibaba-real-estate-v2

## Phase 0 (current): asset library only

- Independent git repo at `active-projects/zanzibaba-real-estate-v2/`
- Assets live under `assets/` (not `public/`) until the app is scaffolded
- Reference copy in `content/reference/` — snapshots from v1, not compiled

## Phase 1 (awaiting approval): greenfield Next.js app

Create fresh (do not copy from v1):

- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `src/app/layout.tsx`, `src/app/globals.css`
- `src/app/(portal)/layout.tsx`, `src/app/(portal)/page.tsx`
- New `src/components/portal/*` implemented against v2 design tokens

## Target homepage — Chairman Real Estate marketing landing

14 sections (blueprint from v1 restoration, implemented fresh in v2):

1. HomeHero  
2. StatsBar  
3. InvestorOfferingsGrid  
4. AboutSection  
5. SectionAccent (dark)  
6. PortfolioSection  
7. CorporateVision  
8. StrategicSectors  
9. FlagshipProjects  
10. SectionAccent (gold)  
11. InvestmentOpportunities  
12. Partnerships  
13. CorporateTimeline  
14. CtaBanner  

**Not** the property listings catalog homepage. **Not** the investor funnel as `/`.

## Domain

- Production: `realestate.zanzibaba.com`
- v1 remains at `emkuwa/zanzibaba` until cutover decision

## Data boundaries

| Use on landing | Source in v2 |
|----------------|--------------|
| Hero, stats, offerings | `content/reference/` → later `src/data/` |
| Listings catalog | Out of scope for initial landing |
| Uploads | New Cloudinary/env when listings added |

## Deploy

- Vercel project (new) pointing at this repo
- Env: `.env.example` added in Phase 1 (Cloudinary, site URL)

## Decisions

| Date | Decision |
|------|----------|
| 2026-05-29 | Greenfield v2; assets-only import from v1 + pitch images from company-profile |
| 2026-05-29 | No page code until stakeholder approval |
