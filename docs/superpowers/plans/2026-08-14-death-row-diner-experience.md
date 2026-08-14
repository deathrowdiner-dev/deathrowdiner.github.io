# Death Row Diner Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing static teaser into an immersive, accessible, deliberately hidden Death Row Diner experience without publishing changes to `main`.

**Architecture:** Keep GitHub Pages as a no-build static site. Split semantic HTML, a single reusable design-system stylesheet, and progressive-enhancement JavaScript so the experience stays fast and maintainable while preserving the current FormSubmit workflow.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript, Web Audio/Web Share/Clipboard progressive enhancement, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- Keep the site intentionally hidden from search for now; explicit `noindex,nofollow,noarchive` on public HTML and `robots.txt` disallow.
- Do not reveal unapproved real-world menu, location, opening date, policies, or business claims.
- Keep "Enjoy Your Time Served." as the primary brand line.
- No JS framework, bundler, or runtime dependency.
- Sound is opt-in only; motion respects `prefers-reduced-motion`.
- Do not store visitor email addresses in browser storage.
- Do not merge or publish to `main` before user review.

---

### Task 1: Structural regression harness

**Files:**
- Create: `tests/site.test.mjs`

**Produces:** structural checks for all later tasks.

- [ ] Write failing tests for expected site files, semantic section IDs, labeled form fields, mobile-nav ARIA, external CSS/JS, noindex directives, reduced-motion support, privacy/404 pages, and confirmation-record target.
- [ ] Run `node --test tests/site.test.mjs` and verify failure because implementation files are absent/incomplete.
- [ ] Keep tests dependency-free so validation works on any current Node installation.

### Task 2: Static architecture + Institutional Americana design system

**Files:**
- Create: `index.html`
- Create: `assets/css/styles.css`
- Create: `assets/js/app.js`
- Create: `CNAME`

**Produces:** accessible semantic shell, shared tokens, responsive nav, noindex setup.

- [ ] Build semantic page landmarks with skip link and primary navigation.
- [ ] Replace inline styles with the shared stylesheet and define paper/ink/red/green/steel/orange tokens.
- [ ] Add real mobile-nav state handling with `aria-expanded`, overlay/menu panel, Escape handling, and link-close behavior.
- [ ] Add focus-visible and reduced-motion rules.
- [ ] Run the structural test suite and resolve only Task 2 failures.

### Task 3: Hero, case file, evidence locker, and status board

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Modify: `assets/js/app.js`

**Produces:** immersive top-of-page experience and visitor-facing progress.

- [ ] Build hero with DRD-0001 status, `Access Granted` treatment, primary intake CTA, and `Open Case File` CTA.
- [ ] Build case-file folder/document composition that keeps project details intentionally sealed.
- [ ] Add three keyboard-operable evidence exhibits with redacted/revealed states.
- [ ] Replace the 11-stage public roadmap with six visitor-friendly status rows and explicit `CLEARED / UNDER REVIEW / SEALED` labels.
- [ ] Run tests and manual keyboard checks.

### Task 4: Final Meal Request interaction

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Modify: `assets/js/app.js`

**Produces:** client-side interactive diner ticket with no persistence.

- [ ] Add entrée, side, dessert, and drink controls using deliberately generic placeholder categories rather than claiming a real menu.
- [ ] Render a receipt-style request with case number and selected values.
- [ ] Add Share button using Web Share when available and clipboard fallback otherwise.
- [ ] Add an aria-live status message for copy/share outcome.
- [ ] Verify keyboard operation and empty-state behavior.

### Task 5: Visitor intake + confirmation record

**Files:**
- Modify: `index.html`
- Create: `thanks.html`
- Modify: `assets/js/app.js`

**Produces:** accessible FormSubmit intake and themed confirmation.

- [ ] Preserve existing FormSubmit endpoint and anti-spam honeypot.
- [ ] Add explicit labels, descriptions, autocomplete values, required email messaging, optional final-meal prompt, and privacy link.
- [ ] Generate a `DRD-####` record number only on valid submit and store only record number + name for confirmation.
- [ ] Read and display those values on `thanks.html` with safe fallbacks.
- [ ] Verify tests and form HTML validity assumptions.

### Task 6: Privacy, 404, crawl lock, and resilience

**Files:**
- Create: `privacy.html`
- Create: `404.html`
- Create: `robots.txt`
- Modify: `assets/css/styles.css`
- Modify: `assets/js/app.js`

**Produces:** complete small-site operational surfaces without premature SEO.

- [ ] Add concise privacy explanation limited to visitor-intake data handling.
- [ ] Add themed 404 with return action.
- [ ] Add `robots.txt` with `Disallow: /` and `noindex,nofollow,noarchive` to all HTML pages.
- [ ] Add optional ambience toggle, OFF by default, using procedural Web Audio only after user activation.
- [ ] Add fallback handling when Web Audio, Web Share, or Clipboard APIs are unavailable.

### Task 7: Repository documentation + verification

**Files:**
- Modify: `README.md`
- Create: `DEVELOPMENT.md`

**Produces:** clear local testing and pre-main review workflow.

- [ ] Document architecture, hidden-search status, form delivery, and file responsibilities.
- [ ] Document local preview using `python3 -m http.server 8000`.
- [ ] Run `node --test tests/site.test.mjs` fresh.
- [ ] Run a local static server smoke check with `curl` for `/`, `/thanks.html`, `/privacy.html`, and `/404.html`.
- [ ] Verify no work touched the live `main` branch.
