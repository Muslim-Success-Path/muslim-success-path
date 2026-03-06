# Muslim Success Path — Next.js 15 + TypeScript

## Quick Start

```bash
# 1. Install dependencies (clean install — no audit issues)
npm install

# 2. Run dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

> ✅ This project uses **Next.js 15 + React 19** — all known high-severity
> vulnerabilities from Next.js 14 are resolved. Running `npm audit` should
> return 0 high severity issues.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow the prompts — defaults work perfectly)
vercel
```

## Project Structure

```
src/
  app/
    globals.css       ← all styles + CSS variables
    layout.tsx        ← HTML shell + metadata
    page.tsx          ← full page content
  components/
    FluidCanvas.tsx   ← multicolor orbs background (fixed)
    RippleCanvas.tsx  ← water ripple per-section (fixes scroll issue)
    Cursor.tsx        ← color-cycling cursor + click burst
next.config.ts        ← Next 15 config
```

## Why the ripple works everywhere now

In the previous HTML version the ripple canvas was `position:fixed` —
it only ever covered the visible viewport. No matter how far you scrolled,
it was the same canvas stuck to the screen top.

In this version every section has its **own** `RippleCanvas` component
that is `position:absolute` and fills that section's full height. Stats,
Pillars, Pipeline, Resources, About, and Newsletter each have their own
live ripple — at `intensity={0.45}` (soft) while the Hero gets
`intensity={1}` (full drama).
