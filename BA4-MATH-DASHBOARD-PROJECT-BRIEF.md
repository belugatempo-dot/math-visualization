# Beast Academy 4 — Interactive Math Dashboard

## Project Overview

An all-in-one interactive math learning dashboard for **Beast Academy Level 4** (AoPS), built as a single-file React component. The dashboard covers all 12 BA4 chapters across Books 4A–4D, providing bilingual (English/Chinese) interactive visualizations that a child can explore alongside the BA4 curriculum.

**Target user**: School-age child just starting Book 4A, guided by a technical parent.

**Current state**: Working proof-of-concept as a Claude Artifact (single `.jsx` file, React + Tailwind). All 12 chapters have interactive widgets, but depth and polish vary significantly.

**Goal**: Evolve into a production-quality learning app — either as a deployed React app or a progressively enhanced Artifact collection.

---

## Curriculum Mapping

Beast Academy 4 spans 12 chapters across 4 books. The curriculum goes well beyond standard Grade 4, covering binary notation, factorials, combinatorics, negative integers, and geometric probability.

| Ch | Book | Topic | Current Widget | Depth |
|----|------|-------|---------------|-------|
| 1 | 4A | Shapes (angles, symmetry, parallel/perpendicular) | AngleExplorer + SymmetryExplorer | ★★★ |
| 2 | 4A | Multiplication (area model, distributive property) | AreaModel (2-digit × 2-digit) | ★★★ |
| 3 | 4A | Exponents (powers, binary numbers) | ExponentExplorer + BinaryConverter | ★★★ |
| 4 | 4B | Counting (Venn diagrams, factorials, arrangements) | TreeDiagram (sandwich combos) | ★★☆ |
| 5 | 4B | Division (long division, divisibility) | DivisionVisualizer (quotient + remainder) | ★★☆ |
| 6 | 4B | Logic (grid puzzles, reasoning) | External link only (Math Playground) | ★☆☆ |
| 7 | 4C | Factors (primes, factor trees, Sieve of Eratosthenes) | SieveExplorer (step-through animation) | ★★★ |
| 8 | 4C | Fractions +/− (number line, common denominators) | FractionNumberLine (addition on number line) | ★★☆ |
| 9 | 4C | Integers (negative numbers, addition/subtraction) | IntegerLine (arrow movement on number line) | ★★☆ |
| 10 | 4D | Fractions ×/÷ (fraction of a whole, area model) | FractionMultiply (bar visualization) | ★★☆ |
| 11 | 4D | Decimals (place value, comparison, arithmetic) | DecimalPlaceValue (digit breakdown) | ★★☆ |
| 12 | 4D | Probability (experiments, compound events) | ProbabilitySpinner (spin + tally chart) | ★★★ |

★★★ = solid interactive, ★★☆ = functional but shallow, ★☆☆ = placeholder/stub

---

## Current Architecture

```
ba4-math-dashboard.jsx (single file, ~920 lines)
├── Chapter data array (id, book, title, subtitle, icon, color)
├── 14 interactive widget components:
│   ├── AngleExplorer — SVG angle with slider, type classification
│   ├── SymmetryExplorer — shape picker with symmetry line overlay
│   ├── AreaModel — 2-digit × 2-digit with color-coded partial products
│   ├── BinaryConverter — 8-bit toggle switches with power-of-2 labels
│   ├── ExponentExplorer — base/exponent sliders with expansion display
│   ├── TreeDiagram — sandwich combination counter
│   ├── DivisionVisualizer — quotient/remainder with block grid
│   ├── SieveExplorer — step-through prime sieve on 10×10 grid
│   ├── FractionNumberLine — fraction addition on segmented number line
│   ├── IntegerLine — integer addition with directional arrow
│   ├── FractionMultiply — fraction × whole number bar chart
│   ├── DecimalPlaceValue — digit-by-digit place value breakdown
│   └── ProbabilitySpinner — animated spinner with frequency tally
├── ChapterContent — routes chapter ID to widget component
├── externalLinks — maps chapters to PhET/GeoGebra/Polypad URLs
└── BA4Dashboard (default export)
    ├── Home screen: dark theme, 4-book grid layout
    └── Chapter view: sticky nav bar, widget, external links, prev/next
```

**Tech stack**: React (hooks only), Tailwind CSS (utility classes), inline SVG for all visualizations. No external dependencies beyond what Claude Artifacts provide (React, Tailwind, Recharts, Lucide, etc.).

**Design language**: Dark slate home screen, white/light chapter views, each chapter has a unique accent color. Bilingual labels throughout (English primary, Chinese secondary).

---

## What Needs Improvement

### Priority 1: Deepen Weak Chapters

**Ch 4 — Counting**: Currently only a sandwich combo picker. Needs:
- Venn diagram explorer (2-circle and 3-circle, drag to change overlaps, show inclusion-exclusion formula)
- Factorial visualizer (arrange N items, show N! grows fast)
- Permutation vs combination side-by-side comparison

**Ch 5 — Division**: Currently shows quotient/remainder only. Needs:
- Step-by-step long division animation (like the traditional algorithm, reveal one digit at a time)
- Divisibility rules reference with interactive testing
- Connection to area model (dividend = divisor × quotient + remainder)

**Ch 6 — Logic**: Currently just an external link. Needs:
- A built-in logic grid puzzle generator (3×3, 4×4) with clues
- Minesweeper-style grid puzzle
- Maybe: a Knights & Knaves truth-teller puzzle

**Ch 8 — Fractions +/−**: Needs:
- Subtraction mode (not just addition)
- Mixed number support
- Finding common denominators visualization (showing LCD)

**Ch 9 — Integers**: Needs:
- Subtraction (currently only addition)
- A "chip model" (positive/negative chip pairs cancel out) alongside the number line

**Ch 10 — Fractions ×/÷**: Needs:
- Fraction × fraction with area model (rectangle grid with row/column shading)
- Fraction ÷ whole number and whole ÷ fraction visualizations
- "Flip and multiply" rule explanation

**Ch 11 — Decimals**: Needs:
- Decimal comparison tool (which is bigger: 0.35 vs 0.4?)
- Decimal arithmetic (add/subtract with place value alignment)
- Decimal ↔ fraction conversion visualizer

### Priority 2: UX & Interaction Polish

- **Touch/mobile optimization**: All SVG interactions should work well on iPad. Add touch event handlers where only mouse events exist. Test minimum touch target sizes (44×44px).
- **Animations**: Add smooth transitions when values change. The Sieve and Spinner have animation, but most widgets are static. Use CSS transitions or React spring-like patterns.
- **Guided mode**: Add optional "tutorial" overlays for each widget that explain what to try (e.g., "Drag the slider to make a right angle. What angle measurement is that?")
- **Progress tracking**: Mark chapters as "explored" (localStorage on desktop; note localStorage doesn't work in Claude Artifact mobile app).
- **Sound effects**: Optional click/success sounds for young learners (Web Audio API).

### Priority 3: Content & Pedagogy

- **Challenge questions**: Each chapter should have 3-5 "Try this!" prompts that match BA4's problem-solving style. Example for Ch2: "Can you find two numbers whose area model has all four partial products equal?"
- **Visual consistency**: Standardize the SVG canvas sizes, font sizes, color coding across all widgets.
- **Number line reuse**: Chapters 8, 9, and 11 all use number lines — extract a shared NumberLine component with configurable range, tick marks, and labels.
- **Keyboard shortcuts**: Power users (the parent) should be able to navigate with arrow keys.

### Priority 4: Architecture & Deployment

- **Split into multi-file React app**: The single 920-line file is hitting the limits of what's manageable. Break into `/components/chapters/Ch1Shapes.jsx`, etc.
- **Deploy as standalone app**: Use Vite + React. The `claude-artifact-runner` (github.com/claudio-silva/claude-artifact-runner) can bootstrap this.
- **Add routing**: React Router for `/chapter/1`, `/chapter/2`, etc. with URL-based navigation.
- **Persistent storage**: If deploying as a real app, add localStorage or a simple backend for progress tracking.
- **i18n framework**: Replace inline bilingual strings with a proper i18n system (e.g., `react-i18next`) to support full Chinese mode toggle.

---

## Reference Materials

### BA4 Curriculum Source Documents

The parent has uploaded two PDFs that contain the complete BA4 curriculum details:

- **BA4 Chapter Overview** (24 pages) — Detailed teaching guide for all 12 chapters. Contains:
  - Specific topics per chapter section (e.g., Ch1 has "Angles", "Parallel and Perpendicular", "Squares")
  - Pedagogical notes on what to emphasize (e.g., "avoid teaching the standard algorithm for multiplication before students understand the area model")
  - Key vocabulary and concepts per chapter
  - Prerequisite chains between chapters

- **BA4 Syllabus** (2 pages) — 36-week course outline, 105 min/week class + 60-90 min homework. Sample problems included.

When building new widgets, always reference the BA4 Overview to ensure the visualization matches the exact teaching approach. BA4 emphasizes **understanding over algorithms** and **visual/spatial reasoning**.

### External Resources to Link/Embed

| Platform | Best For | URL | Chinese? | iPad? |
|----------|----------|-----|----------|-------|
| Polypad (Mathigon) | Fraction bars, geometry tiles, dice/spinners | polypad.amplify.com | Partial (polypad.amplify.com/cn/) | ✅ Touch-first |
| PhET | Area model multiplication, fractions, integers, decimals, probability | phet.colorado.edu | ✅ 93+ languages, auto-detect | ✅ iOS app ($0.99) |
| GeoGebra | Geometry constructions, angle measurement, community applets | geogebra.org | ✅ Full Chinese UI | ✅ Free iOS apps |
| Khan Academy | Video explanations, adaptive practice | khanacademy.org | Partial (Mandarin videos) | ✅ iOS app |
| Math Learning Center | Number Pieces, Geoboard, Fractions apps | mathlearningcenter.org/apps | ❌ | ✅ Free iOS apps |
| Math Playground | Logic games, word problems | mathplayground.com | ❌ | ✅ Web |
| Beast Academy Playground | Printable games designed for BA curriculum | beastacademy.com/playground | ❌ | ✅ Web |

---

## Design Principles

1. **Understanding over drilling** — Every widget should build intuition, not just practice speed. Match BA4's philosophy.
2. **Bilingual by default** — All labels in English + Chinese (中文). English primary for math terms, Chinese for context.
3. **Explore, don't lecture** — Widgets should be open-ended sandboxes, not step-by-step tutorials. Let the child discover.
4. **One screen, no scrolling** — Each widget should fit in a single viewport. Keep it focused.
5. **Color as meaning** — Each chapter has a distinct color. Within widgets, color should encode mathematical meaning (e.g., different partial products in area model).
6. **Progressive disclosure** — Start simple, let the child add complexity (toggle advanced features, expand range).
7. **External resources are supplements, not replacements** — The dashboard's built-in widgets are the primary experience. PhET/GeoGebra links are "learn more" exits.

---

## Technical Notes for Claude Code

### Available Libraries (if staying as Claude Artifact)

React, Tailwind CSS core utilities, Recharts, Lucide React, D3.js, Three.js (r128), Plotly, MathJS, lodash, Papaparse, SheetJS, shadcn/ui, Chart.js, Tone.js, mammoth, TensorFlow.js.

**No localStorage on mobile Artifact viewer.** Use `window.storage` API (Anthropic's persistent storage) if persistence is needed.

### If Converting to Standalone React App

Recommended stack:
- **Vite** for bundling (fast, modern)
- **React Router** for chapter navigation
- **Framer Motion** for animations
- **KaTeX** for math notation rendering
- **react-i18next** for bilingual support
- **Vitest** for testing

### File Structure (suggested)

```
ba4-math-dashboard/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Dashboard.jsx          # Home grid
│   │   ├── ChapterView.jsx        # Chapter wrapper with nav
│   │   ├── shared/
│   │   │   ├── NumberLine.jsx      # Reusable for Ch 8, 9, 11
│   │   │   ├── SVGCanvas.jsx       # Standard SVG wrapper
│   │   │   └── ChapterCard.jsx     # Grid card component
│   │   └── chapters/
│   │       ├── Ch01Shapes/
│   │       │   ├── AngleExplorer.jsx
│   │       │   └── SymmetryExplorer.jsx
│   │       ├── Ch02Multiplication/
│   │       │   └── AreaModel.jsx
│   │       ├── Ch03Exponents/
│   │       │   ├── ExponentExplorer.jsx
│   │       │   └── BinaryConverter.jsx
│   │       └── ... (one folder per chapter)
│   ├── data/
│   │   ├── chapters.js             # Chapter metadata
│   │   └── externalLinks.js        # PhET/GeoGebra URLs
│   ├── i18n/
│   │   ├── en.json
│   │   └── zh.json
│   └── styles/
│       └── index.css               # Tailwind base
├── public/
│   └── ba4-overview.pdf            # Reference curriculum doc
├── package.json
├── vite.config.js
└── README.md
```

---

## Immediate Next Steps

1. **Pick a weak chapter (Ch4, Ch5, or Ch6) and build it out** — Ch6 Logic is the biggest gap; a simple 3×3 logic grid puzzle would be high-impact.
2. **Extract shared NumberLine component** — Used by Ch8, Ch9, Ch11. Make it configurable for integers, fractions, and decimals.
3. **Add "Try This!" challenge prompts** — Start with 2-3 per chapter for 4A chapters (Ch1-3) since the child is starting there.
4. **Improve touch interactions** — Test on iPad, ensure all sliders and buttons meet 44px minimum touch targets.
5. **Add transitions/animations** — CSS transitions on value changes, smooth SVG path updates.

---

## Context for AI Assistant

This project was conceived and prototyped in a Claude.ai conversation. The parent is a bilingual (Chinese/English) Product Manager with Python skills, building learning tools for their school-age child. The parent also runs AI technology content channels on Chinese social media (Xiaohongshu, WeChat Video Channels), so polished results may also become content material.

The BA4 curriculum is from Art of Problem Solving (AoPS) and emphasizes deep mathematical understanding over rote memorization. When building visualizations, always prioritize "why does this work?" over "how to compute the answer."
