# To Hadiya.

A digital love letter — React + Vite site with floating draggable photos, a sealed letter that
opens on click, and a vinyl player that spins through real songs.

## Local development

```bash
npm install
npm run dev
```

## Adding content

- **Songs**: drop matching audio (`public/media/songs/`) and cover art (`public/media/song images/`)
  files with the same base filename — `src/data/songs.js` regenerates automatically via a Vite
  plugin, no code changes needed.
- **Floating photos**: add images to `public/floating-images/` and reference them in
  `src/data/floatingItems.js`.
- **Letter text**: edit `src/components/Letter/LetterModal.jsx`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it
to GitHub Pages.
