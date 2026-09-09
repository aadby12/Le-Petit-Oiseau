# Le Petit Oiseau — Website Concept

A premium website design concept for **Le Petit Oiseau**, an Afro-Fusion × French restaurant in Nyaniba-Labone, Accra.

> **This is a client pitch prototype — not the restaurant's official website.**

---

## Quick Start (local)

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Requirements:** Node.js 18 or later.

---

## Deploy to Vercel (production)

This site is static HTML/CSS/JS. Express is only for local development. Vercel serves the `public/` folder.

### Option A — Vercel CLI (recommended)

1. Install the CLI once:

```bash
npm install -g vercel
```

2. From the project folder, log in:

```bash
vercel login
```

3. Preview deploy:

```bash
vercel
```

4. Production deploy:

```bash
vercel --prod
```

Or use the npm scripts:

```bash
npm run deploy:preview
npm run deploy
```

When prompted:
- **Set up and deploy?** Yes
- **Which scope?** your account
- **Link to existing project?** No (first time)
- **Project name?** `le-petit-oiseau` (or similar)
- **In which directory is your code?** `.` (project root)
- Confirm `vercel.json` uses **outputDirectory: `public`**

### Environment variables (Vercel)

Copy these into **Vercel → Project → Settings → Environment Variables** (Production + Preview).

| Name | Value |
|------|--------|
| `SITE_URL` | your live URL, e.g. `https://le-petit-oiseau.vercel.app` |
| `PHONE` | `+233599420024` |
| `PHONE_DISPLAY` | `+233 59 942 0024` |
| `WHATSAPP_URL` | `https://wa.me/233599420024` |
| `INSTAGRAM_URL` | `https://www.instagram.com/lepetitoiseaugh/` |
| `MENU_URL` | `https://bit.ly/LepetitOiseaughmenu` |
| `SUPPER_CLUB_URL` | `https://www.instagram.com/lepetitoiseaugh/` |
| `MAPS_URL` | `https://maps.google.com/?q=Le+Petit+Oiseau+Accra+HR6H%2BFG6` |
| `MAPS_EMBED_URL` | `https://maps.google.com/maps?q=HR6H%2BFG6,Accra,Ghana&z=16&output=embed` |
| `LOCATION_LINE` | `Nyaniba-Labone, Accra` |
| `LOCATION_DETAIL` | `Behind Alley Bar` |
| `HOURS` | `12:00 – 23:00, daily` |
| `SITE_NAME` | `Le Petit Oiseau` |
| `SITE_TAGLINE` | `Afro-Fusion × French` |
| `META_DESCRIPTION` | `Le Petit Oiseau — Afro-Fusion × French dining in Nyaniba-Labone, Accra.` |

Locally, the same values live in `.env` (see `.env.example`).  
`npm run build` / Vercel build runs `scripts/build-config.js` and writes `public/js/site-config.js` so the site uses those links.

### Option B — Vercel Dashboard

1. Push this project to GitHub (install [Git](https://git-scm.com) if needed)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Framework Preset: **Other**
5. **Output Directory:** `public`
6. Deploy

---

## Project Structure

```
le-petit-oiseau/
├── server.js              # Express — local only
├── package.json
├── vercel.json            # Vercel production config
├── README.md
└── public/                # What Vercel deploys
    ├── index.html
    ├── images/
    ├── css/
    └── js/
```

---

## Design Decisions

### Visual Identity
- **Palette:** Warm ivory (`#f7f3ed`), deep charcoal (`#1c1a18`), clay/wine accents (`#a65d4a`, `#6b3a3a`)
- **Typography:** Cormorant Garamond (display) + DM Sans (body) — editorial, not corporate
- **Photography:** Unsplash demo images clearly marked as placeholders; replace with approved restaurant photography

### Layout Philosophy
- **Mobile-first** at ~390px, then progressive enhancement at 768px, 1024px, 1440px+
- **Asymmetric editorial compositions** — no card grids or template symmetry
- **Restrained motion** — 150–500ms transitions, respects `prefers-reduced-motion`
- **No AI-template patterns** — no glassmorphism, gradient blobs, fake stats, or generic hero copy

### Sections
1. Hero — atmospheric entry with brand statement and CTAs
2. Introduction — editorial two/three-column layout with client copy placeholders
3. Menu Preview — tabbed categories with placeholder items (no invented dishes/prices)
4. Experience — visual storytelling for atmosphere
5. Supper Club — distinct section linking to Instagram events
6. Gallery — asymmetric masonry grid with lightbox
7. Reservations — Call, WhatsApp, Instagram (verified contact details)
8. Location — address, hours, map, directions

---

## Where to Insert Real Content

| Location | What to replace |
|----------|-----------------|
| `index.html` → `.intro-text` | Restaurant origin story and brand narrative |
| `index.html` → `.menu-item-*` | Official menu items, descriptions, and prices |
| `index.html` → `.supper-note` | Verified Supper Club description, schedule, booking URL |
| `index.html` → `.gallery-grid` images | Approved restaurant photography |
| `index.html` → `.hero-media`, `.experience-*`, `.supper-club-visual` | Hero and section photography |
| `index.html` → `<meta>` tags | Production domain, OG image, remove `noindex` when live |
| `index.html` → `.concept-banner` | Remove when launching official site |

---

## Where to Insert Real Links

| Element | Current value | Notes |
|---------|---------------|-------|
| Full Menu button | `https://bit.ly/LepetitOiseaughmenu` | Verified from Instagram |
| Instagram | `https://www.instagram.com/lepetitoiseaugh/` | Verified |
| Phone | `+233599420024` | Verified |
| WhatsApp | `https://wa.me/233599420024` | Verified |
| Get Directions | Google Maps query | Update with exact Maps URL if preferred |
| Supper Club CTA | Instagram events | Replace with dedicated Supper Club URL when available |
| Canonical URL | `https://example.com/...` | Replace with production domain |

---

## Verified Information Used

- **Name:** Le Petit Oiseau
- **Concept tagline:** Afro-Fusion × French (from Instagram bio)
- **Location:** Nyaniba-Labone, Accra (behind Alley Bar)
- **Hours:** 12:00 – 23:00, daily (from Instagram)
- **Phone:** +233 59 942 0024
- **Instagram:** @lepetitoiseaugh

---

## Client Approval Needed

- [ ] Official brand photography for hero, gallery, and sections
- [ ] Final menu items, descriptions, and pricing
- [ ] Restaurant story / about copy
- [ ] Supper Club details and dedicated booking link
- [ ] Confirm address and map pin
- [ ] Opening hours confirmation
- [ ] Reservation process (phone-only vs. online booking)
- [ ] Production domain and hosting
- [ ] Remove concept banner and `noindex` meta when going live
- [ ] Social media links beyond Instagram (if any)
- [ ] Email address (if applicable)

---

## Performance & Accessibility

- Semantic HTML5 with proper heading hierarchy
- Keyboard navigation and visible focus states
- ARIA labels on navigation, tabs, lightbox, and gallery
- Lazy loading on below-the-fold images
- Responsive images via `<picture>` and `srcset`
- Minimal JavaScript (no frameworks or libraries)
- CSS custom properties for maintainable design tokens

---

## License

Design concept — proprietary. Not for public deployment without client approval.
