// Vite's `base` config (set for GitHub Pages subpath hosting) only rewrites
// asset imports and index.html — plain string paths to files in `public/`
// need this to still resolve correctly wherever the site is deployed.
export function publicUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
