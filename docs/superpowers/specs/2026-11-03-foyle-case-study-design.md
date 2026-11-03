# Foyle International case study — design

Date: 2026-11-03. Author: Emmett (with Claude).

## Intent

Emmett's portfolio (https://emmett-m-dev.github.io/Portfolio/, repo `Emmett-M-Dev/Portfolio`, local
`C:\Users\Emmet\Emmett-Portfolio`) currently reduces his Foyle International work to one
"Client Web Applications" card and an "Administrator" job entry. The real story is much bigger and
is the strongest thing he has to show employers: he audited a small business's operations by
talking to its staff, found the pain points, and built the systems that fixed them, now used daily.

The page must read as a real case study a recruiter or hiring manager can scroll top to bottom:
problem → research → solution → evidence → results. It should prove end-to-end ownership
(requirements gathering with real users, full-stack build, deployment, adoption), not just list
features.

## The story (facts from Emmett)

- **Foyle International**, Derry~Londonderry: runs programmes for visiting (mostly EU) students,
  many under 18, with host-family accommodation, self-catering rooms and work placements.
- **The audit.** Emmett sat down with:
  - the Accommodation Officer
  - the Programmes Officer
  - the Placement Officer
  - the CEO
- **What they found:**
  1. All admin lived in messy, disjointed Excel spreadsheets. No single source of truth.
  2. Trouble getting (recruiting) host families.
  3. The CEO had trouble with finance and bookkeeping.
  4. (Trouble finding EU projects — **dropped from the page.** Emmett built a Silverwind tool
     called Radar, since deprecated, then trained staff on Claude deep research instead. Do not
     mention Radar.)
- **What he built:**
  1. **Silverwind** — a central operations system to localise admin and give one source of truth
     across Programmes, Accommodation and Placements.
  2. **foyle.eu/hosting** — host recruitment landing page ("Thinking of hosting?"), whose form
     (incl. a "Referred by" field) feeds Silverwind's **Host enquiries** pipeline: call → accommodation officer's
     home visit → reference check → AccessNI → host profile; referral hosts are tracked.
  3. **Finance** — Silverwind host payments → payment runs → an **AIB GB bulk-payment CSV**
     (built to AIB iBusiness Banking rules: 18-char name/reference limit, capitals only, sort code
     and account validation), so the CEO uploads one file to AIB instead of keying each host payment.
  4. **Foyle brand kit** — the one design system Emmett uses to make every Foyle web product (the
     foyle.eu website, link pages, hosting page).
- **Results (Emmett's figures, rough, mark as approximate on the page):**
  - ~10 spreadsheets retired
  - at least 10 staff hours saved per week, up to ~25
  - staff "finally got their heads above water" and have a handle on admin
  - staff can now clearly see their company's data
- **Verifiable numbers from the Silverwind repo** (`C:\Users\Emmet\Downloads\ProjectFoyle27`):
  first commit 2026-09-01; ~396 commits; live since late September 2026 on Azure; used daily by
  four staff (3 officers + CEO); 14 Oct 2026 audit: 1,999 / 2,001 automated checks pass, every
  page renders for every role (7 roles × 45 pages), 0 data-integrity violations. Re-count commits
  at build time rather than trusting 396.

## Goals

- New dedicated route `/foyle` on the portfolio: one long case-study page (layout "A", chosen by
  Emmett over a homepage tabbed section and a hub + sub-pages).
- Many short screen recordings of Silverwind's best features, made against **invented demo
  data only**.
- Homepage gets a Work card for "Foyle International / Silverwind" linking to `/foyle`.
- Copy that tells the audit → pain → build → results arc in Emmett's voice.

## Non-goals

- No EU projects / Radar section.
- No link to Silverwind's code (private repo) or to the live Silverwind app.
- Not redesigning the rest of the portfolio.

## Anti-goals (failure even if it "works")

- **Any real data on the page.** Silverwind holds real data about children (names, addresses,
  diets, emergency contacts, documents) plus real hosts' bank details. A single real name, address,
  phone number, or bank detail in a video or screenshot is a failure. Recordings come only from a
  scratch database filled with invented data. Never point the recording app at the live Azure DB
  or at Emmett's local dev DB (it may be a copy of live). Review every frame before publishing.
- Generic template feel or AI-slop copy ("leveraged cutting-edge…"). Plain, specific, first person.
- A feature dump with no story. Every feature section says which pain point it fixes.
- Overclaiming: results figures are Emmett's estimates and must be labelled approximate.

## Page structure (`/foyle`), agreed

Uses the existing site style: near-black background, Fraunces serif display headings with an
italic violet accent word, IBM Plex Mono labels in the `NN // label` pattern, bordered grid cards.

1. **Hero** — headline "From ten spreadsheets to *one source of truth.*" Short intro paragraph.
   Stat strip: ~10 spreadsheets retired · 10–25 h saved / week · N commits · live since Sep 2026 ·
   4 staff daily.
2. **01 // the audit** — how it was run (sat down with each person about their daily work) and
   four cards: pseudonym, role, the pain they described. Quotes are paraphrased in their voice by the
   builder and flagged for Emmett to check.
3. **02 // pain points → solutions** — a compact map: spreadsheets → Silverwind; hosts → hosting
   page + enquiry pipeline; finance → payments + AIB bulk file.
4. **03 // silverwind** — feature tour. Each feature: short heading, which pain it fixes, 2–4
   sentences, one silent looping recording (8–20 s). Shot list:
   - Programmes: create a programme, paste a student list in, timeline
   - Accommodation planner / matching board: find a host, place a student
   - "Who is where" map
   - Host messages: templated texts to hosts, recording replies
   - Host enquiries pipeline (fed by foyle.eu/hosting)
   - Placements: assign students to companies
   - Terms acceptance: student accepts terms online via link
   - Finance: host payments → payment run → AIB CSV export
   - AI assistant answering from the staff handbook
   - Search and activity log (no "What's new" — see answers)
5. **04 // the extras** — hosting page (screenshots of the live foyle.eu/hosting, which is public
   and has no private data), AIB bulk banking (can point back to the finance video), brand kit.
6. **05 // engineering** — brief: Next.js + Postgres on Azure App Service, server-checked role
   permissions, ~2,000 automated checks, the code audit, deploy via GitHub Actions. Signals rigour.
7. **06 // results** — the figures above plus the qualitative outcomes.

Homepage: new Work card 01 "Foyle International — Silverwind" → `/foyle`. Replace or merge the
current "Client Web Applications" (foyle.eu) card — builder's call (marked below). The Foyle
"Administrator" experience entry can gain a link to `/foyle`.

## Constraints

- Portfolio: Next.js **16.2.10** (breaking changes vs training data — read
  `node_modules/next/dist/docs/` first, per `AGENTS.md`), TypeScript, Tailwind v4, static export
  (`output: "export"`, `trailingSlash: true`, `basePath` from `NEXT_PUBLIC_BASE_PATH`) on GitHub
  Pages. All asset paths must respect `basePath` (existing code already handles `/sme-bottleneck-demo.mp4`
  style paths — follow its pattern). Copy lives in `src/lib/content.ts`; keep that convention.
- GitHub Pages: keep each video small (H.264 MP4, ~1280px wide, no audio, target < 3 MB each,
  poster frame JPG). Lazy-load / `preload="none"` + autoplay when scrolled into view.
- Silverwind (Next 15.5, Postgres): `scripts/scratch-db.ts` creates throwaway DBs;
  `scripts/seed-scratch-world.ts` is a tiny seed to build on. Data must be created **through the
  domain functions** (`createProgramme`, `addPersonToProgramme`, `createHost`, `createSite`, …),
  not raw SQL. Dev sign-in: `SILVERWIND_ROLE_SWITCHER=1` adds "Sign in as Developer".
  Read Silverwind's `AGENTS.md` and `directives/` before touching it. Never commit demo-seed work
  to Silverwind's `main` without asking (pushing `main` deploys to live).
- Map and postcode features may call external services (postcodes.io); use real public Derry
  postcodes/areas for invented hosts so the map renders, but invented names/streets.
- Tools on this machine: ffmpeg is installed (WinGet). Python is
  `C:\Users\Emmet\anaconda3\python.exe`. Machine runs low on memory — avoid many parallel heavy
  processes.
- Don't commit or push either repo unless Emmett asks.

## Decided by Emmett

- Layout A: one long `/foyle` case-study page.
- Videos from a realistic invented demo dataset on a separate scratch database.
- Drop EU projects / Radar.
- The audit people, roles, pain points and results figures above.

## Builder's calls (marked as such)

- Recording method (Playwright `recordVideo`, or ffmpeg capture of a browser window, or Claude in
  Chrome GIFs converted to MP4) — whichever gives clean, smooth 1280×800 footage.
- Demo dataset contents: ~3 programmes, ~25 students, ~12 hosts, ~6 placement companies,
  some payment history — enough that screens look lived-in. Obviously-invented but believable names.
- Whether the "Client Web Applications" card is replaced or kept.
- Exact copy wording (Emmett reviews before publishing).
- Component structure for the new page.

## Answers from the builder check (Emmett, 2026-11-03)

1. **Business information on the page**
   - Host pay rates (£140 full board / £120 half board) **may** be shown.
   - The **diet supplement price may not** be shown anywhere (video, screenshot, copy).
   - **No real staff names anywhere** on the page, in copy, videos or screenshots. Use pseudonyms.
     This includes the AI assistant's handbook answers and any "assigned to" / activity-log
     names in Silverwind screens.
   - **Do not show the "What's new" screen** (drop it from the shot list).
2. **API key:** the AI assistant shot may use Foyle's Anthropic key (`ANTHROPIC_API_KEY`,
   `ASSISTANT_ENABLED=true`) from Silverwind's existing env config.
3. **Brand kit:** a Claude Design system, artifact https://claude.ai/artifact/V9iLJDPSoozVT7Mg1qKEHV
   (slug `e3f74e08-e2c9-458c-a7fc-1ff911dac020`). Read with the claude-artifacts `list_files` /
   `read_file` tools: `project/README.md` (voice, colour, type, layout rules), `project/api/tokens.md`,
   `project/tokens.css`, `project/api/components/*.md`, `project/api/assets/*.md`, component
   `preview.html` files. Summary: cream/paper grounds, one brand green (`foyle-green`, black text
   on it), Fraunces headlines + Newsreader serif body + Instrument Sans labels + Caveat script
   accent, pill buttons ending in "→", square white cards with no shadows, numbered "01 — Label"
   eyebrows, real Derry photography plus a warm illustrated style, hosting-page note wall behind
   the enquiry form. Components: Button, Tag, EnquiryForm, NoteWall, TestimonialCard.
4. **"Client Web Applications" card:** keep it for now. Add the new Foyle card alongside it.

## Calls made after the builder check (Claude's, flagged for Emmett)

- **Pseudonyms for the audit:** Accommodation Officer "Clare", Programmes Officer "Róisín",
  Placement Officer "Orla", CEO "Declan". The page says once, plainly, that names are changed.
  The same pseudonyms are used for staff accounts in the demo database and the demo handbook.
- **Diet supplement:** not shown. In the demo branch, avoid or hide the diet-supplement figure on
  rates/payment screens rather than replacing it with an invented price (an invented price could be
  read as real).
- **Demo handbook:** the assistant shot uses a short demo handbook (a few procedures rewritten with
  pseudonyms, no diet pricing) loaded only into the demo database, not Foyle's real handbook.
- **Silverwind code changes** live on a local branch `demo/portfolio-recordings` in
  ProjectFoyle27, **never pushed** (pushing `main` deploys to live). Allowed there: a persistent
  demo database (`silverwind_demo`, kept alive while the dev server runs — adjust `scratch-db.ts`
  / `db.ts` guards as needed without weakening them on `main`), a fake host-enquiries source in
  place of the live Google Forms sheet (enquiries come from demo data, never the real sheet), the
  demo handbook seed, and hiding the diet supplement. Return the working tree to `main` when done.
- **Brand kit section:** a showcase built from the tokens (swatches, type specimens, a Button /
  Tag / TestimonialCard / NoteWall rendering) plus screenshots of the live foyle.eu pages that use
  it. The "Paper A…" character illustration depicts a real staff member, so it is **not** used.
- **Hosting section:** screenshots of the public foyle.eu/hosting page (the staff photo/testimonial
  naming the accommodation officer must be cropped out or blurred, since no real staff names).
- **Frame review checklist** before any video or image ships: no real person's name, address,
  phone, email, bank detail or photo; no real staff names; no diet supplement price; no "What's
  new" screen; no live URLs/tokens in the address bar.
