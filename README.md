# 💗 For Anu — 3rd Month Anniversary Site

A cute, black/white/pink anniversary website for Anu (cutey bachi chotpoti), celebrating
7 July 2026 → 7 October 2026, her **3rd month anniversary**.

> Made with 💗 + too much css — for my Anushree.

## What's inside

| Page | What it does |
|---|---|
| **Home** | Hero, typewriter nicknames (Anu / Cutey / Bachi / Chotpoti), days-together counter, days-left countdown to 7 Oct |
| **Our Story** | Timeline 07.07.2026 → now, countdown to the 3rd month |
| **Gallery** | 11 photos (with lightbox + prev/next + arrows), "favourite photo" buttons that ping Discord |
| **Ring Game** | Stage 1: catch 10 hearts (mouse/finger). Stage 2: drag the ring onto her finger. **Win = your ring + your letter** 💍 |
| **Rate Me** | Star rating + tags + comment → lands on Discord webhook, plus her saved reviews & average |
| **Letter** | **Locked** until she wins the ring on her device — win once, unlocked forever. Nav/index clicks pop a "win the ring first" lock |

## Tech

Plain HTML + CSS + vanilla JS — **no build step, no framework**. That means it works by
just opening `index.html`, and deploys anywhere static hosting is available (Netlify Drop,
GitHub Pages, Vercel, etc.).

- `index.html` — Home
- `story.html`, `gallery.html`, `game.html`, `review.html`, `letter.html` — the rest
- `css/style.css` — the whole theme (black / white / pink, floating hearts, glass cards)
- `js/app.js` — shared: config (dates, webhook), heart background, typewriter, counters,
  confetti, review → Discord helper
- `js/game.js`? — wait, game logic lives in `game.html`'s inline `<script>`
- `assets/photos/p01..p11.*` — my anu's photos (each gallery caption matches its exact photo)
- `.nojekyll` — makes GitHub Pages serve the site properly

## 🐙 Upload & deploy to GitHub Pages (5 minutes)

1. Create a repo on GitHub (e.g. `for-anu-3month`).
2. Upload these files + folders to it (or `git init` in this folder and push):
   ```
   index.html  story.html  gallery.html  game.html  review.html  letter.html
   css/        js/         assets/       .nojekyll  README.md
   ```
3. **Settings → Pages** → Source: **Deploy from a branch** → `main` / `gh-pages` → Save.
4. Done — your site is live at `https://<you>.github.io/for-anu-3month/`.

Public repos SHOW everything here to the internet (incl. the photos). If she isn't comfortable
with that: **keep the repo private** (GitHub Pages still works on private repos on paid plans),
or use Netlify Drop / Vercel to share a link only with her.

## ✏️ Customize

- **Anu's nicknames**: edit `js/app.js` → `ANU.nicknames` and the cards in `index.html`.
- **Anniversary dates**: `js/app.js` → `ANU.startDate` (07.07.2026) & `ANU.anniversary` (07.10.2026).
- **Webhook** (reviews): `js/app.js` → `ANU.webhook`. Keep this secret!
- **Photos**: drop new images into `assets/photos/` and add matching `<figure>` + `<figcaption>` lines in `gallery.html` (the "favourite photo" buttons are generated from the figures automatically).
- **Letter lock**: `localStorage.anu_ring_won` is set by `game.html` on a win and read by the shared `ringWon()` helper in `js/app.js`.
- **Rotate a photo**: `python -c "from PIL import Image; Image.open('assets/photos/pX.jpg').rotate(90, expand=True).save('assets/photos/pX.jpg', quality=92)"`

## 🎟️ Notes

- The site pings your Discord webhook from the browser. It needs internet and the webhook must
  be yours — GitHub Pages JS is public, so **never paste a webhook anyone else gave you**.
- The ring game starts a 30s timer — it isn't a test of patience, just the rules of the game.
