# Foyle Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/foyle` case-study page to the portfolio telling the audit → pain points → Silverwind / hosting / AIB / brand kit → results story, with silent looping screen recordings of Silverwind made only from invented demo data.

**Architecture:** Two repos. (1) Silverwind (`C:\Users\Emmet\Downloads\ProjectFoyle27`), on a local never-pushed branch `demo/portfolio-recordings`: a persistent local `silverwind_demo` Postgres database filled by a seed script through domain functions, a fixture enquiries source, a demo handbook, and a Playwright recorder that drives the app and writes clips. (2) Portfolio (`C:\Users\Emmet\Emmett-Portfolio`): case-study copy in `src/lib/foyle.ts`, a new App Router route `src/app/foyle/page.tsx` built from small section components, compressed MP4 + poster assets in `public/foyle/`, a homepage Work card linking in, and a content-leak check script.

**Tech Stack:** Portfolio: Next.js 16.2.10 (static export), React 19.2, TypeScript, Tailwind v4. Silverwind: Next.js 15.5, Postgres (local, `localhost:5432`, user `silverwind`), `tsx` scripts. Recording: Playwright (`npx playwright`, Chromium already cached in `%LOCALAPPDATA%\ms-playwright`), ffmpeg 8.1 (WinGet).

**Spec:** `docs/superpowers/specs/2026-11-03-foyle-case-study-design.md`

## Global Constraints

- No real person's name, address, phone, email, bank detail or photo anywhere on the page or in any frame of any video/image.
- No real staff names anywhere (page, videos, screenshots, **and the public portfolio repo itself**, including this plan's scripts). Pseudonyms: Accommodation Officer "Clare", Programmes Officer "Róisín", Placement Officer "Orla", CEO "Declan". Page states once that names are changed.
- Host rates £140 full board / £120 half board may be shown. The diet supplement price may not be shown anywhere.
- The "What's new" screen is never shown. No EU projects / Radar section.
- No link to Silverwind's code or the live app.
- Results figures labelled approximate: "~10 spreadsheets retired", "10–25 hours saved per week".
- Silverwind work stays on local branch `demo/portfolio-recordings`; **never push it**; never point anything at Azure or at the dev database `silverwind`. Only `silverwind_demo` on localhost.
- Portfolio: read `node_modules/next/dist/docs/01-app` sections you touch before writing code (AGENTS.md). Copy lives in `src/lib/` content files. All asset paths and internal links go through `withBasePath()` (`src/lib/basePath.ts`) or `next/link`.
- Videos: H.264 MP4, 1280×800, no audio, ≤ 3 MB each, with a JPG poster; `muted playsInline loop`, `preload="none"`, played when in view, not autoplayed under `prefers-reduced-motion`.
- Voice: plain, specific, first person (Emmett). No hype words ("leveraged", "cutting-edge", "seamless", "revolutionise").
- Machine runs low on memory: one dev server + one browser at a time; stop servers when a task ends.
- Do not commit or push either repo unless Emmett asks. (Commit steps below are written as "stage + show diff"; commit only on Emmett's go-ahead.)

## Review Focus

1. **Base path on GitHub Pages** — site lives at `/Portfolio/`; a video `src`, poster, image or the homepage → `/foyle` link built without `withBasePath` 404s in production but works in `npm run dev`. Pinned by Task 7 Step 3 (build with `NEXT_PUBLIC_BASE_PATH=/Portfolio` and grep `out/`).
2. **A real name or the diet price slipping in** through copy, an image alt, a Silverwind sidebar user chip, an activity-log actor, or the hosting-page screenshot. Pinned by Tasks 1–2 (`check-demo-is-fake.ts`), Task 4 (frame review) and Task 5 (`check-foyle-content.mjs`, run again in Task 7 over `out/`).
3. **Mobile Safari autoplay** — inline videos need `muted` + `playsInline` or they show a black box / full-screen player. Pinned by Task 6 Step 1 attribute assertions in the rendered HTML check.
4. **Reduced motion** — users with `prefers-reduced-motion: reduce` see the poster and a play button, not autoplay. Pinned by Task 6 browser check.
5. **Page weight** — ten clips on one page; any clip > 3 MB or `preload` other than `none` makes the page crawl on mobile. Pinned by Task 4 Step 5 size check and Task 7 grep.

---

## File Structure

**Silverwind (`C:\Users\Emmet\Downloads\ProjectFoyle27`, branch `demo/portfolio-recordings`)**
- Create `scripts/demo/demo-db.ts` — create/reset `silverwind_demo` locally; refuses non-local hosts and any DB name except `silverwind_demo`.
- Create `scripts/demo/demo-world.ts` — invented names/data lists (exported constants) + `seedDemoWorld()`.
- Create `scripts/demo/seed-portfolio-demo.ts` — CLI: reset DB, run migrations, `seedDemoWorld()`, print counts.
- Create `scripts/demo/check-demo-is-fake.ts` — asserts every person/host/company/staff row in `silverwind_demo` comes from the invented lists.
- Create `scripts/demo/demo-enquiries.ts` — fixture enquiry sheet rows.
- Modify `src/lib/google-sheets.ts` — when `SILVERWIND_DEMO=1`, `listTabs`/`readTab` return the fixture instead of calling Google.
- Create `scripts/demo/demo-handbook.ts` — demo handbook entries (pseudonyms, no diet pricing).
- Modify diet-supplement display sites (see Task 2) — hidden when `SILVERWIND_DEMO=1`.
- Create `scripts/demo/record.ts` — Playwright recorder, one function per shot.
- Create `scripts/demo/encode.ps1` — webm → mp4 + poster + contact sheet, into the portfolio's `public/foyle/`.
- Add `.env.demo` (gitignored already via `.env*`? — check; if not, add to `.git/info/exclude`).

**Portfolio (`C:\Users\Emmet\Emmett-Portfolio`)**
- Create `src/lib/foyle.ts` — all case-study copy and media paths (typed).
- Create `src/app/foyle/page.tsx` — route; metadata; composes sections.
- Create `src/components/foyle/` — `CaseHero.tsx`, `Audit.tsx`, `PainMap.tsx`, `FeatureTour.tsx`, `LoopVideo.tsx` (client), `Extras.tsx`, `BrandKit.tsx`, `Engineering.tsx`, `Results.tsx`.
- Create `public/foyle/` — `*.mp4`, `*.jpg` posters, `hosting-*.jpg`, `brand-*.jpg`.
- Create `scripts/check-foyle-content.mjs` — leak check; reads banned terms from gitignored `.foyle-banned.txt`.
- Modify `src/lib/content.ts` — new project card at index "01" (renumber others), Foyle experience entry gets a link.
- Modify `src/components/Projects.tsx` / `Experience.tsx` only as needed so internal hrefs use `withBasePath`.
- Modify `.gitignore` — add `.superpowers/` and `.foyle-banned.txt`.
- Modify `package.json` — add `"check:foyle": "node scripts/check-foyle-content.mjs"`.

---

### Task 1: Demo database and invented world (Silverwind)

**Files:**
- Create: `scripts/demo/demo-db.ts`, `scripts/demo/demo-world.ts`, `scripts/demo/seed-portfolio-demo.ts`, `scripts/demo/check-demo-is-fake.ts`

**Interfaces:**
- Produces: `DEMO_DB_NAME = "silverwind_demo"`; `demoDatabaseUrl(): string` (from `.env.local` DATABASE_URL with path swapped to `/silverwind_demo`, after `assertLocalDatabaseUrl` from `scripts/scratch-db.ts`); `resetDemoDatabase(): Promise<string>` (drop + create, returns URL); `DEMO_STAFF`, `DEMO_STUDENT_NAMES`, `DEMO_HOST_NAMES`, `DEMO_COMPANY_NAMES`, `DEMO_PARTNER_NAMES` (readonly string arrays); `seedDemoWorld(): Promise<DemoCounts>` where `DemoCounts = { programmes; students; hosts; stays; companies; placements; paymentRuns; staff: number }`.
- Run command for later tasks: `npx tsx scripts/demo/seed-portfolio-demo.ts` then dev server with `DATABASE_URL=<demoDatabaseUrl> SILVERWIND_DEMO=1 SILVERWIND_ROLE_SWITCHER=1 npm run dev`.

- [ ] **Step 1: Branch.** In ProjectFoyle27: `git status` must be clean (else stop and tell Emmett); `git switch -c demo/portfolio-recordings`. Read `AGENTS.md`, `directives/data-safety.md`, `directives/development.md`, `scripts/seed-scratch-world.ts`.
- [ ] **Step 2: Write `check-demo-is-fake.ts` first.** Connects only to `demoDatabaseUrl()`. Asserts, failing with the offending value:
  - every person first+last name ∈ `DEMO_STUDENT_NAMES`; every host display name ∈ `DEMO_HOST_NAMES`; every company/site name ∈ `DEMO_COMPANY_NAMES`; every staff display name ∈ `DEMO_STAFF` (Clare, Róisín, Orla, Declan + "Demo Admin");
  - every phone matches `^07700 ?900\d{3}$` (Ofcom drama range); every email ends `@example.com`;
  - every bank sort code is `00-00-00`-style test value `^00\d{4}$`, account numbers `^0000\d{4}$`;
  - row counts > 0 for programmes, people, hosts, stays, placement sites, payment runs.
  Read `db/*.sql` for the table/column names. Exits non-zero on any failure.
- [ ] **Step 3: Run it** — `npx tsx scripts/demo/check-demo-is-fake.ts`. Expected: FAIL (database `silverwind_demo` does not exist).
- [ ] **Step 4: Implement `demo-db.ts`, `demo-world.ts`, `seed-portfolio-demo.ts`.** Seed through domain functions (`createProgramme`, `addPersonToProgramme`, `createHost`, `createSite`, placement/stay/payment functions — find them in `src/lib/`), actor from `systemActorId()` or the demo staff users. Contents: 3 programmes (one current, one starting next month, one finished) from invented partner agencies in Italy/Spain/Germany/France; ~25 students aged 15–19 with invented names; ~12 hosts in real Derry areas (Waterside, Culmore, Northland, Rosemount, Pennyburn, Shantallow) with invented street names and real public area postcodes for map pins; stays placing most students, a few unplaced so the matching board has work; ~6 invented companies with ~10 placements; one finished payment run and one ready run; staff users with the pseudonyms and appropriate roles. Rates: keep `STARTING_HOST_RATES`.
- [ ] **Step 5: Run** `npx tsx scripts/demo/seed-portfolio-demo.ts` (prints `DemoCounts`) then `npx tsx scripts/demo/check-demo-is-fake.ts`. Expected: PASS.
- [ ] **Step 6:** `npx tsc --noEmit` clean for `scripts/demo/*`. Stage on the demo branch (local commit allowed on this branch only — it is never pushed).

### Task 2: Demo-only switches — enquiries fixture, demo handbook, diet supplement hidden (Silverwind)

**Files:**
- Create: `scripts/demo/demo-enquiries.ts`, `scripts/demo/demo-handbook.ts`
- Modify: `src/lib/google-sheets.ts`; the diet-supplement display in `src/app/finance/rates/rates-view.tsx`, `src/app/finance/host-payments/host-payments-view.tsx`, `src/app/finance/host-payments/payment-runs.tsx`, `src/app/students/[enrolmentId]/page.tsx`, `src/app/person-form.tsx` (grep `dietSupplement|diet supplement` again for any others)
- Modify: `scripts/demo/seed-portfolio-demo.ts` (seed enquiry source row + handbook)

**Interfaces:**
- Consumes: Task 1 `demoDatabaseUrl()`, seed CLI.
- Produces: `isDemo(): boolean` (`process.env.SILVERWIND_DEMO === "1"`) exported from `src/lib/demo.ts`; `DEMO_ENQUIRY_SHEET: { title: string; rows: string[][] }`.

- [ ] **Step 1: Extend `check-demo-is-fake.ts`**: assert handbook entries exist and none contains the real staff names (read banned names from gitignored `work/demo-banned.txt`, one per line — Emmett's real staff first names; create it locally, never commit) or the string `£15`; assert ≥ 6 host enquiries exist after the enquiries screen sync runs (call `listHostEnquiries()` sync path directly), spread across pipeline stages, with names ∈ a new `DEMO_ENQUIRER_NAMES` and some with "Referred by" set to a demo host.
- [ ] **Step 2: Run** — expected FAIL.
- [ ] **Step 3: Implement.** `google-sheets.ts`: if `isDemo()`, `listTabs` returns `[{ title: DEMO_ENQUIRY_SHEET.title }]` and `readTab` returns the fixture rows (match the real form's header row exactly — copy headers from `host-enquiries-shared.ts` `parseEnquirySheet` expectations); never call Google. Seed inserts an enquiry-source row so the screen is "set up". Handbook: 4–5 entries (logging a host enquiry, placing a student, delayed flight, running host payments without the diet figure, assigning a placement), staff referred to by pseudonym. Diet supplement: when `isDemo()`, don't render the supplement amount/label (render nothing, not a fake value).
- [ ] **Step 4: Run** seed + check — PASS. `npx tsc --noEmit` clean.
- [ ] **Step 5: Smoke:** start dev server on demo DB (command in Task 1 Interfaces), sign in as Developer, open Host enquiries, Finance → Rates, the assistant (needs `ANTHROPIC_API_KEY` + `ASSISTANT_ENABLED=true` from `.env.local`). Confirm: enquiries show demo people; no diet supplement figure; assistant answers "How do I run host payments?" from the demo handbook. Stop server. Local commit on demo branch.

### Task 3: Recorder (Silverwind)

**Files:**
- Create: `scripts/demo/record.ts`

**Interfaces:**
- Consumes: running dev server at `http://localhost:3000` on the demo DB.
- Produces: `work/portfolio-recordings/raw/<shot>.webm` for shots: `programmes`, `matching`, `map`, `messages`, `enquiries`, `placements`, `terms`, `payments`, `assistant`, `search`. CLI: `npx tsx scripts/demo/record.ts [shot...]` (no args = all).

- [ ] **Step 1:** Install Playwright locally without saving: `npx -y playwright@1.5x --version` (pick the version matching cached Chromium 1228 or 1243; if mismatch, `npx playwright install chromium`).
- [ ] **Step 2: Implement.** One `chromium.launch()`; per shot a fresh context `{ viewport: { width: 1280, height: 800 }, recordVideo: { dir, size: { width: 1280, height: 800 } }, deviceScaleFactor: 1 }`, sign in as Developer, switch role to the pseudonymised staff user for that area (so the user chip shows "Clare"/"Róisín"/"Orla"/"Declan"), then a scripted sequence with deliberate pacing (`page.waitForTimeout(600–1200)` between actions, type with `{ delay: 40 }`), 8–20 s per shot:
  - `programmes`: programmes list → create programme modal → paste a 5-line student list → timeline.
  - `matching`: accommodation planner/matching board → pick unplaced student → suggested host → place.
  - `map`: accommodation map, pan/zoom over pins.
  - `messages`: message queue → template with placeholders → host reply recorded.
  - `enquiries`: enquiries list → open one → move it Contact → Home visit; show a "Referred by".
  - `placements`: placements → assign a student to a company.
  - `terms`: open a demo `/terms/[token]` link as the student, accept.
  - `payments`: Finance → host payments → payment run → export AIB file (show download, then open CSV preview if the UI has one; never show the diet figure).
  - `assistant`: ask "How do I run host payments?" and let the answer stream.
  - `search`: global search for a demo student → result → activity log.
  Never navigate to `/updates`. Close each context to flush the video; rename to `<shot>.webm`.
- [ ] **Step 3: Run** with dev server up; expected 10 webm files. Stop server.

### Task 4: Encode + frame review (Silverwind → Portfolio assets)

**Files:**
- Create: `scripts/demo/encode.ps1`
- Output: `C:\Users\Emmet\Emmett-Portfolio\public\foyle\<shot>.mp4`, `<shot>.jpg`; contact sheets in `work/portfolio-recordings/sheets/<shot>.jpg`

- [ ] **Step 1: Implement `encode.ps1`.** Per webm: `ffmpeg -i raw/<shot>.webm -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart -vf "scale=1280:-2,fps=30" <out>.mp4`; poster at 2 s `-ss 2 -frames:v 1 -q:v 3 <shot>.jpg`; contact sheet `-vf "fps=1,scale=640:-1,tile=4x5"`. If an mp4 > 3 MB, re-encode with crf 31.
- [ ] **Step 2: Run** it.
- [ ] **Step 3: Frame review.** Read every contact sheet image (and the full-size poster). Check against the spec checklist: no real names/addresses/phones/emails/bank details/photos, no real staff names, no diet supplement price, no "What's new" UI, no tokens/URLs visible. Any hit → fix the cause in Task 1–3 and re-record that shot.
- [ ] **Step 4:** Record the review result per shot in `work/portfolio-recordings/review.md` (shot, pass/fail, note).
- [ ] **Step 5: Size check:** every `public/foyle/*.mp4` ≤ 3 MB (`ls -l`). Return ProjectFoyle27 to its original branch (`git switch messages-from-programme`).

### Task 5: Case-study content + leak check (Portfolio)

**Files:**
- Create: `src/lib/foyle.ts`, `scripts/check-foyle-content.mjs`, `.foyle-banned.txt` (gitignored)
- Modify: `.gitignore`, `package.json`

**Interfaces:**
- Produces (`src/lib/foyle.ts`):
  ```ts
  export type FoyleStat = { value: string; label: string };
  export type AuditPerson = { pseudonym: string; role: string; pain: string; quote: string };
  export type PainSolution = { pain: string; solution: string; anchor: string };
  export type Feature = { id: string; title: string; fixes: string; body: string; video: string; poster: string };
  export type Extra = { id: string; title: string; body: string; images: { src: string; alt: string }[] };
  export const foyle: {
    meta: { title: string; description: string };
    hero: { eyebrow: string; headline: { text: string; italic: boolean }[]; intro: string; stats: FoyleStat[] };
    audit: { label: string; intro: string; namesNote: string; people: AuditPerson[] };
    painMap: { label: string; items: PainSolution[] };
    silverwind: { label: string; intro: string; features: Feature[] };
    extras: { label: string; hosting: Extra; aib: Extra; brand: Extra & { tokens: BrandTokens } };
    engineering: { label: string; points: string[] };
    results: { label: string; stats: FoyleStat[]; outcomes: string[] };
  };
  ```
  `BrandTokens = { colours: { name: string; hex: string; use: string }[]; type: { role: string; family: string; sample: string }[] }` — values read from the brand-kit artifact (`project/api/tokens.md`) via the claude-artifacts `read_file` tool.
- Produces: `npm run check:foyle [dir]` — exits 1 listing file:line for any banned term.

- [ ] **Step 1: Write `check-foyle-content.mjs`.** Scans `src/`, `public/` text files (and `out/` if passed as arg) for: each line of `.foyle-banned.txt` (case-insensitive, whole word; Emmett's real staff names + any real host/student names Emmett adds), `£15`, `diet supplement` followed by a price, `What's new`, `Radar`, and hype words `leverage|cutting-edge|seamless|revolutioni`. Fails if `.foyle-banned.txt` missing.
- [ ] **Step 2:** Create `.foyle-banned.txt` locally with the four real staff first names; add it and `.superpowers/` to `.gitignore`. Run `npm run check:foyle` — expect PASS on current tree (sanity), then temporarily add one banned name to a scratch file under `src/` → expect FAIL, remove.
- [ ] **Step 3: Write `src/lib/foyle.ts`** with the copy. Hero headline: `From ten spreadsheets to ` + italic `one source of truth.` Stats: `~10` spreadsheets retired · `10–25h` saved per week (approx.) · commit count (re-count: `git -C C:\Users\Emmet\Downloads\ProjectFoyle27 rev-list --count main`) · `Sep 2026` live · `4` staff daily. Audit people use the pseudonyms; `namesNote`: "Names changed for privacy." Pain points: spreadsheets/no single source of truth; recruiting host families; finance and bookkeeping. Features: one per Task 3 shot, `fixes` names the pain. Engineering: Next.js + Postgres on Azure App Service; every write action permission-checked on the server; ~2,000 automated checks; audit 14 Oct 2026: 1,999/2,001 passing, every page renders for all 7 roles, 0 data-integrity violations; GitHub Actions deploy. Results: the approximate figures + "Staff finally got their heads above water and a handle on admin" + "Clear view of the company's data for the first time". AIB extra: one CSV upload replaces keying each host payment; built to AIB iBusiness rules (18-char name/reference, capitals, sort code/account validation). Hosting extra: foyle.eu/hosting → Silverwind enquiries pipeline (call → home visit → references → AccessNI → host profile), referrals tracked.
- [ ] **Step 4:** `npx tsc --noEmit` and `npm run check:foyle` — both PASS. Stage + show diff.

### Task 6: `/foyle` page and components (Portfolio)

**Files:**
- Create: `src/app/foyle/page.tsx`, `src/components/foyle/*.tsx` (list in File Structure)

**Interfaces:**
- Consumes: `foyle` from `src/lib/foyle.ts`; `withBasePath`; existing `Navbar`, `Footer`; site fonts (`--font-serif` Fraunces, `--font-mono` IBM Plex Mono) and Tailwind tokens in `globals.css`.
- Produces: `LoopVideo({ src, poster, title }: { src: string; poster: string; title: string })` — client component; `<video muted playsInline loop preload="none">`; IntersectionObserver plays at ≥ 40 % visible, pauses when out; if `matchMedia('(prefers-reduced-motion: reduce)')` shows poster + a play button instead; `aria-label={title}`.

- [ ] **Step 1:** Read `node_modules/next/dist/docs/01-app` pages on routing, metadata and static export. Implement `page.tsx` (exports `metadata` from `foyle.meta`) and sections in order: CaseHero, Audit (`01 // the audit`), PainMap (`02 // pain points → solutions`), FeatureTour (`03 // silverwind`; alternating text/video rows, video in a bordered frame), Extras (`04 // the extras`: hosting, AIB, BrandKit — BrandKit renders swatches and type specimens from `tokens` in cream/green on its own light panel so it reads as Foyle's look, not the portfolio's), Engineering (`05 // engineering`), Results (`06 // results`), then a back link to `/#work`. Match existing components' classes (look at `Projects.tsx`, `Experience.tsx`) for spacing, borders, label style.
- [ ] **Step 2:** Hosting/brand images: Playwright screenshot of `https://foyle.eu/hosting` (1280 wide; hero, the three numbered points, the form + note wall) and `https://foyle.eu/` hero; crop/blur any staff photo or staff name with ffmpeg `boxblur` on the region; save `public/foyle/hosting-*.jpg`, `brand-site.jpg` (≤ 300 KB each). Read each image to verify no staff name/photo.
- [ ] **Step 3: Verify:** `npm run dev`, open `http://localhost:3000/foyle/` in a browser (Claude in Chrome or Playwright): every section renders, videos play when scrolled into view, emulate `prefers-reduced-motion: reduce` → no autoplay, poster visible; emulate 390 px wide → no horizontal overflow; no console errors. Stop server. `npm run lint` clean. Stage + show diff.

### Task 7: Homepage link-in + production build check (Portfolio)

**Files:**
- Modify: `src/lib/content.ts` (projects: new entry index `"01"`, tag `"CASE STUDY — FOYLE INTERNATIONAL"`, title `"Silverwind & Foyle Systems"`, description one sentence of the story, tech `["Next.js","TypeScript","PostgreSQL","Azure","Playwright"]`, href `"/foyle/"`, preview `{ label, image: "/foyle/programmes.jpg", video: "/foyle/programmes.mp4" }`; renumber the others 02–04; keep "Client Web Applications"), Foyle experience entry gets a bullet/link to `/foyle/`
- Modify: `src/components/Projects.tsx` (internal href → `withBasePath(project.href)`; label "Read Case Study" when href starts with `/`), `src/components/Experience.tsx` if it renders links

- [ ] **Step 1:** Implement the content + href changes.
- [ ] **Step 2: Build with the production base path:** `NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build`. Expected: build passes, `out/foyle/index.html` exists.
- [ ] **Step 3: Grep `out/`:** every `src="` / `poster="` / `href="` for `/foyle` in `out/index.html` and `out/foyle/index.html` starts with `/Portfolio/`; every `<video` has `muted`, `playsinline`, `preload="none"`. Then `npm run check:foyle out` — PASS.
- [ ] **Step 4:** Serve `out/` under `/Portfolio/` (`npx serve` with a `Portfolio` folder symlink, or Python `http.server` from a temp dir containing `Portfolio -> out`) and click homepage card → `/Portfolio/foyle/` → videos load (network 200s). Stop server.
- [ ] **Step 5:** Show Emmett the page (screenshots) and the full diff; commit/push only on his go-ahead (pushing `main` deploys to GitHub Pages).
