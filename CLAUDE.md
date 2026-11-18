# CLAUDE.md — Fastship.Africa redesign concept

An unofficial redesign concept of fastship.africa, built by Muizz Jamiu to pitch himself to
Fastship's CEO for a frontend role. It is not Fastship's site and must never look like it is
pretending to be. The pitch rests on two things: a clearer page, and measurably better performance
than the live site. Both have to hold up when someone checks.

**This is a demo. It never collects, stores or sends user data. No analytics, no cookies, no
tracking scripts, no form submissions.** Every note on a turned-off form says so in plain words.

Read this file before making any change. Structure rules come from `docs/frontendStructureGuide.md`
(the frontend structure guide). The approved screens are in `docs/design/` (see its README). Where
this file and the guide disagree, this file wins, and the reason is under "Departures from the guide".

This is Next.js 16. Read `AGENTS.md` and the relevant guides in `node_modules/next/dist/docs/`
before writing code. Don't rely on older Next.js patterns.

---

## How to work with me

- Build each part yourself, run the checks, then stop and summarise what you built and why, so I
  can review and test before the next part.
- One branch per part, created from an up-to-date `main`, named after the part (see "Build plan").
  When a part is done, tell me the branch name.
- While building a part, commit as you go:
  - Commit each time a logical piece is finished, and never let more than 10 changed files build
    up without committing.
  - Each commit must pass `npx tsc --noEmit` and `npm run lint`.
  - Write clear commit messages that describe the change, not "WIP".
  - After each commit, push the branch to GitHub (`git push -u origin <branch>`), then keep
    working on the same branch.
  - Never merge into `main` until I reply "approved". After "approved", merge into `main`, push,
    and start the next part on a new branch. If I reply with changes, make them and stop again.
- Give the full path of every file you mention.
- Spell out every abbreviation the first time, e.g. LCP (Largest Contentful Paint).
- If something I ask for is a bad idea, push back and say why.

Checks after every part: `npx tsc --noEmit`, `npm run lint`, and `npm run dev` with the changed
pages opened. Fix anything that fails before stopping.

---

## Stack

- Next.js 16 with the App Router and a `src/` folder, TypeScript in strict mode
- Tailwind CSS v4, configured in `src/app/globals.css` (no `tailwind.config` file)
- `next/font/google` for Anton and Inter, `next/image` for every image
- `clsx` + `tailwind-merge` behind a `cn()` helper
- No animation library: everything is CSS plus one small IntersectionObserver hook

Do not add a library without asking first. There is no backend, no auth and no data fetching.
Every form is a disabled demo (see "Forms and buttons").

`experimental.agentFeedback` in `next.config.ts` stays `false`, and `AGENTS.md` has no feedback
block. Never run the agent feedback command or send anything to Vercel.

---

## Pages

| Route      | File                         | Design files                                  |
| ---------- | ---------------------------- | --------------------------------------------- |
| `/`        | `src/app/page.tsx`           | `Main.dc.html`, `MobileLanding.dc.html`       |
| `/sign-in` | `src/app/sign-in/page.tsx`   | `SignIn.dc.html`, `MobileSignIn.dc.html`      |
| `/sign-up` | `src/app/sign-up/page.tsx`   | `SignUp.dc.html`, `MobileSignUp.dc.html`      |

One responsive page per route. Mobile designs are 390px wide; desktop 1440px.

### Landing page sections, in order

| Section                     | Anchor      | Notes                                                                 |
| --------------------------- | ----------- | --------------------------------------------------------------------- |
| Concept banner              | —           | "Unofficial redesign concept by Muizz Jamiu · Not affiliated with Fastship.Africa". Always visible at the top. |
| Header (floating glass nav) | —           | Sticky. See "Header".                                                 |
| Hero                        | `#top`      | Two-line headline, intro, two CTAs, three checks, layered hero visual (see "Hero visual") |
| Carrier bands               | —           | Two tilted marquee bands                                              |
| Track a shipment            | `#track`    | Disabled input, live button with notice                               |
| About / problem             | `#about`    | Heading + courier photo (desktop only), three numbered cards, closing line |
| How it works                | `#how`      | Four steps. Desktop: row with a horizontal wavy line. Mobile: centred column with vertical wavy connectors |
| Features                    | —           | Dark section. Desktop: photo bento. Mobile: compact list rows. Then the 24/7 support banner: one dark card, photo in the right two-thirds fading into it (on top, fading down, on phones), outlined "24/7" behind, "Talk to support" plus glass WhatsApp/Email/Call buttons, an aria-hidden looping support chat over the photo |
| Not a business?             | `#more`     | Four cards: air cargo, send food home, vehicle import, customs help   |
| Testimonials                | —           | Fastship's own customer quotes                                        |
| FAQ                         | `#faq`      | Accordion, six real questions and answers                             |
| Contact                     | `#contact`  | Dark details panel + disabled form                                    |
| Closing CTA                 | —           | "Run your logistics from one place."                                  |
| Footer                      | —           | Light logo, link columns, large "FASTSHIP" wordmark                   |

Nav links scroll to these anchors: Home `#top`, About Us `#about`, Shipping `#how`,
Vehicle Import `#more`, Tracking `#track`, Guides `#faq`, Contact `#contact`. Log in goes to
`/sign-in`, Sign up and every "Get a shipping quote" go to `/sign-up`. Anchored sections need
`scroll-margin-top` so the sticky header doesn't cover their heading.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx                 # Fonts, metadata, concept banner
│   ├── globals.css                # Tailwind import, tokens, keyframes
│   ├── page.tsx                   # Landing
│   ├── sign-in/page.tsx
│   ├── sign-up/page.tsx
│   ├── robots.ts                  # Disallow all: this is a concept
│   ├── opengraph-image.png        # 1200×630 preview, added in the metadata part
│   └── not-found.tsx
│
├── assets/images/                 # Imported, so next/image knows sizes
│   ├── brand/                     # fastship-logo.png, fastship-logo-light.png
│   ├── features/                  # five feature photos
│   ├── photos/                    # courier-with-van, support-agent
│   └── food/                      # six food photos
│
├── components/
│   ├── ui/                        # Generic. Knows nothing about shipping.
│   │   ├── button/button.tsx
│   │   ├── badge/badge.tsx
│   │   ├── field/                 # input.tsx, select.tsx, textarea.tsx, fieldLabel.tsx
│   │   ├── notice/demoNotice.tsx  # The "this is a concept" message
│   │   ├── reveal/reveal.tsx      # Scroll reveal wrapper (client)
│   │   ├── pointerEffects/        # Page-wide pointer position for hover effects (client)
│   │   ├── marquee/marquee.tsx
│   │   ├── accordion/accordion.tsx
│   │   ├── icons/icons.tsx
│   │   └── typography/text.tsx
│   │
│   ├── layouts/
│   │   ├── conceptBanner.tsx
│   │   ├── siteHeader.tsx         # Desktop glass nav
│   │   ├── mobileMenu.tsx         # Client: menu, backdrop, scroll lock
│   │   ├── navScrollState.tsx     # Client: flat at the top / glass bar once scrolled
│   │   ├── siteFooter.tsx
│   │   └── authLayout.tsx         # Form left, pinned brand panel right
│   │
│   └── content/
│       ├── landing/               # One file per section, plus illustrations/ and heroVisual/
│       └── auth/                  # signInForm.tsx, signUpForm.tsx, panels
│
├── data/                          # All copy, typed
│   ├── navigation.ts
│   ├── hero.ts
│   ├── features.ts
│   ├── services.ts                # The four "Not a business?" cards
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── contact.ts
│
├── models/                        # Types for the data files
│
└── utilities/
    ├── helpers/cn.ts
    └── hooks/useInView.ts         # IntersectionObserver, fires once
```

Rules:

- Route files only render content components and export `metadata`.
- `ui/` never imports from `content/` or `data/`. Pass things in as props.
- Copy lives in `src/data/`, never hard-coded in components.
- Server Components by default. `"use client"` only for: the mobile menu, the FAQ accordion, the
  reveal wrapper, the track/contact/auth notice buttons, the password show/hide toggle, the nav
  scroll marker (`layouts/navScrollState.tsx`), the page-wide pointer listener
  (`ui/pointerEffects/pointerEffects.tsx`) and the hero visual's loop driver
  (`landing/heroVisual/heroVisualMotion.tsx`). Keep client components small and at the leaves:
  the last three only set CSS variables or a data attribute and render nothing heavy.
- Images are static imports from `src/assets/images/`, so `next/image` gets width and height at
  build time. Give every `next/image` a correct `sizes`.

---

## Naming

From the guide: files camelCase (`siteHeader.tsx`), components PascalCase (`SiteHeader`), folders
lowercase, camelCase when multi-word. Booleans `is`/`has`/`can`. Handlers `handleX` when defined,
`onX` as props. Next.js reserved files (`page.tsx`, `layout.tsx`, `robots.ts`) keep their names.

---

## Design system

One light theme with dark sections. No dark mode toggle.

### Colour tokens

Never use raw Tailwind colours or hex values in components. Use these role tokens.

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --bg: #F4F1EC;               /* page background, cream */
  --surface: #FFFFFF;          /* cards on cream */
  --surface-muted: #E9E4DC;    /* the customs help card */
  --ink: #141210;              /* main text and dark sections */
  --ink-raised: #1F1C19;       /* cards and rows on dark sections */
  --ink-line: #2C2824;         /* dividers and chips on dark */
  --text-body: #4E4943;        /* paragraphs on cream */
  --text-muted: #5B5650;       /* small print on cream */
  --text-on-dark: #F4F1EC;
  --text-on-dark-muted: #C9C1B8;
  --text-on-dark-subtle: #B5ADA4;  /* labels on dark, 13px and up only */
  --border: #E2DDD6;
  --border-strong: #D6D0C7;    /* inputs */
  --accent: #F0501E;           /* Fastship orange: fills, buttons, highlights */
  --accent-text: #B33A0C;      /* orange text on cream (passes contrast) */
  --accent-on-dark: #FF8A5C;   /* orange text on dark */
  --accent-subtle: #FCE1D5;    /* soft orange chips */
  --field-disabled: #EEEAE4;
  --field-disabled-text: #6B655E;
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-ink: var(--ink);
  --color-ink-raised: var(--ink-raised);
  --color-ink-line: var(--ink-line);
  --color-text-body: var(--text-body);
  --color-text-muted: var(--text-muted);
  --color-text-on-dark: var(--text-on-dark);
  --color-text-on-dark-muted: var(--text-on-dark-muted);
  --color-text-on-dark-subtle: var(--text-on-dark-subtle);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-accent: var(--accent);
  --color-accent-text: var(--accent-text);
  --color-accent-on-dark: var(--accent-on-dark);
  --color-accent-subtle: var(--accent-subtle);
  --color-field-disabled: var(--field-disabled);
  --color-field-disabled-text: var(--field-disabled-text);
  --font-display: var(--font-anton);
  --font-sans: var(--font-inter);
}
```

Text on an `--accent` fill is always `--ink`, never white: white on that orange fails contrast.

### Typography

- **Display:** Anton 400, uppercase, tight line height (0.95–1). Headings and big numbers only.
- **Body:** Inter 400, 500, 600 and 700.
- Both through `next/font/google`, exposed as `--font-anton` and `--font-inter`.

The site runs about a third smaller than the design files, which read too large on a laptop at 100%
zoom. **The sizes in `docs/design/` are the old scale**: take layout and proportions from them, and
sizes from the tokens below. Every size is a `--text-*` token in `src/app/globals.css`, in `rem`, used
through the `Text` component or as `text-<token>`. Never scale the root font size: it breaks people
who set larger text in their browser.

| Token                      | Size (phone–desktop) | Used for                                       |
| -------------------------- | -------------------- | ---------------------------------------------- |
| `display-hero`             | 40–72px              | Hero headline (two lines at 1440px)            |
| `display-auth`             | 40–56px              | Auth panel headlines                           |
| `display-closing`          | 36–52px              | Closing CTA                                    |
| `display-section`          | 32–44px              | Section headings                               |
| `display-contact`          | 30–38px              | Contact heading                                |
| `display-stat`             | 48–66px              | "24/7"                                         |
| `display-statement`        | 20–26px              | The about statement                            |
| `display-sm` / `display-number` / `display-step` | 26 / 34 / 24px | Track heading, card numbers, step circles |
| `card-title-lg` / `card-title` | 21 / 19px        | Anton card titles                              |
| `form-title`, `title-lg`, `title`, `title-sm` | 24, 20, 18, 17px | Inter headings                |
| `lead-lg`                  | 16px                 | Hero intro                                     |
| `lead`                     | 16px                 | Other intros, FAQ questions                    |
| `body`                     | 15px                 | Body text. Never smaller                       |
| `small`                    | 14px                 | Nav links, buttons, notices, secondary lines   |
| `label`                    | 13px                 | Labels, badges, small print. Never smaller     |
| `mock`                     | 11px                 | Only the hero visual's aria-hidden interface text. Never real content |
| `display-outline`          | 128–240px            | The outlined "24/7" behind the support banner. Decorative |

`cn()` registers these names with tailwind-merge. Add any new token there too, or a colour class
will silently delete the size.

### Shape and spacing

- Pills (`rounded-full`) for buttons, chips and the nav bar.
- Radius tokens: `rounded-card-lg` 22px (large cards, panels), `rounded-card` 18px,
  `rounded-card-sm` 14px (rows, FAQ items), `rounded-field` 12px (inputs, inner boxes).
- Buttons are 44px tall (`xl`, the full-width form submit, is 48px), with 14px text and 16–20px
  side padding.
- Touch targets at least 44px tall.
- Section padding uses `section-xs/sm/md/lg/xl` (32, 48, 64, 80, 88px). The gap from a heading
  block to its content is `block` (44px). Card padding is `card` (24px). Card grids use 12–20px gaps.
- Nav bar: 56px tall, logo 32px tall on desktop and 28px on phones. The desktop nav appears from
  1024px (`nav:` breakpoint).
- Page content max width 1280px, 32px side padding on desktop, 20px on mobile.

---

## Header

- **At the top of the page** (the first 20px): flat and full width, with no background, border or
  shadow. Logo on the left, seven links centred, outlined "Log in" and solid dark "Sign up" with an
  arrow on the right, all on the page's content edges. The active link is darker and bolder, with
  no coloured pill.
- **Once scrolled:** a frosted-glass bar fades in behind the same content, pulled in from the edges
  and sitting 8px below the top: semi-transparent white, backdrop blur, hairline border, soft
  shadow, fully rounded. Scrolling back to the top flattens it again. The glass is its own layer
  (`.site-header-bar::before`), so nothing inside moves and nothing shifts. 450ms ease-out;
  instant under reduced motion.
- `NavScrollState` watches a 20px marker at the top of the page with an IntersectionObserver (never
  a scroll listener) and sets `data-nav="top"` or `"scrolled"` on `<html>`. The header is sticky only
  once that attribute exists, so without JavaScript it is a plain flat bar that scrolls away.
- **Mobile:** the same idea, with the logo and a round dark menu button.
- **Mobile menu:** a dark panel dropping below the bar with all links, then Log in and Sign up.
  While it's open, the page behind is darkened and blurred, and page scrolling is locked. Tapping
  the backdrop, a link, or the close button closes it. Escape closes it too. Focus moves into the
  menu when it opens and back to the button when it closes.

---

## Auth pages

- **Desktop:** the form on the left, the brand panel on the right. The panel fills the full page
  height, and its content is pinned with an inner `position: sticky; top: 0; height: 100vh`
  wrapper, so it stays visible while the form scrolls. Do not put `sticky` on the panel itself:
  the panel must stretch to the page height, or a blank strip appears at the bottom.
- **Mobile:** the panel becomes a short block on top (logo, headline, line of copy), then the form.
  The sign-in panel's tracking card and the sign-up carrier pills are desktop only.

---

## Forms and buttons

This concept has no backend, and it must not pretend to.

- Every input, select and textarea is `disabled`, styled with the field-disabled tokens, and
  linked with `aria-describedby` to a visible note saying the form is turned off in this concept
  and that nothing is collected, stored or sent.
- Every submit-style button stays enabled. Clicking it shows a short message in a
  `role="status"` region explaining it isn't connected, with a link to the real place:
  sign in, sign up and password reset → fastship.africa, tracking → fastship.africa/tracking,
  contact → support@fastshipafrica.com.
- "Forgot password?" is a button styled as a link, not a link. It shows the same kind of message,
  saying password reset isn't connected. On the auth pages, the link inside that message is the
  only way out to fastship.africa, with one exception: legal references (the sign-up line about the
  terms of service and privacy policy) link to Fastship's real legal pages.
- The password show/hide toggle is disabled along with its input.
- Sign-up shows only the static password hint ("Use 8 or more characters with a mix of letters,
  numbers and symbols"). No strength meter bars: the input is disabled, so they could never change.

---

## Animation

Lively but professional. Every animation must have a reason, and all of them stop under
`prefers-reduced-motion`.

| Where                    | What                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| Hero headline            | Each line rises from below its own clipping box, staggered           |
| Hero intro and visual    | Fade up, staggered after the headline                                |
| Hero visual              | See "Hero visual" below                                              |
| "Demo available" pill    | Pulsing dot                                                          |
| Carrier bands            | Two tilted marquees moving in opposite directions                    |
| Scroll reveal            | Sections and cards fade in and rise 32px once, the first time they come into view (about 0.8s). Siblings stagger by about 90ms. They never fade out again when scrolling up |
| How it works             | The connecting line draws itself in                                  |
| Service, testimonial cards | On hover: a spotlight follows the pointer, the card tilts up to 3° towards it and lifts 8px with a soft shadow. Services: illustration zooms, arrow turns 45°, food photos zoom one after another, frosted details panel slides up. Testimonials: card straightens to 0°, quote mark scales and twists, avatar gets an orange ring |
| "Not a business?" cards  | Desktop: the section pins (180vh) and the cards spread from a fanned stack (-6°, -2°, 2°, 6°, Air cargo on top) into their row between 15% and 75% of the scroll, then hold. Scroll-driven CSS, translate and rotate only |
| Feature photos           | Zoom to about 104% on hover                                          |
| Contact rows             | Highlight slides in from the left, icon square fills orange and tilts, arrow slides right |
| Buttons and links        | Small lift on hover                                                  |
| FAQ                      | Answer fades in; plus icon rotates to a cross                        |
| Support banner           | Pulsing eyebrow dot; the chat loops: question, typing dots, reply (reply only, static, on phones) |
| Header                   | Glass bar fades in behind the nav once scrolled                      |
| Mobile menu              | Panel fades up; backdrop fades in                                    |

Hover effects only run on devices that can really hover (`(hover: hover) and (pointer: fine)`),
ease out over 250–400ms with nothing bouncy (`--ease-hover`), and are all off under reduced motion.
`PointerEffects` gives any `[data-pointer]` element `--pointer-x/y` (percent) and `--pointer-dx/dy`
(-1 to 1); the effects themselves are CSS in `globals.css` (`.pointer-card`).

### Hero visual

A layered composition built in code (`src/components/content/landing/heroVisual/`), no images except
the real logo file cropped to its mark. Copy is in `src/data/hero.ts`. No prices, counts or stats.

- Back: a dark dashboard window (sidebar with the mark and four icons, "Shipments" with a search
  field, filter tabs, a route strip with an orange plane flying one route, three shipment rows whose
  status pills and progress bars step Booked → Picked up → In transit → Delivered, one row at a time).
- Front left (desktop only): a phone tracking LOS → LHR; its timeline fills step by step with a
  pulsing dot on the current step.
- Front right: a frosted "Compare carriers" card, the five carriers with shimmering placeholder bars
  (no service tiers), a highlight moving carrier to carrier and a "Book with …" button that follows.
- Two frosted chips with real benefits ("Doorstep pickup", "Full insurance"), desktop only.
- Each layer floats on its own loop; on desktop with a pointer the layers drift towards it by
  different amounts and the dashboard tilts a little.
- `HeroVisualMotion` drives the loops by setting CSS variables (no re-renders) and pauses off
  screen. Server-rendered resting state = reduced-motion state: one row in transit, one delivered,
  timeline at "Arrived London", DHL highlighted.
- One `figcaption` describes it for screen readers; everything drawn is `aria-hidden`.
- Phones: the dashboard and the compare card only, no pointer movement, and no backdrop blur (the
  compare card is near-solid instead), since blur could not be tested for scroll jank on a real
  mid-range phone. The headline must stay the LCP element.

Implementation rules:

- Scroll reveal uses `useInView` (IntersectionObserver), adds a class once, then stops observing.
  Content must be visible if JavaScript hasn't run: hide elements only after the hook has set a
  "ready" flag on the page.
- Reveal and hover lifts use the CSS `translate` property, not `transform`, so they don't fight
  with cards that are rotated with `rotate`. `transform` is only for the 3D pointer tilt and the
  hero layers' pointer drift, which sit alongside `translate` and `rotate` without replacing them.
  When two motions would both need `translate` (the service stack and the card's hover lift), put
  them on different elements.
- Scroll-linked (`animation-timeline`) animations are allowed for position and rotation only
  (`translate`, `rotate`), never opacity: scroll-linked fades leave content half-faded when the
  user stops scrolling, which was rejected in review. Use them inside
  `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`, so other
  browsers and reduced motion get the plain layout.
- Animate only `opacity`, `translate`, `scale`, `rotate` and colours. Never anything that causes
  layout shift.

---

## Content rules

- Only Fastship's real content: their services, carriers, contact details, FAQ answers and
  testimonials, as in the design files. Never invent stats, prices, partners or features.
- Testimonials: three quotes, in this order: Ade A. (Lagos), Favour O. (Jos), Daniel I. (Abuja).
  Initials in a circle instead of photos. Words kept as Fastship's customers wrote them, with only
  typos and the brand name fixed.
- The concept banner is always visible, and the footer says it's unofficial too.
- Links stay inside the concept wherever a section exists. Deeper pages the concept doesn't include
  (car import, guides, full FAQ, HS codes, legal) may link to fastship.africa.
- Use the real logo files only. Never recreate the logo.
- Plain, short copy. No "seamless", "leverage", "cutting-edge" in copy we write. This does not
  apply to Fastship's own wording: keep their real copy exactly as it is, e.g. the sign-in subtitle
  "Your journey to seamless delivery starts here. Track, ship and move forward with confidence."

---

## Metadata and SEO

- Title "Fastship.Africa redesign concept · Muizz Jamiu" and a description that says it's a concept.
- `robots: { index: false, follow: false }` in the root metadata, and `src/app/robots.ts`
  disallowing everything. This must never compete with Fastship's real site in search.
- An `opengraph-image.png` (1200×630) that also says "Redesign concept".

---

## Performance and accessibility

The live site's mobile PageSpeed score is the "before". This build has to beat it clearly.
Target: Lighthouse 95+ on mobile for Performance, Accessibility, Best Practices and SEO
(SEO will be marked down for `noindex`, which is expected).

- `next/image` everywhere with correct `sizes`. Never request images wider than they display.
- The hero has no large photo, so keep the LCP (Largest Contentful Paint) element as text.
- Fonts through `next/font`, so there's no layout shift.
- Keep client JavaScript small. No library for animation.
- Semantic landmarks: `header`, `nav`, `main`, `footer`, one `h1`.
- Visible focus rings on every interactive element. Full keyboard use, including the mobile menu
  and the FAQ.
- Text contrast at least 4.5:1, including small grey labels.
- Decorative SVGs `aria-hidden`; meaningful illustrations get `role="img"` and a label.

---

## Build plan

| Part | Branch                    | What                                                          |
| ---- | ------------------------- | ------------------------------------------------------------- |
| 0    | `chore/starter-cleanup`   | Remove create-next-app starter content and SVGs               |
| 1    | `feat/theme-and-layout`   | Tokens, fonts, keyframes, `cn()`, root layout, concept banner |
| 2    | `feat/ui-components`      | Button, Badge, fields, DemoNotice, Text, icons, Reveal, Marquee, Accordion |
| 3    | `feat/data`               | Types in `models/`, all copy in `data/`                       |
| 4    | `feat/header-footer`      | Glass nav, mobile menu, footer                                |
| 5    | `feat/hero-and-track`     | Hero, carrier bands, track a shipment                         |
| 6    | `feat/about-and-features` | About section, how it works, features bento and mobile list, 24/7 banner |
| 7    | `feat/services-and-social`| Not a business? cards with illustrations, testimonials        |
| 8    | `feat/faq-contact-cta`    | FAQ, contact, closing CTA                                     |
| 9    | `feat/auth-pages`         | Sign in and sign up with the pinned brand panel               |
| 10   | `feat/animations`         | Scroll reveal and every animation in the table                |
| 11   | `feat/metadata`           | Metadata, noindex, robots, Open Graph image, favicon          |
| 12   | `chore/final-checks`      | Production build, Lighthouse on mobile, fixes                 |

After part 12: deploy to Vercel (not Qocent, whose image optimiser failed on the portfolio) as
`fastship-concept.vercel.app`, then run PageSpeed Insights on the live URL for the "after" numbers.

---

## Departures from the guide

The guide is written for a data-heavy app. This site has no backend, so:

- **No `services/`, `configs/` or API client.** There is nothing to fetch.
- **No `models/requests`, `responses` or `validations`.** Types for data files live in `src/models/`.
  The forms are disabled demos with no validation.
- **Added `src/data/`** for copy, and **`src/assets/images/`** for imported images.
- **Added `utilities/hooks/useInView.ts`** for scroll reveal instead of an animation library.
- **No modal, table or toast components** until a screen needs one.

---

## Smells to grep for

| Search for                          | Why it is wrong                                         |
| ----------------------------------- | ------------------------------------------------------- |
| `#` hex or `text-gray-` in components | Use role tokens                                       |
| `<img`                              | Use `next/image`                                        |
| `/_blob/`                           | A design-file image id. Import from `src/assets/images/` |
| `"use client"` at the top of a page | Ships the whole page as JavaScript                      |
| Copy inside a component             | Belongs in `src/data/`                                  |
| An enabled form input               | Every field in this concept is disabled                 |
| `<form action`, `fetch(`, `cookies(`, analytics or tag scripts | This demo never collects, stores or sends data |
| `animation-timeline` with `opacity` | Scroll-linked fades were rejected; position and rotation only |
| `transform` in a reveal or hover lift | Use `translate` so rotated cards keep their tilt (3D pointer tilt is the exception) |
| Animation without reduced-motion handling | Ignores users who turned motion off               |
| `: any`                             | A type nobody finished                                  |
