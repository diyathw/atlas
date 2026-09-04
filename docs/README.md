# Atlas Maintenance Solutions — developer guide

Practical guide to running, testing, and deploying this project. For the
original design spec (copy, layout, tokens) see [`/README.md`](../README.md)
and [`/CLAUDE.md`](../CLAUDE.md). For how the pieces fit together, see
[`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build → static export in `./out` (no `next start`; this is a static site) |
| `npm run lint` | ESLint |
| `npm test` | Jest + React Testing Library, all component tests |
| `npm run test:watch` | Jest in watch mode |

To preview a production build locally: `npm run build && npx serve out`.

## Environment variables

Both are optional. Neither is required for local dev or a default build.

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_LEAD_FORM_ENDPOINT` | Where the contact form POSTs lead data. Unset = form fakes a delay and shows success, but **sends nothing anywhere**. Set to a Formspree/Getform/serverless-function URL to actually receive leads. | `https://formspree.io/f/xxxxxxxx` |
| `NEXT_PUBLIC_BASE_PATH` | Path prefix for a GitHub Pages *project* deploy (served at `/<repo-name>/`, not root). Leave unset for a custom-domain or root-path deploy. | `/atlas` |

Set them in `.env.local` for local builds (gitignored), or as the build
environment's variables in CI / your host's dashboard. `NEXT_PUBLIC_*` vars
are baked into the client bundle at build time — there is no server to read
them at runtime, since this is a static export.

## Testing

Jest is configured via `next/jest` (`jest.config.ts`) with `jest-environment-jsdom`.
Component tests live next to the components they test (e.g.
`src/components/ContactForm.test.tsx`). `jest.setup.ts` polyfills
`window.matchMedia`, which jsdom doesn't provide and several components rely
on for `prefers-reduced-motion` checks.

## Deployment

This is `output: "export"` — a fully static site, deployable anywhere that
serves static files. Two live examples from this project:

- **`.github/workflows/deploy.yml`** — builds and deploys to GitHub Pages
  automatically on every push to `main`, via the official
  `actions/deploy-pages` action. If deploying to a Pages *project* URL
  (`username.github.io/repo-name/`), the workflow sets
  `NEXT_PUBLIC_BASE_PATH` to match — **make sure the repo's Settings → Pages →
  Source is set to "GitHub Actions"**, not "Deploy from a branch" (the latter
  is GitHub's legacy Jekyll-based default and will serve the raw repo instead
  of this build).
- A second, independent deploy can be pushed manually by building the
  `out/` folder with the right `NEXT_PUBLIC_BASE_PATH` and pushing it as its
  own repo/branch — useful for a demo URL separate from the main deploy.

### Why a `mediaPath()` helper exists

`next/image` and raw `<video>`/`<img>` tags reference files in `public/` by a
literal string path (e.g. `/atlas-media/photo.webp`). Next.js does **not**
auto-prefix these with `basePath` the way it does its own internal `_next/*`
assets — so on a base-pathed deploy they 404. `src/lib/media.ts` exports
`mediaPath(path)`, which prefixes `NEXT_PUBLIC_BASE_PATH`, and every media
reference in the codebase goes through it. If you add a new image or video
reference, use `mediaPath()` for it too.
