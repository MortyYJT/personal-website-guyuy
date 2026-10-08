# personal-website-guyuy

A personal website for **MortyYJT / 谷鱼Y**. Built with Next.js App Router, React, strict TypeScript, and Tailwind CSS. The design follows the visual composition of [auberginewly's website](https://auberginewly.site/), using original fish branding and the owner's own source-backed content.

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
| `npm test` | Content filtering and defensive preference storage tests |
| `npm run build` | Production build and static route generation |

The configuration retains strict application checking and the framework-recommended `skipLibCheck` for dependency/generated declarations. Next.js emits duplicate global route declarations in development and production output; checking both declaration trees together fails independently of application code.

The toolchain pins TypeScript 6 because the current ESLint parser does not support TypeScript 7. ESLint 9 is retained for compatibility with the framework's plugin dependencies. Application code uses TypeScript; native CSS, Markdown and configuration formats remain unchanged.

## Content and routes

- `/`: introduction, about, resume entry, project previews, technologies and GitHub contact.
- `/resume`: public HTML profile. No unverified employment, education or PDF download.
- `/experience/projects`: project descriptions with links to the implementation evidence.

Edit `src/content/profile.ts`, `projects.ts` and `ui.ts`. Every visible project requires bilingual copy, a public GitHub repository and implementation evidence. Descriptions reflect public code, not claimed deployment outcomes. Unsourced optional interests are omitted along with their dock links. Use only **MortyYJT / 谷鱼Y** as the owner's identity.

Chinese and dark mode are the defaults. Explicit choices persist under `guyuy:preferences:v1` in local browser storage across routes and reloads. If storage is denied, controls continue working in memory; a fresh load uses the defaults. Reduced motion displays a stable hero phrase and disables animated scrolling.

## Deployment

The app requires no database, authentication, API keys, analytics or environment variables. On Vercel, select **Next.js**, repository root, Node.js 24, and the default framework build/output settings. Connect the authorized GitHub repository and production branch for automatic deployments. GitHub Actions validates lint, types, tests and build without a Vercel token.

Repository: [MortyYJT/personal-website-guyuy](https://github.com/MortyYJT/personal-website-guyuy). Production: [personal-website-guyuy.vercel.app](https://personal-website-guyuy.vercel.app). The same-name Vercel project follows `main`; the initial repository bootstrap and production release were authorized on 2026-10-08. Canonical, Open Graph URL, robots, and sitemap metadata use the confirmed production origin in `src/lib/site.ts`. Update that origin when moving to a custom domain. Remote CI and Git-triggered deployment acceptance are recorded in `note/2026-10-08-implementation.md`.

Local acceptance and remaining remote checks are recorded in `note/2026-10-08-implementation.md`. Agent instructions are indexed in `AGENTS.md`; detailed guidance is in `docs/engineering/agent-guidelines.md`.
