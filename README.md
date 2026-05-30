# Zanzibaba Real Estate v2

Greenfield rebuild of the **Chairman Real Estate marketing landing** for `realestate.zanzibaba.com`. This repo is intentionally separate from `zanzibaba-real-estate` (v1).

## Current status

**Asset library + scaffold only** — no `package.json`, no `src/`, no pages, no API. Awaiting approval before application setup.

## Canonical path

```
/Users/apple/Zanzibaba-Projects/active-projects/zanzibaba-real-estate-v2/
```

## Planned stack (not initialized yet)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Deploy | Vercel → `realestate.zanzibaba.com` |

Rationale: matches v1 production target and group conventions; clean implementation without copying v1 routes or app logic.

## What was copied from v1

Only reusable **assets** and **reference content** (see `docs/ASSET_INVENTORY.md`). No routes, layouts, configs, middleware, or components.

## What was excluded

- `public/uploads/` (runtime listing uploads)
- `data/listings.json`, funnel pages, portal/funnel app code
- All of `app/`, `components/`, `lib/`, API routes, `next.config.*`, etc.

## Folder guide

| Path | Purpose |
|------|---------|
| `assets/branding/` | Design tokens (JSON + CSS) |
| `assets/logos/` | PNG masters + SVG logo set |
| `assets/icons/solutions/` | Department / offering icons |
| `assets/images/hero/` | Marketing photography |
| `assets/images/pitch-deck/` | Company profile slide art |
| `assets/favicons/` | Favicon PNG sizes |
| `content/reference/` | Approved copy/data snapshots (not wired) |
| `docs/` | Architecture, backlog, asset inventory |
| `prompts/` | Project-scoped AI prompts (empty stubs) |

## Setup (after approval)

1. Initialize Next.js in `src/` (new, not copied from v1).
2. Copy approved assets into `public/` as needed for the build.
3. Wire Chairman 14-section landing per blueprint in `docs/architecture.md`.
4. `npm run build` before deploy.

## Related projects

| Project | Role |
|---------|------|
| `zanzibaba-real-estate` | v1 production portal (do not merge code) |
| `zanzibaba-real-estate-company-profile` | Static pitch deck; pitch images copied here |
| `shared-assets/brand-guidelines/` | Group-wide brand reference |

## Open in Cursor

```bash
cursor /Users/apple/Zanzibaba-Projects/active-projects/zanzibaba-real-estate-v2/
```
