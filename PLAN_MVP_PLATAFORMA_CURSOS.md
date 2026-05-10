# 🎓 MVP — Online Course Platform
> Development plan for Claude Code

---

## 🎯 Goal

Build a functional MVP of an online course platform with a premium minimalist design, light/dark theme support (respecting system preference with manual override), smooth transitions, and excellent UX.

---

## 🛠️ Tech Stack

```
Frontend:    React 19 + TypeScript + Vite
Styles:      Tailwind CSS v4 + CSS custom properties + BEM methodology
Routing:     React Router v7
State:       Zustand
Data:        TanStack Query (React Query)
Animations:  Framer Motion
Icons:       Lucide React
Fonts:       Google Fonts — "DM Sans" (body) + "Playfair Display" (headings)
```

---

## 🔐 Security Rules

- **Never expose private keys or secrets** in source code
- All sensitive config must live in `.env` files (never committed)
- Always add `.env` to `.gitignore` before the first commit
- Use `VITE_` prefix for frontend env vars, and document them in `.env.example`

```bash
# .env.example — commit this file, NOT .env
VITE_API_URL=http://localhost:3000
```

---

## 🎨 Design & Visual Identity

### Philosophy
- Editorial minimalism: generous whitespace, typography as protagonist
- No generic gradients, no excessive border-radius
- Premium niche platform feel, not a mass marketplace

### Color Palette (CSS custom properties)

```css
/* ─── Light Theme ─── */
:root {
  --color-bg: #F8F7F4;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F0EEE9;
  --color-border: #E5E2DA;
  --color-text-primary: #1A1916;
  --color-text-secondary: #6B6760;
  --color-text-muted: #A8A49D;
  --color-accent: #2563EB;
  --color-accent-hover: #1D4ED8;
  --color-accent-subtle: #EFF6FF;
}

/* ─── Dark Theme ─── */
.dark {
  --color-bg: #0F0F0E;
  --color-surface: #1A1916;
  --color-surface-alt: #242320;
  --color-border: #2E2C28;
  --color-text-primary: #F5F3EE;
  --color-text-secondary: #A8A49D;
  --color-text-muted: #6B6760;
  --color-accent: #3B82F6;
  --color-accent-hover: #60A5FA;
  --color-accent-subtle: #1E3A5F;
}
```

### Theme System
- Auto-detect `prefers-color-scheme` on first load
- Allow manual override, persisted in `localStorage`
- Toggle button in Navbar (sun/moon icon, no label)
- Smooth transition between themes via CSS
- **Anti-FOUC**: apply `dark` class to `<html>` before React renders (inline script in `index.html`)

---

## 🎨 CSS Methodology: BEM

All custom CSS classes must follow **BEM (Block__Element--Modifier)**:

```css
/* Block */
.course-card { }

/* Element */
.course-card__thumbnail { }
.course-card__title { }
.course-card__badge { }

/* Modifier */
.course-card--featured { }
.course-card--skeleton { }
.button--primary { }
.button--sm { }
```

**Rules:**
- Tailwind is allowed **only** for layout and spacing utilities (`flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`)
- Colors, typography, borders, and shadows → always via CSS custom properties + BEM classes
- Never hardcode color values in JSX or Tailwind arbitrary values like `bg-[#2563EB]`

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── ui/                   # Primitives: Button, Badge, Card, Input, Avatar, Spinner
│   ├── layout/               # Navbar, Footer, PageWrapper, MobileMenu
│   ├── courses/              # CourseCard, CourseGrid, CourseHero, CourseCurriculum
│   ├── home/                 # HeroSection, LearningPaths, FeaturesSection, Testimonials, CtaBanner
│   └── auth/                 # AuthForm, AuthLayout
├── hooks/
│   ├── useTheme.ts           # Theme detection + toggle logic
│   ├── useCourses.ts         # Course data fetching/filtering
│   └── useScrollShadow.ts    # Navbar scroll shadow
├── pages/
│   ├── HomePage.tsx
│   ├── CatalogPage.tsx
│   ├── CourseDetailPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── store/
│   └── themeStore.ts         # Zustand: current theme
├── data/
│   └── mockCourses.ts        # Mock data (12+ courses)
├── types/
│   └── index.ts              # All shared TypeScript interfaces
├── styles/
│   ├── globals.css           # CSS variables + Tailwind base
│   └── components/           # One .css file per component (BEM)
│       ├── button.css
│       ├── course-card.css
│       ├── navbar.css
│       └── ...
└── utils/
    └── formatters.ts         # formatPrice, formatDuration, formatStudentCount
```

---

## 📄 Pages

### 1. Home (`/`)
1. **Navbar** — Logo | Nav links | CTA button + Theme toggle
2. **Hero** — Large headline, subtitle, primary + secondary CTA, social proof stat
3. **Learning Paths** — Icon grid: React, Node, Python, Vue, Angular, NestJS, Go, Java
4. **Featured Courses** — 3-column card grid
5. **Why Us** — 3 feature blocks with icon + text
6. **Testimonials** — Simple quote cards
7. **CTA Banner** — Accent background, headline + button
8. **Footer** — Links, social icons, copyright

### 2. Catalog (`/courses`)
- Search bar
- Technology filter chips (multi-select)
- Level filter chips
- Responsive course grid (3 → 2 → 1 cols)
- Empty state component

### 3. Course Detail (`/courses/:slug`)
- Hero: title, description, instructor, rating, lesson count
- Sticky sidebar: price, CTA, course highlights
- Expandable curriculum (accordion)
- "What you'll learn" section
- Instructor info card

### 4. Auth (`/login`, `/register`)
- Centered minimal layout
- Basic form validation
- Cross-link between pages

---

## 🧩 Key Components

### `Button`
```tsx
// Variants: 'primary' | 'secondary' | 'ghost' | 'danger'
// Sizes: 'sm' | 'md' | 'lg'
// Props: loading (shows inline spinner), disabled, fullWidth
```

### `CourseCard`
```
- 16:9 thumbnail (gray placeholder if no image)
- Category badge
- Title (2-line clamp)
- Instructor name
- Star rating + student count
- Price
- Hover: subtle elevation via box-shadow transition
```

### `Badge`
```tsx
// Variants: 'category' | 'level' | 'tag'
// Maps to color via CSS BEM modifier class
```

### `useTheme` hook
```typescript
// Returns: { theme, toggleTheme }
// On mount: reads localStorage → falls back to prefers-color-scheme
// On toggle: updates localStorage + toggles .dark on <html>
```

---

## 📦 Mock Data (`mockCourses.ts`)

Create 12+ courses using these TypeScript interfaces:

```typescript
// All interfaces in src/types/index.ts

export interface Lesson {
  title: string;
  durationMin: number;
  isPreview: boolean;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  category: 'react' | 'node' | 'python' | 'vue' | 'angular' | 'nest' | 'go' | 'java';
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;           // 0–5
  studentsCount: number;
  lessonsCount: number;
  durationHours: number;
  thumbnail?: string;
  tags: string[];
  curriculum: Section[];
  isFeatured?: boolean;
}
```

---

## ✨ Animations (Framer Motion)

| Element | Animation |
|---------|-----------|
| Hero content | Fade + slide-up, staggered (title → subtitle → CTA) |
| CourseCard hover | `scale: 1.01` + shadow deepens |
| Navbar | Fade-in on load; shadow appears on scroll |
| Filter chips | Background color smooth transition |
| Route change | `AnimatePresence` fade between pages |
| Mobile menu | Slide-in from right |

**Rule:** No looping animations, no decorative motion. Every animation must serve UX.

---

## 📱 Responsive

- Mobile-first approach
- Breakpoints: `sm` 640px | `md` 768px | `lg` 1024px | `xl` 1280px
- Navbar: hamburger → slide-in panel on mobile
- Course grid: 1 col → 2 col → 3 col

---

## ♿ Accessibility

- Visible focus ring on all interactive elements
- `aria-label` on icon-only buttons (theme toggle, menu, close)
- Minimum AA contrast in both themes
- Correct HTML semantics: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`

---

## 🌿 Git Strategy

### Repository setup
```bash
git init
echo "node_modules/\ndist/\n.env\n.env.local\n.env.*.local" > .gitignore
cp .env.example .env       # local only, never committed
git add .
git commit -m "chore: initialize project"
gh repo create course-platform --public --push  # or use GitHub UI
```

### Branch model
```
main          ← stable, production-ready
└── dev       ← integration branch
    └── feat/navbar
    └── feat/home-hero
    └── feat/course-card
    └── ...
```

### Commit convention — Conventional Commits (English only)

```
<type>(scope): short description in present tense

Types:
  feat      New feature
  fix       Bug fix
  style     CSS/design changes (no logic)
  refactor  Code restructure, no behavior change
  chore     Setup, config, dependencies
  docs      Documentation only
  test      Tests

Examples:
  feat(navbar): add theme toggle button
  feat(course-card): implement hover animation
  fix(theme): prevent FOUC on initial load
  style(button): adjust padding for sm variant
  chore: initialize vite project with react-ts template
  docs: add .env.example file
```

### PR size rule
- **One PR = one focused unit of work**
- Max ~200–300 lines changed per PR (excluding mock data)
- Each PR must leave the app in a working state

### Suggested PR sequence
```
PR #01 — chore: project setup (Vite + React + TS + Tailwind + deps)
PR #02 — chore: CSS variables, BEM base styles, theme system + anti-FOUC
PR #03 — feat(layout): Navbar with theme toggle and mobile menu
PR #04 — feat(layout): Footer component
PR #05 — feat(ui): Button, Badge, Spinner primitives
PR #06 — feat(home): HeroSection component
PR #07 — feat(home): LearningPaths and FeaturesSection
PR #08 — feat(home): Testimonials and CtaBanner
PR #09 — feat(home): assemble full HomePage
PR #10 — feat(courses): CourseCard and CourseGrid components
PR #11 — feat(catalog): CatalogPage with filters and search
PR #12 — feat(courses): CourseDetailPage
PR #13 — feat(auth): LoginPage and RegisterPage
PR #14 — feat(animations): Framer Motion across all pages
PR #15 — feat(responsive): mobile polish and final QA
```

---

## 🚀 Initial Setup Commands

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install react-router-dom zustand @tanstack/react-query framer-motion lucide-react
```

**`vite.config.ts`**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**`index.html`** — Anti-FOUC inline script (inside `<head>`, before any stylesheet)
```html
<script>
  // Apply saved theme before React renders to prevent flash of unstyled content
  (function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

**`.gitignore`**
```
node_modules/
dist/
.env
.env.local
.env.*.local
*.local
```

---

## ✅ MVP Checklist

- [ ] Git repo initialized with `.gitignore` and `.env.example`
- [ ] Vite + React + TypeScript + Tailwind v4 setup
- [ ] CSS custom properties for both themes
- [ ] BEM stylesheets for all components
- [ ] `useTheme` hook (system detect + manual override, no FOUC)
- [ ] Navbar with theme toggle, responsive + mobile menu
- [ ] Footer
- [ ] UI primitives: Button, Badge, Spinner
- [ ] Full HomePage (7 sections)
- [ ] CatalogPage with search and filters
- [ ] CourseDetailPage
- [ ] Login and Register pages
- [ ] 12+ mock courses with full data
- [ ] Framer Motion animations
- [ ] Fully responsive (mobile → desktop)
- [ ] Basic accessibility (aria, focus, semantics)

---

## 📌 Rules for Claude Code

1. **All code and comments must be in English**
2. **Componentize aggressively** — if JSX block exceeds ~60 lines, extract a component
3. **BEM for all custom styles** — Tailwind only for layout/spacing utilities
4. **Never hardcode colors** — always use `var(--color-*)` tokens
5. **No secrets in source code** — `.env` is gitignored, `.env.example` is committed
6. **One PR per feature** — small, focused, always leaves app in working state
7. **Conventional Commits in English** — `feat`, `fix`, `style`, `chore`, etc.
8. **Mock data only** — no backend in this phase
