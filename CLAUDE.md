# Tomodex — development guide

## Styling convention

Three tools are in use. Each has a defined role; don't reach for one where another owns the job.

### 1. Inline styles — design values

Use `style={{ }}` for anything that references the design system: colour, typography, spacing, radius, shadow, and motion. Always use `var(--token)` references rather than raw values.

```tsx
// ✅
<p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>…</p>

// ❌ — Tailwind typography/colour classes bypass the token system
<p className="text-sm text-gray-400">…</p>
```

Design tokens are defined in `app/globals.css`. Semantic tokens (prefixed `--color-`, `--text-`, `--space-`, etc.) are what components should reference; never use primitive tokens (`--primitive-*`) directly.

### 2. Global semantic classes — reusable interactive elements

A small set of component classes in `globals.css` cover interactive element variants. Use them via `className`.

| Class | Use |
|---|---|
| `.btn` | Standard button |
| `.btn-submit` | Primary / submit action |
| `.btn-destruct` | Destructive text button |
| `.btn-inline` | Inline text button |
| `.input` | Text input |
| `.textarea` | Textarea |
| `.text-pixel` | Pixel-font text span |
| `.text-disabled` | Dimmed / disabled text |

### 3. Tailwind — layout and structure only

Tailwind is for structural, positional, and responsive decisions — things with no design token equivalent.

**Allowed:**

```
flex  grid  hidden  block  contents
flex-1  flex-col  flex-row  shrink-0  min-w-0  min-h-*  w-full  h-*
sticky  relative  absolute  fixed  top-*  left-*  right-*  bottom-*  z-*
overflow-*  pointer-events-*
md:*  (responsive breakpoints)
```

**Not allowed** — these duplicate the token system and produce the wrong values:

```
text-sm  text-xs  text-2xl  (use var(--text-*))
text-*  (colour)            (use var(--color-*))
bg-*  border-*              (use var(--color-*))
p-*  m-*  gap-*             (use var(--space-*) or explicit px values)
font-*  uppercase           (use var(--font-*) / textTransform inline)
rounded-*                   (use var(--radius-*))
```

**Exception — responsive spacing:** when spacing must change at a breakpoint (e.g. `p-4 md:p-6`), Tailwind is acceptable because inline styles cannot express media queries. Prefer a CSS module if the pattern recurs.

### 4. CSS modules — pseudo-states and animations

Use `*.module.css` only for things that cannot be expressed inline: `:hover`, `:focus`, `:active`, `@keyframes`, and complex selectors. Import tokens via `var()` in the CSS file.

---

## Project structure

```
app/
  globals.css          — design tokens + global semantic classes
  manifest.ts          — PWA manifest
  layout.tsx           — root layout, viewport meta, SW registration
  page.tsx             — home / landing
  birthdays/           — birthdays page
  login/               — login page
  people/
    [id]/              — person detail (PersonDetail, section components, actions)

components/
  auth/                — AuthButton
  layout/              — AppShell, Sidebar, MobileTopNav, Footer
  toast/               — ToastContext, ToastContainer, DbErrorToast
  ui/                  — Card, Header, Modal, NavigationOverlay

lib/
  prisma.ts            — singleton Prisma client
  db.ts                — withDb helper + DbResult type
  people.ts            — data-access for people
  birthdays.ts         — data-access for birthdays
  SidebarContext.tsx   — search query + modal registration
  NavigationContext.tsx — route-change loader state

public/
  sw.js                — no-op service worker (install-only PWA)
```
