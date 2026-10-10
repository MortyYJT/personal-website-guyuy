# Bento home redesign

Date: 2026-10-10. Status: approved by the owner in chat (design sections 1–4).

## Goal

Replace the single-column home page with a frosted-glass card grid ("bento") inspired by
[lvyovo-wiki.tech](https://lvyovo-wiki.tech/), which is built on
[YYsuni/2025-blog-public](https://github.com/YYsuni/2025-blog-public) (MIT). Keep the existing
bilingual content, theme persistence, opening animation, SSR readability, and Vercel deployment.

## Decisions

- Rebuild inside this repository with CSS Grid. Do not fork the template: its cards are placed by
  JavaScript-computed absolute coordinates, which overlap at 390px and render nothing useful
  without JavaScript.
- No code is copied from the template; only the visual language (glass cards, greeting card,
  seven-segment clock, calendar, mini music card) is reproduced. The footer and
  `THIRD_PARTY_NOTICES.md` credit the inspiration.
- Keep the blue/white palette and the current opening animation.
- Music: NetEase Cloud Music official outchain player, loaded only after the visitor clicks
  (facade). Until the owner supplies a playlist id the card shows a "coming soon" state.
- Avatar: owner-supplied image, cropped square, displayed at 160px or less.
- No personal email on the site (handoff red line). Social row: GitHub and resume.
- Background image slot reserved in content config; gradient blobs until an image is chosen.

## Layout

Desktop (>= 1024px), max width about 1100px, `grid-template-areas`:

```
nav   art    clock
nav   hi     calendar
proj  hi     calendar
proj  about  music
stack about  social
```

Tablet (600–1023px): two columns. Mobile (< 600px): one column ordered hi, project, about,
music, clock, calendar, stack, social. On the home page the floating header pill is hidden on
desktop (the nav card replaces it) and shown below 1024px; the nav card is hidden there.

## Cards

| Card | Content | Client-only parts |
| --- | --- | --- |
| Nav | small avatar, name, links (resume, projects, GitHub), locale and theme toggles | none |
| Art | fish mark on a wave pattern (placeholder for future artwork) | none |
| Hi | large avatar, time-of-day greeting, "I'm 谷鱼Y, nice to meet you", introduction | greeting (SSR renders a neutral "你好 / Hello") |
| Clock | seven-segment HH:MM | time (SSR renders dashes) |
| Calendar | month grid, Monday first, today highlighted | dates (SSR renders weekday header only) |
| Project | first publishable project, link to `/experience/projects` | none |
| About | `profile.about` | none |
| Stack | stack tags | none |
| Music | facade button, then NetEase iframe | iframe |
| Social | GitHub, resume | none |

Cards enter with a short staggered scale and fade; reduced motion disables it and cards remain
visible because the resting state is the final state.

## Logic units (tested)

- `greetingFor(hour, locale)`: 5–11 morning, 12–17 afternoon, 18–22 evening, otherwise night.
- `monthGrid(year, monthIndex)`: Monday-first weeks with leading `null` cells.
- `segmentsFor(digit)`: which of the seven segments are lit.
- `neteasePlayerUrl(playlistId)`: accepts digits only, returns the official outchain URL or `null`.

## Other pages

Resume, projects, and 404 keep their content inside a glass panel using the same tokens.

## Verification

Unit tests for the logic units; lint, typecheck, production build; browser checks at 390px and
1440px, dark and light, keyboard navigation, reduced motion, and JavaScript disabled.
