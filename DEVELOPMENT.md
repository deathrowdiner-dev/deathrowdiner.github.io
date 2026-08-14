# Death Row Diner Development

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Verification

```bash
node --test tests/*.test.mjs
```

For a simple HTTP smoke check while the local server is running:

```bash
curl -I http://127.0.0.1:8000/
curl -I http://127.0.0.1:8000/thanks.html
curl -I http://127.0.0.1:8000/privacy.html
curl -I http://127.0.0.1:8000/404.html
```

## Release rule

All redesign work belongs on `development` until reviewed. Do not move it to `main` or change the GitHub Pages production source until the preview has been approved.
