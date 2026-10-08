# Personal website rebuild design

Date: 2026-10-08 (Australia/Melbourne)
Status: Approved by the user on 2026-10-08; local implementation reviewed; publication pending authorization.

## Intent and constraints

Build a fresh personal website for `MortyYJT` / `谷鱼Y`, using the name `personal-website-guyuy` and a new Git history. Recreate the visible design and interaction style of the current https://auberginewly.site/ website with the owner's own content. Do not import the previous website's code or history.

The user approved the repository name, pseudonymous identity, concise root `AGENTS.md` with detailed rules, and proceeding toward development. The previous investigation provided an approach and phase outline rather than a reviewed written specification or detailed implementation plan.

Working assumption: version one is a personal profile with projects and a resume, rather than a publication-focused blog. This balances the observed reference site with the available public project material. Personal interests and resume details must come from verified sources or the user; do not invent them to fill the reference layout.

The owner's real name must not appear in repository content, public UI, metadata, screenshots committed to the repository, or Git attribution. Use only `MortyYJT` and `谷鱼Y`; an ASCII URL slug such as `guyuy` is an identifier, not an additional personal name.

## Selected approach

Use Next.js App Router, React, strict TypeScript, and Tailwind CSS in one application. All application code, including future server functionality, uses TypeScript. CSS, JSON, Markdown, assets, and CI configuration retain their native formats.

Start with a small custom application rather than adapting an entire portfolio template. This makes the reference's layout and interaction behavior the primary design input. Existing MIT components may be used selectively after inspecting their dependencies and license requirements. Pin compatible stable dependency versions and commit one lockfile when publication is authorized.

The initial site has static profile content and interactive presentation. Do not add a database, authentication, CMS, contact form backend, or API without a concrete requirement. Next.js leaves room for future Route Handlers and server-side functionality without introducing them prematurely.

## Routes and content

| Route | Purpose | Required content |
| --- | --- | --- |
| `/` | Personal introduction and discovery | Hero, about, resume entry, projects preview, stack, interests when sourced, contact |
| `/resume` | Readable public profile | Pseudonym, verified introduction, selected projects, sourced skills, public contact |
| `/experience/projects` | Project evidence | Verified project descriptions, status, technology where source-backed, canonical GitHub links |

Use an HTML resume page. Do not add a downloadable resume until its content and embedded metadata satisfy the pseudonymous identity requirement. Omit unsupported employment, education, contribution, and skill-level claims. Do not render empty experience routes or fake download buttons.

Collect the owner's public project evidence during implementation. Separate completed functionality from experiments, work in progress, and proposed extensions. A README claim is a lead to check against source code and configuration, not proof of an outcome.

Store content in typed local modules with `zh` and `en` fields, stable project IDs, source URLs, and optional fields. Missing optional content omits the corresponding UI rather than publishing placeholders. GitHub is the initial contact channel; add email only if the user explicitly supplies an address for publication.

## Visual system

- Match the reference's dark purple-gray canvas, broad purple glow, subtle grain, narrow central column, generous vertical spacing, and large first-screen typography.
- Use an original small fish mark for the owner's identity rather than the reference's aubergine branding. Create it as a repository-native SVG; do not copy the friend's avatar.
- Use a compact floating capsule header with brand, resume, project experience, language, and theme controls. The project link may be direct until more than one real experience category exists.
- Use a bottom floating capsule for the homepage sections that actually exist. Do not include links to omitted sections.
- Keep content pages calmer than the hero while preserving typography, colors, navigation, and spacing.
- Provide light and dark palettes. Default to dark when no saved preference exists; a user choice persists across navigation and reloads.
- Use self-hosted bundled or system fonts. A production build must not depend on a remote font download.

Desktop content width is approximately 680–760 CSS pixels; mobile uses fluid spacing and a minimum 16-pixel side gutter. The bottom dock must fit or scroll within its own bounds on narrow screens without causing body overflow. Content padding must account for the dock and device safe areas.

## Interaction and accessibility

- Default language is Chinese. Language changes translate the entire visible interface, update the document language, and remain selected across all routes and reloads.
- Theme changes remain selected across routes and reloads. Avoid hydration warnings and flashing an incompatible theme on initial display.
- A typed hero phrase may cycle through truthful statements about the owner's work. Reduced-motion users receive a stable phrase; animation must not block navigation or reading.
- Homepage anchors scroll to their target with adequate header offset. Indicate the active section as the user scrolls; changing language must preserve target IDs.
- Interest tabs appear only when genuine entries are available. Implement tab semantics and keyboard access if the section is included.
- Header controls and any menus work by keyboard and touch, have accessible names and visible focus, and dismiss predictably. Do not make navigation depend on hover.
- Decorative grain and backgrounds are noninteractive and hidden from accessibility tools. Text and focus indicators retain readable contrast in both themes.

## Component boundaries and state

The application shell owns navigation, preference providers, shared background, and layout. Page components consume typed content and keep display sections small. Reusable elements include section headings, project entries, public links, controls, and the fish mark.

Keep profile and project content independent from visual components. Client components own language/theme controls, hero animation, tabs, and active-anchor tracking; static content and route rendering use server components where practical.

Local browser preferences are optional. If storage is unavailable or contains an invalid value, fall back to Chinese and dark mode without breaking the page. Do not collect personal data or add analytics in version one without an agreed need.

Unknown routes show a branded 404 with a working home link. An unavailable image or optional content field must not prevent reading the main profile. Normal browsing must not produce application console errors.

## Git, CI, and deployment

The current local repository has an unborn `main`, existing instruction/research documents, and no remote. Preserve these files when scaffolding. Use a `codex/` development branch; keep commit and publication actions within the session's authorization and the repository's Git rules.

The repository-local identity is configured as `MortyYJT` with the account's numeric-ID noreply address. Verify actual author and committer fields before publishing and GitHub attribution afterward. Do not rewrite the old repository or change global Git settings.

CI must install from the lockfile and execute lint, typecheck, relevant tests, and the production build. Do not silently disable checks to make a pipeline green.

The old Vercel project is disconnected from the old repository. For the new website, prefer a project named `personal-website-guyuy` connected to the new repository, avoiding inherited VuePress settings. Reuse the old project only if a live inspection shows a useful domain association; then explicitly correct its name, framework, root, and output settings before reconnecting. No new Vercel resource is created at the design stage.

Production framework must be Next.js, with the application at repository root and the normal framework output handling. Verify a real Git-triggered deployment, the source commit, and the public production URL. A manual deployment alone does not satisfy automatic deployment acceptance.

Do not delete the old GitHub repository or Vercel project as part of implementation. A later cleanup must identify the exact objects and obtain the required final confirmation for irreversible deletion.

## Acceptance criteria

1. Profile, metadata, imported assets, docs, and Git attribution contain only the approved owner identity; no private data is published.
2. All three routes load directly, navigate correctly, and present truthful sourced content without dead buttons or filler claims.
3. The main composition visibly matches the reference: purple grain/glow, narrow column, large hero, capsule header and dock, restrained profile pages.
4. Real-browser checks pass at 375, 768, and 1440 CSS-pixel widths: no body overflow, hidden controls, obscured content, or broken navigation.
5. Chinese/English and dark/light preferences work across routes and reloads; keyboard navigation and reduced-motion behavior work; no application console errors occur.
6. Configured lint, typecheck, meaningful logic tests, and production build pass. Pure styling is accepted through browser inspection rather than tests that mirror CSS.
7. GitHub CI succeeds, GitHub links published commits to the intended account, and Vercel automatically deploys the expected commit to a reachable production URL.

Record local, browser, CI, identity, and deployment results separately in `note/`. Until publication is authorized and performed, remote criteria remain explicitly not verified; do not call the entire rebuild complete based only on local acceptance.
