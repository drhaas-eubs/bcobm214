# BCOBM214 — Entrepreneurship & Business Development

Course site for **BCOBM214 Entrepreneurship & Business Development** at EU Business School (Bachelor Year 2, 5 ECTS, FHEQ Level 5).

Live site: `https://drhaas-eubs.github.io/bcobm214` (after deploy)

© 2026 Dr. Hildegard Haas · EU Business School · hildegard.haas@euruni.edu

---

## Deploy in 60 seconds

**Step 1 — On GitHub.com (browser, ~20 seconds)**

1. Open https://github.com/new
2. Repository name: **`bcobm214`**
3. **Public** (or Private if you have a paid GitHub plan and want access control via Pages)
4. **Do not** check "Add README", "Add .gitignore" or "Choose a license" — this folder already contains them
5. Click **Create repository**

**Step 2 — In Terminal (one command, ~40 seconds)**

```bash
cd "/Users/dr.hildegardhaas/Documents/Claude/Projects/BCOBM214 Entrepreneurship & Business Development  28h"
bash deploy.sh drhaas-eubs   # replace drhaas-eubs with your GitHub username if different
```

The script handles git init, staging, committing, setting the remote, and pushing. It prints the next steps.

**Step 3 — Enable GitHub Pages (browser, ~10 seconds)**

1. Open https://github.com/drhaas-eubs/bcobm214/settings/pages
2. Source: **Deploy from a branch**
3. Branch: **`main`** · Folder: **`/ (root)`** → **Save**
4. Wait ~30-60 seconds. Your site is live at:
   `https://drhaas-eubs.github.io/bcobm214/`

**Re-deploying** after edits: just run `bash deploy.sh drhaas-eubs` again — it will prompt for a commit message and push.

---

## What's in this repo

| Path | Purpose |
|---|---|
| `index.html` | Course overview — 10 units, stats, navigation |
| `unit1.html`–`unit10.html` | Framework gallery for each unit (8 frameworks per unit · 80 total) |
| `all-frameworks.html` | Complete Slibrary Wall — all 80 frameworks on one page, organised by unit / Slibrary |
| `slibrary.html` | Framework authors — bios for every thinker referenced |
| `pedagogy.html` | Integrated pedagogical approach (Kolb, Effectuation, 5 signature pedagogies, Bloom distribution, ILO alignment) |
| `activities/` | Per-unit 7-phase session guides (all 10 units complete) |
| `cases/` | Per-unit teaching cases (all 10 units complete) |
| `prereading/` | Per-unit pre-readings (all 10 units complete) |
| `reflections/` | Per-unit reflection prompts for independent learning (all 10 units complete) |
| `assets/styles.css` | Single shared stylesheet (anti-copy / anti-print + modal layout in JD Meier Thumbnail Thinking style + author thumbnail cards) |
| `assets/frameworks.js` | Slibrary content for all 80 frameworks — enriched with the full marti301-style Slibrary sheet structure (Professional Definition · Who developed · Why developed · How/When/By whom used · Innovation vs predecessor · Figure caption · Related frameworks · Harvard sources) |
| `assets/authors.js` | Author Slibrary content for 25 thinkers — Author Distilled fields per JD Meier · core message per Bostellaar · inline SVG thumbnails |
| `assets/protect.js` | Protection deterrents + framework AND author modal lifecycle + html2pdf.js client-side PDF generation |
| `sheet.html` | Standalone printable Slibrary sheet — reached via `sheet.html#F12` (frameworks) or `sheet.html#A-sarasvathy` (authors) — with a Print-to-PDF button |
| `404.html` | Self-contained graceful fallback for missing URLs |
| `LICENSE` | © 2026 Dr. Hildegard Haas — all rights reserved (educational use by EUBS faculty and students permitted) |
| `.nojekyll` | Tells GitHub Pages not to process the site through Jekyll |
| `.gitignore` | Excludes macOS / editor / temp / generated-PDF files from the repo |
| `deploy.sh` | One-shot deploy script — see "Deploy in 60 seconds" above |

---

## The Slibrary system (frameworks + authors)

Every framework card on every unit page (and on `all-frameworks.html`) and every author thumbnail on `slibrary.html` is clickable. The modal that opens is a full Slibrary sheet styled in the JD Meier Thumbnail Thinking tradition:

**Framework Slibrary sheet contains:**

- Top bar — course code + unit · slibrary
- Title + Slibrary 0X · Sheet Y/4
- Italic subtitle
- **Professional Definition** — formal definition box
- **Who developed it / Why it was developed** | **Figure** (two-column)
- **How / When / By whom it is used** (three-column)
- **Innovation relative to the predecessor tool** — highlighted box
- **Related frameworks in this course** — pill tags
- **Sources (Harvard Referencing Style)**
- Footer bar with course/sheet/author/school/©

**Author Slibrary sheet contains:**

- Top bar — Author Slibrary · discipline
- Name + years
- Italic role
- **Core Message** — Bostellaar-style one-sentence distillation in the author's voice
- **Why this thinker matters** — highlighted box
- **Foundation / Operationalisation** | **Thumbnail SVG** (two-column)
- **Frameworks they anchor / Limitations / Enduring impact** (three-column)
- **Where their thinking shows up in BCOBM214**
- **Sources (Harvard Referencing Style)**
- Footer bar

## PDF generation — two paths

**Path A — Standalone printable sheet (`sheet.html`)** — recommended for general use

Every framework and author has a directly-accessible printable sheet at:

- `sheet.html#F12` — for any framework (replace F12 with the number)
- `sheet.html#A-sarasvathy` — for any author (replace sarasvathy with the author id)

A green **"PDF →"** badge appears on every card on `all-frameworks.html` and on every thumbnail on `slibrary.html` — clicking it opens the sheet in a new tab. The sheet has a prominent **"Print as PDF"** button at the top that triggers the browser's native Save-as-PDF dialog. Works in any browser, doesn't depend on JS modal behaviour, and produces clean A4 PDFs.

**Path B — In-modal PDF download via html2pdf.js** — for advanced use

Clicking a framework card on a unit page or the wall opens a modal with a **Download as PDF** button. The button uses `html2pdf.js` (CDN-loaded on first click) to generate a PDF directly from the DOM. Filename follows `F01_schumpeter_creative_destruction.pdf` for frameworks, `author_sarasvathy.pdf` for authors. Requires the site to be loaded over HTTP (server or GitHub Pages), not via local `file://`.

Both paths render the same Slibrary content. To edit, change the entry in `assets/frameworks.js` or `assets/authors.js` once — every sheet (Path A and Path B) reflects the change.

---

## Content protection (deterrent layer)

The site ships with a layered deterrent against casual copying and printing:

- **CSS:** `user-select: none` blocks text highlighting and `Cmd/Ctrl+C`. `@media print` replaces the page with a notice when a student tries to print.
- **JS (`assets/protect.js`):** blocks right-click context menu, blocks `Cmd/Ctrl+S, P, U, A, C, X`, blocks `F12` and devtools shortcuts.
- **Images:** `pointer-events: none` and `user-drag: none` prevent drag-saving images.

> **Honest limitation:** GitHub Pages is a public host. These are deterrents — they defeat ~95% of casual copying attempts but a determined student can always view the raw HTML, save the page, or use a different browser. For genuine access control, host the same files behind authentication: a **private GitHub repo with private GitHub Pages** (requires GitHub Pro/Team/Enterprise) or upload the folder to **Moodle** as a static resource.

---

## Course structure at a glance

The course follows a three-phase journey: **Starting → Scaling → Growing**.

| # | Unit | Phase | Signature Pedagogy |
|---|------|-------|--------------------|
| 1 | Introduction to Entrepreneurship & BD | Starting | Presentation — Vision Pitch |
| 2 | Identifying & Testing a Business Idea | Starting | Case Study — Idea Triage |
| 3 | Market Research & Opportunity | Starting | Role Play — Customer Discovery |
| 4 | Business Planning & Strategy | Starting | Hackathon — Strategy Sprint |
| 5 | Developing the Business Plan | Scaling | Hackathon — Plan Build Lab |
| 6 | Intrapreneurship & Corporate BD | Scaling | Case Study — Three Horizons |
| 7 | Growth Management | Scaling | Role Play — Growth Boardroom |
| 8 | Funding & Financial Strategies | Growing | Hackathon — Constraint Cards |
| 9 | Pitching & Presentation Skills | Growing | Presentation — Pitch Craft |
| 10 | Finalizing & Presenting the Plan | Growing · Capstone | Business Challenge |

The five signature pedagogies (Presentation, Case Study, Role Play, Hackathon, Business Challenge) are the EU Business School signature formats. Each student practises every format at least twice across the course; the capstone integrates all five.

---

## Pedagogical spine

Three interlocking layers:

- **Kolb's Experiential Learning Cycle** (1984) — every session moves from concrete experience → reflection → conceptualisation → experimentation.
- **Sarasvathy's Effectuation** (2001) — the course mirrors the logic expert entrepreneurs actually use.
- **Bloom's Taxonomy** — cognitive demand intentionally rises across the three phases.

See `pedagogy.html` for the full account.

---

## Deployment to GitHub Pages

```bash
# From this repo
git init
git add .
git commit -m "Initial commit — BCOBM214 site"
git branch -M main
git remote add origin git@github.com:drhaas-eubs/bcobm214.git
git push -u origin main
```

Then on GitHub:
- Settings → Pages → Source: `main` branch · `/ (root)`
- Wait ~30 seconds; site available at `https://drhaas-eubs.github.io/bcobm214`

The `.nojekyll` file is included so paths with hyphens, underscores and spaces are served verbatim.

---

## Build status

The site is feature-complete and ready to deploy. Specifically:

- 1 index page · 10 unit framework gallery pages · all-frameworks Slibrary Wall · Author Slibrary page · Pedagogy page · 404 fallback
- 10 activity guides · 10 cases · 10 pre-readings · 10 reflection prompts (all 10 units complete)
- 80 enriched framework Slibrary entries (13 fields each, ~28,000 words of authored content + ~240 Harvard citations)
- 25 author Slibrary entries with inline SVG thumbnails and Bostellaar-style core messages
- Modal renderer with html2pdf.js for client-side per-sheet PDF download
- Anti-copy / anti-print deterrent layer
- One-shot deploy script (`bash deploy.sh <username>`)

**Roadmapped follow-ups** (not blocking deploy):

- Per-unit `.pptx` decks aligned to the 7-phase session structure
- Pre-baked static `.pdf` files (alternative to client-side html2pdf)
- Bespoke per-author SVG thumbnails replacing the algorithmic placeholders
- Bespoke per-framework figure SVGs replacing the iconographic placeholders
- Moodle integration sheet linking each page to a Moodle activity ID

---

## Acknowledgements

This course inherits the design DNA of **MARTI301 — AI in Investment & Competitiveness** ([drhaas-eubs.github.io/marti301](https://drhaas-eubs.github.io/marti301)) and adapts it for Bachelor Year 2 entrepreneurship.

Framework authors are credited individually in `slibrary.html`.
