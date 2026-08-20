# Zuleno Technologies — Website

Static frontend (HTML5, CSS3, vanilla JS) for the Zuleno Technologies corporate site. Built to deploy directly on Netlify — no PHP, no MySQL, no build step required.

## Structure

```
/
├── index.html          One-page site: hero, services, solutions, why us,
│                        projects, featured project, process, global reach,
│                        about, FAQ, CTA, contact form, footer
├── privacy.html
├── terms.html
├── 404.html
├── assets/
│   ├── css/
│   │   ├── style.css        design tokens, layout, components
│   │   ├── responsive.css   breakpoints + reduced-motion
│   │   └── animations.css   keyframes + scroll-reveal
│   ├── js/
│   │   ├── main.js          navbar scroll state, mobile menu, theme toggle, FAQ accordion
│   │   ├── animations.js    IntersectionObserver scroll reveals
│   │   └── inquiry.js       WhatsApp deep links + contact form → Netlify Forms
│   ├── images/
│   └── icons/
│       └── favicon.svg
└── README.md
```

## Notes

- **Navigation is anchor-based** (`#services`, `#projects`, etc.) on a single long-form page — the standard pattern for premium SaaS marketing sites, and it keeps every section one scroll away instead of a click away. `services.html`, `solutions.html`, `projects.html` and `about.html` were not built as separate pages; say the word and I'll split any of them out.
- **Logo**: no logo file was supplied, so a placeholder mark (angle-bracket glyph in a rounded square, Electric Blue on Deep Navy) is used in the navbar, footer and favicon. Swap `assets/icons/favicon.svg` and the inline SVG in the navbar/footer once you have the official logo — every usage is in those two spots only.
- **Theme**: dark by default, with a light mode toggle saved to `localStorage`, per the brief.
- **Forms**: the contact form is wired for **Netlify Forms** (`data-netlify="true"`, honeypot field). On submit it also opens WhatsApp with a pre-filled message built from the entered fields. Netlify Forms only activates once the site is actually deployed on Netlify — locally the fetch call is a silent no-op.
- **WhatsApp number** used: `03021585266` → formatted as `923021585266` for the `wa.me` link.
- **Placeholders left on purpose** (per your "don't invent" rule): social media links (`#`), individual project case-study links (`#`), and the Open Graph image path — fill these in once you have the real URLs/logo/OG image.
- **Fonts** load from Google Fonts (Inter + Manrope) — swap to self-hosted files if you want zero third-party requests.

## Deploy

1. Push this folder to a GitHub repo (or drag-and-drop it into Netlify).
2. In Netlify: **New site from Git** → select the repo → deploy (no build command needed, publish directory is `/`).
3. Netlify Forms will auto-detect the `project-inquiry` form on first deploy.
