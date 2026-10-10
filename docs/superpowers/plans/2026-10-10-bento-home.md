# Bento home implementation plan

Spec: `docs/superpowers/specs/2026-10-10-bento-home-design.md`. Executed inline by Claude Code.

1. Logic units, test first: `src/lib/greeting.ts`, `src/lib/calendar.ts`, `src/lib/segments.ts`,
   `src/lib/music.ts`, each with a `*.test.ts` (red, then green).
2. Content: `src/content/site.ts` (avatar path, music playlist id, background image slot); new UI
   strings in `ui.ts`; avatar asset in `public/avatar.jpg`.
3. Components under `src/components/home/cards/`: nav, art, hi, clock, calendar, project, about,
   stack, music, social; a `useNow` hook that is `null` during SSR. Replace `HomeContent` with the
   grid; remove the hero, section, and section dock components and `getHomeSections`.
4. Styles: glass tokens and grid areas in `globals.css`; header pill hidden on desktop home;
   document pages inside a glass panel; self-hosted display font via `next/font`.
5. Attribution: `THIRD_PARTY_NOTICES.md` and a footer credit.
6. Verify: tests, lint, typecheck, build, browser matrix from the spec; record evidence in `note/`.
