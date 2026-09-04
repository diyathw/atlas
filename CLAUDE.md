# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A Next.js (App Router, TypeScript, Tailwind CSS) implementation of a one-page marketing site for Atlas Maintenance Solutions Inc — a Phoenix, AZ commercial janitorial contractor. The site is configured for **fully static output** (`output: "export"` in `next.config.ts`) so it can be deployed to any static host (S3, Cloudflare Pages, Netlify, GitHub Pages, etc.) — there is no Node server at runtime.

Design source material (not app code):
- `README.md` — the authoritative design/implementation spec: section-by-section layout, copy, interaction behavior, state model, and design tokens (colors, typography, spacing, radius, borders). Treat this as the source of truth for content and visual values — don't invent values that aren't there.
- `Atlas Maintenance Solutions.dc.html` — a visual prototype of the design, authored in a proprietary `<x-dc>` format. **Reference only — never port or copy this markup.**
- `support.js` — generated runtime that makes the `.dc.html` prototype render in a browser. Machine-generated from a `dc-runtime` source not present in this repo. **Never edit.**

## Commands

- `npm run dev` — start the dev server (http://localhost:3000).
- `npm run build` — production build; with `output: "export"` this emits static HTML/CSS/JS to `./out`. There is no `next start` (incompatible with static export) — to preview the exported output locally, serve the `out/` directory with any static file server, e.g. `npx serve out`.
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`).
- No test suite exists yet.

`turbopack.root` is pinned to this directory in `next.config.ts` because a sibling `package-lock.json` one level up (in `Documents/Projects/`) would otherwise make Next.js guess the wrong workspace root.

## Architecture

- App Router under `src/app/`: `layout.tsx` (root layout, fonts, global `<head>`), `page.tsx` (the single marketing page), `globals.css` (Tailwind entry + any global CSS).
- Tailwind CSS v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`) — no `tailwind.config.js`; v4 configures via CSS (`@theme` in `globals.css`) rather than a JS config file.
- Because this is a **static export**, anything that needs a request-time server (dynamic route handlers, server actions that hit a backend, `next/image` optimization) is unavailable — `images.unoptimized: true` is already set in `next.config.ts` for this reason. The lead-capture form on the page must submit to an external endpoint (serverless function, CRM, form service) rather than a Next.js API route.

## Implementing the design

The page is a single scrolling document of nine full-bleed sections (header, hero, stat band, services, quality program, industries, about, contact/form, footer) — see README.md for the exact spec of each. When building or editing sections:

- Match README.md's design tokens exactly (colors, type scale, spacing scale, 3px/5px/6px/100px radius system, hairline borders, no shadows) — these are Tailwind arbitrary values or `@theme` tokens, not approximations.
- Two prototype-only mechanics from the `.dc.html` need real equivalents, both described in README.md:
  - `<sc-if value="{{ showStatBand }}">` → a normal conditional render (`{showStatBand && (...)}`).
  - `style-hover="..."` → a real Tailwind `hover:` class or CSS `:hover`.
- The form, the square-footage slider, and the facility-type pills are visually static in the prototype and need real controlled implementations. README.md's "State Management" section gives the exact state shape to build: `showStatBand`, `sqft` (2,000–150,000 range, default 58,000), `facilityType` (enum), `form` (name/company/email/phone/notes), `errors`, `submitState` (idle/submitting/success/error) — plus the validation rules and submit-state UI under "Interactions & Behavior".
- All photography/logos are placeholder stripes per README's "Assets" section — real imagery is not supplied yet; keep placeholders until real assets are provided.
- The prototype is desktop-only; README.md's "Interactions & Behavior → Responsive" section specifies exactly how each section should collapse for smaller viewports — implement that, since the prototype itself gives no responsive guidance to copy from.
