# personal-website-guyuy

A personal website for **MortyYJT / 谷鱼Y**. Built with Next.js App Router, React, strict TypeScript, and Tailwind CSS. Live at https://mortyyjt.github.io/ (GitHub Pages; Vercel mirror). The home page is a one-screen grid of frosted-glass cards inspired by [YYsuni/2025-blog-public](https://github.com/YYsuni/2025-blog-public) and [lvyovo-wiki.tech](https://lvyovo-wiki.tech/); no code or assets were copied (see `THIRD_PARTY_NOTICES.md`).

## Development

Use Node.js 24 and npm. Install from the lockfile:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For the production build:

```sh
npm run build
npm start
```

| Command | Purpose |
| --- | --- |
| `npm run lint` | Next.js and TypeScript ESLint checks |
| `npm run typecheck` | Strict application checking |
| `npm test` | Unit tests for site logic and the like-counter Worker |
| `npm run build` | Production build and static route generation |

The configuration retains strict application checking and the framework-recommended `skipLibCheck` for dependency/generated declarations. Next.js emits duplicate global route declarations in development and production output; checking both declaration trees together fails independently of application code.

The toolchain pins TypeScript 6 because the current ESLint parser does not support TypeScript 7. ESLint 9 is retained for compatibility with the framework's plugin dependencies. Application code uses TypeScript; native CSS, Markdown and configuration formats remain unchanged.

## Content and routes

- `/`: card grid (nav, greeting, clock, calendar, latest project, music, GitHub and like).
- `/profile`: public profile, selected work and stack.
- `/projects`: project cards with links to the implementation evidence.
- `/friends`: sites of people the owner follows on GitHub.

Edit `src/content/` (`profile.ts`, `projects.ts`, `friends.ts`, `nav.ts`, `site.ts`, `ui.ts`). Every visible project requires bilingual copy, a public GitHub repository and implementation evidence. Use only **MortyYJT / 谷鱼Y** as the owner's identity.

The music player (Toby Fox's official Bandcamp embed) lives in the root layout so it keeps playing across pages. The like counter is a Cloudflare Worker in `workers/likes/` (deploy steps there); without `NEXT_PUBLIC_LIKES_ENDPOINT` the heart works locally only.

## Deployment

Pushes to `main` build a static export (`STATIC_EXPORT=1`) and publish it to `MortyYJT/MortyYJT.github.io` (`.github/workflows/pages.yml`). Vercel builds the same code as a mirror.

Chinese and the light theme are the defaults. Explicit choices persist under `guyuy:preferences:v1` in local browser storage across routes and reloads. If storage is denied, controls continue working in memory; a fresh load uses the defaults. Reduced motion skips the opening animation, card entrances and theme transition.

## Deployment

The app requires no database, authentication, API keys, analytics or environment variables. On Vercel, select **Next.js**, repository root, Node.js 24, and the default framework build/output settings. Connect the authorized GitHub repository and production branch for automatic deployments. GitHub Actions validates lint, types, tests and build without a Vercel token.

Repository: [MortyYJT/personal-website-guyuy](https://github.com/MortyYJT/personal-website-guyuy). Production: [personal-website-guyuy.vercel.app](https://personal-website-guyuy.vercel.app). The same-name Vercel project follows `main`; the initial repository bootstrap and production release were authorized on 2026-10-08. Canonical, Open Graph URL, robots, and sitemap metadata use the confirmed production origin in `src/lib/site.ts`. Update that origin when moving to a custom domain. Git-triggered production deployment is verified. Remote CI passes when manually dispatched; automatic push CI remains unresolved. Release evidence and limitations are recorded in `note/2026-10-08-implementation.md`.

Local acceptance and remaining remote checks are recorded in `note/2026-10-08-implementation.md`. Agent instructions are indexed in `AGENTS.md`; detailed guidance is in `docs/engineering/agent-guidelines.md`.
