# Death Row Diner

Static GitHub Pages teaser for the Death Row Diner concept.

## Current development direction

The site uses an "Institutional Americana" design system: correctional paperwork, classified case-file language, and retro diner cues without horror/gore styling. The public content intentionally withholds the real menu, location, opening date, and unreleased business details.

## Architecture

- `index.html` — main experience
- `assets/css/styles.css` — complete responsive design system
- `assets/js/core.js` — pure/testable record + Final Meal helpers
- `assets/js/app.js` — progressive interactions
- `thanks.html` — visitor-intake confirmation
- `privacy.html` — narrow visitor-intake privacy notice
- `404.html` — themed GitHub Pages 404
- `robots.txt` — temporary crawler lock while the concept is intentionally hidden
- `tests/` — dependency-free Node structural/unit tests

## Form delivery

The existing FormSubmit endpoint is preserved. The browser stores only the generated DRD record number and submitted name/alias in `sessionStorage` for the confirmation page. Email is not intentionally written to browser storage.

## Search visibility

This development version intentionally uses `noindex,nofollow,noarchive` and a `robots.txt` disallow-all rule. Remove those controls only when the project is intentionally ready for discovery.
