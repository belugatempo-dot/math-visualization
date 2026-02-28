# Beast Academy 4 — Interactive Math Dashboard

Bilingual (EN/ZH) interactive math visualization dashboard for Beast Academy Level 4. Each chapter features hands-on widgets that let students explore mathematical concepts through direct manipulation.

## Tech Stack

- **Framework** — Next.js 15 (App Router), React 19
- **Styling** — Tailwind CSS v4 with `@tailwindcss/postcss`
- **Auth & Database** — Supabase (Auth + Postgres) via `@supabase/ssr`
- **Deploy** — Vercel

## Features

- **12 chapters** spanning books 4A–4D (Shapes, Multiplication, Exponents, Counting, Division, Logic, Factors, Fractions +−, Integers, Fractions ×÷, Decimals, Probability)
- **14 interactive widgets** — Angle Explorer, Area Model, Binary Converter, Decimal Place Value, Division Visualizer, Exponent Explorer, Fraction Multiply, Fraction Number Line, Integer Line, Logic Placeholder, Probability Spinner, Sieve Explorer, Symmetry Explorer, Tree Diagram
- **Progress saving** — localStorage for guests, Supabase for logged-in users with automatic migration on first login
- **Export / Import** — back up and restore progress data
- **Cosmic glass-morphism theme** — animated star field background with translucent card UI

## Project Structure

```
app/
  layout.jsx          # Root layout (AuthProvider + NavBar)
  page.jsx            # Landing page
  ba4/
    layout.jsx        # ProgressProvider (courseId="ba4")
    page.jsx          # Chapter grid
    chapter/[id]/     # Chapter detail with widgets
  (auth)/             # Login / signup routes
  profile/            # User profile page
components/
  widgets/            # 14 interactive widget components
  NavBar.jsx          # Top navigation bar
  ChapterCard.jsx     # Chapter grid card
  StarField.jsx       # Animated background
  Providers.jsx       # Client-side provider wrapper
lib/
  chapters.js         # Chapter metadata (id, title, subtitle, icon, color)
  chapter-content-map.js  # Maps chapters → widget components
  external-links.js   # External resource links
  auth/               # AuthProvider, Supabase auth helpers
  progress/           # ProgressProvider, usePersistedState, Supabase sync
  supabase/           # Supabase browser client
supabase/
  migrations/         # SQL migration files (progress tables + RLS)
```

## Getting Started

```bash
npm install
npm run dev          # starts on http://localhost:3000
```

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Without these variables the app runs in **guest-only mode** — progress is saved to localStorage and auth features are disabled.

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the project URL and anon key into `.env.local`
3. Run the migration SQL in the Supabase SQL Editor:

```bash
# File: supabase/migrations/001_progress_tables.sql
```

This creates the `profiles` and `progress` tables with Row-Level Security policies.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run Next.js linter |
