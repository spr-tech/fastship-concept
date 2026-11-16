# Fastship.Africa redesign concept

An unofficial redesign concept of [fastship.africa](https://fastship.africa) by Muizz Jamiu.
It is not affiliated with Fastship.Africa. All forms are disabled demos, and nothing is sent.

## Stack

- Next.js 16 (App Router, `src/` folder), TypeScript in strict mode
- Tailwind CSS v4, configured in `src/app/globals.css`
- `next/font` (Anton, Inter) and `next/image`
- `clsx` + `tailwind-merge`
- No animation library, no backend

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npx tsc --noEmit  # type check
```

## Project docs

- `CLAUDE.md`: build rules, design system and build plan
- `docs/frontendStructureGuide.md`: structure guide
- `docs/design/`: approved screens (reference only)
