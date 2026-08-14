# Death Row Diner Experience Redesign — Design Specification

## Purpose

Transform the existing classified teaser into a memorable "Institutional Americana" experience: correctional intake paperwork × retro American diner × sealed government case file. Preserve the deliberate secrecy around the real restaurant while making the site feel intentional, interactive, accessible, fast, and ready to evolve.

## Constraints

- Keep the site intentionally hidden from search for now; add explicit noindex/noarchive directives and disallow crawling.
- Do not reveal unapproved real-world menu, location, opening date, policies, or business claims.
- Keep "Enjoy Your Time Served." as the primary brand line.
- Keep GitHub Pages compatibility and avoid a runtime framework or build dependency.
- Sound must be opt-in only. Motion must respect `prefers-reduced-motion`.
- Intake may collect name, email, city/state, message, and an optional final-meal prompt; do not store email in localStorage.
- All work remains isolated from `main` until Austin explicitly approves promotion.

## Visual System

Use near-black ink, warm paper cream, faded diner red, institutional green, stainless/chrome neutrals, and limited warning orange. Typography combines a condensed display face, typewriter/monospace accents, and a highly readable system sans-serif. Texture comes from CSS grain, ruled paper, stamped borders, checkerboard accents, diner ticket patterns, fluorescent highlights, and redaction bars rather than gore or Halloween imagery.

## Information Architecture

1. **Access / Hero** — Case DRD-0001, sealed state, brand statement, two clear actions.
2. **Open Case File** — short conceptual copy presented as an official folder/document rather than generic marketing cards.
3. **Evidence Locker** — interactive exhibits that reveal partial, deliberately fictionalized/withheld evidence without disclosing real business details.
4. **Case Status** — compress the existing 11-step internal roadmap into a visitor-friendly six-stage status board.
5. **Final Meal Request** — playful client-side meal builder that outputs a diner/prison-style request ticket; no submission or persistence required.
6. **Visitor Intake** — accessible labeled form with existing FormSubmit delivery, optional final-meal field, privacy note, and generated local intake record number.
7. **Footer / Operational Notes** — secrecy status, accessibility-friendly ambience control, and clear conceptual-development disclaimer.

## Interaction Design

- Mobile navigation opens/closes correctly, traps no focus, and closes after selecting a link.
- "Open Case File" and evidence controls use real buttons/anchors and keyboard-accessible state.
- Evidence cards reveal/redact content using button-controlled state, not hover-only behavior.
- Final Meal Request renders a printable/shareable receipt-style summary; Web Share API is used when available with clipboard fallback.
- Visitor intake generates a DRD record number on valid form submission and stores only the record number + submitted name in session/local browser storage for the confirmation page.
- Optional ambience uses a low-volume procedural Web Audio hum; OFF by default and never starts without a user action.

## Technical Architecture

- `index.html` — semantic page structure and content only.
- `assets/css/styles.css` — design tokens, component styling, responsive rules, reduced-motion rules.
- `assets/js/app.js` — navigation, evidence toggles, final-meal receipt, intake record generation, optional ambience.
- `thanks.html` — confirmation UI reading the generated record number/name from browser storage.
- `privacy.html` — concise intake-data explanation without inventing broader business policies.
- `404.html` — themed not-found page.
- `robots.txt` — temporary crawler disallow directive.
- `tests/site.test.mjs` — dependency-free structural/regression checks using Node's built-in test runner.

## Accessibility and Resilience

- Add skip link, semantic landmarks, heading hierarchy, form labels, autocomplete, focus-visible styles, aria-expanded/controls for navigation, status text for dynamic content, and sufficient contrast.
- Decorative texture is `aria-hidden` or CSS-only.
- JS enhancements degrade safely: core navigation anchors and FormSubmit still work without JavaScript.
- External fonts use `<link rel="preconnect">` and stylesheet links rather than CSS `@import`; system fallbacks remain usable.

## Testing

Automated structural tests verify files, hidden-search directives, landmark IDs, labeled inputs, mobile-nav accessibility attributes, external CSS/JS separation, reduced-motion styles, local asset references, thanks-page record target, privacy/404 presence, and no accidental hard-coded unapproved location/menu/opening claims. Manual checks cover keyboard operation, narrow/mobile layout, intake validation, evidence toggles, meal receipt generation, optional ambience, reduced motion, and confirmation behavior.
