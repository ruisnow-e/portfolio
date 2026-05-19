# snowrui-portfolio

Personal portfolio site for Rui Snow — Creative AI MLE, Film Director, Choreographer.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Deployed on **Vercel** (free).

---

## Quick start

```bash
# 1. Install dependencies (one-time)
npm install

# 2. Run dev server
npm run dev

# 3. Open the site
# → http://localhost:3000
```

The first time you load it you'll see the opening sequence: black screen with "RUI SNOW" small in center, then after ~1.5s the full hero reveals (video bg fades in, name scales up, three titles + nav fade in). Scroll down to see the Obys-style work catalog with filter.

---

## Adding your hero video

The hero expects a looping video at `/public/hero.mp4`. **Without it, the hero will be solid black** (which is still cinematic, but not what you want long-term).

Specs that work well:
- Format: **MP4 (H.264)**
- Length: **5–10 seconds**, designed to loop seamlessly
- Resolution: **1920×1080** or **1280×720** (don't ship 4K — too heavy)
- File size: **target under 4 MB** (use Handbrake or [Compressor.io](https://compressor.io) to compress)
- Audio: muted by default — the `<video>` tag has `muted` set
- Visuals: **dark and moody** (the layer over the video is 40% black). Highly dynamic videos will compete with the typography — slow motion / abstract / textured loops work best

Suggestions for source material:
- A 5–10s clip from one of your thesis films (the most-on-brand option)
- Slow-motion of your hands / silhouette dancing
- An abstract pattern shot you made for any of your projects
- Behind-the-scenes b-roll from a shoot

Drop the file at `public/hero.mp4` and refresh — it'll just work.

---

## Editing your work list

Open `app/page.tsx` and find the `WORKS` array near the top. Each entry:

```ts
{
  num: "01",                      // global numbering, two-digit
  title: "OmniRAG",               // shown in italic serif
  category: "cs",                 // one of: "cs" | "film" | "dance"
  role: "Engineer, Research",     // shown to the right of title
  year: "2026",                   // optional, appears after role
}
```

To add a new work, just append it and bump `num` to the next two-digit. To remove one, delete the entry. The filter sidebar (`All / CS / Film / Dance`) updates automatically.

To change your name, three titles, or contact email, edit the constants near the top of `app/page.tsx`:
- `TITLES` array — the three role labels in the hero
- The text `RUI SNOW` inside the `<h1>` in the `Hero` component
- The mailto link in the `Footer` component

---

## Deploying to Vercel (free, ~5 min)

The fastest path:

1. Push this folder to a new GitHub repo (private or public, doesn't matter)
2. Go to [vercel.com](https://vercel.com) → sign up with GitHub (free tier is plenty)
3. Click **Add New → Project** → import the repo
4. Vercel detects Next.js automatically. Click **Deploy**
5. After ~1 minute you get a `*.vercel.app` URL — the site is live

To use your own domain (e.g. `snowrui.com`):
1. Buy the domain on [Namecheap](https://namecheap.com) or [Porkbun](https://porkbun.com) (~$10/yr)
2. In Vercel: **Settings → Domains → Add** → enter your domain
3. Vercel gives you DNS records → paste them into your domain registrar
4. ~10 minutes later, your domain points to your site

---

## What's currently in v1

✓ Opening sequence (black → reveal after 1.5s)  
✓ Hero with name, three role titles, top nav, video bg, video indicator, scroll hint  
✓ Three role titles are clickable — each filters the work catalog to that discipline  
✓ Work catalog with All/CS/Film/Dance filter  
✓ Scroll-tied bracket framing — the `( )` appear around whichever work is currently in the center of the viewport  
✓ Color-coded category tags (CS=emerald, Film=orange, Dance=fuchsia)  
✓ Auto-numbered (01–14)  
✓ Custom 404, responsive, accessible  

## Not in v1 — coming in v2

✗ Individual project pages at `/work/[slug]` — clicking a work currently does nothing  
✗ The 3 discipline pages (`/cs`, `/film`, `/dance`) with their own distinct visual treatments (cs=orderly, film=artistic, dance=bold)  
✗ Blog at `/blog`  
✗ About page  
✗ Horizontal & Grid view modes (only Vertical is functional; the others are visual labels)  
✗ Real images/thumbnails for each work  

---

## Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — opening sequence + bracket animations
- [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) — display & body
- [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) — italic accents (work titles)
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — tags, timestamps, captions
- All fonts loaded via `next/font/google` (no FOUT, optimized at build time)

---

## File map

```
snowrui-portfolio/
├── app/
│   ├── layout.tsx       ← root layout, font setup, global metadata
│   ├── page.tsx         ← everything: Hero + WorkCatalog + Footer
│   └── globals.css      ← Tailwind imports + base styles
├── public/
│   └── hero.mp4         ← YOU ADD THIS — looping background video
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
└── .gitignore
```
