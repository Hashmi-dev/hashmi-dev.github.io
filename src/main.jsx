import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { publicUrl } from './utils/publicUrl.js'

// Without this, the browser restores whatever scroll position you were at
// last time you loaded this page, which drops Spider-Man in immediately —
// he should only ever appear once you actually scroll this session.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

// Set here instead of in CSS `url()` — Vite's base-path rewriting doesn't
// reach raw url() references in plain CSS files, so a hardcoded path there
// would 404 on any deploy that isn't served from the domain root.
document.body.style.cursor = `url('${publicUrl('/cursors/crochet-hook.svg')}') 4 9, auto`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
