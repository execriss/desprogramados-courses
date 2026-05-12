# Phase 1 — Frontend Polish
> Hand this plan to Claude Code after the current MVP state (7 commits done)

---

## Context

The MVP visual is complete. All pages exist and are functional with mock data.
This phase focuses on quality, UX completeness, and production-readiness of the frontend
**before** connecting any backend.

## Rules (always apply)
- All code and comments in English
- BEM for custom styles, Tailwind only for layout/spacing
- Colors always via `var(--color-*)` tokens
- Componentize aggressively (~60 lines JSX max per component)
- One PR per feature, ~200–300 lines max
- Conventional Commits in English

---

## PR #16 — feat(seo): dynamic meta tags per page

### Goal
Each page should have its own `<title>` and `<meta name="description">` so it's indexable and shareable.

### Implementation
- Install `react-helmet-async`
- Wrap `<App>` in `<HelmetProvider>`
- Create `src/components/seo/MetaTags.tsx`:
  ```tsx
  // Props: title, description, image? (og:image)
  // Always append " | Cursora" (or platform name) to title
  // Include: title, og:title, og:description, og:image, twitter:card
  ```
- Add `<MetaTags>` to every page:

| Page | Title | Description |
|------|-------|-------------|
| HomePage | Learn like it's done in production | Platform tagline |
| CatalogPage | Courses · Cursora | Browse our catalog... |
| CourseDetailPage | `{course.title}` · Cursora | `{course.description}` (first 160 chars) |
| CoursePlayerPage | Playing: `{lesson.title}` · Cursora | Learning `{course.title}`... |
| LoginPage | Sign in · Cursora | Sign in to continue learning |
| RegisterPage | Create account · Cursora | Join 60,000+ developers |
| 404 Page | Page not found · Cursora | — |

### Files to create/modify
- `src/components/seo/MetaTags.tsx` (new)
- All page files: add `<MetaTags>` at the top of the JSX

---

## PR #17 — feat(ui): skeleton loaders

### Goal
Replace blank/flash states with skeleton placeholders while data "loads" (simulated with a short timeout on mock data, ready for real async later).

### Skeletons to build
Create `src/components/ui/Skeleton.tsx`:
```tsx
// Base component: animated shimmer block
// Props: width?, height?, className?, rounded?
// Use CSS animation: shimmer left-to-right via background-position
// Colors via CSS vars: --color-surface-alt as base, --color-border as shimmer highlight
```

Create `src/components/courses/CourseCardSkeleton.tsx`:
```
- Same dimensions as CourseCard
- Skeleton blocks for: thumbnail, badge, title (2 lines), instructor, rating, price
```

Create `src/components/courses/CourseDetailSkeleton.tsx`:
```
- Hero area: title block, subtitle block, meta row
- Sidebar: price block, button block, 3 highlight rows
- Curriculum: 3 accordion skeleton rows
```

### Simulate async loading
In `useCourses.ts` hook:
```typescript
// Add a 600ms simulated delay before returning mock data
// Expose: { courses, isLoading }
// Components read isLoading and render skeleton or content accordingly
```

### Apply skeletons
- `CatalogPage`: show `CourseCardSkeleton` grid (6 items) while loading
- `CourseDetailPage`: show `CourseDetailSkeleton` while loading

### Files to create/modify
- `src/components/ui/Skeleton.tsx` (new)
- `src/components/ui/Skeleton.css` (new, BEM: `.skeleton`, `.skeleton--rounded`)
- `src/components/courses/CourseCardSkeleton.tsx` (new)
- `src/components/courses/CourseDetailSkeleton.tsx` (new)
- `src/hooks/useCourses.ts` (add simulated delay + isLoading)
- `src/pages/CatalogPage.tsx` (use isLoading)
- `src/pages/CourseDetailPage.tsx` (use isLoading)

---

## PR #18 — feat(pages): 404 page

### Goal
A styled, on-brand 404 page for any unmatched route.

### Design
- Centered layout, full viewport height
- Large "404" in `--color-text-muted` (light, not aggressive)
- Headline: "Page not found"
- Subtext: "The page you're looking for doesn't exist or has been moved."
- Two CTAs: "Go home" (primary button) and "Browse courses" (ghost button)
- Subtle animation: fade + slide-up on mount (Framer Motion)
- No Navbar/Footer (or minimal layout — keep it clean)

### Router setup
In `App.tsx` or router config:
```tsx
// Add catch-all route at the bottom:
<Route path="*" element={<NotFoundPage />} />
```

### Files to create/modify
- `src/pages/NotFoundPage.tsx` (new)
- `src/styles/components/not-found.css` (new, BEM: `.not-found`, `.not-found__code`, `.not-found__title`)
- `src/App.tsx` (add catch-all route)

---

## PR #19 — feat(pages): user dashboard

### Goal
A `/dashboard` page showing the user's learning progress, active courses, and completed courses.
All data is still mock — designed to be replaced with real Supabase data in Phase 2.

### Route
`/dashboard` — add to router. Link from Navbar (avatar or "My learning" link, visible when "logged in").

### Mock auth state
Add to `src/store/authStore.ts` (new Zustand store):
```typescript
interface AuthState {
  isLoggedIn: boolean;
  user: MockUser | null;
  login: () => void;   // sets isLoggedIn = true with mock user
  logout: () => void;
}

interface MockUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
```
- Login/Register pages call `login()` on form submit (mock, no real auth yet)
- Navbar shows avatar + "Dashboard" link when `isLoggedIn === true`
- `/dashboard` redirects to `/login` if not logged in (`ProtectedRoute` component)

### Dashboard layout
```
┌─────────────────────────────────────────────────┐
│  Header: "Welcome back, {name}" + joined date   │
├──────────────┬──────────────────────────────────┤
│  Stats row:  │  3 cards: courses enrolled /     │
│              │  completed / hours learned        │
├──────────────┴──────────────────────────────────┤
│  Section: "Continue learning"                   │
│  Horizontal scroll of CourseProgressCard        │
├─────────────────────────────────────────────────┤
│  Section: "Completed courses"                   │
│  Grid of CompletedCourseCard with cert badge    │
└─────────────────────────────────────────────────┘
```

### Components to create
- `src/components/dashboard/StatCard.tsx` — icon + number + label
- `src/components/dashboard/CourseProgressCard.tsx` — thumbnail, title, progress bar, "Continue" CTA
- `src/components/dashboard/CompletedCourseCard.tsx` — thumbnail, title, completion date, "View certificate" (disabled, Phase 3)
- `src/components/auth/ProtectedRoute.tsx` — wraps routes that require login

### Mock dashboard data
In `src/data/mockUserProgress.ts`:
```typescript
// Array of: { courseId, progressPercent, lastLesson, enrolledAt, completedAt? }
// Use 2–3 in-progress courses, 1–2 completed
```

### Files to create/modify
- `src/store/authStore.ts` (new)
- `src/data/mockUserProgress.ts` (new)
- `src/pages/DashboardPage.tsx` (new)
- `src/components/dashboard/StatCard.tsx` (new)
- `src/components/dashboard/CourseProgressCard.tsx` (new)
- `src/components/dashboard/CompletedCourseCard.tsx` (new)
- `src/components/auth/ProtectedRoute.tsx` (new)
- `src/styles/components/dashboard.css` (new, BEM)
- `src/components/layout/Navbar.tsx` (add auth-aware links)
- `src/pages/LoginPage.tsx` (call authStore.login on submit)
- `src/App.tsx` (add /dashboard route with ProtectedRoute)

---

## PR #20 — feat(pages): instructor profile page

### Goal
A `/instructors/:slug` page showing an instructor's full profile, bio, and their courses.

### Route
`/instructors/:slug` — link from CourseDetailPage instructor section.

### Page layout
```
┌─────────────────────────────────────────────────┐
│  Hero: large avatar, name, title/role           │
│  Short bio excerpt                              │
│  Stats: X courses · X students · X rating avg  │
├─────────────────────────────────────────────────┤
│  Full bio (2–3 paragraphs)                      │
├─────────────────────────────────────────────────┤
│  "Courses by {name}"                           │
│  CourseGrid filtered to this instructor         │
└─────────────────────────────────────────────────┘
```

### Mock instructor data
Extend `src/types/index.ts`:
```typescript
export interface Instructor {
  id: string;
  slug: string;
  name: string;
  title: string;         // e.g. "Senior Frontend Engineer at Vercel"
  avatarUrl?: string;
  shortBio: string;      // 1 sentence, shown in CourseCard
  fullBio: string;       // 2–3 paragraphs
  studentsCount: number;
  rating: number;
}
```

Create `src/data/mockInstructors.ts` with 4–5 instructors.
Update `Course` type: replace `instructor: string` with `instructorId: string`.

### Files to create/modify
- `src/data/mockInstructors.ts` (new)
- `src/types/index.ts` (extend Instructor, update Course)
- `src/pages/InstructorPage.tsx` (new)
- `src/styles/components/instructor.css` (new, BEM)
- `src/pages/CourseDetailPage.tsx` (link instructor name to /instructors/:slug)
- `src/App.tsx` (add /instructors/:slug route)

---

## Phase 1 Checklist

- [ ] PR #16 — SEO: MetaTags component on all pages
- [ ] PR #17 — Skeletons: CourseCard + CourseDetail skeletons with simulated loading
- [ ] PR #18 — 404 page with on-brand design and catch-all route
- [ ] PR #19 — Dashboard: mock auth store, ProtectedRoute, full dashboard UI
- [ ] PR #20 — Instructor profile page linked from CourseDetailPage

## Notes for Claude Code
- Keep mock data clean and typed — it will be replaced 1:1 with Supabase queries in Phase 2
- `authStore` intentionally has no real auth logic — just a boolean flag for UI state
- The `ProtectedRoute` redirect target should be `/login?redirect=/dashboard` so Phase 2 can honor it
- All new CSS files follow BEM strictly — no Tailwind for colors or typography
