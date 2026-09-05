# Architecture

How this codebase is put together, beyond what [`/CLAUDE.md`](../CLAUDE.md)
already covers.

## Design system

Tokens live in `src/app/globals.css` (`@theme` block) and `src/app/layout.tsx`
(fonts). Current palette: near-black **ink** (`#14170F`), dark **olive**
(`#454F30`), light **cream** (`#F6F4EC`), and a bright **accent** yellow-lime
(`#E3E14A`) for CTAs and highlights. Two fonts: **Inter** for everything, and
**Playfair Display** italic (`font-serif italic`) applied selectively — one
short phrase per major heading, not whole headings — for editorial accent.

Shared UI primitives, used everywhere instead of repeating className strings:

- **`src/components/ui/Button.tsx`** — pill button. `variant="primary"`
  (yellow fill) or `"secondary"` (outline). Renders an `<a>` if given `href`,
  otherwise a `<button>` (pass `type="submit"` for forms).
- **`src/components/ui/Eyebrow.tsx`** — small mono uppercase label above
  headings. `tone` prop picks the color for the section's background:
  `"olive"` (default, light bg), `"light"` (white/dark bg), `"accent"`,
  `"ink"`.

## Scroll-driven components

Each of these ties an element's state to `window.scrollY` via a
`requestAnimationFrame`-throttled scroll listener (no scroll library) and
respects `prefers-reduced-motion` by skipping the animated path entirely.

| Component | Effect |
|---|---|
| `Hero.tsx` | Background video's `currentTime` scrubs in sync with scroll position through the hero section (not autoplay-and-loop); a parallax transform layers on top |
| `QualityWipe.tsx` | Pins (`position: sticky`) inside a tall wrapper; a before/after photo pair wipes left-to-right as you scroll through it |
| `IndustriesPan.tsx` | Pins and translates a row of photos/video horizontally as you scroll vertically through it |
| `CountUp.tsx` | Animates a number from 0 to its target on scroll-into-view (`IntersectionObserver`), used in `StatBand.tsx` |
| `Reveal.tsx` | Generic fade/slide-up on scroll-into-view, used for lighter-weight section reveals |

`InViewVideo.tsx` is a smaller helper: plays/pauses a muted looping video
based on `IntersectionObserver` visibility, used for the non-hero video clips.

**Rewind on scroll-up, by design, split two ways:**
`Hero`, `QualityWipe`, `IndustriesPan`, and `CountUp` all reverse naturally
when you scroll back up — their state is a direct function of scroll
position (or, for `CountUp`, explicitly resets to 0 on `!entry.isIntersecting`
and re-plays on re-entry). `Reveal` is the deliberate exception: it
disconnects its observer after the first trigger and stays revealed. That's
intentional, not an inconsistency — re-triggering a fade-up every time an
element re-enters the viewport reads as flickery on repeated scroll-up/down,
while a rewinding stat counter or scrub effect reads as responsive. If you
add a new scroll-tied component, decide up front which category it belongs
to rather than defaulting to one-shot.

## Media

Photos and video live in `public/atlas-media/`; `SOURCES.md` there is the
source of truth for what's real Atlas media vs. stock and must be kept
current — most of it is real (Google Business Profile photos and the two
Industries gallery videos), but the Hero background video is stock footage
(a Pexels clip), documented as such in both `SOURCES.md` and its on-page
caption. Every reference to a file in this folder goes through `mediaPath()`
from `src/lib/media.ts` — see
[`README.md` → "Why a mediaPath() helper exists"](./README.md) for why
that's necessary.

When swapping in new source video, don't ship it unprocessed: check
resolution/bitrate first (`docker run --rm -v <dir>:/media
linuxserver/ffmpeg -i /media/file.mp4` if ffmpeg isn't installed locally),
and re-encode oversized footage down to what the display size actually needs
— a 4K stock export can be 10-40MB, while the same clip scaled to 1080p or
720p at a reasonable CRF is typically under 8MB with no visible quality loss
at the sizes these videos render at on the page.

## Lead form

`ContactForm.tsx` is a fully controlled form (name/company/email/phone/notes,
facility-type pills, a square-footage slider) with client-side validation. It
does **not** send email — it POSTs JSON to `NEXT_PUBLIC_LEAD_FORM_ENDPOINT` if
set, or fakes a delay and shows success if not. See `docs/README.md` for how
to wire up a real endpoint.

## Testing

Jest + React Testing Library. Tests are colocated with the components they
cover (`Component.test.tsx` next to `Component.tsx`). Coverage focuses on
behavior a refactor could silently break: form validation rules, the mobile
nav's open/close state, and the shared `Button`/`Eyebrow` primitives' variant
classes.

## SEO

`layout.tsx` sets OpenGraph/Twitter metadata and a `LocalBusiness` JSON-LD
block using only real data already in the copy (no invented ratings/review
counts). `src/app/robots.ts` and `src/app/sitemap.ts` are Next.js's
file-convention routes — they still work under `output: "export"` as long as
they export `const dynamic = "force-static"`.
