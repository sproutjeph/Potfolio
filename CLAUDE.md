# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (Node `>=22.12.0`).

- `pnpm dev` — start Astro dev server
- `pnpm build` — production build to `dist/` (runs `astro check` via the `@astrojs/check` integration on type errors)
- `pnpm preview` — preview the production build
- `pnpm astro <cmd>` — pass-through to the Astro CLI (e.g. `pnpm astro sync` to regenerate `.astro/types.d.ts` after editing `src/content.config.ts`)

There is no test runner, linter, or formatter configured in this repo.

## Architecture

Astro 6 static site (output: static) with React islands, Tailwind v4, and shadcn/ui components. Deployed under `site: 'https://jephthah.dev'` (used to build canonical URLs and the sitemap).

### Rendering model

- **Astro components (`.astro`)** are server-rendered to HTML at build time — use them for everything by default.
- **React components (`.tsx`)** are *only* hydrated when an Astro file uses a `client:*` directive (e.g. `<MobileNav client:load />` in `src/components/Header.astro`). React is the exception, used for interactive shadcn primitives (`Sheet`, `Button`, etc.). Don't reach for React unless interactivity is required.

### Content collections

`src/content.config.ts` defines two Zod-validated collections loaded from MDX/MD via the glob loader:

- `projects` — `src/content/projects/*.mdx`. Required frontmatter: `title`, `description`, `stack[]`, `status` (`live` | `in-progress` | `concept`), `order`, `featured`, `pubDate`; optional `repo`, `demo`.
- `blog` — `src/content/blog/*.{md,mdx}`. Required: `title`, `description`, `pubDate`, `tags[]`; optional `updatedDate`, `draft` (defaults `false`, filtered out in `src/pages/blog/[...slug].astro`).

Dynamic routes (`src/pages/projects/[...slug].astro`, `src/pages/blog/[...slug].astro`) use `getStaticPaths` + `getCollection` + `render` — when a new collection or schema field is added, regenerate types with `pnpm astro sync` so `astro:content` typings stay current.

### Layouts

- `src/layouts/BaseLayout.astro` — wraps every page; provides `<Header />` / `<Footer />`, sets canonical URL from `Astro.site`, OG tags, and global styles. New pages should render through this layout.
- `src/layouts/ProjectLayout.astro` — wraps `BaseLayout` and renders project frontmatter (title, status badge, stack pills, repo/demo links) before the MDX `<slot />`. Status labels are mapped from the enum in the layout itself.

### Styling & component conventions

- Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.*` file — design tokens live in `src/styles/global.css` via `@theme inline`, which imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`, and the Geist variable font).
- shadcn/ui is configured in `components.json` (style: `radix-nova`, base color `neutral`, icons via `lucide-react`). Add components with the shadcn CLI; they land in `src/components/ui/`.
- Path alias `@/*` → `src/*` (see `tsconfig.json`). The shadcn aliases (`@/components`, `@/lib/utils`, `@/components/ui`) follow from this — keep them aligned when restructuring.
- `cn()` helper in `src/lib/utils.ts` is the standard `clsx` + `tailwind-merge` combinator used by shadcn components.

### Navigation

Nav links are defined twice — once in `src/components/Header.astro` (desktop) and once in `src/components/MobileNav.tsx` (mobile Sheet). Keep both in sync when adding/removing a top-level route.
