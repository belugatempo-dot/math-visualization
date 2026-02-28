# Plan: Match StarQuest Cosmic Theme + Fix Dev Port

## Status: Implementation In Progress

**DONE:**
- Step 0: vite.config.js port 6266
- Step 1: index.css fully rewritten with cosmic palette + glass classes + twinkle keyframe
- Step 7: favicon.svg, manifest.json, index.html theme-color all updated to #0f172a
- Step 5: All bulk token replacements done (text-frost→text-primary, moonlight→text-secondary, bg-surface-raised→bg-white/10, border→border-white/15, SVG inline colors)

**REMAINING:**
- Step 2: Add StarField + Nebula component to JSX
- Step 3: Update home screen (glass-card cards, star-glow heading, border-white/15 dividers)
- Step 4: Update content shell (nav-bg top bar, glass pills)
- Step 6: Footer text change
- Also: the user's new request about improving theme-factory skill (separate task, handle AFTER)

## Context

The Starry Blue theme was applied but doesn't match the reference at `starquest.beluga-tempo.com/en`. The reference uses a **cosmic glass-morphism** aesthetic with animated twinkling stars, nebula blobs, semi-transparent purple-tinted glass cards, and gold (`#ffd700`) accents — quite different from the current flat dark-navy look. The user also wants the dev server pinned to port **6266**.

## What Needs to Change (Delta from Current State)

### Current vs Reference

| Aspect | Current (wrong) | Reference (target) |
|--------|-----------------|---------------------|
| Background | Flat `#0a1628` gradient | `#0f172a` with radial starfield + nebula blobs |
| Cards | Solid `#152238` | Glass: `rgba(65,75,150,0.5)` + backdrop-blur + white/15% border |
| Borders | Solid navy `#253d5e` | Semi-transparent `rgba(255,255,255,0.15)` |
| Gold accent | `#FFD43B` | `#ffd700` |
| Stars | Static noise overlay (`body::before` feTurbulence) | Animated twinkling dots (40 bright gold + 60 dim white) |
| Text secondary | Custom `#8baac4` moonlight | Slate `#94a3b8` |
| SVG canvases | Solid `#152238` | Glass card style to match |
| Hover glow | `rgba(255,212,59,0.12)` | `rgba(255,215,0,0.3)` — stronger |
| Fonts | 4 Google Fonts loaded | Keep (fine as-is) |

---

## Files to Modify

| File | Changes |
|------|---------|
| `vite.config.js` | Add `server: { port: 6266 }` |
| `src/index.css` | Replace palette tokens, replace noise with starfield, add glass-card + nebula classes, update `.svg-canvas`, twinkle keyframe |
| `src/ba4-math-dashboard.jsx` | Add StarField component, update color tokens across all widgets, swap border classes, apply glass-card styling |

---

## Step 0: Fix Dev Port (`vite.config.js`)

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 6266 },
})
```

## Step 1: CSS Theme Overhaul (`src/index.css`)

### Replace `@theme` palette tokens:
```
--color-night-deep: #0f172a        (was night-sky #0a1628)
--color-night-swirl: #1e3a5f       (new — nebula tint)
--color-night-cosmic: #312e81      (new — purple nebula)
--color-glass-card: rgba(65,75,150,0.5)  (was ocean #152238)
--color-card-bg: rgba(65,75,150,0.5)
--color-terminal-bg: rgba(13,17,23,0.8)
--color-nav-bg: rgba(15,23,42,0.88)
--color-border-subtle: rgba(255,255,255,0.15)  (was #253d5e)
--color-accent: #ffd700            (was star-gold #FFD43B)
--color-accent-glow: rgba(255,215,0,0.12)
--color-accent-amber: #fbbf24
--color-text-primary: #e2e8f0      (was frost)
--color-text-secondary: #94a3b8    (was moonlight #8baac4)
--color-text-muted: keep as-is or align to slate-500
```

### Remove `body::before` noise overlay (replaced by star component)

### Add new classes:

**`.glass-card`** — glass-morphism card:
```css
.glass-card {
  background: rgba(65, 75, 150, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.875rem;
}
```

**`.svg-canvas`** — update to match glass style:
```css
.svg-canvas {
  background: rgba(65, 75, 150, 0.35);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**`@keyframes twinkle`**:
```css
@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}
```

**`.hover-glow:hover`** — stronger gold glow:
```css
.hover-glow:hover {
  box-shadow: 0 0 24px rgba(255, 215, 0, 0.3);
}
```

**`.star-glow`** — text glow for gold headings:
```css
.star-glow {
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.3);
}
```

### Update input accent to `#ffd700`

## Step 2: StarField + Nebula Component (`src/ba4-math-dashboard.jsx`)

Add a `<StarField />` React component that renders:

1. **Fixed full-screen container** (`fixed inset-0 overflow-hidden pointer-events-none z-0`)
2. **3 nebula blobs** — large `div`s with absolute positioning, border-radius 50%, blur(80px):
   - Top-left: `rgba(79, 70, 229, 0.15)` (indigo)
   - Bottom-right: `rgba(30, 58, 95, 0.18)` (dark blue)
   - Center: `rgba(49, 46, 129, 0.12)` (deep purple)
3. **40 bright stars** — small gold `#ffd700` dots (2px), positioned randomly, animated with `twinkle` keyframe (2-7s duration, random delay)
4. **60 dim stars** — 1px `rgba(255,255,255,0.5)` dots, same animation pattern

Stars are generated deterministically (seeded) via a simple array created once. Each star is a `<div>` with absolute positioning, inline `left`/`top` %, `animationDuration`, `animationDelay`.

Render `<StarField />` at the top of both the home screen and chapter detail views (inside the outer `min-h-screen` div, before content, with `z-0`). Content gets `relative z-[1]`.

## Step 3: Home Screen Updates

- Background: keep `from-night-deep to-night-deep` (single dark, let nebula show through)
- Title "Beast": `text-accent star-glow` (gold glow)
- Chapter cards: replace `bg-ocean` → `glass-card` class
- Border: remove `border-border-subtle` → `glass-card` handles it
- Book label badge: `glass-card` style (smaller padding)
- Divider: `border-t border-white/15` (match reference border)
- Hover: keep `hover-glow` (now stronger) + `hover:scale-105`

## Step 4: Content Shell Updates

- Page bg: `bg-night-deep` (let starfield show through)
- Top bar: `bg-nav-bg backdrop-blur-sm border-b border-white/15`
- Nav buttons: `glass-card` small variant with `text-text-secondary`
- External links: same glass pill style

## Step 5: Widget Color Token Swaps

### Bulk replacements across all widgets:

| Current class/value | → | New |
|---------------------|---|-----|
| `text-frost` | → | `text-text-primary` |
| `text-moonlight` | → | `text-text-secondary` |
| `text-text-muted` | → | `text-slate-500` (or keep) |
| `bg-surface-raised` | → | `glass-card` (for badges/pills) or `bg-white/10` (for small elements) |
| `bg-ocean` | → | `bg-transparent` or `glass-card` |
| `border-border-subtle` | → | `border-white/15` |
| `hover:bg-steel-blue/30` | → | `hover:bg-white/10` |
| `text-star-gold` | → | `text-accent` |
| `border-border-subtle bg-ocean text-frost` (inputs) | → | `border-white/15 bg-white/10 text-text-primary` |
| SVG `#253d5e` (grid) | → | `rgba(255,255,255,0.15)` |
| SVG `#2d5a8a` (lines) | → | `rgba(255,255,255,0.2)` |
| SVG `#8baac4` (labels) | → | `#94a3b8` |
| SVG `#5a7fa0` (muted) | → | `#64748b` |
| SVG `#0a1628` (dividers) | → | `#0f172a` |

### Special widget notes:
- **Sieve grid cells** (`bg-ocean`): → `bg-white/10` for unmarked
- **Binary bit buttons** inactive: → `bg-white/10`
- **Area Model** pastels: keep rgba versions (they layer nicely on glass)
- **Fraction bars** inactive: `#1c3050` → `rgba(255,255,255,0.1)`, border `#253d5e` → `rgba(255,255,255,0.15)`

## Step 6: Footer Text

Change footer from:
```
Built with ❤️ for math beasts · Powered by Claude
```
to:
```
Built by Beluga with ❤️ for her son and other math beasts
```

## Step 7: Manifest + Favicon

- `manifest.json`: colors → `#0f172a`
- `favicon.svg`: rect → `#0f172a`, "4" → `#ffd700`
- `index.html` theme-color: → `#0f172a`

---

## Verification

1. `npm run build` — no errors
2. `npm run dev` — confirm launches on port **6266**
3. Visual comparison with `starquest.beluga-tempo.com/en`:
   - Twinkling stars animate in background
   - Nebula blobs visible (soft blurred color patches)
   - Cards have glass-morphism look (backdrop blur, semi-transparent, white border)
   - Gold `#ffd700` accents on headings with glow
   - SVG widgets render cleanly on glass backgrounds
4. All 12 chapter widgets still functional (sliders, buttons, SVG interactivity)
5. iPad: glass effects and backdrop-filter render correctly on Safari
