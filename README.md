# Handoff: Atlas Maintenance Solutions — single-page marketing site

## Overview
A one-page marketing site for **Atlas Maintenance Solutions Inc**, a commercial janitorial / cleaning contractor in Phoenix, AZ serving B2B facilities (offices, clinics, schools, light industrial). The page's job is to establish institutional credibility and drive one conversion: **request a free on-site walkthrough** (a quote request). Anchor nav scrolls between six sections; the final section contains the request form.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. `Atlas Maintenance Solutions.dc.html` is authored in a proprietary design-prototyping format (a custom `<x-dc>` runtime backed by `support.js`); it is **not** a portable component and should not be lifted into a codebase.

The task is to **recreate this design in the target codebase's existing environment** (React/Next, Vue, Astro, Rails views, etc.) using its established patterns, component library, and styling approach. If no environment exists yet, pick the most appropriate framework for a marketing site (a static-first framework such as Next.js or Astro is a good fit) and implement there.

Two mechanics in the prototype are worth translating rather than copying:
- `<sc-if value="{{ showStatBand }}">` is a conditional render — equivalent to `{showStatBand && (…)}`.
- `style-hover="…"` is a hover-state attribute — implement as `:hover` CSS or your framework's equivalent.
- `{{ sqftLabel }}` is an interpolated value: `sqft.toLocaleString() + " sq ft"`.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and copy. Recreate pixel-accurately using the codebase's existing libraries and patterns. Exact values are listed under Design Tokens and per component below.

Caveat: all photography and client logos are **striped placeholders** (see Assets). Real imagery is not yet supplied.

## Screens / Views

Single scrolling page, one column of full-bleed horizontal bands. Every band uses `padding: <vertical> 40px` — 40px is the global horizontal page gutter. There is **no max-width container**; bands span the full viewport and internal grids divide that width. Body background `#fff`, body text color `#12283f`.

---

### 1. Header (sticky)
**Purpose:** persistent nav + phone number + primary CTA.

**Layout:** `display:flex; align-items:center; justify-content:space-between; gap:24px; padding:0 40px; height:74px;` `position:sticky; top:0; z-index:10;` `background:rgba(255,255,255,.96); backdrop-filter:blur(8px);` `border-bottom:1px solid rgba(18,40,63,.1)`.

**Left cluster:** `flex; align-items:center; gap:32px; min-width:0`.
- **Wordmark** (`flex:none`, `flex-direction:column; gap:1px`):
  - `ATLAS` — Archivo Narrow 700, 23px, `letter-spacing:.22em`, `#12283f`, `white-space:nowrap`
  - `MAINTENANCE SOLUTIONS INC` — mono 11px, `letter-spacing:.04em`, `rgba(18,40,63,.5)`, `white-space:nowrap`
- **Nav** (`flex; gap:22px; overflow:hidden`): links 14px/500, `#12283f`, `white-space:nowrap`, `text-decoration:none`. Items and targets: Services → `#services`, Quality program → `#quality`, Industries → `#industries`, About → `#about`, Contact → `#contact`. `overflow:hidden` is deliberate: at narrow widths the nav clips rather than wrapping (the header must never grow past 74px).

**Right cluster:** `flex; align-items:center; gap:18px; flex:none`.
- **Phone block** (`text-align:right; flex:none`): `24/7 DISPATCH` mono 10px `rgba(18,40,63,.5)`; `(602) 555-0148` 15px/600.
- **CTA** `<a href="#contact">` "Request a walkthrough" — `background:#12283f; color:#fff; font-size:13.5px; font-weight:600; padding:12px 20px; border-radius:3px; white-space:nowrap; flex:none`. **Hover:** `background:#2f6f8f`.

All anchor targets carry `scroll-margin-top:80px` to clear the sticky header.

---

### 2. Hero
**Purpose:** state the value proposition and offer two entry points.

**Layout:** `display:grid; grid-template-columns:1fr 1fr; background:#f5f4f1`.

**Left cell:** `padding:82px 48px 82px 40px; flex column; gap:26px; align-self:center`.
- Eyebrow — mono 11px, `letter-spacing:.12em`, `#2f6f8f`: `COMMERCIAL JANITORIAL — PHOENIX, AZ — SINCE 2004`
- H1 — 58px, `line-height:1.02`, `letter-spacing:-.025em`, weight 700, `text-wrap:balance`, `margin:0`: **"Facilities that stay inspection‑ready."** (the hyphen in "inspection-ready" is a non-breaking hyphen, `&#8209;`)
- Body — 17px/1.55, `rgba(18,40,63,.72)`, `max-width:480px`, `text-wrap:pretty`: "Contract cleaning for offices, clinics, schools and light industrial sites across the Valley. Documented scopes, trained W‑2 crews, and a supervisor who signs off on every visit." (non-breaking hyphen in "W‑2")
- Button row — `flex; gap:12px; flex-wrap:wrap; margin-top:2px`:
  - Primary → `#contact`: "Get a scope & price in 48 hrs" — `background:#2f6f8f; color:#fff; 14.5px/600; padding:15px 26px; border-radius:3px`. Hover `background:#12283f`.
  - Secondary → `#quality`: "See our quality program" — `border:1px solid rgba(18,40,63,.25); color:#12283f; 14.5px/600; padding:15px 26px; border-radius:3px`. Hover `background:rgba(18,40,63,.05)`.
- Trust strip — `flex; gap:22px; flex-wrap:wrap; margin-top:10px`, mono 11px `rgba(18,40,63,.55)`: `INSURED & BONDED · $5M` / `OSHA-TRAINED CREWS` / `E-VERIFY` / `GREEN SEAL SUPPLIES`

**Right cell:** image slot, `min-height:560px`. Placeholder caption: "photo — crew burnishing lobby floor, wide".

---

### 3. Stat band (conditional)
**Purpose:** four proof-of-scale numbers. Rendered only when `showStatBand` is true (default true).

**Layout:** `display:grid; grid-template-columns:repeat(4,1fr); background:#12283f; color:#fff`. Each cell `padding:34px 40px`; cells 1–3 have `border-right:1px solid rgba(255,255,255,.12)`.

Per cell: value 38px/700 `letter-spacing:-.02em`; label mono 11px `rgba(255,255,255,.6)` `margin-top:4px`.

| Value | Label |
|---|---|
| 1,140 | SITES SERVICED WEEKLY |
| 340 | W-2 CREW MEMBERS |
| 98.4% | QA INSPECTION PASS RATE |
| 22 min | AVG. EMERGENCY RESPONSE |

---

### 4. Services (`#services`)
**Purpose:** show the full service range as a scannable spec grid.

**Layout:** `padding:76px 40px 80px`.

**Section head:** `flex; align-items:flex-end; justify-content:space-between; gap:40px; margin-bottom:34px`.
- Left: eyebrow mono 11px `letter-spacing:.12em` `#2f6f8f` `margin-bottom:12px`: `01 — SERVICES`; H2 37px/700 `letter-spacing:-.02em` `line-height:1.1` `max-width:16em`: "One contract, every surface in the building."
- Right: link → `#contact`, 14px/600, `flex:none`: "Ask about a custom scope →"

**Grid:** hairline-grid pattern — `display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(18,40,63,.12); border:1px solid rgba(18,40,63,.12)`. The 1px gap over a tinted background *is* the rule lines; cells are `#fff`.

**Card:** `background:#fff; padding:30px 28px 34px; flex column; gap:10px`. Hover `background:#f7f6f3`.
- Code — mono 11px `rgba(18,40,63,.4)`
- Title — 19px/600
- Body — 14.5px/1.5, `rgba(18,40,63,.65)`, `margin:0`

| Code | Title | Body |
|---|---|---|
| S-01 | Nightly janitorial | Task-mapped scopes by room type, logged per visit. Day porters available. |
| S-02 | Floor & carpet care | Strip & refinish, burnishing, hot-water extraction on a published cycle. |
| S-03 | Disinfection | EPA List N protocols for clinics, dental suites and childcare rooms. |
| S-04 | Window & glass | Interior and low-rise exterior, quarterly or on request. Storefront weekly. |
| S-05 | Warehouse & industrial | Ride-on scrubbing, dock and mezzanine detail, high-dusting on lifts. |
| S-06 | Post-construction | Rough, final and touch-up cleans coordinated to your punch schedule. |

---

### 5. Quality program (`#quality`)
**Purpose:** the differentiator — documented inspection reporting. Paired with before/after evidence.

**Layout:** `background:#f5f4f1; padding:76px 40px; display:grid; grid-template-columns:1fr 1.15fr; gap:56px; align-items:center`.

**Left column** (`flex column; gap:20px`):
- Eyebrow: `02 — QUALITY PROGRAM`
- H2 35px/700 `letter-spacing:-.02em` `line-height:1.12`: "You get the inspection report, not just the invoice."
- Body 16px/1.55 `rgba(18,40,63,.7)` `text-wrap:pretty`: "Every site is scored against its own scope sheet on a rotating schedule. Findings, photos and corrections land in your inbox within 24 hours — so building walkthroughs stop being a surprise."
- **Numbered list** — `flex column; border-top:1px solid rgba(18,40,63,.14)`. Each row: `flex; gap:16px; padding:15px 0; border-bottom:1px solid rgba(18,40,63,.14)`; number mono 11px `rgba(18,40,63,.4)` `padding-top:3px`; title 15px/600; sub 13.5px `rgba(18,40,63,.6)`.

| # | Title | Sub |
|---|---|---|
| 01 | Scope sheet per room type | Signed at onboarding, revised with you annually. |
| 02 | Supervisor sign-off nightly | Geo-stamped, with photo evidence on flagged areas. |
| 03 | Monthly scored inspection | Shared as a PDF and tracked as a trend line. |

**Right column:** `grid; grid-template-columns:1fr 1fr; gap:14px` — two image slots at `aspect-ratio:4/5`, captioned "before — restroom" and "after — restroom". The "after" placeholder uses the cool stripe variant (see Assets).

---

### 6. Industries (`#industries`)
**Purpose:** signal contract experience by vertical, plus client logo wall.

**Layout:** `padding:70px 40px 74px`.
- Eyebrow `03 — INDUSTRIES WE HOLD CONTRACTS IN`, `margin-bottom:26px`
- **Pill row** — `flex; flex-wrap:wrap; gap:10px`. Pill: `border:1px solid rgba(18,40,63,.2); border-radius:100px; padding:10px 18px; font-size:14px; font-weight:500`. Items: Class A office · Medical & dental · K–12 & charter schools · Distribution & 3PL · Municipal & civic · Auto dealerships · Multifamily common areas · Places of worship. (Note the en dash in "K–12".)
- **Logo wall** — `margin-top:34px`, same hairline grid as Services but `repeat(5,1fr)`. Cells `background:#fafaf8; height:80px`, centered, mono 10.5px `rgba(18,40,63,.4)`, label "client logo". Five slots.

---

### 7. About (`#about`)
**Purpose:** company credibility, operating commitments, one testimonial.

**Layout:** `background:#f5f4f1; border-top:1px solid rgba(18,40,63,.1); padding:76px 40px; display:grid; grid-template-columns:1fr 1fr; gap:56px`.

**Left column** (`flex column; gap:20px`):
- Eyebrow `04 — ABOUT ATLAS`
- H2 35px/700 `letter-spacing:-.02em` `line-height:1.12`: "Twenty-two years, one market, no franchising."
- Body 16px/1.55 `rgba(18,40,63,.7)`: "Atlas has cleaned Valley buildings since 2004. Every crew member is a W-2 employee we train, background-check and equip ourselves — no subcontracted labor, no rotating faces in your building."
- **2×2 commitments grid** — `grid; grid-template-columns:1fr 1fr; gap:22px; margin-top:6px`; title 15px/600, sub 13.5px `rgba(18,40,63,.6)` `line-height:1.45`:
  - Supervisor per 6 crew — "Not per region. Someone answerable is on site."
  - 30-day out clause — "No auto-renew traps. We keep accounts by performing."
  - Own equipment fleet — "Ride-on scrubbers, extractors, HEPA vacs."
  - Bilingual crews — "Site instructions posted in English and Spanish."

**Right column** (`flex column; gap:14px`):
- **Testimonial card** — `background:#fff; border:1px solid rgba(18,40,63,.12); border-radius:5px; padding:30px 28px`. Quote 19px/1.45, weight 500, `text-wrap:pretty`, curly quotes: "We went from three complaint emails a week to none. The monthly score sheet is the reason I stopped shopping the contract." Attribution row `flex; align-items:center; gap:12px; margin-top:20px`: 38px circular avatar slot (`flex:none`); name 14px/600 "M. Reyes-Whitfield"; role mono 11px `rgba(18,40,63,.55)` "FACILITIES DIRECTOR · 3-BUILDING CAMPUS".
- Image slot, `flex:1; min-height:180px`, caption "photo — team portrait outside the shop".

---

### 8. Contact / CTA (`#contact`)
**Purpose:** the conversion. Left column sells the walkthrough; right column is the form.

**Layout:** `background:#12283f; color:#fff; padding:76px 40px; display:grid; grid-template-columns:1fr 1fr; gap:64px`.

**Left column** (`flex column; gap:18px`):
- Eyebrow mono 11px `letter-spacing:.12em` `rgba(255,255,255,.55)`: `05 — GET A PRICE`
- H2 38px/700 `letter-spacing:-.025em` `line-height:1.08`: "Free on-site walkthrough. You keep the scope sheet either way."
- Body 16px/1.55 `rgba(255,255,255,.7)` `max-width:34em`: "We measure, photograph and price your building, then send a line-item scope you can compare against anyone. Most quotes land within 48 hours of the visit."
- **Checklist** — `flex column; gap:12px; margin-top:12px; font-size:15px`; each row `flex; gap:10px`; check glyph `✓` (`&#10003;`) in `#6fb3d2` weight 700; text `rgba(255,255,255,.85)`:
  - Walkthrough within 3 business days
  - Certificate of insurance sent with the bid
  - Emergency and after-hours response, 24/7
- **Contact block** — `margin-top:20px; padding-top:20px; border-top:1px solid rgba(255,255,255,.16); flex; gap:36px`. Each: label mono 10.5px `rgba(255,255,255,.55)`, value 18px/600 `margin-top:3px`. `CALL` → (602) 555-0148 · `EMAIL` → bids@atlasmaint.com

**Right column — form card:** `background:#fff; border-radius:6px; padding:32px 30px; flex column; gap:18px`.
- Card title 20px/600 `#12283f`: "Request a walkthrough"
- **Field pattern:** wrapper `flex column; gap:6px`; label mono 10.5px `rgba(18,40,63,.55)` uppercase; input `border:1px solid rgba(18,40,63,.2); border-radius:3px; padding:12px 13px; font-size:14px`; placeholder color `rgba(18,40,63,.35)`.
- **Name/company/email/phone** — `grid; grid-template-columns:1fr 1fr; gap:14px`. Labels: YOUR NAME (placeholder "Jordan Ellery"), COMPANY ("Kierland Commons"), EMAIL ("jordan@…"), PHONE ("(480) …").
- **FACILITY TYPE** — `flex column; gap:8px`, then `flex; flex-wrap:wrap; gap:8px` of selectable pills. Unselected: `border:1px solid rgba(18,40,63,.2); border-radius:100px; padding:8px 15px; font-size:13px; font-weight:500; color:rgba(18,40,63,.7)`. Selected: `border:1.5px solid #12283f; background:rgba(47,111,143,.08); font-weight:600; color:#12283f`. Options: Office (selected by default) · Medical · School · Warehouse · Retail · Other. Single-select.
- **CLEANABLE SQUARE FEET** — `flex column; gap:9px`. Header row `flex; justify-content:space-between; align-items:baseline`: label + live value 14.5px/600 (`sqft.toLocaleString() + " sq ft"`). Track: `height:5px; border-radius:100px; background:rgba(18,40,63,.14); position:relative`; fill `#2f6f8f`, `border-radius:100px`, width = percent of range; thumb `17×17` circle, `background:#fff; border:2px solid #12283f`, `top:-6px`, `margin-left:-8px`, positioned at the same percent. Range **2,000 – 150,000**, step 1,000, default **58,000** (shown at 38%).
- **ANYTHING WE SHOULD KNOW?** — textarea, `min-height:66px`, 14px/1.5. Placeholder: "Dock stays open until 9pm; two labs need badge escort…"
- **Submit** — full-width, `background:#12283f; color:#fff; text-align:center; font-size:15px; font-weight:600; padding:15px; border-radius:3px`. Hover `background:#2f6f8f`. Label "Send request".
- **Fine print** — mono 10.5px `rgba(18,40,63,.45)`, centered: `NO OBLIGATION · WE DO NOT SELL YOUR INFORMATION`

---

### 9. Footer
`padding:34px 40px; flex; justify-content:space-between; align-items:center; gap:24px; flex-wrap:wrap; border-top:1px solid rgba(18,40,63,.1)`; all text mono 11px `rgba(18,40,63,.45)`.
- Left: `ATLAS MAINTENANCE SOLUTIONS INC · PHOENIX, AZ · © 2026`
- Right: `flex; gap:20px` — Careers · Safety data sheets · Privacy

## Interactions & Behavior

**Implemented in the prototype:**
- **Anchor navigation.** Header nav and in-page CTAs are `<a href="#id">` jumps to the six section ids. Every target has `scroll-margin-top:80px`. Add `scroll-behavior:smooth` on the root in the real build.
- **Sticky header.** `position:sticky; top:0; z-index:10` with a translucent white background and `backdrop-filter:blur(8px)` so content shows through on scroll. Fixed 74px height at all widths; the nav clips via `overflow:hidden` rather than wrapping.
- **Hover states.** Header CTA and form submit: `#12283f → #2f6f8f`. Hero primary: `#2f6f8f → #12283f`. Hero secondary: transparent → `rgba(18,40,63,.05)`. Service cards: `#fff → #f7f6f3`. All are instant in the prototype; a `120ms ease` transition on `background-color` is a reasonable production addition.
- **Live slider label.** The square-footage readout re-renders from the slider value.

**Not implemented — needs building:**
- **Form is static.** Inputs are styled divs with placeholder-styled text. Wire real `<input>`/`<textarea>`/`<button>` elements, controlled state, and submit handling.
- **Slider is static.** Implement as a real range input (or custom drag) driving the label. The thumb and fill positions must both track the value.
- **Facility-type pills** need single-select click behavior.
- **Validation:** name, email, and one of email/phone required; email format-checked; facility type required; square footage always has a value (defaults to 58,000). Show inline errors under the field, in the amber accent `#a35a12`.
- **Submit states:** disabled + "Sending…" while in flight; on success replace the card body with a confirmation ("Request received — we'll call within one business day to schedule."); on failure show a retry message plus the phone number as fallback.
- **Responsive:** the prototype is desktop-only, with hard `1fr 1fr` and `repeat(3,1fr)` / `repeat(5,1fr)` grids. For production: collapse all two-column bands to one column and the service grid to 2-up then 1-up; stack the stat band 2×2; reduce the page gutter from 40px to ~20px; drop H1 from 58px to ~38px and section H2s from 35–38px to ~28px; replace the clipped nav with a hamburger; keep the phone number visible at every width (it is a primary conversion path for this business).
- **Accessibility:** heading order is already correct (one H1, H2 per section). Needed: focus-visible rings on nav links and buttons, real labels bound to inputs, `aria-label` on the range input, and `alt` text on real photography. Check the mono label color `rgba(18,40,63,.5)` on `#f5f4f1` — it is borderline for small text; darken to `rgba(18,40,63,.62)` if it fails 4.5:1 at 11px.

## State Management
The prototype has almost no state; a production build needs:

| State | Type | Default | Notes |
|---|---|---|---|
| `showStatBand` | boolean | `true` | Content flag — whether the navy stat band renders. Likely CMS-controlled, not user-facing. |
| `sqft` | number | `58000` | Range 2,000–150,000, step 1,000. Drives the slider fill/thumb percent and the label. |
| `facilityType` | enum | `"Office"` | One of Office / Medical / School / Warehouse / Retail / Other. |
| `form` | object | empty | name, company, email, phone, notes. |
| `errors` | object | empty | Per-field validation messages. |
| `submitState` | enum | `"idle"` | idle / submitting / success / error. |

**Data fetching:** none for page render — all content is static and can be hardcoded or pulled from a CMS. One POST on form submit to whatever handles inbound leads (CRM, email, or a serverless function). Copy for stats, services, industries, and the testimonial is worth modeling as content rather than markup, since a facilities-services client will revise those numbers.

## Design Tokens

**Colors**
| Token | Value | Use |
|---|---|---|
| Navy (ink / primary) | `#12283f` | Body text, headings, dark bands, primary buttons |
| Steel (accent) | `#2f6f8f` | Eyebrows, links, hero primary button, slider fill, hover |
| Light steel | `#6fb3d2` | Check glyphs on navy |
| Bone | `#f5f4f1` | Alternate band background (hero, quality, about) |
| Off-white | `#fafaf8` | Logo-wall cells |
| Card hover | `#f7f6f3` | Service card hover |
| White | `#ffffff` | Page + card background |
| Amber (warning) | `#a35a12` | Validation / exception text |
| Placeholder stripes (warm) | `#e6e3dc` / `#dcd8d0` | Photo slots |
| Placeholder stripes (cool) | `#dfe6ea` / `#d3dde3` | "After" photo slot |

Alpha ramp over navy — this is the whole neutral system, used instead of a gray scale:
`rgba(18,40,63,.72)` body copy · `.7` secondary copy · `.65` card copy · `.6` sub-labels · `.55` mono labels · `.5` header mono · `.45` footer · `.4` codes/placeholder captions · `.35` input placeholders · `.25` secondary button border · `.2` input & pill border · `.14` slider track / list rules · `.12` card borders / hairline grid · `.1` band dividers · `.05` secondary button hover.
On navy: `rgba(255,255,255,.85)` / `.7` / `.6` / `.55` text; `.16` / `.12` rules.

**Typography**
- Families: **Archivo** (400/500/600/700) for everything; **Archivo Narrow** (700) for the `ATLAS` wordmark only; system mono stack `ui-monospace, Menlo, monospace` for all labels, codes, and fine print. Google Fonts: `Archivo:wght@400;500;600;700` + `Archivo+Narrow:wght@500;600;700`. `-webkit-font-smoothing:antialiased` on body.
- Scale: H1 58px/1.02/-.025em · Contact H2 38px/1.08/-.025em · Services H2 37px/1.1/-.02em · Section H2 35px/1.12/-.02em · Stat value 38px/-.02em · Card title 20px · Quote 19px/1.45 · Service title 19px · Contact value 18px · Wordmark 23px/.22em · Body-lg 17px/1.55 · Body 16px/1.55 · Card body 14.5px/1.5 · Button 14.5px · Nav 14px · Sub 13.5px · Pill (form) 13px · Mono label 11px/.12em · Mono small 10.5px · Mono xs 10px.
- Uppercase is applied by authoring the copy in caps, not via `text-transform`.
- `text-wrap:balance` on the H1; `text-wrap:pretty` on long paragraphs.

**Spacing** — 4px-ish scale, in practice: 1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 26, 30, 32, 34, 36, 40, 48, 56, 64, 74, 76, 80, 82. Page gutter 40px. Band vertical padding 70–82px. Card padding 30px 28px. Column gap 56px (content bands) / 64px (contact).

**Radius** — `3px` buttons and inputs · `5px` cards · `6px` form card · `100px` pills, avatars, slider track/thumb. Nothing else is rounded; the sharp 3px on buttons is deliberate for the institutional tone.

**Borders** — `1px solid rgba(18,40,63,.1)` band dividers · `.12` card borders and hairline grids · `.2` inputs and pills · `.25` secondary button. Selected pill steps up to `1.5px solid #12283f`. `2px solid #12283f` slider thumb.

**Shadows** — none. Depth comes entirely from the bone/navy band alternation and hairline rules. Do not add shadows.

**Effects** — `backdrop-filter:blur(8px)` on the sticky header only.

## Assets
Nothing in this bundle is a real asset. Every image area is a **CSS striped placeholder** that must be replaced with client-supplied photography:

- Warm variant: `repeating-linear-gradient(135deg,#e6e3dc 0 9px,#dcd8d0 9px 18px)`
- Cool variant (the "after" slot): `repeating-linear-gradient(135deg,#dfe6ea 0 9px,#d3dde3 9px 18px)`
- Avatar variants use the same gradients at 6px/12px stops.
- Each slot carries a caption chip — mono 10.5–11px, `rgba(18,40,63,.55)` on `rgba(255,255,255,.75)`, `padding:5px 8px`, bottom-left — describing the intended shot.

Slots to fill: hero (wide, crew burnishing a lobby floor) · quality before/after restroom pair (4:5) · about team portrait · testimonial avatar · **five client logos** in the industries logo wall.

Icons: **none used** — no icon library is needed. The only glyphs are `✓` (`&#10003;`) and `→` (`&rarr;`) as text characters.

Fonts: Archivo and Archivo Narrow from Google Fonts. Self-host in production.

Legal placeholders to replace with real values: phone `(602) 555-0148`, email `bids@atlasmaint.com`, insurance figure `$5M`, all four stat-band numbers, the testimonial and its attribution, and the "since 2004" / "twenty-two years" claims.

## Files
- `Atlas Maintenance Solutions.dc.html` — the design prototype. Open it in a browser to view the design as intended. The template markup (layout, inline styles, copy) is the authoritative reference; read it alongside this README.
- `support.js` — runtime required only for the prototype to render locally. **Do not port.**
