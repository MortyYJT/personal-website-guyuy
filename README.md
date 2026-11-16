# personal-website-guyuy

A personal website for **MortyYJT / 谷鱼Y**. Built with Next.js App Router, React, strict TypeScript, and Tailwind CSS. Live at https://mortyyjt.site/ (the owner's server; Vercel mirror). The home page is a one-screen grid of frosted-glass cards inspired by [YYsuni/2025-blog-public](https://github.com/YYsuni/2025-blog-public) and [lvyovo-wiki.tech](https://lvyovo-wiki.tech/); no code or assets were copied (see `THIRD_PARTY_NOTICES.md`).

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
| `npm test` | Unit tests for site logic |
| `npm run build` | Production build and static route generation |

The configuration retains strict application checking and the framework-recommended `skipLibCheck` for dependency/generated declarations. Next.js emits duplicate global route declarations in development and production output; checking both declaration trees together fails independently of application code.

The toolchain pins TypeScript 6 because the current ESLint parser does not support TypeScript 7. ESLint 9 is retained for compatibility with the framework's plugin dependencies. Application code uses TypeScript; native CSS, Markdown and configuration formats remain unchanged.

## Content and routes

- `/`: card grid (nav, greeting, clock, calendar, latest project, music, GitHub).
- `/profile`: public profile, selected work and stack.
- `/projects`: project cards with links to the implementation evidence.
- `/friends`: sites of people the owner follows on GitHub.

Edit `src/content/` (`profile.ts`, `projects.ts`, `friends.ts`, `nav.ts`, `site.ts`, `ui.ts`). Every visible project requires bilingual copy, a public GitHub repository and implementation evidence. Use only **MortyYJT / 谷鱼Y** as the owner's identity.

The same-origin audio player lives in the root layout so it keeps playing across pages.
The homepage heart uses a same-origin likes service; one anonymous browser cookie records one like.

## Deployment

Pushes to `main` build a static export (`STATIC_EXPORT=1`) and rsync it to `/srv/mortyyjt.site` on the owner's server (`.github/workflows/deploy.yml`). Before uploading the export, the workflow builds and deploys the independent Node.js likes service through a dedicated forced-command SSH key (`LIKES_DEPLOY_KEY`). The static upload key (`SITE_DEPLOY_KEY`) remains confined to its original rsync directory. See [deploy/README.md](deploy/README.md) for bootstrap, persistence, backup and rollback instructions.

The Caddy that also fronts LeapAshore serves the static directory and proxies `/api/likes` to the service; its configuration lives in `MortyYJT/LeapAshore` (`deploy/Caddyfile`). Old hashed assets are retained on each deploy for cached pages. SQLite lives in a separate persistent Docker volume and is never included in the static export. There is no login requirement. The former Pages and Vercel mirrors are retired; `mortyyjt.site` is the only publication target.

Chinese and the light theme are the defaults. Explicit choices persist under `guyuy:preferences:v1` in local browser storage across routes and reloads. If storage is denied, controls continue working in memory; a fresh load uses the defaults. Reduced motion skips the opening animation, card entrances and theme transition.

Repository: [MortyYJT/personal-website-guyuy](https://github.com/MortyYJT/personal-website-guyuy). Production: [mortyyjt.site](https://mortyyjt.site/). Canonical, Open Graph, robots and sitemap URLs use the origin in `src/lib/site.ts`. CI runs lint, types, unit/API tests, the default build, the static export and the likes container build on every push and pull request.

Local acceptance and remaining remote checks are recorded in `note/2026-10-08-implementation.md`. Agent instructions are indexed in `AGENTS.md`; detailed guidance is in `docs/engineering/agent-guidelines.md`.
